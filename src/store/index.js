import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        // usermsg:[
        //     // userName = "",
        //     // remsg = "",
        //     // role = "",
        //     // sex = 0,
        //     // img = "",
        // ],
        usermsg: {},
        //判断是否登录
        userbgc: "#FAF9DE"
    },
    mutations: {
        setuserbgc(state, userbgc) {
            state.userbgc = userbgc
        },
        setusermsg(state, usermassage) {
            state.usermsg = usermassage
        },
        validate(state, response) {
            state.loginvalidate = response
        }
        // },
        // settoken(state,qusertoken){
        //     state.usertoken = qusertoken
        // }
    }
})