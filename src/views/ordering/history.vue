<template>
    <div>
        <el-row :gutter="12">
			<el-col :span="8" v-for="(item,index) in deskList" :key="index" class="hand food-card">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>{{item.deskNum}}</span>
						<span style="float: right; padding: 3px 0">{{item.endTime | GMTToStr}}</span>
					</div>
					<div class="height scrollStyle">
						<p v-for="(itm,ind) in item.selectList" :key="ind" class="text">
							<span>菜名：</span>
							<span class="food-num">{{itm.num}}份</span>
							<span class="food-name">{{itm.foodName}}--{{itm.price}}/份</span>
							<p class="clear"></p>
						</p>
					</div>
					<div style="text-align: right">
						总价：{{item.priceAll}}元
					</div>
				</el-card>

			</el-col>
		</el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                deskList: []
            }
        },
        methods:{
            getHistory(){
                var _this = this
                _this.$get(_this.utilMap.apis.getHistory).then((res)=>{
                    let data = res.data
                    for(var i=0; i<data.length; i++){
                        data[i].selectList = JSON.parse(data[i].selectList)
                    }
                    this.deskList = res.data
                })
            }
        },
        mounted(){
            this.getHistory()
        }
    }
</script>

<style lang="scss" scoped>
.el-col{
	margin-bottom: 15px;
}
</style>