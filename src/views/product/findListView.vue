<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>产品ID:</span>
            <el-input v-model="listQuery.params.productId" placeholder="产品ID" style="width:200px;margin-right: 50px;"></el-input>
            <span>保险名称:</span>
            <el-input v-model="listQuery.params.productName" placeholder="保险名称" style="width:200px;margin-right: 50px;"></el-input>
            <span>承保公司:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.insurerId" placeholder="承保公司">
                <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId">
                </el-option>
            </el-select>
            <span>保险类别:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.classId" placeholder="保险类别">
                <el-option v-for="item in classList" :key="item.classId" :label="item.className" :value="item.classId">
                </el-option>
            </el-select>
            <span>审核状态:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.auditSts" placeholder="审核状态">
                <el-option v-for="item in auditStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
        </div>
        <div class="filter-container">
            <span>产品状态:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.sts1" placeholder="产品状态">
                <el-option v-for="item in productStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
            <span>保费范围:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.bettemoney" placeholder="保费范围">
                <el-option v-for="item in premiumArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="setting">重置</el-button>
        </div>
        <div class="filter-container">
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="plus" @click="goNewAdd">新增</el-button>
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="快速操作">
                    <template scope="scope">
                        <el-button @click="commis(scope.row.productId,scope.row.pointAmount,scope.row.commisionType,scope.row.commisionValue1,scope.row.commisionValue2,scope.row.productName)" type="text" size="small">
                            [佣金]
                        </el-button>
                        <el-button @click="updateStk(scope.row.productId,scope.row.totalQuantity,scope.row.maxQuantity,scope.row.productName)" type="text" size="small">
                            [库存]
                        </el-button>
                        <el-button @click="undercarriage(scope.row.productId,scope.row.productSts)" type="text" size="small" v-if="scope.row.productSts===10">
                            [下架]
                        </el-button>
                        <el-button @click="undercarriage(scope.row.productId,scope.row.productSts)" type="text" size="small" v-if="scope.row.productSts===-10">
                            [上架]
                        </el-button>
                        <el-button @click="Edit(scope.row.productId)" type="text" size="small">
                            [编辑]
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品ID">
                    <template scope="scope">
                        {{scope.row.productId}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险名称">
                    <template scope="scope">
                        <el-button @click="goDetail(scope.row.productId)" type="text" size="small">
                            {{scope.row.productName}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="承保公司">
                    <template scope="scope">
                        {{scope.row.insurerName}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险类别">
                    <template scope="scope">
                        <span>{{scope.row.className}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="总销量">
                    <template scope="scope">
                        <span>{{scope.row.totalQuantity}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="总库存">
                    <template scope="scope">
                        <span>{{scope.row.maxQuantity | maxQuantityFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保费金额(元)">
                    <template scope="scope">
                        <span>{{scope.row.minPremium}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="一级佣金">
                    <template scope="scope">
                        <span>{{scope.row.commisionValue1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="二级佣金">
                    <template scope="scope">
                        <span>{{scope.row.commisionValue2}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核状态">
                    <template scope="scope">
                        <span>{{scope.row.auditSts | auditStsFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品状态">
                    <template scope="scope">
                        <span>{{scope.row.productSts | productStsFilter}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改库存" :visible.sync="dialogFormVisible">
            <el-form :model="updateStockList.params" ref="updateStock">
                <el-form-item label="产品 I D:" label-width="220" required>
                    <el-input v-model="updateStockList.params.productId" auto-complete="off" style="width:400px;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="产品名称:" label-width="220" required>
                    <el-input v-model="updateStockList.params.productName" auto-complete="off" style="width:400px;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="总库存:" label-width="220" required>
                    <el-input v-model="updateStockList.params.maxQuantity" auto-complete="off" style="width:400px;" :disabled="checked"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="220">
                    <el-checkbox v-model="checked" @change="currentStock">不限</el-checkbox>
                </el-form-item>
                <el-form-item label="已分配库存:" label-width="220" required>
                    <el-input v-model="updateStockList.params.totalQuantity" auto-complete="off" style="width:400px;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="当前库存:" label-width="220" required>
                    <el-input v-model="updateStockList.params.currentStock" auto-complete="off" style="width:400px;" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateStock">保存</el-button>
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改佣金" :visible.sync="dialogFormVisible1">
            <el-form :model="commissionList.params" ref="newSort">
                <el-form-item label="产品 I D:" label-width="220" required>
                    <el-input v-model="commissionList.params.productId" auto-complete="off" style="width:400px;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="产品名称:" label-width="220" required>
                    <el-input v-model="commissionList.params.productName" auto-complete="off" style="width:400px;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="佣金比例:" label-width="220" required>
                    <el-input v-model="commissionList.params.commisionType" auto-complete="off" style="width:400px;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="一级佣金:" label-width="220" required>
                    <el-input v-model="commissionList.params.commisionValue1" auto-complete="off" style="width:400px;"></el-input>%
                </el-form-item>
                <el-form-item label="二级佣金:" label-width="220" required>
                    <el-input v-model="commissionList.params.commisionValue2" auto-complete="off" style="width:400px;"></el-input>%
                </el-form-item>
                <el-form-item label="积分设置:" label-width="220" required>
                    <el-input v-model="commissionList.params.pointAmount" auto-complete="off" style="width:400px;"></el-input>%
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="commission">保存</el-button>
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import config from '@api/config';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';

export default {
    data() {
        return {
            listLoading: true,
            pickTimeStart: '',
            pickTimeEnd: '',
            listQuery: { params: { url: 'product/findProductPage', page: 1, size: 10, auditSts: '', bettemoney: '', classId: '', insurerId: '', productId: '', productName: '', productSts: '' } },
            current: 1, // 默认显示第一页
            total: 0,
            dataList: [],
            premiumArr:[{value:'',label:'全部'},{value:'0-1',label:'0-1元'},{value:'1-10',label:'1-10元'},{value:'10-50',label:'10-50元'},{value:'50-100元',label:'50-100元'},{value:'100-1000000元',label:'100元及以上'},{value:'-1',label:'自定义'}],
            auditStatus: [{ code: 0, text: '等待审核' }, { code: 1, text: '审核通过' }, { code: -1, text: '审核不通过' }],
            codesValueStatus: [{ code: 0, text: '编辑状态' }, { code: 1, text: '新增待审核' }, { code: 2, text: '新增审核驳回' }, { code: 6, text: '修改待审核' }, { code: 7, text: '修改待审核驳回' }, { code: 10, text: '有效' }, { code: -10, text: '禁用' }],
            productStatus: [{ code: 0, text: '编辑状态' }, { code: 1, text: '新增待审核' }, { code: 2, text: '新增审核驳回' }, { code: 6, text: '修改待审核' }, { code: 7, text: '修改待审核驳回' }, { code: 10, text: '有效' }, { code: -10, text: '禁用' }],
            dialogVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible: false,
            poList: '', //保险公司下拉菜单
            classList: '', //保险类别下拉菜单
            commissionList: { params: { url: 'product/updateCommission', commisionType: '', commisionValue1: '', commisionValue2: '', pointAmount: '', productId: '', productName: '' } },
            updateStockList: { params: { url: 'product/updateStock', maxQuantity: '', totalQuantity: '', productId: '', productName: '', currentStock: '' } },
            checked:false, //不限单选框
        }
    },
    computed: {
    },
    created() {
        this.getApplyList();
        this.getList();
        this.getClassList();
    },
    mounted() {

    },
    methods: {
        //重置
        reset() {
            this.listQuery.params.auditSts = "";
            this.listQuery.params.bettemoney = "";
            this.listQuery.params.classId = "";
            this.listQuery.params.insurerId = "";
            this.listQuery.params.productId = "";
            this.listQuery.params.productName = "";
            this.listQuery.params.productSts = "";
        },
        //佣金按钮
        commis(val, val1, val2, val3, val4, val5) {
            this.commissionList.params.productId = val;
            this.commissionList.params.pointAmount = val1;
            this.commissionList.params.commisionType = val2;
            this.commissionList.params.commisionValue1 = val3;
            this.commissionList.params.commisionValue2 = val4;
            this.commissionList.params.productName = val5;
            this.dialogFormVisible1 = true;
        },
        //佣金
        commission() {
            if (!this.commissionList.params.pointAmount) {
                this.$message.error('积分设置不能为空！');
                return false;
            }
            if (!this.commissionList.params.commisionValue1) {
                this.$message.error('一级佣金不能为空！');
                return false;
            }
            if (!this.commissionList.params.commisionValue2) {
                this.$message.error('二级佣金不能为空！');
                return false;
            }
            config(this.commissionList.params).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.getApplyList();
                    this.dialogFormVisible1 = false;
                } else {
                    this.$message.error(response.respMsg);
                }
                this.dialogFormVisible1 = false;
            })
        },
        //修改库存按钮
        updateStk(val, val1, val2, val3, val4, val5) {
            this.updateStockList.params.productId = val;
            this.updateStockList.params.totalQuantity = val1;
            this.updateStockList.params.maxQuantity = val2;
            this.updateStockList.params.productName = val3;
            this.dialogFormVisible = true;
        },
        //不限复选框下拉框
        currentStock() {
            if(this.checked) {
                this.updateStockList.params.maxQuantity = -1;
            }
            if (this.updateStockList.params.maxQuantity === -1) {
                this.updateStockList.params.currentStock = this.updateStockList.params.maxQuantity;
            } else {
                this.updateStockList.params.currentStock = this.updateStockList.params.maxQuantity - this.updateStockList.params.totalQuantity;
            }
        },
        //修改库存
        updateStock() {
            if (!this.updateStockList.params.maxQuantity) {
                this.$message.error('总库存不能为空！');
                return false;
            }
            if(this.checked) {
                this.updateStockList.params.maxQuantity = -1;
            }
            if (this.updateStockList.params.maxQuantity === -1) {
                this.updateStockList.params.currentStock = this.updateStockList.params.maxQuantity;
            } else {
                this.updateStockList.params.currentStock = this.updateStockList.params.maxQuantity - this.updateStockList.params.totalQuantity;
            }
            config(this.updateStockList.params).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.getApplyList();
                   
                } else {
                    this.$message.error(response.respMsg);
                }
                this.dialogFormVisible = false;
            })
        },
        //前往编辑页面
        Edit(productId) {
            this.$router.push({path:'/product/findListViewEdit',query:{productId: productId}});
        },
        //前往编辑页面
        goNewAdd() {
            this.$router.push({path:'/product/findListViewAdd'});
        },
        //表格默认事件
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleSizeChange(val) {
            this.listQuery.params.size = val;
            this.getApplyList();
        },
        handleCurrentPageChange(val) {
            this.listQuery.params.page = val;
            this.getApplyList();
        },
        //保险公司下拉菜单
        getList() {
            let obj = {
                url: 'insurer/findAll',
                parentId: 0
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.poList = response.data.insurersList;
                }
            }).catch(err => {

            })
        },
        //保险类别下拉菜单
        getClassList() {
            let obj = {
                url: 'product/param/findProductClasses',
                parentId: 0,
                classType: 2
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.classList = response.data;
                }
            }).catch(err => {

            })
        },
        //前往个险产品详情
        goDetail(value) {
            this.$router.push({ path: '/product/personInsuranceProDetail', query: { productId: value } });
        },
        /*搜索列表信息*/
        getApplyList() {
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
        //下架上架
        undercarriage(val, val1) {
            let obj = {
                url: 'product/updateSts',
                productId: val,
                productSts: val1
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                } else {
                    this.$message.error(response.respMsg);
                }
                this.getApplyList();
            }).catch(err => {

            })
        }
    },
    filters: {
        //产品状态
        productStsFilter(value) {
            if (value === 10) {
                return '有效';
            } else if (value === -10) {
                return '禁用';
            } else if (value === 7) {
                return '修改待审核驳回';
            } else if (value === 6) {
                return '修改待审核';
            } else if (value === 2) {
                return '新增审核驳回';
            } else if (value === 1) {
                return '新增待审核';
            } else if (value === 0) {
                return '编辑状态';
            } else {
                return value;
            }
        },
        //审核状态
        auditStsFilter(value) {
            if(value===0) {
                return '等待审核';
            } else if (value===1) {
                return '审核通过';
            } else if (value===-1) {
                return '审核不通过';
            } else {
                return value;
            }
        },
        //库存
        maxQuantityFilter(value) {
            if(value===-1) {
                return '不限';
            } else {
                return value;
            }
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