<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-tabs v-model="activeName2" type="card" >
                    <el-tab-pane :disabled="!showOne" label="红包活动" name="first" v-show='showOne'>
                        <redPacketEdit ref="redPacket"></redPacketEdit>
                    </el-tab-pane>
                    <el-tab-pane :disabled="showOne" label="赠险活动" name="second" v-show='!showOne'>
                        <giftInsuranceEdit ref="gif"></giftInsuranceEdit>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import giftInsuranceEdit from "./giftInsuranceEdit";
    import redPacketEdit from "./redPacketEdit";
    import config from '@api/config';

    export default {
        components: {
            giftInsuranceEdit,redPacketEdit
        },
        data() {
            return {
                activeName2: 'first',
                showOne:true,
                disabledTab:true
            };
        },
        created() {
        },
        methods: {
            getDetail () {
                this.$nextTick(function(){
                    let obj = {
                        url: '/coupons/getPromotionInfo',
                        promotionId: this.$route.query.id*1,
                    };
                    config(obj).then(response => {
                        if (response.respCode === '000000') {
                            if(response.data.isGift==1){
                                this.activeName2 = 'second';
                                this.showOne = false;
                                this.$refs.gif.setInitData(response.data,this.$route.query.id);
                            }else{
                                this.activeName2 = 'first';
                                this.showOne = true;
                                this.$refs.redPacket.setInitData(response.data,this.$route.query.id);
                            }
                        }
                    }).catch(err => {

                    })
                })
            }
        },
        mounted() {
            this.getDetail();
        }
    };
</script>
<style lang="less" scoped>
    .app-container {
        position: relative;
        margin: 10px 10px 0 10px;
    }

    .app-container .filter-container {
        margin-top: 20px;
    }

</style>