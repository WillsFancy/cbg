// Reconciliation Module
// Automated Reconciliation System

document.addEventListener('DOMContentLoaded', function() {
    initializeReconciliation();
});

// Reconciliation data
let reconciliationData = {
    momo: { matched: 0, unmatched: 0, discrepancy: 0, progress: 0 },
    bank: { matched: 0, unmatched: 0, discrepancy: 0, progress: 0 },
    fintech: { matched: 0, unmatched: 0, discrepancy: 0, progress: 0 }
};

let unmatchedTransactions = [];
let reconciliationLogs = [];

function initializeReconciliation() {
    // Initialize reconciliation button
    const runReconciliationBtn = document.getElementById('runReconciliationBtn');
    if (runReconciliationBtn) {
        runReconciliationBtn.addEventListener('click', runReconciliation);
    }
    
    // Load initial data
    loadReconciliationSummary();
    loadUnmatchedTransactions();
    loadReconciliationLogs();
}

// Run Reconciliation Process
function runReconciliation() {
    const btn = document.getElementById('runReconciliationBtn');
    const originalText = btn.innerHTML;
    
    // Disable button and show loading
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-sync fa-spin"></i> Running...';
    
    // Add log entry
    addReconciliationLog('Reconciliation process started', 'info');
    
    // Simulate reconciliation process
    setTimeout(() => {
        reconcileMobileMoney();
    }, 1000);
    
    setTimeout(() => {
        reconcileBankTransfers();
    }, 2000);
    
    setTimeout(() => {
        reconcileFintechPlatforms();
    }, 3000);
    
    setTimeout(() => {
        // Complete reconciliation
        addReconciliationLog('Reconciliation process completed successfully', 'success');
        btn.disabled = false;
        btn.innerHTML = originalText;
        
        // Show success notification
        showReconciliationNotification('Reconciliation completed successfully!', 'success');
    }, 4000);
}

// Reconcile Mobile Money
function reconcileMobileMoney() {
    addReconciliationLog('Processing Mobile Money transactions...', 'info');
    
    const totalTransactions = Math.floor(Math.random() * 500) + 400;
    const matchedTransactions = Math.floor(totalTransactions * 0.95);
    const unmatchedTransactions = totalTransactions - matchedTransactions;
    const discrepancy = (Math.random() * 500).toFixed(2);
    
    reconciliationData.momo = {
        matched: matchedTransactions,
        unmatched: unmatchedTransactions,
        discrepancy: discrepancy,
        progress: 95
    };
    
    updateReconciliationCard('momo');
    addReconciliationLog(
        `Mobile Money: ${matchedTransactions} matched, ${unmatchedTransactions} unmatched`, 
        'success'
    );
}

// Reconcile Bank Transfers
function reconcileBankTransfers() {
    addReconciliationLog('Processing Bank Transfers...', 'info');
    
    const totalTransactions = Math.floor(Math.random() * 600) + 500;
    const matchedTransactions = Math.floor(totalTransactions * 0.98);
    const unmatchedTransactions = totalTransactions - matchedTransactions;
    const discrepancy = (Math.random() * 300).toFixed(2);
    
    reconciliationData.bank = {
        matched: matchedTransactions,
        unmatched: unmatchedTransactions,
        discrepancy: discrepancy,
        progress: 98
    };
    
    updateReconciliationCard('bank');
    addReconciliationLog(
        `Bank Transfers: ${matchedTransactions} matched, ${unmatchedTransactions} unmatched`, 
        'success'
    );
}

// Reconcile Fintech Platforms
function reconcileFintechPlatforms() {
    addReconciliationLog('Processing Fintech Platform transactions...', 'info');
    
    const totalTransactions = Math.floor(Math.random() * 450) + 350;
    const matchedTransactions = Math.floor(totalTransactions * 0.97);
    const unmatchedTransactions = totalTransactions - matchedTransactions;
    const discrepancy = (Math.random() * 400).toFixed(2);
    
    reconciliationData.fintech = {
        matched: matchedTransactions,
        unmatched: unmatchedTransactions,
        discrepancy: discrepancy,
        progress: 97
    };
    
    updateReconciliationCard('fintech');
    addReconciliationLog(
        `Fintech Platforms: ${matchedTransactions} matched, ${unmatchedTransactions} unmatched`, 
        'success'
    );
    
    // Generate unmatched transactions after all reconciliation
    generateUnmatchedTransactions();
}

// Update Reconciliation Card
function updateReconciliationCard(type) {
    const data = reconciliationData[type];
    
    document.getElementById(`${type}Matched`).textContent = data.matched;
    document.getElementById(`${type}Unmatched`).textContent = data.unmatched;
    document.getElementById(`${type}Discrepancy`).textContent = `$${data.discrepancy}`;
    document.getElementById(`${type}Progress`).style.width = `${data.progress}%`;
}

// Load Reconciliation Summary
function loadReconciliationSummary() {
    // Initialize with default values
    reconciliationData = {
        momo: { matched: 456, unmatched: 12, discrepancy: 234.50, progress: 97 },
        bank: { matched: 589, unmatched: 8, discrepancy: 125.30, progress: 99 },
        fintech: { matched: 412, unmatched: 15, discrepancy: 342.80, progress: 96 }
    };
    
    updateReconciliationCard('momo');
    updateReconciliationCard('bank');
    updateReconciliationCard('fintech');
}

// Generate Unmatched Transactions
function generateUnmatchedTransactions() {
    unmatchedTransactions = [];
    const platforms = ['Mobile Money', 'Bank Transfer', 'Fintech'];
    const issueTypes = [
        'Amount mismatch',
        'Missing transaction',
        'Duplicate entry',
        'Invalid account',
        'Timeout error'
    ];
    
    const totalUnmatched = 
        reconciliationData.momo.unmatched +
        reconciliationData.bank.unmatched +
        reconciliationData.fintech.unmatched;
    
    for (let i = 0; i < totalUnmatched; i++) {
        unmatchedTransactions.push({
            id: `UNM${String(10000 + i).slice(-5)}`,
            date: generateRandomDate(),
            platform: platforms[Math.floor(Math.random() * platforms.length)],
            amount: (Math.random() * 1000 + 50).toFixed(2),
            issueType: issueTypes[Math.floor(Math.random() * issueTypes.length)]
        });
    }
    
    loadUnmatchedTransactions();
}

// Load Unmatched Transactions
function loadUnmatchedTransactions() {
    const tbody = document.getElementById('unmatchedTransactionsBody');
    if (!tbody) return;
    
    if (unmatchedTransactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px; color: #64748b;">
                    <i class="fas fa-check-circle" style="font-size: 40px; color: #10b981; margin-bottom: 10px;"></i>
                    <p>No unmatched transactions found</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = unmatchedTransactions.map(txn => `
        <tr>
            <td><strong>${txn.id}</strong></td>
            <td>${formatDate(txn.date)}</td>
            <td><span class="badge">${txn.platform}</span></td>
            <td><strong>₵${parseFloat(txn.amount).toLocaleString()}</strong></td>
            <td><span class="badge failed">${txn.issueType}</span></td>
            <td>
                <button class="btn-icon" onclick="investigateTransaction('${txn.id}')">
                    <i class="fas fa-search"></i>
                </button>
                <button class="btn-icon" onclick="resolveTransaction('${txn.id}')">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-icon" onclick="ignoreTransaction('${txn.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Investigate Transaction
window.investigateTransaction = function(txnId) {
    const txn = unmatchedTransactions.find(t => t.id === txnId);
    if (!txn) return;
    
    alert(`Investigating transaction ${txnId}\n\n` +
          `Platform: ${txn.platform}\n` +
          `Amount: ₵${txn.amount}\n` +
          `Issue: ${txn.issueType}\n\n` +
          'Opening detailed investigation view...');
};

// Resolve Transaction
window.resolveTransaction = function(txnId) {
    if (confirm(`Mark transaction ${txnId} as resolved?`)) {
        unmatchedTransactions = unmatchedTransactions.filter(t => t.id !== txnId);
        loadUnmatchedTransactions();
        addReconciliationLog(`Transaction ${txnId} marked as resolved`, 'success');
        showReconciliationNotification(`Transaction ${txnId} resolved`, 'success');
    }
};

// Ignore Transaction
window.ignoreTransaction = function(txnId) {
    if (confirm(`Ignore transaction ${txnId}? This will mark it as a false positive.`)) {
        unmatchedTransactions = unmatchedTransactions.filter(t => t.id !== txnId);
        loadUnmatchedTransactions();
        addReconciliationLog(`Transaction ${txnId} ignored`, 'warning');
    }
};

// Load Reconciliation Logs
function loadReconciliationLogs() {
    const logContainer = document.getElementById('reconciliationLog');
    if (!logContainer) return;
    
    // Add initial logs
    if (reconciliationLogs.length === 0) {
        reconciliationLogs = [
            { timestamp: new Date(Date.now() - 3600000), message: 'System initialized', type: 'info' },
            { timestamp: new Date(Date.now() - 1800000), message: 'Last reconciliation completed successfully', type: 'success' },
            { timestamp: new Date(Date.now() - 900000), message: '15 transactions auto-matched', type: 'success' }
        ];
    }
    
    updateLogDisplay();
}

// Add Reconciliation Log
function addReconciliationLog(message, type) {
    reconciliationLogs.unshift({
        timestamp: new Date(),
        message: message,
        type: type
    });
    
    // Keep only last 50 logs
    if (reconciliationLogs.length > 50) {
        reconciliationLogs = reconciliationLogs.slice(0, 50);
    }
    
    updateLogDisplay();
}

// Update Log Display
function updateLogDisplay() {
    const logContainer = document.getElementById('reconciliationLog');
    if (!logContainer) return;
    
    logContainer.innerHTML = reconciliationLogs.map(log => `
        <div class="log-entry">
            <div class="timestamp">
                <i class="fas ${getLogIcon(log.type)}"></i>
                ${formatDateTime(log.timestamp)}
            </div>
            <div style="color: ${getLogColor(log.type)}; font-weight: 500;">
                ${log.message}
            </div>
        </div>
    `).join('');
}

// Get Log Icon
function getLogIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-times-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || 'fa-circle';
}

// Get Log Color
function getLogColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#2563eb'
    };
    return colors[type] || '#64748b';
}

// Show Reconciliation Notification
function showReconciliationNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 10px;
        border-left: 4px solid ${getLogColor(type)};
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        min-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${getLogIcon(type)}" style="color: ${getLogColor(type)}; font-size: 20px;"></i>
            <div>
                <strong>${type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info'}</strong>
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
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
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

function generateRandomDate() {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 7);
    return new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
}

// Auto-run reconciliation every 5 minutes
setInterval(() => {
    addReconciliationLog('Auto-reconciliation check initiated', 'info');
    // Could trigger automatic reconciliation here
}, 300000);
