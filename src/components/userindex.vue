<template>
  <div class="userIndex">
    <topheader :isActive="usercenter"></topheader>

    <!-- 分2个模块
        1.上传头像，修改资料，返回主页
        2.个人收藏
    -->

    <div class="user-body">
      <div class="container">
        <div class="row">
          <div class="user-msg col-sm-5">
            <ul>
              <dl>
                <img :src="'http://stardustleague.cn:21507' + userdetail.image" />
              </dl>
              <dl>
                <button class="btn">修改头像</button>
              </dl>
              <dl>{{userdetail.userName}}</dl>
              <dl>邮箱：{{userdetail.eMail}}</dl>
              <dl>注册时间：{{userdetail.createDate}}</dl>
              <dl>
                <button class="btn" style="margin-right:10px;">修改资料</button>
                <router-link to="author"><button class="btn">我的作品 </button></router-link>
              </dl>
            </ul>
          </div>
          <div class="col-sm-1"></div>
          <div class="user-favior col-sm-5">
            <div class="faviortitle">
              我的收藏：
            </div>
            <div class="item" v-for="item in userbooks" :key="item.id">
              <div class="item-img">
                <img :src="'http://stardustleague.cn:21507' + item.bookImage"/>
              </div>
              <div class="item-button">
                <button class="btn btn-primary btn-xs">继续阅读</button>
              </div>
            </div>
          </div>
          <div class="col-sm-1"></div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userdetail: {},
      userbooks: {},
      usercenter:"usercenter"
    };
  },
  created() {
    this.getuserdetail();
    this.getuserbooks();
  },
  methods: {
    getuserdetail() {
      this.axios
        .get("http://stardustleague.cn:21507/api/User/getUserInfo", {
          headers: {
            Authorization:
              this.$cookies.get("usercookies").token_type +
              " " +
              this.$cookies.get("usercookies").access_token
          }
        })
        .then(res => {
          this.userdetail = res.data.Result;
        });
    },
    getuserbooks() {
      this.axios
        .get(
          "http://stardustleague.cn:21507/api/User/GetUserFavorites?offset=0&size=20",
          {
            headers: {
              Authorization:
                this.$cookies.get("usercookies").token_type +
                " " +
                this.$cookies.get("usercookies").access_token
            }
          }
        )
        .then(res => {
         
          this.userbooks = res.data.Result.books;
        });
    }
  },
  computed: {
    ...mapState(["usermsg"])
  }
};
</script>
<style lang="scss">
.userIndex {
  height: 1000px;
  .user-body {
    .container {
      margin-top: 50px;
      .user-msg {
        padding: 5px;
        border: solid 2px rgba(36, 35, 36, 0.133);
        min-height: 400px;
        box-shadow: 5px 2px 5px #e2e2e2;
      }
      .user-favior {
        padding:5px 20px;
        height: 400px;
        border: solid 2px rgba(36, 35, 36, 0.133);
        box-shadow: 5px 2px 5px #e2e2e2;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        overflow: auto;
        .item {
          padding: 5px;
          height: 45%;
          border: solid 2px rgba(36, 35, 36, 0.133);
          box-shadow: 5px 2px 5px #e2e2e2;
          .item-img {
            box-shadow: 5px 2px 5px #e2e2e2;
            img {
              max-width: 80px;
            }
          }
          .item-button {
            margin-top: 10px;
            margin-left: 10%;
          }
        }
      }
    }
  }
}
</style>