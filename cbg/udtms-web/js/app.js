// Main Application Script
// Navigation and Core Functionality

// Initialize application on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeNavigation();
    initializeDashboard();
    initializeRealTimeMonitoring();
});

// Application Initialization
function initializeApp() {
    console.log('UDTMS Application Initialized');
    
    // Set current date
    setCurrentDates();
    
    // Initialize menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Global search functionality
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('input', debounce(handleGlobalSearch, 300));
    }

    // Notification click handler
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', showNotifications);
    }
}

// Navigation between pages
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');
    const pageTitle = document.getElementById('pageTitle');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Get target page
            const targetPage = item.getAttribute('data-page');
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show target page
            const targetElement = document.getElementById(`${targetPage}-page`);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Update page title
            const pageTitles = {
                'dashboard': 'Dashboard',
                'transactions': 'Real-time Transaction Monitoring',
                'reconciliation': 'Automated Reconciliation',
                'fraud': 'Fraud Detection & Alert System',
                'customer': 'Customer Self-Service Portal',
                'api': 'API Integration & Management',
                'settings': 'System Settings'
            };
            
            pageTitle.textContent = pageTitles[targetPage] || 'Dashboard';
        });
    });
}

// Initialize Dashboard
function initializeDashboard() {
    updateDashboardStats();
    loadRecentActivity();
    initializeChart();
    updatePlatformStatus();
    
    // Refresh dashboard every 5 seconds
    setInterval(() => {
        updateDashboardStats();
        loadRecentActivity();
    }, 5000);
}

// Update Dashboard Statistics
function updateDashboardStats() {
    // Simulate real-time data
    const stats = {
        total: Math.floor(Math.random() * 1000) + 5000,
        successful: Math.floor(Math.random() * 900) + 4500,
        failed: Math.floor(Math.random() * 50) + 20,
        fraud: Math.floor(Math.random() * 10) + 3
    };
    
    document.getElementById('totalTransactions').textContent = stats.total.toLocaleString();
    document.getElementById('successfulTransactions').textContent = stats.successful.toLocaleString();
    document.getElementById('failedTransactions').textContent = stats.failed.toLocaleString();
    document.getElementById('fraudAlerts').textContent = stats.fraud;
}

// Load Recent Activity
function loadRecentActivity() {
    const activityList = document.getElementById('recentActivityList');
    if (!activityList) return;
    
    const activities = generateMockActivities(8);
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.status}">
                <i class="fas ${getStatusIcon(activity.status)}"></i>
            </div>
            <div class="activity-details">
                <h4>${activity.description}</h4>
                <p>${activity.time} • ${activity.platform}</p>
            </div>
            <div class="activity-amount" style="color: ${activity.status === 'success' ? 'var(--secondary-color)' : 'var(--danger-color)'}">
                ${activity.amount}
            </div>
        </div>
    `).join('');
}

// Initialize Chart
let transactionChart;
function initializeChart() {
    const ctx = document.getElementById('transactionChart');
    if (!ctx) return;
    
    const data = {
        labels: generateTimeLabels(12),
        datasets: [{
            label: 'Successful',
            data: generateRandomData(12, 50, 200),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
        }, {
            label: 'Failed',
            data: generateRandomData(12, 0, 20),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4
        }]
    };
    
    transactionChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Update chart every 10 seconds
    setInterval(() => {
        updateChart();
    }, 10000);
}

// Update Chart with new data
function updateChart() {
    if (!transactionChart) return;
    
    // Remove first data point
    transactionChart.data.labels.shift();
    transactionChart.data.datasets.forEach(dataset => {
        dataset.data.shift();
    });
    
    // Add new data point
    const now = new Date();
    transactionChart.data.labels.push(formatTime(now));
    transactionChart.data.datasets[0].data.push(Math.floor(Math.random() * 150) + 50);
    transactionChart.data.datasets[1].data.push(Math.floor(Math.random() * 20));
    
    transactionChart.update();
}

// Update Platform Status
function updatePlatformStatus() {
    // Simulate real-time status updates
    setInterval(() => {
        const platforms = document.querySelectorAll('.platform-card p');
        platforms.forEach(platform => {
            const responseTime = Math.floor(Math.random() * 200) + 80;
            platform.textContent = `Response Time: ${responseTime}ms`;
        });
    }, 5000);
}

// Real-time Monitoring
function initializeRealTimeMonitoring() {
    // Simulate real-time transaction updates
    setInterval(() => {
        const notificationBadge = document.getElementById('notificationBadge');
        if (notificationBadge) {
            const count = parseInt(notificationBadge.textContent) || 0;
            notificationBadge.textContent = Math.min(count + Math.floor(Math.random() * 2), 9);
        }
    }, 15000);
}

// Helper Functions

function generateMockActivities(count) {
    const activities = [];
    const descriptions = [
        'Mobile Money Transfer',
        'Bank Account Deposit',
        'Fintech Payment',
        'Internet Banking Transfer',
        'Mobile Banking Withdrawal',
        'Card Payment',
        'Bill Payment',
        'International Transfer'
    ];
    
    const platforms = ['Mobile Money', 'Internet Banking', 'Fintech', 'Mobile Banking'];
    const statuses = ['success', 'failed', 'pending'];
    
    for (let i = 0; i < count; i++) {
        activities.push({
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            time: generateRandomTime(),
            platform: platforms[Math.floor(Math.random() * platforms.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            amount: `₵${(Math.random() * 1000).toFixed(2)}`
        });
    }
    
    return activities;
}

function generateTimeLabels(count) {
    const labels = [];
    const now = new Date();
    
    for (let i = count - 1; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 5 * 60000); // 5-minute intervals
        labels.push(formatTime(time));
    }
    
    return labels;
}

function generateRandomData(count, min, max) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
}

function generateRandomTime() {
    const minutes = Math.floor(Math.random() * 60);
    return minutes === 0 ? 'Just now' : `${minutes} min ago`;
}

function getStatusIcon(status) {
    const icons = {
        'success': 'fa-check-circle',
        'failed': 'fa-times-circle',
        'pending': 'fa-clock'
    };
    return icons[status] || 'fa-circle';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleGlobalSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    console.log('Searching for:', searchTerm);
    
    // Implement global search logic here
    if (searchTerm.length > 2) {
        // Search across all transactions
        showSearchResults(searchTerm);
    }
}

function showSearchResults(term) {
    // Show search results in a dropdown or modal
    console.log('Search results for:', term);
}

function showNotifications() {
    alert('Notifications:\n\n' +
          '• 3 high-risk transactions detected\n' +
          '• Reconciliation completed successfully\n' +
          '• New API endpoint connected');
}

function setCurrentDates() {
    const today = new Date().toISOString().split('T')[0];
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');
    
    if (dateFrom) {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        dateFrom.value = weekAgo.toISOString().split('T')[0];
    }
    
    if (dateTo) {
        dateTo.value = today;
    }
}

// Export functions for use in other modules
window.UDTMS = {
    generateMockActivities,
    formatTime,
    debounce
};
