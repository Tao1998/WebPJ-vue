<!--
 * @Descripttion: 
 * @version: 
 * @Author: Bruce
 * @Date: 2021-11-21 16:06:45
 * @LastEditors: Bruce
 * @LastEditTime: 2021-12-05 21:20:17
-->
<template>
  <div>
    <!-- 面包屑导航
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 卡片视图区 -->
    <el-card>
      <el-row :gutter="25">
        <el-col :span="10">
          <!-- 搜索添加 -->
          <el-input
            placeholder="请输入搜索内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表 border边框 stripe隔行变色-->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="状态" prop="state">
          <!-- scope.row 就是当前行的信息 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-tooltip
              effect="dark"
              content="修改用户信息"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip
              effect="dark"
              content="删除用户"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteUser(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 权限 -->
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="showRoleDialog(scope.row.id)"
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
        :page-sizes="[1, 2, 5, 100]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 创建新用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>
      <!-- 内容底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @colse="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
          <!-- disabled无法编辑 -->
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改权限对话框 -->
    <el-dialog
      title="修改用户权限"
      :visible.sync="roleDialogVisible"
      width="50%"
      @colse="roleDialogClosed"
    >
      <el-form :model="roleForm" ref="roleFormRef" label-width="70px">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="roleForm.username" disabled></el-input>
          <!-- disabled无法编辑 -->
        </el-form-item>
        <!-- 角色 -->
        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="roleForm.role">
            <el-radio label="超级管理员"></el-radio>
            <el-radio label="普通管理员"></el-radio>
            <el-radio label="普通用户"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    this.getUserList();
  },
  data() {
    return {
      // 请求数据
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5,
      },
      userlist: [], // 用户列表

      total: 0, // 最大数据记录
      addDialogVisible: false, // 对话框显示
      // 添加用户表单项
      addForm: {
        username: "",
        password: "",
        email: "",
      },
      // 修改用户信息
      editForm: {},
      // 控制修改用户对话框显示/隐藏
      editDialogVisible: false,
      // 修改用户信息
      roleForm: {},
      // 控制修改用户角色显示/隐藏
      roleDialogVisible: false,
      // 验证规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确邮箱地址", trigger: "blur" },
        ],
      },
      // 修改用户表单验证规则
      editFormRules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确邮箱地址", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /**
     * 获取用户列表
     */
    async getUserList() {
      // 调用post请求
      const { data: res } = await this.$http.get("allUser", {
        params: this.queryInfo,
      });
      this.userlist = res.data; // 将返回数据赋值
      this.total = res.numbers; // 总个数
    },
    /**
     * 监听pageSize改变的事件
     */
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList(); // 数据发生改变重新申请数据
    },
    /**
     * 监听pageNum改变的事件
     */
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList(); // 数据发生改变重新申请数据
    },
    /**
     * 修改用户状态
     */
    async userStateChanged(userinfo) {
      const { data: res } = await this.$http.put(
        `updateState?id=${userinfo.id}&state=${userinfo.state}`
      );
      if (res != "success") {
        userinfo.state = !userinfo.state;
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
    },
    /**
     * 监听添加用户
     */
    addDialogClosed() {
      this.$refs.addFormRef.resetFields(); // 重置表单项
    },
    /**
     * 添加用户
     */
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        // 发起请求
        const { data: res } = await this.$http.post("addUser", this.addForm);
        if (res != "success") {
          userinfo.state = !userinfo.state;
          return this.$message.error("操作失败！！！");
        }
        this.$message.success("操作成功！！！");
        //隐藏
        this.addDialogVisible = false;
        this.getUserList();
      });
    },
    /**
     * 展示修改框
     */
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("getUpdate?id=" + id);
      this.editForm = res;
      this.editDialogVisible = true;
    },
    /**
     * 关闭修改框
     */
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    /**
     * 确认修改
     */
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.put("editUser", this.editForm);
        if (res != "success") return this.$message.error("操作失败！！！");
        this.$message.success("操作成功！！！");
        //隐藏
        this.editDialogVisible = false;
        this.getUserList();
      });
    },
    /**
     * 删除用户
     * @param id user id
     */
    async deleteUser(id) {
      // 弹框
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 成功删除为confirm 取消为 cancel
      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("deleteUser?id=" + id);
      if (res != "success") {
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
      this.getUserList();
    },
    /**
     * 展示修改角色框
     * @param id user id
     */
    async showRoleDialog(id) {
      const { data: res } = await this.$http.get("getUpdate?id=" + id);
      this.roleForm = res;
      this.roleDialogVisible = true;
    },
    /**
     * 关闭修改角色框
     */
    roleDialogClosed() {
      this.$refs.roleFormRef.resetFields();
    },
    /**
     * 确认修改角色
     */    
    async editRole() {
      const { data: res } = await this.$http.put(
        `updateRole?id=${this.roleForm.id}&role=${this.roleForm.role}`
      );
      if (res != "success") {
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
      this.roleDialogVisible = false; //隐藏
      this.getUserList();
    },
  },
};
</script>
<style lang="less" scoped>
</style>