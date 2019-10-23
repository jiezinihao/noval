<template>
  <div class="newvolume">
    <input type="text" class="form-control" placeholder="请输入卷名" v-model="volumeName" />
    <div class="volume-button">
      <button class="btn btn-primary" @click="addNewVolume()">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      volumeName: ""
    };
  },
  props: ["bookId"],
  methods: {
    addNewVolume() {
      let data = {
        bookId: this.bookId,
        volumeName: this.volumeName
      };
      this.axios.post(
        "http://stardustleague.cn:21507/api/Book/AddNewVolume",
        data,
        {
          headers: {
            Authorization:
              this.$cookies.get("usercookies").token_type +
              " " +
              this.$cookies.get("usercookies").access_token
          }
        })
        .then((res) => {
          console.log(res)
            this.$emit('judge',res.data.StatusCode)
        })
    }
  }
};
</script>
<style lang="scss">
.newvolume {
  min-width: 200px;
  background-color: #e2e2e2;
  padding: 5px;
  border: solid 2px powderblue;
  .volume-button {
    margin-top: 10px;
  }
}
</style>