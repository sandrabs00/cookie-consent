console.log('Script loaded successfully');

// Function to load scripts dynamically based on data attributes
function loadScripts(googleId, metaId, zohoScriptURL) {
       console.log(`Google ID: ${googleId}`);
    console.log(`Meta ID: ${metaId}`);
    // Load Google script
    if (googleId) {
        console.log('Google script is being loaded');
        const googleScript = document.createElement('script');
        googleScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`;
        googleScript.onerror = function() {
            console.error('Failed to load Google script');
        };
        document.head.appendChild(googleScript);

        const googleGtag = document.createElement('script');
        googleGtag.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleId}');
            console.log('Google gtag configuration triggered');`;
        document.head.appendChild(googleGtag);
    }

    // Load Meta script
    if (metaId) {
        console.log('Meta script is being loaded');
        const metaScript = document.createElement('script');
        metaScript.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=${metaId}&autoLogAppEvents=1`;
        metaScript.onerror = function() {
            console.error('Failed to load Meta script');
        };
        document.head.appendChild(metaScript);
        console.log('Meta script appended');
    }

    // Load Zoho script (tracking link instead of simple ID)
    if (zohoScriptURL) {
        console.log('Zoho script is being loaded');
        const zohoScript = document.createElement('script');
        zohoScript.src = zohoScriptURL;
        zohoScript.onerror = function() {
            console.error('Failed to load Zoho script');
        };
        document.head.appendChild(zohoScript);
        console.log('Zoho script appended');
    }
}

// Function to handle consent update
function updateConsent() {
    const cookieBanner = document.getElementById('cookie-banner');

    // Check if the cookie banner exists
    if (!cookieBanner) {
        console.error("Cookie banner element not found");
        return;
    }

    // Targeting each checkbox input inside its container
    const preferencesGranted = document.querySelector('.preferences-checkbox input')?.checked || false;
    const statisticsGranted = document.querySelector('.statistics-checkbox input')?.checked || false;
    const marketingGranted = document.querySelector('.marketing-checkbox input')?.checked || false;

    // Log consent choices
    console.log('Preferences Granted:', preferencesGranted);
    console.log('Statistics Granted:', statisticsGranted);
    console.log('Marketing Granted:', marketingGranted);

    // Store consent choices in localStorage
    localStorage.setItem('preferences_storage', preferencesGranted ? 'granted' : 'denied');
    localStorage.setItem('analytics_storage', statisticsGranted ? 'granted' : 'denied');
    localStorage.setItem('ad_storage', marketingGranted ? 'granted' : 'denied');

    // Load tracking scripts conditionally
    const googleId = cookieBanner.getAttribute('data-google-id');
    const metaId = cookieBanner.getAttribute('data-meta-id');
    const zohoScriptURL = cookieBanner.getAttribute('data-zoho-script');

    if (marketingGranted) {
        loadScripts(googleId, metaId, zohoScriptURL);
    } else {
        console.warn('Marketing cookies not granted, skipping script loading.');
    }

    // Hide the cookie banner
    cookieBanner.classList.add('hidden');
    console.log('Cookie banner hidden');
}

// Ensure DOM is loaded before running the script
window.addEventListener('DOMContentLoaded', function () {
    const cookieBanner = document.getElementById('cookie-banner'); 

    // Check if the cookie banner element exists and show it if needed
    if (!localStorage.getItem('preferences_storage') && cookieBanner) {
        cookieBanner.classList.remove('hidden');
        console.log('Cookie banner displayed');
    }

    // Set event listeners for buttons after DOM is fully loaded
    document.querySelector('.accept-cookies')?.addEventListener('click', updateConsent);
    document.querySelector('.manage-cookies')?.addEventListener('click', function () {
        const cookieBanner = document.getElementById('cookie-banner');
        if (cookieBanner) {
            cookieBanner.classList.toggle('hidden');
            console.log('Cookie banner toggled');
        }
    });

    // Disable and check each necessary checkbox inside its container
    const necessaryCheckbox = document.querySelector('.necessary-checkbox input');
    if (necessaryCheckbox) {
        necessaryCheckbox.checked = true;
        necessaryCheckbox.disabled = true;
        console.log('Necessary cookies checkbox is checked and disabled');
    }

    // Enable checkboxes for user choice
    const preferencesCheckbox = document.querySelector('.preferences-checkbox input');
    const statisticsCheckbox = document.querySelector('.statistics-checkbox input');
    const marketingCheckbox = document.querySelector('.marketing-checkbox input');

    if (preferencesCheckbox) preferencesCheckbox.disabled = false;
    if (statisticsCheckbox) statisticsCheckbox.disabled = false;
    if (marketingCheckbox) marketingCheckbox.disabled = false;
});
