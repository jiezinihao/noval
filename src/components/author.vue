<template>
  <div class="author">
    <div class="topheader">
      <topheader :isActive="author"></topheader>
    </div>
    <div class="author-container">
      <div class="author-item" v-for="item in authorbooks" :key="item.bookId">
        <div class="item-img">
          <img :src="'http://stardustleague.cn:21507' + item.bookImage" />

          <div class="item-info">
            <div class="item-name">
              <p>{{item.bookName}}</p>
            </div>
            <div class="item-subinfo">
              <div class="sub">
                <span>分类：</span>
                {{item.sub}}
              </div>
              <div>
                <span>上次修改时间：</span>
                {{item.LastModificationTime}}
              </div>
              <div class="status">
                <span>审核状态：</span>
                {{item.bookStatus}}...
              </div>
            </div>
            <!-- <p class="synopsis">{{item.synopsis}}</p> -->
          </div>
        </div>

        <getvolume :bookId="item.bookId" class="volume"></getvolume>
      </div>

      <!-- 添加新小说部分 -->
      <div class="add" data-toggle="modal" data-target=".add-lg">
        <p>+</p>
      </div>
      <div class="modal fade add-lg" id="myModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">创建新书</h4>
            </div>
            <div class="modal-body">
              <!-- 书籍详情上传部分 -->
              <div class="body-form">
                <input type="text" class="form-control" placeholder="小说名称" v-model="uploadbookName" />
                <textarea cols="30" rows="10" placeholder="简介" v-model="uploadbooksynopsis"></textarea>
                <label>
                  <input type="radio" v-model="sub" value="0" />原创
                </label>
                <label>
                  <input type="radio" v-model="sub" value="1" />同人
                </label>
              </div>

              <!-- 上传书籍封面部分 -->
              <div class="body-img">
                <img :src="'http://stardustleague.cn:21507' + authorimage" v-if="authorimage" />
              </div>
              <div class="body-upload">
                <input type="file" ref="file" />
              </div>
              <div class="body-button">
                <button class="btn btn-primary" @click="uploadimage()">点击上传封面(支持.png .gif .jpg)</button>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">放弃</button>
              <button type="button" class="btn btn-primary" @click="uploadbook()">上传书籍</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: "author",
      authorbooks: [],
      authorimage: "",
      sub: 0,
      uploadbookName: "",
      uploadbooksynopsis: "",
      displayvolume: 0
    };
  },
  created() {
    this.getauthorbooks();
  },
  methods: {
    getauthorbooks() {
      this.axios
        .get(
          "http://stardustleague.cn:21507/api/User/GetUserBooks?offset=0&size=20",
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
          //处理转义业务
          res.data.Result.books.forEach(item => {
            //处理分类转义
            if (item.sub === 0) {
              item.sub = "原创";
            } else {
              item.sub = "同人";
            }
            //处理审核转义
            if (item.bookStatus === 0) {
              item.bookStatus = "被删除";
            } else if (item.bookStatus === 1) {
              item.bookStatus = "审核中";
            } else if (item.bookStatus === 2) {
              item.bookStatus = "审核通过";
            } else if (item.bookStatus === 3) {
              item.bookStatus = "审核未通过";
            }
          });
          this.authorbooks = res.data.Result.books;
        });
    },

    uploadimage() {
      let form = new FormData();
      form.append("file", this.$refs.file.files[0]);
      form.append("bookId", 0);
      this.axios
        .post("http://stardustleague.cn:21507/api/Book/UploadBookImage", form, {
          headers: {
            Authorization:
              this.$cookies.get("usercookies").token_type +
              " " +
              this.$cookies.get("usercookies").access_token
          }
        })
        .then(res => {
          this.authorimage = res.data.Result;
        });
    },
    uploadbook() {
      let book = {
        bookName: this.uploadbookName,
        bookImage: this.authorimage,
        synopsis: this.uploadbooksynopsis,
        sub: this.sub
      };
      this.axios
        .post("http://stardustleague.cn:21507/api/Book/CreateNewBook", book, {
          headers: {
            Authorization:
              this.$cookies.get("usercookies").token_type +
              " " +
              this.$cookies.get("usercookies").access_token
          }
        })
        .then(res => {
          alert("上传成功");
          this.$router.go(0);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.author-container {
  padding: 0 10px;
  min-height: 500px;
  .author-item {
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-self: center;
    flex-wrap: wrap;
    margin: 10px 0;
    padding: 10px;
    box-shadow: 5px 2px 5px #e2e2e2;
    .item-img {
      width: 400px;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 2px 2px 10px #e2e2e2;
      img {
        max-width: 150px;
        max-height: 150px;
      }
    }
    .item-info {
      font-size: 12px;
      padding: 0 10px;
      max-width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .item-name {
        p {
          font-weight: bold;
          font-size: 25px;
        }
      }
      span {
        font-size: 14px;
        font-weight: bold;
      }
      // .synopsis {
      //   border-radius: 10px;
      //   padding: 5px;
      //   border: solid 2px #e2e2e2;
      //   min-height: 130px;
      // }
    }
    // .item-subinfo {
    //   margin: 0 10px;
    //   .sub {
    //     margin: 10px 10px;
    //   }
    //   .status {
    //     margin: 10px 0 20px 10px;
    //   }
    // }
    .volume {
      flex: 1;
    }
    .modal-body {
      .body-form {
        textarea {
          display: block;
          margin: 10px 0;
          border-radius: 5px 0 0 5px;
        }
      }
      div {
        margin: 10px 10px;
      }
      img {
        max-height: 150px;
        max-width: 150px;
      }
    }
  }
  .add {
    border-radius: 10px;
    display: block;
    box-shadow: 5px 2px 5px #e2e2e2;
    p {
      cursor: pointer;
      text-align: center;
      margin: 0;
      line-height: 90px;
      color: #a2a2a2;
      font-size: 155px;
    }
  }
}
</style>