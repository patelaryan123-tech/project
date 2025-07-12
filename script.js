document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const loginError = document.getElementById('loginError');
  const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})
loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      loginError.textContent = data.msg || data.error || 'Login failed';
      return;
    }

    // Login success
    loginError.textContent = '';
    alert('Login successful!');

    // Save token to localStorage
    localStorage.setItem('token', data.token);

    // Redirect to profile page after successful login
    window.location.href = '/profile.html';  // Change path if your profile page is somewhere else

  } catch (err) {
    loginError.textContent = 'Something went wrong';
  }
});
