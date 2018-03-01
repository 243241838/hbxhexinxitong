<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>赠险ID：</span>
            <el-input v-model="listQuery.params.couponId" placeholder="" style="   width:200px;margin-right: 50px;"></el-input>
            <span>赠险产品名称：</span>
            <el-input v-model="listQuery.params.couponName" placeholder="" style="width:200px;margin-right: 50px;"></el-input>

            <span>赠险份数：</span>
            <el-select v-model="listQuery.params.quantity" placeholder="请选择">
                <el-option v-for="item in giveQuantityArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <span>赠险状态：</span>
            <el-select v-model="listQuery.params.timests" placeholder="请选择">
                <el-option v-for="item in redTimestsArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="filter-container">
            <span>赠险时间:</span>
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

                <el-table-column align="center" prop="couponId" label="赠险ID">
                </el-table-column>

                <el-table-column align="center" prop="productName" label="赠险产品名称">
                </el-table-column>

                <el-table-column align="center" prop="couponName" label="保险名称">
                </el-table-column>

                <el-table-column align="center" prop="maxQuantity" label="赠险份数">
                </el-table-column>

                <el-table-column align="center" prop="effTimestr"  label="赠险开始时间">
                </el-table-column>

                <el-table-column align="center" prop="expTimestr"  label="赠险结束时间">
                </el-table-column>

                <el-table-column align="center" prop="sts" label="赠险状态">
                </el-table-column>

            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
                listQuery: {params: {url: '/coupons/findCouponsList', page: 1, size: 10,
                    minGiveQuantity: '', maxGiveQuantity: '',expTimestr:'',effTimestr:'',
                    dir:'',couponName:'',couponId:'',couponClass:'3',
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
                this.listQuery.params = {url: '/coupons/findCouponsList', page: 1, size: 10,
                    minGiveQuantity: '', maxGiveQuantity: '',expTimestr:'',effTimestr:'',
                    dir:'',couponName:'',couponId:'',couponClass:'3',
                    order:'',quantity:'',timests:'2'}
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
                if(this.listQuery.params.quantity=='0'){
                    this.listQuery.params.quantity='0'
                }else if(this.listQuery.params.quantity=='1'){
                    this.listQuery.params.maxGiveQuantity='1000',
                        this.listQuery.params.minGiveQuantity='4999'
                    this.listQuery.params.quantity='1'
                }else if(this.listQuery.params.quantity=='2'){
                    this.listQuery.params.maxGiveQuantity='5000',
                        this.listQuery.params.minGiveQuantity='9999'
                    this.listQuery.params.quantity='1'
                }else if(this.listQuery.params.quantity=='3'){
                    this.listQuery.params.maxGiveQuantity='10000',
                        this.listQuery.params.minGiveQuantity='19999'
                    this.listQuery.params.quantity='1'
                }

                this.listQuery.params.effTimestr = util.changeDate(this.listQuery.params.effTimestr);
                this.listQuery.params.expTimestr = util.changeDate(this.listQuery.params.expTimestr);

                config(this.listQuery.params).then(response => {
                    if (response.respCode === '000000') {
                        this.total = response.data.totalCount;
                        this.listLoading = false;
                        console.log(response);
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
