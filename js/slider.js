'use strict';


class Slider {
    constructor(params) {
        this.slider = document.querySelector(params?.slider);
        if (this.slider) {
            this.slides = Array.from(this.slider.querySelectorAll('.slide'));
            this.sliderRow = this.slider.querySelector('.slider-row');
            this.isDragging = false;
            this.startPos = 0;
            this.currentTranslate = 0;
            this.prevTranslate = 0;
            this.animationID = 0;
            this.currentIndex = 0;
            this.stepWidth = this.initStepWidth();
            this.thumbs = Array.from(document.querySelectorAll(`${params?.thumbs} .slider-thumbs__item`));
            this.initEvents();
        }
    }
    initEvents = () => {
        this.slides.forEach((slide, index) => {
            const slideImage = slide.querySelector('img');
            slideImage.addEventListener('dragstart', (e) => e.preventDefault());
            // touch events
            slide.addEventListener('touchstart', this.touchStart(index));
            slide.addEventListener('touchend', this.touchEnd);
            slide.addEventListener('touchmove', this.touchMove);
            // mouse events
            slide.addEventListener('mousedown', this.touchStart(index));
            slide.addEventListener('mouseup', this.touchEnd);
            slide.addEventListener('mouseleave', this.touchEnd);
            slide.addEventListener('mousemove', this.touchMove);
        });
        if (this.thumbs) {
            this.thumbs.forEach((thumb, index) => {
                thumb.addEventListener('click', this.goToSlide(thumb));
            });
        }
    }
    initStepWidth = () => {
        return this.slider.clientWidth;
    }
    touchStart = (index) => {
        return (event) => {
            this.currentIndex = index;
            this.startPos = this.getPositionX(event);
            this.isDragging = true;
            this.animationID = requestAnimationFrame(this.animation);
            this.slider.classList.add('grabbing');
        }
    }
    touchEnd = () => {
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);
        const movedBy = this.currentTranslate - this.prevTranslate;
        if (movedBy < -100 && this.currentIndex < this.slides.length - 1) {
            this.currentIndex++;
        }
        if (movedBy > 100 && this.currentIndex > 0) {
            this.currentIndex--;
        }
        this.setPositionByIndex();
        this.slider.classList.remove('grabbing');
    }
    touchMove = (event) => {
        if (this.isDragging) {
            const currentPosition = this.getPositionX(event);
            this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
        }
    }
    getPositionX = (event) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    animation = () => {
        this.setSliderPisition();
        if (this.isDragging) {
            requestAnimationFrame(this.animation);
        }
    }
    setSliderPisition = () => {
        this.sliderRow.style.transform = `translateX(${this.currentTranslate}px)`;
    }
    setPositionByIndex = () => {
        this.currentTranslate = this.currentIndex * -this.stepWidth;
        this.prevTranslate = this.currentTranslate;
        this.setSliderPisition();
    }
    goToSlide = (thumb) => {
        return (event) => {
            this.currentIndex = parseInt(thumb.getAttribute('data-index'), 10);
            this.setPositionByIndex();
        };
    }
}
