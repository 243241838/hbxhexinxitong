<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="22" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form" :model="AddForm">
                        <el-form-item label="赠险名称:">
                            <el-input style="width:265px;" v-model="AddForm.couponName"></el-input>
                        </el-form-item>
                        <el-form-item label="关联产品:">
                            <el-button v-waves @click="productChooseViewFlag=true">选择</el-button>
                            <el-dialog :visible.sync="productChooseViewFlag" :modal-append-to-body="false" v-bind:size="'large'">
                                <productChooseWin v-on:child-geiIds="chooseProdIds" v-on:child-cancle="productChooseViewFlag=false" v-bind:selectType="'single'"></productChooseWin>
                            </el-dialog>
                            <el-table fit border highlight-current-row stripe style="width:100%;margin-top:10px; margin-bottom:10px;" :data="productsResponsesData"
                                v-if="productsResponsesData.length>0">
                                <el-table-column label="序号" width="100" align="center">
                                    <template scope="scope">
                                        <span>1</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" width="100">
                                    <template scope="scope">
                                        <span style="color:#3498da;cursor:pointer;" @click="dele">删除</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="productId" label="产品ID " align="center" width="120"></el-table-column>
                                <el-table-column label="保险名称" align="center" prop="productName"> </el-table-column>
                                <el-table-column label="承保公司 " width="140" align="center" prop="insurerName"></el-table-column>
                                <el-table-column label="保险类别" width="140" align="center" prop="className"></el-table-column>
                                <el-table-column label="当前库存" width="140" align="center">
                                    <template scope="scope">
                                        <span>{{scope.row.maxQuantity==-1?'不限':scope.row.maxQuantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="保险金额(元) " width="160" align="center">
                                    <template scope="scope">
                                        <span>{{scope.row.sumInsured/100}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="一级佣金 " width="140" align="center" prop="commisionValue1"> </el-table-column>
                                <el-table-column label="二级佣金 " width="140" align="center" prop="commisionValue2"></el-table-column>
                            </el-table>
                        </el-form-item>
                        <el-form-item label="产品配图：">
                            <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:tip="''" v-bind:bodyWidth="120"></uploadImg>
                        </el-form-item>
                        <el-form-item label="开始时间:">
                            <el-date-picker type="date" placeholder="开始时间" style="width:265px;" :editable="false" v-model="AddForm.effTimestr"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间:">
                            <el-date-picker type="date" placeholder="结束时间" style="width:265px;" :editable="false" v-model="AddForm.expTimestr"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="兑换成功提示语:">
                            <el-input style="width:265px;" placeholder="选填" v-model="AddForm.couponPrompt"></el-input>
                        </el-form-item>
                        <el-form-item label="活动地址:">
                            <el-input style="width:265px;" placeholder="选填" v-model="AddForm.couponUrl"></el-input>
                        </el-form-item>
                        <el-form-item label="赠险描述:">
                            <el-input type="textarea" :row="3" style="width:265px;" placeholder="选填" v-model="AddForm.couponDesc"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="btn">
                <input type="button" value="保存" class="ui-btn-blue" @click="commit">
                <input type="button" value="取消" class="ui-btn-grey" @click="go">
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as static_data from '@utils/static_data.js';
    import * as util from '@src/utils/util';
    import productChooseWin from "./productChooseWin.vue";
    import uploadImg from "@src/components/uploadImg";
    export default {
        components: {
            productChooseWin,
            uploadImg
        },
        data() {
            return {
                couponTypeAddArr: static_data.couponTypeAddArr,
                AddForm: {
                    url: 'coupons/addProductCoupons',
                    couponDesc: '',
                    couponName: '',
                    couponPrompt: '',
                    couponUrl: '',
                    effTimestr: null,
                    expTimestr: null,
                    productLogo: '',
                    couponPrompt: '',
                    couponUrl: '',
                    couponDesc: '',
                    productId: ''
                },
                productChooseViewFlag: false,
                productsResponsesData: [],
            }
        },
        methods: {
            dele() {
                this.$confirm('确定删除吗？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.productsResponsesData = [];
                    this.AddForm.productId = "";
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            acqImgUrl(params) {
                this.AddForm.productLogo = params[0];
            },
            chooseProdIds(productRow) {
                this.AddForm.productId = ''
                this.productsResponsesData = [];
                for (let i = 0; i < productRow.length; i++) {
                    this.productsResponsesData.push(productRow[i])
                }
                this.AddForm.productId = this.productsResponsesData[0].productId;
                this.productChooseViewFlag = false;
                console.log(this.AddForm.productId)
            },
            go() {
                this.$router.go(-1);
            },
            commit() {
                if (this.AddForm.couponName == "") {
                    this.$message({
                        type: 'warning',
                        message: '赠险名称不能为空'
                    });
                    return false
                }
                if (this.AddForm.productId == '') {
                    this.$message({
                        type: 'warning',
                        message: '关联产品不能为空'
                    });
                    return false
                }
                if (this.AddForm.productLogo == '') {
                    this.$message({
                        type: 'warning',
                        message: '产品配图不能为空'
                    });
                    return false
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
                this.AddForm.effTimestr = this.format(this.AddForm.effTimestr);
                this.AddForm.expTimestr = this.format(this.AddForm.expTimestr);
                this.$confirm('确定提交吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    config(this.AddForm).then(response => {
                        if (response.respCode === '000000') {
                            this.$message.success(response.respMsg)
                            setTimeout(() => {
                                this.$router.push({
                                    path: "/operationManage/coupon/giftInsurance",
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

            },
            format(time) {
                let Stime = new Date(time);
                let year = Stime.getFullYear();
                let month = Stime.getMonth() + 1;
                let date = Stime.getDate();
                let result = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (date >= 10 ? date : '0' + date);
                return result
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

    .center_a {
        display: inline-block;
        padding: 5px 15px;
        background: #e3e3e3;
        border-radius: 5px;
        color: #424242;
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