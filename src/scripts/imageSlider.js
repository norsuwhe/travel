export class ImageSlider {
    constructor() {
        this.sliderItems = document.querySelector('.image-slider__items');
        this.sliderImage = document.querySelector('.image-slider__image');
        this.nextButton = document.querySelector('.image-slider__button_right')
        this.previousButton = document.querySelector('.image-slider__button_left')
        this.dots = document.querySelectorAll('.image-slider__indicator')
        this.prevItem = this.sliderItems.children[1];
        this.currentItem = this.sliderItems.children[2];
        this.nextItem = this.sliderItems.children[3];
        this.direction = null
        this.windowSize = window.innerWidth;
        this.isMobileView = this.windowSize <= 1000 ? true : false
        this.setEvents();
    }
    updateWindowSize = () => {
        this.windowSize = window.innerWidth;
        this.isMobileView = this.windowSize <= 1000 ? true : false
        this.updateItemsPosition()
    }

    moveToNextItem = () => {
        const currentGap = +window.getComputedStyle(this.sliderItems).gap.slice(0, -2)
        const currentImageSize = this.sliderImage.clientWidth
        this.direction = 'next';
        this.sliderItems.style.transform = `translateX(-${currentImageSize + currentGap}px)`
        this.removeImageEvents()
    }

    moveToPrevItem = () => {
        const currentGap = +window.getComputedStyle(this.sliderItems).gap.slice(0, -2)
        const currentImageSize = this.sliderImage.clientWidth
        this.direction = 'prev'
        this.sliderItems.style.transform = `translateX(${currentImageSize + currentGap}px)`
        this.removeImageEvents()
    }

    addImageEvents = () => {
        if (this.isMobileView === false) {
            this.prevItem.addEventListener('click', this.moveToPrevItem);
            this.nextItem.addEventListener('click', this.moveToNextItem)
        } else {
            this.removeImageEvents();
        }
    }

    removeImageEvents = () => {
        for (let item of this.sliderItems.children) {
            item.removeEventListener('click', this.moveToPrevItem)
            item.removeEventListener('click', this.moveToNextItem)
        }
    }
    updateItemsPosition = () => {
        this.sliderItems = document.querySelector('.image-slider__items');
        this.prevItem = this.sliderItems.children[1];
        this.currentItem = this.sliderItems.children[2];
        this.nextItem = this.sliderItems.children[3];
        this.updateDots()
        this.addImageEvents();
    }

    appendOnTransitionEnd = () => {
        if (this.direction === 'next') {
            this.sliderItems.appendChild(this.sliderItems.firstElementChild);
        } else {
            this.sliderItems.prepend(this.sliderItems.lastElementChild)
        }
        this.sliderItems.style.transition = 'none'
        this.sliderItems.style.transform = 'translateX(0)'
        setTimeout(() => {
            this.sliderItems.style.transition = 'transform 0.5s ease'
            this.updateItemsPosition()
        })
    }

    updateDots = () => {
        const slides = ['USA', 'SPAIN', 'JAPAN']
        slides.forEach((slideName, index) => {
            if (this.currentItem.children[1].textContent === slideName) return this.dots[index].classList.add('image-slider__indicator_active')
            this.dots[index].classList.remove('image-slider__indicator_active');
        })
    }

    setEvents = () => {
        this.updateWindowSize();
        this.nextButton.addEventListener('click', this.moveToNextItem)
        this.previousButton.addEventListener('click', this.moveToPrevItem)
        this.addImageEvents();
        window.addEventListener('resize', this.updateWindowSize)
        this.sliderItems.addEventListener('transitionend', this.appendOnTransitionEnd)
    }
}