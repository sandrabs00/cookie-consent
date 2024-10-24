console.log('Script loaded successfully');

// Function to load scripts dynamically based on data attributes
function loadScripts(googleId, metaId, zohoScriptURL, hotjarId, youtubeScriptURL, linkedinId, tiktokPixelId) {
    console.log(`Google ID: ${googleId}`);
    console.log(`Meta ID: ${metaId}`);
    console.log(`Zoho URL: ${zohoScriptURL}`);
    console.log(`Hotjar ID: ${hotjarId}`);
    console.log(`YouTube URL: ${youtubeScriptURL}`);
    console.log(`LinkedIn ID: ${linkedinId}`);
    console.log(`TikTok Pixel ID: ${tiktokPixelId}`);

    // Load Google script
    if (googleId) {
        console.log('Google script is being loaded');
        const googleScript = document.createElement('script');
        googleScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`;
        googleScript.onload = function () {
            console.log('Google script loaded successfully');
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', googleId);
            console.log('Google gtag configuration triggered');
        };
        googleScript.onerror = function () {
            console.error('Failed to load Google script');
        };
        document.head.appendChild(googleScript);
    }

    // Load Meta script only if fbq is not already loaded
    if (metaId && !window.fbq) {
        console.log('Meta script is being loaded');
        const metaScript = document.createElement('script');
        metaScript.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=${metaId}&autoLogAppEvents=1`;
        metaScript.onload = function () {
            console.log('Meta script loaded successfully');
            !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                    n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', metaId);  // Correct ID is dynamically loaded
            fbq('track', 'PageView');
            console.log('Meta Pixel initialized and PageView tracked');
        };
        metaScript.onerror = function () {
            console.error('Failed to load Meta script');
        };
        document.head.appendChild(metaScript);
    } else if (window.fbq) {
        console.log('Meta Pixel is already loaded, skipping duplicate load');
    }

    // Load Zoho script (tracking link instead of simple ID)
    if (zohoScriptURL) {
        console.log('Zoho script is being loaded');
        const zohoScript = document.createElement('script');
        zohoScript.src = zohoScriptURL;
        zohoScript.onload = function () {
            console.log('Zoho script loaded successfully');
            // Push page view event to the data layer for Zoho
            window.dataLayer.push({
                'event': 'pageview',
                'pagePath': window.location.pathname,
                'pageTitle': document.title,
            });
            console.log('Page view event pushed to data layer for Zoho');
        };
        zohoScript.onerror = function () {
            console.error('Failed to load Zoho script');
        };
        document.head.appendChild(zohoScript);
    }
}
     // Load Hotjar script
    if (hotjarId) {
        console.log('Hotjar script is being loaded');
        const hotjarScript = document.createElement('script');
        hotjarScript.src = `https://static.hotjar.com/c/hotjar-${hotjarId}.js?sv=6`;
        hotjarScript.onload = function () {
            console.log('Hotjar script loaded successfully');
            window.hj = window.hj || function () { (hj.q = hj.q || []).push(arguments) };
            hj('trigger', hotjarId);
        };
        hotjarScript.onerror = function () {
            console.error('Failed to load Hotjar script');
        };
        document.head.appendChild(hotjarScript);
    }

    // Load YouTube embed API (if needed)
    if (youtubeScriptURL) {
        console.log('YouTube script is being loaded');
        const youtubeScript = document.createElement('script');
        youtubeScript.src = youtubeScriptURL;
        youtubeScript.onload = function () {
            console.log('YouTube script loaded successfully');
        };
        youtubeScript.onerror = function () {
            console.error('Failed to load YouTube script');
        };
        document.head.appendChild(youtubeScript);
    }

    // Load LinkedIn Insight tag
    if (linkedinId) {
        console.log('LinkedIn script is being loaded');
        const linkedinScript = document.createElement('script');
        linkedinScript.type = 'text/javascript';
        linkedinScript.src = `https://snap.licdn.com/li.lms-analytics/insight.min.js`;
        linkedinScript.onload = function () {
            console.log('LinkedIn Insight Tag script loaded successfully');
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(linkedinId);
        };
        linkedinScript.onerror = function () {
            console.error('Failed to load LinkedIn Insight Tag');
        };
        document.head.appendChild(linkedinScript);
    }

    // Load TikTok Pixel
    if (tiktokPixelId) {
        console.log('TikTok Pixel script is being loaded');
        const tiktokScript = document.createElement('script');
        tiktokScript.src = `https://analytics.tiktok.com/i18n/pixel/events.js`;
        tiktokScript.onload = function () {
            console.log('TikTok Pixel script loaded successfully');
            window.ttq = window.ttq || [];
            window.ttq.push(['init', tiktokPixelId]);
            window.ttq.push(['track', 'PageView']);
            console.log('TikTok Pixel initialized and PageView tracked');
        };
        tiktokScript.onerror = function () {
            console.error('Failed to load TikTok Pixel');
        };
        document.head.appendChild(tiktokScript);
    }


// Function to push consent to GTM dataLayer
function pushConsentToDataLayer(preferencesGranted, statisticsGranted, marketingGranted) {
    window.dataLayer = window.dataLayer || [];
    
    // Push the consent status to GTM
    window.dataLayer.push({
        'event': 'cookie_consent_update',
        'preferences_storage': preferencesGranted ? 'granted' : 'denied',
        'analytics_storage': statisticsGranted ? 'granted' : 'denied',
        'ad_storage': marketingGranted ? 'granted' : 'denied'
    });
    
    console.log('Consent data pushed to GTM Data Layer');
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

    // Push consent status to GTM Data Layer
    pushConsentToDataLayer(preferencesGranted, statisticsGranted, marketingGranted);
  // Load tracking scripts conditionally based on Marketing consent
    if (marketingGranted) {
        const googleId = cookieBanner.getAttribute('data-google-id');
        const metaId = cookieBanner.getAttribute('data-meta-id');
        const zohoScriptURL = cookieBanner.getAttribute('data-zoho-script');
        const hotjarId = cookieBanner.getAttribute('data-hotjar-id');
        const youtubeScriptURL = cookieBanner.getAttribute('data-youtube-url');
        const linkedinId = cookieBanner.getAttribute('data-linkedin-id');
        const tiktokPixelId = cookieBanner.getAttribute('data-tiktok-id');
        loadScripts(googleId, metaId, zohoScriptURL, hotjarId, youtubeScriptURL, linkedinId, tiktokPixelId);
    } else {
        console.warn('Marketing cookies not granted, skipping script loading.');
    }

    // Hide the cookie banner
    cookieBanner.classList.add('hidden');
    console.log('Cookie banner hidden');
}

// Function to check for zpcookie_json and call the show method
function checkAndShowZpCookie() {
    if (typeof zpcookie_json !== 'undefined') {
        _zcBan.show(zpcookie_json);
    } else {
        console.warn('zpcookie_json is not ready, retrying...');
        setTimeout(checkAndShowZpCookie, 100); // Retry after 100ms
    }
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

    // Call the function to check and show the cookie banner
    checkAndShowZpCookie();
});
