<!--
 * @Descripttion: 
 * @version: 
 * @Author: Bruce
 * @Date: 2021-11-24 16:36:20
 * @LastEditors: Bruce
 * @LastEditTime: 2021-12-05 21:26:03
-->
<template>
  <div>
    <el-card>
      <!-- 电影列表 -->
      <el-table :data="watchlist" border stripe>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="导演" prop="director"></el-table-column>
        <el-table-column label="地区" prop="region"></el-table-column>
        <el-table-column label="年份" prop="year"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除 -->
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteWatch(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
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
    this.id = window.sessionStorage.getItem("id");
    this.getWatchList();
  },
  data() {
    return {
      // 请求数据
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5,
      },

      id: 0, // 用户id
      watchlist: [], // 想看电影列表

      total: 0, // 最大数据记录
    };
  },
  methods: {
    /**
     * 获取关注电影列表
     */
    async getWatchList() {
      // 调用get请求
      const { data: res } = await this.$http.get("allWatch", {
        params: {
          query: this.queryInfo.query,
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize,
          id: this.id,
        },
      });
      this.watchlist = res.data; // 将返回数据赋值
      this.total = res.numbers; // 总个数
    },
    /**
     * 监听pageSize改变的事件
     */
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getWatchList(); // 数据发生改变重新申请数据
    },
    /**
     * 监听pageNum改变的事件
     */
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getWatchList(); // 数据发生改变重新申请数据
    },
    /**
     * @description: 删除关注电影
     * @param {*} mid id of movie
     */
    async deleteWatch(mid) {
      console.log("movie id = " + mid);
      const { data: res } = await this.$http.delete(
        `deleteWatch?id=${this.id}&mid=${mid}`
      );
      if (res != "success") {
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
      this.getWatchList();
    },
  },
};
</script>
<style lang="less" scoped>
</style>