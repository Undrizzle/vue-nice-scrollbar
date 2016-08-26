<template>
    <div class="vue-scrollbar__wrapper" v-el:scroll-wrapper v-bind:class="classes ? '' + classes : ''">
        <div class="vue-scrollbar__arae" @wheel="scroll" v-el:scroll-area @touchstart="startDrag" @touchmove="onDrag"
             @touchend="stopDrag" v-bind:class="(dragging ? '' : 'vue-scrollbar-transition')" v-bind:style="{ 'margin-top': top * -1 + 'px', 'margin-left': left * -1 + 'px' }">
            <slot></slot>
        </div>
        <vertical-scrollbar v-if="ready" v-bind:area="{ height: scrollAreaHeight }" v-bind:wrapper="{ height: scrollWrapperHeight }" v-bind:scrolling="{ v: vMovement }"
                            v-bind:dragging-from-parent="dragging" v-bind:on-change-position="handleChangePosition"></vertical-scrollbar>
        <horizontal-scrollbar v-if="ready" v-bind:area="{ width: scrollAreaWidth }" v-bind:wrapper="{ width: scrollWrapperWidth }" v-bind:scrolling="{ h: hMovement }"
                              v-bind:dragging-from-parent="dragging" v-bind:on-change-position="handleChangePosition"></horizontal-scrollbar>
    </div>
</template>

<script>
    import verticalScrollbar from './vertical-scrollbar.vue';
    import horizontalScrollbar from './horizontal-scrollbar.vue';

    require('./less/vue-nice-scrollbar.less');

    export default {
        props: {
            classes: {
                type: String,
                default: ""
            },
            speed: {
                type: Number,
                default: 53
            }
        },
        data() {
            return {

            }
        },
        methods: {
            normalizeVertical(nextY) {
                let lowerEnd = this.scrollAreaHeight - this.scrollWrapperHeight

                if (nextY > lowerEnd) nextY = lowerEnd

                else if (nextY < 0) nextY = 0

                this.top = nextY
            },

            normalizeHorizontal(next) {
                let rightEnd = this.scrollAreaWidth - this.scrollWrapperWidth

                if (next > rightEnd) next = rightEnd

                else if (next < 0) next = 0

                this.left = next
            },

            handleChangePosition(vScrollbar, orientation) {
                let next = vScrollbar / 100 * ( orientation == 'vertical' ? this.scrollAreaHeight : this.scrollAreaWidth )
                if (orientation == 'vertical') this.normalizeVertical(next)
                if (orientation == 'horizontal') this.normalizeHorizontal(next)
            }
        },
        ready() {

        },
        beforeDestroy() {

        }
    }
</script>