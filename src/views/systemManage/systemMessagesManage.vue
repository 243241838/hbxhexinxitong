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
                <el-form-item label="系统信息ID" prop="messageId">
                    <el-input v-model="params.messageId" placeholder="系统信息ID"></el-input>
                </el-form-item>
                <el-form-item label="系统信息标题" prop="messageTitle">
                    <el-input v-model="params.messageTitle" placeholder="系统信息标题"></el-input>
                </el-form-item>
                <el-form-item label="发送时间">
                    <el-date-picker  v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="至">
                    <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="getApplyList()">查询</el-button>
                   <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-button style="margin-bottom:10px;" v-waves  @click="go(2)">新增</el-button>
        <el-table :data="dataList" ref="table" v-loading="listLoading" border fit highlight-current-row >
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="操作">
                <template scope="scope">
                    <el-button type="text"  @click="go(1, scope.row)"  size="small">编辑</el-button>
                    <el-button type="text" @click="delete_data(scope.row)"  size="small">删除</el-button>
                </template>
            </el-table-column>
             <el-table-column align="center" label="系统信息ID" >
                <template scope="scope">
                    <el-button type="text" @click="go(3, scope.row)"  size="small">{{scope.row.messageId}}</el-button>
                </template>
            </el-table-column>
             <el-table-column align="center" label="系统信息标题">
                <template scope="scope">
                     <span>{{scope.row.messageTitle}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="系统信息类型">
                <template scope="scope">
                    <span>{{scope.row.messageType}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="系统信息发送时间 ">
                <template scope="scope">
                    <span>{{scope.row.sendTime}}</span>
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
            <span >确认删除改系统消息吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button v-waves  @click="dialogVisible = false">取 消</el-button>
                <el-button v-waves type="primary" @click="submitRadio()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as util from '@src/utils/util';
    import * as  static_data from '@utils/static_data.js';
    import { parseTime } from '@filters/index.js';
export default {
    data() {
        return {
            listLoading: false,
            pickTimeStart: '', //开始时间
            pickTimeEnd: '', //结束时间
            params: { 
                url: 'system/message/findMessageList',
                page: 1,
                size: 10,
                messageId: '', //系统信息ID
                messageTitle: '', //系统信息标题
                effTimestr: '', //开始时间
                expTimestr: '' // 结束时间
                // order: 'messageId',
                // dir: 'desc'
            },
            total: 0, //总条数
            dataList: [],
            dialogVisible: false, //弹框
            data: '' //传过来的行数据
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
        /*搜索列表信息*/
        getApplyList () {
            this.listLoading = true; //加载动作
            console.log(this.params)
            config(this.params).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.dataList = response.data.messageDetailRspList;
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
                this.dataList = null;
            })
        },
        //调整每页几条
        handleSizeChange(val) {
            this.params.size = val;
            this.params.page = 1;
            this.getApplyList();
        },
        //翻页
        handleCurrentPageChange (val) {
            this.params.page = val; //第几页赋值
            this.getApplyList();
        },
         //查询
        subForm () {
            if (this.pickTimeStart && this.pickTimeEnd) {
                if (parseTime(this.pickTimeStart, '{y}{m}{d}') > parseTime(this.pickTimeEnd, '{y}{m}{d}')) {
                    this.message('warning', '结束时间不能大于开始时间');
                    return false;
                }
            }
        },
          /*时间选择器默认事件*/
        dateChange () {
            if (this.pickTimeStart === "") {
                this.params.effTimestr = "";
            } else {
                this.params.effTimestr = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.params.expTimestr = "";
            } else {
                this.params.expTimestr = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //重置
        reset (formName) {
            this.$refs[formName].resetFields();
            this.pickTimeStart= ''; //开始时间
            this.pickTimeEnd= ''; //结束时间
            this.params.effTimestr = '';
            this.params.effTimestr = '';
        },
        //去新增编辑详情
        go (number, data) {
            if (number == 1 || number == 3) {
               data.isEdit = number;
               this.$router.push({ path: 'systemMessagesEditDetail',query: { data: JSON.stringify(data)} })
               return false;
           } else {
               this.$router.push({ path: 'systemMessagesEditDetail'})
           }
        },
        //删除
        delete_data (data) {
            this.dialogVisible = true; //显示弹窗
            this.data = data;
        },
        //提交
        submitRadio () {
            let obj = {
                url: 'system/message/deleteMessage',
                messageId: this.data.messageId
            };
            console.log(obj)
            config(obj).then(response => {
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
        }
    }
}
</script>
<style lang="less" scoped>
    .app-container {
        margin: 10px 10px 0 10px;
    }

    .app-container .filter-container {
        margin-top: 20px;
    }

    .app-container .filter-container .rightData {
        margin-right: 100px;
    }
</style>