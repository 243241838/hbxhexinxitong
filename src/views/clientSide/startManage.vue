<template>
    <div class="ggg_user">
          <div class="filter-container">
            <el-form class="filter-container" :inline="true" :model="params" ref="params">
                <el-form-item v-show="false" label="当前页" prop="page">
                    <el-input  v-model="params.page"></el-input>
                </el-form-item>
                <el-form-item v-show="false" label="行数" prop="size">
                    <el-input v-model="params.size"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="resourceKeywords">
                    <el-input v-model="params.resourceKeywords" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="系统类型" prop="resourceLabel">
                     <el-select v-model="params.resourceLabel" placeholder="系统类型">
                        <el-option key=""  label="全部"  value=""></el-option>
                        <el-option v-for="item in resourceLabelArr" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                     </el-select>
                </el-form-item>
                <el-form-item label="有效期" prop="effTimeStr">
                    <el-date-picker  v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="至" prop="expTimeStr">
                    <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>


               <el-button type="primary" v-waves  icon="search" @click="getList()">查询</el-button>
               <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
            </el-form>
        </div>
        <el-button style="margin-bottom:10px;" v-waves  @click="$router.push({ path: '/clientSide/startManageAddDetail'})">新增</el-button>
        <el-table :data="dataList" ref="table" v-loading="listLoading" border fit highlight-current-row >
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" prop="resourceId" label="启动ID">
                 <template scope="scope">
                     <a  href="javascript:void(0)" @click="edit(scope.row.resourceId)" >{{scope.row.resourceId}}</a>
                 </template>
            </el-table-column>
             <el-table-column align="center" label="图片预览">
                <template scope="scope">
                    <span v-show="scope.row.resourceValue"><img :src="scope.row.resourceValue" class="client-imgpreview" width="100" height="30" /></span>
                </template>
            </el-table-column>
             <el-table-column align="center" prop="resourceKeywords"   label="标题">
            </el-table-column>
            <el-table-column align="center" label="系统类型">
                <template scope="scope">
                    <span v-if="scope.row.resourceLabel=='ios_startup_logo'">IOS</span>
                    <span v-else-if ="scope.row.resourceLabel=='android_startup_logo'">Android</span>
                    <span v-else>Other</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="有效期">
                <template scope="scope">
                    <span>{{scope.row.effTime+'-'+scope.row.expTime}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template scope="scope">
                    <el-button @click="del(scope.row)" type="text" >删除</el-button>
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
            <span v-text="">确定要删除{{alertData.resourceLabel == 'ios_startup_logo' ? 'IOS' : alertData.resourceLabel == 'android_startup_logo' ? 'Android' : 'Other'}}首次启动页面吗？</span>
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
import { parseTime } from '@filters/index.js';

export default {
    data() {
        return {
            listLoading: false,
            resourceLabelArr:[ //系统类型
                {value:'1', label:'IOS', text: ''},
                {value:'2', label:'Android'}
            ],
            pickTimeStart: '', //开始时间
            pickTimeEnd: '', //结束时间
            params: { 
                url: 'client/findStartMessage',
                page: 1,
                size: 10,
                resourceKeywords: '', //标题
                resourceLabel: '', //系统类型
                effTimeStr: '', //开始时间
                expTimeStr: '' //结束时间
            },
            total: 0, //总条数
            dataList: [],
            dialogVisible: false, //弹框
            alertData: {} //删除的数据存储
        }
    },
    created() {
         this.getList();
    },
    methods: {
        /*搜索列表信息*/
        getList () {
            this.listLoading = true; //加载动作
            // console.log(this.params)
            config(this.params).then(response => {
                console.log(response.data)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.dataList = response.data.resourceDetailRspList;
                } else {
                    this.listLoading =false; //加载动作
                    this.$message.warning(response.respMsg)
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
            this.getList();
        },
        //翻页
        handleCurrentPageChange (val) {
            this.getList();
            this.params.page = val; //第几页赋值
        },
        //查询
        subForm () {
            if (this.pickTimeStart && this.pickTimeEnd) {
                if (parseTime(this.pickTimeStart, '{y}{m}{d}') > parseTime(this.pickTimeEnd, '{y}{m}{d}')) {
                    this.$message.warning('结束时间不能大于开始时间')
                    return false;
                }
            }
            this.getList();
        },
           /*时间选择器默认事件*/
        dateChange () {
            if (this.pickTimeStart === "") {
                this.params.effTimeStr = "";
            } else {
                this.params.effTimeStr = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.params.expTimeStr = "";
            } else {
                this.params.expTimeStr = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //编辑
        edit(id){
            this.$router.push({ path: '/clientSide/startManageEditDetail',query: { id: id } })
        },
        //点击删除
        del(data){
            this.dialogVisible = true;
            this.alertData = data;
        },
        //确认
        submitRadio () {
            let obj = {
                url: '/client/delResource',
                resourceId: this.alertData.resourceId
            }
            // console.log()
            config(obj).then(response => {
                if (response.respCode == '000000') {
                    this.$message.success(response.respMsg)
                    this.dialogVisible = false;
                    this.getList(); //更新列表
                } else {
                    this.$message.warning(response.respMsg)
                }

            }).catch(err => {
                console.log(err)
            })
        },
        //重置
        reset (formName) {
            this.$refs[formName].resetFields();
            this.pickTimeStart = '';
            this.pickTimeEnd = '';
        },
         //请求提示
        message (sts, text) {
            this.$message({
                message: text,
                type: sts
            });
        }
    }
}
</script>
