<template>
    <div>
        <el-input v-model="syncTest1"></el-input>
        <slot name="two" class="slotClass">213212331</slot>
    </div>
</template>

<script>
    export default {
        props: ['syncTest'],
        data(){
            return {
                syncTest1: this.syncTest,
            }
        },
        watch:{
            syncTest1(NVal){
                this.$emit('update:syncTest',NVal)
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss" scoped>
.qqqqq{
    width: 400px;
    height: 300px;
    border: 1px solid #000;
    background-position-y: center;
    background-size: 100% auto;
    background-repeat: no-repeat;
}
.slotClass{
    color: red;
}
</style>