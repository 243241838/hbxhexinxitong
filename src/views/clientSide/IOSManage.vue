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
                <el-form-item label="发布类型" prop="versionState">
                    <el-select v-model="params.versionState" placeholder="发布类型">
                        <el-option v-for="item in versionStateArr" :key="item.value"  :label="item.label"  :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="更新类型" prop="isOptional">
                     <el-select v-model="params.isOptional" placeholder="请选择" style="width:200px;margin-right: 50px;">
                        <el-option v-for="item in isOptionalArr" :key="item.value"  :label="item.label"  :value="item.value">
                        </el-option>
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
        <el-button v-waves   @click="add()" style="margin-bottom:10px;">新增</el-button>
        <el-table :data="dataList" ref="table" v-loading="listLoading" border fit highlight-current-row >
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center"  label="版本号">
                 <template scope="scope">
                     <a  href="javascript:void(0)" @click="edit(scope.row.verId)">{{scope.row.currentVersion}}</a>
                 </template>
            </el-table-column>
             <el-table-column align="center"  prop="versionStateDesc" label="发布类型">
            </el-table-column>
             <el-table-column align="center" prop="updateTypeDesc"   label="更新类型 ">
            </el-table-column>
            <el-table-column align="center" prop="createTimeDesc" label="提交时间">
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
import { parseTime } from '@filters/index.js';
import * as  static_data from '@utils/static_data.js';
import * as  util from '@src/utils/util';

export default {
    data() {
        return {
            pickTimeStart: '', //开始时间
            pickTimeEnd: '', //结束时间
            listLoading: false,
            isOptionalArr:[{value:'',label:'全部'}].concat(static_data.isOptionalArr),
            versionStateArr:[{value:'',label:'全部'}].concat(static_data.versionStateArr),
            params: { 
                url: 'client/queryVersionList',
                page: 1,
                size: 10,
                type: 'IOS', //标题
                versionState: '', //系统类型
                isOptional: '', //系统类型
                start: '', //开始时间
                end: '' //结束时间
            },
            total: 0, //总条数
            dataList: []
        }
    },
    created() {
         this.getList();
    },
    methods: {
        /*搜索列表信息*/
        getList () {
            this.listLoading = true; //加载动作
            config(this.params).then(response => {
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.dataList = response.data.phoneVersionDetailRspList;
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
            this.params.page = val; //第几页赋值
            this.getList();
        },
        add(){
            this.$router.push({ path: '/clientSide/versionAddDetail', query: {type: 'IOS'}});
        },
        edit(id){
            this.$router.push({ path: '/clientSide/versionDetail',query: { id: id, type: 'IOS'} })
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
                this.params.start = "";
            } else {
                this.params.start = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.params.end = "";
            } else {
                this.params.end = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //重置
        reset (formName) {
            this.$refs[formName].resetFields();
            this.pickTimeStart = '';
            this.pickTimeEnd = '';
        }
    },
    watch:{
        $route: function(newValue, oldValue) {
            this.reset();
            this.params.type =  this.$route.params.type;
            this.getList();
        }
    }
}
</script>
