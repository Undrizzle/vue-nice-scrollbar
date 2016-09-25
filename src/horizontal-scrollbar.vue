<template>
    <div class="nice-bar-rail-x" @click="jump" v-el:scroll-rail-x></div>
    <div class="nice-bar-slider-x" v-bind:style="{ 'width': width + '%', left: scrolling.h + '%' }" v-bind:class="{ 'fade-in': show, 'fade-out': !show }"
         v-el:scroll-slider-x @touchstart="startDrag" @mousedown="startDrag">
    </div>
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

                    this.normalize(next)

                    this.$parent.dragging = true

                    this.onChangePosition(next, 'horizontal')
                }
            },

            stopDrag(e) {
                this.dragging = false

                this.$parent.dragging = false
            },

            jump(e) {
                let isRailX = e.target === this.$els.scrollRailX
                if (isRailX) {
                    let position = this.$els.scrollSliderX.getBoundingClientRect()

                    // Calculate the horizontal Movement
                    let xMovement = e.pageX - position.left

                    let centerize = this.width / 2
                    let xMovementPercentage = xMovement / this.container.width * 100 - centerize

                    this.start = e.pageX

                    let next = this.scrolling.h + xMovementPercentage

                    this.normalize(next)
                    this.onChangePosition(next, 'horizontal')
                }
            },

            normalize(next) {
                let lowerEnd = 100 - this.width
                if(next < 0) next = 0
                if(next > lowerEnd) next = lowerEnd
                this.scrolling.h = next
            },

            calculateSize() {
                this.width = this.container.width / this.content.width * 100
            }
        },

        ready() {
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