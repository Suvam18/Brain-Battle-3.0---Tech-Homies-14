// Auth Logic Rebuilt

const API_AUTH_URL = '/api/auth';

// DOM Elements
const authOverlay = document.getElementById('authOverlay');

// Modals
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

// Buttons & Links
const navLoginBtn = document.getElementById('navLoginBtn');
const navRegisterBtn = document.getElementById('navRegisterBtn');
const navLogoutBtn = document.getElementById('navLogoutBtn');
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');
const openRegisterLink = document.getElementById('openRegisterLink'); // In Login Modal
const openLoginLink = document.getElementById('openLoginLink');       // In Register Modal

// Forms
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// UI Sections
const authButtons = document.getElementById('authButtons');
const userProfile = document.getElementById('userProfile');
const usernameDisplay = document.getElementById('usernameDisplay');

// --- Event Listeners ---

// 1. Navigation Buttons
if (navLoginBtn) {
    navLoginBtn.addEventListener('click', () => openModal(loginModal));
}
const footerLoginLink = document.getElementById('footerLoginLink');
if (footerLoginLink) {
    footerLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });
}

if (navRegisterBtn) {
    navRegisterBtn.addEventListener('click', () => openModal(registerModal));
}
const footerSignupLink = document.getElementById('footerSignupLink');
if (footerSignupLink) {
    footerSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(registerModal);
    });
}
if (navLogoutBtn) {
    navLogoutBtn.addEventListener('click', logout);
}

// 2. Close Buttons
if (closeLogin) closeLogin.addEventListener('click', closeModal);
if (closeRegister) closeRegister.addEventListener('click', closeModal);
if (authOverlay) authOverlay.addEventListener('click', closeModal);

// 3. Switch between Login/Register
if (openRegisterLink) {
    openRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
        openModal(registerModal);
    });
}
if (openLoginLink) {
    openLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
        openModal(loginModal);
    });
}

// 4. Form Submissions
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
}

if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
}

// 5. Initial Check
document.addEventListener('DOMContentLoaded', checkSession);


// --- Functions ---

function openModal(modal) {
    if (!modal) return;
    authOverlay.classList.add('active');
    modal.classList.add('active');
}

function closeModal() {
    authOverlay.classList.remove('active');
    if (loginModal) loginModal.classList.remove('active');
    if (registerModal) registerModal.classList.remove('active');
}

/**
 * Handle Login Form Submission
 */
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${API_AUTH_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            // Success
            loginSuccess(data.data.token, data.data.user);
        } else {
            // Error
            showToast(data.error?.message || 'Login failed', 'error');
        }

    } catch (err) {
        console.error(err);
        showToast('Server connection error', 'error');
    }
}

/**
 * Handle Register Form Submission
 */
async function handleRegister(e) {
    e.preventDefault();

    // ID is 'registerUsername' in HTML but we treat it as Full Name
    const fullName = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const res = await fetch(`${API_AUTH_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password })
        });

        const data = await res.json();

        if (data.success) {
            // Success
            loginSuccess(data.data.token, data.data.user);
            showToast('Account created successfully!', 'success');
        } else {
            // Error
            showToast(data.error?.message || 'Registration failed', 'error');
        }

    } catch (err) {
        console.error(err);
        showToast('Server connection error', 'error');
    }
}

function loginSuccess(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    updateAuthUI(user);
    closeModal();

    // Optional: Refresh dash
    if (window.location.reload) {
        // window.location.reload(); 
        // Or just refresh specific parts to feel single-page-app like
        if (typeof window.fetchDashboardData === 'function') window.fetchDashboardData();
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateAuthUI(null);
    showToast('Logged out successfully', 'success');

    // Clear data from UI
    if (typeof updateDashboardUI === 'function') {
        // Pass empty structure or implement clear function
    }
}

function checkSession() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            updateAuthUI(user);
        } catch (e) {
            logout(); // Corrupt data
        }
    } else {
        updateAuthUI(null);
    }
}

function updateAuthUI(user) {
    if (user) {
        // Logged In
        if (authButtons) authButtons.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';

        if (usernameDisplay) {
            // Display First Name
            usernameDisplay.textContent = user.fullName ? user.fullName.split(' ')[0] : 'User';
        }
    } else {
        // Guest
        if (authButtons) authButtons.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
    }
}

// Helper: Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}
