<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>用户ID：</span>
            <el-input v-model="listQuery.params.userId" placeholder="" style="   width:200px;margin-right: 50px;"></el-input>
            <span>用户名：</span>
            <el-input v-model="listQuery.params.username" placeholder="" style="width:200px;margin-right: 50px;"></el-input>

            <span>用户昵称：</span>
            <el-input v-model="listQuery.params.userNickName" placeholder="" style="width:200px;margin-right: 50px;"></el-input>
            <span>注册时间：</span>
            <el-date-picker v-model="listQuery.params.createTimeStart" type="date" placeholder="起始时间" :editable="false" >
            </el-date-picker>-
            <el-date-picker v-model="listQuery.params.createTimeEnd" type="date" placeholder="结束时间" :editable="false" >
            </el-date-picker>
        </div>
        <div class="filter-container">
            <span>姓名:</span>
            <el-input v-model="listQuery.params.realName" placeholder="" style="width:200px;margin-right: 50px;"></el-input>

            <span>手机号码：</span>
            <el-input v-model="listQuery.params.mobile" placeholder="" style="   width:200px;margin-right: 50px;"></el-input>
            <span>等级：</span>
            <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.userLevel" placeholder="用户状态">
                <el-option v-for="item in userLevelStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>

            <span>注册渠道：</span>
            <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.domainCode" placeholder="用户状态">
                <el-option v-for="item in domainStatus" :key="item.domainId" :label="item.domainName" :value="item.domainId">
                </el-option>
            </el-select>
            <span>用户状态：</span>
            <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.status" placeholder="用户状态">
                <el-option v-for="item in creditApplyStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>


            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getList">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="reset">重置</el-button>
        </div>
        <div class="filter-container" >
            <el-table :data="dataList" v-loading="listLoading" border fit
                      style="width: 100%"  @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="userId" label="用户ID">
                </el-table-column>

                <el-table-column align="center" prop="username" label="用户名">
                </el-table-column>

                <el-table-column align="center" prop="userNickName" label="用户昵称">
                </el-table-column>

                <el-table-column align="center" prop="userLevel" label="等级">
                    <template scope="scope">
                        <span>{{scope.row.userLevel==10?'C端':(scope.row.userLevel==20?'B端':'')}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="domainName" label="注册渠道">
                </el-table-column>

                <el-table-column align="center" prop="createTime" label="注册时间">
                </el-table-column>

                <el-table-column align="center" prop="lastLoginTime" label="最后登录时间">
                </el-table-column>

                <el-table-column align="center" prop="realName" label="姓名">
                </el-table-column>

                <el-table-column align="center" prop="mobile" label="手机">
                </el-table-column>

                <el-table-column align="center" prop="userGender" label="性别">
                    <template scope="scope">
                        <span>{{scope.row.userGender==1?'男':(scope.row.userLevel==2?'女':'保密')}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="status" label="用户状态">
                    <template scope="scope">
                        <span>{{scope.row.status==0?'正常':(scope.row.userLevel==-1?'注销':(scope.row.userLevel==-2?'注销':'冻结'))}}</span>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange"
                           :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]"
                           :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <div style="text-align:center">
            <el-button type="primary" @click="choose()">确 定</el-button>
            <el-button type="primary" @click="cancel()">取 消</el-button>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as  static_data from '@utils/static_data.js';
    import * as  util from '@src/utils/util';

    export default {
        data() {
            return {
                listLoading: true,
                userLevelStatus: [{value:'',label:'全部'},{ code: 10, text: 'C端' }, { code: 20, text: 'B端' }, { code: 11, text: '业务人员' }],//等级下拉框
                domainStatus: [],
                creditApplyStatus:[{value:'',label:'全部'},{ code: 0, text: '正常' }, { code: -1, text: '注销' }, { code: -2, text: '冻结' }],
                listQuery: {params: {url: '/user/findUserMsg', page: 1, size: 10,
                    userId: '', username: '',userNickName:'',createTimeStart:'',
                    createTimeEnd:'',realName:'',mobile:'',userLevel:'',
                    domainCode:'',status:''}},
                total: 0,
                dataList: [],
                currentRow: []
            }
        },
        props: {
            selectType: {  // 父组件传过来的，决定组件是单选还是多选
                type: String
            }
        },
        created() {
            this.getDomainList();
            this.getList();
        },
        methods: {
            getDomainList(){
                let obj = {
                    url: 'channel/menuList'
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.domainStatus = [{value:'',label:'全部'}].concat(response.data.domainsPoList);
                    } else {
                    }
                }).catch(err => {

                })
            },
            //重置
            reset() {
                this.listQuery.params = {url: '/user/findUserMsg', page: 1, size: 10,
                    userId: '', username: '',userNickName:'',createTimeStart:'',
                    createTimeEnd:'',realName:'',mobile:'',userLevel:'',
                    domainCode:'',status:''}
            },
            handleSelectionChange(val){
                console.log(val);
                this.currentRow = val;
            },
            handleSizeChange(val) {
                this.listQuery.params.size = val;
                this.getList();
            },
            handleCurrentPageChange(val) {
                this.listQuery.params.page = val;
                this.getList();
            },
            /*搜索列表信息*/
            getList() {
                config(this.listQuery.params).then(response => {
                    if (response.respCode === '000000') {
                        this.total = response.data.total;
                        this.listLoading = false;
                        response.data.userList.forEach(function (vo) {
                            vo.createTime = util.changeDate(vo.createTime,'datetime');
                            vo.lastLoginTime = util.changeDate(vo.lastLoginTime,'datetime');
                        });
                        this.dataList = response.data.userList;

                    }

                }).catch(err => {
                    this.listLoading = true;
                    this.dataList = null;
                })
            },
            choose(){
                if(this.currentRow.length==0){
                    this.$message.error("至少选择一个产品");
                    return;
                }
                //防止页面 弹出页面和父页面 产品对应一致,
                // 导致点击子页面选中产品时， 父页面变化
                var selectRow = [];
                this.currentRow.forEach(function(v) {
                    selectRow.push(v);
                });

                this.$emit('child-geiIds',selectRow);
            },
            cancel(){
                this.$emit('child-cancle');
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