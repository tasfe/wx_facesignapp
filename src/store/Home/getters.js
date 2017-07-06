/**
 * Created by cuss on 2017/5/23.
 */
import T from './types';
export default {
  [T.GET_USER](state){
    return state.user;
  },
  [T.GET_IS_TAKE_PHOTO](state){
    return state.isTakePhoto;
  },
  [T.GET_USER_PHOTO_INFO](state){
    return state.info;
  }
}
