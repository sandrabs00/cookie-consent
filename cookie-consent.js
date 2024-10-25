console.log('Script loaded successfully');

// Function to load scripts dynamically based on data attributes
function loadScripts(googleId, metaId, zohoScriptURL, hotjarId, youtubeId, linkedinId, tiktokPixelId) {
    console.log('Loading scripts...');
    console.log(`Google ID: ${googleId}, Meta ID: ${metaId}, Zoho URL: ${zohoScriptURL}, Hotjar ID: ${hotjarId}, YouTube ID: ${youtubeId}, LinkedIn ID: ${linkedinId}, TikTok Pixel ID: ${tiktokPixelId}`);

    // Load scripts conditionally based on consent
    // Ensure only marketing-related scripts are loaded upon consent

    if (googleId) {
        console.log('Loading Google script');
        const googleScript = document.createElement('script');
        googleScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`;
        googleScript.onload = () => console.log('Google script loaded');
        googleScript.onerror = () => console.error('Failed to load Google script');
        document.head.appendChild(googleScript);
    }

    if (metaId) {
        console.log('Loading Meta script');
        const metaScript = document.createElement('script');
        metaScript.src = `https://connect.facebook.net/en_US/fbevents.js#${metaId}`;
        metaScript.onload = () => console.log('Meta script loaded');
        metaScript.onerror = () => console.error('Failed to load Meta script');
        document.head.appendChild(metaScript);
    }

    if (zohoScriptURL) {
        console.log('Loading Zoho script');
        const zohoScript = document.createElement('script');
        zohoScript.src = zohoScriptURL;
        zohoScript.onload = () => console.log('Zoho script loaded');
        zohoScript.onerror = () => console.error('Failed to load Zoho script');
        document.head.appendChild(zohoScript);
    }

    // Only load marketing-related scripts like Hotjar, YouTube, LinkedIn, and TikTok if marketing consent is granted
    const marketingConsent = localStorage.getItem('ad_storage') === 'granted';

    if (marketingConsent) {
        if (hotjarId) {
            console.log('Loading Hotjar script');
            const hotjarScript = document.createElement('script');
            hotjarScript.src = `https://static.hotjar.com/c/hotjar-${hotjarId}.js?sv=6`;
            hotjarScript.onload = () => console.log('Hotjar script loaded');
            hotjarScript.onerror = () => console.error('Failed to load Hotjar script');
            document.head.appendChild(hotjarScript);
        }

        if (youtubeId) {
            console.log('Loading YouTube script');
            const youtubeScript = document.createElement('script');
            youtubeScript.src = `https://www.youtube.com/iframe_api`;
            youtubeScript.onload = () => console.log('YouTube script loaded');
            youtubeScript.onerror = () => console.error('Failed to load YouTube script');
            document.head.appendChild(youtubeScript);
        }

        if (linkedinId) {
            console.log('Loading LinkedIn script');
            const linkedinScript = document.createElement('script');
            linkedinScript.src = `https://snap.licdn.com/li.lms-analytics/insight.min.js`;
            linkedinScript.onload = () => console.log('LinkedIn script loaded');
            linkedinScript.onerror = () => console.error('Failed to load LinkedIn script');
            document.head.appendChild(linkedinScript);
        }

        if (tiktokPixelId) {
            console.log('Loading TikTok Pixel script');
            const tiktokScript = document.createElement('script');
            tiktokScript.src = `https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=${tiktokPixelId}`;
            tiktokScript.onload = () => console.log('TikTok Pixel script loaded');
            tiktokScript.onerror = () => console.error('Failed to load TikTok Pixel script');
            document.head.appendChild(tiktokScript);
        }
    } else {
        console.warn('Marketing consent not granted. Skipping marketing scripts.');
    }
}

// Push consent to GTM dataLayer
function pushConsentToDataLayer(preferencesGranted, statisticsGranted, marketingGranted) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'cookie_consent_update',
        'preferences_storage': preferencesGranted ? 'granted' : 'denied',
        'analytics_storage': statisticsGranted ? 'granted' : 'denied',
        'ad_storage': marketingGranted ? 'granted' : 'denied'
    });
    console.log('Consent data pushed to GTM Data Layer');
}

// Handle consent update
function updateConsent() {
    console.log('Updating consent...');

    const cookieBanner = document.getElementById('cookie-banner');
    if (!cookieBanner) {
        console.error('Cookie banner element not found');
        return;
    }

    const preferencesGranted = document.querySelector('.preferences-checkbox input')?.checked || false;
    const statisticsGranted = document.querySelector('.statistics-checkbox input')?.checked || false;
    const marketingGranted = document.querySelector('.marketing-checkbox input')?.checked || false;

    console.log('Preferences:', preferencesGranted, 'Statistics:', statisticsGranted, 'Marketing:', marketingGranted);

    localStorage.setItem('preferences_storage', preferencesGranted ? 'granted' : 'denied');
    localStorage.setItem('analytics_storage', statisticsGranted ? 'granted' : 'denied');
    localStorage.setItem('ad_storage', marketingGranted ? 'granted' : 'denied');

    pushConsentToDataLayer(preferencesGranted, statisticsGranted, marketingGranted);

    // Load scripts based on consent
    const googleId = cookieBanner.getAttribute('data-google-id');
    const metaId = cookieBanner.getAttribute('data-meta-id');
    const zohoScriptURL = cookieBanner.getAttribute('data-zoho-script');
    const hotjarId = cookieBanner.getAttribute('data-hotjar-id');
    const youtubeId = cookieBanner.getAttribute('data-youtube-id');
    const linkedinId = cookieBanner.getAttribute('data-linkedin-id');
    const tiktokPixelId = cookieBanner.getAttribute('data-tiktok-id');

    loadScripts(googleId, metaId, zohoScriptURL, hotjarId, youtubeId, linkedinId, tiktokPixelId);

    cookieBanner.classList.add('hidden');  // Hide banner after consent is updated
    console.log('Cookie banner hidden');
}

// Necessary checkbox should be disabled
document.addEventListener('DOMContentLoaded', function () {
    const necessaryCheckbox = document.querySelector('.necessary-checkbox input');
    if (necessaryCheckbox) {
        necessaryCheckbox.checked = true;
        necessaryCheckbox.disabled = true;  // Ensure the checkbox is both checked and disabled
        console.log('Necessary checkbox is checked and disabled');
    } else {
        console.error('Necessary checkbox not found');
    }
});

// Event listener for consent acceptance (Using class 'accept-cookies')
document.querySelector('.accept-cookies').addEventListener('click', updateConsent);
