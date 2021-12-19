<!--
 * @Descripttion: 
 * @version: 
 * @Author: Bruce
 * @Date: 2021-12-19 13:00:00
 * @LastEditors: Bruce
 * @LastEditTime: 2021-12-19 15:17:50
-->
<template>
  <el-carousel
    v-if="movielist.length"
    indicator-position="none"
    trigger="click"
    height="400px"
    :autoplay="false"
    :loop="false"
    class="movie-carousel"
  >
    <!-- v-if 等获取movielist之后渲染 -->
    <el-carousel-item
      class="movie-list"
      v-for="(idx, index) in even(total, step)"
      :key="index"
    >
      <el-card
        class="movie-card"
        :body-style="{ padding: '0px' }"
        v-for="(value, offset) in step"
        :key="value"
      >
        <div class="image-box">
          <img :src="movieImgSrc(idx, offset)" class="image" />
        </div>
        <div>
          <div class="movie-name">{{ movieName(idx, offset) }}</div>
          <div style="padding: 10px" align="center">
            <!-- 添加 -->
            <el-tooltip
              effect="dark"
              content="添加"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" plain @click="addMovie(idx + offset)"
                >+ Watchlist</el-button
              >
            </el-tooltip>
          </div>
        </div>
      </el-card>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
    //   total: 8, // 电影总数
    //   step: 4, // 电影列表每页展示数量
    };
  },
  props: {
      movielist: {
          type: Array,
          required: true
      },
      step: {
          type: Number,
          default: 4
      },
      total: {
          type: Number,
          default: 8
      }
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
     * @param {number} total 
     * @param {number} step 
     * @return {*}
     */
    even(total, step) {
      total = total || 8;
      step = step || 4;
      return [...new Array(total).keys()].filter(function (n) {
        return n % step === 0;
      });
    },
    /**
     * 添加关注电影
     * @param {number} mindex id = index + 1
     */
    addMovie(mindex) {
      this.$emit('addWatchMovie', mindex + 1) // mid = mindex + 1
    },
  },
};
</script>
<style lang="less" scoped>
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