<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="container">
                    <h2 class="ui-info-tit">产品基本信息</h2>
                    <el-form label-width="220px" :model="data.productPo">
                        <el-form-item label="产品ID">
                            {{data.productPo.productId}}
                        </el-form-item>
                        <el-form-item label="产品名称">
                            {{data.productPo.productName}}
                        </el-form-item>
                        <el-form-item label="承保公司">
                            {{data.productPo.insurerId}}
                        </el-form-item>
                        <el-form-item label="保险类别">
                            {{firsttype}} {{this.secondtype}}
                        </el-form-item>
                        <el-form-item label="产品基准销量">
                            {{data.productPo.baselineQuantity}}
                        </el-form-item>
                        <el-form-item label="订单允许支付时间" v-if="data.productPo.payTimeUnit==1">
                            {{data.productPo.payTime+'天'}}
                        </el-form-item>
                        <el-form-item label="订单允许支付时间" v-if="data.productPo.payTimeUnit==2">
                            {{data.productPo.payTime+'小时'}}
                        </el-form-item>
                        <el-form-item label="订单允许支付时间" v-if="data.productPo.payTimeUnit==3">
                            {{data.productPo.payTime+'分钟'}}
                        </el-form-item>
                        <el-form-item label="商业险一级佣金">
                            {{data.productPo.commisionValue1+'%'}}
                        </el-form-item>
                        <el-form-item label="商业险二级佣金">
                            {{data.productPo.commisionValue2+'%'}}
                        </el-form-item>
                        <el-form-item label="交强险一级佣金">
                            {{data.productPo.vehicleCommisionValue1+'%'}}
                        </el-form-item>
                        <el-form-item label="交强险二级佣金">
                            {{data.productPo.vehicleCommisionValue2+'%'}}
                        </el-form-item>
                        <el-form-item label="产品有效期" v-if="data.productPo.longTime==1">
                            长期
                        </el-form-item>
                        <el-form-item label="产品有效期" v-else>
                            {{data.productPo.effTimeStr+'至'+data.productPo.expTimeStr}}
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="btn">
                <input type="button" value="返回" class="ui-btn-grey" @click="goBack">
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import '@res/css/shelvesDetails.less';
    import config from '@api/config';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                query: {
                    url: 'product/carInstall/productCarinstallDetail',
                    productId: this.$route.query.productId
                },
                data: {
                    productPo: {}
                },
                insurersList: [],
                productClassesList: [],
                params: {
                    url: 'insurer/findAll',
                    insurerType: 21,
                    parentId: 0
                },
                param: {
                    url: 'product/getProductClassList',
                    classType: 1
                },
                firsttype: '',
                secondtype: ''
            }
        },
        computed: {},
        created() {
            this.search();
        },
        mounted() {},
        methods: {
            change() {
                config(this.param).then(response => {
                    if (response.respCode === '000000') {
                        this.productClassesList = response.data.productClassesList;
                        for (let i = 0; i < this.productClassesList.length; i++) {
                            if (this.productClassesList[i].classId == this.firsttype) {
                                this.firsttype = this.productClassesList[i].className;
                                for (let j = 0; j < this.productClassesList[i].children.length; j++) {
                                    if (this.productClassesList[i].children[j].classId == this.secondtype) {
                                        this.secondtype = this.productClassesList[i].children[j].className;
                                    }
                                }
                                break;
                            }
                        }
                    }
                })
            },
            getList() {
                config(this.params).then(response => {
                    if (response.respCode === '000000') {
                        for (let i = 0; i < response.data.insurersList.length; i++) {
                            let obj = {
                                insurerId: response.data.insurersList[i].insurerId,
                                insurerName: response.data.insurersList[i].insurerName
                            }
                            this.insurersList.push(obj)
                        }
                        for (let i = 0; i < this.insurersList.length; i++) {
                            if (this.insurersList[i].insurerId == this.data.productPo.insurerId) {
                                this.data.productPo.insurerId = this.insurersList[i].insurerName;
                                break;
                            }
                        }


                    }
                })
            },
            goBack() {
                this.$router.go(-1);
            },
            //获取列表
            search() {
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.data = response.data;
                        this.firsttype = response.data.oneLevelClassName;
                        this.secondtype = response.data.twoLevelClassName;
                        this.getList();
                        this.change();
                    } else {
                        this.$message.error(response.respMsg)
                    }
                })
            }


        },
        filters: {
            time: function (val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let hour = datatime.getHours();
                let minute = datatime.getMinutes();
                let second = datatime.getSeconds();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >=
                    10 ?
                    date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ?
                    minute :
                    '0' + minute) + ':' + (second >= 10 ? second : '0' + second)
                return result
            }
        }
    }
</script>
<style lang="less" scoped>
    .app-container {
        margin-top: 17px;
    }

    .filter-container {
        padding: 6px 1.4% 18px 1.4%;
    }

    .container {
        border: 1px solid #e4e9eb;
        border-radius: 5px;
    }

    .ui-info-main {
        border: 1px solid #e4e9eb;
        border-radius: 5px;
    }

    .ui-info-tit {
        margin-left: 18px;
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }

    .ui-info-list {
        padding-left: 74px;
        border-top: 1px solid #f3f5f6;
        margin: 18px;
        margin-top: 0;
        margin-bottom: 0;
        color: #768399;
        font-size: 14px;
        border-bottom: 1px solid #f3f5f6;
        background: #f9fafa;
        height: 47px;
    }

    .ui-info-item {
        color: #768399;
        font-weight: bold;
        float: left;
        line-height: 47px;
        margin-right: 12px;
    }

    .btn {
        padding: 20px;
        text-align: center;
    }

    .ui-btn-blue {
        display: inline-block;
        width: 87px;
        height: 30px;
        line-height: 30px;
        border: 0;
        font-weight: bold;
        color: #fff;
        background-color: #75b9e6;
        border-radius: 5px;
        text-align: center;
        outline: none;
        cursor: pointer;
    }

    .ui-btn-grey {
        display: inline-block;
        width: 87px;
        height: 30px;
        line-height: 30px;
        border: 0;
        font-weight: bold;
        background: #f0f0f0;
        color: #768399;
        border-radius: 5px;
        text-align: center;
        outline: none;
        cursor: pointer;
    }
</style>