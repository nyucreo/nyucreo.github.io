// // 新闻卡片滑动功能
// class NewsSlider {
//   constructor(container) {
//     this.container = container;
//     this.sliderContainer = container.querySelector('.news-slider-container');
//     this.cards = container.querySelectorAll('.news-card');
//     this.indicators = container.querySelectorAll('.slider-indicator');
//     this.prevBtn = container.querySelector('.slider-nav.prev');
//     this.nextBtn = container.querySelector('.slider-nav.next');
    
//     this.currentIndex = 0;
//     this.totalCards = this.cards.length;
//     this.isTransitioning = false;
//     this.autoPlayInterval = null;
//     this.autoPlayDelay = 5000; // 5秒自动切换
    
//     // 触摸相关
//     this.startX = 0;
//     this.currentX = 0;
//     this.isDragging = false;
//     this.threshold = 50; // 滑动阈值
    
//     this.init();
//   }
  
//   init() {
//     this.updateSlider();
//     this.bindEvents();
//     this.startAutoPlay();
//   }
  
//   bindEvents() {
//     // 按钮点击事件
//     if (this.prevBtn) {
//       this.prevBtn.addEventListener('click', () => this.goToPrev());
//     }
    
//     if (this.nextBtn) {
//       this.nextBtn.addEventListener('click', () => this.goToNext());
//     }
    
//     // 指示器点击事件
//     this.indicators.forEach((indicator, index) => {
//       indicator.addEventListener('click', () => this.goToSlide(index));
//     });
    
//     // 移除悬停区域事件绑定（已删除）
    
//     // 触摸事件
//     this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
//     this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
//     this.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    
//     // 鼠标事件（桌面端拖拽）
//     this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
//     this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
//     this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
//     this.container.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    
//     // 键盘导航
//     document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
//     // 鼠标悬停时暂停自动播放
//     this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
//     this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    
//     // 窗口大小改变时重新计算
//     window.addEventListener('resize', this.handleResize.bind(this));
//   }
  
//   goToNext() {
//     if (this.isTransitioning) return;
//     this.currentIndex = (this.currentIndex + 1) % this.totalCards;
//     this.updateSlider();
//   }
  
//   goToPrev() {
//     if (this.isTransitioning) return;
//     this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
//     this.updateSlider();
//   }
  
//   goToSlide(index) {
//     if (this.isTransitioning || index === this.currentIndex) return;
//     this.currentIndex = index;
//     this.updateSlider();
//   }
  
//   updateSlider() {
//     this.isTransitioning = true;
    
//     // 更新轮播容器位置
//     const translateX = -this.currentIndex * 100;
//     this.sliderContainer.style.transform = `translateX(${translateX}%)`;
    
//     // 更新指示器
//     this.indicators.forEach((indicator, index) => {
//       indicator.classList.toggle('active', index === this.currentIndex);
//     });
    
//     // 更新卡片状态
//     this.cards.forEach((card, index) => {
//       card.setAttribute('aria-hidden', index !== this.currentIndex);
//     });
    
//     // 转换完成后重置状态
//     setTimeout(() => {
//       this.isTransitioning = false;
//     }, 500);
//   }
  
//   // 触摸事件处理
//   handleTouchStart(e) {
//     this.startX = e.touches[0].clientX;
//     this.currentX = this.startX;
//     this.isDragging = true;
//     this.stopAutoPlay();
//   }
  
//   handleTouchMove(e) {
//     if (!this.isDragging) return;
    
//     e.preventDefault();
//     this.currentX = e.touches[0].clientX;
    
//     // 实时预览拖拽效果
//     const deltaX = this.currentX - this.startX;
//     const currentTranslate = -this.currentIndex * 100;
//     const newTranslate = currentTranslate + (deltaX / this.container.offsetWidth) * 100;
    
//     this.sliderContainer.style.transform = `translateX(${newTranslate}%)`;
//     this.sliderContainer.style.transition = 'none';
//   }
  
//   handleTouchEnd() {
//     if (!this.isDragging) return;
    
//     const deltaX = this.currentX - this.startX;
//     const threshold = this.threshold;
    
//     this.sliderContainer.style.transition = '';
    
//     if (Math.abs(deltaX) > threshold) {
//       if (deltaX > 0) {
//         this.goToPrev();
//       } else {
//         this.goToNext();
//       }
//     } else {
//       this.updateSlider();
//     }
    
//     this.isDragging = false;
//     this.startAutoPlay();
//   }
  
//   // 鼠标事件处理（桌面端）
//   handleMouseDown(e) {
//     if (e.target.closest('.slider-nav') || e.target.closest('.slider-indicator')) return;
    
//     this.startX = e.clientX;
//     this.currentX = this.startX;
//     this.isDragging = true;
//     this.container.style.cursor = 'grabbing';
//     this.stopAutoPlay();
//     e.preventDefault();
//   }
  
//   handleMouseMove(e) {
//     if (!this.isDragging) return;
    
//     this.currentX = e.clientX;
//     const deltaX = this.currentX - this.startX;
//     const currentTranslate = -this.currentIndex * 100;
//     const newTranslate = currentTranslate + (deltaX / this.container.offsetWidth) * 100;
    
//     this.sliderContainer.style.transform = `translateX(${newTranslate}%)`;
//     this.sliderContainer.style.transition = 'none';
//   }
  
//   handleMouseUp() {
//     if (!this.isDragging) return;
    
//     const deltaX = this.currentX - this.startX;
//     const threshold = this.threshold;
    
//     this.sliderContainer.style.transition = '';
//     this.container.style.cursor = '';
    
//     if (Math.abs(deltaX) > threshold) {
//       if (deltaX > 0) {
//         this.goToPrev();
//       } else {
//         this.goToNext();
//       }
//     } else {
//       this.updateSlider();
//     }
    
//     this.isDragging = false;
//     this.startAutoPlay();
//   }
  
//   // 键盘导航
//   handleKeyDown(e) {
//     if (!this.container.matches(':hover')) return;
    
//     switch (e.key) {
//       case 'ArrowLeft':
//         e.preventDefault();
//         this.goToPrev();
//         break;
//       case 'ArrowRight':
//         e.preventDefault();
//         this.goToNext();
//         break;
//       case ' ':
//         e.preventDefault();
//         this.toggleAutoPlay();
//         break;
//     }
//   }
  
//   // 自动播放控制
//   startAutoPlay() {
//     this.stopAutoPlay();
//     // 检查配置是否启用自动播放
//     if (window.newsSliderConfig && window.newsSliderConfig.autoPlay) {
//       this.autoPlayInterval = setInterval(() => {
//         this.goToNext();
//       }, window.newsSliderConfig.interval || this.autoPlayDelay);
//     }
//   }
  
//   stopAutoPlay() {
//     if (this.autoPlayInterval) {
//       clearInterval(this.autoPlayInterval);
//       this.autoPlayInterval = null;
//     }
//   }
  
//   toggleAutoPlay() {
//     if (this.autoPlayInterval) {
//       this.stopAutoPlay();
//     } else {
//       this.startAutoPlay();
//     }
//   }
  
//   // 窗口大小改变处理
//   handleResize() {
//     this.updateSlider();
//   }
  
//   // 销毁实例
//   destroy() {
//     this.stopAutoPlay();
    
//     // 移除事件监听器
//     if (this.prevBtn) {
//       this.prevBtn.removeEventListener('click', () => this.goToPrev());
//     }
    
//     if (this.nextBtn) {
//       this.nextBtn.removeEventListener('click', () => this.goToNext());
//     }
    
//     this.indicators.forEach((indicator, index) => {
//       indicator.removeEventListener('click', () => this.goToSlide(index));
//     });
    
//     this.container.removeEventListener('touchstart', this.handleTouchStart.bind(this));
//     this.container.removeEventListener('touchmove', this.handleTouchMove.bind(this));
//     this.container.removeEventListener('touchend', this.handleTouchEnd.bind(this));
//     this.container.removeEventListener('mousedown', this.handleMouseDown.bind(this));
//     this.container.removeEventListener('mousemove', this.handleMouseMove.bind(this));
//     this.container.removeEventListener('mouseup', this.handleMouseUp.bind(this));
//     this.container.removeEventListener('mouseleave', this.handleMouseUp.bind(this));
//     this.container.removeEventListener('mouseenter', () => this.stopAutoPlay());
//     this.container.removeEventListener('mouseleave', () => this.startAutoPlay());
    
//     document.removeEventListener('keydown', this.handleKeyDown.bind(this));
//     window.removeEventListener('resize', this.handleResize.bind(this));
//   }
// }

// // 初始化轮播
// document.addEventListener('DOMContentLoaded', function() {
//   // 添加调试信息
//   console.log('Slider script loaded');
  
//   const sliders = document.querySelectorAll('.news-slider');
//   console.log('Found sliders:', sliders.length);
  
//   sliders.forEach((slider, index) => {
//     console.log(`Initializing slider ${index + 1}`);
//     const newsSlider = new NewsSlider(slider);
    
//     // 验证元素是否正确找到
//     console.log('Cards found:', slider.querySelectorAll('.news-card').length);
//     console.log('Indicators found:', slider.querySelectorAll('.slider-indicator').length);
//     console.log('Navigation buttons found:', slider.querySelectorAll('.slider-nav').length);
//   });
// });

// // 导出类供其他地方使用
// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = NewsSlider;
// }

// 新闻卡片滑动功能 - 调试版本
class NewsSlider {
  constructor(container) {
    console.log('NewsSlider constructor called');
    this.container = container;
    this.sliderContainer = container.querySelector('.news-slider-container');
    this.cards = container.querySelectorAll('.news-card');
    this.indicators = container.querySelectorAll('.slider-indicator');
    this.prevBtn = container.querySelector('.slider-nav.prev');
    this.nextBtn = container.querySelector('.slider-nav.next');
    
    // 调试信息
    console.log('Elements found:');
    console.log('- Container:', this.container);
    console.log('- Slider container:', this.sliderContainer);
    console.log('- Cards:', this.cards.length);
    console.log('- Indicators:', this.indicators.length);
    console.log('- Prev button:', this.prevBtn);
    console.log('- Next button:', this.nextBtn);
    
    this.currentIndex = 0;
    this.totalCards = this.cards.length;
    this.isTransitioning = false;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;
    
    // 触摸相关
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;
    this.threshold = 50;
    
    if (this.totalCards > 0) {
      this.init();
    } else {
      console.error('No cards found!');
    }
  }
  
  init() {
    console.log('Initializing slider...');
    this.updateSlider();
    this.bindEvents();
    this.startAutoPlay();
  }
  
  bindEvents() {
    console.log('Binding events...');
    
    // 按钮点击事件
    if (this.prevBtn) {
      console.log('Binding prev button');
      this.prevBtn.addEventListener('click', (e) => {
        console.log('Prev button clicked');
        e.preventDefault();
        this.goToPrev();
      });
    } else {
      console.warn('Prev button not found');
    }
    
    if (this.nextBtn) {
      console.log('Binding next button');
      this.nextBtn.addEventListener('click', (e) => {
        console.log('Next button clicked');
        e.preventDefault();
        this.goToNext();
      });
    } else {
      console.warn('Next button not found');
    }
    
    // 指示器点击事件
    console.log('Binding indicators...');
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', (e) => {
        console.log(`Indicator ${index} clicked`);
        e.preventDefault();
        this.goToSlide(index);
      });
    });
    
    // 触摸事件
    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    
    // 鼠标事件（桌面端拖拽）
    this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.container.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    
    // 键盘导航
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // 鼠标悬停时暂停自动播放
    this.container.addEventListener('mouseenter', () => {
      console.log('Mouse enter - stopping autoplay');
      this.stopAutoPlay();
    });
    this.container.addEventListener('mouseleave', () => {
      console.log('Mouse leave - starting autoplay');
      this.startAutoPlay();
    });
    
    // 窗口大小改变时重新计算
    window.addEventListener('resize', this.handleResize.bind(this));
    
    console.log('Events bound successfully');
  }
  
  goToNext() {
    console.log('goToNext called, current index:', this.currentIndex);
    if (this.isTransitioning) {
      console.log('Already transitioning, skipping');
      return;
    }
    
    const oldIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    console.log(`Moving from slide ${oldIndex} to ${this.currentIndex}`);
    this.updateSlider();
  }
  
  goToPrev() {
    console.log('goToPrev called, current index:', this.currentIndex);
    if (this.isTransitioning) {
      console.log('Already transitioning, skipping');
      return;
    }
    
    const oldIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    console.log(`Moving from slide ${oldIndex} to ${this.currentIndex}`);
    this.updateSlider();
  }
  
  goToSlide(index) {
    console.log(`goToSlide called with index: ${index}, current: ${this.currentIndex}`);
    if (this.isTransitioning || index === this.currentIndex) {
      console.log('Skipping slide change');
      return;
    }
    
    this.currentIndex = index;
    this.updateSlider();
  }
  
  updateSlider() {
    console.log(`Updating slider to index ${this.currentIndex}`);
    this.isTransitioning = true;
    
    // 更新轮播容器位置
    const translateX = -this.currentIndex * 100;
    console.log(`Setting transform: translateX(${translateX}%)`);
    
    if (this.sliderContainer) {
      this.sliderContainer.style.transform = `translateX(${translateX}%)`;
    } else {
      console.error('Slider container not found!');
    }
    
    // 更新指示器
    this.indicators.forEach((indicator, index) => {
      const isActive = index === this.currentIndex;
      indicator.classList.toggle('active', isActive);
      console.log(`Indicator ${index} active: ${isActive}`);
    });
    
    // 更新卡片状态
    this.cards.forEach((card, index) => {
      const isHidden = index !== this.currentIndex;
      card.setAttribute('aria-hidden', isHidden);
    });
    
    // 转换完成后重置状态
    setTimeout(() => {
      this.isTransitioning = false;
      console.log('Transition completed');
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
    console.log('Auto play config:', config);
    
    if (config && config.autoPlay && this.totalCards > 1) {
      console.log(`Starting autoplay with interval: ${config.interval}ms`);
      this.autoPlayInterval = setInterval(() => {
        console.log('Auto advancing slide');
        this.goToNext();
      }, config.interval || this.autoPlayDelay);
    } else {
      console.log('Autoplay disabled or only one slide');
    }
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      console.log('Stopping autoplay');
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
    console.log('Window resized, updating slider');
    this.updateSlider();
  }
  
  // 销毁实例
  destroy() {
    console.log('Destroying slider instance');
    this.stopAutoPlay();
    // 这里可以添加更多清理代码
  }
}

// 简化的初始化函数
function initSliders() {
  console.log('=== Initializing Sliders ===');
  
  // 等待一下确保DOM完全加载
  const sliders = document.querySelectorAll('.news-slider');
  console.log(`Found ${sliders.length} slider(s)`);
  
  if (sliders.length === 0) {
    console.warn('No sliders found! Checking for .news-slider elements...');
    return;
  }
  
  sliders.forEach((slider, index) => {
    console.log(`\n--- Initializing slider ${index + 1} ---`);
    
    // 检查必要元素
    const container = slider.querySelector('.news-slider-container');
    const cards = slider.querySelectorAll('.news-card');
    const indicators = slider.querySelectorAll('.slider-indicator');
    const prevBtn = slider.querySelector('.slider-nav.prev');
    const nextBtn = slider.querySelector('.slider-nav.next');
    
    console.log('Pre-check:');
    console.log('- Container:', !!container);
    console.log('- Cards:', cards.length);
    console.log('- Indicators:', indicators.length);
    console.log('- Prev button:', !!prevBtn);
    console.log('- Next button:', !!nextBtn);
    
    if (cards.length > 0) {
      try {
        const newsSlider = new NewsSlider(slider);
        console.log(`Slider ${index + 1} initialized successfully`);
        
        // 存储实例以便调试
        slider.sliderInstance = newsSlider;
      } catch (error) {
        console.error(`Error initializing slider ${index + 1}:`, error);
      }
    } else {
      console.warn(`Slider ${index + 1} has no cards, skipping initialization`);
    }
  });
  
  console.log('=== Slider initialization complete ===');
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