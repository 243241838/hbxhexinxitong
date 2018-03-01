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
                                <el-input v-model="EditForm.couponName" :disabled="true" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包金额类型:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-select v-model="EditForm.couponType" disabled style="width:265px;">
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
                                <el-input v-model="EditForm.couponMinValue" :disabled="true" style="width:115px;"></el-input>
                                至
                                <el-input v-model="EditForm.couponMaxValue" :disabled="true" style="width:115px;"></el-input>
                                <span>元</span>
                            </el-col>
                        </el-row>

                        <el-row v-if="EditForm.couponType==2" style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                单个红包固定金额:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.fixedAmount" :disabled="true" style="width:115px;"></el-input>
                                <span>元</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:4px;">
                                红包有效时间:
                            </el-col>
                            <el-col :span="16" style="margin-left:10px;">
                                <el-date-picker size="small" v-model="EditForm.effTimestr" :disabled="true" placeholder="开始时间">
                                </el-date-picker>
                                至
                                <el-date-picker size="small" v-model="EditForm.expTimestr" :disabled="true" placeholder="结束时间">
                                </el-date-picker>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:4px;">
                                红包满多少金额可以使用:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.offUptoSee" :disabled="true" style="width:265px;"></el-input>
                                <el-checkbox v-model="offUptoCheckBox" @click="setRealVal()" :disabled="true">无限制</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                最大使用次数:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.maxQuantitySee" :disabled="true" style="width:115px;"></el-input>
                                <span>次</span>
                                <el-checkbox v-model="maxQuantityCheckBox" @click="setRealVal()" :disabled="true">不限</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                兑换成功提示语:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.couponPrompt" :disabled="true" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                活动地址:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.couponUrl" :disabled="true" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                红包描述:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input type="textarea" v-model="EditForm.couponDesc" :disabled="true" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>

            <el-row>
                <div class="filter-container" style="position:relative;margin-top:0px;">
                    <el-col :span="3" align="right" style="margin-top:10px;width:242px;">
                        红包发放记录:
                    </el-col>
                    <el-table :data="promotionList" border fit highlight-current-row style="width:1200px;position:relative;left:10px;">
                        <el-table-column type="index" label="序号" width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="promotionId" label="活动Id" align="center" width="120">
                        </el-table-column>
                        <el-table-column prop="promotionName" label="活动名称" align="center">
                        </el-table-column>
                        <el-table-column prop="totalAmount" label="红包总数量" align="center" width="160">
                        </el-table-column>
                        <el-table-column prop="userType" label="红包发放用户" align="center" width="160">
                            <template scope="scope">
                                <span v-for="item in couponUserTypeArr" v-show="item.value == scope.row.userType ">
                                    {{item.label}}
                            </span>
                            </template>
                        </el-table-column>

                        <el-table-column label="活动时间" align="center">
                            <template scope="scope">
                                <span>{{scope.row.effTimestr+'-'+scope.row.expTimestr}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="发放状态" prop="nowsts" align="center">
                        </el-table-column>
                    </el-table>
                </div>
            </el-row>


            <el-row>
                <el-col :span="24" align="center" style="padding-top:20px;">
                    <el-button type="primary" @click="commit(EditForm.couponId)">编辑</el-button>
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
                couponUserTypeArr: static_data.couponUserTypeArr,
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
                promotionList: [],
                offUptoCheckBox: false,
                maxQuantityCheckBox: false,
                tabHeight: '200px'
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
                        this.promotionList = response.data.promotionList;

                        var date = new Date();
                        for (var i = 0; i < this.promotionList.length; i++) {
                            var startArray = this.promotionList[i].effTimestr.split("-");
                            var endArray = this.promotionList[i].expTimestr.split("-");
                            var startDt = new Date(startArray[0], startArray[1] * 1 - 1, startArray[2].substring(
                                0, 2));
                            var endDt = new Date(endArray[0], endArray[1] * 1 - 1, endArray[2].substring(0, 2));
                            var str = "";
                            if (date < startDt && this.promotionList[i].sts != -1) {
                                str = "未开始";
                            } else if (date > endDt && this.promotionList[i].sts != -1) {
                                str = "已发放";
                            } else if (this.promotionList[i].sts == -1) {
                                str = "已作废";
                            } else {
                                str = "进行中";
                            }
                            this.promotionList[i].nowsts = str;
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
            commit(id) {
                 
                this.$router.push({ path: '/operationManage/coupon/Management/edit',query: { id: id } })
            
            },

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