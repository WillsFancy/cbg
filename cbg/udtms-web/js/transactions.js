// Transaction Management Module
// Real-time Transaction Monitoring

document.addEventListener('DOMContentLoaded', function() {
    initializeTransactionPage();
});

// Transaction data storage
let transactions = [];
let currentPage = 1;
const itemsPerPage = 10;

function initializeTransactionPage() {
    // Generate initial transaction data
    transactions = generateMockTransactions(50);
    
    // Load transactions into table
    loadTransactionsTable();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize buttons
    initializeTransactionButtons();
    
    // Real-time updates
    startRealTimeUpdates();
}

// Generate Mock Transaction Data
function generateMockTransactions(count) {
    const mockTransactions = [];
    const platforms = ['Mobile Money', 'Internet Banking', 'Fintech', 'Mobile Banking'];
    const statuses = ['success', 'pending', 'failed'];
    const customers = [
        'John Doe', 'Jane Smith', 'Michael Opare', 'Evelyn Banin',
        'Robert Asante', 'Sarah Kumah', 'David Mensah', 'Lisa Quamah'
    ];
    
    for (let i = 0; i < count; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const riskScore = calculateRiskScore();
        
        mockTransactions.push({
            id: `TXN${String(100000 + i).slice(-6)}`,
            timestamp: generateRandomTimestamp(),
            customer: customers[Math.floor(Math.random() * customers.length)],
            platform: platforms[Math.floor(Math.random() * platforms.length)],
            amount: (Math.random() * 5000 + 50).toFixed(2),
            status: status,
            riskScore: riskScore,
            riskLevel: getRiskLevel(riskScore)
        });
    }
    
    return mockTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Calculate Risk Score
function calculateRiskScore() {
    const score = Math.random() * 100;
    return Math.round(score * 10) / 10;
}

// Get Risk Level
function getRiskLevel(score) {
    if (score >= 70) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
}

// Load Transactions into Table
function loadTransactionsTable(filteredTransactions = null) {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;
    
    const data = filteredTransactions || transactions;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageTransactions = data.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageTransactions.map(txn => `
        <tr>
            <td><strong>${txn.id}</strong></td>
            <td>${formatDateTime(txn.timestamp)}</td>
            <td>${txn.customer}</td>
            <td><span class="badge">${txn.platform}</span></td>
            <td><strong>₵${parseFloat(txn.amount).toLocaleString()}</strong></td>
            <td><span class="badge ${txn.status}">${txn.status.toUpperCase()}</span></td>
            <td><span class="risk-score ${txn.riskLevel}">${txn.riskScore}%</span></td>
            <td>
                <button class="btn-icon" onclick="viewTransactionDetails('${txn.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="exportTransaction('${txn.id}')">
                    <i class="fas fa-download"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Update pagination
    updatePagination(data.length);
}

// Format DateTime
function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

// Generate Random Timestamp
function generateRandomTimestamp() {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    
    return new Date(
        now.getTime() - 
        (daysAgo * 24 * 60 * 60 * 1000) -
        (hoursAgo * 60 * 60 * 1000) -
        (minutesAgo * 60 * 1000)
    );
}

// Initialize Filters
function initializeFilters() {
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
}

// Apply Filters
function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const platformFilter = document.getElementById('platformFilter').value;
    const dateFrom = new Date(document.getElementById('dateFrom').value);
    const dateTo = new Date(document.getElementById('dateTo').value);
    
    let filteredTransactions = transactions.filter(txn => {
        const txnDate = new Date(txn.timestamp);
        
        const statusMatch = statusFilter === 'all' || txn.status === statusFilter;
        const platformMatch = platformFilter === 'all' || 
            txn.platform.toLowerCase().includes(platformFilter);
        const dateMatch = (!dateFrom || txnDate >= dateFrom) && 
            (!dateTo || txnDate <= dateTo);
        
        return statusMatch && platformMatch && dateMatch;
    });
    
    currentPage = 1;
    loadTransactionsTable(filteredTransactions);
    
    // Show filter summary
    showFilterSummary(filteredTransactions.length);
}

// Show Filter Summary
function showFilterSummary(count) {
    // Create or update filter summary element
    let summary = document.querySelector('.filter-summary');
    if (!summary) {
        summary = document.createElement('div');
        summary.className = 'filter-summary';
        summary.style.cssText = 'padding: 15px; background: #e0f2fe; border-radius: 8px; margin: 15px 0;';
        document.querySelector('.filter-section').after(summary);
    }
    
    summary.innerHTML = `
        <i class="fas fa-filter"></i> 
        <strong>${count}</strong> transactions found
        <button onclick="clearFilters()" style="margin-left: 15px; padding: 5px 15px; border-radius: 5px; border: none; background: #0ea5e9; color: white; cursor: pointer;">
            Clear Filters
        </button>
    `;
}

// Clear Filters
window.clearFilters = function() {
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('platformFilter').value = 'all';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    
    const summary = document.querySelector('.filter-summary');
    if (summary) summary.remove();
    
    currentPage = 1;
    loadTransactionsTable();
};

// Update Pagination
function updatePagination(totalItems) {
    const pagination = document.getElementById('transactionsPagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<button disabled>...</button>';
        }
    }
    
    // Next button
    paginationHTML += `
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Change Page
window.changePage = function(page) {
    currentPage = page;
    loadTransactionsTable();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Initialize Transaction Buttons
function initializeTransactionButtons() {
    const addTransactionBtn = document.getElementById('addTransactionBtn');
    if (addTransactionBtn) {
        addTransactionBtn.addEventListener('click', showAddTransactionModal);
    }
    
    const exportTransactionsBtn = document.getElementById('exportTransactions');
    if (exportTransactionsBtn) {
        exportTransactionsBtn.addEventListener('click', exportAllTransactions);
    }
}

// View Transaction Details
window.viewTransactionDetails = function(txnId) {
    const transaction = transactions.find(t => t.id === txnId);
    if (!transaction) return;
    
    const modal = document.getElementById('transactionModal');
    const modalBody = document.getElementById('transactionModalBody');
    
    modalBody.innerHTML = `
        <div style="display: grid; gap: 15px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <label style="font-weight: 600; color: #64748b; font-size: 13px;">Transaction ID</label>
                    <p style="font-size: 16px; margin-top: 5px;">${transaction.id}</p>
                </div>
                <div>
                    <label style="font-weight: 600; color: #64748b; font-size: 13px;">Status</label>
                    <p style="margin-top: 5px;"><span class="badge ${transaction.status}">${transaction.status.toUpperCase()}</span></p>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <label style="font-weight: 600; color: #64748b; font-size: 13px;">Customer</label>
                    <p style="font-size: 16px; margin-top: 5px;">${transaction.customer}</p>
                </div>
                <div>
                    <label style="font-weight: 600; color: #64748b; font-size: 13px;">Platform</label>
                    <p style="font-size: 16px; margin-top: 5px;">${transaction.platform}</p>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <label style="font-weight: 600; color: #64748b; font-size: 13px;">Amount</label>
                    <p style="font-size: 24px; font-weight: 700; color: #10b981; margin-top: 5px;">₵${parseFloat(transaction.amount).toLocaleString()}</p>
                </div>
                <div>
                    <label style="font-weight: 600; color: #64748b; font-size: 13px;">Risk Score</label>
                    <p style="margin-top: 5px;"><span class="risk-score ${transaction.riskLevel}" style="font-size: 18px; font-weight: 600;">${transaction.riskScore}%</span></p>
                </div>
            </div>
            <div>
                <label style="font-weight: 600; color: #64748b; font-size: 13px;">Timestamp</label>
                <p style="font-size: 16px; margin-top: 5px;">${formatDateTime(transaction.timestamp)}</p>
            </div>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                <button class="btn btn-primary" onclick="processTransaction('${transaction.id}')">
                    <i class="fas fa-check"></i> Process Transaction
                </button>
                <button class="btn btn-danger" onclick="flagTransaction('${transaction.id}')" style="margin-left: 10px;">
                    <i class="fas fa-flag"></i> Flag as Suspicious
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Close modal handler
    const closeBtn = document.getElementById('closeModal');
    closeBtn.onclick = () => modal.classList.remove('active');
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('active');
    };
};

// Export Transaction
window.exportTransaction = function(txnId) {
    const transaction = transactions.find(t => t.id === txnId);
    if (!transaction) return;
    
    const dataStr = JSON.stringify(transaction, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transaction_${txnId}.json`;
    link.click();
};

// Export All Transactions
function exportAllTransactions() {
    const csvContent = convertToCSV(transactions);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_export_${new Date().getTime()}.csv`;
    link.click();
}

// Convert to CSV
function convertToCSV(data) {
    const headers = ['Transaction ID', 'Timestamp', 'Customer', 'Platform', 'Amount', 'Status', 'Risk Score'];
    const rows = data.map(txn => [
        txn.id,
        formatDateTime(txn.timestamp),
        txn.customer,
        txn.platform,
        txn.amount,
        txn.status,
        txn.riskScore
    ]);
    
    return [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
}

// Show Add Transaction Modal
function showAddTransactionModal() {
    alert('Add Transaction feature would open a form to manually add a new transaction.');
}

// Process Transaction
window.processTransaction = function(txnId) {
    alert(`Processing transaction ${txnId}...`);
    const modal = document.getElementById('transactionModal');
    modal.classList.remove('active');
};

// Flag Transaction
window.flagTransaction = function(txnId) {
    if (confirm(`Are you sure you want to flag transaction ${txnId} as suspicious?`)) {
        alert(`Transaction ${txnId} has been flagged for review.`);
        const modal = document.getElementById('transactionModal');
        modal.classList.remove('active');
    }
};

// Real-time Updates
function startRealTimeUpdates() {
    setInterval(() => {
        // Simulate new transactions
        if (Math.random() > 0.7) {
            addNewTransaction();
        }
    }, 10000); // Every 10 seconds
}

// Add New Transaction
function addNewTransaction() {
    const newTxn = generateMockTransactions(1)[0];
    transactions.unshift(newTxn);
    
    // Reload table if on first page
    if (currentPage === 1) {
        loadTransactionsTable();
    }
    
    // Show notification
    showTransactionNotification(newTxn);
}

// Show Transaction Notification
function showTransactionNotification(txn) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-bell" style="color: #2563eb; font-size: 20px;"></i>
            <div>
                <strong>New Transaction</strong>
                <p style="font-size: 13px; color: #64748b; margin-top: 3px;">
                    ${txn.id} - ₵${parseFloat(txn.amount).toLocaleString()}
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}
