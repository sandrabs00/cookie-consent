<script>
    console.log('Script loaded successfully');
    // Function to load scripts dynamically based on data attributes
    function loadScripts(googleId, metaId, zohoScriptURL) {
        // Load Google script
        if (googleId) {
            console.log('Google ok');
            const googleScript = document.createElement('script');
            googleScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`;
            document.head.appendChild(googleScript);

            const googleGtag = document.createElement('script');
            googleGtag.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleId}');`;
            document.head.appendChild(googleGtag);
        }

        // Load Meta script
        if (metaId) {
            console.log('meta ok')
            const metaScript = document.createElement('script');
            metaScript.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=${metaId}&autoLogAppEvents=1`;
            document.head.appendChild(metaScript);
        }

        // Load Zoho script (tracking link instead of simple ID)
        if (zohoScriptURL) {
            console.log('zoho ok')
            const zohoScript = document.createElement('script');
            zohoScript.src = zohoScriptURL;
            document.head.appendChild(zohoScript);
        }
    }

    // Function to handle consent update
    function updateConsent() {
        const cookieBanner = document.getElementById('cookie-consent-banner');

        const preferencesGranted = document.querySelector('.preferences-checkbox').checked;
        const statisticsGranted = document.querySelector('.statistics-checkbox').checked;
        const marketingGranted = document.querySelector('.marketing-checkbox').checked;

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
        const zohoScriptURL = cookieBanner.getAttribute('data-zoho-script'); // Notice that this is now treated as a script URL, not an ID

        if (marketingGranted) {
            loadScripts(googleId, metaId, zohoScriptURL);
        } else {
            alert('Please allow marketing cookies to view this content.');
        }

        // Hide the cookie banner
        cookieBanner.classList.add('hidden');
    }

    // Show the cookie consent banner if consent hasn't been given
    window.addEventListener('DOMContentLoaded', function () {
        if (!localStorage.getItem('preferences_storage')) {
            document.getElementById('cookie-consent-banner').classList.remove('hidden');
        }

        // Set event listeners for buttons after DOM is fully loaded
        document.querySelector('.accept-cookies').addEventListener('click', updateConsent);
        document.querySelector('.manage-cookies').addEventListener('click', function () {
            const cookieBanner = document.getElementById('cookie-consent-banner');
            cookieBanner.classList.toggle('hidden');
        });
    });
</script>
