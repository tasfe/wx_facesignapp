
/**
 * Created by cuss on 2017/6/24.
 */

import axios from 'axios'
import APPConfig from '@/config'
import Coockie from 'js-cookie';
//url地址
const urls = {
  fetchUser: APPConfig.apiPath + '/mockjsdata/3/get_meesage',
  fetchIsTakePhoto: APPConfig.apiPath + '/web/wx/user/detail',
  getWXConfig:APPConfig.apiPath + '/web/wx/home/get-wx-js-config',
  fetchUerId:APPConfig.apiPath + '/web/wx/home/auth',
  postUserPhoto:APPConfig.apiPath + '/web/wx/user/sign-in',
  getUserPhoto:APPConfig.apiPath + '/web/wx/home/upload-image',
};

const config = {
  baseURL: '',
  timeout: 4000,
};

export function fetchUerId(payload){
  location.href = urls.fetchUerId;
  return axios.get(urls.fetchUerId);
}
export function fetchUser(payload){
  const userid = Coockie.get('userid');
  return axios.get(urls.fetchUser,{
    params:{
      userid
    }
  }, Object.assign({}, config, payload.config));
}
export function fetchIsTakePhoto(){
  const userid = Coockie.get('userid');
  return axios.get(urls.fetchIsTakePhoto,{
    params:{
      userid,
      time: + new Date
    }
  }, Object.assign({}, config));
}
export function getUserPhoto(params){
  const userid = Coockie.get('userid');
  return axios.post(urls.getUserPhoto,Object.assign({},params,{userid,  time: + new Date}), Object.assign({}, config));
}

export function postUserPhoto(params){
  const userid = Coockie.get('userid');
  return axios.post(urls.postUserPhoto,Object.assign({},params,{userid,  time: + new Date}), Object.assign({}, config));
}


export function getWXConfig(){
  return axios.get(urls.getWXConfig,{
    params:Object.assign({url:location.href.split('#')[0]})
  }, Object.assign({}, config));
}

export default{
  fetchUser,
  fetchIsTakePhoto,
  getWXConfig,
  postUserPhoto,
  getUserPhoto,
  fetchUerId
}
