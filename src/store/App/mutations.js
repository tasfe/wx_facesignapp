/**
 * Created by cuss on 2017/5/23.
 */
import  T from './types';

export default {
  [T.SET_WX_READY](state,payload){
    state.wxReady = payload.wxReady;
  },

}
