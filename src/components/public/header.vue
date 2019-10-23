<template>
  <div class="login">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">星尘</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li :class="{'active':home}">
              <router-link to="/">
                <a href="#">主页</a>
              </router-link>
            </li>
            <li>
              <router-link to>
                <a href="#">分类</a>
              </router-link>
            </li>
            <li>
              <a href>订阅</a>
            </li>
            <li>
              <a href>管理员入口</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li :class="{'active':user}">
              <router-link to="/userindex" style="color:black;"  v-if="loginvalidate">
                  {{username}}
              </router-link>
              <router-link to="login" v-else>
                <a>登录</a>
              </router-link>
            </li>
            <li :class="{'active':author}" v-if="loginvalidate">
              <router-link to="author">
              <a>我的作品</a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- /.container-fluid -->
    </nav>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loginvalidate: "",
      username:"",
      //判断导航栏的active的变量
      home:0,
      classification:0,
      user:0,
      collection:0,
      author:0
    }
  },
  props:[ 'isActive' ],
  created(){
    this.panduan(),
    this.getloginvalidate()
  },
  methods:{
    //页面刷新自动getcookies
    getloginvalidate(){
      this.loginvalidate = this.$cookies.get("loginvalidate")
      this.username = this.$cookies.get("userName")
    },

    //判断导航栏的active
    panduan(){
      let isActive = this.isActive
      if(isActive === "home"){
        this.home = 1
      }else if(isActive === "usercenter"||isActive === "login"){
        this.user = 1
      }else if(isActive === "author"){
        this.author = 1
      }
    }
  }
}
</script>
<style lang="scss">
.login {
  .navbar {
    background-color: #d0d0d0;
    li {
      transition: all 0.2s linear;
    }
    li:hover,
    .active {
      border-bottom: solid 3px blue;
    }
    a {
      color: #777;
      text-decoration: none;
    }
  }
  .navbar-right {
  }
  img {
    height: 35px;
  }
}
</style>