class popUp {
    constructor() {
        this.isPopUpOpen = false;
        this.popUp = document.querySelector('.pop-up')
        this.formState = 'login';
        this.logInButton = document.querySelector('.header__login-button')
        this.logIn = document.querySelector('.login')
        this.logInSubmit = document.querySelector('.login__form')
        this.signUpLink = document.querySelector('.login__link_to-signup')
        this.signUp = document.querySelector('.sign-up')
        this.logInLink = document.querySelector('.sign-up__link_to-login')
        this.closeButtons = document.querySelectorAll('.close-button')
        this.accountButton = document.querySelector('.header__link_account')
        this.setEvents();
    }

    toggleLoginPopup = (e) => {
        e.stopPropagation();
        this.isPopUpOpen = !this.isPopUpOpen
        if (this.isPopUpOpen === true) {
            this.popUp.classList.add('pop-up_active')
            this.logIn.classList.add('login_active')
            document.body.style.position = 'fixed'
            document.body.style.width = '100%'
        } else {
            this.popUp.classList.remove('pop-up_active')
            this.logIn.classList.remove('login_active')
            this.signUp.classList.remove('sign-up_active')
            document.body.style.position = 'static'
            document.body.style.width = 'auto'
            this.formState = 'login'
        }
    }

    closePopUpOnClickOut = (e) => {
        if (this.formState === 'login') {
            if (e.target.closest('.login') === null && this.isPopUpOpen === true) this.toggleLoginPopup(e);
        } else {
            if (e.target.closest('.sign-up') === null && this.isPopUpOpen === true) return this.toggleLoginPopup(e);
        }
    }
    loginAlert = (e) => {
        e.preventDefault();
        const logInEmail = document.querySelector('.login-email').value
        const logInPassword = document.querySelector('.login-password').value
        alert(`Email: ${logInEmail} Password: ${logInPassword}`)
    }
    changeToSignUp = (e) => {
        e.stopPropagation()
        this.logIn.classList.remove('login_active')
        this.signUp.classList.add('sign-up_active');
        this.formState = 'sign-up'
    }

    changeToLogin = (e) => {
        e.stopPropagation();
        this.signUp.classList.remove('sign-up_active')
        this.logIn.classList.add('login_active');
        this.formState = 'login'
    }
    setEvents = () => {
        this.logInButton.addEventListener('click', this.toggleLoginPopup)
        this.accountButton.addEventListener('click', this.toggleLoginPopup)
        this.closeButtons.forEach((button) => {
            button.addEventListener('click', this.toggleLoginPopup)
        })
        window.addEventListener('click', this.closePopUpOnClickOut)
        this.logInSubmit.addEventListener('submit', this.loginAlert)
        this.signUpLink.addEventListener('click', this.changeToSignUp)
        this.logInLink.addEventListener('click', this.changeToLogin)
    }
}

login = new popUp();