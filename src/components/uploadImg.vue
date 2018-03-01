<template>
    <el-upload class="upload-demo" :style="{ width: bodyWidth? bodyWidth + 'px' : '' }" :action="BaseUrl" :on-preview="handlePreview"
        :on-remove="handleRemove" :file-list="fileList" list-type="picture" multiple :limit="1" :on-exceed="handleExceed" :on-success="handleSuccess"
        :onError="uploadError" name="file" :before-upload="beforeAvatarUpload">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">{{tip}}</div>
    </el-upload>
</template>
<script>
    import {
        baseURL
    } from '@api/base.js';
    export default {
        data() {
            return {
                fileList: [],
                BaseUrl: ""
            }
        },
        props: {
            fileList2: Array,
            type: {
                type: Boolean,
                default: false
            },
            paramName: { // 父组件传过来的, 后期返回给父组件
                type: String
            },
            tip: { // 父组件传过来的, 后期返回给父组件
                type: String,
                default: '只能上传jpg/png文件，且不超过500kb'
            },
            bodyWidth: {
                type: Number,
                default: 400
            },
            singleOver: { // 是否默认传单张，再次上传覆盖第一个人图片
                type: Boolean,
                default: true
            }
        },
        created() {
            this.BaseUrl = baseURL() + 'upload/imgUpload?filePath=product';
        },
        watch: {
            fileList2: function (newValue, oldValue) {
              this.fileList = []
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeAvatarUpload(file) {
                if (!this.type) {
                    var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
                    var isImg = false;
                    console.log(testmsg);
                    if (testmsg == 'jpg' || testmsg == 'png' || testmsg == 'jpeg' ||
                        testmsg == 'gif' || testmsg == 'bmp') {
                        isImg = true;
                    }

                    if (!isImg) {
                        this.$message.error('上传头像图片只能是 jpg,png,jpeg,gif,bmp 格式!');
                    }

                    return isImg;
                } else {
                    var testvideo = file.name.substring(file.name.lastIndexOf('.') + 1)
                    var isvideo = false;
                    if (testvideo == 'mp4' || testvideo == 'ogg' || testvideo == 'webm') {
                        isvideo = true;

                    }
                    if (!isvideo) {
                        this.$message.error('上传视频只能是 mp4,ogg,webm 格式!');
                    }
                    return isvideo
                }

            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleSuccess(response, file, fileList) {
                if (this.singleOver) {
                    this.fileList = [{
                        url: response.entity,
                        name: ''
                    }];
                }
                console.log('上传文件', response.entity)
                this.$emit("acqImgUrl", [response.entity, this.paramName]);
            },
            setInitImg(initImg) {
                this.fileList = this.fileList.concat(initImg); //初始化页面
            },
            // 上传错误
            uploadError(response, file, fileList) {
                console.log('上传失败，请重试！')
            }
        }
    }
</script>

<style lang="less" scoped>
    .upload-demo {
        width: 400px;
    }
</style>