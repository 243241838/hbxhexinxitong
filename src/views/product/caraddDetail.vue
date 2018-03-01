<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="container">
                    <h2 class="ui-info-tit">产品投保信息</h2>
                    <el-form ref="ruleForm2" label-width="156px" :model="datas.productPo">
                        <el-form-item label="产品名称" required>
                            <el-input style="width:265px;" v-model="datas.productPo.productName"></el-input>
                        </el-form-item>
                        <el-form-item label="承保公司" required>
                            <el-select style="width:132px;" v-model="datas.productPo.insurerId">
                                <el-option v-for="item in insurersList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId" placeholder="请选择">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="保险类别" required>
                            <el-select style="width:132px;" v-model="datas.productPo.oneLevelClassName" @change="choose">
                                <el-option v-for="item in option" :key="item.classId" :label="item.className" :value="item.classId" placeholder="请选择">
                                </el-option>
                            </el-select>
                            <el-select style="width:132px;" v-model="datas.productPo.twoLevelClassName">
                                <el-option v-for="item in opti" :key="item.classId" :label="item.className" :value="item.classId" placeholder="请选择">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品有效期" required>
                            <el-date-picker type="date" placeholder="开始时间" style="width:132px;" v-model="datas.productPo.effTimeStr" :disabled="disabled"
                                :editable="false">
                            </el-date-picker>
                            <span>至</span>
                            <el-date-picker type="date" placeholder="结束时间" style="width:132px;" v-model="datas.productPo.expTimeStr" :disabled="disabled"
                                :editable="false">
                            </el-date-picker>
                            <el-checkbox v-model="checked" @change="time">不限</el-checkbox>
                        </el-form-item>
                        <el-form-item label="产品基准销量" required>
                            <el-input style="width:132px;" v-model="datas.productPo.baselineQuantity"></el-input>
                        </el-form-item>
                        <el-form-item label="订单允许支付时间" required>
                            <el-input style="width:90px;" v-model="datas.productPo.payTime"></el-input>
                            <el-select style="width:90px;" v-model="datas.productPo.payTimeUnit">
                                <el-option v-for="item in options" :key="item.classId" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商业险一级佣金" required>
                            <el-input style="width:132px;" v-model="datas.productPo.commisionValue1"></el-input>
                            <span>%</span>
                        </el-form-item>
                        <el-form-item label="商业险二级佣金" required>
                            <el-input style="width:132px;" v-model="datas.productPo.commisionValue2"></el-input>
                            <span>%</span>
                        </el-form-item>
                        <el-form-item label="交强险一级佣金" required>
                            <el-input style="width:132px;" v-model="datas.productPo.vehicleCommisionValue1"></el-input>
                            <span>%</span>
                        </el-form-item>
                        <el-form-item label="交强险二级佣金" required>
                            <el-input style="width:132px;" v-model="datas.productPo.vehicleCommisionValue2"></el-input>
                            <span>%</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="btn">
                <input type="button" value="保存并提交" class="ui-btn-blue" @click="submit">
                <input type="button" value="取消" class="ui-btn-grey" @click="goBack">
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
                options: [{
                    value: 1,
                    label: '天'
                }, {
                    value: 2,
                    label: '小时'
                }, {
                    value: 3,
                    label: '分钟'
                }],
                datas: {
                    productPo: {
                        productName: '',
                        insurerId: '',
                        oneLevelClassName: '',
                        twoLevelClassName: '',
                        effTimeStr: '',
                        expTimeStr: '',
                        baselineQuantity: '',
                        payTime: '',
                        payTimeUnit: '',
                        commisionValue1: '',
                        commisionValue2: '',
                        vehicleCommisionValue1: '',
                        vehicleCommisionValue2: ''
                    }
                },
                insurersList: [],
                params: {
                    url: 'insurer/findAll',
                    insurerType: 21,
                },
                disabled: false,
                checked: false,
                param: {
                    url: 'product/getProductClassList',
                    classType: 1
                },
                productClassesList: [],
                option: [],
                opti: [],
                index: 0,

            }
        },
        computed: {},
        created() {
            this.getList();
            this.change();
        },
        mounted() {},
        methods: {
            choose() {
                for (let i = 0; i < this.option.length; i++) {
                    if (this.option[i].classId == this.datas.productPo.oneLevelClassName) {
                        this.index = i
                    }

                }
               
                if (this.option[this.index]) {
                    this.opti = this.option[this.index].children;
                    this.datas.productPo.twoLevelClassName = "";
                }
            },
            change() {
                config(this.param).then(response => {
                    if (response.respCode === '000000') {
                        this.productClassesList = response.data.productClassesList;
                        for (let i = 0; i < this.productClassesList.length; i++) {
                            let obj = {
                                classId: this.productClassesList[i].classId + '',
                                className: this.productClassesList[i].className,
                                children: this.productClassesList[i].children
                            }
                            this.option.push(obj)
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
                    date : '0' + date)
                return result
            },
            submit() {
                let reg = /^100$|^(\d|[1-9]\d)$/;
                let reg1 = /^[1-9]\d*|[0]{1,1}$/;
                if (this.datas.productPo.productName == "" || this.datas.productPo.productName == null) {
                    this.$message({
                        message: '请输入产品名称',
                        type: 'warning'
                    })
                    return false
                }
                if (this.datas.productPo.insurerId == "") {
                    this.$message({
                        message: '请输入承保公司',
                        type: 'warning'
                    })
                    return false
                }
                if (this.datas.productPo.oneLevelClassName == "") {
                    this.$message({
                        message: '请输入保险类别',
                        type: 'warning'
                    })
                    return false
                }
                if (this.datas.productPo.twoLevelClassName == "") {
                    this.$message({
                        message: '请输入保险类别子类',
                        type: 'warning'
                    })
                    return false
                }
                if (!this.checked) {
                    if (this.datas.productPo.effTimeStr == "" || this.datas.productPo.effTimeStr == null) {
                        this.$message({
                            message: '请输入有效期开始时间',
                            type: 'warning'
                        })
                        return false
                    }
                    if (this.datas.productPo.expTimeStr == "" || this.datas.productPo.expTimeStr == null) {
                        this.$message({
                            message: '请输入有效期结束时间',
                            type: 'warning'
                        })
                        return false
                    }
                }
                if (new Date(this.datas.productPo.effTimeStr).getTime() > new Date(this.datas.productPo.expTimeStr).getTime()) {
                    this.$message({
                        type: 'warning',
                        message: '结束日期必须大于或等于起始日期'
                    });
                    return false
                }
                if (this.datas.productPo.baselineQuantity == '') {
                    this.$message({
                        type: 'warning',
                        message: '请输入产品基准销量'
                    });
                    return false
                }
                if (!reg1.test(this.datas.productPo.baselineQuantity)) {
                    this.$message({
                        type: 'warning',
                        message: '产品基准销量只能是大于等于零的整数'
                    });
                    return false
                }
                if (this.datas.productPo.payTime == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入订单允许支付时间'
                    });
                    return false
                }
                if (!reg1.test(this.datas.productPo.payTime)) {
                    this.$message({
                        type: 'warning',
                        message: '订单允许支付时间只能是大于等于零的整数'
                    });
                    return false
                }
                if(this.datas.productPo.payTimeUnit==""){
                        this.$message({
                        type: 'warning',
                        message: '请输入订单允许支付时间单位'
                    });
                    return false
                }
                if (this.datas.productPo.commisionValue1 == "") {
                    this.$message({
                        message: '请输入商业险一级佣金',
                        type: 'warning'
                    })
                    return false
                }
                if (!reg.test(this.datas.productPo.commisionValue1)) {
                    this.$message({
                        message: '商业险一级佣金只能是0到100的正整数，包括0和100！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.datas.productPo.commisionValue2 == "") {
                    this.$message({
                        message: '请输入商业险二级佣金',
                        type: 'warning'
                    })
                    return false
                }
                if (!reg.test(this.datas.productPo.commisionValue2)) {
                    this.$message({
                        message: '商业险二级佣金只能是0到100的正整数，包括0和100！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.datas.productPo.vehicleCommisionValue1 == "") {
                    this.$message({
                        message: '请输入交强险一级佣金',
                        type: 'warning'
                    })
                    return false
                }
                if (!reg.test(this.datas.productPo.vehicleCommisionValue1)) {
                    this.$message({
                        message: '交强险一级佣金只能是0到100的正整数，包括0和100！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.datas.productPo.vehicleCommisionValue2 == "") {
                    this.$message({
                        message: '请输入交强险二级佣金',
                        type: 'warning'
                    })
                    return false
                }
                if (!reg.test(this.datas.productPo.vehicleCommisionValue2)) {
                    this.$message({
                        message: '交强险二级佣金只能是0到100的正整数，包括0和100！',
                        type: 'warning'
                    })
                    return false
                }
                let obj = {
                    url: 'product/carInstall/addCarinstallProductMsg',
                    productId: this.$route.query.productId,
                    productName: this.datas.productPo.productName,
                    insurerId: this.datas.productPo.insurerId,
                    commisionValue1: this.datas.productPo.commisionValue1,
                    commisionValue2: this.datas.productPo.commisionValue2,
                    vehicleCommisionValue1: this.datas.productPo.vehicleCommisionValue1,
                    vehicleCommisionValue2: this.datas.productPo.vehicleCommisionValue2,
                    baselineQuantity: this.datas.productPo.baselineQuantity,
                    longTime: '',
                    effTimeStr: this.datas.productPo.effTimeStr,
                    expTimeStr: this.datas.productPo.expTimeStr,
                    classId: this.datas.productPo.oneLevelClassName,
                    classIdOne: this.datas.productPo.twoLevelClassName,
                    payTimeUnit: this.datas.productPo.payTimeUnit,
                    payTime: this.datas.productPo.payTime
                }
                if (this.checked) {
                    obj.longTime = 1
                }
                if (obj.effTimeStr == "" || obj.effTimeStr == null) {
                    obj.effTimeStr = ""
                } else {
                    obj.effTimeStr = this.format(obj.effTimeStr);
                }
                if (obj.expTimeStr == "" || obj.expTimeStr == null) {
                    obj.expTimeStr = ""
                } else {
                    obj.expTimeStr = this.format(obj.expTimeStr);
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                        setTimeout(() => {
                            this.$router.push({
                                path: "/product/carInstallment",
                            });

                        }, 2000);
                    } else {
                        this.$message.error(response.respMsg)
                    }
                })
            },
            goBack() {
                this.$confirm('您填写的信息尚未保存，确定返回吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$router.push({
                        path: "/product/carInstallment",

                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消返回'
                    });
                });
            },
            //获取列表
            search() {
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.data = response.data;
                        if (this.data.productPo.longTime == 1) {
                            this.disabled = true;
                            this.checked = true;
                            this.data.productPo.effTimeStr = "";
                            this.data.productPo.expTimeStr = "";
                        }
                        this.change()
                    }
                })
            },
            time() {
                if (this.checked) {
                    this.datas.productPo.effTimeStr = "";
                    this.datas.productPo.expTimeStr = "";
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
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