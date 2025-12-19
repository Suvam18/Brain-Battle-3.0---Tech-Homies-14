// Food Details Logic

const FOOD_API_URL = '/api/transactions';
let foodChartInstance = null;
let allTransactions = [];

// DOM Elements
const foodModal = document.getElementById('foodModal');
const closeFood = document.getElementById('closeFood');
const addFoodBtn = document.getElementById('addFoodBtn');
const addFoodFormContainer = document.getElementById('addFoodFormContainer');
const foodForm = document.getElementById('foodForm');
const cancelAddFood = document.getElementById('cancelAddFood');
const foodTransactionList = document.getElementById('foodTransactionList');

// Trigger Button (View details in Food Card)
// Note: We need to bind this dynamically in case the button exists or is created
document.addEventListener('DOMContentLoaded', () => {
    // Find the 'View Details' button in the Food Section
    // Assuming the button structure from index.html (Feature Section 1)
    const viewButtons = document.querySelectorAll('.feature-btn');
    // The first one is Food (based on order in HTML)
    if (viewButtons[0]) {
        viewButtons[0].addEventListener('click', openFoodDashboard);
    }

    // Also bind event to the "More Details" button in Top Spending if needed
});

// Event Listeners
if (closeFood) closeFood.addEventListener('click', closeFoodModal);
if (addFoodBtn) addFoodBtn.addEventListener('click', () => {
    addFoodFormContainer.style.display = 'block';
    addFoodBtn.style.display = 'none';
});
if (cancelAddFood) cancelAddFood.addEventListener('click', () => {
    addFoodFormContainer.style.display = 'none';
    addFoodBtn.style.display = 'block';
});
if (foodForm) foodForm.addEventListener('submit', handleAddFood);

// Functions

async function openFoodDashboard() {
    foodModal.classList.add('active');
    document.getElementById('authOverlay').classList.add('active'); // Reuse overlay
    await fetchAndRenderFoodData();
}

function closeFoodModal() {
    foodModal.classList.remove('active');
    document.getElementById('authOverlay').classList.remove('active');
}

async function fetchAndRenderFoodData() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login to view details');
        closeFoodModal();
        return;
    }

    try {
        const res = await fetch(FOOD_API_URL, {
            headers: { 'x-auth-token': token }
        });
        const data = await res.json();

        // Filter for Food
        const foodData = data.filter(t => t.category === 'Food');
        allTransactions = foodData; // Keep for reference if needed

        calculateStats(foodData);
        renderChart(foodData);
        renderList(foodData);

    } catch (err) {
        console.error("Error fetching food data", err);
    }
}

function calculateStats(data) {
    const total = data.reduce((acc, curr) => acc + curr.amount, 0);
    document.getElementById('foodTotal').textContent = `₹${total.toLocaleString()}`;

    // Group by Date for Avg & Highest
    const dateMap = {};
    data.forEach(t => {
        const date = new Date(t.date).toLocaleDateString();
        dateMap[date] = (dateMap[date] || 0) + t.amount;
    });

    const days = Object.keys(dateMap).length || 1;
    const avg = Math.round(total / days);
    document.getElementById('foodDailyAvg').textContent = `₹${avg.toLocaleString()}`;

    // Highest Day
    let maxAmount = 0;
    let maxDate = '-';
    for (const [date, amount] of Object.entries(dateMap)) {
        if (amount > maxAmount) {
            maxAmount = amount;
            maxDate = date;
        }
    }
    document.getElementById('foodHighestDay').textContent = maxAmount ? `${maxDate} (₹${maxAmount})` : '-';
}

function renderChart(data) {
    const ctx = document.getElementById('foodChart').getContext('2d');

    // Group by Description (Mess, Canteen, etc.)
    const typeMap = {};
    data.forEach(t => {
        // Use description as sub-category/type
        const type = t.description || 'Other';
        typeMap[type] = (typeMap[type] || 0) + t.amount;
    });

    const labels = Object.keys(typeMap);
    const values = Object.values(typeMap);

    if (foodChartInstance) {
        foodChartInstance.destroy();
    }

    foodChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

function renderList(data) {
    foodTransactionList.innerHTML = '';
    // Sort by date desc
    const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach(t => {
        const li = document.createElement('li');
        li.className = 'transaction-item';
        li.innerHTML = `
            <div class="t-info">
                <h4>${t.description}</h4>
                <span class="t-date">${new Date(t.date).toLocaleDateString()}</span>
            </div>
            <div class="t-right">
                <span class="t-amount">₹${t.amount}</span>
                <button class="delete-btn" onclick="deleteFood('${t._id}')">🗑️</button>
            </div>
        `;
        foodTransactionList.appendChild(li);
    });
}

async function handleAddFood(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const type = document.getElementById('foodType').value;
    const amount = document.getElementById('foodAmount').value;
    const date = document.getElementById('foodDate').value;

    try {
        const res = await fetch(FOOD_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                description: type, // Saving sub-type as description
                amount: amount,
                category: 'Food',
                type: 'expense',
                date: date
            })
        });

        if (res.ok) {
            // Reset form
            foodForm.reset();
            addFoodFormContainer.style.display = 'none';
            addFoodBtn.style.display = 'block';
            // Refresh Data
            fetchAndRenderFoodData();
        } else {
            alert('Failed to add transaction');
        }
    } catch (err) {
        console.error(err);
    }
}

async function deleteFood(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${FOOD_API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'x-auth-token': token }
        });

        if (res.ok) {
            fetchAndRenderFoodData();
        } else {
            alert('Error deleting transaction');
        }
    } catch (err) {
        console.error(err);
    }
}

// Make delete function global
window.deleteFood = deleteFood;
