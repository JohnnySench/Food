/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

// Calc

function calc() {
    const result = document.querySelector('.calculating__result span');

    let height, weight, age, sex, ratio;
    
    
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    }  else {
        localStorage.setItem('sex', 'female');
    }
    
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        localStorage.setItem('ratio', 1.375);
    }
    
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function initLocalSettings(parent, activeClass) {
        const elements = document.querySelectorAll(parent);
    
        elements.forEach(el => {
    
            el.classList.remove(activeClass);
    
            if (localStorage.getItem('sex') === el.dataset.sex) {
                el.classList.add(activeClass);
            }
    
            if (localStorage.getItem('ratio') === el.dataset.ratio) {
                el.classList.add(activeClass);
            }
        });
    }
    
    
    
    function calcTotal() {
    
        if (!height || !weight || !age || !sex || !ratio) {
    
            result.textContent = '_____';
    
            return;
        }
    
        if (sex === 'female') {
    
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    
        } else {
    
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    
        }
    
        
    }
    
    calcTotal();
    
    
    function getStaticInformation(parentSelector, activeClass) {
    
        const elements = document.querySelectorAll(`${parentSelector} div`);
    
        elements.forEach(el => {
            el.addEventListener('click', e => {
    
                if (e.target.getAttribute('data-sex')) {
                    sex = e.target.getAttribute('data-sex');
                    localStorage.setItem('sex', e.target.getAttribute('data-sex'));
                } else {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
                }
    
                console.log(sex, ratio);
    
               
    
                calcTotal();
    
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
            });
    
    
        });
    }
    
    function getDynamicInformation(input) {
    
        input.addEventListener('input', () => {
    
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
    
            switch (input.getAttribute('id')) {
    
               
    
                case 'height':
                    height = +input.value.replace(/\D/gi, '');
                    break;
    
                case 'weight':
                    weight = +input.value.replace(/\D/gi, '');
                    break;
    
                case 'age': 
                    age = +input.value.replace(/\D/gi, '');
                    break;
            
    
            }
    
            calcTotal();
        });
    }
    
    document.querySelectorAll('.calculating__choose_medium input').forEach(input => {
        getDynamicInformation(input);
    });
    
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    
}

module.exports = calc;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

// Class
function cards() {
    class Cards {
        constructor(parentSelector, src, alt, subtitle, descr, total, ...classes) {
            this.parentSelector = document.querySelector(parentSelector);
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.transfer = 70;
            this.total = total;
            this.classes = classes;
            this.changeToRUB();
        }
        changeToRUB() {
            this.total = this.total * this.transfer;
        }
        render() {
            const div = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                div.classList.add(this.classes);
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }
            div.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.total}</span> руб/день</div>
                </div>
            `;
            this.parentSelector.append(div);
        }
    }
    
    const getResource = async (url) => {
    
        const res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not ${res.status}, status: ${res.status}`);
        }
    
        return await res.json();
    };
    
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Cards('.menu__field .container', img, altimg, title, descr, price).render();
            });
        });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

// POST for form
function form() {
const forms = document.querySelectorAll('form'),
          message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так'
          };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            console.log(json);
            
           

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                    statusMessage.remove();
                })
                .finally(() => {
                    form.reset();
                });

           
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');
        
        openModal();
        const thankModal = document.createElement('div');
        thankModal.classList.add('modal__dialog');
        thankModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').appendChild(thankModal);

        setTimeout(() => {
            thankModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModal();
        }, 2000);
    }
}

module.exports = form;
    

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

// Modal

function modal() {
    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalDialog = document.querySelector('.modal__dialog'),
            body = document.querySelector('body'),
            modalTimer = setTimeout(openModal, 5000);

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        body.style.overflow = 'hidden';
        clearTimeout(modalTimer);
    }
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        body.style.overflow = '';
    }
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    window.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;






/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

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
    

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    // Tabs
    const tabContent = document.querySelectorAll('.tabcontent'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent(i) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabsContent(0);

    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == e.target) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

// Timer
function timer() {
    const deadline = '2022-01-01';

    function getTimeRemaining(deadline) {
        const t = Date.parse(deadline) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(timer, deadline) {
        const timerId = document.querySelector(timer),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timerClock = setInterval(updateClock, 1000);

        updateClock();


        function updateClock() {
            let c = getTimeRemaining(deadline);
            days.innerHTML = getZero(c.days);
            hours.innerHTML = getZero(c.hours);
            minutes.innerHTML = getZero(c.minutes);
            seconds.innerHTML = getZero(c.seconds);

            if (c <= 0) {
                clearInterval(timerClock);
            }
        }
    }
    setClock('.timer', deadline);
}

module.exports = timer;



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

document.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
    const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
    const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
    const form = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
    const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
    const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
    const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    tabs();
    calc();
    cards();
    form();
    modal();
    slider();
    timer();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map