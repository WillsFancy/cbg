// API Integration Module
// Fintech Platform API Management

document.addEventListener('DOMContentLoaded', function() {
    initializeAPIIntegration();
});

// API data storage
let apiEndpoints = [];
let apiLogs = [];
let webhooks = [];

function initializeAPIIntegration() {
    // Load API endpoints
    loadAPIEndpoints();
    
    // Load API logs
    loadAPILogs();
    
    // Load webhooks
    loadWebhooks();
    
    // Initialize buttons
    initializeAPIButtons();
    
    // Start real-time API monitoring
    startAPIMonitoring();
}

// Load API Endpoints
function loadAPIEndpoints() {
    // Initialize with mock API endpoints
    apiEndpoints = [
        {
            id: 'api_001',
            name: 'MTN Mobile Money',
            endpoint: 'https://api.mtn.com/v1/',
            status: 'online',
            lastSync: new Date(Date.now() - 120000),
            successRate: 98.5,
            responseTime: 145,
            icon: 'fa-mobile-alt',
            type: 'mobile-money'
        },
        {
            id: 'api_002',
            name: 'Telecel Cash',
            endpoint: 'https://api.telecel.com/v1/',
            status: 'online',
            lastSync: new Date(Date.now() - 240000),
            successRate: 96.8,
            responseTime: 165,
            icon: 'fa-mobile-alt',
            type: 'mobile-money'
        },
        {
            id: 'api_003',
            name: 'Airtel Money',
            endpoint: 'https://api.airtel.com/v2/',
            status: 'online',
            lastSync: new Date(Date.now() - 300000),
            successRate: 97.2,
            responseTime: 178,
            icon: 'fa-mobile-alt',
            type: 'mobile-money'
        },
        {
            id: 'api_004',
            name: 'Consolidated Bank Ghana API',
            endpoint: 'https://bank.api.com/v1/',
            status: 'online',
            lastSync: new Date(Date.now() - 60000),
            successRate: 99.1,
            responseTime: 98,
            icon: 'fa-university',
            type: 'banking'
        },
        {
            id: 'api_005',
            name: 'Stripe Payment API',
            endpoint: 'https://api.stripe.com/v1/',
            status: 'online',
            lastSync: new Date(Date.now() - 180000),
            successRate: 99.8,
            responseTime: 112,
            icon: 'fa-plug',
            type: 'fintech'
        }
    ];
    
    updateAPICards();
}

// Update API Cards
function updateAPICards() {
    const apiGrid = document.querySelector('.api-grid');
    if (!apiGrid) return;
    
    apiGrid.innerHTML = apiEndpoints.map(api => `
        <div class="api-card" data-api-id="${api.id}">
            <div class="api-header">
                <i class="fas ${api.icon}"></i>
                <h4>${api.name}</h4>
                <span class="status ${api.status}">${api.status === 'online' ? 'Active' : 'Offline'}</span>
            </div>
            <div class="api-info">
                <p><i class="fas fa-link"></i> ${api.endpoint}</p>
                <p><i class="fas fa-clock"></i> Last Sync: ${formatRelativeTime(api.lastSync)}</p>
                <p><i class="fas fa-check-circle"></i> Success Rate: ${api.successRate}%</p>
                <p><i class="fas fa-tachometer-alt"></i> Response: ${api.responseTime}ms</p>
            </div>
            <div class="api-actions">
                <button class="btn-icon" onclick="editAPI('${api.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="syncAPI('${api.id}')" title="Sync Now">
                    <i class="fas fa-sync"></i>
                </button>
                <button class="btn-icon" onclick="viewAPIStats('${api.id}')" title="View Statistics">
                    <i class="fas fa-chart-bar"></i>
                </button>
                <button class="btn-icon" onclick="testAPI('${api.id}')" title="Test Connection">
                    <i class="fas fa-plug"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Load API Logs
function loadAPILogs() {
    // Generate mock API logs
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    const endpoints = ['/transactions', '/accounts', '/balance', '/transfer', '/payment'];
    const statuses = [200, 201, 400, 401, 404, 500];
    
    apiLogs = [];
    for (let i = 0; i < 20; i++) {
        const api = apiEndpoints[Math.floor(Math.random() * apiEndpoints.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        apiLogs.push({
            timestamp: new Date(Date.now() - Math.random() * 3600000),
            api: api.name,
            method: methods[Math.floor(Math.random() * methods.length)],
            endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
            status: status,
            responseTime: Math.floor(Math.random() * 500) + 50
        });
    }
    
    apiLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    updateAPILogsTable();
}

// Update API Logs Table
function updateAPILogsTable() {
    const tbody = document.getElementById('apiLogsBody');
    if (!tbody) return;
    
    tbody.innerHTML = apiLogs.slice(0, 15).map(log => `
        <tr>
            <td>${formatDateTime(log.timestamp)}</td>
            <td><span class="badge">${log.api}</span></td>
            <td><span class="badge" style="background: ${getMethodColor(log.method)}; color: white;">${log.method}</span></td>
            <td><code style="background: #f1f5f9; padding: 3px 8px; border-radius: 4px; font-size: 12px;">${log.endpoint}</code></td>
            <td><span class="badge ${getStatusClass(log.status)}">${log.status}</span></td>
            <td>${log.responseTime}ms</td>
        </tr>
    `).join('');
}

// Load Webhooks
function loadWebhooks() {
    webhooks = [
        {
            id: 'webhook_001',
            url: 'https://myapp.com/webhooks/transaction-created',
            event: 'Transaction Created',
            status: 'active',
            lastTriggered: new Date(Date.now() - 600000)
        },
        {
            id: 'webhook_002',
            url: 'https://myapp.com/webhooks/fraud-alert',
            event: 'Fraud Alert',
            status: 'active',
            lastTriggered: new Date(Date.now() - 1800000)
        }
    ];
    
    updateWebhookList();
}

// Update Webhook List
function updateWebhookList() {
    const webhookList = document.getElementById('webhookList');
    if (!webhookList) return;
    
    if (webhooks.length === 0) {
        webhookList.innerHTML = `
            <div style="text-align: center; padding: 30px; color: #64748b;">
                <p>No webhooks configured</p>
            </div>
        `;
        return;
    }
    
    webhookList.innerHTML = webhooks.map(webhook => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; 
                    border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 10px;">
            <div>
                <strong>${webhook.event}</strong>
                <p style="font-size: 13px; color: #64748b; margin-top: 5px;">
                    <i class="fas fa-link"></i> ${webhook.url}
                </p>
                <p style="font-size: 12px; color: #64748b; margin-top: 3px;">
                    Last triggered: ${formatRelativeTime(webhook.lastTriggered)}
                </p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="btn-icon" onclick="testWebhook('${webhook.id}')">
                    <i class="fas fa-play"></i>
                </button>
                <button class="btn-icon" onclick="editWebhook('${webhook.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteWebhook('${webhook.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize API Buttons
function initializeAPIButtons() {
    const addApiBtn = document.getElementById('addApiBtn');
    if (addApiBtn) {
        addApiBtn.addEventListener('click', showAddAPIModal);
    }
    
    // Webhook form
    const webhookForm = document.querySelector('.webhook-form button');
    if (webhookForm) {
        webhookForm.addEventListener('click', addWebhook);
    }
}

// API Actions
window.editAPI = function(apiId) {
    const api = apiEndpoints.find(a => a.id === apiId);
    if (!api) return;
    
    alert(`Edit API Configuration\n\n` +
          `Name: ${api.name}\n` +
          `Endpoint: ${api.endpoint}\n` +
          `Type: ${api.type}\n\n` +
          'Opening configuration editor...');
};

window.syncAPI = function(apiId) {
    const api = apiEndpoints.find(a => a.id === apiId);
    if (!api) return;
    
    const card = document.querySelector(`[data-api-id="${apiId}"]`);
    const syncBtn = card.querySelector('.fa-sync').parentElement;
    
    // Add spinning animation
    syncBtn.querySelector('i').classList.add('fa-spin');
    syncBtn.disabled = true;
    
    // Simulate API sync
    setTimeout(() => {
        api.lastSync = new Date();
        api.successRate = Math.min(99.9, api.successRate + Math.random() * 0.5);
        api.responseTime = Math.floor(Math.random() * 200) + 80;
        
        updateAPICards();
        
        // Add log entry
        addAPILog(api.name, 'GET', '/sync', 200, api.responseTime);
        
        showAPINotification(`${api.name} synced successfully`, 'success');
    }, 2000);
};

window.viewAPIStats = function(apiId) {
    const api = apiEndpoints.find(a => a.id === apiId);
    if (!api) return;
    
    const stats = `
API Statistics - ${api.name}
============================

Endpoint: ${api.endpoint}
Status: ${api.status.toUpperCase()}

Performance Metrics:
- Success Rate: ${api.successRate}%
- Average Response Time: ${api.responseTime}ms
- Uptime: 99.7%
- Total Requests (24h): ${Math.floor(Math.random() * 10000) + 5000}
- Failed Requests (24h): ${Math.floor(Math.random() * 50) + 10}

Last Sync: ${formatDateTime(api.lastSync)}

Recent Activity:
- Successful transactions processed
- No critical errors detected
- Performance within acceptable limits
    `;
    
    alert(stats);
};

window.testAPI = function(apiId) {
    const api = apiEndpoints.find(a => a.id === apiId);
    if (!api) return;
    
    showAPINotification(`Testing connection to ${api.name}...`, 'info');
    
    setTimeout(() => {
        const success = Math.random() > 0.1;
        if (success) {
            showAPINotification(`Connection test successful! Response time: ${api.responseTime}ms`, 'success');
            addAPILog(api.name, 'GET', '/health', 200, api.responseTime);
        } else {
            showAPINotification(`Connection test failed. Please check API configuration.`, 'error');
            addAPILog(api.name, 'GET', '/health', 500, 0);
        }
    }, 1500);
};

// Show Add API Modal
function showAddAPIModal() {
    const apiName = prompt('Enter API Name:');
    if (!apiName) return;
    
    const endpoint = prompt('Enter API Endpoint URL:');
    if (!endpoint) return;
    
    const newAPI = {
        id: `api_${String(Date.now()).slice(-6)}`,
        name: apiName,
        endpoint: endpoint,
        status: 'online',
        lastSync: new Date(),
        successRate: 100,
        responseTime: Math.floor(Math.random() * 200) + 80,
        icon: 'fa-plug',
        type: 'custom'
    };
    
    apiEndpoints.push(newAPI);
    updateAPICards();
    showAPINotification(`API "${apiName}" added successfully`, 'success');
}

// Webhook Actions
function addWebhook() {
    const form = document.querySelector('.webhook-form');
    const urlInput = form.querySelector('input[type="text"]');
    const eventSelect = form.querySelector('select');
    
    if (!urlInput.value) {
        alert('Please enter a webhook URL');
        return;
    }
    
    const newWebhook = {
        id: `webhook_${String(Date.now()).slice(-6)}`,
        url: urlInput.value,
        event: eventSelect.value,
        status: 'active',
        lastTriggered: new Date()
    };
    
    webhooks.push(newWebhook);
    updateWebhookList();
    
    urlInput.value = '';
    showAPINotification('Webhook added successfully', 'success');
}

window.testWebhook = function(webhookId) {
    const webhook = webhooks.find(w => w.id === webhookId);
    if (!webhook) return;
    
    showAPINotification(`Testing webhook: ${webhook.event}...`, 'info');
    
    setTimeout(() => {
        webhook.lastTriggered = new Date();
        updateWebhookList();
        showAPINotification('Webhook test successful!', 'success');
    }, 1500);
};

window.editWebhook = function(webhookId) {
    const webhook = webhooks.find(w => w.id === webhookId);
    if (!webhook) return;
    
    const newUrl = prompt('Edit Webhook URL:', webhook.url);
    if (newUrl) {
        webhook.url = newUrl;
        updateWebhookList();
        showAPINotification('Webhook updated', 'success');
    }
};

window.deleteWebhook = function(webhookId) {
    if (confirm('Are you sure you want to delete this webhook?')) {
        webhooks = webhooks.filter(w => w.id !== webhookId);
        updateWebhookList();
        showAPINotification('Webhook deleted', 'info');
    }
};

// Start API Monitoring
function startAPIMonitoring() {
    setInterval(() => {
        // Update API status and metrics
        apiEndpoints.forEach(api => {
            api.lastSync = new Date(api.lastSync.getTime() + 1000);
            api.responseTime = Math.floor(Math.random() * 50) + api.responseTime * 0.9;
            
            // Occasionally simulate API call
            if (Math.random() > 0.7) {
                const methods = ['GET', 'POST'];
                const endpoints = ['/transactions', '/accounts', '/balance'];
                addAPILog(
                    api.name,
                    methods[Math.floor(Math.random() * methods.length)],
                    endpoints[Math.floor(Math.random() * endpoints.length)],
                    Math.random() > 0.95 ? 500 : 200,
                    api.responseTime
                );
            }
        });
    }, 5000);
}

// Add API Log
function addAPILog(apiName, method, endpoint, status, responseTime) {
    apiLogs.unshift({
        timestamp: new Date(),
        api: apiName,
        method: method,
        endpoint: endpoint,
        status: status,
        responseTime: responseTime
    });
    
    // Keep only last 100 logs
    if (apiLogs.length > 100) {
        apiLogs = apiLogs.slice(0, 100);
    }
    
    updateAPILogsTable();
}

// Show API Notification
function showAPINotification(message, type) {
    const notification = document.createElement('div');
    
    const colors = {
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#2563eb',
        'success': '#10b981'
    };
    
    const icons = {
        'error': 'fa-times-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle',
        'success': 'fa-check-circle'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 10px;
        border-left: 4px solid ${colors[type]};
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        min-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${icons[type]}" style="color: ${colors[type]}; font-size: 20px;"></i>
            <div>
                <strong>API Integration</strong>
                <p style="font-size: 13px; color: #64748b; margin-top: 3px;">
                    ${message}
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Helper Functions
function getMethodColor(method) {
    const colors = {
        'GET': '#10b981',
        'POST': '#2563eb',
        'PUT': '#f59e0b',
        'DELETE': '#ef4444'
    };
    return colors[method] || '#64748b';
}

function getStatusClass(status) {
    if (status >= 200 && status < 300) return 'success';
    if (status >= 400 && status < 500) return 'warning';
    if (status >= 500) return 'failed';
    return 'pending';
}

function formatDateTime(date) {
    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

function formatRelativeTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
}

// Export API documentation
window.exportAPIDocumentation = function() {
    const documentation = {
        endpoints: apiEndpoints,
        webhooks: webhooks,
        statistics: {
            totalAPIs: apiEndpoints.length,
            activeAPIs: apiEndpoints.filter(a => a.status === 'online').length,
            averageResponseTime: apiEndpoints.reduce((sum, api) => sum + api.responseTime, 0) / apiEndpoints.length,
            averageSuccessRate: apiEndpoints.reduce((sum, api) => sum + api.successRate, 0) / apiEndpoints.length
        }
    };
    
    const dataStr = JSON.stringify(documentation, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `api_documentation_${new Date().getTime()}.json`;
    link.click();
};
