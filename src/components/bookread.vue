<template>
  <div class="bookread" :style="'background:'+bgc">
    <div>
      <topheader></topheader>
    </div>
    {{bgc}}
    <button class="btn btn-success" @click="changebgc()">护眼模式</button>
    <div class="title">{{chapterName}}</div>
    <div class="bookread-body" v-for="item in bookvalue" :key="item.value">
      <div class="body-font" v-show="item.type === 1">
        <pre>{{item.value}}</pre>
      </div>
      <div class="body-img" v-show="item.type === 2">
        <img :src="'http://stardustleague.cn:21507' + item.value" />
      </div>
      <div class="body-author" v-show="item.type === 3">
        <span>作者的话：{{item.value}}</span>
      </div>
    </div>
    <button class="btn btn-primary">上一章</button>
    <button class="btn btn-primary">返回目录</button>
    <button class="btn btn-primary">下一章</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bgc: this.$store.state("userbgc"),
      chapterId: this.$route.params.chapterId,
      chapterName: this.$route.params.chapterName,
      bookvalue: []
    };
  },
  created() {
    this.getBookValue();
  },
  methods: {
    //改变护眼模式
    changebgc() {
      if (this.bgc === "#FAF9DE") {
        this.bgc = "#f0f0f0";
      } else {
        this.bgc = "#FAF9DE";
      }
    },
    getBookValue() {
      this.axios
        .get(
          "http://stardustleague.cn:21507/api/Book/GetChapter?chapterId=" +
            this.chapterId,
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
          //替换里面的格式
          // res.data.Result.forEach(item => {
          //   if(item.type == 1){
          //     let regex = /n/g
          //     item.value.replace(regex,"<br/>")
          //   }
          // });

          this.bookvalue = res.data.Result;
          console.log(this.bookvalue);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.bookread {
  width: 100vw;
}
.eye {
  display: inline-block;
  background-color: #1abc9c;
  height: 30px;
}
.title {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  line-height: 40px;
}
.bookread-body {
  padding: 3px;
  pre {
    white-space: pre-wrap;
    border: none;
    background: none;
    font-size: 18px;
    line-height: 40px;
  }
  .body-font {
  }
  .body-img {
    img {
      max-width: 200px;
    }
  }
  .body-author {
    padding: 10px;
    width: 80vw;
    min-height: 100px;
  }
}
</style>