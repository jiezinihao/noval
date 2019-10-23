import Vue from "vue";
import App from "./App.vue";


//导入vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

//导入element-ui
import ElementUI from "element-ui";
Vue.use(ElementUI);
import "./styles.scss";

import $ from 'jquery'
Vue.prototype.$ = $

import './assets/bootstrap-3.3.7-dist/js/bootstrap.js'
import './assets/bootstrap-3.3.7-dist/css/bootstrap.css'

//导入axios并加入原型链
import axios from "axios";
Vue.prototype.axios = axios;


//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store/index'

//导入vue-router
import VueRouter from "vue-router";
Vue.use(VueRouter);
import router from "./router.js";


//导入基 础组件
import booklist from "./components/public/booklist.vue";
import topheader from "./components/public/header.vue";
import bottom from "./components/public/bottom.vue";
import rotation from "./components/public/rotation.vue";
import cebianlan from "./components/public/cebianlan.vue";
import newVolume from './components/public/newvolume'
import getVolume from './components/public/volume'

Vue.component("booklist", booklist);
Vue.component("topheader", topheader);
Vue.component("bottom", bottom);
Vue.component("rotation", rotation);
Vue.component("cebianlan", cebianlan);
Vue.component("newvolume",newVolume);
Vue.component("getvolume",getVolume);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
