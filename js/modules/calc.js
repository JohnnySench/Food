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
