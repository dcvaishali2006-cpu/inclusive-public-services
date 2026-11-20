// ----- Get elements -----
const loginSection = document.getElementById('loginSection');
const panel = document.getElementById('panel');
const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('passwordInput');
const loginMessage = document.getElementById('loginMessage');
const serviceForm = document.getElementById('serviceForm');
const formTitle = document.getElementById('formTitle');
const formMessage = document.getElementById('formMessage');
const serviceRows = document.getElementById('serviceRows');
const reportList = document.getElementById('reportList');

let adminPassword = sessionStorage.getItem('adminPassword') || ''; // kept until tab closes
let servicesList = []; // all services (used when editing)
let editingId = '';    // empty means "adding a new service"

// Makes text safe before putting it inside HTML
function safe(text) {
  const box = document.createElement('div');
  box.textContent = text || '';
  return box.innerHTML;
}

// Headers sent with every admin request (includes the password)
function authHeaders() {
  return { 'Content-Type': 'application/json', 'x-admin-password': adminPassword };
}

// Checks the password with the server
async function login(event) {
  event.preventDefault();
  adminPassword = passwordInput.value;
  const response = await fetch('/api/admin/login', { method: 'POST', headers: authHeaders() });
  if (response.ok) {
    sessionStorage.setItem('adminPassword', adminPassword);
    showPanel();
  } else {
    loginMessage.textContent = 'Wrong password. Try again.';
  }
}

// Hides the login box and shows the admin tools
function showPanel() {
  loginSection.hidden = true;
  panel.hidden = false;
  loadServices();
  loadReports();
}

// Logs out by forgetting the password
function logout() {
  sessionStorage.removeItem('adminPassword');
  location.reload();
}

// Loads all services and shows them in the table
async function loadServices() {
  const response = await fetch('/api/services');
  servicesList = await response.json();
  serviceRows.innerHTML = servicesList.map(service => `<tr>
    <td>${safe(service.name)}</td>
    <td>${safe(service.city)}</td>
    <td>${new Date(service.lastVerified).toLocaleDateString('en-IN')}</td>
    <td>
      <button onclick="startEdit('${service._id}')">Edit</button>
      <button onclick="verifyService('${service._id}')">Mark verified</button>
      <button onclick="deleteService('${service._id}')">Delete</button>
    </td></tr>`).join('');
}

// Returns the values of all ticked checkboxes with this name
function getChecked(name) {
  const boxes = document.querySelectorAll('input[name="' + name + '"]:checked');
  return Array.from(boxes).map(box => box.value);
}

// Adds a new service or saves changes to an existing one
async function saveService(event) {
  event.preventDefault();
  const data = {
    name: document.getElementById('serviceName').value,
    category: document.getElementById('category').value,
    city: document.getElementById('city').value,
    address: document.getElementById('address').value,
    phone: document.getElementById('phone').value,
    description: document.getElementById('description').value,
    wheelchairAccessible: document.getElementById('wheelchair').checked,
    isFree: document.getElementById('isFree').checked,
    eligibility: getChecked('eligibility'),
    languages: getChecked('languages')
  };
  if (data.eligibility.length === 0) data.eligibility.push('Everyone'); // safe default

  const url = editingId ? '/api/services/' + editingId : '/api/services';
  const method = editingId ? 'PUT' : 'POST';
  const response = await fetch(url, { method: method, headers: authHeaders(), body: JSON.stringify(data) });

  if (response.ok) {
    clearForm();
    formMessage.textContent = 'Saved!';
    loadServices();
  } else {
    formMessage.textContent = 'Error: please check all required fields.';
  }
}

// Fills the form with an existing service so it can be edited
function startEdit(id) {
  const service = servicesList.find(item => item._id === id);
  editingId = id;
  formTitle.textContent = 'Edit service';
  document.getElementById('serviceName').value = service.name;
  document.getElementById('category').value = service.category;
  document.getElementById('city').value = service.city;
  document.getElementById('address').value = service.address || '';
  document.getElementById('phone').value = service.phone || '';
  document.getElementById('description').value = service.description || '';
  document.getElementById('wheelchair').checked = service.wheelchairAccessible;
  document.getElementById('isFree').checked = service.isFree;
  document.querySelectorAll('input[name="eligibility"]').forEach(box => {
    box.checked = service.eligibility.includes(box.value);
  });
  document.querySelectorAll('input[name="languages"]').forEach(box => {
    box.checked = service.languages.includes(box.value);
  });
  serviceForm.scrollIntoView();
  document.getElementById('serviceName').focus();
}

// Empties the form and goes back to "add" mode
function clearForm() {
  serviceForm.reset();
  editingId = '';
  formTitle.textContent = 'Add a new service';
  formMessage.textContent = '';
}

// Sets "last verified" of a service to today
async function verifyService(id) {
  await fetch('/api/services/' + id + '/verify', { method: 'PUT', headers: authHeaders() });
  loadServices();
}

// Deletes a service after asking "Are you sure?"
async function deleteService(id) {
  if (!confirm('Delete this service and its reports?')) return;
  await fetch('/api/services/' + id, { method: 'DELETE', headers: authHeaders() });
  loadServices();
  loadReports();
}

// Loads citizen reports and shows them
async function loadReports() {
  const response = await fetch('/api/reports', { headers: authHeaders() });
  const reports = await response.json();
  if (reports.length === 0) {
    reportList.innerHTML = '<p>No reports yet.</p>';
    return;
  }
  reportList.innerHTML = reports.map(report => `<article class="card">
    <h3>${safe(report.serviceId ? report.serviceId.name : 'Deleted service')}</h3>
    <p>${safe(report.message)}</p>
    <p>Status: <strong>${report.status}</strong></p>
    ${report.status === 'pending'
      ? `<button onclick="updateReport('${report._id}', 'approved')">Approve</button>
         <button onclick="updateReport('${report._id}', 'rejected')">Reject</button>` : ''}
  </article>`).join('');
}

// Approves or rejects a report
async function updateReport(id, status) {
  await fetch('/api/reports/' + id, {
    method: 'PUT', headers: authHeaders(), body: JSON.stringify({ status: status })
  });
  loadReports();
}

// ----- Connect buttons to functions -----
loginForm.addEventListener('submit', login);
serviceForm.addEventListener('submit', saveService);
document.getElementById('cancelEdit').addEventListener('click', clearForm);
document.getElementById('logoutBtn').addEventListener('click', logout);

// If the admin already logged in this tab, skip the login box
if (adminPassword) showPanel();
