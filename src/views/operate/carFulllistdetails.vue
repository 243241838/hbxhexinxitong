<template>
    <div class="app-container calendar-list-container productioneditor">
        <div class="filter-container">
            <el-row style="margin-bottom:20px;">
                <el-col :span="24" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">订单信息</h2>
                    <el-form label-width="180px" :model="data.tradeRecordsPo">
                        <el-form-item label=" 订单编号:">
                            <span>{{data.tradeRecordsPo.tradeId}}</span>
                        </el-form-item>
                        <el-form-item label=" 保单号:" v-if="data.tradeRecordsPo.policyNo">
                            <span>{{data.tradeRecordsPo.policyNo}}</span>
                        </el-form-item>
                        <el-form-item label="订单状态:">
                            <span>{{data.tradeRecordsPo.tradeStsDesc | state}}</span>
                        </el-form-item>
                        <el-form-item label="分期状态:">
                            <span>{{data.tradeRecordsPo.instalmentStsDesc}}</span>
                        </el-form-item>
                        <el-form-item label="车牌号:">
                            <span>{{data.tradeRecordsPo.licenseNo |  plate}}</span>
                        </el-form-item>
                        <el-form-item label="保险公司:">
                            <span>{{data.tradeRecordsPo.insurerName}}</span>
                        </el-form-item>
                        <el-form-item label="交强险起保时间:">
                            <span>{{data.tradeRecordsPo.jqStartTimeStr}}</span>
                        </el-form-item>
                        <el-form-item label="商业险起保时间：">
                            <span>{{data.tradeRecordsPo.startTimeStr}}</span>
                        </el-form-item>
                        <el-form-item label="交强险:">
                            <span>{{data.tradeRecordsPo.jqPreium | money}}</span>
                        </el-form-item>
                        <el-form-item label="代缴车船税:">
                            <span>{{data.tradeRecordsPo.ccsPreium | money}}</span>
                        </el-form-item>
                        <el-form-item label="商业险:">
                            <span>{{data.tradeRecordsPo.syPreium | money}}</span>
                        </el-form-item>
                        <el-form-item label="商业险明细:">
                            <img :src="data.tradeRecordsPo.syxDetailImg" v-if="data.tradeRecordsPo.syxDetailImg" style="display:block;" width="540" height="300"
                            />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="24" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">保障内容</h2>
                    <table class="ui-submod-tab" width="50%" border="1" style="text-align: center;background:#fff;border:0;border-color:#ddd;margin-left:180px;margin-bottom:22px;"
                        cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr class="ui-submod-tr-grey" style="font-size: 14px; font-weight: bold;color:#768399;background:#f9fafa">
                                <td>
                                    交强险
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr v-for="item in insurance">
                                <td>
                                    {{item.benefitName}}
                                </td>
                                <td>
                                    <span v-if="item.franchiseFlag==0"><el-checkbox  v-model="checked" :disabled=true>不计免赔</el-checkbox></span>
                                    <span v-else-if="item.franchiseFlag==1"><el-checkbox  v-model="check" :disabled=true>不计免赔</el-checkbox></span>
                                    <span v-else></span>
                                </td>
                                <td v-if="item.insuredAmount==0">
                                    不投保
                                </td>
                                <td v-if="item.insuredAmount==1">
                                    投保
                                </td>
                            </tr>
                            <tr class="ui-submod-tr-grey" style="font-size: 14px; font-weight: bold;color:#768399;background:#f9fafa">
                                <td width="35%">
                                    商业险
                                </td>
                                <td width="35%"></td>
                                <td width="30%"></td>
                            </tr>
                            <tr v-for="item in business">
                                <td>
                                    {{item.benefitName}}
                                </td>
                                <td>
                                    <span v-if="item.franchiseFlag==0"><el-checkbox  v-model="checked" :disabled=true>不计免赔</el-checkbox></span>
                                    <span v-else-if="item.franchiseFlag==1"><el-checkbox  v-model="check" :disabled=true>不计免赔</el-checkbox></span>
                                    <span v-else></span>
                                </td>
                                <td v-if="item.benefitCode=='Z1'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='Z2'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='Z3'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-else>{{item.insuredAmount}}</span>
                                </td>
                                <td v-if="item.benefitCode=='Z4'">
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                    <span v-else>{{item.insuredAmount}}</span>
                                </td>
                                <td v-if="item.benefitCode=='Z5'">
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                    <span v-else>{{item.insuredAmount}}</span>
                                </td>
                            </tr>
                            <tr class="ui-submod-tr-grey" style="font-size: 14px; font-weight: bold;color:#768399;background:#f9fafa">
                                <td width="35%">
                                    附加险
                                </td>
                                <td width="35%"></td>
                                <td width="30%"></td>
                            </tr>
                            <tr v-for="item in add">
                                <td>
                                    {{item.benefitName}}
                                </td>
                                <td>
                                    <span v-if="item.franchiseFlag==0"><el-checkbox  v-model="checked" :disabled=true>不计免赔</el-checkbox></span>
                                    <span v-else-if="item.franchiseFlag==1"><el-checkbox  v-model="check" :disabled=true>不计免赔</el-checkbox></span>
                                    <span v-else></span>
                                </td>
                                <td v-if="item.benefitCode=='F1'">
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                    <span v-else>{{item.insuredAmount}}</span>
                                </td>
                                <td v-if="item.benefitCode=='F2'">
                                    <span v-if="item.insuredAmount==1">国产玻璃</span>
                                    <span v-if="item.insuredAmount==2">进口玻璃</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='F3'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='F4'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='F5'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='F6'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="24" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">车辆信息</h2>
                    <el-form label-width="180px" :model="data.tradeDetailsPo">
                        <el-form-item label="品牌型号:">
                            <span>{{data.tradeDetailsPo.vehicleModel}}</span>
                        </el-form-item>
                        <el-form-item label="车辆识别代码:">
                            <span>{{data.tradeDetailsPo.vehicleFrameNo}}</span>
                        </el-form-item>
                        <el-form-item label="发动机号:">
                            <span>{{data.tradeDetailsPo.engineNo}}</span>
                        </el-form-item>
                        <el-form-item label="注册时间:">
                            <span>{{data.tradeDetailsPo.registerDateStr}}</span>
                        </el-form-item>
                        <el-form-item label="核载人数:">
                            <span>{{data.tradeDetailsPo.seats}}</span>
                        </el-form-item>
                        <el-form-item label="过户车辆首次投保:">
                            <span>{{data.tradeDetailsPo.specialCarFlag | sts}}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="22" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">车主信息</h2>
                    <el-form label-width="180px" :model="data.tradeDetailsPo">
                        <el-form-item label="车主姓名:">
                            <span>{{data.tradeDetailsPo.insuredName}}</span>
                        </el-form-item>
                        <el-form-item label="身份证号:">
                            <span>{{data.tradeDetailsPo.identifyNumber}}</span>
                        </el-form-item>
                        <el-form-item label="联系电话:">
                            <span>{{data.tradeDetailsPo.mobile}}</span>
                        </el-form-item>
                        <el-form-item label="保单邮寄地址:">
                            <span>{{data.tradeDetailsPo.shippingAddress}}</span>
                        </el-form-item>
                        <el-form-item label="收件人姓名:">
                            <span>{{data.tradeDetailsPo.cneeName}}</span>
                        </el-form-item>
                        <el-form-item label="收件人电话:">
                            <span>{{data.tradeRecordsPo.cneeMobile}}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="24" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">证件照</h2>
                    <el-form label-width="180px" :model="data.tradeDetailsPo">
                        <el-form-item label="身份证正面:">
                            <el-radio v-model="frontIdCardImgSts" label="1" style="color: rgb(255, 0, 0)">通过</el-radio>
                            <el-radio v-model="frontIdCardImgSts" label="0" style="color: rgb(255, 0, 0)">不通过</el-radio>
                            <a :href="data.tradeDetailsPo.travelLicenseImg" download class="ui-btn-grey">下载图片</a>
                            <div v-if="data.tradeDetailsPo.frontIdCardImg"><img :src="data.tradeDetailsPo.frontIdCardImg" width="540" height="300" /></div>
                        </el-form-item>
                        <el-form-item label="身份证反面:">
                            <el-radio v-model="backIdCardImgSts" label="2" style="color: rgb(255, 0, 0)">通过</el-radio>
                            <el-radio v-model="backIdCardImgSts" label="0" style="color: rgb(255, 0, 0)">不通过</el-radio>
                            <span class="ui-btn-grey" @click="handleExcel(data.tradeDetailsPo.travelLicenseImg)">下载图片</span>
                            <div v-if="data.tradeDetailsPo.backIdCardImg"><img :src="data.tradeDetailsPo.backIdCardImg" width="540" height="300" /></div>
                        </el-form-item>
                        <el-form-item label="行驶证:">
                            <el-radio v-model="travelLicenseImgSts" label="4" style="color: rgb(255, 0, 0)">通过</el-radio>
                            <el-radio v-model="travelLicenseImgSts" label="0" style="color: rgb(255, 0, 0)">不通过</el-radio>
                            <a href="javascript:;" class="ui-btn-grey" @click="handleExcel(data.tradeDetailsPo.travelLicenseImg)">下载图片</a>
                            <div v-if="data.tradeDetailsPo.travelLicenseImg"><img :src="data.tradeDetailsPo.travelLicenseImg" width="540" height="300" /></div>
                        </el-form-item>
                    </el-form>
                    <input type="button" value="提交证件审核" class="ui-btn-grey" @click="submit" style="position:relative; left:366px; bottom:10px;">
                </el-col>
            </el-row>
            <div v-if="tradeStsDesc==10||tradeStsDesc==20">
                保单号：
                <el-input v-model="query.policyNo" style="width:265px;margin-bottom:22px;" :maxlength='25'></el-input>
                <div>
                    <input type="button" value="编辑" class="ui-btn-grey" @click="editor">
                    <input type="button" value="取消" class="ui-btn-grey" @click="cancel">
                </div>
            </div>
             <div  v-else>
                <div  style="text-align:center; ">
                   <input type="button" value="取消" class="ui-btn-grey" @click="cancel">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import config from '@api/config';
    import '@res/css/car.less';
    import {
        parseTime
    } from '@filters/index.js';
    import {
        trim
    } from '@src/utils/util';
    import {
        downloadExecl
    } from '@api/excel.js';
    export default {
        data() {
            return {
                params: {
                    url: 'carinstallments/getInstalmentOrderInfo',
                    tradeId: this.$route.query.tradeId
                },
                data: {
                    tradeRecordsPo: {},
                    tradeDetailsPo: {}
                },
                checked: false,
                check: true,
                backIdCardImgSts: '',
                frontIdCardImgSts: '',
                travelLicenseImgSts: '',
                insurance: [],
                business: [],
                add: [],
                query: {
                    policyNo: ''
                },
                tradeStsDesc:''
                
            }
        },
        created() {

            this.getData();
        },
        methods: {
            cancel() {
                this.$router.push({
                    path: "/operationManage/car/Fulllist",

                });
            },
            editor() {
                let obj = {
                    url: 'carinstallments/updatePolicyNo',
                    policyNo: this.query.policyNo,
                    tradeId: this.data.tradeRecordsPo.tradeId
                }
                console.log(1)
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                    } else {
                        this.$message.error(response.respMsg)
                    }
                })
            },
            getData() {
                config(this.params).then(response => {
                    if (response.respCode === '000000') {
                        this.data = response.data;
                        this.data.tradeRecordsPo.instalmentStsDesc = response.data.instalmentStsDesc;
                        this.data.tradeRecordsPo.licenseNo = response.data.tradeDetailsPo.licenseNo;
                        this.data.tradeRecordsPo.insurerName = response.data.insurersPo.insurerName;
                        this.data.tradeRecordsPo.policyNo = response.data.tradeDetailsPo.policyNo;
                        this.data.tradeRecordsPo.syxDetailImg = response.data.tradeDetailsPo.syxDetailImg;
                        this.data.tradeRecordsPo.tradeStsDesc = response.data.tradeStsDesc;
                        this.data.tradeDetailsPo.shippingAddress = response.data.tradeRecordsPo.shippingAddress;
                        this.data.tradeDetailsPo.cneeName = response.data.tradeRecordsPo.cneeName;
                        this.data.tradeDetailsPo.cneeMobile = response.data.tradeRecordsPo.cneeMobile;
                        this.tradeStsDesc= response.data.tradeStsDesc;
                        if (this.data.tradeDetailsPo.idCardImgSts == 1 || this.data.tradeDetailsPo.idCardImgSts ==
                            3 || this.data.tradeDetailsPo.idCardImgSts == 5 || this.data.tradeDetailsPo.idCardImgSts ==
                            7) {
                            this.frontIdCardImgSts = '1'
                        } else if (this.data.tradeDetailsPo.idCardImgSts == 0 || this.data.tradeDetailsPo.idCardImgSts ==
                            2 || this.data.tradeDetailsPo.idCardImgSts == 4 || this.data.tradeDetailsPo.idCardImgSts ==
                            6) {
                            this.frontIdCardImgSts = '0'
                        }
                        if (this.data.tradeDetailsPo.idCardImgSts == 2 || this.data.tradeDetailsPo.idCardImgSts ==
                            3 || this.data.tradeDetailsPo.idCardImgSts == 6 || this.data.tradeDetailsPo.idCardImgSts ==
                            7) {
                            this.backIdCardImgSts = '2'
                        } else if (this.data.tradeDetailsPo.idCardImgSts == 0 || this.data.tradeDetailsPo.idCardImgSts ==
                            1 || this.data.tradeDetailsPo.idCardImgSts == 4 || this.data.tradeDetailsPo.idCardImgSts ==
                            5) {
                            this.backIdCardImgSts = '0'
                        }
                        if (this.data.tradeDetailsPo.idCardImgSts == 4 || this.data.tradeDetailsPo.idCardImgSts ==
                            5 || this.data.tradeDetailsPo.idCardImgSts == 6 || this.data.tradeDetailsPo.idCardImgSts ==
                            7) {
                            this.travelLicenseImgSts = '4'
                        } else if (this.data.tradeDetailsPo.idCardImgSts == 0 || this.data.tradeDetailsPo.idCardImgSts ==
                            1 || this.data.tradeDetailsPo.idCardImgSts == 2 || this.data.tradeDetailsPo.idCardImgSts ==
                            3) {
                            this.travelLicenseImgSts = '0'
                        }
                        for (let i = 0; i < this.data.tradeBenefitsList.length; i++) {
                            if (this.data.tradeBenefitsList[i].benefitCode.charAt(0) == 'J') {
                                this.insurance.push(this.data.tradeBenefitsList[i])
                            }
                            if (this.data.tradeBenefitsList[i].benefitCode.charAt(0) == 'Z') {
                                this.business.push(this.data.tradeBenefitsList[i])
                            }
                            if (this.data.tradeBenefitsList[i].benefitCode.charAt(0) == 'F') {
                                this.add.push(this.data.tradeBenefitsList[i])
                            }

                        }
                    }
                })
            },
            submit() {
                let obj = {
                    url: 'carinstallments/updateIdCardImgSts',
                    backIdCardImgSts: this.backIdCardImgSts,
                    frontIdCardImgSts: this.frontIdCardImgSts,
                    travelLicenseImgSts: this.travelLicenseImgSts,
                    tradeId: this.$route.query.tradeId
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                    } else {
                        this.$message.error(response.respMsg)
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
            }

        },
        filters: {
            state: function (val) {
                if (val == 10) {
                    return '待支付'
                } else if (val == 20) {
                    return '已支付'
                } else if (val == 35) {
                    return '已完成'
                } else if (val == -11) {
                    return '已失效'
                } else if (val == 50) {
                    return '已退款'
                }
            },
            money: function (val) {
                if (!val) {
                    return '￥0.00'
                } else {
                    return '￥' + (val / 100).toFixed(2);
                }
            },
            plate: function (val) {
                if (val == 0) {
                    return '新车未上牌'
                } else {
                    return val
                }
            },
            sts: function (val) {
                if (val == 0) {
                    return '否'
                } else if (val == 1) {
                    return '是'
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .app-container {
        margin-top: 17px;
    }

    .app-container .filter-container {
        padding: 6px 1.4% 18px 1.4%;
    }

    .app-container .filter-container .ui-info-tit {
        margin-left: 18px;
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
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
        width: 150px;
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
        margin-left: 20px;
    }
</style>