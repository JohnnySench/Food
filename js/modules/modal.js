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




