# vue-nice-scrollbar

a nice scrollbar for vue.js

[![Build Status](https://travis-ci.org/hustcc/echarts-for-react.svg?branch=master)](https://travis-ci.org/undrizzle/vue-nice-scrollbar) [![npm](https://img.shields.io/npm/v/echarts-for-react.svg?style=flat-square)](https://www.npmjs.com/package/vue-nice-scrollbar) [![npm](https://img.shields.io/npm/dt/echarts-for-react.svg?style=flat-square)](https://www.npmjs.com/package/vue-nice-scrollbar) [![npm](https://img.shields.io/npm/l/echarts-for-react.svg?style=flat-square)](https://www.npmjs.com/package/vue-nice-scrollbar)

### Demo

[Demo](http://forsigner.com/nice-bar)

### Install

```
npm install vue-nice-scrollbar --save
```

### Usage

``` html
<link rel="stylesheet" href="node_modules/vue-nice-scrollbar/dist/vue-nice-scrollbar.css" />

<script src="node_modules/vue-nice-scrollbar/dist/vue-nice-scrollbar.js"></script>

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
