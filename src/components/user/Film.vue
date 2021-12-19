<!--
 * @Descripttion: 
 * @version: 
 * @Author: Bruce
 * @Date: 2021-11-24 16:24:21
 * @LastEditors: Bruce
 * @LastEditTime: 2021-12-19 15:05:47
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
    <movie-card :movielist="movielist" @addWatchMovie="addWatch"></movie-card>
  </div>
</template>
<script>
import movieCard from "../../components/moviecard/moviecard.vue";
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
  components: { "movie-card": movieCard},
  methods: {
    /**
     * 获取电影列表
     */
    async getMovieList() {
      const { data: res } = await this.$http.get("allMovie"); // 调用get请求
      this.movielist = res.data; // 将返回数据赋值
      this.total = res.numbers; // 总个数
    },
    /**
     * 添加关注电影
     * @param {number} mid
     */
    async addWatch(mid){
      const { data: res } = await this.$http.put(
        `addWatch?id=${this.id}&mid=${mid}`
      );
      if (res != "success") {
        return this.$message("已添加");
      }
      this.$message.success("添加成功！！！");
    }
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

.movie-carousel {
  width: 900px;
  margin: 0 auto;
}

@image_width: 160px;
@image_height: @image_width*1.5;

.movie-list {
  height: 380px;
  // background: #fff;
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