<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>系统信息ID:</span>
            <el-input v-model="listQuery.params.messageId" placeholder="系统信息ID" style="width:200px;margin-right: 50px;"></el-input>
            <span>系统信息标题:</span>
            <el-input v-model="listQuery.params.messageTitle" placeholder="系统信息标题" style="width:200px;margin-right: 50px;"></el-input>
            <span>发送时间:</span>
            <el-date-picker v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
            </el-date-picker>至
            <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
            </el-date-picker>
        </div>
        <div class="filter-container">
            <el-button class="filter-item" type="primary" v-waves icon="plus" @click="dialogFormVisible1 = true">新增</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="reset">重置</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">查询</el-button>
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template scope="scope">
                        <el-button @click="edit(scope.row.classId, scope.row.paramVar, scope.row.paramClass, scope.row.paramName, scope.row.paramType, scope.row.paramValueList, scope.row.isRequired)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button @click="del(scope.row.classId,scope.row.paramVar)" type="text" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险分类名称">
                    <template scope="scope">
                        {{scope.row.className}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="参数变量名">
                    <template scope="scope">
                        {{scope.row.paramVar}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="参数分类名称">
                    <template scope="scope">
                        <span>{{scope.row.paramClass}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="参数名称">
                    <template scope="scope">
                        <span>{{scope.row.paramName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="参数类型">
                    <template scope="scope">
                        <span>{{scope.row.paramType | paramTypeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否必填">
                    <template scope="scope">
                        <span>{{scope.row.isRequired | isRequiredFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                    <template scope="scope">
                        <span>{{scope.row.sts | stsFilter}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 编辑 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="editData.params" :rules="rules" ref="element" v-loading="dialogLoading">
                <el-form-item prop="classId" label="保险类别:" label-width="220" required>
                    <el-select v-model.number="editData.params.classId" placeholder="保险类别" disabled>
                        <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="paramVar" label="参数变量名:" label-width="220" required>
                    <el-input v-model="editData.params.paramVar" auto-complete="off" style="width:400px;" placeholder="参数变量名" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="paramClass" label="参数分类名称:" label-width="220" required>
                    <el-select v-model="editData.params.paramClass" placeholder="参数分类名称">
                        <el-option v-for="item in paramClassStatus" :key="item.text" :label="item.text" :value="item.text">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="paramName" label="参数名称:" label-width="220" required>
                    <el-input v-model="editData.params.paramName" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="paramType" label="参数类型:" label-width="220" required>
                    <el-select v-model.number="editData.params.paramType" placeholder="参数分类名称">
                        <el-option v-for="item in paramTypeStatus" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="paramValue" label="参数可选项:" label-width="220" required v-if="editData.params.paramType===30">
                    <div v-for="(item,index) in editData.params.paramValueList" :key="index" >
                        <span>name：</span><el-input v-model="item.name" auto-complete="off" style="width:100px;"></el-input>
                        <span>value：</span><el-input v-model.number="item.value" auto-complete="off" style="width:100px;"></el-input>
                        <el-button type="primary" icon="plus" v-if="editData.params.paramValueList.length-1===index" @click="ADD(index)"></el-button>
                        <el-button type="primary" icon="minus" @click="DEL(index)"></el-button>
                    </div>
                    
                </el-form-item>
                <el-form-item prop="isRequired" label="是否必填:" label-width="220" required>
                    <el-radio v-model="editData.params.isRequired" label="1">是</el-radio>
                    <el-radio v-model="editData.params.isRequired" label="0">否</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commit">保存</el-button>
            </div>
        </el-dialog>
        <!-- 新增 -->
        <el-dialog :title="dialogTitle1" :visible.sync="dialogFormVisible1" v-loading="dialogLoading1">
            <el-form :model="addmore.params" :rules="rules1" ref="classParam" v-loading="dialogLoading">
                <el-form-item prop="classId" label="保险类别:" label-width="220" required>
                    <el-select v-model.number="addmore.params.classId" placeholder="保险类别">
                        <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="paramVar" label="参数变量名:" label-width="220" required>
                    <el-input v-model="addmore.params.paramVar" auto-complete="off" style="width:400px;" placeholder="参数变量名"></el-input>
                </el-form-item>
                <el-form-item prop="paramClass" label="参数分类名称:" label-width="220" required>
                    <el-select v-model="addmore.params.paramClass" placeholder="参数分类名称">
                        <el-option v-for="item in paramClassStatus" :key="item.text" :label="item.text" :value="item.text">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="paramName" label="参数名称:" label-width="220" required>
                    <el-input v-model="addmore.params.paramName" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="paramType" label="参数类型:" label-width="220" required>
                    <el-select v-model.number="addmore.params.paramType" placeholder="参数分类名称">
                        <el-option v-for="item in paramTypeStatus" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="paramValue" label="参数可选项:" label-width="220" required v-if="addmore.params.paramType===30">
                    <div v-for="(item,index) in addmore.params.paramValueList" :key="index" >
                        <span>name：</span><el-input v-model="item.name" auto-complete="off" style="width:100px;"></el-input>
                        <span>value：</span><el-input v-model.number="item.value" auto-complete="off" style="width:100px;"></el-input>
                        <el-button type="primary" icon="plus" v-if="addmore.params.paramValueList.length-1===index" @click="ADD1(index)"></el-button>
                        <el-button type="primary" icon="minus" @click="DEL1(index)"></el-button>
                    </div>
                </el-form-item>
                <el-form-item prop="isRequired" label="是否必填:" label-width="220" required>
                    <el-radio v-model="addmore.params.isRequired" label="1">是</el-radio>
                    <el-radio v-model="addmore.params.isRequired" label="0">否</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="newAdd">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisible1" width="20%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="Delete()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import config from '@api/config';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';

export default {
    data() {
        return {
            listLoading: true,
            pickTimeStart: '',
            pickTimeEnd: '',
            listQuery: { params: { url: 'param/findClassParamList', page: 1, size: 10, messageId: '',effTimestr: '',expTimestr: '',messageTitle: '' } },
            current: 1, // 默认显示第一页
            total: 0,
            dataList: [],
            dialogVisible: false,
            dialogVisible1: false,
            classId: '',
            paramVar: '',
            poList: '',   //保险公司
            paramTypeStatus: [{code: 10,text: '文本框'},{code: 40,text: '日期控件'},{code: 30,text: '下拉框'}],//参数下拉菜单
            paramClassStatus: [{code: 10,text: '其他信息'},{code: 20,text: '投保人信息'},{code: 21,text: '被保人信息'}],//参数分类名称下拉菜单
            // 对话框
            dialogLoading: false,
            dialogLoading1: false,
            dialogTitle: '编辑附加信息',
            dialogTitle1: '新增附加信息',
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogURL: 'product/param/updateProductClass',
            editData: { params: { classId: '', paramVar: '', paramClass: '', paramName: '', paramType: '', paramValueList: '', isRequired: '', url: 'param/editClassParam' } },
            addmore: { params: { classId: '', paramVar: '', paramClass: '', paramName: '', paramType: '', paramValueList: [{name:'',value:'',order:0}], isRequired: '', url: 'param/addClassParam', } },
            rules: {
                classId: [
                    { required: true, message: '保险类别不能为空'},
                ],
                paramVar: [
                    { required: true, message: '参数变量名不能为空'}
                ],
                paramClass: [
                    { required: true, message: '参数分类名称不能为空'}
                ],
                paramName: [
                    { required: true, message: '参数名称不能为空' }
                ],
                paramType: [
                    { required: true, message: '参数类型不能为空' }
                ],
                paramValue: [
                    { required: true, message: '参数可选项不能为空'}
                ],
                isRequired: [
                    { required: true, message: '是否必填不能为空'}
                ]
            },
            rules1: {
                classId: [
                    { required: true, message: '保险类别不能为空'},
                ],
                paramVar: [
                    { required: true, message: '参数变量名不能为空'}
                ],
                paramClass: [
                    { required: true, message: '参数分类名称不能为空'}
                ],
                paramName: [
                    { required: true, message: '参数名称不能为空' }
                ],
                paramType: [
                    { required: true, message: '参数类型不能为空' }
                ],
                paramValue: [
                    { required: true, message: '参数可选项不能为空'}
                ],
                isRequired: [
                    { required: true, message: '是否必填不能为空'}
                ]
            }
        }
    },
    computed: {
    },
    created() {
        this.getApplyList();
        this.getList();
    },
    mounted() {

    },
    methods: {
        //时间控件默认事件
        dateChange() {
            if (this.pickTimeStart === "") {
                this.listQuery.params.effTimestr = "";
            } else {
                this.listQuery.params.effTimestr = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.listQuery.params.expTimestr = "";
            } else {
                this.listQuery.params.expTimestr = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //重置
        reset() {
            this.listQuery.params.elementName = "";
        },
        //保险公司下拉菜单
        getList() {
            let obj = {
                url: 'insurer/findAll',
                parentId: 0
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.poList = response.data.insurersList;
                }
            }).catch(err => {

            })
        },
        //编辑下拉菜单增加
        ADD(index) {
            this.editData.params.paramValueList.push({name:'',value:'',order:index+2});
            this.dialogFormVisible = false;
            this.edit(this.editData.params.classId,this.editData.params.paramVar,this.editData.params.paramClass,this.editData.params.paramName,this.editData.params.paramType,this.editData.params.paramValueList,this.editData.params.isRequired);
        }, 
        //编辑下拉菜单删除
        DEL(index) {
            this.editData.params.paramValueList.splice(index,1);
            this.dialogFormVisible = false;
            this.edit(this.editData.params.classId,this.editData.params.paramVar,this.editData.params.paramClass,this.editData.params.paramName,this.editData.params.paramType,this.editData.params.paramValueList,this.editData.params.isRequired);
        },
        //新增下拉菜单增加
        ADD1(index) {
            this.addmore.params.paramValueList.push({name:'',value:'',order:index+2});
            this.dialogFormVisible1 = false;
            this.middle();
        }, 
        //新增下拉菜单删除
        DEL1(index) {
            this.addmore.params.paramValueList.splice(index,1);
            this.dialogFormVisible1 = false;
            this.middle();
        },
        middle() {
            this.dialogFormVisible1 = true;
        },  
        //表格默认事件
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleSizeChange(val) {
            this.listQuery.params.size = val;
            this.getApplyList();
        },
        handleCurrentPageChange(val) {
            this.listQuery.params.page = val;
            this.getApplyList();
        },
        /*搜索列表信息*/
        getApplyList() {
            console.log(this.listQuery.params)
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.total = response.data.total;
                    this.listLoading = false;   
                    this.dataList = response.data.classParamsList;
                }
            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
        //编辑按钮
        edit(val,val1,val2,val3,val4,val5,val6) {
            this.editData.params.classId = val;
            this.editData.params.paramVar = val1;
            this.editData.params.paramClass = val2;
            this.editData.params.paramName = val3;
            this.editData.params.paramType = val4;
            this.editData.params.paramValueList = val5;
            this.editData.params.isRequired = val6 + '';
            this.dialogFormVisible = true;
            console.log(this.editData.params);
            console.log(this.editData.params.paramValueList.length);
        },
        // 编辑提交 
        commit() {
            let isSuccess = true;
            console.log(this.editData.params);
            this.editData.params.classId = parseInt(this.editData.params.classId);
            this.editData.params.paramValue = this.editData.params.paramValueList;
            this.editData.params.insurerCode = parseInt(this.editData.params.insurerCode);
            this.$refs['element'].validate((valid) => {
                if (!valid) {
                    isSuccess = false;
                    return false;
                }
            });
            if (!isSuccess) {
                return false;
            }
            this.dialogLoading = true;
            config(this.editData.params).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.getApplyList();
                } else {
                    this.$message.error(response.respMsg);
                }
                this.dialogFormVisible = false;
                this.dialogLoading = false;
            })
        },
        //新增
        newAdd() {
            let isSuccess = true;
            this.$refs['classParam'].validate((valid) => {
                if (!valid) {
                    isSuccess = false;
                    return false;
                }

            });
            if (!isSuccess) {
                return false;
            }
            this.dialogLoading1 = true;
            config(this.addmore.params).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.getApplyList();
                    this.resetForm('classParam');
                } else {
                    this.$message.error(response.respMsg);
                }
                this.dialogFormVisible1 = false;
                this.dialogLoading1 = false;
            })
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //删除按钮
        del(val,val1) {
            this.classId = val;
            this.paramVar = val1;
            this.dialogVisible1 = true;
        },
        //删除
        Delete() {
            let obj = {
                url: 'param/deleteClassParam',
                classId: this.classId,
                paramVar: this.paramVar
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.dialogVisible1 = false;
                } else {
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                    this.dialogVisible1 = false;
                }
            }).catch(err => {

            })
        }
    },
    filters: {
        //是否必填
        isRequiredFilter(value) {
            if (value === 0) {
                return '可选';
            } else if (value === 1) {
                return '必选';
            } else {
                return value;
            }
        },
        //
        //状态
        stsFilter(value) {
            if (value === 10) {
                return '有效';
            } else if (value === -10) {
                return '无效';
            } else {
                return value;
            }
        },
        //参数类型
        paramTypeFilter(value) {
            if (value === 10) {
                return 'text';
            } else if (value === -10) {
                return 'radio';
            } else if (value === 21) {
                return 'checkbox';
            } else if (value === 30) {
                return 'select';
            } else if (value === 40) {
                return '日期控件';
            }else {
                return value;
            }
        }
    }
}
</script>
<style lang="less">
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