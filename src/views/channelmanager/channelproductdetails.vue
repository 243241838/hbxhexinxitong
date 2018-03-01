<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                渠道ID：
                <el-input v-model="query.domainId" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="渠道ID"></el-input>
                渠道名称：
                <el-input v-model="query.domainName" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="渠道名称"></el-input>
                渠道类型：
                <el-select v-model="query.domainType" placeholder="全部">
                    <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                渠道状态：
                <el-select v-model="query.domainSts" placeholder="全部">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                渠道合作时间:
                <el-date-picker v-model="createTime" type="date" placeholder="开始日期" style="width:200px;margin-bottom:10px;margin-right:2px;">
                </el-date-picker>至
                <el-date-picker v-model="lastLoginTime" type="date" placeholder="结束日期" style="width:200px;margin-bottom:10px;margin-left:2px;">
                </el-date-picker>
                <el-button type="primary" v-waves icon="search" @click="search">查询</el-button>
                <el-button v-waves @click="reset" icon="setting">重置</el-button>
            </div>
            <div>
                <el-table :data="data.domainInfoList" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%">
                    <el-table-column type="selection" width="100" align="center"></el-table-column>
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="240">
                        <template scope="scope">
                            <span style="color:#3498da;cursor:pointer;">[查看秘钥]</span>
                            <span style="color:#3498da;cursor:pointer;" @click="goDetail(scope.row.domainId)">[上架产品]</span>
                            <span style="color:#3498da;cursor:pointer;" @click="goproductioneditorDetail(scope.row.domainId)">[编辑]</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="domainId" label="渠道ID" align="center" width="120"> </el-table-column>
                    <el-table-column label="渠道名称" width="140" align="center" prop="domainName"></el-table-column>
                    <el-table-column label="渠道类型" width="140" align="center" prop="domainType"> </el-table-column>
                    <el-table-column prop="productCount" label="合作产品数" width="140" align="center"></el-table-column>
                    <el-table-column prop="domainContacts" label="联系人" width="120" align="center"></el-table-column>
                    <el-table-column prop="domainTel" label="联系电话" width="180" align="center"></el-table-column>
                    <el-table-column label="合作开始时间" width="160" align="center">
                        <template scope="scope">
                            <span>{{scope.row.effTime |  time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="合作结束时间" width="160" align="center">
                        <template scope="scope">
                            <span>{{scope.row.expTime | time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="domainSts" label="状态" width="160" align="center"></el-table-column>
                </el-table>
                <div v-if="data.totalItems" class="pagination-container" style="padding:10px 0;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                        :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper"
                        :total="data.totalItems">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                listLoading: false,
                createTime: '',
                lastLoginTime: '',
                option: [{
                    value: null,
                    label: '全部'
                }, {
                    value: 1,
                    label: '自有渠道'
                }, {
                    value: 2,
                    label: '其他'
                }],
                options: [{
                    value: null,
                    label: '全部'
                }, {
                    value: 1,
                    label: '正常'
                }, {
                    value: 2,
                    label: '无效'
                }],
                query: {
                    url: 'channel/list',
                    page: 1,
                    size: 10,
                    domainId: '',
                    domainName: '',
                    domainType: '',
                    domainSts: null,
                    beginDate: null,
                    endDate: null
                },
                data: {
                    domainInfoList: [],
                    totalItems: 0
                },
            }
        },
        computed: {},
        created() {
            this.search(1);
        },
        mounted() {},
        methods: {
            goproductioneditorDetail(domainId) {
                this.$router.push({
                    path: "/channelmanager/productioneditor",
                    query: {
                        domainId: domainId,
                    }
                });
            },
            goDetail(domainId) {
                this.$router.push({
                    path: "/channelmanager/productsDetails",
                    query: {
                        domainId: domainId
                    }
                });
            },
            format(time) {
                let Stime = new Date(time);
                let year = Stime.getFullYear();
                let month = Stime.getMonth() + 1;
                let date = Stime.getDate();
                let result = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (date >= 10 ? date : '0' + date);
                return result
            },
            changeQuery(cur) {
                if (cur && typeof cur === 'number') {
                    this.query.page = cur;
                }
                if (this.createTime !== '') {
                    this.query.beginDate = this.format(this.createTime);
                } else {
                    this.query.beginDate = ''
                }
                if (this.lastLoginTime !== '') {
                    this.query.endDate = this.format(this.lastLoginTime);
                } else {
                    this.query.endDate = ''
                }
            },
            //获取列表
            search(cur) {
                this.changeQuery(cur);
                this.listLoading = true;
                config(this.query).then(response => {
                    this.listLoading = false;
                    if (response.respCode === '000000') {
                        this.data = response.data;
                    }
                })
            },
            // 重置搜索框
            reset() {
                this.query.claimId = "";
                this.query.domainId = '';
                this.query.domainName = '';
                this.query.domainType = "";
                this.query.domainSts = null;
                this.query.beginDate = null;
                this.query.endDate = null;
            },
            // 改变每一页的条数
            handleSizeChange(val) {
                this.query.size = val;
                this.search();
            },
            // 切换页码
            handleCurrentPageChange(val) {
                this.search(val);
            },

        },
        filters: {
            classification: function (val) {
                if (val == 10) {
                    return '理赔中'
                } else if (val == -20) {
                    return '理赔失败'
                } else if (val == 30) {
                    return '已理赔待打款'
                } else if (val == 40) {
                    return '已理赔已打款'
                }
            },
            time: function (val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let hour = datatime.getHours();
                let minute = datatime.getMinutes();
                let second = datatime.getSeconds();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date);
                return result
            }
        }
    }
</script>
<style lang="less" scoped>
    .dash-add-btn {
        display: inline-block;
        margin: 10px 0;
        padding: 5px 30px 5px 44px;
        color: #768399;
        font-weight: bold;
        font-size: 14px;
        border: 1px dashed #d9dcdd;
        border-radius: 3px;
    }
</style>