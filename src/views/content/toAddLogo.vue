<template>
    <div class="www-page">
     <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="关于我们"> </el-form-item>
            <el-form-item label="E保logo：">
                <img src="" style="width:245px;height:245px;">
                <el-button v-waves style="position:relative;top:-111px;" type="primary">上传</el-button>
            </el-form-item>
            <el-form-item label="客服电话：">
             <el-input v-model="form.servicePhone" style="width:400px;" placeholder="请输入客服电话"></el-input>
            </el-form-item>
            <el-form-item label="E保简介：">
                <el-input type="textarea" :rows="8" v-model="form.systemDesc" style="position:relative;width:500px;"></el-input>
            </el-form-item>
            <el-form-item label="公司名称：">
                <el-input v-model="form.corpName" style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="网站许可证：">
                <el-input v-model="form.licenseNo" style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="经营许可证：">
                <el-input v-model="form.icpNo" style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="成立时间：">
                <el-date-picker v-model="form.regTime1" type="date" placeholder="请选择日期" style="width:400px;">
                </el-date-picker>
            </el-form-item>
            <el-form-item style="text-align:center">
                <el-button v-waves style="width:87px;background-color:#75b9e6;color: #fff;border: 0;">保存</el-button>
                <el-button v-waves style="width:87px;background-color:#f0f0f0;color: #768399;border: 0;">返回</el-button>
            </el-form-item>
        </el-form>
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
                Loading: true,
                information: {
                    dictValue: "",
                },
                data: {
                    homeMarqueeLogPoList: null,
                    homeMarqueeLogTotalItems: ""
                },
                query: {
                    url: 'homeMarquee/list',
                    page: 1,
                    size: 10,
                    marqueeContent: ''
                },
                form: {
                    systemLogo: '',
                    servicePhone: '',
                    systemDesc: '',
                    corpName: '',
                    licenseNo: '',
                    icpNo: '',
                    regTime1: ''
                }
            }
        },
        created() {
            // this.getData();
        },
        methods: {
            changeQuery(cur) {
                if (cur && typeof cur === 'number') {
                    this.query.page = cur;
                }
                this.listLoading = true
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.data = response.data;
                    }
                    this.listLoading = false
                })
            },
            search() {
                let value = trim(this.query.marqueeContent);
                if (value == '') {
                    this.$message({
                        message: '内容不能为空',
                        type: 'warning'
                    })
                    return false
                }
                if (value.length > 120) {
                    this.$message({
                        message: '最多输入128个文字；不支持图片',
                        type: 'warning'
                    })
                    return false
                }
                this.listLoading = true
                let obj = {
                    url: 'homeMarquee/addHomeMarqueelog',
                    marqueeContent: value,
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg);
                        this.query.marqueeContent = "";
                        this.query.page = 1;
                        this.query.size = 10;
                        this.getData()
                    } else {
                        this.$message.error(response.respMsg)
                    }
                    this.listLoading = false
                })

            },
            onSubmit() {
                let value = trim(this.information.dictValue);
                if (value == '') {
                    this.$message({
                        message: '内容不能为空',
                        type: 'warning'
                    })
                    return false
                }
                if (value.length > 120) {
                    this.$message({
                        message: '最多输入128个文字；不支持图片',
                        type: 'warning'
                    })
                    return false
                }
                let obj = {
                    url: 'systemDict/updateSystemDict',
                    sts: '1',
                    id: '49',
                    dictValue: value
                };
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                    } else {
                        this.$message.error(response.respMsg)
                    }

                })
            },
            getData() {
                config({
                    url: 'systemDict/querySystemDictByDictName'
                }).then(response => {
                    this.Loading = false
                    if (response.respCode === '000000') {
                        this.information.dictValue = response.data.systemDictPo.dictValue
                    }
                    this.listLoading = true;
                    let obj = {}
                    config({
                        url: 'homeMarquee/list',
                        page: 1,
                        size: 10
                    }).then(response => {
                        if (response.respCode === '000000') {
                            this.data = response.data;
                        }
                        this.listLoading = false
                    })
                })
            },
            handleCurrentPageChange(val) {
                this.changeQuery(val);

            },
            handleSizeChange(val) {
                this.query.size = val;
                this.changeQuery()

            }
        }


    }
</script>
<style lang="less" scoped>

</style>