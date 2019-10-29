<template>
  <div class="home" :style="'background:'+ bgc">
    <!-- 网页头部部分，模块化 -->
    <topheader :isActive="home"></topheader>
    <br />
    <div>
      <!-- 侧边栏部分，可复用 -->
      <cebianlan></cebianlan>
      <!-- 网页轮播图部分，暂不复用，在这里写 -->
      <rotation hidden></rotation>

      <!-- 书籍列表部分，模块化 -->
      <booklist></booklist>
    </div>
    <!-- 网页底部信息部分 -->
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usercookies: {},
      home: "home",
      bgc: this.$store.state.userbgc
    };
  },
  created() {
    this.getcookies();
  },
  methods: {
    //从cookies获取账号密码，如果有的话
    getcookies() {
      // this.$store.commit("setusermsg", this.$cookies.get("usercookies"));
      // this.$store.commit("validate", 1);
      if (this.$cookies.isKey("loginvalidate")) {
        this.usercookies = this.$cookies.get("usercookies");
        this.axios
          .get("http://stardustleague.cn:21507/api/User/getUserInfo", {
            headers: {
              Authorization:
                this.usercookies.token_type +
                " " +
                this.usercookies.access_token
            }
          })
          .then(res => {
            this.$store.commit("setusermsg", res.data.Result);
            this.$cookies.set("loginvalidate", 1, "0");
            this.$cookies.set("userName", res.data.Result.userName);
          })
          .catch(err => {
            this.$cookies.set("loginvalidate", 0);
            alert("身份验证以过期，请重新登录");
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100vw;
}
</style>