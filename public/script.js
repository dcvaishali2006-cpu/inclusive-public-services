// ----- Get the HTML elements we need -----
const filterForm = document.getElementById('filterForm');
const searchInput = document.getElementById('searchInput');
const cityInput = document.getElementById('cityInput');
const eligibilitySelect = document.getElementById('eligibilitySelect');
const languageSelect = document.getElementById('languageSelect');
const wheelchairBox = document.getElementById('wheelchairBox');
const freeBox = document.getElementById('freeBox');
const resultCount = document.getElementById('resultCount');
const statusMessage = document.getElementById('statusMessage');
const results = document.getElementById('results');
const reportDialog = document.getElementById('reportDialog');
const reportForm = document.getElementById('reportForm');
const reportMessage = document.getElementById('reportMessage');
const reportServiceName = document.getElementById('reportServiceName');
const chipButtons = document.querySelectorAll('.chip'); // the category buttons

let shownServices = [];   // services currently on the screen
let reportServiceId = ''; // service the user is reporting
let chosenCategory = '';  // category picked with the chips ('' means all)
let fontSize = Number(localStorage.getItem('fontSize')) || 16; // text size in px

// A small picture for each category (used on the cards)
const categoryIcons = {
  'Hospital': '🏥',
  'Ration Shop': '🛒',
  'Government Office': '🏛️',
  'School': '🏫',
  'Helpline': '📞'
};

// Makes text safe before putting it inside HTML (stops HTML injection)
function safe(text) {
  const box = document.createElement('div');
  box.textContent = text || '';
  return box.innerHTML.replace(/"/g, '&quot;');
}

// Counts how many days ago a date was
function daysSince(dateText) {
  return Math.floor((Date.now() - new Date(dateText)) / (1000 * 60 * 60 * 24));
}

// Builds the query string like "search=hospital&free=true" from the form
function buildQueryString() {
  const params = new URLSearchParams();
  if (searchInput.value.trim()) params.append('search', searchInput.value.trim());
  if (chosenCategory) params.append('category', chosenCategory);
  if (cityInput.value.trim()) params.append('city', cityInput.value.trim());
  if (eligibilitySelect.value) params.append('eligibility', eligibilitySelect.value);
  if (languageSelect.value) params.append('language', languageSelect.value);
  if (wheelchairBox.checked) params.append('wheelchair', 'true');
  if (freeBox.checked) params.append('free', 'true');
  return params.toString();
}

// Asks the server for services that match the filters
async function loadServices() {
  try {
    statusMessage.textContent = t('loading');
    const response = await fetch('/api/services?' + buildQueryString());
    shownServices = await response.json();
    statusMessage.textContent = '';
    showServices(shownServices);
  } catch (error) {
    statusMessage.textContent = t('loadError');
  }
}

// Shows the list of services on the page
function showServices(services) {
  resultCount.textContent = services.length + ' ' + t('found');
  if (services.length === 0) {
    results.innerHTML = '<p>' + t('noMatch') + '</p>';
    return;
  }
  results.innerHTML = services.map(makeCard).join('');
}

// Creates the HTML of one service card
function makeCard(service) {
  const icon = categoryIcons[service.category] || '🏢';
  const wheelchairText = service.wheelchairAccessible ? t('wheelchairYes') : t('wheelchairNo');
  const costText = service.isFree ? t('freeYes') : t('freeNo');
  const eligibility = service.eligibility.map(item => '<span class="badge">' + safe(tv(item)) + '</span>').join('');
  const languages = service.languages.map(item => '<span class="badge">' + safe(tv(item)) + '</span>').join('');
  const phone = service.phone ? '<a href="tel:' + safe(service.phone) + '">' + safe(service.phone) + '</a>' : t('notAvailable');
  const oldWarning = daysSince(service.lastVerified) > 180
    ? '<p class="warning">' + t('oldWarning') + '</p>' : '';

  return `<article class="card">
    <div class="card-top">
      <div class="card-icon" aria-hidden="true">${icon}</div>
      <div>
        <h2>${safe(service.name)}</h2>
        <p class="meta">${currentLang === 'hi' ? safe(service.city) + ' ' + t('inCity') + ' ' + safe(tv(service.category)) : safe(service.category) + ' ' + t('inCity') + ' ' + safe(service.city)}</p>
      </div>
    </div>
    <p>${safe(service.description)}</p>
    <ul class="facts">
      <li class="${service.wheelchairAccessible ? 'yes' : 'no'}">${wheelchairText}</li>
      <li class="${service.isFree ? 'yes' : 'no'}">${costText}</li>
    </ul>
    <p><strong>${t('whoCanUse')}</strong> ${eligibility}</p>
    <p><strong>${t('languages')}</strong> ${languages}</p>
    <p><strong>${t('address')}</strong> ${safe(service.address)}<br><strong>${t('phone')}</strong> ${phone}</p>
    <p class="verified">${t('lastVerified')} ${new Date(service.lastVerified).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-IN')}</p>
    ${oldWarning}
    <button type="button" onclick="openReport('${service._id}')">${t('reportTitle')}</button>
  </article>`;
}

// Runs when a category button is clicked: remembers it and reloads the list
function pickCategory(categoryName) {
  chosenCategory = categoryName;
  // Mark only the clicked button as "pressed"
  chipButtons.forEach(chip => {
    chip.setAttribute('aria-pressed', chip.dataset.category === categoryName);
  });
  loadServices();
}

// Opens the pop-up form for the chosen service
function openReport(serviceId) {
  const service = shownServices.find(item => item._id === serviceId);
  reportServiceId = serviceId;
  reportServiceName.textContent = t('serviceLabel') + ' ' + service.name;
  reportDialog.showModal();
}

// Sends the report to the server
async function sendReport(event) {
  event.preventDefault();
  const response = await fetch('/api/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ serviceId: reportServiceId, message: reportMessage.value })
  });
  reportDialog.close();
  reportForm.reset();
  statusMessage.textContent = response.ok
    ? t('reportThanks') : t('reportFail');
}

// Makes the text bigger (+2) or smaller (-2) and remembers the choice
function changeFontSize(step) {
  fontSize = Math.min(28, Math.max(12, fontSize + step));
  document.documentElement.style.fontSize = fontSize + 'px';
  localStorage.setItem('fontSize', fontSize);
}

// Turns high contrast mode on or off
function toggleContrast() {
  const isOn = document.body.classList.toggle('high-contrast');
  document.getElementById('contrastBtn').setAttribute('aria-pressed', isOn);
  localStorage.setItem('contrast', isOn);
}

// Clears all filters and shows everything again
function clearFilters() {
  filterForm.reset();
  pickCategory(''); // also resets the category buttons and reloads the list
}

// ----- Connect buttons to functions -----
filterForm.addEventListener('submit', event => { event.preventDefault(); loadServices(); });
filterForm.addEventListener('change', loadServices); // refresh when a filter changes
chipButtons.forEach(chip => {
  chip.addEventListener('click', () => pickCategory(chip.dataset.category));
});
document.getElementById('clearBtn').addEventListener('click', clearFilters);
document.getElementById('biggerText').addEventListener('click', () => changeFontSize(2));
document.getElementById('smallerText').addEventListener('click', () => changeFontSize(-2));
document.getElementById('contrastBtn').addEventListener('click', toggleContrast);
document.getElementById('cancelReport').addEventListener('click', () => reportDialog.close());
reportForm.addEventListener('submit', sendReport);

// Redraw the cards when the visitor switches language
document.addEventListener('languagechange', () => {
  if (resultCount.textContent) showServices(shownServices); // only after the first load
});

// ----- Run when the page opens -----
changeFontSize(0); // apply the saved text size
if (localStorage.getItem('contrast') === 'true') toggleContrast();
loadServices();
