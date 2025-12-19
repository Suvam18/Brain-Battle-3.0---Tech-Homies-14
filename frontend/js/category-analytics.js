// Generic Category Analytics Logic

const API_TRANSACTIONS_URL = '/api/expenses';
let categoryChartInstance = null;
let currentCategory = ''; // 'Food', 'Travel', etc.

// DOM Elements
const categoryModal = document.getElementById('categoryModal');
const closeCategory = document.getElementById('closeCategory');
const categoryTitle = document.getElementById('categoryTitle');
const closeCategoryHeaderBtn = document.getElementById('closeCategoryHeaderBtn');

const addCategoryExpenseBtn = document.getElementById('addCategoryExpenseBtn');
const addCatFormContainer = document.getElementById('addCatFormContainer');
const addFormTitle = document.getElementById('addFormTitle');
const catForm = document.getElementById('catForm');
const cancelAddCat = document.getElementById('cancelAddCat');

const catTotal = document.getElementById('catTotal');
const catDailyAvg = document.getElementById('catDailyAvg');
const catHighestDay = document.getElementById('catHighestDay');
const catTransactionList = document.getElementById('catTransactionList');
const catTypeInput = document.getElementById('catType');
const catTypeOptions = document.getElementById('catTypeOptions');
const catAmountInput = document.getElementById('catAmount');
const catDateInput = document.getElementById('catDate');
const catNotesInput = document.getElementById('catNotes');
const filterPeriod = document.getElementById('filterPeriod');

// Data for Dropdowns and Colors
const CATEGORY_CONFIG = {
    'Food': {
        icon: '🍔',
        options: ['Mess', 'Canteen', 'Outside Food', 'Snacks', 'Online Order', 'Groceries'],
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
    },
    'Travel': {
        icon: '✈️',
        options: ['Bus', 'Train', 'Metro', 'Cab', 'Fuel', 'Flight', 'Auto'],
        colors: ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF9F40', '#9966FF', '#FF6384']
    },
    'Bills': {
        icon: '🧾',
        options: ['Electricity', 'Water', 'Internet', 'Mobile Recharge', 'Rent', 'Gas'],
        colors: ['#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    },
    'Subscriptions': {
        icon: '💳',
        options: ['Netflix', 'Spotify', 'Amazon Prime', 'YouTube Premium', 'Gym', 'Software'],
        colors: ['#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }
};

// Event Listeners
if (closeCategory) closeCategory.addEventListener('click', closeCategoryModal);
if (closeCategoryHeaderBtn) closeCategoryHeaderBtn.addEventListener('click', closeCategoryModal);
const closeCategoryMainBtn = document.getElementById('closeCategoryMainBtn');
if (closeCategoryMainBtn) closeCategoryMainBtn.addEventListener('click', closeCategoryModal);

if (categoryModal) {
    window.onclick = function (event) {
        if (event.target == categoryModal) {
            closeCategoryModal();
        }
    }
}

if (addCategoryExpenseBtn) addCategoryExpenseBtn.addEventListener('click', () => {
    addCatFormContainer.style.display = 'block';
    addCategoryExpenseBtn.style.display = 'none';
    addCatFormContainer.scrollIntoView({ behavior: 'smooth' });
});

if (cancelAddCat) cancelAddCat.addEventListener('click', () => {
    addCatFormContainer.style.display = 'none';
    addCategoryExpenseBtn.style.display = 'block';
});

if (filterPeriod) {
    filterPeriod.addEventListener('change', () => {
        fetchAndRenderData();
    });
}

if (catForm) catForm.addEventListener('submit', handleAddCategoryExpense);

// Robust Event Delegation for "View Details" Buttons
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.feature-btn');
    if (!btn) return;

    // Identify which section this button belongs to
    const section = btn.closest('section');
    if (!section) return;

    const sectionId = section.id;
    let categoryName = '';

    if (sectionId === 'food') categoryName = 'Food';
    else if (sectionId === 'travel') categoryName = 'Travel';
    else if (sectionId === 'subscriptions') categoryName = 'Subscriptions';
    else if (sectionId === 'bills') categoryName = 'Bills';

    if (categoryName) {
        e.preventDefault();
        console.log(`Global delegation: Clicked View Details for ${categoryName}`);
        openCategory(categoryName);
    }
});

// Functions

async function openCategory(category) {
    currentCategory = category;
    const config = CATEGORY_CONFIG[category] || { icon: '📊', options: ['General'], colors: [] };

    // Update UI
    categoryTitle.textContent = `${config.icon} ${category} Analysis`;
    addFormTitle.textContent = `Add ${category} Expense`;

    // Populate Datalist
    catTypeOptions.innerHTML = '';
    config.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        catTypeOptions.appendChild(option);
    });
    catTypeInput.value = ''; // Clear previous input

    categoryModal.classList.add('active');
    document.getElementById('authOverlay').classList.add('active');

    resetForm();
    await fetchAndRenderData();
}

function closeCategoryModal() {
    categoryModal.classList.remove('active');
    document.getElementById('authOverlay').classList.remove('active');
}

function resetForm() {
    catForm.reset();
    addCatFormContainer.style.display = 'none';
    addCategoryExpenseBtn.style.display = 'block';

    // Default Date to Today
    const today = new Date().toISOString().split('T')[0];
    catDateInput.value = today;
    if (catNotesInput) catNotesInput.value = '';
}

async function fetchAndRenderData() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login to view details');
        closeCategoryModal();
        return;
    }

    try {
        // Calculate Start Date based on filter
        let startDate = null;
        const period = filterPeriod ? filterPeriod.value : 'this_month';
        const now = new Date();

        if (period === 'this_month') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        } else if (period === 'last_month') {
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
        } else if (period === '30_days') {
            const day = new Date();
            day.setDate(day.getDate() - 30);
            startDate = day.toISOString();
        }

        let url = `${API_TRANSACTIONS_URL}?category=${currentCategory}`;
        if (startDate) {
            url += `&startDate=${startDate}`;
        }

        if (period === 'last_month') {
            const end = new Date(now.getFullYear(), now.getMonth(), 0);
            url += `&endDate=${end.toISOString()}`;
        }

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await res.json();

        if (responseData.success && responseData.data.expenses) {
            const filteredData = responseData.data.expenses;
            calculateStats(filteredData);
            renderChart(filteredData);
            renderList(filteredData);
        } else {
            console.error('Failed to load data', responseData);
        }

    } catch (err) {
        console.error(`Error fetching ${currentCategory} data`, err);
    }
}

function calculateStats(data) {
    const total = data.reduce((acc, curr) => acc + curr.amount, 0);
    catTotal.textContent = `₹${total.toLocaleString()}`;

    // Group by Date for Avg & Highest
    const dateMap = {};
    data.forEach(t => {
        const date = new Date(t.date).toLocaleDateString();
        dateMap[date] = (dateMap[date] || 0) + t.amount;
    });

    const days = Object.keys(dateMap).length || 1;
    // Prevent div by zero if no data, default to total if 1 day
    const avg = data.length > 0 ? Math.round(total / days) : 0;
    catDailyAvg.textContent = `₹${avg.toLocaleString()}`;

    // Highest Day
    let maxAmount = 0;
    let maxDate = '-';
    for (const [date, amount] of Object.entries(dateMap)) {
        if (amount > maxAmount) {
            maxAmount = amount;
            maxDate = date;
        }
    }
    catHighestDay.textContent = maxAmount ? `${maxDate} (₹${maxAmount})` : '-';
}

function renderChart(data) {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    const context = ctx.getContext('2d');

    // Group by Description (SubType)
    const typeMap = {};
    let totalVal = 0;
    data.forEach(t => {
        const type = t.type || 'Other';
        typeMap[type] = (typeMap[type] || 0) + t.amount;
        totalVal += t.amount;
    });

    const labels = Object.keys(typeMap);
    const values = Object.values(typeMap);

    // Fallback colors if we run out or category undefined
    const baseColors = CATEGORY_CONFIG[currentCategory] ? CATEGORY_CONFIG[currentCategory].colors : ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

    // Determine Legend Position dynamically
    const isMobile = window.innerWidth < 768;
    const legendPosition = isMobile ? 'bottom' : 'right';

    if (categoryChartInstance) {
        // Update existing chart for smooth animation
        categoryChartInstance.data.labels = labels;
        categoryChartInstance.data.datasets[0].data = values;
        categoryChartInstance.data.datasets[0].backgroundColor = baseColors;
        categoryChartInstance.options.plugins.legend.position = legendPosition;
        categoryChartInstance.update();
    } else {
        // Create new chart
        categoryChartInstance = new Chart(context, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: baseColors,
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 10 // Pop out effect on hover
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 10
                },
                plugins: {
                    legend: {
                        position: legendPosition,
                        labels: {
                            font: {
                                size: 12,
                                family: "'Inter', sans-serif"
                            },
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    title: {
                        display: true,
                        text: 'Spending Distribution',
                        font: {
                            size: 16,
                            weight: '600',
                            family: "'Inter', sans-serif"
                        },
                        padding: { bottom: 20 }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1a5e3a',
                        bodyColor: '#333',
                        borderColor: '#e0e0e0',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 4,
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                let value = context.parsed;
                                let percentage = totalVal > 0 ? Math.round((value / totalVal) * 100) : 0;
                                return ` ${label}: ₹${value.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }
}

// Add Resize Listener to update chart layout
window.addEventListener('resize', () => {
    if (categoryChartInstance) {
        const isMobile = window.innerWidth < 768;
        const newPos = isMobile ? 'bottom' : 'right';
        if (categoryChartInstance.options.plugins.legend.position !== newPos) {
            categoryChartInstance.options.plugins.legend.position = newPos;
            categoryChartInstance.update();
        }
    }
});

function renderList(data) {
    catTransactionList.innerHTML = '';
    // Sort by date desc
    const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sorted.length === 0) {
        catTransactionList.innerHTML = '<li style="text-align:center; padding:10px; color:#888;">No transactions found.</li>';
        return;
    }

    sorted.forEach(t => {
        const li = document.createElement('li');
        li.className = 'transaction-item';

        // Create elements manually to attach event listener cleanly
        const infoDiv = document.createElement('div');
        infoDiv.className = 't-info';

        const h4 = document.createElement('h4');
        h4.textContent = t.type || t.description || 'Expense';

        const dateSpan = document.createElement('span');
        dateSpan.className = 't-date';
        dateSpan.textContent = `${new Date(t.date).toLocaleDateString()} ${t.notes ? '• ' + t.notes : ''}`;

        infoDiv.appendChild(h4);
        infoDiv.appendChild(dateSpan);

        const rightDiv = document.createElement('div');
        rightDiv.className = 't-right';

        const amountSpan = document.createElement('span');
        amountSpan.className = 't-amount';
        amountSpan.textContent = `₹${t.amount.toLocaleString()}`;

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = '🗑️';
        delBtn.setAttribute('data-id', t._id);
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTransaction(t._id);
        };

        rightDiv.appendChild(amountSpan);
        rightDiv.appendChild(delBtn);

        li.appendChild(infoDiv);
        li.appendChild(rightDiv);

        catTransactionList.appendChild(li);
    });
}

async function handleAddCategoryExpense(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    // Use global input references
    const type = catTypeInput.value ? catTypeInput.value.trim() : '';
    const amount = catAmountInput.value;
    const date = catDateInput.value;
    const notes = catNotesInput ? catNotesInput.value.trim() : '';

    if (!type) {
        if (typeof showToast === 'function') showToast('Please enter a Description/Type', 'error');
        else alert('Please enter a Description/Type');
        return;
    }

    try {
        const res = await fetch(API_TRANSACTIONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                type: type,
                amount: amount,
                category: currentCategory.toUpperCase(), // Ensure uppercase for backend
                date: date,
                notes: notes
            })
        });

        if (res.ok) {
            resetForm();
            fetchAndRenderData();
            if (typeof window.fetchDashboardData === 'function') {
                window.fetchDashboardData();
            }
            if (typeof showToast === 'function') showToast('Expense Added Successfully!', 'success');
        } else {
            const d = await res.json();
            if (typeof showToast === 'function') showToast(d.msg || 'Failed to add transaction', 'error');
            else alert(d.msg || 'Failed to add transaction');
        }
    } catch (err) {
        console.error('Network Error:', err);
        if (typeof showToast === 'function') showToast('Error connecting to server', 'error');
    }
}

async function deleteTransaction(id) {
    console.log('Delete function called for ID:', id);
    if (!confirm('Are you sure you want to delete this expense?')) {
        console.log('Delete cancelled by user');
        return;
    }

    const token = localStorage.getItem('token');
    console.log('Sending DELETE request...');

    try {
        const res = await fetch(`${API_TRANSACTIONS_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('Delete response status:', res.status);

        if (res.ok) {
            if (typeof showToast === 'function') showToast('Expense Deleted Successfully', 'success');
            // Remove the element immediately from UI for better feedback
            const btn = document.querySelector(`button[onclick*="${id}"]`) || document.querySelector(`.delete-btn[data-id="${id}"]`);
            if (btn) {
                const li = btn.closest('li');
                if (li) li.remove();
            }
            await fetchAndRenderData();
            if (typeof window.fetchDashboardData === 'function') {
                window.fetchDashboardData();
            }
        } else {
            const d = await res.json();
            console.error('Delete failed:', d);
            if (typeof showToast === 'function') showToast(d.msg || 'Error deleting transaction', 'error');
            else alert('Error deleting transaction');
        }
    } catch (err) {
        console.error('Delete network error:', err);
        if (typeof showToast === 'function') showToast('Server connection error', 'error');
    }
}

// Expose globally

// Top Spending List Logic
async function updateTopSpending() {
    const listContainer = document.querySelector('.spending-list');
    if (!listContainer) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        try {
            const res = await fetch('/api/analytics/overview', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const responseData = await res.json();

            if (responseData.success && responseData.data.topCategories) {
                const sortedCats = responseData.data.topCategories;

                // Render
                listContainer.innerHTML = '';
                if (sortedCats.length === 0) {
                    listContainer.innerHTML = '<li class="spending-item" style="justify-content:center;">No data yet</li>';
                    return;
                }

                sortedCats.forEach((item, index) => {
                    // item is { _id: "Food", total: 5000 }
                    const name = item._id;
                    const amount = item.total;

                    const li = document.createElement('li');
                    li.className = 'spending-item';
                    // Click to open details
                    li.style.cursor = 'pointer';
                    li.onclick = () => openCategory(name);

                    li.innerHTML = `
                    <div class="spending-number">${index + 1}</div>
                    <span>${name}</span>
                    <span style="margin-left:auto; font-weight:600;">₹${amount.toLocaleString()}</span>
                `;
                    listContainer.appendChild(li); // Fixed: Use appendChild to preserve events
                });
                // Re-bind events if using strings, but better to use appendChild manually loop
                // Actually, the previous implementation used appendChild, let's stick to it but I replaced the loop content.
                // Wait, I replaced lines 330-370.
            }

        } catch (err) {
            console.error('Error updating top spending', err);
        }

    } catch (err) {
        console.error('Error updating top spending', err);
    }
}

// Init Top Spending on Load
document.addEventListener('DOMContentLoaded', updateTopSpending);

window.openCategory = openCategory;
// Expose for any inline calls, although we moved to closure binding
window.deleteTransaction = deleteTransaction;
