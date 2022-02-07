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