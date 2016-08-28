<template>
    <div class="nice-bar-rail-y"></div>
    <div class="nice-bar-slider-y" v-bind:style="{ 'height': height + 'px', top: scrolling.v + '%' }" v-bind:class="{ 'fade-in': show, 'fade-out': !show }" v-el: scroll-slider-y></div>
</template>

<script>
    export default {
        props: {
            content: {
                type: Object,
                default: 0
            },
            container: {
                type: Object,
                default: 0
            },
            scrolling: {
                type: Object,
                default: { v: 0, h: 0 }
            },
            show: {
                type: Boolean,
                default: false
            },
            draggingFromParent: {
                type: Boolean,
                default: false
            },
            onChangePosition: {
                type: Function,
                default: () => {}
            }
        },

        data() {
            return {
                height: 0,
                dragging: false,
                start: 0
            }
        },

        methods: {
            calculateSize() {
                this.height = this.container.height * this.container.height / this.content.height
            }
        },

        ready() {
            this.calculateSize()
        }
    }
</script>