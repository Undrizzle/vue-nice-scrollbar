# vue-nice-scrollbar

a nice scrollbar for vue.js

[![Build Status](https://travis-ci.org/Undrizzle/vue-nice-scrollbar.svg?branch=master)](https://travis-ci.org/undrizzle/vue-nice-scrollbar) [![npm](https://img.shields.io/npm/v/vue-nice-scrollbar.svg?style=flat-square)](https://www.npmjs.com/package/vue-nice-scrollbar) [![npm](https://img.shields.io/npm/dt/vue-nice-scrollbar.svg?style=flat-square)](https://www.npmjs.com/package/vue-nice-scrollbar) [![npm](https://img.shields.io/npm/l/vue-nice-scrollbar.svg?style=flat-square)](https://www.npmjs.com/package/vue-nice-scrollbar)

### Demo
[DEMO](http://undrizzle.github.io/vue-nice-scrollbar)

### Install

```
npm install vue-nice-scrollbar --save
```

### Usage

``` html
<link rel="stylesheet" href="node_modules/vue-nice-scrollbar/dist/vue-nice-scrollbar.css" />

<script src="node_modules/vue-nice-scrollbar/dist/vue-nice-scrollbar.vue"></script>

<style>
  #demo {
    height: 300px;
  }
</style>

<div id="demo" v-nice-bar theme="light"></div>

```

```js
  new Vue({
    el: '#demo'
  });
```

### Theme

  * light
  * dark

### License

  MIT
