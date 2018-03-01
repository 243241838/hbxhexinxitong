import Template from '@src/template';
import SecondLayout from './layout.vue';

import toServiceGuide from './toServiceGuide';
import toAddLogo from './toAddLogo';
import editor from './editor';
import insured from './insured';
module.exports = {
    path: '/content',
    component: Template,
    meta: {
        title: '内容管理'
    },
    children: [{
        path: '/',
        component: SecondLayout,
        meta: {
            title: '内容管理'
        },
        children: [{
            path: 'toServiceGuide',
            name: 'content_toServiceGuide',
            component: toServiceGuide,
            meta: {
                title: '帮助中心'
            }
        },
        {
            path: 'toAddLogo' ,
            name: 'content_toAddLogo ',
            component: toAddLogo ,
            meta: {
                title: '客户业务类'
            }
        },
        {
            path: 'editor' ,
            name: 'content_editor',
            component:  editor,
            meta: {
                title: '编辑'
            }
        },
          {
            path: 'insured' ,
            name: 'content_ insured',
            component:  insured,
            meta: {
                title: '投保'
            }
        }
        ]
    }]

}