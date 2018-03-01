import Cookies from 'js-cookie';
import store from '@src/store';

export default logout => {
     document.getElementById('_header').style.display = 'none';
    // token
    store.dispatch('REMORETOKEN');
    Cookies.remove('token');
    Cookies.remove('user');
    // headerRouters
    Cookies.remove('headerRouters');
    // 回到登录
    location.reload();
}