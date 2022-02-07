// Slider
function slider() {
const slides = document.querySelectorAll('.offer__slide'),
          slidesField = document.querySelector('.offer__slider-inner'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          total = document.getElementById('total'),
          current = document.getElementById('current'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          slider = document.querySelector('.offer__slider'),
          width = window.getComputedStyle(slidesWrapper).width,
          dots = [];

    let indexSlides = 1,
        offset = 0;


    slidesField.style.display = 'flex';
    slidesField.style.width = `${slides.length * 100}%`;
    slidesField.style.transition = 'All .5s';

    slides.forEach(slide => slide.style.width = width);
    slidesWrapper.style.overflow = 'hidden';

    const indicators = document.createElement('ul');
    indicators.classList.add('carousel-indicators');

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        indicators.appendChild(dot);
        dot.dataset.number = i + 1;
        if (i === 0) {
            dot.style.opacity = 1;
        }
        dots.push(dot);
    }

    slider.style.position = 'relative';
    slider.appendChild(indicators);


    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {

            const slideTo = +e.target.dataset.number;

            indexSlides = slideTo;

            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[indexSlides - 1].style.opacity = 1;

            setNumberSlide();
        });
    });


    function setNumberSlide() {

        if (slides.length < 10) {
            total.innerText = `0${slides.length}`;
            current.innerText = `0${indexSlides}`;
        } else {
            total.innerText = slides.length;
            current.innerText = indexSlides;
        }

    }


    setNumberSlide();

    prev.addEventListener('click', () => {

        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexSlides == 1) {
            indexSlides = slides.length;
        } else {
            indexSlides--;
        }

        setNumberSlide();
        
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[indexSlides - 1].style.opacity = 1;

    });

    next.addEventListener('click', () => {

        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexSlides == slides.length) {
            indexSlides = 1;
        } else {
            indexSlides++;
        }

        setNumberSlide();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[indexSlides - 1].style.opacity = 1;

    });

}

module.exports = slider;
    