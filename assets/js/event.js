// Event Listing JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize event functionality
    initializeEventSearch();
    initializeViewToggle();
    initializeDateNavigation();
    initializeEventInteractions();
});

function initializeEventSearch() {
    const searchInput = document.getElementById('eventSearch');
    const findBtn = document.getElementById('findEventsBtn');
    const eventsContainer = document.getElementById('eventsContainer');
    
    if (!searchInput || !eventsContainer) return;
    
    let searchTimeout;
    
    // Real-time search as user types
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value.toLowerCase());
        }, 300);
    });
    
    // Search button click
    if (findBtn) {
        findBtn.addEventListener('click', function() {
            performSearch(searchInput.value.toLowerCase());
        });
    }
    
    // Enter key search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value.toLowerCase());
        }
    });
    
    function performSearch(query) {
        const eventItems = eventsContainer.querySelectorAll('.event-item');
        const monthSections = eventsContainer.querySelectorAll('.month-section');
        let hasVisibleEvents = false;
        
        // Clear previous highlights
        clearHighlights();
        
        if (!query.trim()) {
            // Show all events if search is empty
            eventItems.forEach(item => item.classList.remove('hidden'));
            monthSections.forEach(section => section.classList.remove('hidden'));
            return;
        }
        
        monthSections.forEach(monthSection => {
            let monthHasVisible = false;
            const eventsInMonth = monthSection.querySelectorAll('.event-item');
            
            eventsInMonth.forEach(item => {
                const searchableText = item.dataset.title + ' ' + 
                                     item.querySelector('.event-title').textContent + ' ' +
                                     item.querySelector('.event-time').textContent;
                
                if (searchableText.toLowerCase().includes(query)) {
                    item.classList.remove('hidden');
                    monthHasVisible = true;
                    hasVisibleEvents = true;
                    
                    // Highlight matching terms
                    highlightSearchTerm(item, query);
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Hide/show month section based on whether it has visible events
            if (monthHasVisible) {
                monthSection.classList.remove('hidden');
            } else {
                monthSection.classList.add('hidden');
            }
        });
        
        // Show "no results" message if needed
        showNoResultsMessage(!hasVisibleEvents, query);
    }
    
    function highlightSearchTerm(eventItem, term) {
        const titleElement = eventItem.querySelector('.event-title a');
        if (!titleElement) return;
        
        const originalText = titleElement.textContent;
        const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
        const highlightedText = originalText.replace(regex, '<span class="highlight">$1</span>');
        
        if (highlightedText !== originalText) {
            titleElement.innerHTML = highlightedText;
        }
    }
    
    function clearHighlights() {
        const highlightedElements = eventsContainer.querySelectorAll('.highlight');
        highlightedElements.forEach(element => {
            const parent = element.parentNode;
            parent.replaceChild(document.createTextNode(element.textContent), element);
            parent.normalize();
        });
    }
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function showNoResultsMessage(show, query) {
        let noResultsMsg = eventsContainer.querySelector('.no-results-message');
        
        if (show) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.style.cssText = `
                    text-align: center;
                    padding: 3rem 1rem;
                    color: #6b7280;
                    font-size: 1.1rem;
                `;
                eventsContainer.appendChild(noResultsMsg);
            }
            noResultsMsg.innerHTML = `
                <h3 style="margin-bottom: 1rem; color: #374151;">No events found</h3>
                <p>No events match your search for "<strong>${query}</strong>". Try different keywords or browse all events.</p>
                <button onclick="document.getElementById('eventSearch').value=''; document.querySelector('.no-results-message').remove(); location.reload();" 
                        style="margin-top: 1rem; padding: 0.5rem 1rem; background: #1e3a8a; color: white; border: none; border-radius: 0.25rem; cursor: pointer;">
                    Show All Events
                </button>
            `;
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

function initializeViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const view = this.dataset.view;
            toggleView(view);
        });
    });
    
    function toggleView(view) {
        const eventsContainer = document.getElementById('eventsContainer');
        
        if (view === 'month') {
            // Switch to month view (could implement calendar view here)
            eventsContainer.style.opacity = '0.6';
            
            // Simulate loading
            setTimeout(() => {
                eventsContainer.style.opacity = '1';
                // For now, just show a message that month view is coming
                showViewMessage('Month view coming soon! Currently showing list view.');
            }, 500);
        } else {
            // List view (default)
            eventsContainer.style.opacity = '1';
            hideViewMessage();
        }
    }
    
    function showViewMessage(message) {
        let messageEl = document.querySelector('.view-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'view-message';
            messageEl.style.cssText = `
                background: #dbeafe;
                color: #1e40af;
                padding: 0.75rem 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                border: 1px solid #bfdbfe;
            `;
            document.getElementById('eventsContainer').insertAdjacentElement('beforebegin', messageEl);
        }
        messageEl.textContent = message;
    }
    
    function hideViewMessage() {
        const messageEl = document.querySelector('.view-message');
        if (messageEl) {
            messageEl.remove();
        }
    }
}

function initializeDateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const todayBtn = document.getElementById('todayBtn');
    const dateRange = document.getElementById('dateRange');
    
    let currentDate = new Date();
    let currentEndDate = new Date(currentDate.getTime() + (45 * 24 * 60 * 60 * 1000)); // 45 days later
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            // Move date range back by 30 days
            currentDate.setDate(currentDate.getDate() - 30);
            currentEndDate.setDate(currentEndDate.getDate() - 30);
            updateDateRange();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // Move date range forward by 30 days
            currentDate.setDate(currentDate.getDate() + 30);
            currentEndDate.setDate(currentEndDate.getDate() + 30);
            updateDateRange();
        });
    }
    
    if (todayBtn) {
        todayBtn.addEventListener('click', function() {
            // Reset to current date
            currentDate = new Date();
            currentEndDate = new Date(currentDate.getTime() + (45 * 24 * 60 * 60 * 1000));
            updateDateRange();
        });
    }
    
    if (dateRange) {
        dateRange.addEventListener('click', function() {
            // Could implement date picker here
            alert('Date range picker coming soon!');
        });
    }
    
    function updateDateRange() {
        if (!dateRange) return;
        
        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric'
            });
        };
        
        dateRange.textContent = `${formatDate(currentDate)} - ${formatDate(currentEndDate)} ▼`;
        
        // Here you could filter events based on the date range
        filterEventsByDateRange(currentDate, currentEndDate);
    }
    
    function filterEventsByDateRange(startDate, endDate) {
        const eventItems = document.querySelectorAll('.event-item');
        const monthSections = document.querySelectorAll('.month-section');
        
        eventItems.forEach(item => {
            const eventDateStr = item.dataset.date;
            if (eventDateStr) {
                const eventDate = new Date(eventDateStr);
                if (eventDate >= startDate && eventDate <= endDate) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            }
        });
        
        // Hide/show month sections based on visible events
        monthSections.forEach(section => {
            const visibleEvents = section.querySelectorAll('.event-item[style*="flex"]');
            section.style.display = visibleEvents.length > 0 ? 'block' : 'none';
        });
    }
}

function initializeEventInteractions() {
    const eventItems = document.querySelectorAll('.event-item');
    
    eventItems.forEach(item => {
        // Add click-to-expand functionality
        item.addEventListener('click', function(e) {
            // Don't expand if user clicked on a link
            if (e.target.tagName === 'A') return;
            
            toggleEventDetails(this);
        });
        
        // Add keyboard navigation
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleEventDetails(this);
            }
        });
    });
    
    function toggleEventDetails(eventItem) {
        const isExpanded = eventItem.classList.contains('expanded');
        
        // Close all other expanded events
        document.querySelectorAll('.event-item.expanded').forEach(item => {
            if (item !== eventItem) {
                item.classList.remove('expanded');
                const details = item.querySelector('.event-extra-details');
                if (details) details.remove();
            }
        });
        
        if (!isExpanded) {
            // Expand this event
            eventItem.classList.add('expanded');
            addExtraDetails(eventItem);
        } else {
            // Collapse this event
            eventItem.classList.remove('expanded');
            const details = eventItem.querySelector('.event-extra-details');
            if (details) details.remove();
        }
    }
    
    function addExtraDetails(eventItem) {
        // Check if details already exist
        if (eventItem.querySelector('.event-extra-details')) return;
        
        const extraDetails = document.createElement('div');
        extraDetails.className = 'event-extra-details';
        extraDetails.style.cssText = `
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            animation: fadeIn 0.3s ease;
        `;
        
        // Add some sample extra details
        extraDetails.innerHTML = `
            <div style="margin-bottom: 0.5rem;">
                <strong>Location:</strong> Virtual Event
            </div>
            <div style="margin-bottom: 0.5rem;">
                <strong>Duration:</strong> 1 hour 15 minutes
            </div>
            <div style="margin-bottom: 0.5rem;">
                <strong>Registration:</strong> Required
            </div>
            <div style="margin-top: 1rem;">
                <button onclick="alert('Registration functionality coming soon!')" 
                        style="background: #059669; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer; margin-right: 0.5rem;">
                    Register
                </button>
                <button onclick="alert('Calendar functionality coming soon!')" 
                        style="background: #6b7280; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
                    Add to Calendar
                </button>
            </div>
        `;
        
        eventItem.querySelector('.event-details').appendChild(extraDetails);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .event-item.expanded {
        background: #f8fafc;
        border-radius: 0.5rem;
        padding: 1rem !important;
        margin: 0 -1rem 2rem -1rem !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);