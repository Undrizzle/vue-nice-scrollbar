'use strict';

import nb from 'nice-bar'

Vue.directive('nice-bar', {
    params: ['theme'],
    bind: function () {

    },
    update: function () {
        if (this.params.theme === 'dark') {
            nb.init(this.el, {theme: 'dark'})
        } else {
            nb.init(this.el, {theme: 'light'})
        }
    }
})