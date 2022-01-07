'use strict';
document.addEventListener('DOMContentLoaded', () => {


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



    // Timer

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



    // Modal

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




    // Class

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


    // const cards1 = new Cards('.menu__field .container', 'img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 8, 'menu__item', 'big').render();

    // const cards2 = new Cards('.menu__field .container', 'img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 15).render();

    // const cards3 = new Cards('.menu__field .container', 'img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 10).render();


    // POST for form

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




    // Slider

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
    



    

});