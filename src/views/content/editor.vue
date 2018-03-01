<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <div class="container" style="padding-top:10px;">
                <el-form label-width="120px" :model="query">
                    <el-form-item label="标题：">
                        <el-input style="width:260px;" v-model="query.articleTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="分类:">
                        <el-select v-model="query.messageType">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容：">
                        <weditor v-bind:loanid="'subjectEditorName'" v-bind:editorName="'subjectEditorName'" v-on:listenWEditorChange="wEditorChange"
                            v-model="query.articleContent" style="width:60%;" ref="post_body"></weditor>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn">
                <input type="button" value="保存" class="ui-btn-blue" @click="goNext">
                <input type="button" value="取消" class="ui-btn-grey" @click="go">
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/secretkey.less';
    import config from '@api/config';
    import weditor from '@components/WEditor.vue';
    import {
        parseTime
    } from '@filters/index.js';
    import {
        trim
    } from '@src/utils/util';
    export default {
        components: {
            weditor
        },
        data() {
            return {
                query: {
                    url: 'content/addArticles',
                    articleTitle: '',
                    messageType: '',
                    articleContent: '',
                    articleId: this.$route.query.articleId
                },
                options: [{
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
                params: {
                    url: 'content/toAddArticles',
                    articleId: this.$route.query.articleId
                }
            }
        },
        created() {
            this.search()
        },
        methods: {
            search() {
                config(this.params).then(response => {
                    if (response.respCode === '000000') {
                        this.query.articleContent = response.data.articlesPo.articleContent;
                        this.query.articleTitle = response.data.articlesPo.articleTitle;
                        this.query.messageType = response.data.articlesPo.messageType;
                    } else {
                        this.$message.error(response.respMsg)
                    }
                })
            },
            wEditorChange(html) {
                this.query.articleContent = html;
            },
            go() {
                this.$router.go(-1);
            },
            goNext() {
                if (this.query.articleTitle == "") {
                    this.$message({
                        type: 'warning',
                        message: '标题为空,请补充完整!'
                    });
                    return false
                }
                if (this.query.articleContent == "") {
                    this.$message({
                        type: 'warning',
                        message: '内容为空,请补充完整!'
                    });
                    return false
                }
                let testValue = this.$refs.post_body.value.replace("<p>", "").replace("</p>", "");
                let result = testValue.replace(/&nbsp;/gi, '').replace(/<br>/gi, '').trim()
                if (result.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '内容为空,请补充完整!'
                    });
                    return false
                }
                let ary = testValue.trim()
                if (ary.length > 1000) {
                    this.$message({
                        type: 'warning',
                        message: '内容不能超过1000个字符!'
                    });
                    return false
                }
                 this.save();
            },
            save() {
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                        setTimeout(() => {
                            this.$router.push({
                                path: "/content/toServiceGuide",
                            })
                        }, 2000)
                    } else {
                        this.$message.error(response.respMsg)
                    }
                })
            },
            format(val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let hour = datatime.getHours();
                let minute = datatime.getMinutes();
                let second = datatime.getSeconds();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute :
                    '0' + minute) + ':' + (second >= 10 ? second : '0' + second)
                return result
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