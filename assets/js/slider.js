// Slider functionality
class NewsSlider {
  constructor(container) {
    this.container = container;
    this.sliderContainer = container.querySelector('.news-slider-container');
    this.cards = container.querySelectorAll('.news-card');
    this.indicators = container.querySelectorAll('.slider-indicator');
    this.prevBtn = container.querySelector('.slider-nav.prev');
    this.nextBtn = container.querySelector('.slider-nav.next');
    
    
    this.currentIndex = 0;
    this.totalCards = this.cards.length;
    this.isTransitioning = false;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;
    
    // swipe related variables
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;
    this.threshold = 50;
    
    if (this.totalCards > 0) {
      this.init();
    }
  }
  
  init() {
    this.updateSlider();
    this.bindEvents();
    this.startAutoPlay();
  }
  
  bindEvents() {

    // 按钮点击事件
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goToPrev();
      });
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goToNext();
      });
    }

    // 指示器点击事件
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goToSlide(index);
      });

      // 移动端触摸事件
      indicator.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goToSlide(index);
      });

    });
    
    // 触摸事件
    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    
    // 鼠标事件（桌面端拖拽）
    this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
    // this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
    // this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.container.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    
    // 键盘导航
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // 鼠标悬停时暂停自动播放
    this.container.addEventListener('mouseenter', () => {
      this.stopAutoPlay();
    });
    this.container.addEventListener('mouseleave', () => {
      this.startAutoPlay();
    });

    // 页面可见性控制
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopAutoPlay();
      } else if (!this.isDragging) {
        this.startAutoPlay();
      }
    });
    
    // 窗口大小改变时重新计算
    window.addEventListener('resize', this.handleResize.bind(this));

  }
  
  goToNext() {
    if (this.isTransitioning) {
      return;
    }
    
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateSlider();
  }
  
  goToPrev() {
    if (this.isTransitioning) {
      return;
    }
    
    this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    this.updateSlider();
  }
  
  goToSlide(index) {
    if (this.isTransitioning || index === this.currentIndex) {
      return;
    }
    
    this.currentIndex = index;
    this.updateSlider();
  }
  
  updateSlider() {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    
    // 更新轮播容器位置
    const translateX = -this.currentIndex * 100;
    if (this.sliderContainer) {
      this.sliderContainer.style.transform = `translateX(${translateX}%)`;
    } 

    // 更新指示器
    this.indicators.forEach((indicator, index) => {
      const isActive = index === this.currentIndex;
      indicator.classList.toggle('active', isActive);
    });
    
    // 更新卡片状态
    this.cards.forEach((card, index) => {
      const isHidden = index !== this.currentIndex;
      card.setAttribute('aria-hidden', isHidden);
    });
    
    // 转换完成后重置状态
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }
  
  // 触摸事件处理
  handleTouchStart(e) {
    this.startX = e.touches[0].clientX;
    this.currentX = this.startX;
    this.isDragging = true;
    this.stopAutoPlay();
    console.log('Touch start');
  }
  
  handleTouchMove(e) {
    if (!this.isDragging) return;
    
    e.preventDefault();
    this.currentX = e.touches[0].clientX;
    
    const deltaX = this.currentX - this.startX;
    const currentTranslate = -this.currentIndex * 100;
    const newTranslate = currentTranslate + (deltaX / this.container.offsetWidth) * 100;
    
    this.sliderContainer.style.transform = `translateX(${newTranslate}%)`;
    this.sliderContainer.style.transition = 'none';
  }
  
  handleTouchEnd() {
    if (!this.isDragging) return;
    
    const deltaX = this.currentX - this.startX;
    const threshold = this.threshold;
    
    this.sliderContainer.style.transition = '';
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.goToPrev();
      } else {
        this.goToNext();
      }
    } else {
      this.updateSlider();
    }
    
    this.isDragging = false;
    this.startAutoPlay();
    console.log('Touch end');
  }
  
  // 鼠标事件处理（桌面端）
  handleMouseDown(e) {
    if (e.target.closest('.slider-nav') || e.target.closest('.slider-indicator')) return;
    
    this.startX = e.clientX;
    this.currentX = this.startX;
    this.isDragging = true;
    this.container.style.cursor = 'grabbing';
    this.stopAutoPlay();
    e.preventDefault();
  }
  
  handleMouseMove(e) {
    if (!this.isDragging) return;
    
    this.currentX = e.clientX;
    const deltaX = this.currentX - this.startX;
    const currentTranslate = -this.currentIndex * 100;
    const newTranslate = currentTranslate + (deltaX / this.container.offsetWidth) * 100;
    
    this.sliderContainer.style.transform = `translateX(${newTranslate}%)`;
    this.sliderContainer.style.transition = 'none';
  }
  
  handleMouseUp() {
    if (!this.isDragging) return;
    
    const deltaX = this.currentX - this.startX;
    const threshold = this.threshold;
    
    this.sliderContainer.style.transition = '';
    this.container.style.cursor = '';
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.goToPrev();
      } else {
        this.goToNext();
      }
    } else {
      this.updateSlider();
    }
    
    this.isDragging = false;
    this.startAutoPlay();
  }
  
  // 键盘导航
  handleKeyDown(e) {
    if (!this.container.matches(':hover')) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.goToPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.goToNext();
        break;
      case ' ':
        e.preventDefault();
        this.toggleAutoPlay();
        break;
    }
  }
  
  // 自动播放控制
  startAutoPlay() {
    this.stopAutoPlay();
    
    const config = window.newsSliderConfig;
    
    if (config && config.autoPlay && this.totalCards > 1) {
      this.autoPlayInterval = setInterval(() => {
        this.goToNext();
      }, config.interval || this.autoPlayDelay);
    } 
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  toggleAutoPlay() {
    if (this.autoPlayInterval) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }
  
  // 窗口大小改变处理
  handleResize() {
    this.updateSlider();
  }
  
  // 销毁实例
  destroy() {
    this.stopAutoPlay();
    // 这里可以添加更多清理代码
  }
}

// 简化的初始化函数
function initSliders() {
  // 等待一下确保DOM完全加载
  const sliders = document.querySelectorAll('.news-slider');
  console.log(`Found ${sliders.length} slider(s)`);
  
  if (sliders.length === 0) {
    console.warn('No sliders found! Checking for .news-slider elements...');
    return;
  }
  
  sliders.forEach((slider, index) => {
    const cards = slider.querySelectorAll('.news-card');

    if (cards.length > 0) {
      try {
        const newsSlider = new NewsSlider(slider);
        
        // 存储实例以便调试
        slider.sliderInstance = newsSlider;
      } catch (error) {
        console.error(`Error initializing slider ${index + 1}:`, error);
      }
    } else {
      console.warn(`Slider ${index + 1} has no cards, skipping initialization`);
    }
  });
  
}

// 多种初始化方式确保加载
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSliders);
} else {
  // DOM已经加载完成
  initSliders();
}

// 备用初始化
setTimeout(initSliders, 1000);

// 全局调试函数
window.debugSlider = function() {
  const sliders = document.querySelectorAll('.news-slider');
  console.log('=== Slider Debug Info ===');
  sliders.forEach((slider, index) => {
    console.log(`Slider ${index + 1}:`, slider.sliderInstance);
  });
};

// 手动控制函数（用于测试）
window.manualSliderNext = function() {
  const slider = document.querySelector('.news-slider');
  if (slider && slider.sliderInstance) {
    slider.sliderInstance.goToNext();
  }
};

window.manualSliderPrev = function() {
  const slider = document.querySelector('.news-slider');
  if (slider && slider.sliderInstance) {
    slider.sliderInstance.goToPrev();
  }
};

// 导出类供其他地方使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NewsSlider;
}