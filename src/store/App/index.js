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
      wxReady:false
  },
  mutations,
  getters,
  actions
}
