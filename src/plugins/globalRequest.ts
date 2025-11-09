import {extend} from 'umi-request';
import { message } from 'antd';

const request = extend({
  credentials: 'include',
  prefix: process.env.NODE_ENV === 'production' ? 'http://user-center.jojo-force.top' : '',
});

request.interceptors.request.use((url:string, options) => {
  console.log(`do request url = ${url}`)

  return {
    url,
    options:{
      ...options,
      headers:{

      },
    },
  };
})


request.interceptors.response.use( async (response: Response, options) => {
  const res = await response.clone().json();

  if (res.code === 0) {
    return res.data;
  }

  if (res.code === 40100) {
    message.error('请先登录');
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
  } else if (res.code === 40000 && res.description === '用户不存在') {

  } else {
    message.error(res.description);
  }
  return null;
});

 export default request;
