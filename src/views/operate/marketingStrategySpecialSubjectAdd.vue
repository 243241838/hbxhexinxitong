<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form">
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题类型
                            </el-col>
                            <el-col :span="7">
                                <el-select v-model="AddForm.specialType" placeholder="请选择" style="width:265px;" :disabled="true">
                                    <el-option v-for="item in specialTypeArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题名称
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="AddForm.specialName" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                排序
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="AddForm.sortCode" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题说明
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="AddForm.specialIntro" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题链接
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="AddForm.specialUrl" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center">
                                专题规则
                            </el-col>
                            <el-col :span="21">
                                <weditor v-bind:loanid="'subjectEditorName'" v-bind:editorName="'subjectEditorName'" v-on:listenWEditorChange="wEditorChange"
                                    v-model="AddForm.specialRole" style="width:80%;"></weditor>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题模板
                            </el-col>
                            <el-col :span="7">
                                <el-select v-model="AddForm.specialMould" placeholder="请选择" style="width:265px;">
                                    <el-option v-for="item in specialMouldArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                H5页面配图
                            </el-col>
                            <el-col :span="7">
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'specialLogo3'" style="width:122px;"></uploadImg>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题配图
                            </el-col>
                            <el-col :span="7">
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'specialLogo2'" style="width:122px;"></uploadImg>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center">
                                开始时间
                            </el-col>
                            <el-col :span="21">
                                <el-date-picker size="small" v-model="AddForm.effTimestr" type="date" placeholder="开始时间" style="margin-right:4px;">
                                </el-date-picker>至
                                <el-date-picker size="small" v-model="AddForm.expTimestr" type="date" placeholder="结束时间" style="margin-right:4px;">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center">
                                关联产品
                            </el-col>
                            <el-col :span="7">
                                <el-button type="primary" icon="plus" size="small" @click="chooseProduct()">选择</el-button>
                            </el-col>
                        </el-row>
                        <el-row v-show="productsResponsesData.length!=0">
                            <el-table :data="productsResponsesData" style="width: 100%">
                                <el-table-column type="index" label="序号" width="100" align="center">
                                </el-table-column>
                                <el-table-column prop="name" label="操作" width="120" align="center">
                                    <template scope="scope">
                                        <a href="javascript:void(0);" @click="delPro(scope.row.productId)">删除</a>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="productId" label="产品ID" align="center" width="120">
                                </el-table-column>
                                <el-table-column prop="productName" label="保险名称" align="center" width="200">
                                </el-table-column>
                                <el-table-column prop="insurerName" label="承保公司" align="center" width="160">
                                </el-table-column>
                                <el-table-column prop="className" label="保险类别" align="center" width="160">
                                </el-table-column>

                                <el-table-column label="当前库存" align="center" width="160">
                                    <template scope="scope">
                                        <span>{{scope.row.maxQuantity==-1?'不限':scope.row.maxQuantity}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="保险金额(元)" align="center" width="160">
                                    <template scope="scope">
                                        <span>{{scope.row.minPremium/100+'-'+scope.row.maxPremium/100}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="commisionValue1" label="一级佣金" align="center" width="160">
                                </el-table-column>

                                <el-table-column prop="commisionValue2" label="二级佣金" align="center" width="160">
                                </el-table-column>
                               <el-table-column label="关联产品排序" width="160" align="center">
                                    <template scope="scope">
                                        <el-input v-model="scope.row.sort" style="padding:5px 0px;"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" align="center" style="padding-top:20px;">
                    <el-button type="primary" @click="commit()">提交审核</el-button>
                    <el-button type="primary" @click="backParent()">取 消</el-button>
                </el-col>
            </el-row>

            <el-dialog :visible.sync="productChooseViewFlag" :modal-append-to-body="false" v-bind:size="'large'">
                <productChooseWin v-on:child-geiIds="chooseProdIds" v-on:child-cancle="productChooseViewFlag=false" v-bind:selectType="productChooseSelectType"></productChooseWin>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    // import ElRow from "element-ui/packages/row/src/row";
    import * as static_data from '@utils/static_data.js';
    import * as util from '@src/utils/util';
    import productChooseWin from "./productChooseWin.vue";
    import weditor from '@components/WEditor.vue';
    import uploadImg from "@src/components/uploadImg";

    export default {
        components: {
            productChooseWin,
            weditor,
            uploadImg
        },
        data() {
            return {
                specialTypeArr: static_data.specialTypeArr,
                specialMouldArr: static_data.specialMouldArr,
                AddForm: {
                    specialType: '普通',
                    specialName: '',
                    sortCode: '',
                    specialIntro: '',
                    specialUrl: '',
                    specialRole: '',
                    specialMould: '1',
                    specialLogo3: '',
                    specialLogo2: '',
                    effTimestr: '',
                    expTimestr: '',
                    specialProductsIds: ''
                },
                productChooseViewFlag: false,
                productChooseSelectType: 'multiple',
                productsResponsesData: []
            }
        },
        methods: {
            wEditorChange(html) {
                this.AddForm.specialRole = html;
            },
            chooseProduct() { //弹出选择产品选项
                this.productChooseViewFlag = true;
            },
            chooseProdIds(productRow) {
                var that = this;
                var checkMap = new Map();
                that.productsResponsesData.forEach(function (v) {
                    checkMap.set(v.productId, 'xxx');
                });
                productRow.forEach(function (v) {
                    if (!checkMap.has(v.productId)) {
                        that.productsResponsesData.push(v);
                    }
                });

                this.productChooseViewFlag = false;
            },
            delPro(id) { //删除
                this.$confirm('确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (var i = 0; i < this.productsResponsesData.length; i++) {
                        if (this.productsResponsesData[i].productId == id) {
                            this.productsResponsesData.splice(i, 1);
                        }
                    }
                }).catch(() => {});
            },
            backParent() {
                this.$router.push({
                    path: '/operationManage/marketingStrategy/specialSubject'
                })
            },
            commit() {
                if (this.AddForm.specialName == "") {
                    this.$message({
                        type: 'warning',
                        message: '专题名称不能为空'
                    });
                    return false
                }
                if (this.AddForm.sortCode == "") {
                    this.$message({
                        type: 'warning',
                        message: '排序不能为空'
                    });
                    return false
                }
                let reg = /^(0+)$/;
                if (reg.test(this.AddForm.sortCode)) {
                    this.$message({
                        type: 'warning',
                        message: '普通专题的排序不能是0或是全部都是0'
                    });
                    return false
                }
                let reg1 = /^([1-9]\d*|0[\d]+)$/;
                if (!reg1.test(this.AddForm.sortCode)) {
                    this.$message({
                        type: 'warning',
                        message: '普通专题的排序必须是数字'
                    });
                    return false
                }
                if (this.AddForm.specialIntro == "") {
                    this.$message({
                        type: 'warning',
                        message: '专题说明不能为空'
                    });
                    return false
                }
                let result = this.AddForm.specialRole.replace("<p>", "").replace("</p>", "").replace("<br>", "").replace(
                    /&nbsp;/gi, '').trim();
                if (result == "") {
                    this.$message({
                        type: 'warning',
                        message: '专题规则不能为空'
                    });
                    return false
                }
                if (this.AddForm.specialLogo3 == "") {
                    this.$message({
                        type: 'warning',
                        message: '新增普通专题时，H5页面配图不能为空！'
                    });
                    return false
                }

                if (this.AddForm.effTimestr == "") {
                    this.$message({
                        type: 'warning',
                        message: '开始时间不能为空'
                    });
                    return false
                }
                if (this.AddForm.expTimestr == "") {
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
                if (this.productsResponsesData.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '关联产品不能为空'
                    });
                    return false
                }
                let reg3 = /^[1-9]\d*$/;
                for (var i = 0; i < this.productsResponsesData.length; i++) {
                    if (this.productsResponsesData[i].sort ==null) {
                        this.$message({
                            type: 'warning',
                            message: '关联产品排序不能为空'
                        });
                        return false
                    }
                    if (!reg3.test(this.productsResponsesData[i].sort)) {
                        this.$message({
                            type: 'warning',
                            message: '关联产品排序必须是大于零的整数'
                        });
                        return false
                    }

                }
                //拼接产品id
                this.AddForm.specialProductsIds = '';
                if (this.productsResponsesData.length > 0) {
                    for (var i = 0; i < this.productsResponsesData.length; i++) {
                        this.AddForm.specialProductsIds += ((
                            (i == 0 ? '' : ',') +
                            this.productsResponsesData[i].productId + '-' + this.productsResponsesData[i].sort));
                    }
                }
                //时间转换
                this.AddForm.effTimestr = util.changeDate(this.AddForm.effTimestr);
                this.AddForm.expTimestr = util.changeDate(this.AddForm.expTimestr);
                this.AddForm.specialType = '10';
                this.AddForm.url = 'operate/addSpecialProduct';
                config(this.AddForm).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                         setTimeout(() => {
                                this.$router.push({
                                    path: "/operationManage/marketingStrategy/specialSubject",
                                });

                            }, 2000);
                    } else {
                        this.$message.error(response.respMsg)
                    }
                }).catch(err => {

                })
            },
            acqImgUrl(params) {
                if ('specialLogo3' == params[1]) {
                    this.AddForm.specialLogo3 = params[0]
                } else if ('specialLogo2' == params[1]) {
                    this.AddForm.specialLogo2 = params[0]
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
</style>