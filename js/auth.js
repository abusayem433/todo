// Authentication functionality

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    checkAuth();

    // Form toggle
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        clearMessage();
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
        clearMessage();
    });

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });

    // Register form submission
    document.getElementById('registerFormElement').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            showMessage('Passwords do not match!', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long!', 'error');
            return;
        }

        try {
            // Sign up user
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (error) throw error;

            // Create profile
            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        { id: data.user.id, full_name: name }
                    ]);

                if (profileError) console.error('Profile creation error:', profileError);
            }

            showMessage('Registration successful! Please check your email to confirm your account.', 'success');
            
            // Auto login after registration (if email confirmation is disabled)
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });
});

async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        window.location.href = 'dashboard.html';
    }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('authMessage');
    messageDiv.textContent = message;
    messageDiv.className = `auth-message ${type}`;
}

function clearMessage() {
    const messageDiv = document.getElementById('authMessage');
    messageDiv.textContent = '';
    messageDiv.className = 'auth-message';
}

