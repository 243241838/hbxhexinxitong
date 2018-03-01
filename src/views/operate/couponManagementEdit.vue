<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form">
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包规则ID:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.couponId" style="width:265px;" readonly="readonly"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包名称:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.couponName" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包金额类型:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-select v-model="EditForm.couponType" style="width:265px;">
                                    <el-option v-for="item in couponTypeAddArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>

                        <el-row v-if="EditForm.couponType==3" style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                单个红包随机金额范围:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.couponMinValue" style="width:115px;" placeholder="最小值"></el-input>
                                至
                                <el-input v-model="EditForm.couponMaxValue" style="width:115px;" placeholder="最大值"></el-input>
                                <span>元</span>
                            </el-col>
                        </el-row>

                        <el-row v-if="EditForm.couponType==2" style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                单个红包固定金额:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.fixedAmount" style="width:115px;"></el-input>
                                <span>元</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:4px;">
                                红包有效时间:
                            </el-col>
                            <el-col :span="16" style="margin-left:10px;">
                                <el-date-picker size="small" v-model="EditForm.effTimestr" placeholder="开始时间">
                                </el-date-picker>
                                至
                                <el-date-picker size="small" v-model="EditForm.expTimestr" placeholder="结束时间">
                                </el-date-picker>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包满多少金额可以使用:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.offUptoSee" :disabled="offUptoCheckBox" style="width:265px;"></el-input>
                                <span>元</span>
                                <el-checkbox v-model="offUptoCheckBox" @click="setRealVal()" style="margin-top:-4px;">无限制</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                最大使用次数:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.maxQuantitySee" :disabled="maxQuantityCheckBox" style="width:115px;"></el-input>
                                <span>次</span>
                                <el-checkbox v-model="maxQuantityCheckBox" @click="setRealVal()" style="margin-top:-4px;">不限</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                兑换成功提示语:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.couponPrompt" style="width:265px;" placeholder="选填"></el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                活动地址:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.couponUrl" style="width:265px;" placeholder="选填"></el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包描述:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input type="textarea" v-model="EditForm.couponDesc" style="width:265px;" placeholder="选填"></el-input>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" align="center">
                    <el-button type="primary" @click="commit()">保存</el-button>
                    <el-button type="primary" @click="backParent()">取 消</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as static_data from '@utils/static_data.js';
    import * as util from '@src/utils/util';

    export default {
        data() {
            return {
                couponTypeAddArr: static_data.couponTypeAddArr,
                EditForm: {
                    couponName: '',
                    couponType: '',
                    couponMinValue: '',
                    couponMaxValue: '',
                    fixedAmount: '',
                    effTimestr: null,
                    expTimestr: null,
                    offUpto: '',
                    maxQuantity: '',
                    offUptoSee: '',
                    maxQuantitySee: '',
                    couponPrompt: '',
                    couponUrl: '',
                    couponDesc: '',
                    couponId: this.$route.query.id
                },
                offUptoCheckBox: false,
                maxQuantityCheckBox: false
            }
        },
        created() {
            this.getDetail();
        },
        methods: {
            getDetail() {
                let obj = {
                    url: 'coupons/getCouponsById',
                    couponId: this.$route.query.id,
                };
                config(obj).then(response => {
                    console.log(response);
                    if (response.respCode === '000000') {
                        this.EditForm.couponName = response.data.couponName;
                        this.EditForm.couponType = response.data.couponType;
                        this.EditForm.couponMinValue = response.data.couponMinValue / 100;
                        this.EditForm.couponMaxValue = response.data.couponMaxValue / 100;
                        this.EditForm.fixedAmount = response.data.couponValue / 100;
                        this.EditForm.effTimestr = response.data.effTimestr;
                        this.EditForm.expTimestr = response.data.expTimestr;
                        this.EditForm.offUpto = response.data.offUpto / 100;
                        this.EditForm.maxQuantity = response.data.maxQuantity;
                        this.EditForm.offUptoSee = response.data.offUpto / 100;
                        this.EditForm.maxQuantitySee = response.data.maxQuantity;
                        this.EditForm.couponPrompt = response.data.couponPrompt;
                        this.EditForm.couponUrl = response.data.couponUrl;
                        this.EditForm.couponDesc = response.data.couponDesc;

                        if (this.EditForm.offUpto == 0) {
                            this.offUptoCheckBox = true;
                        }
                        if (this.EditForm.maxQuantity == 0) {
                            this.maxQuantityCheckBox = true;
                        }
                    }
                }).catch(err => {

                })
            },
            backParent() {
                this.$router.push({
                    path: '/operationManage/coupon/Management'
                })
            },
            commit() {
                let first = "";
                let sec = "";
                let reg = /^[1-9]\d*$/
                if (this.EditForm.couponName == '') {
                    this.$message({
                        type: 'warning',
                        message: '请输入红包名称'
                    });
                    return false
                }
                if (this.EditForm.couponType == 3) {
                    if (this.EditForm.couponMinValue == "") {
                        this.$message({
                            type: 'warning',
                            message: '单个红包随机金额最小值不能为空'
                        });
                        return false
                    }
                }
                if (this.EditForm.couponType == 3) {
                    if (this.EditForm.couponMaxValue == "") {
                        this.$message({
                            type: 'warning',
                            message: '单个红包随机金额最大值不能为空'
                        });
                        return false
                    }
                }
                if (this.EditForm.couponType == 3) {
                    if (!reg.test(this.EditForm.couponMinValue)) {
                        this.$message({
                            type: 'warning',
                            message: '单个红包随机金额最小值必须是大于零的整数'
                        });
                        return false
                    }
                }
                if (this.EditForm.couponType == 3) {
                    if (!reg.test(this.EditForm.couponMaxValue)) {
                        this.$message({
                            type: 'warning',
                            message: '单个红包随机金额最大值必须是大于零的整数'
                        });
                        return false
                    }
                }
                if (this.EditForm.couponType == 3) {
                    if (this.EditForm.couponMinValue > this.EditForm.couponMaxValue) {
                        this.$message({
                            type: 'warning',
                            message: '单个红包随机金额最大值不能小于最小值'
                        });
                        return false
                    }
                }
                if (this.EditForm.couponType == 2) {
                    if (this.EditForm.fixedAmount == "") {
                        this.$message({
                            type: 'warning',
                            message: '单个红包固定金额不能为空'
                        });
                        return false
                    }
                }
                if (this.EditForm.couponType == 2) {
                    if (!reg.test(this.EditForm.fixedAmount)) {
                        this.$message({
                            type: 'warning',
                            message: '单个红包固定金额为大于零的整数'
                        });
                        return false
                    }
                }
                if (typeof (this.EditForm.effTimestr) == 'string') {
                    first = new Date(this.EditForm.effTimestr.replace(/-/g, '/')).getTime()
                } else {
                    first = new Date(this.EditForm.effTimestr).getTime()
                }
                if (typeof (this.EditForm.expTimestr) == 'string') {
                    sec = new Date(this.EditForm.expTimestr.replace(/-/g, '/')).getTime()
                } else {
                    sec = new Date(this.EditForm.expTimestr).getTime()
                }
                if (first > sec) {
                    this.$message({
                        type: 'warning',
                        message: '结束时间不能小于开始时间'
                    });
                    return false
                }
                if (!this.offUptoCheckBox) {
                    if (this.EditForm.offUptoSee == "") {
                        this.$message({
                            type: 'warning',
                            message: '红包满多少金额可以使用不能为空'
                        });
                        return false
                    }
                }
                if (!this.offUptoCheckBox) {
                    if (!reg.test(this.EditForm.offUptoSee)) {
                        this.$message({
                            type: 'warning',
                            message: '红包满多少金额可以使用的金额必须是大于零的整数'
                        });
                        return false
                    }
                }
                if (!this.maxQuantityCheckBox) {
                    if (this.EditForm.maxQuantitySee == "") {
                        this.$message({
                            type: 'warning',
                            message: '最大使用次数不能为空'
                        });
                        return false
                    }
                }
                if (!this.maxQuantityCheckBox) {
                    if (!reg.test(this.EditForm.maxQuantitySee)) {
                        this.$message({
                            type: 'warning',
                            message: '最大使用次数必须是大于零的整数'
                        });
                        return false
                    }
                }
                this.EditForm.effTimestr = util.changeDate(this.EditForm.effTimestr);
                this.EditForm.expTimestr = util.changeDate(this.EditForm.expTimestr);

                this.EditForm.offUpto = this.EditForm.offUptoSee;
                this.EditForm.maxQuantity = this.EditForm.maxQuantitySee;


                if (this.offUptoCheckBox) {
                    this.EditForm.offUpto = 0;
                }
                if (this.maxQuantityCheckBox) {
                    this.EditForm.maxQuantity = 0;
                }


                if (this.EditForm.couponType == 3) {
                    this.EditForm.fixedAmount = '';
                }
                if (this.EditForm.couponType == 2) {
                    this.EditForm.couponMinValue = '';
                    this.EditForm.couponMaxValue = '';
                }

                this.EditForm.url = '/coupons/editcoupon';
                this.$confirm('确认提交吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    config(this.EditForm).then(response => {
                        if (response.respCode === '000000') {
                            this.$message.success(response.respMsg)
                            setTimeout(() => {
                                this.$router.push({
                                    path: "/operationManage/coupon/management",
                                });

                            }, 2000);
                        } else {
                            this.$message.error(response.respMsg)
                        }
                    }).catch(err => {

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });

            }
        },
        watch: {
            offUptoCheckBox(curVal, oldVal) {
                if (curVal) {
                    this.EditForm.offUptoSee = '';
                    this.EditForm.offUpto = 0;
                }
            },
            maxQuantityCheckBox(curVal, oldVal) {
                if (curVal) {
                    this.EditForm.maxQuantitySee = '';
                    this.EditForm.maxQuantity = 0;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .app-container {
        position: relative;
        margin: 10px 10px 0 10px;
    }

    .app-container .filter-container {
        margin-top: 20px;
    }

    .app-container .filter-container .rightData {
        margin-right: 100px;
    }

    .www-v-button {
        position: absolute;
        left: 500px;
        z-index: 1;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>