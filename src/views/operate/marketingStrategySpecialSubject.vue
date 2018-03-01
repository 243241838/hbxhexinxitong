<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>专题ID:</span>
            <el-input v-model="listQuery.params.specialId" placeholder="" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>专题名称:</span>
            <el-input v-model="listQuery.params.specialName" placeholder="" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>专题类型:</span>
            <el-select v-model="listQuery.params.specialType" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in specialTypeArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span>专题状态:</span>
            <el-select v-model="listQuery.params.timests" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in timestsArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span>审核状态:</span>
            <el-select v-model="listQuery.params.exsts" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in exstsArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span>专题时间:</span>
            <el-date-picker v-model="listQuery.params.effTimestr" type="date" placeholder="起始时间" :editable="false" style="margin-right:10px;margin-bottom:10px;">
            </el-date-picker>至
            <el-date-picker v-model="listQuery.params.expTimestr" type="date" placeholder="结束时间" :editable="false" style="margin-left:10px;margin-bottom:10px;">
            </el-date-picker>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="getList" style="margin-right:10px;margin-bottom:10px;">搜索</el-button>
            <el-button class="filter-item" @click="reset" icon="setting" style="margin-right:10px;margin-bottom:10px;">重置</el-button>
        </div>
        <div>
            <div class="filter-container">
                <el-button type="primary" icon="plus" size="small" @click="add()">新增</el-button>
            </div>
        </div>
        <div class="filter-container" style="padding-top:10px;">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row stripe style="width: 100%" :default-sort="{prop: listQuery.params.order,order:listQuery.params.dir === 'desc' ? 'descending' : 'ascending'}"
                @sort-change="sort">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="100">
                    <template scope="scope">
                        <el-button @click="edit(scope.row.specialId,scope.row.specialType)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button v-show="scope.row.onOffLine!=''" @click="onOffLine(scope.row.specialId,(scope.row.onOffLine=='下线'?-10:10))" type="text"
                            size="small">
                            {{scope.row.onOffLine}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="specialId" label="专题ID" width="140" sortable="custom">
                    <template scope="scope">
                        <span style="cursor:pointer;color:#3498da;" @click="edit(scope.row.specialId)">
                            {{scope.row.specialId}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="specialName" label="专题名称"></el-table-column>
                <el-table-column align="center" label="专题类型">
                    <template scope="scope">
                        <span v-for="item in specialTypeArr" v-show="item.value == scope.row.specialType ">
                                {{item.label}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="productCount" label="关联产品数量" width="160"></el-table-column>
                <el-table-column align="center" prop="domainStatus" label="专题状态" width="160"></el-table-column>
                <el-table-column align="center" prop="auditSts" label="审核状态" width="160">
                    <template scope="scope">
                        <span v-for="item in exstsArr" v-show="item.value === scope.row.auditSts ">
                                {{item.label}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="effTimestr" label="开始时间" sortable="custom"></el-table-column>
                <el-table-column align="center" prop="expTimestr" label="结束时间" sortable="custom"></el-table-column>
                <el-table-column align="center" prop="sortCode" label="排序" width="120"></el-table-column>
            </el-table>
        </div>
        <div v-show="total" class="pagination-container" style="padding:10px 0px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page"
                :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as util from '@src/utils/util';
    import * as static_data from '@utils/static_data.js';

    export default {
        data() {
            return {
                listLoading: true,
                specialTypeArr: [{
                    value: '',
                    label: '全部'
                }].concat(static_data.specialTypeArr),
                timestsArr: [{
                    value: '',
                    label: '全部'
                }].concat(static_data.timestsArr),
                exstsArr: [{
                    value: '',
                    label: '全部'
                }].concat(static_data.exstsArr),
                listQuery: {
                    params: {
                        url: '/operate/findSpecialList',
                        page: 1,
                        size: 10,
                        specialId: '',
                        specialName: '',
                        specialType: '',
                        timests: '2',
                        exsts: '',
                        effTimestr: null,
                        expTimestr: null,
                        dir: 'desc',
                        order: 'specialId'
                    }
                },
                total: 0,
                dataList: []
            }
        },
        computed: {},
        created() {
            this.getList();
        },
        methods: {
            sort(column) {
                if(column.prop=='effTimestr'){
                    this.listQuery.params.order='effTime'
                }
                else if(column.prop=='expTimestr'){
                    this.listQuery.params.order='expTime'
                }else{
                    this.listQuery.params.order = column.prop
                }
                
                this.listQuery.params.dir = column.order === 'descending' ? 'desc' : 'asc'; //升降序
                this.listQuery.params.page = 1;
                this.getList();
            },
            //重置
            reset() {
                this.listQuery.params = {
                    url: '/operate/findSpecialList',
                    page: 1,
                    size: 10,
                    specialId: '',
                    specialName: '',
                    specialType: '',
                    timests: '2',
                    exsts: '',
                    effTimestr: null,
                    expTimestr: null
                };
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
                this.listQuery.params.effTimestr = util.changeDate(this.listQuery.params.effTimestr);
                this.listQuery.params.expTimestr = util.changeDate(this.listQuery.params.expTimestr);

                config(this.listQuery.params).then(response => {
                    if (response.respCode === '000000') {
                        this.total = response.data.totalCount;
                        this.dataList = response.data.specialRecords;
                        var date = new Date();
                        for (var i = 0; i < this.dataList.length; i++) {
                            var startArray = this.dataList[i].effTimestr.split("-");
                            var endArray = this.dataList[i].expTimestr.split("-");
                            var startDt = new Date(startArray[0], startArray[1] * 1 - 1, startArray[2]);
                            var endDt = new Date(endArray[0], endArray[1] * 1 - 1, endArray[2]);

                            if (this.dataList[i].domainStatus == -10 && date <= endDt) {
                                this.dataList[i].onOffLine = '上线';
                            } else if (this.dataList[i].domainStatus == 10 && date <= endDt) {
                                this.dataList[i].onOffLine = '下线';
                            } else {
                                this.dataList[i].onOffLine = '';
                            }

                            var str = '';
                            if (date < startDt && this.dataList[i].domainStatus != -10) {
                                str = '未开始';
                            } else if (date > endDt || this.dataList[i].domainStatus == -10) {
                                str = '已结束';
                            } else {
                                str = '进行中';
                            }
                            this.dataList[i].domainStatus = str;
                        }

                        this.listLoading = false;
                    }
                }).catch(err => {
                    this.listLoading = true;
                    this.dataList = null;
                })
            },
            edit(id, type) {
                if (type == 10) {
                    this.$router.push({
                        path: '/operationManage/marketingStrategy/specialSubject/edit',
                        query: {
                            id: id
                        }
                    })
                } else if (type == 20) {
                    this.$router.push({
                        path: '/marketingStrategy/SpecialSubjecthotEdit',
                        query: {
                            id: id
                        }
                    })
                }

            },
            add() {
                this.$router.push({
                    path: '/operationManage/marketingStrategy/specialSubject/add'
                })
            },
            onOffLine(id, sts) {
                if (sts != 10 && sts != -10) {
                    return;
                }
                let obj = {
                    url: 'operate/updateSpecialSts',
                    specialId: id,
                    sts: sts
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        if (sts == 10) {
                            this.$message.success('上线成功');
                        } else if (sts == -10) {
                            this.$message.success('下线成功');
                        }
                        this.getList();
                    } else {
                        this.$message.success(response.respMsg);
                    }
                }).catch(err => {

                })
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