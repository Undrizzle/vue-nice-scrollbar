<template>
    <div>
        <div class="nice-bar-rail-x" v-if="width < 100" @click="jump" ref="scrollRailX"></div>
        <div class="nice-bar-slider-x" v-bind:style="{ 'width': width + '%', left: scrolling.h + '%' }" v-bind:class="{ 'fade-in': show, 'fade-out': !show }"
             ref="scrollSliderX" @touchstart="startDrag" @mousedown="startDrag">
        </div>
    </div>
</template>

<script>
    export default {
        name:'horizontal-scrollbar',
        props: {
            content: {
                type: Object,
                default: 0
            },
            container: {
                type: Object,
                default: 0
            },
            show: {
                type: Boolean,
                default: false
            },
            scrolling: {
                type: Object,
                default: { v: 0, h: 0 }
            },
            draggingFromParent: {
                type: Boolean,
                default: false
            },
            onChangePosition: {
                type: Function,
                default: () => {}
            },
        },
        data() {
            return {
                width: 0,
                dragging: false,
                start: 0,
            }
        },

        watch: {
            'container.width'(val,old) {
                if(val != old) this.calculateSize()
            },
        },

        methods: {
            startDrag(e) {
                e.preventDefault()
                e.stopPropagation()

                e = e.changedTouches ? e.changedTouches[0] : e

                this.dragging = true
                this.start = e.pageX
            },

            onDrag(e) {
                if (this.dragging) {
                    e.preventDefault()
                    e.stopPropagation()

                    e = e.changedTouches ? e.changedTouches[0] : e

                    let xMovement = e.pageX - this.start
                    let xMovementPercentage = xMovement / this.container.width * 100

                    this.start = e.pageX

                    let next = this.scrolling.h + xMovementPercentage

                    this.$parent.dragging = true

                    this.onChangePosition(next, 'horizontal')

                    this.normalize()
                }
            },

            stopDrag(e) {
                this.dragging = false

                this.$parent.dragging = false
            },

            jump(e) {
                let isRailX = e.target === this.$refs.scrollRailX
                if (isRailX) {
                    let position = this.$refs.scrollSliderX.getBoundingClientRect()

                    // Calculate the horizontal Movement
                    let xMovement = e.pageX - position.left

                    let centerize = this.width / 2
                    let xMovementPercentage = xMovement / this.container.width * 100 - centerize

                    this.start = e.pageX

                    let next = this.scrolling.h + xMovementPercentage

                    this.onChangePosition(next, 'horizontal')
                    this.normalize()
                }
            },

            normalize() {
                this.$emit('horizontal')
            },

            calculateSize() {
                this.width = this.container.width / this.content.width * 100
            }
        },

        mounted() {
            this.calculateSize()

            document.addEventListener("mousemove", this.onDrag)
            document.addEventListener("touchmove", this.onDrag)
            document.addEventListener("mouseup", this.stopDrag)
            document.addEventListener("touchend", this.stopDrag)
        },

        beforeDestroy() {
            document.removeEventListener("mousemove", this.onDrag)
            document.removeEventListener("touchmove", this.onDrag)
            document.removeEventListener("mouseup", this.stopDrag)
            document.removeEventListener("touchend", this.stopDrag)
        },
    }
</script>

<style>
    .nice-bar-rail-x {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 6px;
        width: 100%;
        z-index: 100000;
    }

    .nice-bar-slider-x {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 6px;
        z-index: 100001;
        opacity: 0;
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .theme-light .nice-bar-slider-x {
        background: #aaa;
    }
</style>