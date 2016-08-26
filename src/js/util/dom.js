'use strict';

function getCss(element, styleName) {
    var styleValue = window.getComputedStyle(element)[styleName];
    if (parseInt(styleValue, 10) || parseInt(styleValue, 10) === 0) {
        styleValue = parseInt(styleValue, 10);
    }

    return styleValue;
}

function setSingleCss(element, styleName, styleValue) {
    if (typeof styleValue === 'number') {
        styleValue = styleValue.toString() + 'px';
    }

    element.style[styleName] = styleValue;
    return element;
}

function setMultiCss(element, obj) {
    for (var key in obj) {
        var styleValue = obj[key];
        if (typeof styleValue === 'number') {
            styleValue = styleValue.toString() + 'px';
        }

        element.style[key] = styleValue;
    }

    return element;
}

var dom = {
    createElement: function (string) {
        var element = document.createElement('div');
        element.innerHTML = string;
        return element.firstElementChild;
    },

    appendTo: function (child, parent) {
        parent.appendChild(child);
    },

    addClass: function (element, className) {
        var classes = element.className.split(' ');
        if (classes.indexOf(className) < 0) {
            classes.push(className);
        }

        element.className = classes.join(' ');
        return element;
    },

    removeClass: function (element, className) {
        var classes = element.className.split(' ');
        var index = classes.indexOf(className);
        if (index > -1 ) {
            classes.splice(index, 1);
        }

        element.className = classes.join(' ');
        return element;
    },

    css: function (element, styleNameOrObject, styleValue) {
        if (typeof styleNameOrObject === 'object') {
            return setMultiCss(element, styleNameOrObject);
        } else {
            if (typeof styleValue === 'undefined') {
                return getCss(element, styleNameOrObject);
            } else {
                return setSingleCss(element, styleNameOrObject, styleValue);
            }
        }
    }
};

module.exports = dom;