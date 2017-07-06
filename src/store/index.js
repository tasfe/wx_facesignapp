/**
 * Created by cuss on 2017/5/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import Home, {Types as HomeTypes} from './Home';
import App, {Types as AppTypes} from './App';
//调用vuex
Vue.use(Vuex);

export const Types = {
  ...HomeTypes,
  ...AppTypes
};
export default new Vuex.Store({
  modules: {
    App: App,
    Home: Home,
  },
  strict: true
})
