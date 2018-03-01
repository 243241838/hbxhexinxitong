<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form">
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题策略ID
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="id" readonly style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题类型
                            </el-col>
                            <el-col :span="7">
                                <el-select v-model="EditForm.specialType" placeholder="请选择" style="width:265px;" :disabled=true>
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
                                <el-input v-model="EditForm.specialName" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                排序
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="EditForm.sortCode" style="width:265px;" :disabled=disable></el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题说明
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="EditForm.specialIntro" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题链接
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="EditForm.specialUrl" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题规则
                            </el-col>
                            <el-col :span="21">
                                <weditor v-bind:loanid="'subjectEditorName'" v-bind:editorName="'subjectEditorName'" v-on:listenWEditorChange="wEditorChange"
                                    v-model="EditForm.specialRole" style="width:80%;"></weditor>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题模板
                            </el-col>
                            <el-col :span="7">
                                <el-select v-model="EditForm.specialMould" placeholder="请选择" style="width:265px;">
                                    <el-option v-for="item in specialMouldArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                H5页面配图
                            </el-col>
                            <el-col :span="14" style="position:relative;">
                                <img :src="EditForm.specialLogo3" width="120" height="120" v-if="EditForm.specialLogo3" />
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'specialLogo3'" ref="img1" style="width:122px;position:absolute;left:140px;top:0px;"  v-bind:tip="''"></uploadImg>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题配图
                            </el-col>
                            <el-col :span="14" style="position:relative;">
                                  <img :src="EditForm.specialLogo2" v-if="EditForm.specialLogo2"  width="120" height="120"/>
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'specialLogo2'" ref="img2" style="width:122px;position:absolute;left:140px;top:0px;"  v-bind:tip="''"></uploadImg>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                专题时间
                            </el-col>
                            <el-col :span="21">
                                <el-date-picker size="small" v-model="EditForm.effTimestr" type="date" placeholder="开始时间">
                                </el-date-picker> 至
                                <el-date-picker size="small" v-model="EditForm.expTimestr" type="date" placeholder="结束时间">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
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
                                <el-table-column prop="productId" label="产品ID" align="center" width="140">
                                </el-table-column>
                                <el-table-column prop="productName" label="保险名称" align="center" min-width="160">
                                </el-table-column>
                                <el-table-column prop="insurerName" label="承保公司" align="center" width="140">
                                </el-table-column>
                                <el-table-column prop="className" label="保险类别" align="center" width="140">
                                </el-table-column>

                                <el-table-column label="当前库存" align="center" width="140">
                                    <template scope="scope">
                                        <span>{{scope.row.maxQuantity==-1?'不限':scope.row.maxQuantity}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="保险金额(元)" align="center" width="160">
                                    <template scope="scope">
                                        <span>{{scope.row.minPremium/100+'-'+scope.row.maxPremium/100}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="commisionValue1" label="一级佣金" align="center" width="140">
                                </el-table-column>
                              <el-table-column prop="commisionValue2" label="二级佣金" align="center" width="140">
                                </el-table-column>
                                <el-table-column label="关联产品排序" width="160">
                                    <template scope="scope">
                                        <el-input v-model="scope.row.sort" style="padding:5px 0px;"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>


                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center">
                                审核信息
                            </el-col>
                        </el-row>
                        <el-row v-show="auditLogResponsesData.length!=0">
                            <el-table :data="auditLogResponsesData" style="width: 100%">
                                <el-table-column type="index" label="序号" width="100" align="center">
                                </el-table-column>
                                <el-table-column prop="name" label="审核结果" align="center">
                                    <template scope="scope">
                                        <span v-for="item in exstsArr" v-show="item.value == scope.row.auditSts ">
                                                {{item.label}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="auditComment" label="审核不通过原因" align="center">
                                    <template scope="scope">
                                        {{scope.row.auditSts==-1?'':'/'}}
                                        <a class="list-redact" style="color:red" href="javascript:;">
                                            {{scope.row.auditSts!=-1?scope.row.auditComment:''}}</a>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="auditNickname" label="审核员" align="center">
                                    <template scope="scope">
                                        {{scope.row.auditNickname==null?'/':scope.row.auditNickname}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="auditTime1" label="审核时间" align="center">
                                    <template scope="scope">
                                        {{scope.row.auditTime1==null?'/':scope.row.auditTime1}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="reqNickname" label="操作员" align="center">
                                </el-table-column>

                                <el-table-column label="提交时间" prop="reqTime1" align="center">
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
                disable: false,
                specialTypeArr: static_data.specialTypeArr,
                specialMouldArr: static_data.specialMouldArr,
                exstsArr: static_data.exstsArr,
                id: this.$route.query.id,
                EditForm: {
                    specialType: '',
                    specialName: '',
                    sortCode: '',
                    specialIntro: '',
                    specialUrl: '',
                    specialRole: '',
                    specialMould: '',
                    specialLogo3: '',
                    specialLogo2: '',
                    effTimestr: '',
                    expTimestr: '',
                    specialId: this.$route.query.id,
                    ids: '',
                    specialProductsMap: null
                },
                productChooseViewFlag: false,
                productChooseSelectType: 'multiple',
                productsResponsesData: [],
                auditLogResponsesData: []
            }
        },
        created() {
            this.getDetail();
        },
        methods: {
            getDetail() {
                let obj = {
                    url: 'operate/getSpecialDetailInfo',
                    specialId: this.$route.query.id * 1,
                };
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.EditForm.specialType = response.data.specialResponse.specialType;
                        if (this.EditForm.specialType == 10) {
                            this.EditForm.specialType='普通';
                        }
                        this.EditForm.specialName = response.data.specialResponse.specialName;
                        this.EditForm.sortCode = response.data.specialResponse.sortCode;
                        this.EditForm.specialIntro = response.data.specialResponse.specialIntro;
                        this.EditForm.specialUrl = response.data.specialResponse.specialUrl;
                        this.EditForm.specialRole = response.data.specialResponse.specialRole;
                        this.EditForm.specialMould = response.data.specialResponse.specialMould;
                        if (this.EditForm.specialMould == 1) {
                            this.EditForm.specialMould = '模板一'
                        }
                        this.EditForm.specialLogo3 = response.data.specialResponse.specialLogo3;
                        this.EditForm.specialLogo2 = response.data.specialResponse.specialLogo2;

                        //  this.$refs.img1.setInitImg([{
                        //      name: 'specialLogo3',
                        //      url: this.EditForm.specialLogo3
                        //  }]);
                        //  this.$refs.img2.setInitImg([{
                        //      name: 'specialLogo2',
                        //      url: this.EditForm.specialLogo2
                        // }])
                        this.EditForm.effTimestr = response.data.specialResponse.effTimeStr;
                        this.EditForm.expTimestr = response.data.specialResponse.expTimeStr;
                        if (response.data.productsResponses && response.data.productsResponses.length > 0) {
                            for (var i = 0; i < response.data.productsResponses.length; i++) {
                                this.productsResponsesData = this.productsResponsesData.concat({
                                    productId: response.data.productsResponses[i].productId,
                                    productName: response.data.productsResponses[i].productName,
                                    insurerName: response.data.productsResponses[i].insurerName,
                                    className: response.data.productsResponses[i].className,
                                    maxQuantity: response.data.productsResponses[i].maxQuantity,
                                    minPremium: response.data.productsResponses[i].minPremium,
                                    maxPremium: response.data.productsResponses[i].maxPremium,
                                    commisionValue1: response.data.productsResponses[i].commisionValue1,
                                    commisionValue2: response.data.productsResponses[i].commisionValue2,
                                    sort: response.data.productsResponses[i].sortCode
                                });
                            }
                        }
                        console.log(this.productsResponsesData)
                        if (response.data.auditLogResponses && response.data.auditLogResponses.length > 0) {
                            this.auditLogResponsesData = response.data.auditLogResponses
                        }
                    }
                }).catch(err => {

                })
            },
            wEditorChange(html) {
                this.EditForm.specialRole = html;
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
                let first = "";
                let sec = ""
                this.EditForm.ids = '';
                this.EditForm.specialProductsMap = new Object();
                if (this.productsResponsesData.length > 0) {
                    for (var i = 0; i < this.productsResponsesData.length; i++) {
                        this.EditForm.ids += (
                            (i == 0 ? '' : ',') + this.productsResponsesData[i].productId);

                        // specialProductsMap
                        this.EditForm.specialProductsMap[this.productsResponsesData[i].productId] = {
                            productId: this.productsResponsesData[i].productId,
                            sortCode: this.productsResponsesData[i].sort
                        };
                    }
                }
                if (this.EditForm.specialName == "") {
                    this.$message({
                        type: 'warning',
                        message: '专题名称不能为空'
                    });
                    return false
                }
                if (this.EditForm.sortCode == "") {
                    this.$message({
                        type: 'warning',
                        message: '排序不能为空'
                    });
                    return false
                }
                let reg = /^(0+)$/;
                if (reg.test(this.EditForm.sortCode)) {
                    this.$message({
                        type: 'warning',
                        message: '普通专题的排序不能是0或是全部都是0'
                    });
                    return false
                }
                let reg1 = /^([1-9]\d*)$/;
                if (!reg1.test(this.EditForm.sortCode)) {
                    this.$message({
                        type: 'warning',
                        message: '普通专题的排序必须是大于零的数字'
                    });
                    return false
                }

                if (this.EditForm.specialIntro == "") {
                    this.$message({
                        type: 'warning',
                        message: '专题说明不能为空'
                    });
                    return false
                }
                let result = this.EditForm.specialRole.replace("<p>", "").replace("</p>", "").replace("<br>", "").replace(
                    /&nbsp;/gi, '').trim();
                if (result == "") {
                    this.$message({
                        type: 'warning',
                        message: '修改普通专题时，专题规则不能为空！'
                    });
                    return false
                }
                if (this.EditForm.specialLogo3 == "") {
                    this.$message({
                        type: 'warning',
                        message: '编辑普通专题时，H5页面配图不能为空！'
                    });
                    return false
                }




                //拼接产品id  ids:'',  specialProductsMap:[]
                // if (this.EditForm.specialType == '普通') {
                //     this.EditForm.specialType = 10;
                // } else if (this.EditForm.specialType == '爆款') {
                //     this.EditForm.specialType = 20;
                // }
                // if (this.EditForm.specialMould == '模板一') {
                //     this.EditForm.specialMould = 1;
                // }
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
                        message: '结束日期必须大于或等于起始日期'
                    });
                    return false
                }

                // this.EditForm.ids = '';
                if (this.EditForm.ids == "") {
                    this.$message({
                        type: 'warning',
                        message: '关联产品不能为空'
                    });
                    return false
                }
                for (let i = 0; i < this.productsResponsesData.length; i++) {
                    if (this.productsResponsesData[i].sort == null || this.productsResponsesData[i].sort == "") {
                        this.$message({
                            type: 'warning',
                            message: '关联产品排序不能为空！'
                        });
                        return false
                    }
                }

                let reg2 = /^[1-9]\d*$/;
                for (let i = 0; i < this.productsResponsesData.length; i++) {
                    if (!reg2.test(this.productsResponsesData[i].sort)) {
                        this.$message({
                            type: 'warning',
                            message: '关联产品排序必须是大于零的数字'
                        });
                        return false
                    }
                }
                // this.EditForm.specialProductsMap = new Object();
                // if (this.productsResponsesData.length > 0) {
                //     for (var i = 0; i < this.productsResponsesData.length; i++) {
                //         this.EditForm.ids += (
                //             (i == 0 ? '' : ',') + this.productsResponsesData[i].productId);

                //         // specialProductsMap
                //         this.EditForm.specialProductsMap[this.productsResponsesData[i].productId] = {
                //             productId: this.productsResponsesData[i].productId,
                //             sortCode: this.productsResponsesData[i].sort
                //         };
                //     }
                // }
                //时间转换
                this.EditForm.effTimestr = util.changeDate(this.EditForm.effTimestr);
                this.EditForm.expTimestr = util.changeDate(this.EditForm.expTimestr);
                if (this.EditForm.specialType == '普通') {
                    this.EditForm.specialType = 10
                }
                if (this.EditForm.specialMould == '模板一') {
                    this.EditForm.specialMould = 1
                }
                this.EditForm.url = 'operate/updateSpecial';
                config(this
                    .EditForm).then(response => {
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
                if ('specialLogo2' == params[1]) {
                    this.EditForm.specialLogo2 = params[0]
                } else if ('specialLogo3' == params[1]) {
                    this.EditForm.specialLogo3 = params[0]
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