<script>
    // Function to load scripts dynamically based on data attributes
    function loadScripts(googleId, metaId, zohoId) {
        // Load Google script
        if (googleId) {
            const googleScript = document.createElement('script');
            googleScript.src = https://www.googletagmanager.com/gtag/js?id=${googleId};
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
            const metaScript = document.createElement('script');
            metaScript.src = https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=${metaId}&autoLogAppEvents=1;
            document.head.appendChild(metaScript);
        }

        // Load Zoho script
        if (zohoId) {
            const zohoScript = document.createElement('script');
            zohoScript.src = https://js.zohostatic.com/zoho.js?${zohoId};
            document.head.appendChild(zohoScript);
        }
    }

    // Function to handle consent update
    function updateConsent() {
        const cookieBanner = document.getElementById('cookie-consent');

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
        const zohoId = cookieBanner.getAttribute('data-zoho-id');

        if (marketingGranted) {
            loadScripts(googleId, metaId, zohoId);
        } else {
            alert('Please allow marketing cookies to view this content.');
        }

        // Hide the cookie banner
        cookieBanner.classList.add('hidden');
    }

    // Show the cookie consent banner if consent hasn't been given
    if (!localStorage.getItem('preferences_storage')) {
        document.getElementById('cookie-consent').classList.remove('hidden');
    }

    // Set event listeners for buttons
    document.querySelector('.accept-cookies').addEventListener('click', updateConsent);
    document.querySelector('.manage-cookies').addEventListener('click', function () {
        const cookieBanner = document.getElementById('cookie-consent');
        cookieBanner.classList.toggle('hidden');
    });
</script>