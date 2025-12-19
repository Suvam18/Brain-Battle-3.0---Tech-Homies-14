// JavaScript will be added here for interactivity
console.log("Budget Buddy Frontend Loaded");

// Toggle Sidebar
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mainContent = document.getElementById('mainContent');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    // mainContent.classList.toggle('shifted'); // Optional: shift content
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleSidebar);
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', toggleSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', toggleSidebar);
}

// Features Dropdown Logic
const featuresDropdownToggle = document.getElementById('featuresDropdownToggle');
const featuresDropdownMenu = document.getElementById('featuresDropdownMenu');

if (featuresDropdownToggle && featuresDropdownMenu) {
    featuresDropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent closing immediately
        featuresDropdownMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!featuresDropdownToggle.contains(e.target) && !featuresDropdownMenu.contains(e.target)) {
            featuresDropdownMenu.classList.remove('show');
        }
    });
}

// Horizontal Move Slider Logic
let slideIndex = 1;
showSlides(slideIndex);

// Auto slide every 5 seconds
setInterval(() => {
    plusSlides(1);
}, 5000);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    let container = document.querySelector(".slides-container");

    if (!slides || slides.length === 0 || !container) return;

    // Loop logic
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Move the container horizontally
    // Example: Slide 1 -> 0%, Slide 2 -> -100%, Slide 3 -> -200%
    const translateValue = -(slideIndex - 1) * 100;
    container.style.transform = `translateX(${translateValue}%)`;

    // Manage 'active' class for animations inside slides
    // We add 'active' to the current slide to trigger internal CSS animations
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[slideIndex - 1].classList.add("active");

    // Manage Dots
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    if (dots.length > 0) {
        dots[slideIndex - 1].classList.add("active");
    }
}

// --- Dashboard Analytics Logic ---

async function fetchDashboardData() {
    const token = localStorage.getItem('token');
    // Only fetch if logged in
    if (!token) return;

    try {
        const res = await fetch('/api/analytics/overview', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const responseData = await res.json();

        if (responseData.success && responseData.data) {
            window.dashboardData = responseData.data; // Store for AI
            updateDashboardUI(responseData.data);
        }
    } catch (err) {
        console.error('Error fetching dashboard data', err);
    }
}

function updateDashboardUI(data) {
    // 1. Monthly Budget Progress (Advanced)
    const monthTotal = data.monthTotal || 0;
    const monthlyBudget = data.monthlyBudget || 5000;
    let percent = monthlyBudget > 0 ? (monthTotal / monthlyBudget) * 100 : 100;
    percent = Math.min(percent, 100);

    window.currentMonthlyBudget = monthlyBudget;

    // Elements
    const percentDisplay = document.getElementById('budgetPercentDisplay');
    const spentDisplay = document.getElementById('budgetSpentDisplay');
    const remainingDisplay = document.getElementById('budgetRemainingDisplay');
    const totalDisplay = document.getElementById('budgetTotalDisplay');
    const fillBar = document.getElementById('budgetFillBar');
    const statusMsg = document.getElementById('budgetStatusMessage');

    // Values
    const remaining = Math.max(monthlyBudget - monthTotal, 0);

    // Update Text
    if (percentDisplay) percentDisplay.textContent = `${Math.round(percent)}%`;
    if (spentDisplay) spentDisplay.textContent = `₹${monthTotal.toLocaleString()}`;
    if (remainingDisplay) remainingDisplay.textContent = `₹${remaining.toLocaleString()}`;
    if (totalDisplay) totalDisplay.textContent = `₹${monthlyBudget.toLocaleString()}`;

    // Update Bar
    if (fillBar) {
        fillBar.style.width = `${percent}%`;

        // Dynamic Color & Gradient
        if (percent >= 100) {
            fillBar.style.background = 'linear-gradient(90deg, #d32f2f, #ef5350)'; // Danger Red
        } else if (percent > 85) {
            fillBar.style.background = 'linear-gradient(90deg, #f57c00, #ffb74d)'; // Warning Orange
        } else {
            fillBar.style.background = 'linear-gradient(90deg, #388e3c, #81c784)'; // Safe Green
        }
    }

    // Status Message logic
    if (statusMsg) {
        if (percent >= 100) {
            statusMsg.textContent = "🚨 Budget Exceeded! Limit your spending immediately.";
            statusMsg.style.color = "#d32f2f";
        } else if (percent > 85) {
            statusMsg.textContent = "⚠️ Almost there! Be careful with upcoming expenses.";
            statusMsg.style.color = "#f57c00";
        } else if (percent > 50) {
            statusMsg.textContent = "📊 Halfway through. Keep tracking!";
            statusMsg.style.color = "#555";
        } else {
            statusMsg.textContent = "✅ You're doing great! Spending is under control.";
            statusMsg.style.color = "#388e3c";
        }
    }

    // 2. Alerts & Insights (Enriched)
    const notifContent = document.getElementById('notificationContent');
    if (notifContent) {
        notifContent.innerHTML = '';

        // -- Time Logic --
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const daysRemaining = lastDay.getDate() - today.getDate();
        const safeDaily = remaining > 0 ? Math.round(remaining / (daysRemaining || 1)) : 0;

        // -- Helper --
        const addNotif = (text, bg, icon = 'info') => {
            const div = document.createElement('div');
            // Slight transparency for glass effect
            div.style.cssText = `background: ${bg}; padding: 8px 12px; border-radius: 6px; display: flex; align-items: start; gap: 8px; font-size: 13px; line-height: 1.4;`;
            div.innerHTML = `
                <span class="material-icons" style="font-size: 16px; opacity: 0.9; margin-top: 1px;">${icon}</span>
                <span>${text}</span>
            `;
            notifContent.appendChild(div);
        };

        // 1. Critical Alerts (Top Priority)
        let hasCritical = false;
        if (percent >= 100) {
            addNotif("Budget Exceeded! Stop spending immediately or check your limit.", "rgba(211, 47, 47, 0.9)", "error");
            hasCritical = true;
        } else if (percent > 85) {
            addNotif("Budget Critical! You have used over 85% of your limit.", "rgba(245, 124, 0, 0.9)", "warning");
            hasCritical = true;
        }

        // 2. High Expense Alert
        if (data.recentHighExpenses && data.recentHighExpenses.length > 0) {
            const high = data.recentHighExpenses[0];
            addNotif(`High spend detected: ₹${high.amount} on ${high.category}`, "rgba(255, 255, 255, 0.25)", "payments");
        }

        // 3. Daily Insight (If not critical)
        if (remaining > 0 && !hasCritical) {
            addNotif(`${daysRemaining} days left in month. \nSafe to spend: ₹${safeDaily}/day`, "rgba(255, 255, 255, 0.2)", "calendar_today");
        }

        // 4. Random Tip (Always helpful)
        const tips = [
            "Cook at home to save ~₹200/meal.",
            "Try the 50/30/20 rule for savings.",
            "Unsubscribe from unused apps today.",
            "Save 10% of income before spending.",
            "Carry cash to limit overspending.",
            "Track small expenses; they add up!"
        ];
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        addNotif(`Tip: ${randomTip}`, "rgba(255, 255, 255, 0.15)", "lightbulb");
    }

    // 3. Heatmap
    if (data.heatmap) {
        renderHeatmap(data.heatmap);
    }

    // 4. Main Spending Chart (Dynamic)
    if (data.categoryBreakdown) {
        renderDashboardChart(data.categoryBreakdown);
        updateFeatureSectionMeta(data.categoryBreakdown, monthlyBudget);
    }

    updateSidebarProfile();
}

function updateSidebarProfile() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const sidebarProfileSection = document.getElementById('sidebarProfileSection');
    const sidebarLoginSection = document.getElementById('sidebarLoginSection');
    const sidebarName = document.getElementById('sidebarName');
    const sidebarEmail = document.getElementById('sidebarEmail');
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    const sidebarProfileLink = document.getElementById('sidebarProfileLink');

    if (token && user && user.name) {
        // Logged In
        if (sidebarProfileSection) sidebarProfileSection.style.display = 'flex';
        if (sidebarLoginSection) sidebarLoginSection.style.display = 'none';

        if (sidebarName) sidebarName.textContent = user.name;
        if (sidebarEmail) sidebarEmail.textContent = user.email || '';
        if (sidebarAvatar) sidebarAvatar.textContent = user.name.charAt(0).toUpperCase();

        if (sidebarProfileLink) {
            sidebarProfileLink.onclick = (e) => {
                e.preventDefault();
                // Toggle Sidebar or go to generic profile (for now just close)
                toggleSidebar();
                alert(`Logged in as ${user.name}`);
            };
        }
    } else {
        // Logged Out
        if (sidebarProfileSection) sidebarProfileSection.style.display = 'none';
        if (sidebarLoginSection) sidebarLoginSection.style.display = 'block';

        if (sidebarProfileLink) {
            sidebarProfileLink.onclick = (e) => {
                e.preventDefault();
                toggleSidebar();
                const loginModal = document.getElementById('loginModal');
                const overlay = document.getElementById('authOverlay');
                if (loginModal) loginModal.classList.add('active');
                if (overlay) overlay.classList.add('active');
            };
        }
    }
}

function updateFeatureSectionMeta(breakdown, monthlyBudget) {
    if (!breakdown || !monthlyBudget) return;

    const categories = {
        'FOOD': { usedId: 'foodBudgetUsed', spentId: 'foodSpent' },
        'TRAVEL': { usedId: 'travelBudgetUsed', spentId: 'travelSpent' },
        'SUBSCRIPTIONS': { usedId: 'subscriptionsBudgetUsed', spentId: 'subscriptionsSpent' },
        'BILLS': { usedId: 'billsBudgetUsed', spentId: 'billsSpent' }
    };

    // Calculate total spent to ensure percentages are relative to budget or total spending?
    // User requested "Budget Used", so it refers to Allowence.

    // Default zero out
    Object.values(categories).forEach(ids => {
        const usedEl = document.getElementById(ids.usedId);
        const spentEl = document.getElementById(ids.spentId);
        if (usedEl) usedEl.textContent = '0%';
        if (spentEl) spentEl.textContent = '₹0';
    });

    breakdown.forEach(item => {
        const catKey = item._id ? item._id.toUpperCase() : '';
        const config = categories[catKey];

        if (config) {
            const usedEl = document.getElementById(config.usedId);
            const spentEl = document.getElementById(config.spentId);

            if (spentEl) spentEl.textContent = `₹${item.total.toLocaleString()}`;

            if (usedEl) {
                const percent = monthlyBudget > 0 ? Math.round((item.total / monthlyBudget) * 100) : 0;
                usedEl.textContent = `${percent}%`;
            }
        }
    });
}

let dashboardChartInstance = null;

function renderDashboardChart(breakdownData) {
    const ctx = document.getElementById('dashboardChart');
    if (!ctx) return;
    const context = ctx.getContext('2d');

    // Aggregate Data
    const labels = [];
    const values = [];
    const colors = [];

    // Mapping for standard categories
    const colorMap = {
        'FOOD': '#4caf50',
        'TRAVEL': '#ff9800',
        'BILLS': '#2196f3',
        'SUBSCRIPTIONS': '#9c27b0'
    };

    let totalVal = 0;
    breakdownData.forEach(item => {
        labels.push(item._id); // Category Name
        values.push(item.total);
        colors.push(colorMap[item._id] || '#607d8b'); // Fallback color
        totalVal += item.total;
    });

    if (totalVal === 0) {
        // Show empty placeholder if no stats
        labels.push('No Data');
        values.push(1);
        colors.push('#e0e0e0');
    }

    // Determine Legend Position (Responsive)
    const isMobile = window.innerWidth < 768;
    const legendPosition = isMobile ? 'bottom' : 'right';

    if (dashboardChartInstance) {
        dashboardChartInstance.data.labels = labels;
        dashboardChartInstance.data.datasets[0].data = values;
        dashboardChartInstance.data.datasets[0].backgroundColor = colors;
        dashboardChartInstance.options.plugins.legend.position = legendPosition;
        dashboardChartInstance.update();
    } else {
        dashboardChartInstance = new Chart(context, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%', // Thinner ring
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
                            padding: 20
                        }
                    },
                    tooltip: {
                        enabled: totalVal > 0, // Disable tooltip if empty state
                        backgroundColor: 'rgba(26, 94, 58, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 12,
                        cornerRadius: 8,
                        boxPadding: 4,
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                let value = context.raw;
                                let percentage = totalVal > 0 ? Math.round((value / totalVal) * 100) : 0;
                                return ` ${label}: ₹${value.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1200,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// Global Resize Listener for Dashboard Chart
window.addEventListener('resize', () => {
    if (dashboardChartInstance) {
        const isMobile = window.innerWidth < 768;
        const newPos = isMobile ? 'bottom' : 'right';
        if (dashboardChartInstance.options.plugins.legend.position !== newPos) {
            dashboardChartInstance.options.plugins.legend.position = newPos;
            dashboardChartInstance.update();
        }
    }
});

function renderHeatmap(heatmapData) {
    const grid = document.querySelector('.heatmap-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const today = new Date();
    const map = {};

    heatmapData.forEach(d => {
        map[d._id] = d.total;
    });

    // We want to show a fixed period, e.g., last 35 days (5 weeks) or just last 30 days aligned.
    // Let's align last 4 weeks + current week. 
    // Actually, to align with "Sun Mon Tue..." headers, we must pad the start.

    // Let's decide on a range: Last 4 weeks (28 days) or calendar month?
    // User asked for "weekly distributed", let's show last ~30 days but aligned.

    const daysToShow = 28; // 4 weeks
    // Calculate start date
    const startDate = new Date();
    startDate.setDate(today.getDate() - (daysToShow - 1));

    // Find day of week for start date (0=Sun, 6=Sat)
    const startDay = startDate.getDay();

    // Add empty padding cells for days before start date in the first row
    for (let i = 0; i < startDay; i++) {
        const spacer = document.createElement('div');
        // spacer.className = 'heatmap-cell'; 
        spacer.style.backgroundColor = 'transparent'; // Invisible
        grid.appendChild(spacer);
    }

    // Render Days
    for (let i = 0; i < daysToShow; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        const amount = map[dateStr] || 0;

        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        cell.title = `${dateStr}: ₹${amount}`;

        // Color intensity
        if (amount === 0) cell.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#334155' : '#e8f5e9';
        else if (amount < 500) cell.style.backgroundColor = '#a5d6a7';
        else if (amount < 2000) cell.style.backgroundColor = '#66bb6a';
        else if (amount < 5000) cell.style.backgroundColor = '#4caf50';
        else cell.style.backgroundColor = '#2e7d32';

        if (amount > 0) {
            cell.style.cursor = 'pointer';
        }
        // Always clickable now for feedback
        cell.addEventListener('click', () => showDayDetails(dateStr));
        cell.style.cursor = 'pointer';

        grid.appendChild(cell);
    }
}

// Day Details Modal
const dayDetailsModal = document.getElementById('dayDetailsModal');
const closeDayDetails = document.getElementById('closeDayDetails');
const dayTransactionList = document.getElementById('dayTransactionList');
const dayDetailsTitle = document.getElementById('dayDetailsTitle');

if (closeDayDetails) {
    closeDayDetails.addEventListener('click', () => {
        dayDetailsModal.classList.remove('active');
        document.getElementById('authOverlay').classList.remove('active');
    });
}

// Resuse overlay for closing
if (document.getElementById('authOverlay')) {
    document.getElementById('authOverlay').addEventListener('click', () => {
        if (dayDetailsModal) dayDetailsModal.classList.remove('active');
    });
}

async function showDayDetails(dateStr) {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Show loading state
    if (dayDetailsModal) {
        dayDetailsModal.classList.add('active');
        document.getElementById('authOverlay').classList.add('active');
        if (dayDetailsTitle) dayDetailsTitle.textContent = `Expenses on ${dateStr}`;
        if (dayTransactionList) dayTransactionList.innerHTML = '<li style="text-align:center;">Loading...</li>';
    }

    try {
        // Fetch expenses for exact date range
        const start = `${dateStr}T00:00:00.000Z`;
        const end = `${dateStr}T23:59:59.999Z`;

        const res = await fetch(`/api/expenses?startDate=${start}&endDate=${end}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const responseData = await res.json();

        if (responseData.success && dayTransactionList) {
            dayTransactionList.innerHTML = '';

            // Fix: Backend returns { count: N, expenses: [...] } in data
            const expenses = responseData.data.expenses || responseData.data || [];

            if (!Array.isArray(expenses) || expenses.length === 0) {
                dayTransactionList.innerHTML = '<li style="text-align:center; padding: 20px; color: #666;">No expenses found for this day.</li>';
                return;
            }

            expenses.forEach(tx => {
                const li = document.createElement('li');
                li.className = 'transaction-item';
                // Add styling for item
                li.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #eee; transition: background 0.2s;";

                li.innerHTML = `
                    <div class="trans-info" style="display: flex; align-items: center; gap: 12px;">
                        <span class="trans-icon" style="font-size: 20px; background: #e8f5e9; padding: 8px; border-radius: 50%;">${getCategoryIcon(tx.category)}</span>
                        <div>
                            <div class="trans-cat" style="font-weight: 600; color: #333;">${tx.description || tx.type || 'Expense'}</div>
                            <div class="trans-date" style="font-size: 12px; color: #888;">${new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                    </div>
                    <div class="trans-amount" style="font-weight: 600; color: #d32f2f;">-₹${tx.amount.toLocaleString()}</div>
                `;
                dayTransactionList.appendChild(li);
            });
        }
    } catch (err) {
        console.error('Error fetching day details', err);
        if (dayTransactionList) dayTransactionList.innerHTML = '<li style="text-align:center; color:red; padding:20px;">Error loading data</li>';
    }
}

function getCategoryIcon(category) {
    const icons = {
        'FOOD': '🍔',
        'TRAVEL': '✈️',
        'BILLS': '🧾',
        'SUBSCRIPTIONS': '💳',
        'EDUCATION': '📚',
        'SHOPPING': '🛍️'
    };
    return icons[category] || '💸';
}


// Init
document.addEventListener('DOMContentLoaded', fetchDashboardData);

// --- Budget Edit Logic ---
const budgetModal = document.getElementById('budgetModal');
const editBudgetBtn = document.getElementById('editBudgetBtn');
const closeBudget = document.getElementById('closeBudget');
const budgetForm = document.getElementById('budgetForm');
const newBudgetInput = document.getElementById('newBudgetInput');

if (editBudgetBtn) {
    editBudgetBtn.addEventListener('click', () => {
        if (!budgetModal) return;
        budgetModal.classList.add('active');
        document.getElementById('authOverlay').classList.add('active'); // Reuse auth overlay
        if (newBudgetInput) newBudgetInput.value = window.currentMonthlyBudget || 5000;
    });
}

if (closeBudget) {
    closeBudget.addEventListener('click', () => {
        budgetModal.classList.remove('active');
        document.getElementById('authOverlay').classList.remove('active');
    });
}

// Reuse overlay click to close budget modal too
const authOverlayRef = document.getElementById('authOverlay');
if (authOverlayRef) {
    authOverlayRef.addEventListener('click', () => {
        if (budgetModal) budgetModal.classList.remove('active');
    });
}

if (budgetForm) {
    budgetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newBudget = newBudgetInput.value;
        const token = localStorage.getItem('token');

        if (!token) return;

        try {
            const res = await fetch('/api/users/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ monthlyBudget: newBudget })
            });

            const data = await res.json();
            if (data.success) {
                // Close modal
                budgetModal.classList.remove('active');
                document.getElementById('authOverlay').classList.remove('active');

                // Refresh Dashboard
                fetchDashboardData();

                // Show success toast (checking if showToast exists globaly from auth.js)
                if (typeof showToast === 'function') {
                    showToast('Budget Updated Successfully!', 'success');
                } else {
                    alert('Budget Updated!');
                }
            } else {
                alert(data.error || 'Failed to update budget');
            }
        } catch (err) {
            console.error(err);
            alert('Error updating budget');
        }
    });
}

// --- Contact Modal Logic ---
const contactLink = document.getElementById('contactLink');
const contactModal = document.getElementById('contactModal');
const closeContact = document.getElementById('closeContact');
const aiChatBtn = document.getElementById('aiChatBtn');
const callSupportBtn = document.getElementById('callSupportBtn');
const contactOptions = document.getElementById('contactOptions');
const aiChatView = document.getElementById('aiChatView');
const callSupportView = document.getElementById('callSupportView');
const backToOptionsFromChat = document.getElementById('backToOptionsFromChat');
const backToOptionsFromCall = document.getElementById('backToOptionsFromCall');

if (contactLink) {
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (contactModal) {
            contactModal.classList.add('active');
            const overlay = document.getElementById('authOverlay');
            if (overlay) overlay.classList.add('active');

            // Reset view
            if (contactOptions) contactOptions.style.display = 'flex';
            if (aiChatView) aiChatView.style.display = 'none';
            if (callSupportView) callSupportView.style.display = 'none';
        }
    });
}

if (closeContact) {
    closeContact.addEventListener('click', () => {
        if (contactModal) contactModal.classList.remove('active');
        const overlay = document.getElementById('authOverlay');
        if (overlay) overlay.classList.remove('active');
    });
}

// Reuse overlay click for contact modal too
const overlayRef2 = document.getElementById('authOverlay');
if (overlayRef2) {
    overlayRef2.addEventListener('click', () => {
        if (contactModal) contactModal.classList.remove('active');
    });
}

if (aiChatBtn) {
    aiChatBtn.addEventListener('click', () => {
        if (contactOptions) contactOptions.style.display = 'none';
        if (aiChatView) aiChatView.style.display = 'block';
    });
}

if (callSupportBtn) {
    callSupportBtn.addEventListener('click', () => {
        if (contactOptions) contactOptions.style.display = 'none';
        if (callSupportView) callSupportView.style.display = 'block';
    });
}

if (backToOptionsFromChat) {
    backToOptionsFromChat.addEventListener('click', () => {
        if (aiChatView) aiChatView.style.display = 'none';
        if (contactOptions) contactOptions.style.display = 'flex';
    });
}

if (backToOptionsFromCall) {
    backToOptionsFromCall.addEventListener('click', () => {
        if (callSupportView) callSupportView.style.display = 'none';
        if (contactOptions) contactOptions.style.display = 'flex';
    });
}

// Chat Bot Dummy Logic
const sendMessageBtn = document.getElementById('sendMessageBtn');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', sendChatMessage);
}
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
}

function sendChatMessage() {
    if (!chatInput || !chatMessages) return;

    const text = chatInput.value.trim();
    if (!text) return;

    // User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user';
    userDiv.style.background = '#e3f2fd';
    userDiv.style.padding = '8px 12px';
    userDiv.style.borderRadius = '12px';
    userDiv.style.alignSelf = 'flex-end';
    userDiv.style.maxWidth = '80%';
    userDiv.style.marginTop = '10px';
    userDiv.textContent = text;
    chatMessages.appendChild(userDiv);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Bot Response (Smart Assistant)
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot';
        botDiv.style.background = '#e8f5e9';
        botDiv.style.padding = '8px 12px';
        botDiv.style.borderRadius = '12px';
        botDiv.style.alignSelf = 'flex-start';
        botDiv.style.maxWidth = '80%';
        botDiv.style.marginTop = '10px';

        const responseText = generateAIResponse(text);
        botDiv.innerHTML = responseText.replace(/\n/g, '<br>'); // Support line breaks

        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
}

function generateAIResponse(input) {
    const lowerInput = input.toLowerCase();
    const data = window.dashboardData || {};

    // Helper to get category total
    const getCatTotal = (catName) => {
        if (!data.categoryBreakdown) return 0;
        const cat = data.categoryBreakdown.find(c => c._id === catName);
        return cat ? cat.total : 0;
    };

    // 1. General Greetings & Help
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        return "Hi there! I'm your Budget Buddy Assistant. 🎓\nI can help you analyze your spending on Food, Travel, Bills, and more. Try asking 'How much did I spend on food?' or 'Am I over budget?'.";
    }

    // 2. Category Specific Queries
    if (lowerInput.includes('food')) {
        const foodSpent = getCatTotal('FOOD');
        return `🍔 You've spent ₹${foodSpent.toLocaleString()} on **Food** this month.\n\nTip: Cooking at home or using the hostel mess can save you a ton vs ordering online!`;
    }
    if (lowerInput.includes('travel') || lowerInput.includes('commute')) {
        const travelSpent = getCatTotal('TRAVEL');
        return `✈️ Your **Travel** expenses are ₹${travelSpent.toLocaleString()}.\n\nTip: Student passes for metro/bus are great value. Have you checked if you're eligible?`;
    }
    if (lowerInput.includes('bill') || lowerInput.includes('utilities')) {
        const billsSpent = getCatTotal('BILLS');
        return `🧾 You've paid ₹${billsSpent.toLocaleString()} for **Bills**.\n\nReminder: Split shared bills (electricity/wifi) with roommates immediately to avoid confusion.`;
    }
    if (lowerInput.includes('subscription')) {
        const subSpent = getCatTotal('SUBSCRIPTIONS');
        return `💳 **Subscriptions** cost you ₹${subSpent.toLocaleString()}.\n\nReview them! Cancel any you haven't used in the last 2 weeks.`;
    }

    // 3. Overall Budget & Prediction
    if (lowerInput.includes('budget') || lowerInput.includes('allowance') || lowerInput.includes('left') || lowerInput.includes('prediction')) {
        const total = data.monthTotal || 0;
        const budget = data.monthlyBudget || 5000;
        const left = budget - total;
        const percentUsed = Math.round((total / budget) * 100);

        let prediction = "";
        if (percentUsed > 80) {
            prediction = "⚠️ Warning: You've used over 80% of your budget. You might run out before the month ends!";
        } else if (percentUsed > 50) {
            prediction = "You're halfway through your budget. Pace yourself!";
        } else {
            prediction = "✅ You're doing great! Plenty of budget left.";
        }

        return `💰 **Budget Status**:\nSpent: ₹${total.toLocaleString()}\nLimit: ₹${budget.toLocaleString()}\nRemaining: ₹${left.toLocaleString()} (${100 - percentUsed}% left)\n\n${prediction}`;
    }

    // 4. Overspending / Habits
    if (lowerInput.includes('habit') || lowerInput.includes('spend') || lowerInput.includes('highest') || lowerInput.includes('shock')) {
        let maxCat = { _id: 'None', total: 0 };
        if (data.categoryBreakdown) {
            data.categoryBreakdown.forEach(c => {
                if (c.total > maxCat.total) maxCat = c;
            });
        }
        return `📊 Your highest spending category is **${maxCat._id}** with ₹${maxCat.total.toLocaleString()}.\n\nTry to set a weekly limit for this category to save more!`;
    }

    // 5. General Tips
    if (lowerInput.includes('tip') || lowerInput.includes('advice') || lowerInput.includes('help')) {
        const tips = [
            "💡 **50/30/20 Rule**: AIM for 50% Needs, 30% Wants, 20% Savings.",
            "💡 **Wait 24 Hours**: Before buying something expensive, wait a day. You might not want it anymore!",
            "💡 **Student Discounts**: Always ask if there's a student discount. It adds up!",
            "💡 **Track Daily**: spending 5 mins a day tracking is better than 1 hour a month getting stressed."
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }

    // Fallback
    return "I'm still learning! 🧠\nTry asking about 'food', 'travel', 'budget', or 'tips'. I can analyze your current month's data for you.";
}

// --- Calculator Modal Logic ---
const calculatorLink = document.getElementById('calculatorLink');
const calculatorModal = document.getElementById('calculatorModal');
const closeCalculator = document.getElementById('closeCalculator');
const calcTotalAmount = document.getElementById('calcTotalAmount');
const calcCategoryList = document.getElementById('calcCategoryList');

if (calculatorLink) {
    calculatorLink.addEventListener('click', (e) => {
        e.preventDefault();
        openCalculator();
    });
}

function openCalculator() {
    if (!calculatorModal) return;

    // Use stored data or fetch if needed (but usually dashboard loads first)
    const data = window.dashboardData || { monthTotal: 0, categoryBreakdown: [] };

    // Update Total
    if (calcTotalAmount) {
        calcTotalAmount.textContent = `₹${(data.monthTotal || 0).toLocaleString()}`;
    }

    // Update List
    if (calcCategoryList) {
        calcCategoryList.innerHTML = '';
        const breakup = data.categoryBreakdown || [];

        // Define icons mapping locally or use from config
        const icons = { 'FOOD': '🍔', 'TRAVEL': '✈️', 'BILLS': '🧾', 'SUBSCRIPTIONS': '💳' };

        // Ensure all categories show even if 0
        const allCats = ['FOOD', 'TRAVEL', 'BILLS', 'SUBSCRIPTIONS'];

        allCats.forEach(catKey => {
            const found = breakup.find(b => b._id === catKey);
            const amount = found ? found.total : 0;
            const icon = icons[catKey] || '💰';
            const cleanName = catKey.charAt(0) + catKey.slice(1).toLowerCase();

            const li = document.createElement('li');
            li.style.cssText = "display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f5f5f5;";
            li.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="background: #e8f5e9; padding: 8px; border-radius: 50%; font-size: 18px;">${icon}</span>
                    <span style="font-size: 16px; color: #333;">${cleanName}</span>
                </div>
                <span style="font-weight: 600; color: #2e7d32;">₹${amount.toLocaleString()}</span>
            `;
            calcCategoryList.appendChild(li);
        });
    }

    calculatorModal.classList.add('active');
    const overlay = document.getElementById('authOverlay');
    if (overlay) overlay.classList.add('active');
}

if (closeCalculator) {
    closeCalculator.addEventListener('click', () => {
        calculatorModal.classList.remove('active');
        const overlay = document.getElementById('authOverlay');
        if (overlay) overlay.classList.remove('active');
    });
}

// Add overlay listener for calculator too (re-using existing listener might need a check)
const overlayRefCalc = document.getElementById('authOverlay');
if (overlayRefCalc) {
    overlayRefCalc.addEventListener('click', () => {
        if (calculatorModal) calculatorModal.classList.remove('active');
    });
}

// Calculator Tab Logic
const tabSummary = document.getElementById('tabSummary');
const tabPlanner = document.getElementById('tabPlanner');
const calcSummaryView = document.getElementById('calcSummaryView');
const calcPlannerView = document.getElementById('calcPlannerView');
const btnCalculatePlan = document.getElementById('btnCalculatePlan');

if (tabSummary && tabPlanner) {
    tabSummary.addEventListener('click', () => switchCalcTab('summary'));
    tabPlanner.addEventListener('click', () => switchCalcTab('planner'));
}

function switchCalcTab(tab) {
    if (tab === 'summary') {
        tabSummary.classList.add('active');
        tabSummary.style.color = '#1a5e3a';
        tabSummary.style.borderBottom = '2px solid #1a5e3a';

        tabPlanner.classList.remove('active');
        tabPlanner.style.color = '#777';
        tabPlanner.style.borderBottom = '2px solid transparent';

        calcSummaryView.style.display = 'block';
        calcPlannerView.style.display = 'none';

        openCalculator(); // Refresh data
    } else {
        tabPlanner.classList.add('active');
        tabPlanner.style.color = '#1a5e3a';
        tabPlanner.style.borderBottom = '2px solid #1a5e3a';

        tabSummary.classList.remove('active');
        tabSummary.style.color = '#777';
        tabSummary.style.borderBottom = '2px solid transparent';

        calcPlannerView.style.display = 'block';
        calcSummaryView.style.display = 'none';
    }
}

if (btnCalculatePlan) {
    btnCalculatePlan.addEventListener('click', () => {
        const allowance = parseFloat(document.getElementById('planAllowance').value) || 0;
        const food = parseFloat(document.getElementById('planFood').value) || 0;
        const travel = parseFloat(document.getElementById('planTravel').value) || 0;
        const bills = parseFloat(document.getElementById('planBills').value) || 0;
        const subs = parseFloat(document.getElementById('planSubs').value) || 0;

        const total = food + travel + bills + subs;
        const remaining = allowance - total;

        const planResult = document.getElementById('planResult');
        const planTotalExp = document.getElementById('planTotalExp');
        const planRemaining = document.getElementById('planRemaining');

        if (planTotalExp) planTotalExp.textContent = `₹${total.toLocaleString()}`;
        if (planRemaining) {
            planRemaining.textContent = `₹${remaining.toLocaleString()}`;
            planRemaining.style.color = remaining < 0 ? '#f44336' : (remaining < (allowance * 0.2) ? '#ff9800' : '#2e7d32');
        }

        if (planResult) planResult.style.display = 'block';
    });
}
// --- Detailed Bar Chart Logic ---
const btnExpandCategories = document.getElementById('btnExpandCategories');
const barChartModal = document.getElementById('barChartModal');
const closeBarChart = document.getElementById('closeBarChart');
let barChartInstance = null;

if (btnExpandCategories) {
    btnExpandCategories.addEventListener('click', () => {
        if (barChartModal) {
            barChartModal.classList.add('active');
            document.getElementById('authOverlay').classList.add('active');
            renderDetailedBarChart();
        }
    });
}

if (closeBarChart) {
    closeBarChart.addEventListener('click', () => {
        if (barChartModal) {
            barChartModal.classList.remove('active');
            document.getElementById('authOverlay').classList.remove('active');
        }
    });
}

// Reuse Overlay to close Bar Chart Modal too
if (overlayRefCalc) {
    overlayRefCalc.addEventListener('click', () => {
        if (barChartModal) barChartModal.classList.remove('active');
    });
}

function renderDetailedBarChart() {
    const ctx = document.getElementById('categoryBarChartCanvas');
    if (!ctx) return;

    const data = window.dashboardData || { categoryBreakdown: [] };
    const breakdown = data.categoryBreakdown || [];

    // Prepare Data
    // We want all main categories even if 0
    const categories = ['FOOD', 'TRAVEL', 'BILLS', 'SUBSCRIPTIONS', 'SHOPPING', 'EDUCATION'];
    const values = categories.map(cat => {
        const found = breakdown.find(b => b._id === cat);
        return found ? found.total : 0;
    });

    // Colors
    const backgroundColors = [
        'rgba(76, 175, 80, 0.7)',  // Food - Green
        'rgba(255, 152, 0, 0.7)',  // Travel - Orange
        'rgba(33, 150, 243, 0.7)', // Bills - Blue
        'rgba(156, 39, 176, 0.7)', // Subs - Purple
        'rgba(233, 30, 99, 0.7)',  // Shopping - Pink
        'rgba(0, 150, 136, 0.7)'   // Education - Teal
    ];

    const borderColors = [
        'rgba(76, 175, 80, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(0, 150, 136, 1)'
    ];

    if (barChartInstance) {
        barChartInstance.destroy(); // Destroy old to re-render fresh
    }

    barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories.map(c => c.charAt(0) + c.slice(1).toLowerCase()), // Capitalize first letter
            datasets: [{
                label: 'Monthly Spending (₹)',
                data: values,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
                borderRadius: 4,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0'
                    },
                    ticks: {
                        font: { family: "'Inter', sans-serif" }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { family: "'Inter', sans-serif" }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // No need for legend in single dataset bar chart
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return ` Spent: ₹${context.raw.toLocaleString()}`;
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// --- Dark Mode Logic ---
const themeToggleBtn = document.querySelector('.theme-toggle');

// Check saved preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = 'light_mode';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');

        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Update Icon
        themeToggleBtn.textContent = isDark ? 'light_mode' : 'dark_mode';

        // Optional: Re-render charts to update grid colors if needed
        // (Charts often need a full update to change grid/text colors)
        if (typeof renderDashboardChart === 'function' && window.dashboardData && window.dashboardData.categoryBreakdown) {
            renderDashboardChart(window.dashboardData.categoryBreakdown);
        }
        if (typeof renderDetailedBarChart === 'function' && window.dashboardData) {
            renderDetailedBarChart();
        }
    });
}
// --- Hero Button Logic ---
const btnHeroGetStarted = document.getElementById('btnHeroGetStarted');
const btnHeroStartSaving = document.getElementById('btnHeroStartSaving');
const btnHeroTrackNow = document.getElementById('btnHeroTrackNow');
const btnHeroDownloadApp = document.getElementById('btnHeroDownloadApp');

function checkAuthAndAction(action) {
    const token = localStorage.getItem('token');
    if (token) {
        action();
    } else {
        // Not logged in, open logic modal
        const loginModal = document.getElementById('loginModal');
        const overlay = document.getElementById('authOverlay');
        if (loginModal) loginModal.classList.add('active');
        if (overlay) overlay.classList.add('active');

        // Optional: Show message saying "Login to continue"
    }
}

if (btnHeroGetStarted) {
    btnHeroGetStarted.addEventListener('click', () => {
        checkAuthAndAction(() => {
            // Scroll to Dashboard
            const dashboardSection = document.getElementById('budget-section'); // or top of analytics
            if (dashboardSection) dashboardSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

if (btnHeroStartSaving) {
    btnHeroStartSaving.addEventListener('click', () => {
        checkAuthAndAction(() => {
            // Scroll to Budget Planner
            const budgetSection = document.getElementById('budget-section');
            if (budgetSection) {
                budgetSection.scrollIntoView({ behavior: 'smooth' });
                // Optionally highlight budget edit
                setTimeout(() => {
                    if (editBudgetBtn) editBudgetBtn.click();
                }, 800);
            }
        });
    });
}

if (btnHeroTrackNow) {
    btnHeroTrackNow.addEventListener('click', () => {
        checkAuthAndAction(() => {
            // Scroll to Expenses/Heatmap
            const expensesSection = document.getElementById('expenses-section');
            if (expensesSection) expensesSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

if (btnHeroDownloadApp) {
    btnHeroDownloadApp.addEventListener('click', (e) => {
        e.preventDefault();
        alert("📱 Mobile App Coming Soon! \n\nWe are working hard to bring Budget Buddy to iOS and Android. Stay tuned!");
    });
}
// --- Smart Track (AI) Logic ---
const smartTrackModal = document.getElementById('smartTrackModal');
const closeSmartTrack = document.getElementById('closeSmartTrack');

function openSmartTrackModal() {
    if (smartTrackModal) {
        smartTrackModal.classList.add('active');
        document.getElementById('authOverlay').classList.add('active');
    }
}

if (closeSmartTrack) {
    closeSmartTrack.addEventListener('click', () => {
        if (smartTrackModal) {
            smartTrackModal.classList.remove('active');
            document.getElementById('authOverlay').classList.remove('active');
        }
    });
}

// Reuse overlay
const overlaySmartRef = document.getElementById('authOverlay');
if (overlaySmartRef) {
    overlaySmartRef.addEventListener('click', () => {
        if (smartTrackModal) smartTrackModal.classList.remove('active');
    });
}

// Expose to Global Scope for OnClick
window.openSmartTrackModal = openSmartTrackModal;

// --- Smart Track Features Logic ---
const btnConnectBank = document.getElementById('btnConnectBank');
const toggleAiCat = document.getElementById('toggleAiCat');
const btnSyncNow = document.getElementById('btnSyncNow');
const syncSpinner = document.getElementById('syncSpinner');
const syncStatusText = document.getElementById('syncStatusText');

// Views
const smartTrackMainView = document.getElementById('smartTrackMainView');
const smartTrackUpiView = document.getElementById('smartTrackUpiView');
const btnBackToMain = document.getElementById('btnBackToMain');
const btnLinkAccount = document.getElementById('btnLinkAccount');
const inputBankName = document.getElementById('inputBankName');

// 1. Connect Bank -> Show UPI View
if (btnConnectBank) {
    btnConnectBank.addEventListener('click', () => {
        if (smartTrackMainView && smartTrackUpiView) {
            smartTrackMainView.style.display = 'none';
            smartTrackUpiView.style.display = 'block';
        }
    });
}

// 2. Back Button
if (btnBackToMain) {
    btnBackToMain.addEventListener('click', () => {
        if (smartTrackMainView && smartTrackUpiView) {
            smartTrackUpiView.style.display = 'none';
            smartTrackMainView.style.display = 'block';
        }
    });
}

// 3. Link Account (Simulate API)
if (btnLinkAccount) {
    btnLinkAccount.addEventListener('click', () => {
        const selectedBank = inputBankName ? inputBankName.options[inputBankName.selectedIndex].text : 'Bank';

        // Loading State
        const originalText = btnLinkAccount.textContent;
        btnLinkAccount.textContent = 'Verifying...';
        btnLinkAccount.disabled = true;
        btnLinkAccount.style.opacity = '0.7';

        // Simulate Network Delay
        setTimeout(() => {
            // Reset Button
            btnLinkAccount.textContent = originalText;
            btnLinkAccount.disabled = false;
            btnLinkAccount.style.opacity = '1';

            // Navigate Back
            smartTrackUpiView.style.display = 'none';
            smartTrackMainView.style.display = 'block';

            // Update Connect Step UI
            const stepItem = document.getElementById('stepConnectBank');
            const checkIcon = stepItem ? stepItem.querySelector('.check-icon') : null;
            const statusText = stepItem ? stepItem.querySelector('.status-text') : null;

            if (btnConnectBank) btnConnectBank.style.display = 'none';
            if (checkIcon) checkIcon.style.display = 'block';

            if (statusText) {
                statusText.innerHTML = `Connected to <strong>${selectedBank}</strong> •••• 4582`;
                statusText.style.color = '#4caf50';
            }

            // Auto Enable AI
            if (toggleAiCat && !toggleAiCat.checked) {
                toggleAiCat.click();
            }

            if (typeof showToast === 'function') {
                showToast(`Successfully linked ${selectedBank}`, 'success');
            }
        }, 1500);
    });
}

// 4. AI Categorization Toggle
if (toggleAiCat) {
    toggleAiCat.addEventListener('change', (e) => {
        const stepItem = document.getElementById('stepAiCat');
        const statusText = stepItem ? stepItem.querySelector('.status-text') : null;

        if (statusText) {
            if (e.target.checked) {
                statusText.textContent = 'Active. processing new transactions...';
                statusText.style.color = '#4caf50';

                // Simulate initial processing toast
                setTimeout(() => {
                    const isVisible = smartTrackModal && smartTrackModal.classList.contains('active');
                    if (isVisible && typeof showToast === 'function') showToast('AI Classification Enabled', 'success');
                }, 500);
            } else {
                statusText.textContent = 'Auto-tag expenses (e.g. Uber, Zomato).';
                statusText.style.color = '#777';
            }
        }
    });
}

// 5. Real-time Sync
if (btnSyncNow) {
    btnSyncNow.addEventListener('click', () => {
        // UI Updates
        btnSyncNow.style.display = 'none';
        if (syncSpinner) syncSpinner.style.display = 'block';
        if (syncStatusText) syncStatusText.textContent = 'Syncing...';

        // Simulate Sync
        setTimeout(() => {
            if (syncSpinner) syncSpinner.style.display = 'none';
            btnSyncNow.style.display = 'inline-block';
            btnSyncNow.textContent = 'Sync Again';

            const now = new Date();
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (syncStatusText) {
                syncStatusText.textContent = `Last synced: Today, ${time}`;
                syncStatusText.style.color = '#2e7d32'; // Green
            }

            // Actually refresh dashboard data
            fetchDashboardData();

            if (typeof showToast === 'function') showToast('Dashboard Synced', 'success');
        }, 2000);
    });
}
