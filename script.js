document.addEventListener('DOMContentLoaded', () => {

    // --- ERA DATA ---
    const eras = {
        'ebay': {
            title: 'eBAY HISTORY',
            loadingMessages: [
                'Calibrating auction prices...',
                'Compiling user reviews...',
                'Bypassing Y2K bugs...',
                'Discovering new products...',
                'Finalizing protocols...'
            ],
            disclaimer: 'Due to the unpredictable nature of online bidding, our inventory is subject to the whims of the highest bidder. Caveat Emptor.',
            timelineImage: 'url("ebay-timeline.png")',
            products: [
                { name: 'Hammer', image: 'hammer.png', link: 'https://www.ebay.com/str/yourstore/ebay-era' },
                { name: 'Shopping Cart', image: 'cart.png', link: 'https://www.ebay.com/str/yourstore/ebay-era' },
                { name: 'Lightsaber', image: 'lightsaber.png', link: 'https://www.ebay.com/str/yourstore/ebay-era' }
            ],
            music: 'audio/ebay-music.mp3',
            themeClass: 'theme-ebay'
        },
        'genesis': {
            title: 'GENESIS ERA',
            loadingMessages: [
                'Primordial ooze initializing...',
                'Synapses establishing...',
                'Single-celled life forming...',
                'Evolving for new transactions...'
            ],
            disclaimer: 'Warning: All life is currently single-celled and lacks complex thought. Transactions are highly volatile.',
            timelineImage: 'url("genesis-timeline.png")',
            products: [
                { name: 'Amoeba', image: 'amoeba.png', link: 'https://www.ebay.com/str/yourstore/genesis-era' },
                { name: 'Proto-tool', image: 'tool.png', link: 'https://www.ebay.com/str/yourstore/genesis-era' },
                { name: 'Damp Rock', image: 'rock.png', link: 'https://www.ebay.com/str/yourstore/genesis-era' }
            ],
            music: 'audio/genesis-music.mp3',
            themeClass: 'theme-genesis'
        },
        'neolithic': {
            title: 'NEOLITHIC ERA',
            loadingMessages: [
                'Planting seeds...',
                'Domesticating animals...',
                'Building permanent shelters...',
                'Inventing the wheel...'
            ],
            disclaimer: 'All sales are final. Disputes will be settled in a trial by combat or bartering with shiny rocks.',
            timelineImage: 'url("neolithic-timeline.png")',
            products: [
                { name: 'Stone Axe', image: 'axe.png', link: 'https://www.ebay.com/str/yourstore/neolithic-era' },
                { name: 'Clay Pot', image: 'pot.png', link: 'https://www.ebay.com/str/yourstore/neolithic-era' },
                { name: 'Sharpened Stick', image: 'stick.png', link: 'https://www.ebay.com/str/yourstore/neolithic-era' }
            ],
            music: 'audio/neolithic-music.mp3',
            themeClass: 'theme-neolithic'
        },
        'roman': {
            title: 'THE ROMAN EMPIRE',
            loadingMessages: [
                'Building aqueducts...',
                'Standardizing roads...',
                'Expanding the legions...',
                'Consulting the Senate...'
            ],
            disclaimer: 'The Emperor\'s inventory is vast and subject to the whims of the Senate. All transactions are recorded for taxation. Caveat Emptor.',
            timelineImage: 'url("roman-timeline.png")',
            products: [
                { name: 'Chariot', image: 'chariot.png', link: 'https://www.ebay.com/str/yourstore/roman-empire' },
                { name: 'Toga', image: 'toga.png', link: 'https://www.ebay.com/str/yourstore/roman-empire' },
                { name: 'Scroll', image: 'scroll.png', link: 'https://www.ebay.com/str/yourstore/roman-empire' }
            ],
            music: 'audio/roman-music.mp3',
            themeClass: 'theme-roman'
        }
    };

    // --- DOM ELEMENTS ---
    const mainContainer = document.querySelector('.main-container');
    const eraTitle = document.getElementById('era-title');
    const timelineImage = document.getElementById('timeline-image');
    const loadingTextElement = document.querySelector('.loading-text');
    const productDisclaimer = document.querySelector('.product-disclaimer');
    const productLinksContainer = document.getElementById('product-links');
    const eraMusic = document.getElementById('era-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const eraSearchInput = document.getElementById('era-search');

    // --- STATE VARIABLES ---
    let currentEraIndex = 0;
    let loadingTextInterval;
    let isPlaying = false;
    let animationPaused = false;

    // --- CORE LOGIC ---
    function updateEra(eraName) {
        const era = eras[eraName];
        if (!era) return;

        // Clear previous state and animations
        clearInterval(loadingTextInterval);
        mainContainer.className = 'main-container';

        // Update content
        eraTitle.textContent = era.title;
        loadingTextElement.textContent = era.loadingMessages[0];
        productDisclaimer.textContent = era.disclaimer;
        timelineImage.style.backgroundImage = era.timelineImage;

        // Add theme class
        mainContainer.classList.add(era.themeClass);

        // Update product links
        productLinksContainer.innerHTML = '';
        era.products.forEach(product => {
            const link = document.createElement('a');
            link.href = product.link;
            link.target = '_blank';
            link.onclick = (e) => {
                e.preventDefault();
                pauseAnimation();
                window.open(product.link, '_blank');
            };
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            link.appendChild(img);
            productLinksContainer.appendChild(link);
        });

        // Update music
        eraMusic.src = era.music;
        if (isPlaying) {
            eraMusic.play();
        }

        // Start loading text animation
        let messageIndex = 0;
        loadingTextInterval = setInterval(() => {
            messageIndex = (messageIndex + 1) % era.loadingMessages.length;
            loadingTextElement.textContent = era.loadingMessages[messageIndex];
        }, 2000);
    }

    function transitionToNextEra() {
        const eraNames = Object.keys(eras);
        currentEraIndex = (currentEraIndex + 1) % eraNames.length;
        updateEra(eraNames[currentEraIndex]);
    }

    function pauseAnimation() {
        document.querySelector('.loading-bar').style.animationPlayState = 'paused';
        clearInterval(loadingTextInterval);
        eraMusic.pause();
        animationPaused = true;
        
        // Resume after a delay
        setTimeout(() => {
            document.querySelector('.loading-bar').style.animationPlayState = 'running';
            let messageIndex = eras[Object.keys(eras)[currentEraIndex]].loadingMessages.indexOf(loadingTextElement.textContent);
            loadingTextInterval = setInterval(() => {
                messageIndex = (messageIndex + 1) % eras[Object.keys(eras)[currentEraIndex]].loadingMessages.length;
                loadingTextElement.textContent = eras[Object.keys(eras)[currentEraIndex]].loadingMessages[messageIndex];
            }, 2000);
            if (isPlaying) {
                eraMusic.play();
            }
            animationPaused = false;
        }, 5000);
    }

    // --- EVENT LISTENERS ---
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            eraMusic.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            eraMusic.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    volumeSlider.addEventListener('input', () => {
        eraMusic.volume = volumeSlider.value;
    });

    eraSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value.toLowerCase().trim();
            const eraNames = Object.keys(eras);
            const foundEra = eraNames.find(name => name.toLowerCase().includes(searchTerm));
            if (foundEra) {
                window.open(eras[foundEra].products[0].link, '_blank');
            }
        }
    });

    // --- INITIALIZATION ---
    updateEra('ebay'); // Start with the eBay era
    setInterval(transitionToNextEra, 60000); // Transition to a new era every 60 seconds
});
