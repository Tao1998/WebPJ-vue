<!--
 * @Descripttion: 
 * @version: 
 * @Author: Bruce
 * @Date: 2021-11-24 16:24:21
 * @LastEditors: Bruce
 * @LastEditTime: 2021-12-16 21:00:32
-->
<template>
  <div>
    <el-carousel :interval="5000" trigger="click" height="360px">
      <el-carousel-item v-for="item in post" :key="item.idx" align="center">
        <img :src="item.imgSrc" height="100%" />
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
        class="movie-list"
        v-for="(item,idx) in even()"
        :key="idx"
      >
        <el-card
          class="movie-card"
          :body-style="{ padding: '0px' }"
          v-for="(value, offset) in 4"
          :key="value"
        >
          <div class="image-box">
            <img :src="movieImgSrc(idx, offset)" class="image" />
          </div>
          <div>
            <div class="movie-name">{{ movieName(idx, offset) }}</div>
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
                  @click="addWatch(idx + offset)"
                  >+ Watchlist</el-button
                >
              </el-tooltip>
            </div>
          </div>
        </el-card>
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

      total: 0, // 电影总数
      step: 4, // 电影列表每页展示数量

      post: [
        { idx: 0, imgSrc: "/post/m1.jpg" },
        { idx: 1, imgSrc: "/post/m2.jpg" },
        { idx: 2, imgSrc: "/post/m3.jpg" },
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
        return this.movielist[idx + offset]["imgSrc"];
      };
    },
  },
  methods: {
    /**
     * @description: step=4
     * @return {*}
     */    
    even() {
      return [...new Array(this.total).keys()].filter(function (n) {
        return n % 4 === 0;
      });
    },
    /**
     * 获取电影列表
     */
    async getMovieList() {
      const { data: res } = await this.$http.get("allMovie");// 调用get请求
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

.image {
  width: 100%;
  height: 100%;
  object-fit: cover; /*图片居中裁切*/
}

@image_width: 160px;
@image_height: @image_width*1.5;

.movie-list {
  height: 380px;
  background: #fff;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .movie-card {
    max-width: @image_width;
    min-width: @image_width;
    height: 360px; // 400px
    // box-shadow: 0 0 5px #ddd;
    background-color: rgba(73, 73, 73, 0.808);
    color: azure;
    border: 0px;
    .image-box {
      width: @image_width;
      height: @image_height;
    }
    .movie-name {
      height: 45px;
      width: @image_width - 20px;
      text-align: left;
      font-weight: bold;
      padding: 10px 10px 0 10px;
      display: -webkit-box; /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
      -webkit-box-orient: vertical; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
      -webkit-line-clamp: 2; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
      overflow: hidden;
    }
  }
}
</style>