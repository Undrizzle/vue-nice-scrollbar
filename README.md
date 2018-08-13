# vue-nice-scrollbar

a nice scrollbar for vue.js 2.0

[![Build Status](https://travis-ci.org/Undrizzle/vue-nice-scrollbar.svg?branch=master)](https://travis-ci.org/undrizzle/vue-nice-scrollbar) [![npm](https://img.shields.io/npm/v/vue-nice-scrollbar.svg?style=flat-square)](https://www.npmjs.com/package/vue-nice-scrollbar) [![npm](https://img.shields.io/npm/dt/vue-nice-scrollbar.svg?style=flat-square)](https://www.npmjs.com/package/vue-nice-scrollbar) [![npm](https://img.shields.io/npm/l/vue-nice-scrollbar.svg?style=flat-square)](https://www.npmjs.com/package/vue-nice-scrollbar)

### Demo
[DEMO](http://undrizzle.github.io/vue-nice-scrollbar)

### Install

```
npm install vue-nice-scrollbar --save
```

### Usage

```js
  import Vue from 'vue'
  import vueNiceScrollbar from 'vue-nice-scrollbar'

  Vue.use(vueNiceScrollbar)
```

``` html
<template>
    <vue-nice-scrollbar classes="my-scrollbar" v-bind:speed=100 theme="light">
        <div class="scroll-me">
            //scroll-content
        </div>
    </vue-nice-scrollbar>
</template>
```

### Props
##### classes(String)

```css
/* container */
.my-scrollbar{
  width: 35%;
  min-width: 300px;
  max-height: 450px;
}

/* Content */
.scroll-me{
  min-width: 750px;
}
```

##### Theme

  * light
  * dark

### License

  MIT
