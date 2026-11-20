// ----- Get the HTML elements we need -----
const adminForm = document.getElementById('adminForm');
const passwordInput = document.getElementById('passwordInput');
const loginMessage = document.getElementById('loginMessage');

// Shows an error message under the password box
function showError(text) {
  loginMessage.textContent = text;
  loginMessage.hidden = false;
}

// Checks the password with the server. If it is right, go to the admin page.
async function adminLogin(event) {
  event.preventDefault(); // stop the page from reloading
  const password = passwordInput.value;

  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'x-admin-password': password }
    });

    if (response.ok) {
      // admin.js reads this saved password, so the admin page opens without asking again
      sessionStorage.setItem('adminPassword', password);
      location.href = 'admin.html';
    } else {
      showError(t('wrongPassword'));
    }
  } catch (error) {
    showError(t('serverError'));
  }
}

// ----- Connect the form to the function -----
adminForm.addEventListener('submit', adminLogin);
