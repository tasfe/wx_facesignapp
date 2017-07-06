/**
 * Created by cuss on 2017/5/24.
 */
import  mutations from './mutations';
import  getters from './getters';
import  actions from './actions';
import T from './types';
export const Types = {
  ...T
}
export default {
  state:{
    user:{ //用户信息
      userid:null,
      name:null,
      mobile:null,
      gender:null,
      avatar:null,
      email:null
    },
    isTakePhoto:false, //是否照相
    info:{
      age:null,
      ethnicity:null,
      emotion:null,
      face_image:null,
      name:null,
      gender:null,
      smile:null,
      comment:null
    }
  },
  mutations,
  getters,
  actions
}
