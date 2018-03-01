<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>产品ID:</span>
            <el-input v-model="listQuery.params.productId" placeholder="" style="   width:200px;margin-right: 50px;"></el-input>
            <span>保险名称:</span>
            <el-input v-model="listQuery.params.productName" placeholder="" style="width:200px;margin-right: 50px;"></el-input>

            <span>承保公司:</span>
            <el-select v-model="listQuery.params.insurerId" placeholder="请选择">
                <el-option v-for="item in insurerIdArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <span>保险类别:</span>
            <el-select v-model="listQuery.params.classId" placeholder="请选择">
                <el-option v-for="item in classIdArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="filter-container">
            <span>审核状态:</span>
            <el-select v-model="listQuery.params.auditSts" placeholder="请选择">
                <el-option v-for="item in prodAuditStsArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <span>保费范围:</span>
            <el-select v-model="listQuery.params.bettemoney" placeholder="请选择">
                <el-option v-for="item in betteMoneyArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>

            <el-input v-show="listQuery.params.bettemoney==6" v-model="listQuery.params.minProducePrice" placeholder="" style="width:100px;"></el-input>
            至
            <el-input v-show="listQuery.params.bettemoney==6" v-model="listQuery.params.maxProducePrice" placeholder="" style="width:100px;"></el-input>


            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getList">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="reset">重置</el-button>
        </div>
        <div class="filter-container" v-if="selectType=='single'">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="productId" label="产品ID">
                </el-table-column>

                <el-table-column align="center" prop="productName" label="保险名称">
                </el-table-column>

                <el-table-column align="center" prop="insurerName" label="承保公司">
                </el-table-column>

                <el-table-column align="center" prop="className" label="保险类别">
                </el-table-column>

                <el-table-column align="center"  label="当前库存">
                    <template scope="scope">
                        <span>{{scope.row.maxQuantity==-1?'不限':scope.row.maxQuantity}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center"  label="保险金额(元）">
                    <template scope="scope">
                        <span>{{scope.row.sumInsured/100}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="commisionValue1" label="一级佣金">
                </el-table-column>

                <el-table-column align="center" prop="commisionValue2" label="二级佣金">
                </el-table-column>

                <el-table-column align="center"  label="审核状态">
                    <template scope="scope">
                            <span v-for="item in prodAuditStsArr"  v-show="item.value == scope.row.auditSts" >
                                    {{item.label}}
                            </span>
                    </template>
                </el-table-column>

                <el-table-column align="center"  label="产品状态">
                    <template scope="scope">
                            <span v-for="item in prodSts1StsArr"  v-show="item.value == scope.row.sts1" >
                                    {{item.label}}
                            </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--- 多选-->
        <div class="filter-container" v-if="selectType=='multiple'">
            <el-table :data="dataList" v-loading="listLoading" border fit
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
               </el-table-column>

                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="productId" label="产品ID">
                </el-table-column>

                <el-table-column align="center" prop="productName" label="保险名称">
                </el-table-column>

                <el-table-column align="center" prop="insurerName" label="承保公司">
                </el-table-column>

                <el-table-column align="center" prop="className" label="保险类别">
                </el-table-column>

                <el-table-column align="center" prop="className" label="总库存">
                    <template scope="scope">
                        <span>{{scope.row.maxQuantity==-1?'不限':(scope.row.maxQuantity+scope.row.totalQuantity)}}</span>
                    </template>
                </el-table-column>


                <el-table-column align="center"  label="当前库存">
                    <template scope="scope">
                        <span>{{scope.row.maxQuantity==-1?'不限':scope.row.maxQuantity}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center"  label="保险金额(元）">
                    <template scope="scope">
                        <span>{{scope.row.minPremium/100+'-'+scope.row.maxPremium/100}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="commisionValue1" label="一级佣金">
                </el-table-column>

                <el-table-column align="center" prop="commisionValue2" label="二级佣金">
                </el-table-column>

                <el-table-column align="center"  label="审核状态">
                    <template scope="scope">
                        <span v-for="item in prodAuditStsArr"  v-show="item.value == scope.row.auditSts" >
                                {{item.label}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column align="center"  label="产品状态">
                    <template scope="scope">
                        <span v-for="item in prodSts1StsArr"  v-show="item.value == scope.row.sts1" >
                                {{item.label}}
                        </span>
                    </template>
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

    export default {
        data() {
            return {
                listLoading: true,
                listQuery: {params: {url: '/product/findProductPage', page: 1, size: 10,
                    auditSts: '', bettemoney: '',productId:'',productName:'',
                    classId:'',insurerId:'',maxProducePrice:'',minProducePrice:''}},
                total: 0,
                dataList: [],
                prodAuditStsArr: [{value:'',label:'全部'}].concat(static_data.prodAuditStsArr),
                prodSts1StsArr:static_data.prodSts1StsArr,
                betteMoneyArr: [{value:'',label:'全部'}].concat(static_data.betteMoneyArr),
                classIdArr:[{value:'',label:'全部'}],//保险类别
                insurerIdArr:[{value:'',label:'全部'}],//承保公司
                currentRow: []
            }
        },
        props: {
            selectType: {  // 父组件传过来的，决定组件是单选还是多选
                type: String
            }
        },
        created() {
            this.acqClassIdArr();
            this.acqInsurerId();
            this.getList();
        },
        methods: {
            acqClassIdArr(){
                let obj = {
                    url: '/product/param/findProductClasses'
                }
                config(obj).then(response => {
                    if (response.respCode == '000000') {
                        for(var i=0;i<response.data.length;i++) {
                            this.classIdArr.push({
                                value:response.data[i].classId,
                                label:response.data[i].className
                            });
                        }
                    } else {
                        this.$message.error(response.respMsg)
                    }

                }).catch(err => {

                })
            },
            acqInsurerId(){
                let obj = {
                    url: '/insurer/findAll'
                }
                config(obj).then(response => {
                    if (response.respCode == '000000') {
                        for(var i=0;i<response.data.insurersList.length;i++) {
                            this.insurerIdArr.push({
                                value:response.data.insurersList[i].insurerId,
                                label:response.data.insurersList[i].insurerName
                            });
                        }
                    } else {
                        this.$message.error(response.respMsg)
                    }

                }).catch(err => {

                })
            },
            //重置
            reset() {
                this.listQuery.params = {url: '/product/findProductPage', page: 1, size: 10,
                    auditSts: '', bettemoney: '',productId:'',productName:'',
                    classId:'',insurerId:'',maxProducePrice:'',minProducePrice:''};
            },
            //表格默认时间
            handleCurrentChange(val) {
                this.currentRow = [];
                this.currentRow =  this.currentRow.concat(val);
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
                config(this.listQuery.params).then(response => {
                    if (response.respCode === '000000') {
                        this.total = response.data.total;
                        this.listLoading = false;
                        this.dataList = response.data.productList;
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