
import  T from './types';
import API from '@/api/index'
export default {
  //获取用户信息
    [T.FETCH_USER_INFO]({commit},payload){
      return new Promise((resolve, reject) => {
        API.fetchUser(payload).then(r => {
          if (r.data.result) {
            resolve(r.data.data);
            commit(T.FETCH_USER_INFO,{data: r.data.data});
          } else {
            reject({error: true, data: r.data});
          }
        }).catch(e => {
          reject({error: true, data: e.data});
        })
      });
    },
  [T.FETCH_IS_TAKE_PHOTO]({commit},payload){
    return new Promise((resolve, reject) => {
      API.fetchIsTakePhoto(payload).then(r => {
        if (r.data.result) {
          resolve(r.data.data);
          commit(T.FETCH_IS_TAKE_PHOTO,{data: r.data.data});
        } else {
          reject({error: true, data: r.data});
        }
      }).catch(e => {
        reject({error: true, data: e.data});
      })
    });
  },
  [T.POST_USER_PHOTO]({commit},payload){
    return new Promise((resolve, reject) => {
      API.postUserPhoto(payload).then(r => {
        if (r.data.result) {
          resolve(r.data.data);
          commit(T.POST_USER_PHOTO,{data: r.data.data});
        } else {
          reject({error: true, data: r.data});
        }
      }).catch(e => {
        console.log(e)
        reject({error: true, data: e.data});
      })
    });
  }
}
