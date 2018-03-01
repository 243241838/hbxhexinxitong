<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <h3 class="title">产品基本信息</h3>
            <el-form v-loading="dialogLoading">
                <el-form-item label="产品ID:" label-width="220">
                    <span>{{dataList.productPo.productId}}</span>
                </el-form-item>
                <el-form-item label="产品名称:" label-width="220">
                    <span>{{dataList.productPo.productName}}</span>
                </el-form-item>
                <el-form-item label="产品亮点1:" label-width="220">
                    <span>{{dataList.productPo.productFeature}}</span>
                </el-form-item>
                <el-form-item label="产品亮点2:" label-width="220">
                    <span>{{dataList.productPo.perferWords}}</span>
                </el-form-item>
                <el-form-item label="产品图片:" label-width="220">
                    <img :src="dataList.productPo.productLogo" alt="" v-if="dataList.productPo.productLogo" style="width：120px;height:120px;">
                    <span v-else>暂无图片</span>
                </el-form-item>
                <el-form-item label="产品标签:" label-width="220">
                    <img :src="dataList.productPo.productTagUrls" alt="" v-if="dataList.productPo.productTagUrls" style="width：120px;height:120px;">
                    <span v-else>暂无图片</span>
                </el-form-item>
                <el-form-item label="承保公司:" label-width="220">
                    <span>{{dataList.productPo.insurerName}}</span>
                </el-form-item>
                <el-form-item label="保险类别:" label-width="220">
                    <span>{{dataList.productPo.className}}</span>
                </el-form-item>
                <el-form-item label="产品基准销量:" label-width="220">
                    <span>{{dataList.productPo.baselineQuantity}}</span>
                </el-form-item>
                <el-form-item label="订单允许支付时间:" label-width="220">
                    <span>{{dataList.productPo.payTime}}</span>
                </el-form-item>
                <el-form-item label="商业险一级佣金:" label-width="220">
                    <span>{{dataList.productPo.commisionValue1}}</span>
                </el-form-item>
                <el-form-item label="商业险二级佣金:" label-width="220">
                    <span>{{dataList.productPo.commisionValue2}}</span>
                </el-form-item>
                <el-form-item label="交强险一级佣金:" label-width="220">
                    <span>{{dataList.productPo.vehicleCommisionValue1}}</span>
                </el-form-item>
                <el-form-item label="交强险二级佣金:" label-width="220">
                    <span>{{dataList.productPo.vehicleCommisionValue2}}</span>
                </el-form-item>
                <el-form-item label="产品有效期:" label-width="220">
                    <span>{{dataList.productPo.effTime | timeFilter}} 至 {{dataList.productPo.expTime | timeFilter}}</span>
                </el-form-item>
                <el-form-item label="保险条款:" label-width="220">
                    <a :href="dataList.productPo.insuranceTerms" target="_Blank" v-if="dataList.productPo.insuranceTerms">{{dataList.productPo.insuranceTerms}}</a>
                    <!-- <span>{{dataList.productPo.insuranceTerms}}</span> -->
                </el-form-item>
                <el-form-item label="温馨提示:" label-width="220">
                    <span>{{dataList.productPo.productPrompt}}</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="filter-container">
            <h3 class="title">产品保障信息</h3>
            <div v-for="(item,index) in dataList.productPlansList" :key="index" style="padding-left:50px;">
                <div>计划名称：{{item.planName}}</div>
                <div v-for="(list,index) in item.planBenefitsList" :key="index" style="padding-left:100px;">
                    <span style="padding-left:50px;">{{list.benefitName}}</span>
                    <el-checkbox style="padding-left:50px;" v-model="checked" v-if="list.franchiseFlag===0||list.franchiseFlag===1">不计免赔</el-checkbox>
                    <span style="padding-left:50px;">{{list.insuredAmount}}</span>
                    <span style="padding-left:50px;">
                        <span v-if="list.insuredAmount === '1'">投保</span>
                        <span v-else-if="list.insuredAmount === '0'">不投保</span>
                        <span v-else>{{list.insuredAmount}}</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="filter-container">
            <h3 class="title">审核信息</h3>
        </div>
        <el-table :data="orderList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="提交时间">
                <template scope="scope">
                    {{scope.row.reqTime1}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作员">
                <template scope="scope">
                    {{scope.row.reqNickname}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="审核结果">
                <template scope="scope">
                    {{scope.row.auditSts | auditStsFilter}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="审核时间">
                <template scope="scope">
                    <span>{{scope.row.auditTime1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="审核人">
                <template scope="scope">
                    <span>{{scope.row.auditNickname}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="备注">
                <template scope="scope">
                    <span>{{scope.row.auditComment}}</span>
                </template>
            </el-table-column>
        </el-table>
        
        <div v-show="orderList" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- <iframe :src="dataList.productPo.insuranceTerms" frameborder="0" v-if="dataList.productPo.insuranceTerms"></iframe> -->
    </div>
</template>
<script>
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';
import uploadImg from '@components/uploadImg.vue';
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            listLoading: false,
            dialogLoading: false,
            pickTimeStart: '',
            pickTimeEnd: '',
            listQuery: { params: { url: 'productaudit/findproductauditlog', bizId: '', page: 1, size: 10, } },
            current: 1, // 默认显示第一页
            total: 0,
            checked: true,
            dataList: [],
            orderList: [],
            //fileList: [{ name: '', url: '' }]
        }
    },
    computed: {
    },
    created() {
        this.listQuery.params.insurerId = this.$route.query.insurerId;
        this.getApplyList();
        this.getDetailInfo();
    },
    mounted() {
    },
    methods: {
        /*搜索列表信息*/
        getApplyList() {
            this.listQuery.params.bizId = this.$route.query.productId;
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.listLoading = false;
                    this.orderList = response.data.logPoList;
                    this.total = response.data.total;
                }

            }).catch(err => {
                this.listLoading = true;
                this.orderList = null;
            })
        },
        //表格默认时间
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
        /*获取详情信息*/
        getDetailInfo() {
            let obj = {
                url: 'product/carProductDetail',
                productId: this.$route.query.productId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.total = response.data.total;
                    this.listLoading = false;
                    this.dataList = response.data;
                }

            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
    },
    filters: {
        //审核结果
        auditStsFilter(value) {
            if (value === 0) {
                return '待审核';
            } else if (value === 1) {
                return '审核通过';
            } else if (value === -1) {
                return '审核未通过';
            } else {
                return value;
            }
        },
        //时间过滤
        timeFilter(val) {
            var date = new Date(val);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
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

.app-container .filter-container .title {
    margin-left: 18px;
    height: 43px;
    line-height: 43px;
    font-size: 14px;
    color: #3498da;
    font-weight: bold;
    border-bottom: 1px solid #e4e9eb;
}

.app-container .filter-container .rightData {
    margin-right: 100px;
}
</style>