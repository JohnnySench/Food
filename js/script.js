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

    const deadline = '2021-12-12';

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
          btnClose = document.querySelector('.modal__close'),
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
    
    btnClose.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
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


});