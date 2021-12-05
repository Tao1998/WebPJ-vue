<!--
 * @Descripttion: 
 * @version: 
 * @Author: Bruce
 * @Date: 2021-11-24 16:24:21
 * @LastEditors: Bruce
 * @LastEditTime: 2021-12-05 21:46:27
-->
<template>
  <div>
    <el-carousel :interval="5000" trigger="click" height="360px">
      <el-carousel-item v-for="item in post" :key="item.idx" align="center">
        <img :src="item.idView" height="100%" />
      </el-carousel-item>
    </el-carousel>
    <div class="title-div">
      <span style="color: azure">What to watch</span>
    </div>
    <el-carousel
      v-if="movielist.length"
      indicator-position="none"
      trigger="click"
      height="400px"
      :autoplay="false"
      :loop="false"
    >
      <!-- v-if 等获取movielist之后渲染 -->
      <el-carousel-item
        v-for="item in even(imagebox)"
        :key="item.idx"
        align="center"
      >
        <el-row>
          <el-col :span="6" v-for="(value, offset) in 4" :key="value">
            <el-card class="movie-card" :body-style="{ padding: '0px' }">
              <div class="image-box">
                <img :src="movieImgSrc(item.idx, offset)" class="image" />
                <!-- <img :src="item.idView" class="image" /> -->
                <!-- <img :src="movielist[item.idx].imgSrc" class="image" /> -->
              </div>
              <div>
                <div class="movie-name">
                  <!-- {{ movielist[item.idx+offset]["name"] }} -->
                  {{ movieName(item.idx, offset) }}
                </div>
                <div style="padding: 10px">
                  <!-- 添加 -->
                  <el-tooltip
                    effect="dark"
                    content="添加"
                    placement="top"
                    :enterable="false"
                  >
                    <el-button
                      type="warning"
                      plain
                      @click="addWatch(item.idx + offset)"
                      >+ Watchlist</el-button
                    >
                  </el-tooltip>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>

    <!-- <el-card>
      电影列表
      <el-table :data="movielist" border stripe>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="导演" prop="director"></el-table-column>
        <el-table-column label="地区" prop="region"></el-table-column>
        <el-table-column label="年份" prop="year"></el-table-column>
      </el-table>
    </el-card> -->
  </div>
</template>
<script>
export default {
  created() {
    this.id = window.sessionStorage.getItem("id");
    this.getMovieList();
  },
  data() {
    return {
      // 请求数据
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5,
      },
      id: 0,
      movielist: [], // 电影列表

      total: 0, // 最大数据记录

      post: [
        { idx: 0, idView: require("../../assets/post/m1.jpg") },
        { idx: 1, idView: require("../../assets/post/m2.jpg") },
        { idx: 2, idView: require("../../assets/post/m3.jpg") },
      ],
      imagebox: [
        { idx: 0, idView: require("../../assets/imagebox/m1.jpg") },
        { idx: 1, idView: require("../../assets/imagebox/m2.jpg") },
        { idx: 2, idView: require("../../assets/imagebox/m3.jpg") },
        { idx: 3, idView: require("../../assets/imagebox/m4.jpg") },
        { idx: 4, idView: require("../../assets/imagebox/m5.jpg") },
        { idx: 5, idView: require("../../assets/imagebox/m6.jpg") },
        { idx: 6, idView: require("../../assets/imagebox/m7.jpg") },
        { idx: 7, idView: require("../../assets/imagebox/m8.jpg") },
      ],
    };
  },
  computed: {
    /**
     * @param {number} idx first item of list
     * @param {number} offset
     * @return {string}
     */    
    movieName() {
      return function (idx, offset) {
        return this.movielist[idx + offset]["name"];
      };
    },
    /** 
     * @param {number} idx
     * @param {number} offset
     * @return {string} 
     */    
    movieImgSrc() {
      return function (idx, offset) {
        return this.imagebox[idx + offset]["idView"];
      };
    },
  },
  methods: {
    /**
     * @description: step=4
     * @param {*} imagebox
     * @return {*}
     */    
    even: function (imagebox) {
      return imagebox.filter(function (item) {
        return item.idx % 4 === 0;
      });
    },
    /**
     * 获取电影列表
     */    
    async getMovieList() {
      // 调用get请求
      const { data: res } = await this.$http.get("allMovie");
      this.movielist = res.data; // 将返回数据赋值
      this.total = res.numbers; // 总个数
    },
    /**
     * 添加关注电影
     * @param {number} mindex id = index + 1
     */    
    async addWatch(mindex) {
      const { data: res } = await this.$http.put(
        `addWatch?id=${this.id}&mid=${mindex + 1}`
      );
      if (res != "success") {
        return this.$message("已添加");
      }
      this.$message.success("添加成功！！！");
      this.getWatchList();
    },
  },
};
</script>
<style lang="less" scoped>
.title-div {
  //左侧div加布局
  display: flex;
  align-items: center;
  span {
    font-size: 40px;
    font-weight: bold;
    margin: 15px;
  }
}

@image_width: 160px;
@image_height: @image_width*1.5;
.image-box {
  width: @image_width;
  height: @image_height;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover; /*图片居中裁切*/
}

.movie-card {
  width: @image_width;
  height: 360px; // 400px
  background-color:rgba(73, 73, 73, 0.808);
  color: azure;
  border: 0px;
}

.movie-name {
  height: 45px;
  width: @image_width - 20px;
  text-align: left;
  font-weight: bold;
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  display: -webkit-box; /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
  -webkit-box-orient: vertical; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
  -webkit-line-clamp: 2; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
  overflow: hidden;
}
</style>