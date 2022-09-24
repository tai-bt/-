<template>
    <div>
        <el-input v-model.lazy="MyNumber" @change="dataChange"></el-input>
    </div>
</template>

<script>
export default {
    props:['valueNum'],
    watch:{
        valueNum(res){
            this.MyNumber = res
        }
    },
    data(){
        return{
            MyNumber:null
        }
    },
    mounted(){
        this.MyNumber = this.valueNum
    },
    methods:{
        dataChange(){
            this.$emit('dataChange',this.MyNumber)
        }
    },
}
</script>

<style>

</style>
