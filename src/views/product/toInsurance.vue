<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>分类名称:</span>
            <el-input v-model="listQuery.params.className" placeholder="分类名称" style="width:200px;margin-right: 50px;"></el-input>
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="reset">重置</el-button>
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
                <el-table-column align="center" label="快速操作">
                    <template scope="scope">
                        <el-button @click="edit(scope.row.classId,scope.row.classLogo,scope.row.classType,scope.row.className,scope.row.sortCode,scope.row.parentId)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button @click="del(scope.row.classId)" type="text" size="small">
                            失效
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险分类类别">
                    <template scope="scope">
                        {{scope.row.classType | classTypeFilter}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="分类名称">
                    <template scope="scope">
                        <el-button @click="openChild(scope.row.children)" type="text" size="small" v-if="scope.row.children">
                            {{scope.row.className}}
                        </el-button>
                        <span v-else>{{scope.row.className}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="分类logo">
                    <template scope="scope">
                        <img :src="scope.row.classLogo" alt="" style="width:40px;height:40px;" v-if="scope.row.classLogo">
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品数量">
                    <template scope="scope">
                        <span>{{scope.row.productCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="排序">
                    <template scope="scope">
                        <span>{{scope.row.sortCode}}</span>
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
            <el-form :model="sysUserVo" :rules="rules" ref="userInfo" v-loading="dialogLoading">
                <el-form-item prop="parentId" label="上级分类:" label-width="220" required>
                    <el-select v-model.number="sysUserVo.parentId" placeholder="">
                        <el-option v-for="item in poList" :key="item.classId" :label="item.className" :value="item.classId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="classType" label="保险分类类别:" label-width="220" required>
                    <el-select v-model.number="sysUserVo.classType" placeholder="保险分类类别">
                        <el-option v-for="item in classTypeStatus" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="className" label="分类名称:" label-width="220" required>
                    <el-input v-model="sysUserVo.className" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="sortCode" label="排序:" label-width="220" required>
                    <el-input v-model.number="sysUserVo.sortCode" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="classLogo" label="分类logo:" label-width="220" required>
                    <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'sysUserVo.classLogo'"></uploadImg>
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
                <el-form-item prop="parentId" label="上级分类:" label-width="220" required>
                    <el-select v-model.number="addmore.params.parentId" placeholder="">
                        <el-option v-for="item in poList" :key="item.classId" :label="item.className" :value="item.classId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="classType" label="保险分类类别:" label-width="220" required>
                    <el-select v-model.number="addmore.params.classType" placeholder="保险分类类别">
                        <el-option v-for="item in classTypeStatus" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="className" label="分类名称:" label-width="220" required>
                    <el-input v-model="addmore.params.className" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="sortCode" label="排序:" label-width="220" required>
                    <el-input v-model.number="addmore.params.sortCode" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="分类logo:" label-width="220" required>
                    <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'addmore.params.classLogo'"></uploadImg>
                    <!-- <img :src="addmore.params.classLogo" alt="" style="width:40px;height:40px;"> -->
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
                <el-table-column align="center" label="快速操作">
                    <template scope="scope">
                        <el-button @click="edit(scope.row.classId,scope.row.classLogo,scope.row.classType,scope.row.className,scope.row.sortCode,scope.row.parentId)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button @click="del(scope.row.classId)" type="text" size="small">
                            失效
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险分类类别">
                    <template scope="scope">
                        {{scope.row.classType | classTypeFilter}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="分类名称">
                    <template scope="scope">
                        {{scope.row.className}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="分类logo">
                    <template scope="scope">
                        <img :src="scope.row.classLogo" alt="" style="width:40px;height:40px;" v-if="scope.row.classLogo">
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品数量">
                    <template scope="scope">
                        <span>{{scope.row.productCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="排序">
                    <template scope="scope">
                        <span>{{scope.row.sortCode}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            </div>
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
import uploadImg from "@src/components/uploadImg";
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            listLoading: true,
            pickTimeStart: '',
            pickTimeEnd: '',
            listQuery: { params: { url: 'product/param/findProductClassesList', page: 1, size: 10, className: '' } },
            current: 1, // 默认显示第一页
            total: 0,
            dataList: [],
            childrenList: [],
            codesValueStatus: [{ code: 1, text: '1' }, { code: 2, text: '2' }, { code: 3, text: '3' }, { code: 4, text: '4' }, { code: 5, text: '5' }, { code: 6, text: '6' }, { code: 7, text: '特别费率' }],
            dialogVisible: false,
            dialogVisible1: false,
            classId: '',
            poList: '',//上级分类下拉菜单
            classTypeStatus: [{ code: 1, text: '车险' }, { code: 2, text: '个险' }],
            // 对话框
            dialogLoading: false,
            dialogLoading1: false,
            dialogTitle: '编辑分类',
            dialogTitle1: '新增分类',
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogURL: 'product/param/updateProductClass',
            sysUserVo: {
                classId: '',
                classType: '',
                className: '',
                sortCode: '',
                classLogo: '',
                parentId: ''
            },
            addmore: { params: {  classType: '', className: '', sortCode: '', classLogo: '', parentId: '', url: 'product/param/addProductClass', } },
            // 表单验证
            rules: {
                classId: [
                    { required: true, message: '请选择角色' },
                ],
                classType: [
                    { required: true, message: '保险分类类别不能为空'}
                ],
                className: [
                    { required: true, message: '分类类别不能为空'}
                ],
                sortCode: [
                    { required: true, message: '排序不能为空' },
                    { type: 'number', message: '排序必须为数字值' }
                ],
                parentId: [
                    { required: true, message: '上级分类不能为空'}
                ],
                classLogo: [
                    { required: true, message: '分类logo不能为空'}
                ],
            },
            rules1: {
                classId: [
                    { required: true, message: '请选择角色' },
                ],
                classType: [
                    { required: true, message: '保险分类类别不能为空' }
                ],
                className: [
                    { required: true, message: '分类类别不能为空'}
                ],
                sortCode: [
                    { required: true, message: '排序不能为空' },
                    { type: 'number', message: '排序必须为数字值' }
                ],
                parentId: [
                    { required: true, message: '上级分类不能为空' }
                ],
                classLogo: [
                    { required: true, message: '分类logo不能为空'}
                ],
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
        //重置
        reset() {
            this.listQuery.params.className = "";
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
        //上级分类下拉菜单
        getList() {
            let obj = {
                url: 'product/param/findProductClasses',
                parentId: 0
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.poList = response.data;
                    // this.poList = this.poList.push({classId:0,className:'顶级保险分类'});
                    // console.log(this.poList);
                }
            }).catch(err => {

            })
        },
        openChild(val) {
            this.dialogFormVisible2 = true;
            this.childrenList = val;
        },
        /*搜索列表信息*/
        getApplyList() {
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.total = response.data.total;
                    this.listLoading = false;
                    this.dataList = response.data.productClassesList;
                }

            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
        //编辑按钮
        edit(val, val1, val2, val3, val4, val5) {
            this.classId = val;
            this.dialogFormVisible = true;
            this.dialogFormVisible2 = false;
            this.sysUserVo.classLogo = val1;
            this.sysUserVo.classType = val2;
            this.sysUserVo.className = val3;
            this.sysUserVo.sortCode = val4;
            this.sysUserVo.parentId = val5;
        },
        // 编辑提交 
        commit() {
            let isSuccess = true;
            this.sysUserVo.classType = parseInt(this.sysUserVo.classType);
            this.sysUserVo.sortCode = parseInt(this.sysUserVo.sortCode);
            this.$refs['userInfo'].validate((valid) => {
                if (!valid) {
                    isSuccess = false;
                    return false;
                }
            });
            if (!isSuccess) {
                return false;
            }
            this.dialogLoading = true;
            config({ url: this.dialogURL, classId: this.classId, classType: this.sysUserVo.classType, className: this.sysUserVo.className, sortCode: this.sysUserVo.sortCode, classLogo: this.sysUserVo.classLogo, parentId: this.sysUserVo.parentId }).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: 　response.respMsg,
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
            console.log(this.addmore);
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
        //删除按钮
        del(val) {
            this.classId = val;
            this.dialogVisible1 = true;
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //删除
        Delete() {
            let obj = {
                url: 'product/param/deleteProductClass',
                classId: this.classId
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
        },
        //上传图片默认事件
        acqImgUrl(params) {
            if ('addmore.params.classLogo' == params[1]) {
                this.addmore.params.classLogo = params[0];
            } 
            if ('sysUserVo.classLogo' == params[1]) {
                this.sysUserVo.classLogo = params[0];
            } 
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