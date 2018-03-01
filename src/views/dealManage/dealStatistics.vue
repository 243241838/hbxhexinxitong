<template>
    <div class="ggg_user">
        <div class="filter-container">
            <el-form :inline="true" :model="params" ref="params"  class="demo-form-inline">
                <el-form-item v-show="false" label="当前页" prop="page">
                    <el-input  v-model="params.page"></el-input>
                </el-form-item>
                <el-form-item v-show="false" label="行数" prop="size">
                    <el-input v-model="params.size"></el-input>
                </el-form-item>
                <el-form-item v-show="false" label="排序字段" prop="order">
                    <el-input  v-model="params.order"></el-input>
                </el-form-item>
                  <el-form-item v-show="false" label="升降序" prop="dir">
                    <el-input  v-model="params.dir"></el-input>
                </el-form-item>
                <el-form-item label="统计日期">
                    <el-date-picker  v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="至">
                    <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="来源类别" prop="productSource">
                    <el-select v-model="params.productSource" placeholder="来源类别">
                        <el-option  key="0" label="全部" value="0"></el-option>
                        <el-option key="1" label="E保自研" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="承保公司" prop="insurerId">
                    <el-select v-model="params.insurerId" placeholder="承保公司">
                        <el-option  key="0" label="全部" value="0"></el-option>
                        <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="保险名称" prop="productName">
                    <el-input v-model="params.productName" placeholder="保险名称"></el-input>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="subForm()">查询</el-button>
                   <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="text">
             <p>
                 截至<span v-text="timeEnd"></span>
                 累计销售量为：<span v-text="output.totalInsureCount" class="red"></span>笔，
                 累计销售金额为：<span class="red">{{output.totalPayAmount | formatMoney}}</span>元
            </p>
             <p>
                 统计时间<span v-text="timeStart"></span>至 <span v-text="timeEnd"></span>
                 总计销售量：<span v-text="output.sumInsureCount ? output.sumInsureCount : 0 " class="red"></span>笔,
                 总计销售金额：<span class="red">{{output.sumPayAmount | formatMoney}}</span>元
            </p>
        </div>
        <el-table :data="dataList" ref="table" :default-sort = "{prop: params.order, order: params.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort" v-loading="listLoading" border fit highlight-current-row >
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="时间" sortable="custom" prop="tradeDate">
                <template scope="scope">
                    <span>{{scope.row.tradeDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="保险名称">
                <template scope="scope">
                    <!--<span style="color:#1d90e6;font-size: 12px; cursor: pointer;" @click="gocustomerDetail(scope.row.detailId, 1)">{{scope.row.productName}}</span>-->
                    <el-button type="text" @click="gocustomerDetail(scope.row, 1)">{{scope.row.productName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="来源分类">
                <template scope="scope">
                    <span v-show="scope.row.productSource == 1">E保自研</span>
                    <span v-show="scope.row.productSource != 1">保险公司</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="承保公司">
                <template scope="scope">
                    <span>{{scope.row.insurerName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="销售量（单）" sortable="custom" prop="insureCount">
                <template scope="scope">
                    <!--<span style="color:#1d90e6;font-size: 12px; cursor: pointer;" @click="gocustomerDetail(scope.row, 2)">{{scope.row.insureCount}}</span>-->
                    <el-button type="text" @click="gocustomerDetail(scope.row, 2)">{{scope.row.insureCount}}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="销售金额（元）" sortable="custom" prop="payAmount">
                <template scope="scope">
                    <!--<span style="color:#1d90e6;font-size: 12px; cursor: pointer;" @click="gocustomerDetail(scope.row, 3)">{{scope.row.payAmount | formatMoney}}</span>-->
                    <el-button type="text" @click="gocustomerDetail(scope.row, 3)">{{scope.row.payAmount | formatMoney}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding:20px 0;">
            <div v-show="total" class="pagination-container" style="display:inline-block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
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
            isFirst: true,
            listLoading: false,
            isMoney: false, //是否出现自定义金钱
            output: '', //总数据
            backups: '', //备份搜索数据
            timeStart: '',
            timeEnd: '',
            pickTimeStart: '', //开始时间
            pickTimeEnd: '', //结束时间
            params: { 
                url: 'trademanager/findTradeCountList',
                page: 1,
                size: 10,
                beginDate: '', //开始时间
                endDate: '', //结束时间
                productSource: '0', //来源
                insurerId: '0', //承保公司id
                productName: '', //保险名称
                order: 'tradeDate', //排序字段
                dir: 'desc' // desc ：降序；asc：升序
            },
            poList: '', //保险公司
            total: 0, //总条数
            dataList: []
        }
    },
    computed: {
    },
    created() {
        this.initTime(); //初始化查询开始时间
    },
    mounted() {
        this.insurance_company(); //保险公司
    },
    methods: {
        //初始化查询开始时间
        initTime () {
            let date = new Date();
            let month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '' + 0 + (date.getMonth() + 1);
            let year = date.getFullYear();
            this.pickTimeStart = new Date(year, date.getMonth(), '01')
            this.params.beginDate = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            this.pickTimeEnd = new Date(this.GetDateStr(-1));
            let DateTime =  new Date().getDate();
            console.log(DateTime)
            if (DateTime == 1) {
               this.pickTimeEnd = new Date(year, date.getMonth(), '01')
            }
            this.params.endDate = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            if (this.isFirst) {
                this.getApplyList();
                this.isFirst = false;
            }
        },
        //保险公司
        insurance_company () {
            let obj = {
                url: 'insurer/findAll'
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    // console.log(response.data)
                    let output = response.data;
                    if (!output) {
                        return false;
                    }
                    this.poList = response.data.insurersList;
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
         /*时间选择器默认事件*/
        dateChange () {
            if (this.pickTimeStart === "") {
                this.params.beginDate = "";
            } else {
                this.params.beginDate = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.params.endDate = "";
            } else {
                this.params.endDate = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //调整每页几条
        handleSizeChange(val) {
            this.params.size = val;
            this.params.page = 1;
            this.subForm(); //校检时间
        },
        //翻页
        handleCurrentPageChange (val) {
            this.params.page = val; //第几页赋值
            this.subForm(); //校检时间
        },
        //查询
        subForm () {
            if (this.pickTimeStart && this.pickTimeEnd) {
                let start1 = parseTime(this.pickTimeStart, '{y}{m}{d}');
                let end1 = parseTime(this.pickTimeEnd, '{y}{m}{d}');
                let start2 = parseTime(this.pickTimeStart, '{y}{m}');
                let end2 = parseTime(this.pickTimeEnd, '{y}{m}');
                if (start2 !== end2) {
                    this.message('warning', '不允许跨月选择');
                    return false;
                }
                // if (start1 > end1) {
                //     this.message('warning', '结束时间不能大于开始时间');
                //     return false;
                // }
            }
            // //判断交易金额自定义
            // if (parseInt(this.params.selectAmount) === 10) {
            //     if (this.params.customAmountLow && this.params.customAmountHight) {
            //         if (parseInt(this.params.customAmountLow) > parseInt(this.params.customAmountHight)) {
            //             this.message('warning', '左边金额不能大于右边金额');
            //             return false;
            //         }
            //     }
            // }
            this.getApplyList();
        },
        /*搜索列表信息*/
        getApplyList () {
            // this.backups = JSON.parse(JSON.stringify(this.params)); //备份
            this.listLoading = true; //加载动作
            config(this.params).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.output = response.data;
                    this.dataList = response.data.tradeCountRecordsAdminPoList;
                    this.timeStart = this.params.beginDate;
                    this.timeEnd = this.params.endDate;
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
                this.dataList = null;
            })
        },
         //排序
        sort (column) {
            // console.log(column)
            this.params.order = column.prop; //排序字段；
            this.params.dir = column.order=== 'descending' ? 'desc' : 'asc'; //升降序
            this.params.page = 1;
            this.getApplyList();
        },
         //重置
        reset (formName) {
            this.$refs[formName].resetFields();
            this.initTime(); //重置时间
        },
        //去详情
        gocustomerDetail (val, number) {
            if (number === 1) {
                 if (val.classType == 2) {
                      this.$router.push({ path: '/dealManage/dealManagePersonInsuranceProDetail',query: { productId: val.productId } }); //跳产品个险详情
                } else {
                    this.$router.push({ path: '/dealManage/dealManageCarFindListDetail',query: { productId: val.productId } }); //跳产品车险详情
                }
                return false;
            } else {
                this.$router.push({ path: '/dealManage/moneyDetail',query: { date: JSON.stringify(val), number: number} })
                return false;
            }
        },
        // 获取当前时间的后几天和前几天 用法 GetDateStr(60), 60天后 格式1990-06-07
        GetDateStr(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth()+1;//获取当前月份的日期
            m = m < 10 ? ('0' + m) : m;
            var d = dd.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
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
.text{
    margin-bottom:10px;
}
.text p{
    line-height: 24px;
    color: #768399;
    font-weight: 400;
    font-size: 12px;
}
.text .red{
    color:red;
}
</style>