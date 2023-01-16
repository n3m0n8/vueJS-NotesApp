<template>
    <header>
    <!--note here deploy @onclick instead of : or :v-bind for an event listernet ... this is just another shorthand-->
        <button @click="onClick()" :style="{ background: color}" class="btn">{{text}}</button>
    </header>
</template>

<script>
    export default {
        name:'Header_Button',
        props: {
            text: {
                type: String,
            },
            color: {
                type: String,
            },
        },
        // remember we need a methods nested object array to hold our action methods like the @click directive above
        methods:{
            onClick() {
                this.$emit('toggle-task-form')
            }
        } 
    }
</script>

<style>
</style>
