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
                <el-form-item label="支付渠道" prop="domainName">
                    <el-input v-model="params.domainName" placeholder="支付渠道"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="domainSts">
                    <el-select v-model="params.domainSts" placeholder="状态">
                        <el-option  key="0" label="全部" value="0"></el-option>
                        <el-option  key="10" label="正常" value="10"></el-option>
                        <el-option key="-10" label="禁用" value="-10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="getApplyList()">查询</el-button>
                   <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <el-button style="margin-bottom:10px;" @click="addChannel()" v-waves>新增</el-button>
        <el-table :data="dataList" ref="table" v-loading="listLoading" border fit highlight-current-row >
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="支付渠道Id">
                <template scope="scope">
                    <span>{{scope.row.paymentId}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="支付渠道名称 ">
                <template scope="scope">
                    <el-button type="text" @click="getChannel(scope.row)" >{{scope.row.paymentName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="合作时间">
                <template scope="scope">
                    <span>{{scope.row.effTime}}</span>
                    <span>-</span>
                    <span>{{scope.row.expTime}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span>{{scope.row.insurerName}}</span>
                    <span v-show="scope.row.sts == 10">正常</span>
                    <span v-show="scope.row.sts == -10">禁用</span>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding:20px 0;">
            <div v-show="total" class="pagination-container" style="display:inline-block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog  :title="isAdd ? '新增支付渠道' : '查看支付渠道'" class="autoAlert"  :visible.sync="centerDialogVisible" top="20%" center>
            <el-form v-show="isEdit==1 || isEdit==3" label-position="left" class="noborder" label-width="110px" :model="Channel">
                <el-form-item label="支付渠道Id：">
                    <el-col>
                        <el-input v-model="Channel.paymentId" readonly></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付渠道名称：">
                    <el-col>
                        <el-input v-model="Channel.paymentName" readonly></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="合作时间：">
                    <el-col :span="11">
                        <el-form-item>
                            <el-input v-model="Channel.effTime" readonly style="text-align:center;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">至</el-col>
                    <el-col :span="11">
                        <el-form-item>
                            <el-input v-model="Channel.expTime" readonly style="text-align:center;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="开关：" v-if="Channel.sts">
                    <el-col>
                        <span class="el-input" v-text="Channel.sts == 10 ? '开启' : '关闭'"></span>
                    </el-col>
                </el-form-item>
            </el-form>
            <div v-show="isEdit==1" slot="footer" class="dialog-footer">
                <el-button  @click="centerDialogVisible = false" v-waves>返回</el-button>
                <el-button type="primary" @click="Edit()" v-waves>编辑</el-button>
            </div>
            <div v-show="isEdit==3" slot="footer" class="dialog-footer">
                <el-button @click="accomplish()" v-waves>完成并返回</el-button>
                <el-button type="primary" @click="isEdit = 2" v-waves>返回修改</el-button>
            </div>

            <!--编辑-->
            <el-form :rules="rules"  v-show="isEdit == 2" ref="alertFrom" label-position="left"  label-width="123px" :model="Channel2" >
                <el-form-item label="支付渠道Id：" prop="paymentId" :class="{'noborder': !isAdd}">
                    <el-col>
                        <el-input v-model.number="Channel2.paymentId" :readonly="!isAdd"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付渠道名称：" prop="paymentName">
                    <el-col>
                        <el-input v-model="Channel2.paymentName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="合作时间：" prop="effTime">
                    <el-col :span="11">
                        <el-form-item >
                            <el-date-picker type="date" placeholder="选择日期" v-model="Channel2.effTime" style="width: 100%;" ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1" style="margin:0 6px 0 3px;">至</el-col>
                    <el-col :span="11">
                        <el-form-item prop="expTime">
                            <el-date-picker type="date" placeholder="结束时间" v-model="Channel2.expTime" style="width: 100%;" ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="开关：" prop="sts" v-if="Channel2.sts">
                    <el-radio-group v-model="Channel2.sts" style="padding-top:10px;">
                        <el-radio :label="10">开启</el-radio>
                        <el-radio :label="-10">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div v-show="isEdit == 2" slot="footer" class="dialog-footer">
                <el-button @click="submitForm('alertFrom')" v-waves>下一步</el-button>
                <el-button type="primary" @click="centerDialogVisible = false"  v-waves>取消</el-button>
            </div>
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
        // 开始时间不大于结束时间
         var validatorEndtime = (rule, value, callback) => {
            if (value) {
                let start = parseTime(this.Channel2.effTime, '{y}{m}{d}');
                let end = parseTime(this.Channel2.expTime, '{y}{m}{d}');
                if (start > end) {
                    callback(new Error('开始时间不能大于结束时间'));
                    return false;
                }
                callback();
            }
        };
        var isChinese = (rule, value, callback)=> {  
            var re = /[^\u4e00-\u9fa5]/;  
            if (re.test(value)) {
                callback(new Error('请输入中文'));
                return false;
            }
            callback();
        }
        var isnumber = (rule, value, callback) => {
            console.log(value.toString().length)
            if (parseInt(value.toString().length) > 3 ) {
                callback(new Error('该值为3位数'));
                return false;
            }
            callback();
        }
        return {
            listLoading: false,
            output: '', //总数据
            isAdd: false, //是否新增
            params: { 
                url: 'channelmanager/findChanelInfoList',
                page: 1,
                size: 10,
                domainName: '', //支付渠道名称
                domainSts: '0', //支付渠道状态
            },
            total: 0, //总条数
            dataList: [],
            centerDialogVisible: false, //弹窗
            isEdit: 1, //是否编辑
            Channel: {
                paymentName: '',
                paymentId: '',
                effTime: '',
                expTime: '',
                sts: ''
            }, //渠道信息
            Channel2: {
                paymentName: '',
                paymentId: '',
                effTime: '',
                expTime: '',
                sts: ''
            }, //渠道信息
            rules: {
                paymentName:[
                    {validator: isChinese, trigger: 'blur' },
                    { required: true, message: '请输入渠道名称', trigger: 'blur' },
                    { min:1, max: 20, message: '长度在1到20个中文字符', trigger: 'blur' }
                ],
                expTime: [
                    { validator: validatorEndtime, trigger: 'blur' }
                ],
                paymentId: [
                    { required: true, message: '请输入渠道Id'},
                    { type: 'number', message: '渠道Id必须为数字值'},
                    { validator: isnumber, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
    },
    created() {
        this.getApplyList(); // 获取数据
    },
    mounted() {
    },
    methods: {
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
        /*搜索列表信息*/
        getApplyList () {
            this.listLoading = true; //加载动作
            config(this.params).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.output = response.data;
                    this.dataList = response.data.paymentDetailRspList;
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
                this.dataList = null;
            })
        },
        //新增渠道
        addChannel () {
            this.isAdd = true;
            this.isEdit = 2; //进入编辑模式
            this.Channel2 = {
                paymentName: '',
                paymentId: '',
                effTime: '',
                expTime: ''
            };
            setTimeout(() => {
                this.$refs['alertFrom'].resetFields();
            })
            this.centerDialogVisible = true; //显示渠道信息弹框
        },
        //渠道信息赋值
        getChannel (data) {
            this.Channel = data;
            this.isAdd = false; //不是新增
            this.isEdit = 1; //不是编辑状态
            this.centerDialogVisible = true; //显示渠道信息弹框
        },
        //弹窗重置
        alertReset (formName) {
            this.centerDialogVisible = false; //关闭
        },
        //弹框点击编辑
        Edit () {
            this.Channel2 = JSON.parse(JSON.stringify(this.Channel));
            this.Channel2.effTime = new Date(this.Channel2.effTime);
            this.Channel2.expTime = new Date(this.Channel2.expTime);
            this.isEdit = 2;
            this.$refs['alertFrom'].resetFields();
        },
        //点击下一步
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.Channel = JSON.parse(JSON.stringify(this.Channel2));
                    this.Channel.effTime = parseTime(this.Channel2.effTime, '{y}-{m}-{d}');
                    this.Channel.expTime = parseTime(this.Channel2.expTime, '{y}-{m}-{d}');
                    if (this.isAdd) {
                        this.next_step(); //当是新增时， 校检
                        return false;
                    }
                    this.isEdit = 3; //退出编辑模式
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //下一步校检
        next_step () {
            let obj = {
                domainId: this.Channel2.paymentId,
                domainName: this.Channel2.paymentName,
                effTime: parseTime(this.Channel2.effTime, '{y}-{m}-{d}'),
                expTime: parseTime(this.Channel2.effTime, '{y}-{m}-{d}'),
                url: 'channelmanager/addDomainsInfoParamsCheck'
            }
            config(obj).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.isEdit = 3; //退出编辑模式
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
            return false;
        },
        //完成编辑提交
        accomplish() {
            let obj = {
                domainId: this.Channel.paymentId,
                domainName: this.Channel.paymentName,
                effTime: this.Channel.effTime,
                expTime: this.Channel.expTime,
                domainSts: this.Channel.sts,
                url: 'channelmanager/updateDomainsInfo'
            }
            if (this.isAdd) {
                obj = {
                    domainId: this.Channel.paymentId,
                    domainName: this.Channel.paymentName,
                    effTime: this.Channel.effTime,
                    expTime: this.Channel.expTime,
                    url: 'channelmanager/addChannelInfo'
                }
            }
            config(obj).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.centerDialogVisible = false; //关闭弹窗
                    this.getApplyList(); //更新表格
                    this.message('success', response.respMsg)
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
         //重置
        reset (formName) {
            this.$refs[formName].resetFields();
        },
        //去详情
        gocustomerDetail (val, number) {
            if (number === 1) {
                this.$router.push({ path: '/claim/policyDetails',query: { detailId: val } })
                return false;
            }
            if (number === 2) {
                this.$router.push({ path: '/dealManage/moneyDeal',query: { date: JSON.stringify(val)} })
                return false;
            }
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