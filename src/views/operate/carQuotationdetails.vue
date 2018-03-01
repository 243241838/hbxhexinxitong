<template>
    <div class="app-container calendar-list-container productioneditor">
        <div class="filter-container">
            <el-row style="margin-bottom:20px;">
                <el-col :span="24" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">询价信息</h2>
                    <el-form label-width="180px" :model="data.queryPo">
                        <el-form-item label="询价流水号:">
                            <span v-show="isshow">{{data.queryPo.serialId}}</span>
                            <el-input style="width:265px;" v-model="data.queryPo.serialId" v-show="!isshow" readonly="readonly"></el-input>
                        </el-form-item>
                        <el-form-item label="询价时间:">
                            <span v-show="isshow">{{data.queryPo.queryTimeStr}}</span>
                            <el-date-picker type="datetime" style="width:265px;" :editable="false" v-model="data.queryPo.queryTimeStr" v-show="!isshow">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="车主姓名:" v-show="isshow">
                            <span>{{data.queryPo.queryRealName}}</span>
                        </el-form-item>
                        <el-form-item label="车主姓名:" prop="nickname" v-show="!isshow" required>
                            <el-input style="width:265px;" v-model="data.queryPo.queryRealName"></el-input>
                        </el-form-item>
                        <el-form-item label="车主手机号:" v-show="isshow">
                            <span>{{data.queryPo.queryMobile}}</span>
                        </el-form-item>
                        <el-form-item label="车主手机号:" prop="phone" v-show="!isshow" required>
                            <el-input style="width:265px;" v-model="data.queryPo.queryMobile"></el-input>
                        </el-form-item>
                        <el-form-item label="车主身份证:" v-show="isshow">
                            <span>{{data.queryPo.queryIdNo}}</span>
                        </el-form-item>
                        <el-form-item label="车主身份证:" v-show="!isshow" prop="card" required>
                            <el-input style="width:265px;" v-model="data.queryPo.queryIdNo"></el-input>
                        </el-form-item>
                        <el-form-item label="保险公司:">
                            <span v-show="isshow">{{data.queryPo.insurerName}}</span>
                            <el-select v-model="value" v-show="!isshow">
                                <el-option v-for="item in insurersList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId" placeholder="全部">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div style="position:relative;left:226px;margin-bottom:22px;">
                        <input type="button" value="编辑" class="ui-btn-grey" v-show="isshow" @click="priceeditor">
                        <input type="button" value="保存" class="ui-btn-grey" v-show="!isshow" @click="submit()">
                        <input type="button" value="取消" class="ui-btn-grey" v-show="!isshow" @click="goback">
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="24" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">车辆信息</h2>
                    <el-form label-width="180px" :model="data.insCarInfoPo">
                        <el-form-item label="品牌型号:" v-show="show">
                            <span>{{data.insCarInfoPo.modelType}}</span>
                        </el-form-item>
                        <el-form-item label="品牌型号:" v-show="!show" required>
                            <el-input style="width:265px;" v-model="data.insCarInfoPo.modelType"></el-input>
                        </el-form-item>
                        <el-form-item label="车牌号:" v-show="show">
                            <span v-if="data.insCarInfoPo.licenseNo==0">新车未上牌</span>
                            <span v-else>{{data.insCarInfoPo.licenseNo}}</span>
                        </el-form-item>
                        <el-form-item label="车牌号:" v-show="!show" required>
                            <el-input style="width:265px;" v-model="data.insCarInfoPo.licenseNo" :disabled="disabled"></el-input>
                            <el-checkbox v-model="checked" v-show="!show" @change="adjust">新车未上牌</el-checkbox>
                        </el-form-item>
                        <el-form-item label="车架号:" v-show="show">
                            <span>{{data.insCarInfoPo.vinNo}}</span>
                        </el-form-item>
                        <el-form-item label="车架号:" v-show="!show" required>
                            <el-input style="width:265px;" v-model="data.insCarInfoPo.vinNo"></el-input>
                        </el-form-item>
                        <el-form-item label="发动机号:" v-show="show">
                            <span>{{data.insCarInfoPo.engineNo}}</span>
                        </el-form-item>
                        <el-form-item label="发动机号:" v-show="!show" required>
                            <el-input style="width:265px;" v-model="data.insCarInfoPo.engineNo"></el-input>
                        </el-form-item>
                        <el-form-item label="注册时间:">
                            <span v-show="show">{{data.insCarInfoPo.firstRegDate}}</span>
                            <el-date-picker v-model="data.insCarInfoPo.firstRegDate" type="date" placeholder="注册时间" style="width:265px;" v-show="!show"
                                :editable="false">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="核载人数:" v-show="show">
                            <span>{{data.insCarInfoPo.seats}}</span>

                        </el-form-item>
                        <el-form-item label="核载人数:" v-show="!show" required>
                            <el-input style="width:265px;" v-model="data.insCarInfoPo.seats"></el-input>
                        </el-form-item>
                        <el-form-item label="交强险起保时间:">
                            <span v-show="show">{{data.insCarInfoPo.jqStartTimeStr}}</span>
                            <el-date-picker type="datetime" style="width:265px;" :editable="false" v-model="data.insCarInfoPo.jqStartTimeStr" v-show="!show">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="商业险起保时间:">
                            <span v-show="show">{{data.insCarInfoPo.syStartTimeStr}}</span>
                            <el-date-picker type="datetime" style="width:265px;" :editable="false" v-model="data.insCarInfoPo.syStartTimeStr" v-show="!show">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="是否为过户车辆:">
                            <span v-if="data.insCarInfoPo.transferFlag==0" v-show="show">未过户</span>
                            <span v-if="data.insCarInfoPo.transferFlag==1" v-show="show">已过户</span>
                            <el-radio v-model="data.insCarInfoPo.transferFlag" label="0" v-show="!show">未过户</el-radio>
                            <el-radio v-model="data.insCarInfoPo.transferFlag" label="1" v-show="!show">已过户</el-radio>
                        </el-form-item>
                        <el-form-item label="过户时间:" v-if="data.insCarInfoPo.transferDate" v-show="show">
                            <span>{{data.insCarInfoPo.transferDate}}</span>
                        </el-form-item>
                        <el-form-item label="过户时间:" v-if="this.data.insCarInfoPo.transferFlag==1" v-show="!show">
                            <el-date-picker v-model="data.insCarInfoPo.transferDate" type="date" placeholder="过户时间" style="width:265px;" :editable="false">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <div style="position:relative;left:226px;margin-bottom:22px;">
                        <input type="button" value="编辑" class="ui-btn-grey" v-show="show" @click="careditor">
                        <input type="button" value="保存" class="ui-btn-grey" v-show="!show" @click="change">
                        <input type="button" value="取消" class="ui-btn-grey" v-show="!show" @click="go">
                    </div>
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
                    <h2 class="ui-info-tit">保费信息</h2>
                    <el-form label-width="180px" :model="data.queryInsPricePo">
                        <el-form-item>
                            <el-radio-group v-model="data.queryInsPricePo.querySts">
                                <el-radio :label="20">询价成功</el-radio>
                                <el-radio :label="-20">询价失败</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="商业险:" v-show="data.queryInsPricePo.querySts==20">
                            <el-input style="width:265px;" v-model="data.queryInsPricePo.syPreium" :maxlength='8'></el-input>
                            <span style="margin-left:0px;">元</span>
                        </el-form-item>
                        <el-form-item label="交强险:" v-show="data.queryInsPricePo.querySts==20">
                            <el-input style="width:265px;" v-model="data.queryInsPricePo.jqPreium" :maxlength='8'></el-input>
                            <span style="margin-left:0px;">元</span>
                        </el-form-item>
                        <el-form-item label="代缴车船税:" v-show="data.queryInsPricePo.querySts==20">
                            <el-input style="width:265px;" v-model="data.queryInsPricePo.ccsPreium" :maxlength='8'></el-input>
                            <span style="margin-left:0px;">元</span>
                        </el-form-item>
                        <el-form-item label="商业险明细:" style="position:relative;height:160px;" v-show="data.queryInsPricePo.querySts==20">
                            <img :src="data.queryInsPricePo.resultImg" v-if="data.queryInsPricePo.resultImg" width="120" height="120" />
                            <uploadImg v-on:acqImgUrl="acqImgUrl" :fileList2="fileList2" v-bind:tip="''" v-bind:bodyWidth="120" style="position:absolute; left:140px;top:42px;"
                                v-bind:paramName="'img'"></uploadImg>
                            <div style="position:absolute;left:314px;top:42px;">
                                <input type="button" value="删除图片" class="ui-btn-blue" style="font-weight: normal; width:70px; height:28px;line-height:28px;"
                                    @click="del">
                            </div>

                        </el-form-item>
                        <el-form-item style="position:relative;height:120px;" v-show="data.queryInsPricePo.querySts==-20">
                            <el-input type="textarea" placeholder="询价不成功理由" :rows="5" style="width:822px;" v-model="data.queryInsPricePo.queryResult"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="btn">
                <input type="button" value="提交" class="ui-btn-blue" @click="presubmit">
                <input type="button" value="返回" class="ui-btn-grey" @click="goto">
            </div>
        </div>
    </div>
</template>
<script>
    import config from '@api/config';
    import uploadImg from "@src/components/uploadImg";
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
        components: {
            uploadImg
        },
        data() {
            return {
                params: {
                    url: 'carinstallments/getQueryInfo',
                    serialId: this.$route.query.serialId
                },
                data: {
                    insCarInfoPo: {},
                    queryPo: {},
                    queryBenefitsList: {},
                    queryInsPricePo: {}
                },
                checked: false,
                check: true,
                backIdCardImgSts: '',
                frontIdCardImgSts: '',
                travelLicenseImgSts: '',
                insurance: [],
                business: [],
                add: [],
                isshow: true,
                show: true,
                query: {
                    url: 'insurer/findAll',
                    insurerType: 21
                },
                insurersList: [],
                value: "",
                disabled: false,
                checked: false,
                fileList2: []
            }
        },
        created() {
            this.getData();
        },
        methods: {
            del() {
                this.data.queryInsPricePo.resultImg = "";
            },
            acqImgUrl(params) {
                this.data.queryInsPricePo.resultImg = params[0];
                this.fileList2 =  [];
            },
            goto() {
                this.$router.push({
                    path: "/operationManage/car/Quotationlist"
                })

            },
            correct(time) {
                let Stime = new Date(time);
                let year = Stime.getFullYear();
                let month = Stime.getMonth() + 1;
                let date = Stime.getDate();
                let result = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (date >= 10 ? date : '0' + date);
                return result
            },
            adjust() {
                if (!this.checked) {
                    this.disabled = false;
                } else {
                    this.disabled = true;
                    this.data.insCarInfoPo.licenseNo = "";
                }
            },
            goback() {
                this.$router.push({
                    path: "/operationManage/car/Quotationdetails",
                    query: {
                        serialId: this.$route.query.serialId
                    }
                });
                this.isshow = true
                this.getData()
            },
            go() {
                this.$router.push({
                    path: "/operationManage/car/Quotationdetails",
                    query: {
                        serialId: this.$route.query.serialId
                    }
                });
                this.show = true
                this.getData()
            },
            getList() {
                this.insurersList = [];
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        for (let i = 0; i < response.data.insurersList.length; i++) {
                            let obj = {
                                insurerId: response.data.insurersList[i].insurerId,
                                insurerName: response.data.insurersList[i].insurerName
                            }

                            this.insurersList.push(obj)
                        }
                     console.log(this.insurersList)
                    }
                })
            },
            priceeditor() {
                if (this.data.queryInsPricePo.tradeId == null) {
                    this.isshow = false;
                    this.getList();
                } else {
                    this.$alert('订单已经生成，不能修改询价信息！', '提示', {
                        confirmButtonText: '确定',
                    });
                }

            },
            careditor() {

                if (this.data.queryInsPricePo.tradeId == null) {
                    this.show = false
                    if (this.data.insCarInfoPo.licenseNo == 0) {
                        this.disabled = true;
                        this.checked = true;
                        this.data.insCarInfoPo.licenseNo = "";
                    }
                } else {
                    this.$alert('订单已经生成，不能修改车辆信息！', '提示', {
                        confirmButtonText: '确定',
                    });
                }
            },
            getData() {
                config(this.params).then(response => {
                    if (response.respCode === '000000') {
                        this.data = response.data;
                        this.data.queryPo.insurerName = response.data.queryInsPricePo.insurerName;
                        this.value = response.data.queryInsPricePo.insurerId;
                        this.data.queryInsPricePo.querySts = this.data.queryInsPricePo.querySts;
                        if (this.data.queryInsPricePo.syPreium) {
                            this.data.queryInsPricePo.syPreium = this.data.queryInsPricePo.syPreium / 100;
                        }
                        if (this.data.queryInsPricePo.ccsPreium) {
                            this.data.queryInsPricePo.ccsPreium = this.data.queryInsPricePo.ccsPreium / 100;
                        }
                        if (this.data.queryInsPricePo.jqPreium) {
                            this.data.queryInsPricePo.jqPreium = this.data.queryInsPricePo.jqPreium / 100;
                        }
                       let value=this.data.queryInsPricePo.querySts+''
                       let result =value.replace(/-/g, '')
                        if (result != 20) {
                            this.data.queryInsPricePo.querySts = 20
                        }
                        this.data.insCarInfoPo.transferFlag = this.data.insCarInfoPo.transferFlag + '';
                        for (let i = 0; i < this.data.queryBenefitsList.length; i++) {
                            if (this.data.queryBenefitsList[i].benefitCode.charAt(0) == 'J') {
                                this.insurance.push(this.data.queryBenefitsList[i])
                            }
                            if (this.data.queryBenefitsList[i].benefitCode.charAt(0) == 'Z') {
                                this.business.push(this.data.queryBenefitsList[i])
                            }
                            if (this.data.queryBenefitsList[i].benefitCode.charAt(0) == 'F') {
                                this.add.push(this.data.queryBenefitsList[i])
                            }

                        }
                        console.log(this.insurance)
                    } else {
                        this.$message.error(response.respMsg)
                    }

                })


            },
            submit() {
                let reg =/^[1][3,4,5,7,8][0-9]{9}$/;
                let reg1 =
                    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
                if (this.data.queryPo.queryRealName == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入车主姓名'
                    });
                    return false
                }
                if (this.data.queryPo.queryMobile == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入车主手机号'
                    });
                    return false
                }
                if (!reg.test(this.data.queryPo.queryMobile)) {
                    this.$message({
                        type: 'warning',
                        message: '手机号格式不正确'
                    });
                    return false
                }
                if (this.data.queryPo.queryIdNo == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入车主身份证'
                    });
                    return false
                }
                if (!reg1.test(this.data.queryPo.queryIdNo)) {
                    this.$message({
                        type: 'warning',
                        message: '身份证格式不正确'
                    });
                    return false
                }
                let obj = {
                    url: 'carinstallments/saveusermessage',
                    insurerId: this.value,
                    queryIdNo: this.data.queryPo.queryIdNo,
                    queryMobile: this.data.queryPo.queryMobile,
                    queryRealName: this.data.queryPo.queryRealName,
                    queryTimeStr: this.data.queryPo.queryTimeStr,
                    serialId: this.data.queryPo.serialId
                }
                obj.queryTimeStr = this.format(obj.queryTimeStr)
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        for (let i = 0; i < this.insurersList.length; i++) {
                            if (this.insurersList[i].insurerId == this.value) {
                                this.data.queryPo.insurerName = this.insurersList[i].insurerName;
                                break;
                            }
                        }
                        this.data.queryPo.queryTimeStr = this.format(this.data.queryPo.queryTimeStr);
                        this.$message.success(response.respMsg)
                        this.isshow = true
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
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
                    '-' + (date >= 10 ?
                        date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >=
                        10 ? minute :
                        '0' + minute) + ':' + (second >= 10 ? second : '0' + second)
                return result
            },
            change() {
                let reg = /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{5}$/;
                let reg1 = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,13}$/;
                let reg2 = /^[a-zA-Z0-9]{17}$/
                let reg3 = /^[a-zA-Z0-9]{1,17}$/
                let reg4 = /^([1-9]\d{0,1}|[0]{1})$/
                if (this.data.insCarInfoPo.modelType == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入品牌型号'
                    });
                    return false
                }
                if (!reg1.test(this.data.insCarInfoPo.modelType)) {
                    this.$message({
                        type: 'warning',
                        message: '品牌型号格式不正确'
                    });
                    return false
                }
                if (!this.checked) {
                    if (this.data.insCarInfoPo.licenseNo == "") {
                        this.$message({
                            type: 'warning',
                            message: '请输入车牌号'
                        });
                        return false
                    }

                }
                if (!this.checked) {
                    if (!reg.test(this.data.insCarInfoPo.licenseNo)) {
                        this.$message({
                            type: 'warning',
                            message: '车牌号格式不正确'
                        });
                        return false
                    }
                }
                if (this.data.insCarInfoPo.vinNo == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入车架号'
                    });
                    return false
                }
                if (!reg2.test(this.data.insCarInfoPo.vinNo)) {
                    this.$message({
                        type: 'warning',
                        message: '车架号格式不正确'
                    });
                    return false
                }
                if (this.data.insCarInfoPo.engineNo == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入发动机号'
                    });
                    return false
                }
                if (!reg3.test(this.data.insCarInfoPo.engineNo)) {
                    this.$message({
                        type: 'warning',
                        message: '发动机号格式不正确'
                    });
                    return false
                }
                if (this.data.insCarInfoPo.seats == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入核载人数'
                    });
                    return false
                }
                if (!reg4.test(this.data.insCarInfoPo.seats)) {
                    this.$message({
                        type: 'warning',
                        message: '核载人数只能是0到99的整数'
                    });
                    return false
                }
                let obj = {
                    url: 'carinstallments/savecarmessage',
                    carId: this.data.insCarInfoPo.carId,
                    engineNo: this.data.insCarInfoPo.engineNo,
                    firstRegDate: this.data.insCarInfoPo.firstRegDate,
                    jqStartTimeStr: this.data.insCarInfoPo.jqStartTimeStr,
                    licenseNo: this.data.insCarInfoPo.licenseNo,
                    vinNo: this.data.insCarInfoPo.vinNo,
                    seats: this.data.insCarInfoPo.seats,
                    serialId: this.data.queryPo.serialId,
                    syStartTimeStr: this.data.insCarInfoPo.syStartTimeStr,
                    transferFlag: this.data.insCarInfoPo.transferFlag,
                    modelType: this.data.insCarInfoPo.modelType,
                    transferDate: ''
                }
                obj.firstRegDate = this.correct(obj.firstRegDate);
                obj.jqStartTimeStr = this.format(obj.jqStartTimeStr);
                obj.syStartTimeStr = this.format(obj.syStartTimeStr);
                if (this.data.insCarInfoPo.transferFlag == 1) {
                    obj.transferDate = this.correct(this.data.insCarInfoPo.transferDate);
                }
                if (this.checked) {
                    obj.licenseNo = 0;
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg);
                        this.data.insCarInfoPo.firstRegDate = this.correct(this.data.insCarInfoPo.firstRegDate);
                        this.data.insCarInfoPo.jqStartTimeStr = this.format(this.data.insCarInfoPo.jqStartTimeStr);
                        this.data.insCarInfoPo.syStartTimeStr = this.format(this.data.insCarInfoPo.syStartTimeStr);
                        if (this.data.insCarInfoPo.transferFlag == 1) {
                            this.data.insCarInfoPo.transferDate = this.correct(this.data.insCarInfoPo.transferDate);
                        } else if (this.data.insCarInfoPo.transferFlag == 0) {
                            this.data.insCarInfoPo.transferDate = '';
                        }

                        this.show = true
                    } else {
                        this.$message.error(response.respMsg);
                    }
                })

            },
            presubmit() {
                let reg = /^([0-9]\d*(\.\d+)|[0]{1}|[1-9]\d*)$/;
                if (this.data.queryInsPricePo.querySts == 20) {
                    if (this.data.queryInsPricePo.syPreium == "" || this.data.queryInsPricePo.syPreium == null) {
                        this.$message({
                            type: 'warning',
                            message: '请输入商业险'
                        });
                        return false
                    }
                    if (!reg.test(this.data.queryInsPricePo.syPreium)) {
                        this.$message({
                            type: 'warning',
                            message: '商业险格式不正确'
                        });
                        return false
                    }
                    if (this.data.queryInsPricePo.jqPreium == "" || this.data.queryInsPricePo.jqPreium == null) {
                        this.$message({
                            type: 'warning',
                            message: '请输入交强险'
                        });
                        return false
                    }
                    if (!reg.test(this.data.queryInsPricePo.jqPreium)) {
                        this.$message({
                            type: 'warning',
                            message: '交强险格式不正确'
                        });
                        return false
                    }
                    if (this.data.queryInsPricePo.ccsPreium == "" || this.data.queryInsPricePo.ccsPreium == null) {
                        this.$message({
                            type: 'warning',
                            message: '请输入代缴车船税'
                        });
                        return false
                    }
                    if (!reg.test(this.data.queryInsPricePo.ccsPreium)) {
                        this.$message({
                            type: 'warning',
                            message: '代缴车船税格式不正确'
                        });
                        return false
                    }
                    if (this.data.queryInsPricePo.resultImg == ""||this.data.queryInsPricePo.resultImg==null) {
                        this.$message({
                            type: 'warning',
                            message: '请输入商业险明细'
                        });
                        return false
                    }
                    let obj = {
                        url: 'carinstallments/updateQueryInsPrice',
                        priceId: this.data.queryInsPricePo.priceId,
                        querySts: this.data.queryInsPricePo.querySts,
                        realCcsPreium: this.data.queryInsPricePo.ccsPreium,
                        realJqPreium: this.data.queryInsPricePo.jqPreium,
                        realSyPreium: this.data.queryInsPricePo.syPreium,
                        resultImg: this.data.queryInsPricePo.resultImg,
                        serialId: this.data.queryPo.serialId
                    }
                    this.$confirm('确认提交吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        config(obj).then(response => {
                            if (response.respCode === '000000') {
                                this.$message.success(response.respMsg);
                                setTimeout(() => {
                                    this.$router.push({
                                        path: "/operationManage/car/Quotationlist",
                                    });

                                }, 2000);
                            } else {
                                this.$message.error(response.respMsg);
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                }
                if (this.data.queryInsPricePo.querySts == -20) {
                    if (trim(this.data.queryInsPricePo.queryResult) == ""|| this.data.queryInsPricePo.queryResult==null) {
                        this.$message({
                            type: 'warning',
                            message: '请输入询价不成功理由'
                        });
                        return false
                    }
                    let obj = {
                        url: 'carinstallments/updateQueryInsPrice',
                        priceId: this.data.queryInsPricePo.priceId,
                        querySts: this.data.queryInsPricePo.querySts,
                        serialId: this.data.queryPo.serialId,
                        queryResult: this.data.queryInsPricePo.queryResult
                    }

                    this.$confirm('确认提交吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        config(obj).then(response => {
                            if (response.respCode === '000000') {
                                this.$message.success(response.respMsg);
                                setTimeout(() => {
                                    this.$router.push({
                                        path: "/operationManage/car/Quotationlist",
                                    });

                                }, 2000);
                            } else {
                                this.$message.error(response.respMsg);
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
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
        background-color: #20a0ff;
        border-color: #20a0ff;
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