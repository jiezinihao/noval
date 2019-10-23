<template>
  <div class="booklist">
    <div class="bookitem" v-for="item in books" :key="item.bookId">
      <label @click="read(item.bookId)">
        <img :src="'http://stardustleague.cn:21507' + item.bookImage" id="bookimage" />
      </label>
      <div class="bookinfo">
        <a name="button1" class="bookname" @click="read(item.bookId)">{{item.bookName}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 0,
      books: [],
      loginvalidate: this.$cookies.get("loginvalidate")
    };
  },
  created() {
    this.getbookmsg();
  },
  methods: {
    // 分页和数量暂时设为20
    getbookmsg() {
      this.axios
        .get(
          "http://stardustleague.cn:21507/api/BookHome/GetBookList?offset=0&size=20"
        )
        .then(res => {
          this.total = res.data.Result.total;
          this.books = res.data.Result.books;
        });
    },
    read(Id) {
      if (this.loginvalidate === "1") {
        this.$router.push({ name: "bookDetail", params: { bookId: Id } });
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>
<style lang="scss">
.booklist {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .bookitem {
    margin: 2rem;
    img {
      width: 150px;
      border: solid 2px rgba(36, 35, 36, 0.133);
      box-shadow: 5px 2px 5px #e2e2e2;
    }
    .bookinfo {
      margin-top: 5px;
      .bookname {
        color: black;
        padding-left: 15%;
        line-height: 25px;
        font-size: 22px;
      }
    }
  }
}
</style>