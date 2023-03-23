// menu dropdown
(function() {
    const menuBtn = document.querySelector('.header-supermenu__btn');
    const menuWrapper = document.querySelector('.header-supermenu');
    menuBtn.addEventListener('click', () => {
        if (menuWrapper) {
            menuWrapper.classList.toggle('active');
        }
    });
})();

// product description accordeon
(function() {
    const buttons = document.querySelectorAll('.product-info__subtitle');
    for (const btn of buttons) {
        btn.addEventListener('click', () => {
            btn.classList.toggle('off');
        });
    }
})();

// product slider
(function() {
    new Slider({
        slider: '.product-gallery',
        thumbs: '.product-thumbs'
    });
})();

// product tabs
(function() {
    const tabsBtn = document.querySelectorAll('.tabs-nav__button');
    for (const btn of tabsBtn) {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) {
                return false;
            }
            const activeBtn = document.querySelector('.tabs-nav__button.active');
            const activeTab = document.querySelector('.tabs-content__item.active')
            const targetTab = document.querySelector(btn.getAttribute('data-anchor'));
            if (!targetTab) {
                return false;
            }
            if (activeBtn && activeTab) {
                activeBtn.classList.remove('active');
                activeTab.classList.remove('active');
            }
            btn.classList.add('active');
            targetTab.classList.add('active');
        });
    }
})();

// header offset
(function() {
    const header = document.querySelector('.header');
    const html = document.querySelector('html');
    html.style.setProperty('--header-offset', `${header.offsetHeight}px`);
})();
