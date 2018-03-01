<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                标题：
                <el-input v-model="query.articleTitle" :maxlength=30 style="width:200px;margin-bottom:10px;" placeholder="标题"></el-input>
                分类：
                <el-select v-model="query.messageType" placeholder="全部">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button v-waves @click="reset" icon="setting">重置</el-button>
                <el-button type="primary" v-waves icon="search" @click="search">查询</el-button>
                <div>
                    <el-button class="dash-add-btn" icon="plus" @click="add">新增问题</el-button>
                    <el-button class="dash-add-btn" icon="plus" @click=" keystores">删除问题</el-button>
                </div>
            </div>
            <div>
                <el-table :data="data.articlesPoList" v-loading="listLoading" fit border highlight-current-row style="width: 100%" @selection-change="handleSelectionChange"
                    :default-sort="{prop:query.order,order:query.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort">
                    <el-table-column type="selection" width="100" align="center"></el-table-column>
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作项" align="center">
                        <template scope="scope">
                            <span style="color:#3498da;cursor:pointer;" @click="go(scope.row.articleId)">[编辑]</span>
                            <span style="color:#3498da;cursor:pointer;" @click="remove(scope.row, scope.$index)">[删除]</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="articleTitle" label="标题" align="center"></el-table-column>
                    <el-table-column label="分类" width="200" align="center">
                        <template scope="scope">
                            <span>{{scope.row.messageType | classification}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="添加时间" width="200" align="center" sortable="custom" prop="createTime">
                        <template scope="scope">
                            <span>{{scope.row.createTime |  time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createUser" label="添加人" width="200" align="center"></el-table-column>
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
        downloadExecl
    } from '@api/excel.js';
    import upload from '@components/upload';
    import {
        baseURL
    } from '@api/base.js';

    import {
        trim
    } from '@src/utils/util';

    export default {
        components: {
            upload
        },
        data() {
            return {
                listLoading: false,
                options: [{
                    value: '',
                    label: '全部'
                }, {
                    value: 10,
                    label: '常见问题'
                }, {
                    value: 20,
                    label: '理赔指南'
                }, {
                    value: 30,
                    label: '退保指南'
                }, {
                    value: 40,
                    label: '其他'
                }],
                multipleSelection: [],
                query: {
                    url: 'content/findArticles',
                    page: 1,
                    size: 10,
                    messageType: '',
                    articleTitle: '',
                    dir: 'desc',
                    order: 'createTime',
                },
                current: 1, // 默认显示第一页
                data: {
                    articlesPoList: [],
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
            add() {
                this.$router.push({
                    path: "/content/insured",
                });
            },
            sort(column) {
                this.query.order = column.prop; //排序字段；
                this.query.dir = column.order === 'descending' ? 'desc' : 'asc'; //升降序
                this.search(1);
            },
            keystores() {
                if (this.multipleSelection.length == 0) {
                    this.$alert('请选择需要删除的数据!', '提示', {
                        confirmButtonText: '确定',
                    });
                } else {
                    this.$confirm('确认删除吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        let result = "";
                        for (let i = 0; i < this.multipleSelection.length; i++) {
                            result += this.multipleSelection[i].articleId + ";";
                        }
                        result = result.substring(0, result.length - 1);
                        let obj = {
                            url: 'content/deleteArticles',
                            articleIds: result
                        }
                        config(obj).then(response => {
                            if (response.respCode === '000000') {
                                this.search()
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });

                }

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            go(articleId) {
                this.$router.push({
                    path: "/content/editor",
                    query: {
                        articleId: articleId
                    }
                });
            },
            //获取列表
            search(cur) {
                if (cur && typeof cur === 'number') {
                    this.query.page = cur;
                }
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
                this.query.messageType = '';
                this.query.articleTitle = '';
            },
            // 删除单条数据
            remove(user, index) {
                this.$confirm('确认删除吗？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    config({
                        url: 'content/deleteArticles',
                        articleIds: user.articleId
                    }).then(response => {
                        if (response.respCode === '000000') {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.search();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
                    return '常见问题'
                } else if (val == 20) {
                    return '理赔指南'
                } else if (val == 30) {
                    return '退保指南'
                } else if (val == 40) {
                    return '其他'
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
                        date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' +
                    (minute >= 10 ? minute : '0' + minute) + ":" + (second >= 10 ? second : '0' + second);
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