<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>佣金策略ID:</span>
            <el-input v-model="listQuery.params.configId" placeholder="佣金策略ID" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>佣金策略名称:</span>
            <el-input v-model="listQuery.params.configName" placeholder="佣金策略名称" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>促销状态:</span>
            <el-select v-model="listQuery.params.timeSts" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in timeStsArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span> 策略时间:</span>
            <el-date-picker v-model="listQuery.params.effTimestr" type="date" placeholder="起始时间" :editable="false" style="margin-right:10px;margin-bottom:10px;">
            </el-date-picker>至
            <el-date-picker v-model="listQuery.params.expTimestr" type="date" placeholder="结束时间" :editable="false" style="margin-right:10px;margin-bottom:10px;margin-left:10px;">
            </el-date-picker>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="getList">搜索</el-button>
            <el-button class="filter-item" @click="reset" v-waves icon="setting">重置</el-button>
        </div>

        <div>
            <el-button type="primary" icon="plus" size="small" @click="add()">新增</el-button>
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row stripe style="width: 100%" @current-change="handleCurrentChange" :default-sort="{prop: listQuery.params.order,order:listQuery.params.dir === 'desc' ? 'descending' : 'ascending'}"   @sort-change="sort">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="priceId" label="操作">
                    <template scope="scope">
                        <el-button @click="edit(scope.row.configId,scope.row)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button v-show="scope.row.onOffLine!=''" @click="onOffLine(scope.row.configId,(scope.row.onOffLine=='下线'?-10:10))" type="text"
                            size="small">
                            {{scope.row.onOffLine}}
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="configId" label="佣金策略ID" sortable="custom">
                </el-table-column>

                <el-table-column align="center" prop="configName" label="佣金策略名称">
                </el-table-column>

                <el-table-column align="center" prop="configDomainNames" label="上架渠道">
                    <!--<span v-for="item in domainIdArr"   >-->
                    <!--<span v-for="(dim, index) in scope.row.configDomains" v-show="item.value==dim&&dim!=''">-->
                    <!--{{item.label+','}}-->
                    <!--</span>-->
                    <!--</span>-->
                </el-table-column>

                <el-table-column align="center" prop="productCount" label="关联产品数量">
                </el-table-column>

                <el-table-column align="center" prop="effDateStr" label="开始时间">
                </el-table-column>

                <el-table-column align="center" prop="expDateStr" label="结束时间">
                </el-table-column>

                <el-table-column align="center" prop="sts" label="促销状态">

                </el-table-column>
            </el-table>
        </div>
        <div v-show="total" class="pagination-container" style="padding-top:10px;">
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
                timeStsArr: [{
                    value: '',
                    label: '全部'
                }].concat(static_data.timestsArr),
                domainIdArr: [],
                listQuery: {
                    params: {
                        url: '/operate/findCommisionConfigList',
                        page: 1,
                        size: 10,
                        configId: '',
                        configName: '',
                        dir: 'desc',
                        effTimestr: null,
                        expTimestr: null,
                        order: 'configId',
                        timeSts: '2'
                    }
                },
                total: 0,
                dataList: []
            }
        },
        computed: {},
        created() {
            this.acqDomainIds();
            this.getList();
        },
        methods: {
              sort(column) {
                this.listQuery.params.order = column.prop; //排序字段；
                this.listQuery.params.dir = column.order === 'descending' ? 'desc' : 'asc'; //升降序
                this.listQuery.params.page = 1;
                this.getList();
            },
            acqDomainIds() {
                let obj = {
                    url: '/channel/menuList'
                }
                config(obj).then(response => {
                    if (response.respCode == '000000') {
                        for (var i = 0; i < response.data.domainsPoList.length; i++) {
                            this.domainIdArr.push({
                                value: response.data.domainsPoList[i].domainId.toString(),
                                label: response.data.domainsPoList[i].domainName
                            });
                        }
                    } else {
                        this.$message.error(response.respMsg)
                    }

                }).catch(err => {

                })
            },
            //重置
            reset() {
                this.listQuery.params = {
                    url: '/operate/findCommisionConfigList',
                    page: 1,
                    size: 10,
                    configId: '',
                    configName: '',
                    dir: 'desc',
                    effTimestr: null,
                    expTimestr: null,
                    order: 'configId',
                    timeSts: '2'
                };
            },
            add() {
                this.$router.push({
                    path: '/operationManage/marketingStrategy/commissionStrategy/add'
                })
            },
            //表格默认时间
            handleCurrentChange(val) {
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
                this.listQuery.params.effTimestr = util.changeDate(this.listQuery.params.effTimestr);
                this.listQuery.params.expTimestr = util.changeDate(this.listQuery.params.expTimestr);
                config(this.listQuery.params).then(response => {
                    if (response.respCode === '000000') {
                        this.total = response.data.totalCount;
                        this.listLoading = false;
                        this.dataList = response.data.configRecordList;

                        var date = new Date();
                        for (var i = 0; i < this.dataList.length; i++) {
                            var startArray = this.dataList[i].effDateStr.split("-");
                            var endArray = this.dataList[i].expDateStr.split("-");
                            var startDt = new Date(startArray[0], startArray[1] * 1 - 1, startArray[2].substring(
                                0, 2));
                            var endDt = new Date(endArray[0], endArray[1] * 1 - 1, endArray[2].substring(0, 2));

                            if (this.dataList[i].sts == -10 && date <= endDt) {
                                this.dataList[i].onOffLine = '上线';
                            } else if (this.dataList[i].sts == 10 && date <= endDt) {
                                this.dataList[i].onOffLine = '下线';
                            } else {
                                this.dataList[i].onOffLine = '';
                            }

                            if (date < startDt && this.dataList[i].sts != -10) {
                                this.dataList[i].sts = '未开始';
                            } else if (date > endDt || this.dataList[i].sts == -10) {
                                this.dataList[i].sts = '已结束';
                            } else {
                                this.dataList[i].sts = '进行中';
                            }

                            this.dataList[i].configDomainNames = '';
                            this.dataList[i].configDomains = this.dataList[i].configDomains.split(',');
                            if (this.dataList[i].configDomains && this.dataList[i].configDomains.length > 0) {
                                for (var ii = 0, iLen = this.dataList[i].configDomains.length; ii < iLen; ii++) {
                                    for (var j = 0, jLen = this.domainIdArr.length; this.dataList[i].configDomains[
                                            ii] && j < jLen; j++) {
                                        if (this.dataList[i].configDomains[ii] == this.domainIdArr[j].value) {
                                            this.dataList[i].configDomainNames += (this.domainIdArr[j].label +
                                                ",")
                                        }
                                    }
                                }
                                this.dataList[i].configDomainNames = this.dataList[i]
                                    .configDomainNames.substring(0, this.dataList[i].configDomainNames.length -
                                        1)
                            }
                        }
                    }
                }).catch(err => {
                    this.listLoading = true;
                    this.dataList = null;
                })
            },
            edit(id, data) {
                let date = new Date().getTime();
                let end = new Date(data.expDateStr.replace(/-/g, '/')).getTime()
                if (data.sts == -10 || date > end) {
                    this.$message({
                        type: 'warning',
                        message: '该佣金策略已过期，不能编辑.'
                    });
                } else {
                    this.$router.push({
                        path: '/operationManage/marketingStrategy/commissionStrategy/edit',
                        query: {
                            id: id
                        }
                    })
                }
            },
            onOffLine(id, sts) {
                if (sts != 10 && sts != -10) {
                    return;
                }
                let obj = {
                    url: '/operate/updateCommisionConfigSts',
                    configId: id,
                    sts: sts
                }
                config(obj).then(response => {
                    if (sts == 10) {
                        this.$message.success('上线成功');
                    } else if (sts == -10) {
                        this.$message.success('下线成功');
                    }
                    this.getList();
                }).catch(err => {

                })
            }
        },
        filters: {}
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