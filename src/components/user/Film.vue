<template>
  <div>
    <span class="demonstration">Click 指示器触发</span>
    <el-carousel trigger="click" height="400px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small" align="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-card>
      <!-- 电影列表 -->
      <el-table :data="movielist" border stripe>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="导演" prop="director"></el-table-column>
        <el-table-column label="地区" prop="region"></el-table-column>
        <el-table-column label="年份" prop="year"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 5, 20, 100]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
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
      movielist: [], // 电影列表

      total: 0, // 最大数据记录
    };
  },
  methods: {
    async getMovieList() {
      // 调用get请求
      const { data: res } = await this.$http.get("allMovie", {
        params: this.queryInfo,
      });
      this.movielist = res.data; // 将返回数据赋值
      this.total = res.numbers; // 总个数
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getMovieList(); // 数据发生改变重新申请数据
    },
    // 监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getMovieList(); // 数据发生改变重新申请数据
    },
  },
};
</script>
<style lang="less">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>