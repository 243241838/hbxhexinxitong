import SecondLayout from './layout.vue';

import startManage from './startManage.vue';
import startManageAdd from './startManageAdd.vue';
import startManageEdit from './startManageEdit.vue';
import AndroidManage from './AndroidManage.vue';
import IOSManage from './IOSManage.vue';
import versionAdd from './versionAdd.vue';
import versionDetail from './versionDetail.vue';
const layout = {
  template: `<router-view></router-view>`
}

module.exports = {
  path: '/clientSide',
  component: layout,
  meta: {
    title: '客户端管理'
  },
  children:[
    {
      path: '/',
      component: SecondLayout,
      children: [
          {
            path: 'startManage', 
            component: startManage,
            meta: {
              title: '启动页面管理'
            },
            name: 'clientSide_startManage'
          },
          {
              path: 'startManageAddDetail',
              component: startManageAdd,
              meta: {
                  title: '启动页面管理添加'
              },
              name: 'clientSide_startManage_Add'
          },
          {
              path: 'startManageEditDetail',
              component: startManageEdit,
              meta: {
                  title: '启动页面管理编辑'
              },
              name: 'clientSide_startManage_edit'
          },
          {
              path: 'AndroidManage',
              component: AndroidManage,
              meta: {
                  title: '版本控制安卓'
              },
              name: 'clientSide_AndroidManage'
          },
          {
              path: 'IOSManage',
              component: IOSManage,
              meta: {
                  title: '版本控制安卓'
              },
              name: 'clientSide_IOSManage'
          },
          {
              path: 'versionAddDetail',
              component: versionAdd,
              meta: {
                  title: '版本控制新增'
              },
              name: 'clientSide_version_add'
          },
          {
              path: 'versionDetail',
              component: versionDetail,
              meta: {
                  title: '版本控制详情'
              },
              name: 'clientSide_versionDetail'
          }
      ]
    }
  ]
  
}
