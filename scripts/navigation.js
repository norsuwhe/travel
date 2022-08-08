class MobileNavigation {
    constructor() {
        this.menuState = false;
        this.menuButton = document.querySelector('.header__menu');
        this.menu = document.querySelector('.header__links')
        this.iconScroll = document.querySelector('#icon-scroll')
        this.setEvents();
    }
    toggleMenuState = (e) => {
        e.stopPropagation();
        if (this.menuState === true) {
            this.menuButton.src = './svg/header/burger-menu.svg'
            this.menu.classList.remove('header__links_active')
        } else {
            this.menuButton.src = './svg/header/burger-close.svg';
            this.menu.classList.add('header__links_active')
        }
        this.menuState = !this.menuState
    }

    scrollToFooter = (e) => {
        window.scrollTo(0, document.body.scrollHeight);
        this.toggleMenuState(e);
    }

    closeMenu = (e) => {
        if (e.target != this.menu && this.menuState === true) this.toggleMenuState(e)
    }

    setEvents = () => {
        this.menuButton.addEventListener('click', this.toggleMenuState)
        this.menu.addEventListener('click', this.toggleMenuState)
        this.iconScroll.addEventListener('click', this.scrollToFooter)
        window.addEventListener('click', this.closeMenu)
    }
}

navigation = new MobileNavigation();