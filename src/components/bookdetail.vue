<template>
  <div class="bookdetail">
    <topheader></topheader>
    <div class="bookdetail-body container">
      <div class="row">
        <div class="book-left col-sm-5">
          <div class="bookimage">
            <img :src="'http://stardustleague.cn:21507' + bookDetail.bookImage" />
          </div>
          <div class="bookinfo">
            <div class="bookname">{{bookDetail.bookName}}</div>
            <div class="author">{{bookDetail.AuthorName}}</div>
            <div class="synopsis">{{bookDetail.synopsis}}</div>
            <button class="btn btn-primary" @click="collection()">{{bookIsCollection.msg}}</button>
            
          </div>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-5" >
          <div class="book-charpt" v-for="item in bookIndex" :key="item.volumeId">
          <div class="book-charpt-volume">
            <p>{{item.volume}}</p>
          </div>
          <div class="book-charpt-body" v-for="item1 in item.chapter" :key="item1.chapterId">
            <router-link :to="{ name:'bookRead',params:{ chapterId:item1.chapterId,chapterName:item1.chapterName } }">{{item1.chapterName}}</router-link>
          </div>
        </div>
        <div class="col-sm-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookId: this.$route.params.bookId,
      bookDetail: {},
      bookIsCollection: {},
      bookIndex:[]
    };
  },
  created() {
    this.getbookdetail();
    this.getbookIndex()
  },
  methods: {
    getbookdetail() {
      let thisapp = this;
      let url =
        "http://stardustleague.cn:21507/api/Book/GetBookDetails?bookId=" +
        this.bookId;
      this.axios
        .get(url, {
          headers: {
            Authorization:
              thisapp.$cookies.get("usercookies").token_type +
              " " +
              thisapp.$cookies.get("usercookies").access_token
          }
        })
        .then(res => {
          this.bookDetail = res.data.Result;
          if (res.data.Result.isCollection === 0) {
            this.bookIsCollection = { id: 0, msg: "已收藏" };
          }else{
            this.bookIsCollection = { id: 1, msg: "收藏" }
          }
        });
    },
    collection() {
      let url =
        "http://stardustleague.cn:21507/api/User/CollectionBook?bookId=" +
        this.bookId;
      this.axios
        .post(url, this.bookId, {
          headers: {
            Authorization:
              this.$cookies.get("usercookies").token_type +
              " " +
              this.$cookies.get("usercookies").access_token
          }
        })
        .then(res => {
          if (this.bookIsCollection.id === 0) {
            this.bookIsCollection = { id:1,msg:"收藏" };
          } else {
            this.bookIsCollection = { id: 0, msg: "已收藏" }
          }
        });
    },
    getbookIndex(){
      let url = 'http://stardustleague.cn:21507/api/Book/GetBookIndex?bookId=' + this.bookId
      this.axios.get(url,{
        headers: {
            Authorization:
              this.$cookies.get("usercookies").token_type +
              " " +
              this.$cookies.get("usercookies").access_token
          }
      }).then((res) => {
        console.log(res)
        this.bookIndex = res.data.Result.bookIndices
      })
    }
  }
};
</script>

<style lang="scss">
.bookdetail-body {
  .book-left {
    padding: 15px;
    border: solid 2px rgba(36, 35, 36, 0.133);
    box-shadow: 5px 2px 5px #e2e2e2;
    min-height: 400px;
    .bookimage {
      margin-left: 15%;
      img {
        max-height: 250px;
      }
    }
    .bookinfo {
      margin-left: 15%;
      .bookname {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  .book-charpt {
    padding: 15px;
    border: solid 2px rgba(36, 35, 36, 0.133);
    min-height: 400px;
    box-shadow: 5px 2px 5px #e2e2e2;
    .book-charpt-volume {
      padding: 5px;
      border: solid 2px rgba(36, 35, 36, 0.133);
      min-height: 30px;
      box-shadow: 5px 2px 5px #e2e2e2;
      p {
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: 800;
        text-align: center;
      }
    }
    .book-charpt-body {
      margin-top: 5px;
      padding: 2px;
      border: solid 2px rgba(36, 35, 36, 0.133);
      min-height: 20px;
      box-shadow: 5px 2px 5px #e2e2e2;
    }
  }
}
</style>