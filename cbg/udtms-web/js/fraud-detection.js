// Fraud Detection Module
// Advanced Fraud Detection and Alert System

document.addEventListener('DOMContentLoaded', function() {
    initializeFraudDetection();
});

// Fraud detection data
let fraudAlerts = [];
let fraudStats = {
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
    blocked: 0
};

// Fraud detection rules
let fraudRules = {
    velocityCheck: { enabled: true, threshold: 5, timeWindow: 10 },
    amountAnomaly: { enabled: true, threshold: 200 },
    geoLocation: { enabled: true, timeWindow: 2 },
    deviceFingerprint: { enabled: true }
};

function initializeFraudDetection() {
    // Generate initial fraud alerts
    generateFraudAlerts();
    
    // Load fraud statistics
    updateFraudStats();
    
    // Initialize fraud rules
    initializeFraudRules();
    
    // Start real-time monitoring
    startFraudMonitoring();
    
    // Initialize view alerts button
    const viewAlertsBtn = document.getElementById('viewAlertsBtn');
    if (viewAlertsBtn) {
        viewAlertsBtn.addEventListener('click', () => {
            alert('Opening all fraud alerts in detailed view...');
        });
    }
}

// Generate Fraud Alerts
function generateFraudAlerts() {
    const alertTypes = [
        {
            type: 'Velocity Check Triggered',
            description: 'Multiple transactions detected in short time period',
            severity: 'high'
        },
        {
            type: 'Amount Anomaly',
            description: 'Transaction amount significantly exceeds user average',
            severity: 'medium'
        },
        {
            type: 'Suspicious Geo-location',
            description: 'Transaction from unusual location',
            severity: 'high'
        },
        {
            type: 'Device Change',
            description: 'New device detected for account',
            severity: 'low'
        },
        {
            type: 'Pattern Deviation',
            description: 'Transaction pattern differs from normal behavior',
            severity: 'medium'
        },
        {
            type: 'Known Fraud Network',
            description: 'Transaction linked to known fraud network',
            severity: 'high'
        }
    ];
    
    fraudAlerts = [];
    const alertCount = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < alertCount; i++) {
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        fraudAlerts.push({
            id: `FRD${String(10000 + i).slice(-5)}`,
            transactionId: `TXN${String(100000 + Math.floor(Math.random() * 900000))}`,
            type: alertType.type,
            description: alertType.description,
            severity: alertType.severity,
            timestamp: generateRandomTimestamp(),
            customer: generateCustomerName(),
            amount: (Math.random() * 5000 + 100).toFixed(2),
            status: 'active'
        });
    }
    
    fraudAlerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    loadFraudAlerts();
}

// Load Fraud Alerts
function loadFraudAlerts() {
    const alertsContainer = document.getElementById('fraudAlertsContainer');
    if (!alertsContainer) return;
    
    if (fraudAlerts.length === 0) {
        alertsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #64748b;">
                <i class="fas fa-shield-alt" style="font-size: 50px; color: #10b981; margin-bottom: 15px;"></i>
                <h3>No Active Fraud Alerts</h3>
                <p>System is monitoring transactions in real-time</p>
            </div>
        `;
        return;
    }
    
    alertsContainer.innerHTML = fraudAlerts
        .filter(alert => alert.status === 'active')
        .slice(0, 10)
        .map(alert => `
            <div class="alert-card ${alert.severity}">
                <div class="alert-info">
                    <h4>
                        <i class="fas ${getSeverityIcon(alert.severity)}"></i>
                        ${alert.type}
                    </h4>
                    <p>${alert.description}</p>
                    <div style="display: flex; gap: 20px; margin-top: 8px; font-size: 13px; color: #64748b;">
                        <span><i class="fas fa-user"></i> ${alert.customer}</span>
                        <span><i class="fas fa-money-bill-wave"></i> ₵${parseFloat(alert.amount).toLocaleString()}</span>
                        <span><i class="fas fa-clock"></i> ${formatRelativeTime(alert.timestamp)}</span>
                    </div>
                </div>
                <div class="alert-actions">
                    <button class="btn btn-primary" onclick="investigateFraud('${alert.id}')">
                        Investigate
                    </button>
                    <button class="btn btn-danger" onclick="blockTransaction('${alert.id}')">
                        Block
                    </button>
                    <button class="btn btn-outline" onclick="dismissAlert('${alert.id}')">
                        Dismiss
                    </button>
                </div>
            </div>
        `).join('');
}

// Update Fraud Statistics
function updateFraudStats() {
    fraudStats = {
        highRisk: fraudAlerts.filter(a => a.severity === 'high' && a.status === 'active').length,
        mediumRisk: fraudAlerts.filter(a => a.severity === 'medium' && a.status === 'active').length,
        lowRisk: fraudAlerts.filter(a => a.severity === 'low' && a.status === 'active').length,
        blocked: fraudAlerts.filter(a => a.status === 'blocked').length
    };
    
    document.getElementById('highRiskCount').textContent = fraudStats.highRisk;
    document.getElementById('mediumRiskCount').textContent = fraudStats.mediumRisk;
    document.getElementById('lowRiskCount').textContent = fraudStats.lowRisk;
    document.getElementById('blockedCount').textContent = fraudStats.blocked;
}

// Initialize Fraud Rules
function initializeFraudRules() {
    const ruleCards = document.querySelectorAll('.rule-card');
    
    ruleCards.forEach(card => {
        const toggle = card.querySelector('input[type="checkbox"]');
        const inputs = card.querySelectorAll('input[type="number"]');
        
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                const ruleName = card.querySelector('h4').textContent;
                console.log(`Rule "${ruleName}" ${e.target.checked ? 'enabled' : 'disabled'}`);
                showRuleNotification(ruleName, e.target.checked);
            });
        }
        
        inputs.forEach(input => {
            input.addEventListener('change', (e) => {
                console.log(`Rule parameter updated: ${e.target.value}`);
            });
        });
    });
}

// Fraud Detection Algorithms

// Velocity Check
function velocityCheck(transactions) {
    const rule = fraudRules.velocityCheck;
    if (!rule.enabled) return [];
    
    const alerts = [];
    const timeWindow = rule.timeWindow * 60 * 1000; // Convert to milliseconds
    
    // Group transactions by customer
    const customerTransactions = {};
    transactions.forEach(txn => {
        if (!customerTransactions[txn.customer]) {
            customerTransactions[txn.customer] = [];
        }
        customerTransactions[txn.customer].push(txn);
    });
    
    // Check each customer's transaction velocity
    Object.keys(customerTransactions).forEach(customer => {
        const txns = customerTransactions[customer].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        let count = 0;
        const now = new Date();
        
        for (let txn of txns) {
            const txnTime = new Date(txn.timestamp);
            if (now - txnTime <= timeWindow) {
                count++;
            }
        }
        
        if (count >= rule.threshold) {
            alerts.push({
                type: 'Velocity Check',
                customer: customer,
                count: count,
                severity: 'high'
            });
        }
    });
    
    return alerts;
}

// Amount Anomaly Detection
function amountAnomalyCheck(transaction, customerHistory) {
    const rule = fraudRules.amountAnomaly;
    if (!rule.enabled) return null;
    
    // Calculate average transaction amount
    const avgAmount = customerHistory.reduce((sum, txn) => 
        sum + parseFloat(txn.amount), 0
    ) / customerHistory.length;
    
    const currentAmount = parseFloat(transaction.amount);
    const percentageIncrease = ((currentAmount - avgAmount) / avgAmount) * 100;
    
    if (percentageIncrease >= rule.threshold) {
        return {
            type: 'Amount Anomaly',
            averageAmount: avgAmount,
            currentAmount: currentAmount,
            percentageIncrease: percentageIncrease,
            severity: percentageIncrease >= 300 ? 'high' : 'medium'
        };
    }
    
    return null;
}

// Geo-location Check
function geoLocationCheck(transaction, previousTransaction) {
    const rule = fraudRules.geoLocation;
    if (!rule.enabled) return null;
    
    // Simulate geo-location data
    const locations = ['New York', 'London', 'Tokyo', 'Mumbai', 'Sydney', 'Dubai'];
    const currentLocation = locations[Math.floor(Math.random() * locations.length)];
    const previousLocation = locations[Math.floor(Math.random() * locations.length)];
    
    const timeDifference = new Date(transaction.timestamp) - new Date(previousTransaction.timestamp);
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    
    // Check for impossible travel
    if (currentLocation !== previousLocation && hoursDifference < rule.timeWindow) {
        return {
            type: 'Geo-location Anomaly',
            currentLocation: currentLocation,
            previousLocation: previousLocation,
            timeDifference: hoursDifference,
            severity: 'high'
        };
    }
    
    return null;
}

// Device Fingerprint Check
function deviceFingerprintCheck(transaction, knownDevices) {
    const rule = fraudRules.deviceFingerprint;
    if (!rule.enabled) return null;
    
    // Simulate device fingerprint
    const deviceId = `DEV${Math.floor(Math.random() * 1000000)}`;
    
    if (!knownDevices.includes(deviceId)) {
        return {
            type: 'New Device Detected',
            deviceId: deviceId,
            severity: 'low'
        };
    }
    
    return null;
}

// Calculate Risk Score
function calculateRiskScore(transaction, alerts) {
    let score = 0;
    
    // Base score on transaction amount
    const amount = parseFloat(transaction.amount);
    if (amount > 5000) score += 20;
    else if (amount > 2000) score += 10;
    else if (amount > 1000) score += 5;
    
    // Add points for each alert
    alerts.forEach(alert => {
        if (alert.severity === 'high') score += 30;
        else if (alert.severity === 'medium') score += 15;
        else score += 5;
    });
    
    // Time-based risk (late night transactions)
    const hour = new Date(transaction.timestamp).getHours();
    if (hour >= 0 && hour <= 5) score += 10;
    
    return Math.min(score, 100);
}

// Investigate Fraud Alert
window.investigateFraud = function(alertId) {
    const alert = fraudAlerts.find(a => a.id === alertId);
    if (!alert) return;
    
    const investigation = `
Fraud Investigation Report
========================

Alert ID: ${alert.id}
Transaction ID: ${alert.transactionId}
Type: ${alert.type}
Severity: ${alert.severity.toUpperCase()}

Customer: ${alert.customer}
Amount: ₵${parseFloat(alert.amount).toLocaleString()}
Timestamp: ${formatDateTime(alert.timestamp)}

Description: ${alert.description}

Recommended Actions:
1. Review customer transaction history
2. Contact customer to verify transaction
3. Check device and location information
4. Review similar patterns in system

Status: Under Investigation
    `;
    
    alert('Investigation Details:\n\n' + investigation);
};

// Block Transaction
window.blockTransaction = function(alertId) {
    const alert = fraudAlerts.find(a => a.id === alertId);
    if (!alert) return;
    
    if (confirm(`Block transaction ${alert.transactionId}?\n\nThis will prevent the transaction from processing and notify the customer.`)) {
        alert.status = 'blocked';
        loadFraudAlerts();
        updateFraudStats();
        showFraudNotification(`Transaction ${alert.transactionId} has been blocked`, 'error');
    }
};

// Dismiss Alert
window.dismissAlert = function(alertId) {
    const alert = fraudAlerts.find(a => a.id === alertId);
    if (!alert) return;
    
    if (confirm(`Dismiss fraud alert ${alertId}?\n\nThis will mark the alert as a false positive.`)) {
        alert.status = 'dismissed';
        loadFraudAlerts();
        updateFraudStats();
        showFraudNotification(`Alert ${alertId} dismissed`, 'info');
    }
};

// Start Real-time Fraud Monitoring
function startFraudMonitoring() {
    setInterval(() => {
        // Simulate new fraud detection
        if (Math.random() > 0.8) {
            generateNewFraudAlert();
        }
    }, 20000); // Every 20 seconds
}

// Generate New Fraud Alert
function generateNewFraudAlert() {
    const alertTypes = [
        { type: 'Velocity Check', severity: 'high', description: 'Multiple rapid transactions detected' },
        { type: 'Amount Anomaly', severity: 'medium', description: 'Unusual transaction amount' },
        { type: 'Geo-location', severity: 'high', description: 'Suspicious location detected' }
    ];
    
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    const newAlert = {
        id: `FRD${String(10000 + fraudAlerts.length).slice(-5)}`,
        transactionId: `TXN${String(100000 + Math.floor(Math.random() * 900000))}`,
        type: alertType.type,
        description: alertType.description,
        severity: alertType.severity,
        timestamp: new Date(),
        customer: generateCustomerName(),
        amount: (Math.random() * 5000 + 100).toFixed(2),
        status: 'active'
    };
    
    fraudAlerts.unshift(newAlert);
    loadFraudAlerts();
    updateFraudStats();
    
    showFraudNotification(`New ${alertType.severity} risk alert detected`, 'warning');
}

// Show Fraud Notification
function showFraudNotification(message, type) {
    const notification = document.createElement('div');
    
    const colors = {
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#2563eb',
        'success': '#10b981'
    };
    
    const icons = {
        'error': 'fa-exclamation-circle',
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
                <strong>Fraud Alert</strong>
                <p style="font-size: 13px; color: #64748b; margin-top: 3px;">
                    ${message}
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Show Rule Notification
function showRuleNotification(ruleName, enabled) {
    showFraudNotification(
        `Rule "${ruleName}" has been ${enabled ? 'enabled' : 'disabled'}`,
        'info'
    );
}

// Helper Functions
function getSeverityIcon(severity) {
    const icons = {
        'high': 'fa-exclamation-circle',
        'medium': 'fa-exclamation-triangle',
        'low': 'fa-info-circle'
    };
    return icons[severity] || 'fa-circle';
}

function formatDateTime(date) {
    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

function formatRelativeTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

function generateRandomTimestamp() {
    const now = new Date();
    const hoursAgo = Math.floor(Math.random() * 48);
    return new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
}

function generateCustomerName() {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'Robert', 'Sarah', 'David', 'Lisa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
        lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}
