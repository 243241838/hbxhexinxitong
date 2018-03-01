<template>
    <div>
        <div class="www-page">
            <div class="ui-info-main" id="frm1" style="display:block">
                <h2 class="ui-info-tit">渠道信息</h2>
                <ul class="ui-info-list">
                    <li class="ui-info-item "> 渠道ID:<span>{{domainPo.domainId}}</span></li>
                    <li class="ui-info-item "> 渠道名称:<span>{{domainPo.domainName}}</span></li>
                    <li class="ui-info-item ">合作时间:<span>{{domainPo.effTimestr}}<span>至{{domainPo.expTimestr}}</span></span>
                    </li>
                </ul>
                <h2 class="ui-info-tit">产品信息</h2>
                <ul class="ui-info-list">
                    <li class="ui-info-item "> 产品ID:<span>{{product.productId}}</span></li>
                    <li class="ui-info-item "> 保险名称:
                        <router-link :to="{ path: '/channelmanager/channelinformanager'}" style="color:blue;margin-left:6px;">{{product.productName}}</router-link>
                    </li>
                    <li class="ui-info-item ">产品总量:
                        <span v-if="product.maxQuantity==-1">不限</span>
                        <span v-else>{{product.maxQuantity}}</span>
                    </li>
                    <li class="ui-info-item ">剩余数量:
                        <span v-if="product.maxQuantity==-1">不限</span>
                        <span v-else>{{product.shengyuQuantity}}</span>
                    </li>
                </ul>
                <h2 class="ui-info-tit">配置信息</h2>
                <el-form ref="form" :model="domainProduct" label-width="142px" style="background:#f9fafa;margin-left:18px;font-weight: bold;"
                    v-show="!isshow">
                    <el-form-item label="分配数量" style="margin-bottom:0px;border-top: 1px solid #f3f5f6;">
                        <span class="grey">{{domainProduct.maxQuantity}}份</span>
                    </el-form-item>
                    <el-form-item label="一级佣金" style="margin-bottom:0px;border-top: 1px solid #f3f5f6">
                        <span class="grey">{{domainProduct.commisionValue1}}%</span>
                    </el-form-item>
                    <el-form-item label="二级佣金" style="margin-bottom:0px;border-top: 1px solid #f3f5f6">
                        <span class="grey">{{domainProduct.commisionValue2}}%</span>
                    </el-form-item>
                    <el-form-item label="交强险一级佣金" style="margin-bottom:0px;border-top: 1px solid #f3f5f6" v-if="classtype==1">
                        <span class="grey">{{domainProduct.vehicleCommisionValue1}}%</span>
                    </el-form-item>
                    <el-form-item label="交强险二级佣金" style="margin-bottom:0px;border-top: 1px solid #f3f5f6" v-if="classtype==1">
                        <span class="grey">{{domainProduct.vehicleCommisionValue2}}%</span>
                    </el-form-item>
                    <el-form-item label="上架时间" style="margin-bottom:0px;border-top: 1px solid #f3f5f6"><span class="grey">{{domainProduct.effTimestr}}</span></el-form-item>
                    <el-form-item label="下架时间" style="margin-bottom:0px;border-top: 1px solid #f3f5f6"><span class="grey">{{domainProduct.expTimestr}}</span></el-form-item>
                    <span class="payment">支付方式<span v-for="item in paymentList" :key="item.sts" class="paymentgrey" v-if="item.sts==1">{{item.paymentName}}</span></span>
                </el-form>

                <el-form ref="form1" :model="parameter" label-width="144px" :rules="rules" style="background:#f9fafa;margin-left:18px;font-weight: bold;padding-top:10px;"
                    v-show="isshow">
                    <el-form-item label="当前库存" style="margin-bottom:20px;margin-top:10px;">
                        <el-input v-model="parameter.domainQuantity" style="width:265px;" disabled></el-input>
                        <span class="grey">份</span>
                    </el-form-item>
                    <el-form-item label="分配数量" style="margin-bottom:20px;margin-top:10px;" prop="updateQuantity">
                        <el-input v-model="parameter.updateQuantity" style="width:265px;" @keyup.native="total" :maxlength=10></el-input>
                        <span class="grey">份<span style="color: rgb(255, 0, 0);">*分配数量不限</span></span>
                    </el-form-item>
                    <el-form-item label="库存总量" style="margin-bottom:20px;margin-top:10px;">
                        <el-input style="width:265px;" disabled v-model="parameter.maxQuantity"></el-input>
                        <span class="grey">份</span>
                    </el-form-item>
                    <el-form-item label="一级佣金" style="margin-bottom:20px;margin-top:10px;" prop="commisionValue1">
                        <el-input v-model="parameter.commisionValue1" style="width:265px;"></el-input>
                        <span class="grey">%</span>
                    </el-form-item>
                    <el-form-item label="二级佣金" style="margin-bottom:20px;margin-top:10px;" prop="commisionValue2">
                        <el-input v-model="parameter.commisionValue2" style="width:265px;"></el-input>
                        <span class="grey">%</span>
                    </el-form-item>
                    <el-form-item label="交强险一级佣金" style="margin-bottom:20px;margin-top:10px;" prop="vehicleCommisionValue1" v-if="classtype==1">
                        <el-input v-model="parameter.vehicleCommisionValue1" style="width:265px;"></el-input>
                        <span class="grey">%</span>
                    </el-form-item>
                    <el-form-item label="交强险二级佣金" style="margin-bottom:20px;margin-top:10px;" prop="vehicleCommisionValue2" v-if="classtype==1">
                        <el-input v-model="parameter.vehicleCommisionValue2" style="width:265px;"></el-input>
                        <span class="grey">%</span>
                    </el-form-item>
                    <el-form-item label="上架时间" style="margin-bottom:20px;margin-top:10px;">
                        <el-date-picker v-model="parameter.effTimestr" type="datetime" placeholder="请输入开始时间" style="width:265px;" :editable="false">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="下架时间" style="margin-bottom:20px;margin-top:10px;">
                        <el-date-picker v-model="parameter.expTimestr" type="datetime" placeholder="请输入结束时间" style="width:265px;" :editable="false">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="支付方式" style="padding-bottom:20px;margin-top:10px;" prop="pay">
                        <el-checkbox v-for="(item,index) in checkList" style="color: #768399;font-weight: normal;" v-model="id[index]" v-bind:key="index">{{item.name}}</el-checkbox>
                    </el-form-item>
                </el-form>
                <div class="btn" v-if="domainProduct.sts==10">
                    <input type="button" value="编辑" class="ui-btn-blue" v-if="!isshow" @click="show">
                    <input type="button" value="完成" class="ui-btn-blue" v-if="isshow" @click="editor('form1')">
                    <input type="button" value="取消" class="ui-btn-grey" v-if="isshow" @click="isshow=false">
                    <input type="button" value="下架" class="ui-btn-blue" @click="shelves" v-if="!isshow">
                    <input type="button" value="返回" class="ui-btn-grey" @click="goDetail" v-if="!isshow">
                </div>
                <div class="btn" v-else>
                    <input type="button" value="返回" class="ui-btn-grey" @click="goDetail">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import {
        trim
    } from '@src/utils/util';
    import {
        parseTime
    } from '@filters/index.js';
    export default {
        data() {
            var validate = (rule, value, callback) => {
                let reg = /^(0|[1-9][0-9]*)$/;
                if (value == "") {
                    callback(new Error('必填'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入大于等于零的整数'));
                } else {
                    callback();
                }
            };
            var validate1 = (rule, value, callback) => {
                let reg = /^(0|[1-9]\d?|100)$/;
                if (value == "" && value != 0) {
                    callback(new Error('必填'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入0-100之间的正整数,包括0和100'));
                } else {
                    callback();
                }
            };
            var validate2 = (rule, value, callback) => {
                let reg = /^(0|[1-9]\d?|100)$/;
                if (value == "" && value != 0) {
                    callback(new Error('必填'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入0-100之间的正整数,包括0和100'));
                } else {
                    callback();
                }
            };
            var validate3 = (rule, value, callback) => {
                let reg = /^(0|[1-9]\d?|100)$/;
                if (value == "" && value != 0) {
                    callback(new Error('必填'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入0-100之间的正整数,包括0和100'));
                } else {
                    callback();
                }
            };
            var validate4 = (rule, value, callback) => {
                let reg = /^(0|[1-9]\d?|100)$/;
                if (value == "" && value != 0) {
                    callback(new Error('必填'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入0-100之间的正整数,包括0和100'));
                } else {
                    callback();
                }
            };
            return {
                isshow: false,
                classtype: '',
                query: {
                    url: 'channelProduct/toDomainProductEdit',
                    domainId: this.$route.query.domainId,
                    productId: this.$route.query.productId
                },
                domainPo: '',
                product: {},
                domainProduct: {},
                paymentList: '',
                params: {
                    url: 'channelProduct/downProduct',
                    domainId: this.$route.query.domainId,
                    productId: this.$route.query.productId
                },
                parameter: {
                    url: 'channelProduct/updateDomainProduct',
                    commisionValue1: '',
                    commisionValue2: '',
                    vehicleCommisionValue1: '',
                    vehicleCommisionValue2: '',
                    domainId: '',
                    domainQuantity: '',
                    effTimestr: '',
                    expTimestr: '',
                    maxQuantity: '',
                    paymentType: '',
                    productId: '',
                    updateQuantity: '',
                    totalQuantity: ''
                },
                checkList: [],
                id: [],
                checked: true,
                bool: false,
                rules: {
                    updateQuantity: [{
                        validator: validate,
                        trigger: 'blur'
                    }],
                    commisionValue1: [{
                        validator: validate1,
                        trigger: 'blur'
                    }],
                    commisionValue2: [{
                        validator: validate2,
                        trigger: 'blur'
                    }],
                    vehicleCommisionValue1: [{
                        validator: validate3,
                        trigger: 'blur'
                    }],
                    vehicleCommisionValue2: [{
                        validator: validate4,
                        trigger: 'blur'
                    }]
                }
            }
        },
        computed: {},
        created() {
            this.search();
        },
        mounted() {},
        methods: {
            editor(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.parameter.effTimestr = this.format(this.parameter.effTimestr);
                        this.parameter.expTimestr = this.format(this.parameter.expTimestr);
                        let result = [];
                        for (let i = 0; i < this.id.length; i++) {
                            if (this.id[i]) {
                                result.push(this.checkList[i].id);
                            }
                        }
                        for (let i = 0; i < this.id.length; i++) {
                            if (!this.id[i]) {
                                this.bool = true
                            } else {
                                this.bool = false
                            }
                        }
                        if (this.bool) {
                            this.$message({
                                type: 'warning',
                                message: '产品需要选择支付方式'
                            });
                            return false
                        }
                        this.parameter.paymentType = result;
                        this.parameter.domainId = this.domainPo.domainId;
                        this.parameter.productId = this.product.productId;
                        if (this.classtype !== 1) {
                            delete this.parameter.vehicleCommisionValue1;
                            delete this.parameter.vehicleCommisionValue2;
                        }
                        config(this.parameter).then(response => {
                            // console.log(this.parameter);
                            if (response.respCode === '000000') {
                                this.$message({
                                    type: 'success',
                                    message: '设置成功!'
                                });
                                this.isshow = false;
                                this.checkList = [];
                                this.id = [];
                                this.parameter.updateQuantity = '';
                                this.search();
                                //console.log(this.checkList);
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '编辑失败!'
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });


            },
            total() {
                let reg = /^(0|[1-9][0-9]*)$/;
                if (reg.test(this.parameter.updateQuantity)) {
                    this.parameter.maxQuantity = parseInt(this.domainProduct.maxQuantity) + parseInt(this.parameter.updateQuantity);
                } else {
                    this.parameter.maxQuantity = parseInt(this.domainProduct.maxQuantity);
                }
            },
            show() {
                this.isshow = true;
            },
            Insuredlist() {
                config(this.params).then(response => {
                    if (response.respCode === '000000') {
                        this.$message({
                            type: 'success',
                            message: '设置成功!'
                        });
                    }
                })
            },
            goproductioneditorDetail(domainId) {
                this.$router.push({
                    path: "/channelmanager/productsDetails",
                    query: {
                        domainId: domainId,
                    }
                });
            },
            goDetail() {
                //this.$router.back(-1)
                this.$router.push({
                    path: "/channelmanager/cooperationDetails",
                    query: {
                        domainId: this.$route.query.domainId,
                        order: this.$route.query.order,
                        dir: this.$route.query.dir,
                    }
                });
            },
            //获取列表
            search() {
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.domainPo = response.data.domainPo;
                        this.product = response.data.product;
                        this.domainProduct = response.data.domainProduct;
                        this.paymentList = response.data.paymentList;
                        this.parameter.domainQuantity = this.domainProduct.maxQuantity;
                        this.parameter.maxQuantity = this.domainProduct.maxQuantity;
                        this.parameter.commisionValue1 = this.domainProduct.commisionValue1;
                        this.parameter.commisionValue2 = this.domainProduct.commisionValue2;
                        this.parameter.vehicleCommisionValue1 = this.domainProduct.vehicleCommisionValue1;
                        this.parameter.vehicleCommisionValue2 = this.domainProduct.vehicleCommisionValue2;
                        this.parameter.effTimestr = this.domainProduct.effTimestr;
                        this.parameter.expTimestr = this.domainProduct.expTimestr;
                        this.parameter.totalQuantity = this.domainProduct.totalQuantity;
                        this.classtype = response.data.product.classType;
                        for (let i = 0; i < this.paymentList.length; i++) {
                            if (this.paymentList[i].sts == 1) {
                                let obj = {
                                    name: this.paymentList[i].paymentName,
                                    id: this.paymentList[i].paymentId
                                }
                                let checked = 'check' + i;
                                this.id.push(checked);
                                // console.log(this.id)
                                this.checkList.push(obj);
                            }
                        }
                        for (let i = 0; i < this.id.length; i++) {
                            this.id[i] = true;
                        }
                    }
                })
            },
            format(val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let hour = datatime.getHours();
                let minute = datatime.getMinutes();
                let second = datatime.getSeconds();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute :
                    '0' + minute) + ':' + (second >= 10 ? second : '0' + second)
                return result
            },
            shelves() {
                this.$confirm('确定要下架该产品吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.Insuredlist();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下架'
                    });
                });
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
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute :
                    '0' + minute) + ':' + (second >= 10 ? second : '0' + second)
                return result
            },
            format: function (val) {
                let Stime = new Date(val);
                let year = Stime.getFullYear();
                let month = Stime.getMonth() + 1;
                let date = Stime.getDate();
                let result = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (date >= 10 ? date : '0' +
                    date);
                return result
            }
        }
    }
</script>

<style lang="less" scoped>
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
        margin-right: 0;
        font-size: 14px;
        border-bottom: 1px solid #f3f5f6;
        background: #f9fafa;
        height: 47px;
    }

    .ui-info-item {
        color: #48576a;
        font-weight: bold;
        float: left;
        line-height: 47px;
        padding-right: 12px;
    }

    .payment {
        display: inline-block;
        margin-left: 74px;
        line-height: 36px;
        height: 36px;
        border-top: 1px solid #f3f5f6;
        color: #48576a
    }

    .ui-info-item>span {
        margin-left: 12px;
        color: #768399;
        font-weight: normal;
    }

    .grey {
        color: #768399;
        font-weight: normal;
        margin-left: -1px;
    }

    .paymentgrey {
        color: #768399;
        font-weight: normal;
        margin-left: 10px;
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