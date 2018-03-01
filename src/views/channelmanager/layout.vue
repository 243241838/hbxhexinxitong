<template>
    <div class="Bigbox">
        <div class='leftNav'>
            <ul class='listBox'>
                <li :key="index" v-for="(item,index) in listInfo" class='list'>
                    <div v-on:click='statusFlag(item,listInfo)' :class="{activeDiv:item.status}">
                        <!--<img :src="item.img" :alt="item.name" :title="item.name">-->
                        <span>{{item.name}}</span>
                        <img :src="item.status?arrowTop:arrow" :alt="item.name" :title="item.name">
                    </div>
                    <ul class="listBoxTwo" v-if="item.status">
                        <li :key="indexs" v-for="(items,indexs) in item.list" class='listTwo'>
                            <router-link style="display:block;" :to="(items.hash)" :class="{'www-hidden':items.hidden}">
                                <span>{{items.nameTwo}}</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <mainCon class="rightCon">
            <topNav></topNav>
            <router-view></router-view>
        </mainCon>
    </div>
</template>
<script>
    import mainCon from "./main.vue";
    import topNav from '@src/topNav';
    // import {layoutRouter} from '@utils/handleRouter';
    export default {
        components: {
            topNav,
            mainCon
        },
        data() {
            return {
                item: require('@res/img/item.png'),
                arrow: require('@res/img/arrow.png'),
                arrowTop: require('@res/img/arrow2.png'),
                listInfo: [{
                    img: require('@res/img/item.png'),
                    name: '渠道信息管理',
                    hash: '/channelmanager/channelinformanager',
                    status: true,
                    list: [{
                            hash: '/channelmanager/channelinformanager',
                            nameTwo: '渠道信息管理',
                            children: [{
                                hash: '/channelmanager/channelinformanager',
                                nameTwo: '渠道信息管理',
                            }]
                        }, 
                        // {
                        //     hash: '/channelmanager/productsDetails',
                        //     nameTwo: '产品详情',
                        //     children: [{
                        //         hash: '/channelmanager/productsDetails',
                        //         nameTwo: '产品详情',
                        //     }]
                        // },
                        // {
                        //     hash: '/channelmanager/secretkey',
                        //     nameTwo: '查看秘钥',
                        //     children: [{
                        //         hash: '/channelmanager/secretkey',
                        //         nameTwo: '查看秘钥',
                        //     }]
                        // },
                        // {
                        //     hash: '/channelmanager/productioneditor',
                        //     nameTwo: '编辑详情',
                        //     children: [{
                        //         hash: '/channelmanager/productioneditor',
                        //         nameTwo: '编辑详情',
                        //     }]
                        // },
                        //   {
                        //     hash: '/channelmanager/channelproductdetails',
                        //     nameTwo: '渠道产品详情',
                        //     children: [{
                        //         hash: '/channelmanager/channelproductdetails',
                        //         nameTwo: '渠道产品详情',
                        //     }]
                        // },
                        // {
                        //     hash: '/channelmanager/shelvesDetails',
                        //     nameTwo: '上架产品详情',
                        //     children: [{
                        //         hash: '/channelmanager/shelvesDetails',
                        //         nameTwo: '上架产品详情',
                        //     }]
                        // },
                        // {
                        //     hash: '/channelmanager/cooperationDetails',
                        //     nameTwo: '合作详情',
                        //     children: [{
                        //         hash: '/channelmanager/cooperationDetails',
                        //         nameTwo: '合作详情',
                        //     }]
                        // },
                        //  {
                        //     hash: '/channelmanager/managementdetails',
                        //     nameTwo: '管理详情',
                        //     children: [{
                        //         hash: '/channelmanager/managementdetails',
                        //         nameTwo: '管理详情',
                        //     }]
                        // },
                        //  {
                        //      hash: '/channelmanager/channeldetails',
                        //     nameTwo: '管理id详情',
                        //     children: [{
                        //          hash: '/channelmanager/channeldetails',
                        //         nameTwo: '管理id详情',
                        //      }]
                        //  },
                        //  {
                        //     hash: '/channelmanager/informationDetails',
                        //     nameTwo: '新增详情',
                        //     children: [{
                        //         hash: '/channelmanager/informationDetails',
                        //         nameTwo: '新增详情',
                        //     }]
                        // },
                        //  {
                        //     hash: '/channelmanager/keydetails',
                        //     nameTwo: '秘钥详情',
                        //     children: [{
                        //         hash: '/channelmanager/keydetails',
                        //         nameTwo: '秘钥详情',
                        //     }]
                        // },
                        //  {
                        //     hash: '/channelmanager/editingdetails',
                        //     nameTwo: '秘钥编辑详情',
                        //     children: [{
                        //         hash: '/channelmanager/editingdetails',
                        //         nameTwo: '秘钥编辑详情',
                        //     }]
                        // }
                    ]
                }]
            }
        },
        created() {
            //this.listInfo = layoutRouter('systemManage');
        },
        methods: {
            clickHandler() {
                alert(Date.now())
            },
            statusFlag: function (item, listInfo) {
                let status = !item.status;
                for (let list in listInfo) {
                    listInfo[list].status = false;
                }
                item.status = status;
            }
        }
    }
</script>