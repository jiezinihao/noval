<template>
  <div class="item-volume">
    <div class="volume" v-for="item in bookIndex" :key="item.volumeId">
      <a @click="viewItemVChart(item.volumeId)">
        <div class="volume-title">{{item.volume}}</div>
      </a>
      <div v-show="viewchart === item.volumeId" class="charpt-item">
        <div class="charpt" v-for=" item1 in item.chapter" :key="item1.chapterId">
          <a href>
            <router-link
              :to="{ name:'bookRead',params:{ chapterId:item1.chapterId,chapterName:item1.chapterName } }"
            >{{item1.chapterName}}</router-link>
          </a>
        </div>
        <div class="edit">
          <router-link :to="{ name:'edit',params:{ bookId:bookId,volumeId:item.volumeId } }">
            <a href>+</a>
          </router-link>
        </div>
      </div>
    </div>
    <div class="sendpart">
      <a class="btn" @click="viewVolume()">新建卷</a>
    </div>
    <div class="addvolume" v-if="displayvolume">
      <newvolume :bookId="bookId" @judge="judge"></newvolume>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookIndex: [],
      viewchart: "",
      displayvolume: 0
    };
  },
  props: ["bookId"],
  created() {
    this.getbookIndex();
  },
  methods: {
    viewVolume() {
      if (this.displayvolume === 0) {
        this.displayvolume = 1;
      } else {
        this.displayvolume = 0;
      }
    },
    judge(data) {
      if (data === 200) {
        alert("上传卷成功！");
        this.displayvolume = 0;
      } else {
        alert("上传卷失败");
      }
    },
    viewItemVChart(Id) {
      if (this.viewchart === Id) {
        this.viewchart = "";
      } else {
        this.viewchart = Id;
      }
    },
    getbookIndex() {
      let url =
        "http://stardustleague.cn:21507/api/Book/GetBookIndex?bookId=" +
        this.bookId;
      this.axios
        .get(url, {
          headers: {
            Authorization:
              this.$cookies.get("usercookies").token_type +
              " " +
              this.$cookies.get("usercookies").access_token
          }
        })
        .then(res => {
          this.bookIndex = res.data.Result.bookIndices;
        });
    }
  }
};
</script>
<style lang="scss">
.item-volume {
  overflow: auto;
  padding: 15px;
  min-width: 300px;
  max-height: 230px;
  .volume {
    .volume-title {
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      cursor: pointer;
      background-color: #e2e2e2;
      transition: 0.4s;

      a {
        text-decoration: none;
      }
    }
    .volume-title:hover {
      background-color: #bdc3c7;
    }
    .charpt-item {
      .edit {
        text-align: center;
        a {
          display: block;
          padding: 5px;
          transition: all 0.2s ease;
        }
        a:hover {
          background-color: #a2a2a2;
        }
      }
      .charpt {
        a {
          display: block;
          padding: 5px;
          transition: all 0.2s ease;
        }
        a:hover {
          background-color: #a2a2a2;
        }
      }
    }
  }
  .addvolume {
    position: absolute;
    margin-top: 10px;
  }
  .sendpart {
    a {
      width: 100%;
      background: #95a5a6;
      transition: background-color 0.2s ease;
    }
    a:hover {
      background-color: #3498db;
    }
  }
}
</style>