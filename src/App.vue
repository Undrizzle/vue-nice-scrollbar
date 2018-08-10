<template>
    <div>
        <h1>vue-nice-scrollbar</h1>
        <vue-nice-scrollbar classes="my-scrollbar" theme="light" v-bind:speed=53>
            <div class="scroll-me">
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
            </div>
        </vue-nice-scrollbar>
    </div>
</template>

<script>
    import vueNiceScrollbar from './components/vue-nice-scrollbar.vue'

    export default {
        components: { vueNiceScrollbar }
    }
</script>

<style>
    h1 {
        text-align: center;
    }

    .my-scrollbar {
        width: 35%;
        min-width: 300px;
        max-height: 450px;
    }

    .scroll-me {
        min-width: 750px;
        background: #eee;
        overflow: hidden;
    }

    .kolom {
        background: #2196f3;
        width: 150px;
        height: 150px;
        float: left;
        display: inline-block;
        margin: 15px;
    }
</style>