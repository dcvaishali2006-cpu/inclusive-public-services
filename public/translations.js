// ===== LANGUAGE SUPPORT (English + Hindi) =====
// All visible text lives here. To add another language, copy one block,
// change the code (for example "kn") and translate the right-hand side.
// Service names and descriptions typed by the admin are NOT translated.

const translations = {
  en: {
    switchTo: 'हिन्दी',
    'title.login': 'Welcome - Inclusive Public Services Directory',
    'title.index': 'Inclusive Public Services Directory',
    brand: 'Inclusive Public Services',
    skip: 'Skip to results',
    smallerText: 'Decrease text size',
    biggerText: 'Increase text size',
    contrast: 'High contrast',
    login: 'Login',
    displaySettings: 'Display settings',
    heroTitle: 'Find public services that work for you',
    heroLead: 'Search hospitals, ration shops, offices, schools and helplines. See who can use each one, what is free, and whether it is wheelchair accessible.',
    searchLabel: 'Search services',
    searchPlaceholder: 'Try: hospital, pension, helpline',
    searchBtn: 'Search',
    chooseCategory: 'Choose a category',
    moreFilters: 'More filters',
    cityLabel: 'City / area',
    cityPlaceholder: 'e.g. Mysuru',
    eligibilityLabel: 'Who can use it',
    anyone: 'Anyone',
    languageLabel: 'Language',
    anyLanguage: 'Any language',
    onlyShow: 'Only show',
    wheelchairOnly: 'Wheelchair accessible',
    freeOnly: 'Free services',
    clearFilters: 'Clear all filters',
    searchAndFilter: 'Search and filter services',
    searchResults: 'Search results',
    reportTitle: 'Report incorrect info',
    reportQuestion: 'What is wrong?',
    sendReport: 'Send report',
    cancel: 'Cancel',
    loading: 'Loading...',
    loadError: 'Could not load services. Is the server running?',
    found: 'service(s) found',
    noMatch: 'No services match. Try removing some filters.',
    wheelchairYes: '✔ Wheelchair accessible',
    wheelchairNo: '✖ Not wheelchair accessible',
    freeYes: '✔ Free service',
    freeNo: '✖ Not free (paid or subsidised)',
    whoCanUse: 'Who can use it:',
    languages: 'Languages:',
    address: 'Address:',
    phone: 'Phone:',
    notAvailable: 'Not available',
    lastVerified: 'Last verified:',
    oldWarning: '⚠ Not verified for over 6 months. Please call before visiting.',
    inCity: 'in',
    serviceLabel: 'Service:',
    reportThanks: 'Thank you! Your report was sent to the admin.',
    reportFail: 'Sorry, the report could not be sent.',
    // login page
    welcome: 'Welcome',
    welcomeLead: 'Find public services near you, or log in as admin to add and update services.',
    findService: 'I want to find a service',
    findServiceText: 'No password needed. Search hospitals, ration shops, offices, schools and helplines.',
    continueVisitor: 'Continue as visitor',
    adminLogin: 'Admin login',
    password: 'Password',
    loginAdmin: 'Login as admin',
    wrongPassword: 'Wrong password. Try again.',
    serverError: 'Could not reach the server. Is it running?',
    // values stored in the database (shown translated, saved in English)
    'v.All': 'All',
    'v.Hospital': 'Hospital',
    'v.Ration Shop': 'Ration Shop',
    'v.Government Office': 'Government Office',
    'v.School': 'School',
    'v.Helpline': 'Helpline',
    'v.Everyone': 'Everyone',
    'v.Senior Citizen': 'Senior Citizen',
    'v.Disability': 'Disability',
    'v.Women': 'Women',
    'v.BPL': 'BPL',
    'v.English': 'English',
    'v.Hindi': 'Hindi',
    'v.Kannada': 'Kannada'
  },

  hi: {
    switchTo: 'English',
    'title.login': 'स्वागत है - समावेशी सार्वजनिक सेवा निर्देशिका',
    'title.index': 'समावेशी सार्वजनिक सेवा निर्देशिका',
    brand: 'समावेशी सार्वजनिक सेवाएँ',
    skip: 'परिणामों पर जाएँ',
    smallerText: 'टेक्स्ट छोटा करें',
    biggerText: 'टेक्स्ट बड़ा करें',
    contrast: 'उच्च कंट्रास्ट',
    login: 'लॉगिन',
    displaySettings: 'डिस्प्ले सेटिंग',
    heroTitle: 'अपने लिए उपयोगी सार्वजनिक सेवाएँ खोजें',
    heroLead: 'अस्पताल, राशन की दुकानें, कार्यालय, स्कूल और हेल्पलाइन खोजें। देखें कि हर सेवा का उपयोग कौन कर सकता है, क्या निःशुल्क है और क्या व्हीलचेयर-सुलभ है।',
    searchLabel: 'सेवाएँ खोजें',
    searchPlaceholder: 'जैसे: hospital, pension, helpline',
    searchBtn: 'खोजें',
    chooseCategory: 'श्रेणी चुनें',
    moreFilters: 'और फ़िल्टर',
    cityLabel: 'शहर / क्षेत्र',
    cityPlaceholder: 'जैसे: Mysuru',
    eligibilityLabel: 'इसका उपयोग कौन कर सकता है',
    anyone: 'कोई भी',
    languageLabel: 'भाषा',
    anyLanguage: 'कोई भी भाषा',
    onlyShow: 'केवल दिखाएँ',
    wheelchairOnly: 'व्हीलचेयर-सुलभ',
    freeOnly: 'निःशुल्क सेवाएँ',
    clearFilters: 'सभी फ़िल्टर हटाएँ',
    searchAndFilter: 'सेवाएँ खोजें और फ़िल्टर करें',
    searchResults: 'खोज परिणाम',
    reportTitle: 'ग़लत जानकारी की रिपोर्ट करें',
    reportQuestion: 'क्या ग़लत है?',
    sendReport: 'रिपोर्ट भेजें',
    cancel: 'रद्द करें',
    loading: 'लोड हो रहा है...',
    loadError: 'सेवाएँ लोड नहीं हो सकीं। क्या सर्वर चल रहा है?',
    found: 'सेवा(एँ) मिलीं',
    noMatch: 'कोई सेवा नहीं मिली। कुछ फ़िल्टर हटाकर देखें।',
    wheelchairYes: '✔ व्हीलचेयर-सुलभ',
    wheelchairNo: '✖ व्हीलचेयर-सुलभ नहीं',
    freeYes: '✔ निःशुल्क सेवा',
    freeNo: '✖ निःशुल्क नहीं (सशुल्क या रियायती)',
    whoCanUse: 'कौन उपयोग कर सकता है:',
    languages: 'भाषाएँ:',
    address: 'पता:',
    phone: 'फ़ोन:',
    notAvailable: 'उपलब्ध नहीं',
    lastVerified: 'अंतिम सत्यापन:',
    oldWarning: '⚠ 6 महीने से अधिक समय से सत्यापित नहीं। कृपया जाने से पहले फ़ोन करें।',
    inCity: 'में',
    serviceLabel: 'सेवा:',
    reportThanks: 'धन्यवाद! आपकी रिपोर्ट एडमिन को भेज दी गई है।',
    reportFail: 'क्षमा करें, रिपोर्ट नहीं भेजी जा सकी।',
    welcome: 'स्वागत है',
    welcomeLead: 'अपने पास की सार्वजनिक सेवाएँ खोजें, या सेवाएँ जोड़ने और अपडेट करने के लिए एडमिन के रूप में लॉगिन करें।',
    findService: 'मुझे सेवा खोजनी है',
    findServiceText: 'पासवर्ड की ज़रूरत नहीं। अस्पताल, राशन की दुकानें, कार्यालय, स्कूल और हेल्पलाइन खोजें।',
    continueVisitor: 'आगंतुक के रूप में जारी रखें',
    adminLogin: 'एडमिन लॉगिन',
    password: 'पासवर्ड',
    loginAdmin: 'एडमिन के रूप में लॉगिन करें',
    wrongPassword: 'ग़लत पासवर्ड। फिर कोशिश करें।',
    serverError: 'सर्वर से संपर्क नहीं हो सका। क्या वह चल रहा है?',
    'v.All': 'सभी',
    'v.Hospital': 'अस्पताल',
    'v.Ration Shop': 'राशन की दुकान',
    'v.Government Office': 'सरकारी कार्यालय',
    'v.School': 'स्कूल',
    'v.Helpline': 'हेल्पलाइन',
    'v.Everyone': 'सभी',
    'v.Senior Citizen': 'वरिष्ठ नागरिक',
    'v.Disability': 'दिव्यांगता',
    'v.Women': 'महिलाएँ',
    'v.BPL': 'बीपीएल (गरीबी रेखा से नीचे)',
    'v.English': 'अंग्रेज़ी',
    'v.Hindi': 'हिन्दी',
    'v.Kannada': 'कन्नड़'
  }
};

// The chosen language is remembered, like the text size
let currentLang = 'en';
try { currentLang = localStorage.getItem('lang') === 'hi' ? 'hi' : 'en'; } catch (e) {}

// t('key') returns the text in the current language (English if missing)
function t(key) {
  return translations[currentLang][key] || translations.en[key] || key;
}

// tv('Hospital') translates a value that comes from the database
function tv(value) {
  return translations[currentLang]['v.' + value] || value;
}

// Replaces the text of every element that has a data-i18n attribute
function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  if (document.body.dataset.title) document.title = t('title.' + document.body.dataset.title);
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.lang = currentLang === 'en' ? 'hi' : 'en';
  // Tells script.js to redraw the cards in the new language
  document.dispatchEvent(new Event('languagechange'));
}

function switchLanguage() {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  try { localStorage.setItem('lang', currentLang); } catch (e) {}
  applyLanguage();
}

document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.addEventListener('click', switchLanguage);
  applyLanguage();
});
