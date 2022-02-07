'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs');
    const calc = require('./modules/calc');
    const cards = require('./modules/cards');
    const form = require('./modules/forms');
    const modal = require('./modules/modal');
    const slider = require('./modules/slider');
    const timer = require('./modules/timer');

    tabs();
    calc();
    cards();
    form();
    modal();
    slider();
    timer();

});