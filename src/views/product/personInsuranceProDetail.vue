<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <h3 class="title">产品基本信息</h3>
            <el-form label-width="150px">
                <el-form-item label="产品ID:">
                    <span>{{dataList.productId}}</span>
                </el-form-item>
                <el-form-item label="产品名称:">
                    <span>{{dataList.productName}}</span>
                </el-form-item>
                <el-form-item label="产品亮点1:">
                    <span>{{dataList.productFeature}}</span>
                </el-form-item>
                <el-form-item label="产品亮点2:">
                    <span>{{dataList.perferWords}}</span>
                </el-form-item>
                <el-form-item label="产品图片:">
                    <img :src="dataList.productLogo" alt="" v-if="dataList.productLogo" width="120" height="120">
                </el-form-item>
                <el-form-item label="产品标签:">
                    <img :src="dataList.productTagUrls" alt="" v-if="dataList.productTagUrls" width="120" height="120">
                </el-form-item>
                <el-form-item label="承保公司:">
                    <span>{{dataList.insurerName}}</span>
                </el-form-item>
                <el-form-item label="保险类别:">
                    <span>{{dataList.className}}</span>
                </el-form-item>
                <el-form-item label="总库存:">
                    <span v-if="dataList.maxQuantity!=-1">{{dataList.maxQuantity}}</span>
                    <span v-else>不限</span>
                </el-form-item>
                <el-form-item label="产品基准销量:">
                    <span>{{dataList.baselineQuantity}}</span>
                </el-form-item>
                <el-form-item label="一级佣金:">
                    <span>{{dataList.commisionValue1}}%</span>
                </el-form-item>
                <el-form-item label="二级佣金:">
                    <span>{{dataList.commisionValue2}}%</span>
                </el-form-item>
                <el-form-item label="积分设置:">
                    <span>{{dataList.pointAmount}}%</span>
                </el-form-item>
                <el-form-item label="能否使用积分:">
                    <span>{{dataList.payPointUsage}}%</span>
                </el-form-item>
                <el-form-item label="产品有效期:">
                    <span>{{dataList.effTime | parseTime('{y}-{m}-{d}')}}</span>至
                    <span>{{dataList.expTime | parseTime('{y}-{m}-{d}')}}</span>
                </el-form-item>
                <el-form-item label="生效方式:">
                    <span>{{dataList.effectiveType | effectiveTypeFilter}}</span>
                </el-form-item>
                <el-form-item label="用户可选起保时间:">
                    <span>{{dataList.endTimeNum}}</span>
                    <span>{{dataList.endTimeUnit | endTimeUnitFilter}}</span>
                </el-form-item>
                <el-form-item label="订单允许支付时间:">
                    <span>{{dataList.payTime}}</span>
                    <span>{{dataList.payTimeUnit | ageFilter}}</span>
                </el-form-item>
                <el-form-item label="投被保人关系限制:">
                    <span>{{dataList.relationshipLimit}}</span>
                </el-form-item>
                <el-form-item label="承保年龄:">
                    <span v-for="(item,index) in dataList.ageList" :key="index">

                        <span>{{item.minAge}}</span>
                        <span>{{item.minAgeUnit | ageFilter}}</span> -
                        <span>{{item.maxAge}}</span>
                        <span>{{item.maxAgeUnit | ageFilter}}</span>
                    </span>
                </el-form-item>
                <el-form-item label="被保人性别限制:">
                    <span>{{dataList.genderLimit | genderLimitFilter}}</span>
                </el-form-item>
                <el-form-item label="最高职业类别:">
                    <span>{{dataList.occupationClass | codesValueFilter}}</span>
                </el-form-item>
                <el-form-item label="适用人群:">
                    <span>{{dataList.suitablePeople}}</span>
                </el-form-item>
                <el-form-item label="保险条款:">
                    <a :href="dataList.insuranceTerms" target="_Blank">{{dataList.insuranceTerms}}</a>
                </el-form-item>
                <el-form-item label="温馨提示:">
                    <span v-html="dataList.productPrompt"></span>
                </el-form-item>
                <el-form-item label="投保须知:">
                    <span v-html="dataList.productStatement"></span>
                </el-form-item>
                <el-form-item label="理赔流程:">
                    <span v-html="dataList.claimsGuide"></span>
                </el-form-item>
                <el-form-item label="产品问答:">
                    <span v-html="dataList.productQa"></span>
                </el-form-item>
                <el-form-item label="产品案例:">
                    <span v-html="dataList.productCase"></span>
                </el-form-item>
                <el-form-item label="产品优势:">
                    <img :src="dataList.productAdvantage" alt="" v-if="dataList.productAdvantage" width="120" height="120">
                </el-form-item>
                <el-form-item label="产品详情:">
                    <span v-html="dataList.productDesc"></span>
                </el-form-item>

            </el-form>
        </div>
        <!-- .planBenefitsList -->
        <div class="filter-container">
            <h3 class="title">产品保障信息</h3>
            <el-form label-width="150px">
                <el-form-item label="产品详情:">
                    <div class="filter-container" v-for="(item,index) in productPlansList" :key="index">
                        <div>计划名称:{{item.planName}}</div>
                        <div>保障名称:{{item.planBenefitsList[0].benefitName}}</div>
                        <div>保额:{{item.planBenefitsList[0].insuredAmount}}</div>
                        <div>保障详情:{{item.planBenefitsList[0].benefitDesc}}</div>
                    </div>
                </el-form-item>
                <el-form-item label="计价因子:">
                    {{dataList.priceElements}}
                </el-form-item>
                <el-form-item label="保障期限:">
                    {{dataList.guaranteePeriod}}
                </el-form-item>
                <el-form-item label="保费配置:">
                    <div class="filter-container">
                        <el-table :data="productPricesList" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                            <el-table-column align="center" label="价格关键字">
                                <template scope="scope">
                                    {{scope.row.priceKeyword}}
                                </template>
                            </el-table-column>
                            <!-- <el-table-column align="center" label="计价因子" >
                                            <template scope="scope">
                                                {{scope.row.productCount}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" label="保障期限" >
                                            <template scope="scope">
                                                {{scope.row.productCount}}
                                            </template>
                                        </el-table-column> -->
                            <el-table-column align="center" label="结算价格">
                                <template scope="scope">
                                    {{scope.row.settAmount}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="保费">
                                <template scope="scope">
                                    {{scope.row.productPremium}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="计划代码">
                                <template scope="scope">
                                    {{scope.row.domainPlanCode}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="渠道产品代码">
                                <template scope="scope">
                                    {{scope.row.productCode}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import config from '@api/config';
import { parseTime } from '@filters/index.js';
export default {
    data() {
        return {
            listQuery: { params: { url: 'product/productDetail', productId: this.$route.query.productId ? this.$route.query.productId : null } },
            dataList: [],
            productPlansList: [],
            productPricesList: []
        }
    },
    created() {
        this.getApplyList();
    },
    computed: {
    },
    methods: {
        /*获取详情信息*/
        getApplyList() {
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.dataList = response.data.productPo;
                    this.dataList.priceElements = JSON.parse(this.dataList.priceElements).price_element[0].name + ':' + JSON.parse(this.dataList.priceElements).price_element[0].option;
                    this.productPlansList = response.data.productPlansList;
                    this.productPricesList = response.data.productPricesList;
                    let str = ''
                    //console.log(JSON.parse(this.dataList.relationshipLimit));
                    let str1 = '';
                    this.dataList.guaranteePeriod.split(';').forEach((item, index) => {
                        console.log(item.split('_')[0]);
                        str1 += item.split('_')[0] + ';';
                    })
                    this.dataList.guaranteePeriod = str1;
                    if (this.dataList.relationshipLimit) {
                        JSON.parse(this.dataList.relationshipLimit).forEach((item, index) => {
                            if (item) {
                                str = str + item.name + ';';
                            }
                        })
                        this.dataList.relationshipLimit = str;
                    } else {
                        this.dataList.relationshipLimit = '不限';
                    }

                    //this.dataList.minAge.splice(value.length-1,1);
                }
            }).catch(err => {
                this.dataList = null;
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
    },
    filters: {
        //生效方式1：即刻生效；2：次日生效；3：次月生效；10：指定天数后生效
        effectiveTypeFilter(value) {
            if (value === 1) {
                return '即刻生效';
            } else if (value === 2) {
                return '次日生效';
            } else if (value === 3) {
                return '次月生效';
            } else if (value === 10) {
                return '指定天数后生效';
            } else {
                return value;
            }
        },
        //被保人性别限制[{ code: 2, text: '限女性' }, { code: 1, text: '限男性' }, { code: 0, text: '不限' }]
        genderLimitFilter(value) {
            if (value === 1) {
                return '限男性';
            } else if (value === 2) {
                return '限女性';
            } else if (value === 0) {
                return '不限';
            } else {
                return value;
            }
        },
        //最高职业类别
        codesValueFilter(value) {
            if (value === 1) {
                return '1';
            } else if (value === 2) {
                return '2';
            } else if (value === 3) {
                return '3';
            } else if (value === 4) {
                return '4';
            } else if (value === 5) {
                return '5';
            } else if (value === 6) {
                return '6';
            } else if (value === 7) {
                return '特别费率';
            } else {
                return value;
            }
        },
        ageFilter(value) {
            if (value === 1) {
                return '天';
            } else if (value === 2) {
                return '周';
            } else if (value === 3) {
                return '月';
            } else if (value === 4) {
                return '周岁';
            } else {
                return value;
            }
        },
        //用户可选起保时间
        endTimeUnitFilter(value) {
            if (value === 1) {
                return '天';
            } else if (value === 2) {
                return '周';
            } else if (value === 3) {
                return '月';
            } else if (value === 4) {
                return '周岁';
            } else if (value === 0) {
                return '无';
            }else {
                return value;
            }
        },
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