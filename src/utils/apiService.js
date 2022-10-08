import axios from 'axios';
import qs from 'qs';
import {httpcs} from './requestUrl'
import { getAdmin, getAdmin2} from './admin';
import {getCookie} from  "../utils/cookies"
import router from "../router/index"
// import
// Http 请求客户端
const httpClient = axios.create({
  timeout: 120000,
  baseURL: httpcs
});


// 请求拦截器
httpClient.interceptors.request.use(request => {
  axios.defaults.withCredentials=true
  let token=getCookie('tokenId')
  request.headers.token =getCookie('tokenId') ? getCookie('tokenId') : null;

  // 如果请求体有值且值不为 FormData 格式请求处理为 {data: body} 格式
  if (request.data !== undefined && !(request.data instanceof FormData || request.data instanceof URLSearchParams)) {
    if (getAdmin(sessionStorage, 'admin')) {
      request.data = Object.assign({}, request.data, getAdmin(sessionStorage,'admin'))
      request.data.customerId = request.data.createUserId || null
      // request.data.customerId = '54341031520411648'
    }
    if (request.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
      request.data = qs.stringify(request.data, { arrayFormat: 'repeat' })
    }
    console.log(request.data)
    if (request.headers['Content-Type'] === 'multipart/form-data') {
      const formData = new FormData();
      Object.keys(request.data).forEach((key) => {
        formData.append(key, request.data[key]);
      });
      request.data = formData
    }
  } else {
    if (request.params) {
      if (getAdmin(localStorage, 'admin')||getAdmin(sessionStorage, 'admin')) {
        if(localStorage.getItem('loginType')&&localStorage.getItem('loginType')=='1'){
          request.params = Object.assign({}, request.params, getAdmin(localStorage,'admin'))
        }else{
          request.params = Object.assign({}, request.params, getAdmin(sessionStorage,'admin'))
        }

        request.params.customerId = request.params.createUserId || null
        // request.params.customerId = '54341031520411648'
      }
      for (let key in request.params) {
        if (Array.isArray(request.params[key])) {
          request.paramsSerializer = (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
          };
        }
      }
    }
  }
  return request
});

// 响应拦截器
httpClient.interceptors.response.use(response => {
  // 判断响应的 code 码是否正常
  const responseData = response;
  if (responseData.data.code) {
    if ( responseData.data.code === 0 || responseData.data.code === 200) {
      return Promise.resolve(responseData.data)
    }else if(responseData.data.code === 401){
      console.log(responseData.data.message)
      if(responseData.data.message=='登录失效请重新登录'){
        
        router.push({path:"/"});
      }
    } else if(responseData.data.code === 402  || responseData.data.code === 11101||responseData.data.code === 505){
      return Promise.resolve(responseData)
    } else if ( responseData.data.code === -1) {
      return new Promise((resolve, reject) => {
        reject(new Error('服务器繁忙 code为'+responseData.data.code+''));
      });
    } else if ( ['200100', '200101'].indexOf(responseData.data.code) !== -1) {
      window.vm.$Message.success(responseData.msg);
      return Promise.resolve(responseData)
    } else if (responseData.data.code === 1) {
      if(responseData.data){
        return Promise.resolve(responseData.data)
      } else {
        window.vm.$Message.error({
          content: responseData.msg,
          duration: 3
        });
      }
    } 
    else {
      
      return Promise.resolve(responseData.data)
    }
  } else if (!responseData.data.code) {
    return Promise.resolve(responseData)
  }
  const err = new Error(responseData.data.message);
  err.errorCode = responseData.data.code;
  return Promise.reject(err)
});

export const APIClientService={
  /**
   * 发起 Http 请求POST
   * @param url 请求路径，建议以 / 开头
   * @param params 请求参数，可选(data)
   * @param config 默认json，可选参数(string)
   * @param headers 请求头可以不填，可选参数(object)
   * responseType 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
   */
  REQUESTPOST(url, params, headers, config) {
    return httpClient({
      url: url,
      method: 'POST',
      data: params,
      responseType: config || 'json',
      headers: headers || {}
    })
  },
  /**
   * 发起 Http 请求GET
   * @param url 请求路径，建议以 / 开头
   * @param params 请求参数，可选(data)
   * @param config 默认json，可选参数(string)
   * @param headers 请求头可以不填，可选参数(object)
   * responseType 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob'(导出), 'document', 'json', 'text', 'stream'
   */
  REQUESTGET(url, params, headers, config) {
    return httpClient({
      url: url,
      method: 'GET',
      params: params || {},
      responseType: config || 'json',
      headers: headers || {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
    })
  },

  /**
   * 发起 Http 请求DETELE
   * @param url
   * @param params
   * @param headers
   * @param config
   * @returns {AxiosPromise<any>}
   * @constructor
   */
  REQUESTDETELE(url, params, headers, config) {
    return httpClient({
      url: url,
      method: 'DELETE',
      params: params || {},
      responseType: config || 'json',
      headers: headers || {},
    })
  },
  /**
   * 发起 Http 请求PUT
   * @param url
   * @param params
   * @param headers
   * @param config
   * @returns {AxiosPromise<any>}
   * @constructor
   */
  REQUESTPUT(url, params, headers, config) {
    return httpClient({
      url: url,
      method: 'PUT',
      data: params,
      responseType: config || 'json',
      headers: headers || {},
    })
  },
  /**
   * 发起 Http fetch 请求POST
   * @param url
   * @param params
   * @returns {Promise<Response>}
   * @constructor
   */
  FETCHTPOST( url, params ) {
    return fetch({
      url: axios.defaults.baseURL + url,
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}
