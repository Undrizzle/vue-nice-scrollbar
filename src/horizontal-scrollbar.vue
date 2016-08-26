<template>
    <div class="vue-scrollbar__scrollbar-horizontal" v-if="width < 100" @click="jump" v-el:container>
        <div class="scrollbar" v-bind:class="dragging || draggingFromParent ? '' : 'vue-scrollbar-transition'" v-el:scrollbar @touchstart="startDrag"
            @mousedown="startDrag" v-bind:style="{ width: width + '%', left: scrolling.h + '%' }">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            area: {
                type: Object,
                default: 0
            },
            wrapper: {
                type: Object,
                default: 0
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
            }
        },
        data() {
            return {
                width: 0,
                dragging: false,
                start: 0
            }
        },

        methods: {
            onDrag(e) {
                if (this.dragging) {
                    e.preventDefault()
                    e.stopPropagation()

                    e = e.changedTouches ? e.changedTouches[0] : e

                    let xMovement = e.pageX - this.start
                    let xMovementPercentage = xMovement / this.wrapper.width * 100

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
            }

            jump(e) {
                let isContainer = e.target === this.$els.container
                if (isContainer) {
                    let position = this.$els.scrollbar.getBoundingClientRect()

                    // Calculate the horizontal Movement
                    let xMovement = e.pageX - position.left

                    let centerize = this.width / 2
                    let xMovementPercentage = xMovement / this.wrapper.width * 100 - centerize

                    this.start = e.pageX

                    let next = this.scrolling.h + xMovementPercentage

                    this.normalize(next)
                    this.onChangePosition(next, 'horizontal')
                }
            }

            normalize(next) {
                let lowerEnd = 100 - this.width
                if(next < 0) next = 0
                if(next > lowerEnd) next = lowerEnd
                this.scrolling.h = next
            },

            calculateSize() {
                this.width = this.wrapper.width / this.area.width * 100
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
        }
    }
</script>