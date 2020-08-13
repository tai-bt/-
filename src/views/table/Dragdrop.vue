<template>
    <div @mousemove="move">
        <el-tag
            class="hand"
            v-for="(tag,index) in tags"
            @mouseup.native="up(tag.name || tag)"
            @mousedown.native="down"
            :id="'tag' + index"
            :key="index"
            :type="tag.type">
            {{tag.name || tag}}
        </el-tag>


        <!-- ！！！注意   表格内所有的数据均为数组，下方data中tabListSample为数据样本 -->
        <el-table
            :data="TabList"
            style="width: 100%"
            @cell-mouse-enter='Dragdrop'
            @cell-mouse-leave='Dragdropleave'
            border
            >

            <el-table-column
                v-for="(item,index) in  TabHead"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                >
                <template slot-scope="scope">
                    <el-tag
                        class="hand Hidden t-mr6"
                        v-for="(tag,indexT) in scope.row[item.prop]"
                        @mouseup.native="up(tag,item.prop)"
                        @mousedown.native="down"
                        @close="handleClose(indexT,scope.row[item.prop])"
                        :id="'tagTab' + indexT+(Math.random() * 4)"
                        :key="indexT"
                        closable
                        :type="tag.type"
                        :data-index='indexT'
					>
                        {{tag}}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props:{
        'TabList':{
            type:Array,
            factory(){
                return []
            }
        },
        'TabHead':{
            type:Array,
            factory(){
                return []
            }
        },
        'tags':{
            type:Array,
            factory(){
                return []
            }
        },
        'delectNow':{ // 拖动之后是否删除之前的元素
            type:Boolean,
            default:true
        },
    },
    data() {
        return {
            name:'', // 当前拖动标签的innerText
            prop:'', // 当前拖动在表格中对应的prop
            DocId:'', //被拖动标签的Id
            leaveList:[], // 被拖动标签所在行的数据
            DragLeaveIndex:'', // 被拖动标签的Id，
            tabListSample:[
                {   
                    index:[1],
                    name:['小明'],
                    date:['2020-4-24']
                },
                {   
                    index:[2],
                    name:['小红'],
                    date:['2020-4-24']
                },
                {   
                    index:[3],
                    name:['小亮'],
                    date:['2020-4-24']
                }
            ]
        }
    },
    watch:{
        TabList(res){
            // console.log(res)
        },
        TabHead(){
            // console.log(res)
        }
    },
    methods:{
        Dragdrop(row, column, cell, event){
            if(this.name){
                if(this.prop){
                    if((this.prop == column.property)){
                        row[column.property].push(this.name)  //拖动插入
                        /**
                         * 如果【delectNow=true】拖完之后会在上一个单元格里删除此数据
                         * 反之
                         */
                        if(this.delectNow){
                            this.leaveList[column.property].splice(this.DragLeaveIndex,1)
                        }
                    }else{
                        this.$message.warning('只能纵向移动')
                    }
                }else{
                    row[column.property].push(this.name)
                }
            }
            this.name = ''
        },
        Dragdropleave(row, column, cell, event){
            if(this.DragLeaveIndex){   // 如果有下标，证明在表格内拖动
                this.leaveList = row   // 浅拷贝当前行的数据，以方便之后进行改动
            }
        },
        // 抬起插入
        up(res,prop){
            if(this.DocId){
                this.name = res // 当前拖动标签的innerText
                this.prop = prop // 当前拖动在表格中对应的prop
                var Drag = document.getElementById(this.DocId)
                Drag.style.position = 'static'
                this.DocId = ''
            }
        },
        //鼠标按下拖动
        down(e){
            // e.target.dataset.index
            this.DragLeaveIndex = e.target.dataset.index   // 这个值可以在39行（data-index）进行修改，表格外的tag标签无此属性，所以不会进行删除操作
            this.DocId = e.target.id
        },
        move(e){
            if(this.DocId){
                var Drag = document.getElementById(this.DocId)
                var X = e.clientX
                var Y = e.clientY
                Drag.style.position = 'fixed'
                Drag.style.zIndex = '999'
                Drag.style.left = X - (Drag.clientWidth/2) + 'px'
                Drag.style.top = Y - (Drag.clientHeight/2) + 'px'
            }else{
                this.name = ''
                this.prop = ''
            }
        },
        handleClose(val,list){
            list.splice(val,1)
        }
    }
}
</script>

<style scoped lang='scss'>

</style>
