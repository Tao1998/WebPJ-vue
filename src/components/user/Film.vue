<template>
  <div>
    <div class="block">
      <el-carousel
        v-if="movielist.length"
        indicator-position="none"
        trigger="click"
        height="400px"
        interval="15000"
      >
        <!-- v-if 等获取movielist之后渲染 -->
        <el-carousel-item
          v-for="item in imagebox"
          :key="item.idx"
          align="center"
        >
          <el-card class="box-card" :body-style="{ padding: '0px' }">
            <div class="image-box">
              <img :src="item.idView" class="image" />
              <!-- <img :src="movielist[item.idx].imgSrc" class="image" /> -->
            </div>
            <div>
              <div class="movie-name">
                {{ movielist[item.idx]["name"] }}
              </div>
              <div style="padding: 10px">
                <!-- 添加 -->
                <el-tooltip
                  effect="dark"
                  content="添加"
                  placement="top-start"
                  :enterable="false"
                >
                  <el-button type="warning" plain @click="addWatch(item.idx)"
                    >watch</el-button
                  >
                </el-tooltip>
              </div>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>

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
  methods: {
    async getMovieList() {
      // 调用get请求
      const { data: res } = await this.$http.get("allMovie");
      this.movielist = res.data; // 将返回数据赋值
      this.total = res.numbers; // 总个数
    },
    // // 监听pageSize改变的事件
    // handleSizeChange(newSize) {
    //   this.queryInfo.pageSize = newSize;
    //   this.getMovieList(); // 数据发生改变重新申请数据
    // },
    // // 监听pageNum改变的事件
    // handleCurrentChange(newPage) {
    //   this.queryInfo.pageNum = newPage;
    //   this.getMovieList(); // 数据发生改变重新申请数据
    // },
    // 添加关注电影
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

@image_width: 160px;
@image_height: @image_width*1.5;
.image-box {
  width: @image_width;
  height: @image_height;
}

.image {
  /*设置图片高度和宽度*/
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.box-card {
  width: @image_width;
  height: 360px; // 400px
}

.movie-name {
  height: 45px;
  width: @image_width - 20px;
  text-align: left;
  font-weight: bold;
  background: yellowgreen;
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  display: -webkit-box; /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
  -webkit-box-orient: vertical; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
  -webkit-line-clamp: 2; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
  overflow: hidden;
}
</style>