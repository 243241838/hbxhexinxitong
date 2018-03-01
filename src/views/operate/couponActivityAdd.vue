<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-tabs v-model="activeName2" type="card">
                    <el-tab-pane label="红包活动" name="first">
                        <redPacketAdd></redPacketAdd>
                    </el-tab-pane>
                    <el-tab-pane label="赠险活动" name="second">
                        <giftInsuranceAdd></giftInsuranceAdd>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import giftInsuranceAdd from "./giftInsuranceAdd.vue";
    import redPacketAdd from "./redPacketAdd.vue";

    export default {
        components: {
            giftInsuranceAdd,
            redPacketAdd
        },
        data() {
            return {
                activeName2: 'first'
            };
        },
        created() {
        },
        methods: {
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