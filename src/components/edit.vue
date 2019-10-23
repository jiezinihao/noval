<template >
  <div>
    <div class="topheader">
      <topheader></topheader>
    </div>

    <div class="edit">
      请输入章节名：
      <input type="text" class="form-control" v-model="chapterName" />
      <p>请选择图片:</p>
      <input type="file" ref="file" style="margin-bottom:10px;" />
      <button class="btn btn-success" @click="getBookImage()">点击上传图片</button>

      <!-- 这里，文本框自适应以后在做调整 -->
      <div class="edit-body" v-for="item in editmsg.text" :key="item.type">
        <div class="edit-value" v-if="item.type === 1">
          <textarea contenteditable="true" v-model="item.value"></textarea>
        </div>
        <div class="edit-img" v-if="item.type === 2">
          <img :src="'http://stardustleague.cn:21507' + item.value" />
        </div>
        <div class="edit-author" v-if="item.type === 3">
          <textarea v-model="item.value"></textarea>
        </div>
      </div>
      <div class="author">
        <textarea v-model="author"></textarea>
      </div>
      <div class="sendchapter">
        <router-link to="author">
          <button class="btn btn-danger" style="margin-right:10px;">放弃</button>
        </router-link>
        <button class="btn btn-primary" @click="sendchapter()">上传章节</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookId: this.$route.params.bookId,
      chapterName: "",
      volumeId: this.$route.params.volumeId,
      bookImage: "",
      author: "",
      editmsg: {
        text: [
          {
            type: 1,
            value: ""
          }
        ]
      }
    };
  },
  methods: {
    getBookImage() {
      let form = new FormData();
      form.append("file", this.$refs.file.files[0]);
      form.append("bookId", this.bookId);
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
          //将图片插入到text列表中
          let obj = {
            type: 2,
            value: res.data.Result
          };
          this.editmsg.text.push(obj);

          //创建一个新的textarea
          let obj1 = {
            type: 1,
            value: ""
          };
          this.editmsg.text.push(obj1);
        });
    },
    sendchapter() {
      let data = this.editmsg;
      data.bookId = this.bookId;
      data.volumeId = this.volumeId;
      data.chapterName = this.chapterName;
      //将章节名push进data
      let obj1 = {
        type: 0,
        value: this.chapterName
      };
      //将作者的话插入到data里
      let obj = {
        type: 3,
        value: this.author
      };
      data.text.unshift(obj1);
      data.text.push(obj);
      let msg = JSON.stringify(data);
      this.axios
        .post("http://stardustleague.cn:21507/api/Book/UploadNewChapter", msg, {
          headers: {
            "content-type": "application/json",
            Authorization:
              this.$cookies.get("usercookies").token_type +
              " " +
              this.$cookies.get("usercookies").access_token
          }
        })
        .then(res => {
          alert("创建章节成功！");
          this.$router.push({ name: "author" });
        });
    }
  }
};
</script>

<style lang="scss">
.edit {
  margin-bottom: 50px;
  textarea {
    width: 100%;
    padding: 5px;
    font-size: 20px;
    height: 100%;
    min-height: 40vh;
  }
  .edit-body {
    margin-top: 10px;
    .edit-img {
      margin: 10px 0;
      img {
        max-height: 100px;
      }
    }
  }
}
</style>