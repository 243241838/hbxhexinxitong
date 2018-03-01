<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>红包规则ID：</span>
            <el-input v-model="listQuery.params.couponId" placeholder="" style="   width:200px;margin-right: 50px;"></el-input>
            <span>红包名称：</span>
            <el-input v-model="listQuery.params.couponName" placeholder="" style="width:200px;margin-right: 50px;"></el-input>

            <span>红包金额：</span>
            <el-select v-model="listQuery.params.couponType" placeholder="请选择">
                <el-option v-for="item in couponTypeArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <span>红包发放状态：</span>
            <el-select v-model="listQuery.params.timests" placeholder="请选择">
                <el-option v-for="item in redTimestsArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="filter-container">
            <span>红包使用时间:</span>
            <el-date-picker v-model="listQuery.params.effTimestr" type="date" placeholder="起始时间" :editable="false" >
            </el-date-picker>-
            <el-date-picker v-model="listQuery.params.expTimestr" type="date" placeholder="结束时间" :editable="false" >
            </el-date-picker>

            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getList">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="reset">重置</el-button>
        </div>
        <div class="filter-container" >
            <el-table :data="dataList" v-loading="listLoading" border fit
                      style="width: 100%"  @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="couponId" label="红包规则ID">
                </el-table-column>

                <el-table-column align="center" prop="couponName" label="红包名称">
                </el-table-column>

                <el-table-column align="center" prop="couponValue" label="红包金额（元）">
                </el-table-column>

                <el-table-column align="center" prop="offUpto" label="红包满减限制">
                </el-table-column>

                <el-table-column align="center"  label="红包使用时间">
                    <template scope="scope">
                        <span>{{scope.row.effTimestr+'-'+scope.row.expTimestr}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="sts"  label="红包发放状态">
                </el-table-column>

            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange"
                           :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]"
                           :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <div style="text-align:center">
            <el-button type="primary" @click="choose()">确 定</el-button>
            <el-button type="primary" @click="cancel()">取 消</el-button>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as  static_data from '@utils/static_data.js';
    import * as  util from '@src/utils/util';

    export default {
        data() {
            return {
                listLoading: true,
                giveQuantityArr:[{value:'',label:'全部'}].concat(static_data.giveQuantityArr),
                redTimestsArr:[{value:'0',label:'全部'}].concat(static_data.redTimestsArr),
                couponTypeArr:[{value:'0',label:'全部'}].concat(static_data.couponTypeArr),
                listQuery: {params: {url: '/coupons/findCouponsList', page: 1, size: 10,
                    minGiveQuantity: '', maxGiveQuantity: '',expTimestr:'',effTimestr:'',
                    dir:'',couponName:'',couponId:'',couponClass:'2',
                    order:'',quantity:'',timests:'2'}},
                total: 0,
                dataList: [],
                currentRow: []
            }
        },
        props: {
            selectType: {  // 父组件传过来的，决定组件是单选还是多选
                type: String
            }
        },
        created() {
            this.getList();
        },
        methods: {
            //重置
            reset() {
                this.listQuery.params ={url: '/coupons/findCouponsList', page: 1, size: 10,
                    minGiveQuantity: '', maxGiveQuantity: '',expTimestr:'',effTimestr:'',
                    dir:'',couponName:'',couponId:'',couponClass:'2',
                    order:'',quantity:'',timests:'2'};
            },
            handleSelectionChange(val){
                console.log(val);
                this.currentRow = val;
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
                        this.listLoading = false;

                        var that  = this;
                        var nowDate = new Date();
                        response.data.couponsRecordList.forEach(function (vi) {
                            var startArray =  vi.effTimestr.split("-");
                            var endArray = vi.expTimestr.split("-");
                            var startDt = new Date(startArray[0], startArray[1]*1-1, startArray[2].substring(0,2));
                            var endDt = new Date(endArray[0], endArray[1]*1-1, endArray[2].substring(0,2));
                            var str = '';
                            if(vi.sts == 10){
                                if(nowDate<startDt){
                                    str = '未开始';
                                }else if(nowDate > endDt){
                                    str = '已结束';
                                }else{
                                    str = '进行中';
                                }

                            } else {
                                str = '已作废';
                            }
                            vi.sts =str;
                            vi.offUpto = vi.offUpto == 0?'无限制':(vi.offUpto / 100);
                            vi.couponValue = (vi.couponType==2?(vi.couponMinValue/100):(vi.couponMinValue / 100 + "-"
                            + vi.couponMaxValue / 100));

                        })
                        this.dataList = response.data.couponsRecordList;

                    }

                }).catch(err => {
                    this.listLoading = true;
                    this.dataList = null;
                })
            },
            choose(){
                if(this.currentRow.length==0){
                    this.$message.error("至少选择一个产品");
                    return;
                }
                //防止页面 弹出页面和父页面 产品对应一致,
                // 导致点击子页面选中产品时， 父页面变化
                var selectRow = [];
                this.currentRow.forEach(function(v) {
                    selectRow.push(v);
                });

                this.$emit('child-geiIds',selectRow);
            },
            cancel(){
                this.$emit('child-cancle');
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