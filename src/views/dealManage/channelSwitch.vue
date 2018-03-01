<template>
    <div class="ggg_user">
        <el-table :data="dataList" ref="table" v-loading="listLoading" border fit highlight-current-row >
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="支付渠道ID">
                <template scope="scope">
                    <span>{{scope.row.paymentId}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="支付渠道名称">
                <template scope="scope">
                    <el-button type="text" @click="go()">{{scope.row.paymentName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" >
                <template scope="scope">
                     <el-radio-group v-model="scope.row.sts" @change="(value) => flag && changeHandler(value, scope.row)">
                        <el-radio :label="10">开启</el-radio>
                        <el-radio :label="-10">关闭</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding:20px 0;">
            <div v-show="total" class="pagination-container" style="display:inline-block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" top="30%"  class="autoAlert">
            <span v-text="text">这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button v-waves @click="dialogVisible = false">取 消</el-button>
                <el-button v-waves type="primary" @click="submitRadio()">确 定</el-button>
            </span>
        </el-dialog>


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
            params: { 
                url: 'channelmanager/findChanelInfoList',
                page: 1,
                size: 10,
            },
            flag: false, //单选开关
            dialogVisible: false, //弹框
            text: '',
            total: 0, //总条数
            dataList: [],
            date: ''
        }
    },
    computed: {
    },
    created() {
        this.getApplyList();
    },
    mounted() {
    },
    methods: {
        //调整每页几条
        handleSizeChange(val) {
            this.params.size = val;
            this.params.page = 1;
            this.flag = false; //单选按钮开关
            this.getApplyList();
        },
        //翻页
        handleCurrentPageChange (val) {
            this.params.page = val; //第几页赋值
            this.flag = false; //单选按钮开关
            this.getApplyList();
        },
        /*搜索列表信息*/
        getApplyList () {
            this.listLoading = true; //加载动作
            config(this.params).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.dataList = response.data.paymentDetailRspList;
                    setTimeout(() => {
                        this.flag = true; //单选按钮开关
                    })
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
                this.dataList = null;
            })
        },
         //监控点击单选按钮
        changeHandler (val, item) {
            let obj = {
                 domainId: item.paymentId,
                 domainName: item.paymentName,
                 effTime: item.effTime,
                 expTime: item.effTime,
                 domainSts: val,
                 url: 'channelmanager/updateDomainsInfo'
            }
            this.date = obj;
            if (parseInt(val) === 10) {
                this.text = '确定要开启支付渠道吗？';
            } else if (parseInt(val) === -10) {
                this.text = '确定要关闭支付渠道吗？';
            }
            this.dialogVisible = true; //开启弹窗
        },
        //提交
        submitRadio () {
            config(this.date).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.message('success', response.respMsg)
                    this.dialogVisible = false;
                    this.getApplyList(); // 更新表格
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //去支付渠道列表
        go (val, number) {
            this.$router.push({ path: '/dealManage/paymentChannel'})
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
</style>