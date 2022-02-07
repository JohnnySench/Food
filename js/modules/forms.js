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
    