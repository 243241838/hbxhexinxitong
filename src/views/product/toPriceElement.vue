<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>因子名称:</span>
            <el-input v-model="listQuery.params.elementName" placeholder="因子名称" style="width:200px;margin-right: 50px;"></el-input>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="reset">重置</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">查询</el-button>
        </div>
        <div class="filter-container">
            <el-button class="filter-item" type="primary" v-waves icon="plus" @click="dialogFormVisible1 = true">新增</el-button>
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
                        <el-button @click="edit(scope.row.elementCode, scope.row.parentId, scope.row.elementDesc, scope.row.elementId, scope.row.elementName, scope.row.insurerCode)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button @click="del(scope.row.elementId)" type="text" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="因子名称">
                    <template scope="scope">
                        <el-button @click="openChild(scope.row.children)" type="text" size="small" v-if="scope.row.children">
                            {{scope.row.elementName}}
                        </el-button>
                        <span v-else>{{scope.row.elementName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="说明">
                    <template scope="scope">
                        {{scope.row.elementDesc}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="因子Code">
                    <template scope="scope">
                        <span>{{scope.row.elementCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险公司Code">
                    <template scope="scope">
                        <span>{{scope.row.insurerCode}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 编辑 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <el-form :model="editData.params" :rules="rules" ref="element" v-loading="dialogLoading">
                <el-form-item prop="insurerCode" label="保险公司:" label-width="220" required>
                    <el-select v-model.number="editData.params.insurerCode" placeholder="保险公司">
                        <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="parentId" label="上级因子:" label-width="220" required>
                    <el-select v-model.number="editData.params.parentId" placeholder="顶级因子">
                        <el-option v-for="item in elementList" :key="item.elementId" :label="item.elementName" :value="item.elementId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="elementName" label="因子名称:" label-width="220" required>
                    <el-input v-model="editData.params.elementName" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="elementDesc" label="说明:" label-width="220" required>
                    <el-input type="textarea" v-model="editData.params.elementDesc" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="code:" label-width="220" required>
                    <el-input v-model="editData.params.elementCode" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commit">保存</el-button>
            </div>
        </el-dialog>
        <!-- 新增 -->
        <el-dialog :title="dialogTitle1" :visible.sync="dialogFormVisible1" v-loading="dialogLoading1">
            <el-form :model="addmore.params" :rules="rules1" ref="newSort">
                <el-form-item prop="insurerCode" label="保险公司:" label-width="220" required>
                    <el-select v-model.number="addmore.params.insurerCode" placeholder="保险公司">
                        <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="parentId" label="上级因子:" label-width="220" required>
                    <el-select v-model.number="addmore.params.parentId" placeholder="顶级因子">
                        <el-option v-for="item in elementList" :key="item.elementId" :label="item.elementName" :value="item.elementId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="elementName" label="因子名称:" label-width="220" required>
                    <el-input v-model="addmore.params.elementName" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="elementDesc" label="说明:" label-width="220" required>
                    <el-input type="textarea" v-model="addmore.params.elementDesc" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="elementCode" label="code:" label-width="220" required>
                    <el-input v-model="addmore.params.elementCode" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="newAdd">保存</el-button>
            </div>
        </el-dialog>
        <!-- 保险子类 -->
        <el-dialog title="保险子类" :visible.sync="dialogFormVisible2">
            <div class="filter-container">
            <el-table :data="childrenList"  border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template scope="scope">
                        <el-button @click="edit(scope.row.elementCode, scope.row.parentId, scope.row.elementDesc, scope.row.elementId, scope.row.elementName, scope.row.insurerCode)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button @click="del(scope.row.elementId)" type="text" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="因子名称">
                    <template scope="scope">
                        <span>{{scope.row.elementName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="说明">
                    <template scope="scope">
                        {{scope.row.elementDesc}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="因子Code">
                    <template scope="scope">
                        <span>{{scope.row.elementCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险公司Code">
                    <template scope="scope">
                        <span>{{scope.row.insurerCode}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            </div>
        </div>
        </el-dialog>
        <!-- <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%" top="30%" size="small" >
            <span slot="footer" class="dialog-footer" style="width：30%;">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="Delete()">确 定</el-button>
            </span>
        </el-dialog> -->
        <el-dialog title="提示" :visible.sync="dialogVisible3"  class="autoAlert">
            <h2 style="text-align:center;">是否要删除</h2>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false;dialogFormVisible2 = false;">取 消</el-button>
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
            listQuery: { params: { url: 'product/priceElement/findList', page: 1, size: 10, elementName: '' } },
            current: 1, // 默认显示第一页
            total: 0,
            dataList: [],
            childrenList: [],
            dialogVisible: false,
            dialogVisible1: false,
            elementId: '',
            classTypeStatus: [{ code: 1, text: '车险' }, { code: 2, text: '个险' }],
            poList: '',   //保险公司
            elementList: '',//计价因子
            // 对话框打开
            dialogLoading: false,
            dialogLoading1: false,
            dialogTitle: '编辑计价因子',
            dialogTitle1: '新增计价因子',
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogVisible3: false,
            dialogURL: 'product/param/updateProductClass',
            editData: { params: { elementCode: '', parentId: '', elementDesc: '', elementId: '', elementName: '', insurerCode: '', url: 'product/priceElement/updatePriceElement' } },
            addmore: { params: { elementCode: '', parentId: '', elementDesc: '', elementId: '', elementName: '', insurerCode: '', url: 'product/priceElement/addPriceElement', } },
            rules: {
                elementCode: [
                    { required: true, message: '请选择角色'},
                ],
                elementDesc: [
                    { required: true, message: '说明不能为空'}
                ],
                elementId: [
                    { required: true, message: '分类类别不能为空'}
                ],
                elementName: [
                    { required: true, message: '因子名称不能为空' }
                ],
                parentId: [
                    { required: true, message: '上级因子不能为空' }
                ],
                insurerCode: [
                    { required: true, message: '保险公司不能为空'}
                ],
            },
            rules1: {
                elementCode: [
                    { required: true, message: '请选择角色'},
                ],
                elementDesc: [
                    { required: true, message: '说明不能为空'}
                ],
                elementId: [
                    { required: true, message: '分类类别不能为空'}
                ],
                elementName: [
                    { required: true, message: '因子名称不能为空'}
                ],
                parentId: [
                    { required: true, message: '上级因子不能为空' }
                ],
                insurerCode: [
                    { required: true, message: '保险公司不能为空' }
                ],
            }
        }
    },
    computed: {
    },
    created() {
        this.getApplyList();
        this.getEleList();
        this.getList();
    },
    mounted() {

    },
    methods: {
        //重置
        reset() {
            this.listQuery.params.elementName = "";
        },
        //表格默认时间
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
        //计价因子下拉菜单
        getEleList() {
            let obj = {
                url: '/product/priceElement/findAll',
                parentId: 0
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.elementList = response.data.priceElementList;
                }
            }).catch(err => {

            })
        },
        /*搜索列表信息*/
        getApplyList() {
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.total = response.data.total;
                    this.listLoading = false;
                    this.dataList = response.data.priceElementList;
                }
            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
        //编辑按钮
        edit(val, val1, val2, val3, val4, val5) {
            this.editData.params.elementCode = val;
            this.editData.params.parentId = val1;
            this.editData.params.elementDesc = val2;
            this.editData.params.elementId = val3;
            this.editData.params.elementName = val4;
            this.editData.params.insurerCode = val5;
            this.dialogFormVisible = true;
            this.dialogFormVisible2 = false;
        },
        //删除按钮
        del(val) {
            this.elementId = val;
            this.dialogVisible3 = true;
            
        },
        // 编辑提交 
        commit() {
            let isSuccess = true;
            console.log(this.editData.params);
            // this.editData.params.parentId = parseInt(this.editData.params.parentId);
            // this.editData.params.insurerCode = parseInt(this.editData.params.insurerCode);
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
            this.$refs['newSort'].validate((valid) => {
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
                    this.resetForm('newSort');
                } else {
                    this.$message.error(response.respMsg);
                }
                this.dialogFormVisible1 = false;
                this.dialogLoading1 = false;
            })
        },
        //打开子类
        openChild(val) {
            this.dialogFormVisible2 = true;
            this.childrenList = val;
            console.log(this.childrenList)
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //删除
        Delete() {
            let obj = {
                url: 'product/priceElement/deletePriceElementById',
                elementId: this.elementId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.dialogVisible3 = false;
                    this.getApplyList();
                } else {
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                    this.dialogVisible3 = false;
                }
                this.dialogFormVisible2 = false;
            }).catch(err => {

            })
        }
        
    },
    filters: {
        //保险类别
        classTypeFilter(value) {
            if (value === 2) {
                return '个险';
            } else if (value === 1) {
                return '车险';
            } else {
                return value;
            }
        }
    }
}
</script>
<style lang="less" >
.app-container {
    margin: 10px 10px 0 10px;
}

.app-container .filter-container {
    margin-top: 20px;
}

.app-container .filter-container .rightData {
    margin-right: 100px;
}
.autoAlert{
        .el-dialog{
            &.el-dialog--small{
                min-width:300px;
                max-width:430px;
            }
        }
    }
</style>