        function updateDebugSwatches() {
            const computed = getComputedStyle(document.documentElement);
            const bg = computed.getPropertyValue('--bg-color').trim();
            const primary = computed.getPropertyValue('--primary-color').trim();
            const card = computed.getPropertyValue('--card-bg').trim();
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'vampire';

            document.getElementById('swatchBg').style.backgroundColor = bg;
            document.getElementById('swatchPrimary').style.backgroundColor = primary;
            document.getElementById('swatchCard').style.backgroundColor = card;

            // Adjust text contrast inside swatch labels based on active mode
            document.getElementById('swatchBg').style.color = currentTheme === 'light' ? '#000' : '#fff';
            document.getElementById('swatchPrimary').style.color = '#fff';
            document.getElementById('swatchCard').style.color = currentTheme === 'light' ? '#000' : '#fff';

            // Update active badge and button states
            const activeLabel = document.getElementById('activeModeLabel');
            const btnVampire = document.getElementById('btnVampire');
            const btnLight = document.getElementById('btnLight');

            if (currentTheme === 'light') {
                activeLabel.innerText = 'Light';
                activeLabel.style.color = '#0f766e';
                btnLight.classList.add('active');
                btnVampire.classList.remove('active');
            } else {
                activeLabel.innerText = 'Dark';
                activeLabel.style.color = '#f43f5e';
                btnVampire.classList.add('active');
                btnLight.classList.remove('active');
            }
        }

        function setForceTheme(mode) {
            if (mode === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            updateDebugSwatches();
        }

        // Initialize swatches on page load
        updateDebugSwatches();