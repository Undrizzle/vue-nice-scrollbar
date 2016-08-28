<template>
    <div id="{{ ids }}" class="nice-bar" v-bind:class="{ 'theme-light': theme === 'light' , 'theme-drak': theme === 'dark' }" v-el:scroll-container>
        <div class="" v-el:scroll-content v-bind:style="{ 'margin-top': top * -1 + 'px', 'margin-left': left * -1 + 'px' }" @wheel="scroll">
            <slot></slot>
        </div>
        <vertical-scrollbar v-if="ready" v-bind:content="{ height: scrollContentHeight }" v-bind:container="{ height: scrollContainerHeight }"
                            v-bind:scrolling="{ v: vMovement }" v-bind:dragging-from-parent="dragging" v-bind:on-change-position="handleChangePosition"
                            v-bind:show="show">
        </vertical-scrollbar>
     <!--   <div class="nice-bar-rail-y" v-if="verticalReady"></div>
        <div class="nice-bar-slider-y" v-if="verticalReady" v-bind:style="{ 'height': sliderYHeight + 'px' }" v-bind:class="{ 'fade-in': show, 'fade-out': !show }" v-el: scroll-slider-y></div>
        -->
    </div>
</template>

<script>
    import verticalScrollbar from './vertical-scrollbar.vue'

    export default {
        props: {
            ids: {
                type: String,
                default: ""
            },
            theme: {
                type: String,
                default: "light"
            },
            speed: {
                type: Number,
                default: 53
            }
        },

        data() {
            return {
                ready: false,
                scrollContainerHeight: null,
                scrollContainerWidth: null,
                scrollContentHeight: null,
                scrollContentWidth: null,
                sliderYHeight: null,
                show: false,
                dragging: false,
                scrollY: null,
                scrollX: null,
                top: 0,
                left: 0,
                vMovement: 0,
                hMovement: 0
            }
        },

        components: {
            verticalScrollbar
        },

        methods: {
            calculateSize() {
                let $scrollContainer = this.$els.scrollContainer
                let $scrollContent = this.$els.scrollContent

                let scrollContainerStyle = window.getComputedStyle($scrollContainer, null)

                this.scrollContentHeight = $scrollContent.children[0].clientHeight
                this.scrollContentWidth = $scrollContent.children[0].clientWidth

                this.scrollContainerHeight = parseFloat(scrollContainerStyle.height)
                this.scrollContainerWidth = parseFloat(scrollContainerStyle.width)

                this.sliderYHeight = this.scrollContainerHeight * this.scrollContainerHeight / this.scrollContentHeight

                this.ready = true
            },

            showSliderY() {
                this.show = true
            },

            hideSliderY() {
                if (!this.dragging)
                    this.show = false
            },

            scroll(e) {
                e.preventDefault()

                let num = this.speed

                let shifted = e.shiftKey

                this.scrollY = e.deltaY > 0 ? num : -(num)
                this.scrollX = e.deltaX > 0 ? num : -(num)

                if(shifted && e.deltaX == 0) this.scrollX = e.deltaY > 0 ? num : -(num)

                let nextY = this.top + this.scrollY
                let nextX = this.left + this.scrollX

                let canScrollY = this.scrollContentHeight > this.scrollContainerHeight
                let canScrollX = this.scrollContainerWidth > this.scrollContainerWidth

                if (canScrollY && !shifted) {
                    this.normalizeVertical(nextY)
                    this.moveTheScrollbar()
                }

                if (shifted && canScrollX) {
                    this.normalizeHorizontal(nextX)
                    this.moveTheScrollbar()
                }
            },

            normalizeVertical(nextY) {
                let lowerEnd = this.scrollContentHeight - this.scrollContainerHeight

                if (nextY > lowerEnd)
                    nextY = lowerEnd
                else if (nextY < 0)
                    nextY = 0

                this.top = nextY
            },

            normalizeHorizontal(nextX) {
                let rightEnd = this.scrollContentWidth - this.scrollContainerWidth

                if (nextX > rightEnd)
                    nextX = rightEnd
                else if (next < 0)
                    nextX = 0

                this.left = next
            },

            moveTheScrollbar() {
                this.vMovement = this.top / this.scrollContentHeight * 100
                this.hMovement = this.left / this.scrollContentWidth * 100
            }
        },

        ready() {
            this.calculateSize()

            window.addEventListener('resize', this.calculateSize)

            if (this.ready) {
                this.$els.scrollContainer.addEventListener('mouseenter', this.showSliderY)
                this.$els.scrollContainer.addEventListener('mouseleave', this.hideSliderY)
            }
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.calculateSize)
        }
    }
</script>