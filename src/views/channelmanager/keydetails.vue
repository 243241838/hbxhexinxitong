<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <div style="padding-bottom:20px;">
                渠道ID:
                <span style="margin-right:10px;">{{data.domainsPo.domainId}}</span> 渠道名称：
                <span style="margin-right:10px;">{{data.domainsPo.domainName}}</span>
                <input type="button" value="新增秘钥" class="ui-btn-grey" @click="go(data.domainsPo.domainId,data.domainsPo.domainName)" style="margin-right:10px;">
                <el-select v-model="query.keySts" style="width:80px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-table :data="data.domainKeysPoList" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%">
                <el-table-column label="序号" width="100" align="center">
                    <template scope="scope">
                        <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="密钥ID " width="180" align="center">
                    <template scope="scope">
                        <span style="color:#3498da;cursor:pointer;" @click="godetails(scope.row.keyId,false)">{{scope.row.keyId}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="有效时间" width="180" align="center">
                    <template scope="scope">
                        <span>{{scope.row.effTime | time}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="失效时间" align="center">
                    <template scope="scope">
                        <span>{{scope.row.expTime | time}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="keyType" label="秘钥类型" align="center">
                    <template scope="scope">
                        <span>{{scope.row.keyType | type}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="keySts" label="状态" align="center">
                    <template scope="scope">
                        <span>{{scope.row.keySts | state}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作 " align="center">
                    <template scope="scope">
                        <span style="color:#3498da;cursor:pointer;" @click="godetails(scope.row.keyId,true)">编辑</span>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="data.totalItems" class="pagination-container" style="padding:10px 0;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                    :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="data.totalItems">
                </el-pagination>
            </div>
            <div class="btn">
                <input type="button" value="返回" class="ui-btn-grey" @click="goBack">
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/secretkey.less';
    import config from '@api/config';
    import {
        parseTime
    } from '@filters/index.js';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                listLoading: false,
                data: {
                    domainKeysPoList: [],
                    domainsPo: {},
                    totalItems: 0
                },
                query: {
                    url: 'channel/findDomainKey',
                    domainId: this.$route.query.domainId,
                    keySts: 10,
                    page: 1,
                    size: 10
                },
                options: [{
                    value: 10,
                    label: '生效'
                }, {
                    value: -10,
                    label: '失效'
                }]
            }
        },
        created() {
            this.getData()
        },
        methods: {
            godetails(keyId,isshow) {
                this.$router.push({
                    path: "/channelmanager/editingdetails",
                    query: {
                        keyId: keyId,
                        isshow:isshow
                    }
                });
            },
            search() {
                let obj = {
                    url: 'channel/domainKeyListView',
                    domainId: this.$route.query.domainId,
                    keySts: this.query.keySts
                }
                this.listLoading = true;
                config(obj).then(response => {
                    this.listLoading = false;
                    if (response.respCode === '000000') {
                        this.data.domainKeysPoList = response.data.domainKeysPoList;
                        this.data.totalItems = response.data.totalItems;
                    }
                })
            },
            getData() {
                this.listLoading = true;
                config(this.query).then(response => {
                    this.listLoading = false;
                    if (response.respCode === '000000') {
                        this.data = response.data;
                        this.data.totalItems = response.data.totalItems;
                    }

                })
            },
            go(domainId, domainName) {
                this.$router.push({
                    path: "/channelmanager/secretkey",
                    query: {
                        domainId: domainId,
                        domainName: domainName
                    }
                });
            },
            goBack() {
                this.$router.push({
                    path: "/channelmanager/channelinformanager",
                });
            },
            format(val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date);
                return result
            },
            handleSizeChange(val) {
                this.query.size = val;
                this.getData();
            },
            // 切换页码
            handleCurrentPageChange(val) {
                this.query.page = val;
                this.getData();
            }
        },
        filters: {
            type: function (val) {
                if (val == 1) {
                    return 'MD5'
                } else if (val == 10) {
                    return 'RSA'
                } else if (val == 20) {
                    return '3DES'
                }
            },
            state: function (val) {
                if (val == 10) {
                    return '生效'
                } else if (val == -10) {
                    return '失效'
                }
            },
            time: function (val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date);
                return result
            }
        },
        watch: {
            'query.keySts': function (val, oldval) {
                this.search();
            }
        }
    }
</script>
<style lang="less" scoped>
    .app-container {
        margin-top: 17px;
    }

    .app-container .filter-container {
        padding: 6px 1.4% 18px 1.4%;
    }

    .app-container .filter-container>div.container {
        border: 1px solid #e4e9eb;
        border-radius: 5px;
    }

    .app-container .filter-container .ui-info-tit {
        margin-left: 18px;
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }

    .btn {
        padding: 20px;
        text-align: center;
    }

    .ui-btn-blue {
        display: inline-block;
        width: 87px;
        height: 30px;
        line-height: 30px;
        border: 0;
        font-weight: bold;
        color: #fff;
        background-color: #75b9e6;
        border-radius: 5px;
        text-align: center;
        outline: none;
        cursor: pointer;
    }

    .ui-btn-grey {
        display: inline-block;
        width: 87px;
        height: 30px;
        line-height: 30px;
        border: 0;
        font-weight: bold;
        background: #f0f0f0;
        color: #768399;
        border-radius: 5px;
        text-align: center;
        outline: none;
        cursor: pointer;
    }
</style>