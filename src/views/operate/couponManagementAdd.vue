<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form">
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包名称:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="AddForm.couponName" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包金额类型:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-select v-model="AddForm.couponType" style="width:265px;">
                                    <el-option v-for="item in couponTypeAddArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>

                        <el-row v-if="AddForm.couponType==3" style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                单个红包随机金额范围:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="AddForm.couponMinValue" style="width:115px;"></el-input>
                                至
                                <el-input v-model="AddForm.couponMaxValue" style="width:115px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row v-if="AddForm.couponType==2" style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                单个红包固定金额:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="AddForm.fixedAmount" style="width:115px;"></el-input>
                                <span>元</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:4px;">
                                红包有效时间:
                            </el-col>
                            <el-col :span="16" style="margin-left:10px;">
                                <el-date-picker size="small" v-model="AddForm.effTimestr" placeholder="开始日期">
                                </el-date-picker>
                                至
                                <el-date-picker size="small" v-model="AddForm.expTimestr" placeholder="结束日期">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包满多少金额可以使用:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="AddForm.offUptoSee" :disabled="offUptoCheckBox" style="width:265px;"></el-input>
                                <span>元</span>
                                <el-checkbox v-model="offUptoCheckBox" @click="setRealVal()" style="margin-top:-4px;">无限制</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                最大使用次数:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="AddForm.maxQuantitySee" :disabled="maxQuantityCheckBox" style="width:115px;"></el-input>
                                <span>次</span>
                                <el-checkbox v-model="maxQuantityCheckBox" @click="setRealVal()" style="margin-top:-4px;">不限</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                兑换成功提示语:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="AddForm.couponPrompt" placeholder="选填" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                活动地址:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="AddForm.couponUrl" placeholder="选填" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包描述:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input type="textarea" v-model="AddForm.couponDesc" placeholder="选填" style="width:265px;"></el-input>
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
                AddForm: {
                    couponName: '',
                    couponType: 2,
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
                    couponDesc: ''
                },
                offUptoCheckBox: false,
                maxQuantityCheckBox: false
            }
        },
        methods: {
            backParent() {
                this.$router.push({
                    path: '/operationManage/coupon/Management'
                })
            },
            commit() {
                let reg = /^[1-9]\d*$/
                if (this.AddForm.couponName == '') {
                    this.$message({
                        type: 'warning',
                        message: '请输入红包名称'
                    });
                    return false
                }
                if (this.AddForm.couponType == 3) {
                    if (this.AddForm.couponMinValue == "") {
                        this.$message({
                            type: 'warning',
                            message: '单个红包随机金额最小值不能为空'
                        });
                        return false
                    }
                }
                if (this.AddForm.couponType == 3) {
                    if (this.AddForm.couponMaxValue == "") {
                        this.$message({
                            type: 'warning',
                            message: '单个红包随机金额最大值不能为空'
                        });
                        return false
                    }
                }
                if (this.AddForm.couponType == 3) {
                    if (!reg.test(this.AddForm.couponMinValue)) {
                        this.$message({
                            type: 'warning',
                            message: '单个红包随机金额最小值必须是大于零的整数'
                        });
                        return false
                    }
                }
                if (this.AddForm.couponType == 3) {
                    if (!reg.test(this.AddForm.couponMaxValue)) {
                        this.$message({
                            type: 'warning',
                            message: '单个红包随机金额最大值必须是大于零的整数'
                        });
                        return false
                    }
                }
                if (this.AddForm.couponType == 3) {
                    if (this.AddForm.couponMinValue > this.AddForm.couponMaxValue) {
                        this.$message({
                            type: 'warning',
                            message: '单个红包随机金额最大值不能小于最小值'
                        });
                        return false
                    }
                }
                if (this.AddForm.couponType == 2) {
                    if (this.AddForm.fixedAmount == "") {
                        this.$message({
                            type: 'warning',
                            message: '单个红包固定金额不能为空'
                        });
                        return false
                    }
                }
                if (this.AddForm.couponType == 2) {
                    if (!reg.test(this.AddForm.fixedAmount)) {
                        this.$message({
                            type: 'warning',
                            message: '单个红包固定金额为大于零的整数'
                        });
                        return false
                    }
                }
                if (this.AddForm.effTimestr == null) {
                    this.$message({
                        type: 'warning',
                        message: '开始时间不能为空'
                    });
                    return false
                }
                if (this.AddForm.expTimestr == null) {
                    this.$message({
                        type: 'warning',
                        message: '结束时间不能为空'
                    });
                    return false
                }
                if (new Date(this.AddForm.effTimestr).getTime() > new Date(this.AddForm.expTimestr).getTime()) {
                    this.$message({
                        type: 'warning',
                        message: '结束时间不能小于开始时间'
                    });
                    return false
                }
                if (!this.offUptoCheckBox) {
                    if (this.AddForm.offUptoSee == "") {
                        this.$message({
                            type: 'warning',
                            message: '红包满多少金额可以使用不能为空'
                        });
                        return false
                    }
                }
                if (!this.offUptoCheckBox) {
                    if (!reg.test(this.AddForm.offUptoSee)) {
                        this.$message({
                            type: 'warning',
                            message: '红包满多少金额可以使用的金额必须是大于零的整数'
                        });
                        return false
                    }
                }
                if (!this.maxQuantityCheckBox) {
                    if (this.AddForm.maxQuantitySee == "") {
                        this.$message({
                            type: 'warning',
                            message: '最大使用次数不能为空'
                        });
                        return false
                    }
                }
                if (!this.maxQuantityCheckBox) {
                    if (!reg.test(this.AddForm.maxQuantitySee)) {
                        this.$message({
                            type: 'warning',
                            message: '最大使用次数必须是大于零的整数'
                        });
                        return false
                    }
                }
                this.AddForm.offUpto = this.AddForm.offUptoSee
                this.AddForm.maxQuantity = this.AddForm.maxQuantitySee;

                if (this.offUptoCheckBox) {
                    this.AddForm.offUpto = 0;
                }
                if (this.maxQuantityCheckBox) {
                    this.AddForm.maxQuantity = 0;
                }

                if (this.AddForm.couponType == 3) {
                    this.AddForm.fixedAmount = '';
                }
                if (this.AddForm.couponType == 2) {
                    this.AddForm.couponMinValue = '';
                    this.AddForm.couponMaxValue = '';
                }

                this.AddForm.effTimestr = util.changeDate(this.AddForm.effTimestr);
                this.AddForm.expTimestr = util.changeDate(this.AddForm.expTimestr);

                this.AddForm.url = '/coupons/addCoupons';
                this.$confirm('确认提交吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    config(this.AddForm).then(response => {
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
                    this.AddForm.offUptoSee = '';
                    this.AddForm.offUpto = 0;
                }
            },
            maxQuantityCheckBox(curVal, oldVal) {
                if (curVal) {
                    this.AddForm.maxQuantitySee = '';
                    this.AddForm.maxQuantity = 0;
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