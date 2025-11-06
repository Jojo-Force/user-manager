import {extend} from 'umi-request';
import { message } from 'antd';

const request = extend({
  credentials: 'include',
  prefix: process.env.NODE_ENV === 'production' ? 'http://user-backend.code-nav.cn' : undefined,
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
  } else {
    message.error(res.description);
  }
  return res.data;
});

 export default request;
