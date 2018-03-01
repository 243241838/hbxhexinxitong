<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>红包规则ID:</span>
            <el-input v-model="listQuery.params.couponId" placeholder="红包规则ID" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>红包名称:</span>
            <el-input v-model="listQuery.params.couponName" placeholder="红包名称" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>红包金额:</span>
            <el-select v-model="listQuery.params.couponType" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in couponTypeArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <span>红包状态:</span>
            <el-select v-model="listQuery.params.timests" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in timestsArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
             <span>红包有效时间:</span>
            <el-date-picker v-model="listQuery.params.effTimestr" type="date" placeholder="起始时间" :editable="false" style="margin-right:10px;margin-bottom:10px;">
            </el-date-picker>至
            <el-date-picker v-model="listQuery.params.expTimestr" type="date" placeholder="结束时间" :editable="false" style="margin-left:10px;margin-bottom:10px;">
            </el-date-picker>
            <el-button class="filter-item"  type="primary" v-waves icon="search" @click="getList" style="margin-right:10px;margin-bottom:10px;">搜索</el-button>
            <el-button class="filter-item"  @click="reset"  icon="setting" v-waves style="margin-right:10px;margin-bottom:10px;">重置</el-button>
        </div>
       <div>
            <el-button type="primary" icon="plus" size="small" @click="add()">新增</el-button>
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作" width="100">
                    <template scope="scope">
                        <el-button @click="edit(scope.row.couponId)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button  v-show="scope.row.onOffLine=='作废'" @click="toVoid(scope.row.couponId)" type="text" size="small">
                            作废
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column align="center"  label="红包规则ID" width="160">
                     <template scope="scope">
                       <span style="cursor:pointer;color:#20a0ff " @click="seeGrantRecord(scope.row.couponId)">{{scope.row.couponId}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="couponName" label="红包名称"  width="160">
                </el-table-column>

                <el-table-column align="center"  label="红包金额（元）" width="180">
                    <template scope="scope">
                        {{scope.row.couponType==2?scope.row.couponMinValue/100:''}}
                        {{scope.row.couponType==3?(scope.row.couponMinValue/100+'-'+scope.row.couponMaxValue/100):''}}
                    </template>
                </el-table-column>

                <el-table-column align="center"  label="红包满减限制">
                    <template scope="scope">
                        {{scope.row.offUpto==0?'无限制':''}}
                        {{scope.row.couponType!=0?(scope.row.offUpto/100):''}}
                    </template>
                </el-table-column>

                <el-table-column align="center"    label="红包有效时间">
                    <template scope="scope">
                        {{scope.row.effTimestr+'至'+scope.row.expTimestr}}
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="domainStatus" label="红包状态" width="140">
                </el-table-column>

                <el-table-column align="center" prop="effTimestr" label="操作" width="140">
                    <template scope="scope">
                        <a class="operation-link" @click="seeGrantRecord(scope.row.couponId)" href="javascript:(0);" style="cursor:pointer;color:#20a0ff ">查看发放记录</a>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as util from '@src/utils/util';
    import * as  static_data from '@utils/static_data.js';

    export default {
        data() {
            return {
                listLoading: true,
                couponTypeArr:[{value:'',label:'全部'}].concat(static_data.couponTypeArr),
                timestsArr:[{value:'',label:'全部'}].concat(static_data.timestsArr),
                listQuery: { params: {
                    url: '/coupons/findCouponsList',
                    page: 1, size: 10,
                    couponClass: '',
                    couponId:'',
                    couponName:'',
                    couponType:'',
                    dir:'desc',
                    effTimestr:null,expTimestr:null,
                    order:'couponId',
                    timests:'2',
                    couponClass:'2'
                } },
                total: 0,
                dataList: []
            }
        },
        created() {
            this.getList();
        },
        methods: {
            //重置
            reset() {
                this.listQuery.params = {
                    url: '/coupons/findCouponsList',
                    page: 1, size: 10,
                    couponClass: '',
                    couponId:'',
                    couponName:'',
                    couponType:'',
                    dir:'desc',
                    effTimestr:null,expTimestr:null,
                    order:'couponId',
                    timests:'2',
                    couponClass:'2'};
            },
            handleSizeChange(val) {
                this.listQuery.params.size = val;
                this.getList();
            },
            handleCurrentPageChange(val) {
                this.listQuery.params.page = val;
                this.getList();
            },
            /*搜索列表信息*/
            getList() {
                this.listQuery.params.effTimestr = util.changeDate(this.listQuery.params.effTimestr);
                this.listQuery.params.expTimestr = util.changeDate(this.listQuery.params.expTimestr);

                config(this.listQuery.params).then(response => {
                    if (response.respCode === '000000') {
                        this.total = response.data.totalCount;
                        this.dataList = response.data.couponsRecordList;
                        var date = new Date();
                        for(var i=0;i<this.dataList.length;i++){
                            var startArray =  this.dataList[i].effTimestr.split("-");
                            var endArray =  this.dataList[i].expTimestr.split("-");
                            var startDt = new Date(startArray[0], startArray[1]*1-1, startArray[2].substring(0,2));
                            var endDt = new Date(endArray[0], endArray[1]*1-1, endArray[2].substring(0,2));

                            if(this.dataList[i].sts == 10 && date <= endDt){
                                this.dataList[i].onOffLine='作废';
                            }

                            var str = '';
                            if(date<startDt && this.dataList[i].sts != -10){
                                str = '未开始';
                            }else if(date > endDt || this.dataList[i].sts == -10){
                                str = '已结束';
                            }else{
                                str = '进行中';
                            }
                            this.dataList[i].domainStatus = str;
                        }

                        this.listLoading = false;
                    }
                }).catch(err => {
                    this.listLoading = true;
                    this.dataList = null;
                })
            },
            add(){
                this.$router.push({ path: '/operationManage/coupon/Management/add'})
            },
            edit(id){
                this.$router.push({ path: '/operationManage/coupon/Management/edit',query: { id: id } })
            },
            seeGrantRecord(id){
                this.$router.push({ path: '/operationManage/coupon/Management/grantRecord',query: { id: id }})
            },
            toVoid(id){
                let obj = {
                    url: 'coupons/deleteCoupons',
                    couponId: id
                }
                config(obj).then(response => {
                    if(response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                        this.getList();
                    }else{
                        this.$message.success(response.respMsg);
                    }
                }).catch(err => {

                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .app-container {
        margin: 10px 10px 0 10px;
    }

    .app-container .filter-container {
        margin-top: 20px;
    }

    .app-container .filter-container .rightData {
        margin-right: 100px;
    }
</style>