<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>保险公司ID:</span>
            <el-input v-model="listQuery.params.insurerId" placeholder="保险公司ID" style="width:150px;margin-right: 50px;"></el-input>
            <span>保险公司名称:</span>
            <el-input v-model="listQuery.params.insurerName" placeholder="保险公司名称" style="width:150px;margin-right: 50px;"></el-input>
            <span>状态:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.sts" placeholder="状态">
                <el-option v-for="item in Status" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
            <span>保险公司类型:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.insurerType" placeholder="保险公司类型">
                <el-option v-for="item in insurerTypeStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
            <el-checkbox v-model="listQuery.params.insurerLevel" label="1">显示一级公司</el-checkbox>
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
                <el-table-column align="center" label="快速操作">
                    <template scope="scope">
                        <el-button @click="edit(scope.row.insurerId,scope.row.parentId,scope.row.insurerName,scope.row.insurerType,scope.row.insurerTels,scope.row.contacts,scope.row.mobile,scope.row.businessDesc,scope.row.areaDesc,scope.row.insurerCode,scope.row.depositBank,scope.row.accountName,scope.row.accountNo,scope.row.insurerLogo)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button @click="del(scope.row.insurerId,scope.row.parentId)" type="text" size="small">
                            失效
                        </el-button>
                        <el-button @click="goArea(scope.row.insurerId)" type="text" size="small" v-if="scope.row.insurerType === 20">
                            地区维护
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险公司ID">
                    <template scope="scope">
                        {{scope.row.insurerId}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险公司logo ">
                    <template scope="scope">
                        <img :src="scope.row.insurerLogo" alt="" style="width:40px;height:40px;" v-if="scope.row.insurerLogo">
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险公司/机构名称">
                    <template scope="scope">
                        {{scope.row.insurerName}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险公司类型 ">
                    <template scope="scope">
                        <span>{{scope.row.insurerType | insurerTypeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="客服电话">
                    <template scope="scope">
                        <span>{{scope.row.insurerTels}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="联系人">
                    <template scope="scope">
                        <span>{{scope.row.contacts}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="联系电话">
                    <template scope="scope">
                        <span>{{scope.row.mobile}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="简介">
                    <template scope="scope">
                        <span>{{scope.row.insurerIntro}}</span>
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <el-form :model="editData.params" :rules="rules" ref="element" v-loading="dialogLoading">
                <el-form-item prop="insurerId" label="保险公司ID:" label-width="220" required>
                    <el-input v-model.number="editData.params.insurerId" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="parentId" label="上级公司:" label-width="220" required>
                    <el-select v-model.number="editData.params.parentId" placeholder="上级公司">
                        <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="insurerName" label="公司名称:" label-width="220" required>
                    <el-input v-model="editData.params.insurerName" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="insurerType" label="公司类别:" label-width="220" required>
                    <el-select v-model.number="editData.params.insurerType" placeholder="公司类别">
                        <el-option v-for="item in insurerTypeStatus" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="insurerTels" label="客服电话:" label-width="220" required>
                    <el-input v-model="editData.params.insurerTels" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="contacts" label="联系人:" label-width="220" required>
                    <el-input v-model="editData.params.contacts" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="联系人电话:" label-width="220" required>
                    <el-input v-model="editData.params.mobile" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="businessDesc" label="承保业务:" label-width="220" required>
                    <el-input type="textarea" v-model="editData.params.businessDesc" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="areaDesc" label="承保地区:" label-width="220" required>
                    <el-input v-model="editData.params.areaDesc" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="insurerCode" label="公司code:" label-width="220" required>
                    <el-input v-model="editData.params.insurerCode" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="depositBank" label="开户银行名称:" label-width="220" required>
                    <el-input v-model="editData.params.depositBank" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="accountName" label="银行账号户名:" label-width="220" required>
                    <el-input v-model="editData.params.accountName" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="accountNo" label="银行账号:" label-width="220" required>
                    <el-input v-model="editData.params.accountNo" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="insurerLogo" label="公司配图:" label-width="220" required>
                    <img :src="editData.params.insurerLogo" alt="" v-if="editData.params.insurerLogo" width="120" height="120">
                    <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'editData.params.insurerLogo'"></uploadImg>
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
                <el-form-item prop="insurerId" label="保险公司ID:" label-width="220" required>
                    <el-input v-model.number="addmore.params.insurerId" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="parentId" label="上级公司:" label-width="220" required>
                    <el-select v-model.number="addmore.params.parentId" placeholder="上级公司">
                        <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="insurerName" label="公司名称:" label-width="220" required>
                    <el-input v-model="addmore.params.insurerName" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="insurerType" label="公司类别:" label-width="220" required>
                    <el-select v-model.number="addmore.params.insurerType" placeholder="公司类别">
                        <el-option v-for="item in insurerTypeStatus" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="insurerTels" label="客服电话:" label-width="220" required>
                    <el-input v-model="addmore.params.insurerTels" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="contacts" label="联系人:" label-width="220" required>
                    <el-input v-model="addmore.params.contacts" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="联系人电话:" label-width="220" required>
                    <el-input v-model="addmore.params.mobile" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="businessDesc" label="承保业务:" label-width="220" required>
                    <el-input type="textarea" v-model="addmore.params.businessDesc" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="areaDesc" label="承保地区:" label-width="220" required>
                    <el-input v-model="addmore.params.areaDesc" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="insurerCode" label="公司code:" label-width="220" required>
                    <el-input v-model="addmore.params.insurerCode" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="depositBank" label="开户银行名称:" label-width="220" required>
                    <el-input v-model="addmore.params.depositBank" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="accountName" label="银行账号户名:" label-width="220" required>
                    <el-input v-model="addmore.params.accountName" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="accountNo" label="银行账号:" label-width="220" required>
                    <el-input v-model="addmore.params.accountNo" auto-complete="off" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item prop="insurerLogo" label="公司配图:" label-width="220" required>
                    <img :src="addmore.params.insurerLogo" alt="" v-if="addmore.params.insurerLogo" width="120" height="120">
                    <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'addmore.params.insurerLogo'"></uploadImg>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="newAdd">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisible1" width="20%" center="true">
            <h1 style="text-align:center;">是否要失效</h1>
            <span slot="footer" class="dialog-footer" center>
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
            listQuery: { params: { url: 'insurer/findInsurerList', page: 1, size: 10, insurerId: '', insurerLevel: '', insurerName: '', insurerType: '', sts: '' } },
            current: 1, // 默认显示第一页
            total: 0,
            dataList: [],
            Status: [{ code: 1, text: '有效' }, { code: -1, text: '无效' }],
            insurerTypeStatus: [{ code: 10, text: '个险' }, { code: 20, text: '车险' }, { code: 21, text: '车险分期' },{ code: 30, text: '寿险' }],
            dialogVisible: false,
            dialogVisible1: false,
            insurerId: '',
            parentId: '',
            poList: '',   //保险公司
            elementList: '',//
            // 对话框
            dialogLoading: false,
            dialogLoading1: false,
            dialogTitle: '编辑保险公司',
            dialogTitle1: '新增保险公司',
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogURL: 'product/param/updateProductClass',
            editData: { params: { updateId:'',insurerId: '', parentId: '', insurerName: '', insurerType: '', insurerTels: '', contacts: '', mobile: '', businessDesc: '', areaDesc: '', insurerCode: '', depositBank: '', accountName: '', accountNo: '', insurerLogo: '', url: 'insurer/updateInsurer' } },
            addmore: { params: { insurerId: '', parentId: '', insurerName: '', insurerType: '', insurerTels: '', contacts: '', mobile: '', businessDesc: '', areaDesc: '', insurerCode: '', depositBank: '', accountName: '', accountNo: '', insurerLogo: '', url: 'insurer/addInsurer' } },
            rules: {
                insurerId: [
                    { required: true, message: '保险公司ID不能为空'},
                    { type: 'number', message: '保险公司ID必须为数字值'}
                ],
                parentId: [
                    { required: true, message: '上级公司不能为空'}
                ],
                insurerName: [
                    { required: true, message: '公司名称不能为空'}
                ],
                insurerType: [
                    { required: true, message: '公司类别不能为空'}
                ],
                insurerTels: [
                    { required: true, message: '客服电话不能为空'}
                ],
                contacts: [
                    { required: true, message: '联系人不能为空'}
                ],
                mobile: [
                    { required: true, message: '联系人电话不能为空'},
                ],
                businessDesc: [
                    { required: true, message: '承保业务不能为空'}
                ],
                areaDesc: [
                    { required: true, message: '承保地区不能为空'}
                ],
                insurerCode: [
                    { required: true, message: '公司code不能为空'}
                ],
                depositBank: [
                    { required: true, message: '开户银行名称不能为空'}
                ],
                accountName: [
                    { required: true, message: '银行账号户名不能为空'}
                ],
                accountNo: [
                    { required: true, message: '银行账号不能为空'},
                ],
                insurerLogo: [
                    { required: true, message: '公司配图不能为空' }
                ]
            },
            rules1: {
                insurerId: [
                    { required: true, message: '保险公司ID不能为空'},
                    { type: 'number', message: '保险公司ID必须为数字值'}
                ],
                parentId: [
                    { required: true, message: '上级公司不能为空'}
                ],
                insurerName: [
                    { required: true, message: '公司名称不能为空'}
                ],
                insurerType: [
                    { required: true, message: '公司类别不能为空'}
                ],
                insurerTels: [
                    { required: true, message: '客服电话不能为空' }
                ],
                contacts: [
                    { required: true, message: '联系人不能为空'}
                ],
                mobile: [
                    { required: true, message: '联系人电话不能为空'},
                ],
                businessDesc: [
                    { required: true, message: '承保业务不能为空'}
                ],
                areaDesc: [
                    { required: true, message: '承保地区不能为空'}
                ],
                insurerCode: [
                    { required: true, message: '公司code不能为空'}
                ],
                depositBank: [
                    { required: true, message: '开户银行名称不能为空'}
                ],
                accountName: [
                    { required: true, message: '银行账号户名不能为空'}
                ],
                accountNo: [
                    { required: true, message: '银行账号不能为空' },
                ],
                insurerLogo: [
                    { required: true, message: '公司配图不能为空'}
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
        //重置
        reset() {
            this.listQuery.params.className = "";
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
        /*搜索列表信息*/
        getApplyList() {
            if (this.listQuery.params.insurerLevel === true) {
                this.listQuery.params.insurerLevel = 1
            }
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.total = response.data.total;
                    this.listLoading = false;
                    this.dataList = response.data.insurersList;
                }

            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
        //编辑按钮
        edit(val, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13) {
            this.editData.params.insurerId = val;
            this.editData.params.parentId = val1;
            this.editData.params.insurerName = val2;
            this.editData.params.insurerType = val3;
            this.editData.params.insurerTels = val4;
            this.editData.params.contacts = val5;
            this.editData.params.mobile = val6;
            this.editData.params.businessDesc = val7;
            this.editData.params.areaDesc = val8;
            this.editData.params.insurerCode = val9;
            this.editData.params.depositBank = val10;
            this.editData.params.accountName = val11;
            this.editData.params.accountNo = val12;
            this.editData.params.insurerLogo = val13;
            this.editData.params.updateId = val;
            this.dialogFormVisible = true;
        },
        //删除按钮
        del(val) {
            this.elementId = val;
            this.dialogVisible1 = true;
        },
        // 编辑提交 
        commit() {
            let isSuccess = true;
            console.log(this.editData.params);
            this.editData.params.parentId = parseInt(this.editData.params.parentId);
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
            this.addmore.params.updateId = this.addmore.params.insurerId;
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
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //失效按钮
        del(val, val1) {
            this.insurerId = val;
            this.parentId = val1;
            this.dialogVisible1 = true;
        },
        //前往地区维护
        goArea(val) {
            this.$router.push({ path: '/product/areaService', query: { insurerId: val } })
        },
        //上传图片事件
        acqImgUrl(params) {
            if ('addmore.params.insurerLogo' == params[1]) {
                this.addmore.params.insurerLogo = params[0];
            }  
            if ('editData.params.insurerLogo' == params[1]) {
                this.editData.params.insurerLogo = params[0];
            } 
        },
        //失效
        Delete() {
            let obj = {
                url: 'insurer/deleteInsurerById',
                insurerId: this.insurerId,
                parentId: this.parentId
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
                this.dialogVisible1 = false;
            })
        }
    },
    filters: {
        insurerTypeFilter(value) {
            if (value === 20) {
                return '车险';
            } else if (value === 10) {
                return '个险';
            } else if (value === 21) {
                return '车险分期';
            } else if (value === 30) {
                return '寿险';
            } else {
                return value;
            }
        },
        stsFilter(value) {
            if (value === 1) {
                return '有效';
            } else if (value === -1) {
                return '失效';
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