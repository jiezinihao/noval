<template>
  <div class="container">
    <topheader :isActive="login"></topheader>
    <div class="choose">
      <a @click="choose(0)">登录</a>
      <span>or</span>
      <a @click="choose(1)">注册</a>
    </div>
    <form class="login" v-show="choosevalue === 0">
      <ul>
        <dl>
          账号：
          <input class="form-control" type="email" v-model="email" placeholder="email" />
        </dl>
        <dl>
          密码：
          <input class="form-control" value="password" v-model="password" placeholder="password" />
        </dl>
        <dl>
          <label>
            <input type="checkbox" id="checkboxSuccess" value="1" v-model="mian" />
            7天免登录
          </label>
        </dl>
        <dl>
          <el-button type="primary submit" @click="sendmsg()">登录</el-button>
        </dl>
      </ul>
    </form>
    <form class="register" v-show="choosevalue === 1">
      <ul>
        <dl>
          邮箱:
          <input type="email" class="form-control" placeholder="Email" v-model="email" />
        </dl>
        <dl class="form-inline">
          <span style="display:block;">验证码:</span>
          <input type="text" class="form-control" v-model="vaildate" />
          <input type="button" class="btn btn-default" @click="sendvaildate()" value="发送验证码" />
          {{vaildatemsg}}
        </dl>
        <dl>
          密码:
          <input type="password" class="form-control" v-model="password" />
        </dl>
        <dl>
          确认密码:
          <input type="password" class="form-control" v-model="confilmpassword" />
        </dl>
        <dl>
          <input type="button" value="确认注册" class="btn btn-primary" @click="register()">
          {{difpw}}
        </dl>
      </ul>
    </form>
  </div>
</template>
<script>
// import axios from 'axios'
import { mapState } from "vuex";
import { isBoolean } from "util";

export default {
  data() {
    return {
      email: "",
      password: "",
      mian: false,
      login: "login",
      choosevalue: 0,
      confilmpassword: "",
      vaildate: "",
      vaildatemsg: "",
      difpw: ""
    };
  },
  methods: {
    sendmsg() {
      let msg = {
        user: this.email,
        passWord: this.password
      };
      this.axios
        .post("http://stardustleague.cn:21507/api/Login/emailLogin", msg)
        .then(res => {
          //页面跳转
          this.$store.commit("setusermsg", res.data.Result);
          // thisapp.$store.commit('settoken',response.data.Result.token)
          //免登录操作，将数据存储到cookies
          if (this.mian) {
            this.$cookies.set("usercookies", res.data.Result.token, "7d");
            this.$cookies.set("loginvalidate", 1, "7d");
          } else {
            this.$cookies.set("usercookies", res.data.Result.token, "0");
            this.$cookies.set("loginvalidate", 1, "0");
          }
          this.$cookies.set("userName", res.data.Result.userName);
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          alert("密码错误！");
        });
    },
    choose(id) {
      if (id === 0) {
        this.choosevalue = 0;
      } else if (id === 1) {
        this.choosevalue = 1;
      }
    },
    sendvaildate() {
      this.axios
        .get(
          "http://stardustleague.cn:21507/api/Login/getValidateCode?eMail=" +
            this.email
        )
        .then(res => {
          if (res.data.StatusCode === 200) {
            this.vaildatemsg = "验证码发送成功!";
          }
        })
        .catch(err => {
          this.vaildatemsg = "验证吗发送失败!请检查email！";
        });
    },
    register() {
      if (this.password === this.confilmpassword) {
        let data = {
          eMail: this.email,
          passWord: this.password,
          ValidateCode: this.vaildate
        };
        this.axios
          .post("http://stardustleague.cn:21507/api/Login/emailEnroll", data,{
          })
          .then(res => {
            alert("注册成功!");
            this.$router.go(0);
          })
          .catch(err => {
            console.log(err.response)
          });
      } else {
        this.difpw = "输入的两次密码不一样，请检查！";
      }
    }
  }
};
</script>
<style lang="scss">
.container {
  .choose {
    height: 10vh;
    text-align: center;
    line-height: 10vh;
    :nth-child(2) {
      margin: 0 10px;
    }
    a {
      color: blue;
      font-size: 2rem;
      transition: all 0.2s ease;
    }
    a:hover {
      text-decoration: none;
      font-size: 2.5rem;
    }
  }
  .login {
    padding: 0;
    ul {
      padding: 0;
    }
  }
  .register {
    padding: 0;
    ul {
      padding: 0;
    }
  }
}
</style>