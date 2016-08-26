<template>
    <div id="{{ ids }}" class="nice-bar" v-bind:class="{ 'theme-light': theme === 'light' , 'theme-drak': theme === 'dark' }" v-el:scroll-container>
        <div class="" v-el:scroll-content v-bind="{ 'overflow': 'hidden', 'height': scrollContainerHeight + 'px' }">
            <slot></slot>
        </div>
        <div class="nice-bar-rail-y" v-if="verticalReady"></div>
        <div class="nice-bar-slider-y" v-if="verticalReady" v-bind:style="{ 'height': sliderYHeight + 'px' }" v-bind:class="{ 'fade-in': show, 'fade-out': !show }" v-el: scroll-slider-y></div>
    </div>
</template>

<script>
    import dom from './js/util/dom'

    export default {
        props: {
            ids: {
                type: String,
                default: ""
            },
            theme: {
                type: String,
                default: "light"
            }
        },

        data() {
            return {
                verticalReady: false,
                scrollContainerHeight: null,
                scrollContainerWidth: null,
                scrollContentHeight: null,
                scrollContentWidth: null,
                sliderYHeight: null,
                show: false,
                dragging: false
            }
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

                if (this.scrollContentHeight > this.scrollContainerHeight)
                    this.verticalReady = true
            },

            showSliderY() {
                this.show = true
            },

            hideSliderY() {
                if (!this.dragging)
                    this.show = false
            }
        },

        ready() {
            this.calculateSize()

            window.addEventListener('resize', this.calculateSize)

            if (this.verticalReady) {
                this.$els.scrollContainer.addEventListener('mouseenter', this.showSliderY)
                this.$els.scrollContainer.addEventListener('mouseleave', this.hideSliderY)
            }
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.calculateSize)
        }
    }
</script>