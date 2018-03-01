<template>
    <div class="ggg_user">
         <h2>专题基本详情</h2>
          <div class="text">
                  <el-form label-position="center" label-width="100px" class="noborder" v-if="data.itemType == 11">
                    <el-form-item label="专题类ID">
                        <span class="el-input" v-text="output.specialsPo.specialId"></span>
                    </el-form-item>
                    <el-form-item label="专题名称">
                        <span class="el-input" v-text="output.specialsPo.specialName"></span>
                    </el-form-item>
                    <el-form-item label="专题说明">
                        <span class="el-input" v-text="output.specialsPo.specialIntro"></span>
                    </el-form-item>
                    <el-form-item label="专题链接">
                        <span class="el-input" v-text="output.specialsPo.specialUrl"></span>
                    </el-form-item>
                    <el-form-item label="专题规则">
                        <span class="el-input" v-html="output.specialsPo.specialRole"></span>
                    </el-form-item>
                    <el-form-item label="专题模板">
                        <span class="el-input" v-text="output.specialsPo.specialMould"></span>
                    </el-form-item>
                    <el-form-item label="h5页面配图">
                        <img :src="output.specialsPo.specialLogo3" alt="">
                    </el-form-item>
                    <el-form-item label="专题配图">
                        <img :src="output.specialsPo.specialLogo2" alt="">
                    </el-form-item>
                    <el-form-item label="产品有效期">
                        <span class="el-input" style="width:400px">{{output.specialsPo.effTimestr + ' 至 ' + output.specialsPo.expTimestr}}</span>
                    </el-form-item>
                </el-form>
                <el-form label-position="center" label-width="100px" class="noborder" v-else>
                    <el-form-item label="专题类ID">
                        <span class="el-input" v-text="output.specialsVo.specialId"></span>
                    </el-form-item>
                    <el-form-item label="专题名称">
                        <div class="el-input">
                            <span v-text="output.specialsVo.specialName"></span>
                            <span class="red"> => {{output.specialsVoEdit.specialName}}</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="专题说明">
                         <div class="el-input">
                            <span v-text="output.specialsVo.specialIntro"></span>
                            <span class="red"> => {{output.specialsVoEdit.specialIntro}}</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="专题链接">
                        <div class="el-input">
                            <span v-text="output.specialsVo.specialUrl"></span>
                            <span class="red"> => {{output.specialsVoEdit.specialUrl}}</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="专题规则">
                        <div class="el-input">
                            <span v-text="output.specialsVo.specialRole"></span>
                            <span class="red"> => {{output.specialsVoEdit.specialRole}}</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="专题模板">
                        <div class="el-input">
                            <span v-text="output.specialsVo.specialMould"></span>
                            <span class="red"> => {{output.specialsVoEdit.specialMould}}</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="h5页面配图">
                        <div class="el-input">
                            <img :src="output.specialsVo.specialLogo3" alt="">
                            <span class="red" style="position:relative;top:-70px;"> => </span>
                            <img :src="output.specialsVoEdit.specialLogo3" alt="">
                        </div>
                    </el-form-item>
                    <el-form-item label="专题配图">
                        <img :src="output.specialsVo.specialLogo2" alt="">
                        <span class="red" style="position:relative;top:-70px;"> => </span>
                        <img :src="output.specialsVoEdit.specialLogo2" alt="">
                    </el-form-item>
                    <el-form-item label="产品有效期">
                        <div class="el-input">
                            <span style="width:auto">{{output.specialsVo.effTimestr + ' 至 ' + output.specialsVo.expTimestr}}</span>
                            <span class="red" style="width:auto"><span> => </span>{{output.specialsVoEdit.effTimestr + ' 至 ' + output.specialsVoEdit.expTimestr}}</span>
                        </div>
                    </el-form-item>
                </el-form>
          </div>
          <h2>关联产品</h2>
          <div class="text1">
            <el-table :data="output.productList"  border fit highlight-current-row>
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{ parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品ID">
                    <template scope="scope">
                        <span v-text="scope.row.productId"></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险名称">
                    <template scope="scope">
                        <span v-text="scope.row.productName"></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险公司">
                    <template scope="scope">
                        <span v-text="scope.row.insurerName"></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险类别">
                    <template scope="scope">
                        <span v-text="scope.row.className"></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="当前库存">
                    <template scope="scope">
                        <span v-text="scope.row.maxQuantity"></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险金额（元）">
                    <template scope="scope">
                        <span>{{scope.row.minPremium | formatMoney}}-{{scope.row.maxPremium | formatMoney}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="一级佣金">
                    <template scope="scope">
                        <span>{{scope.row.commisionValue1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="二级佣金">
                    <template scope="scope">
                        <span>{{scope.row.commisionValue2}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template scope="scope">
                        <span>新增关联</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="关联产品排序">
                    <template scope="scope">
                        <span>{{scope.row.startRow}}</span>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <h2>审核信息</h2>
          <div class="text1">
            <el-table :data="dataList"  border fit highlight-current-row border fit highlight-current-row :default-sort = "{prop: params.order, order: params.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort" >
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{ parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核结果">
                    <template scope="scope">
                        <!--0：未审核；1：审核通过；2：审核未通过-->
                        <span v-show="scope.row.auditSts == 0">未审核</span>
                        <span v-show="scope.row.auditSts == 1">审核通过</span>
                        <span v-show="scope.row.auditSts == 2">审核未通过</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核不通过原因">
                    <template scope="scope">
                        <span v-text="scope.row.auditComment"></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核员">
                    <template scope="scope">
                        <span v-text="scope.row.auditNickname"></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核时间"  prop="auditTime1" >
                    <template scope="scope">
                        <span v-text="scope.row.auditTime1"></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作员">
                    <template scope="scope">
                        <span v-text="scope.row.reqNickname"></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="提交时间" prop="reqTime1" >
                    <template scope="scope">
                        <span>{{scope.row.reqTime1}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div style="padding:20px 0;">
                <div v-show="total" class="pagination-container" style="display:inline-block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.page" :page-sizes="[10]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
          </div>
          <h2 v-if="data.auditSts == 0">本次审核意见</h2>
          <div v-if="data.auditSts == 0" class="text1">
               <el-form ref="formData" :model="form" :rules="rules" label-position="center" label-width="50px" class="noborder" >
                     <el-form-item label="" prop="auditSts">
                        <el-radio-group v-model="form.auditSts" style="padding-top:10px;">
                            <el-radio label="1">审核通过</el-radio>
                            <el-radio label="-1">审核不通过</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="" prop="auditComment" v-if="form.auditSts == -1">
                        <el-input type="textarea" :rows="5" style="width:700px;" placeholder="审核不通过理由" v-model="form.auditComment"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-waves  type="primary"@click="submitData('formData')">提交</el-button>
                        <el-button v-waves @click="$router.go(-1)">返回</el-button>
                    </el-form-item>
               </el-form>
          </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';

export default {
    data() {
        return {
            data: {},
            output: {
                specialsPo: {},
                specialsVo: {},
                specialsVoEdit: {},
                productList: []
            },
            params: {
                url: 'specialaudit/findspecialauditlog',
                page: 1,
                size: 10,
                bizId: '' //专题id
                // order: 'auditTime1',
                // dir: 'desc'
            },
            dataList: [],
            total: 0, //总条数
            form: { //审核未审核
                auditSts: '',
                auditComment: ''
            },
            rules: {
                auditSts: [
                    { required: true, message: '请选择审核意见', trigger: 'change' }
                ],
                auditComment: [
                    { required: true, message: '请填写审核不通过理由', trigger: 'change' },
                    { min:1, max: 200, message: '长度1-200', trigger: 'change' }
                ]
            }

        }
    },
    computed: {
    },
    created() {
        this.data = JSON.parse(this.$route.query.data);
        this.params.bizId = this.data.bizId;
        console.log(this.params.bizId)
        this.getData();
    },
    mounted() {
    },
    methods: {
        /*获取数据*/
        getData () {
            this.listLoading = true; //加载动作
            let obj = {
                 url: 'specialaudit/findAuditInfo',
                 auditId: this.data.auditId
            }
            // debugger;
            console.log(obj)
            config(obj).then(response => {
                // console.log(response)
                if (response.respCode === '000000') {
                    this.listLoading = false;
                    this.output = response.data;
                    this.getList(); //审核表格
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
            })
        },
         /*审核表格接口*/
        getList () {
            console.log(this.params)
            config(this.params).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.dataList = response.data.auditLogsPoList;
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
            })
        },
         //排序
        sort (column) {
            // console.log(column)
            this.params.order = column.prop; //排序字段；
            this.params.dir = column.order=== 'descending' ? 'desc' : 'asc'; //升降序
            this.params.page = 1;
            this.getList();
        },
        //调整每页几条
        handleSizeChange(val) {
            // this.params.size = val;
            // this.params.page = 1;
            // this.subForm();
        },
        //翻页
        handleCurrentPageChange (val) {
            this.params.page = val; //第几页赋值
            this.getList();
        },
        //提交
        submitData (formName) {
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {
                        url: 'specialaudit/dealSpecialAudit',
                        auditComment: this.form.auditComment,
                        auditId: this.output.auditId,
                        auditSts: this.form.auditSts,
                        specialId: this.data.bizId
                    }
                    console.log(obj)
                    config(obj).then(response => {
                        console.log(response)
                        if (response.respCode === '000000') {
                            this.message('success', response.respMsg);
                            this.$router.go(-1)
                        } else {
                            this.message('warning', response.respMsg)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        //请求提示
        message (sts, text) {
            this.$message({
                message: text,
                type: sts
            });
        }
    },
    filters: {
        //金钱
        formatMoney (val) {
             if (!val) {
                return '0.00';
            } else {
                return (val/100).toFixed(2);
            }
        },
        //时间过滤
        timeFilter (val) {
            if (!val) {
               return '';
           } else {
               var date = new Date(val);
               let Y = date.getFullYear() + '-';
               let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
               let D = date.getDate() + ' ';
               let h = date.getHours() + ':';
               let m = (date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes())+ ':';
               let s = date.getSeconds();
               return Y + M + D + h + m + s;
           }
        }
    }
}
</script>
<style lang="less" scoped>
    h2{
        margin-left: 18px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }
    .text{
        padding-left:100px;
        /*width:300px;*/
    }
    .text1{
        padding-left:50px;
    }
    .text img{
        width:120px;
        height:120px;
    }
    .red{
        color:red;
    }
</style>