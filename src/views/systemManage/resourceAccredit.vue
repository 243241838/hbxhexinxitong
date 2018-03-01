<template>
    <div class="ggg_user">
        <h2>操作员信息</h2>
        <div class="text">
            <el-form label-position="center" label-width="100px" class="noborder">
                <el-form-item label="角色ID">
                    <span class="el-input" v-text="role.roleId"></span>
                </el-form-item>
                <el-form-item label="角色名称">
                     <span class="el-input" v-text="role.roleName"></span>
                </el-form-item>
            </el-form>

            <el-tree :data="TreeData" show-checkbox node-key="id" :default-expanded-keys="defaultExpanded" :default-checked-keys="defaultChecked"
                ref="tree" >
            </el-tree>

            <el-form label-position="center" label-width="100px" style="padding-left:200px; padding-top:20px;">
                <el-form-item>
                    <el-button v-waves  type="primary"@click="submitData()">确定</el-button>
                    <el-button v-waves @click="$router.go(-1)">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
export default {
    data() {
        return {
            role: {},
            TreeData: [],
            defaultExpanded:[],
            defaultChecked:[]
        }
    },
    created() {
        this.getAllMenus(); //获取数据
    },
    methods: {
        setIsChecked(layer){
            if(layer.childList!=null&&layer.childList instanceof Array){ //如果存在子页面
                layer.children=[];
                for(var i=0;i<layer.childList.length;i++){
                    layer.childList[i].id =layer.childList[i].resourceId;
                    layer.childList[i].label =layer.childList[i].name;
                    layer.children.push(layer.childList[i]);

                    if(((layer.childList[i].selected)&&(layer.childList[i].selected==1))){
                        this.defaultChecked.push(layer.childList[i].resourceId); //默认选中
                    }
                    // this.defaultExpanded.push(layer.childList[i].resourceId);

                    this.setIsChecked(layer.childList[i]);
                }
            }
        },
        //获取数据
        getAllMenus () {
            let obj = {
                url: 'role/getRoleAuthResource',
                roleId: this.$route.query.roleId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.role = response.data.role;
                    var initData = response.data.list;
                    for(var i=0;i<initData.length;i++){
                        var firstLayer = initData[i];
                        firstLayer.id = firstLayer.resourceId;
                        firstLayer.label = firstLayer.name;

                        if(((firstLayer.selected)&&(firstLayer.selected==1))){
                            this.defaultChecked.push(firstLayer.resourceId); //默认选中
                        }
                        // this.defaultExpanded.push(firstLayer.resourceId);

                        this.setIsChecked(firstLayer);
                    }
                    this.TreeData = initData;
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //提交配置信息
        submitData () {
             let obj = {
                url: 'role/grantRoleAuthResource',
                roleId: this.role.roleId,
                resourceIds: this.$refs.tree.getCheckedKeys()
             }
             if (this.$refs.tree.getCheckedKeys().length == 0 ) {
                  this.message('warning', '请勾选授权资源');
                  return false;
             }
             config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.message('success', response.respMsg);
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //请求提示
        message (sts, text) {
            this.$message({
                message: text,
                type: sts
            });
        }
    },
    watch:{
        tableData: {
            handler(newValue, oldValue){
//                if(oldValue&&oldValue.length==0){
//                    return ;
//                }
//                for(var i=0,len=newValue.length;i<len;i++){
//                    for(var j=0,jlen=oldValue.length;j<jlen;j++){
//                        if(newValue[i].resourceId==oldValue[j].resourceId){
//                            console.log(newValue[i].isChecked+'==='+oldValue[j].isChecked);
//                            if(newValue[i].isChecked!=oldValue[j].isChecked){
//                                alert(newValue[i].resourceId+'--'+newValue[i].isChecked);
//                            }
//                        }
//                    }
//                }
            },
            deep:true
        }
    }
}
</script>
<style lang="less" scoped>
    h2{
        margin-left: 18px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }
    .text{
        padding-left:100px;
    }
    table{
        padding: 0px;
        border: none;
    }
    tr{
        border:1px solid black;
        vertical-align:top;
        padding:0px;
    }
    td{
        padding:0px;
    }
</style>