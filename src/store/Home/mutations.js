/**
 * Created by cuss on 2017/5/23.
 */
import  T from './types';

export default {
  [T.FETCH_USER_INFO]( state, payload ){
  },
  [T.FETCH_IS_TAKE_PHOTO]( state, payload ){
    //保存用户资料
    //判断是否照相 如果照相了 则跳转到新节目
    if ( payload.data && payload.data.face_image ) {
      state.isTakePhoto = true;
      Object.assign( state.info, payload.data )
    } else {
      //设置info
      //设置用户信息
      state.isTakePhoto = false;
    }
  },
  [T.POST_USER_PHOTO]( state, payload ){
    //保存用户资料
    //判断是否照相 如果照相了 则跳转到新节目
    state.isTakePhoto = true;
    //设置用户信息
    //设置对应的 图片 准备上传
    Object.assign( state.info, payload.data )
  },
}
