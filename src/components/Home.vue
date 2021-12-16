<!--
 * @Descripttion: 
 * @version: 
 * @Author: Bruce
 * @Date: 2021-11-18 16:27:25
 * @LastEditors: Bruce
 * @LastEditTime: 2021-12-16 16:03:21
-->
<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <!-- <img src="../assets/shoes.png" alt class="logo_img" /> -->
        <span>MoviePlayform</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!--侧边布局-->
      <el-aside :width="isCollapse ? '64px' : '160px'">
        <!--伸缩按钮-->
        <div class="toggle-button" @click="toggleCollapase">|||</div>
        <el-menu
          background-color="#3c3c3c"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="$route.path"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObject[item.id]"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="it.path + ''"
              v-for="it in item.slist"
              :key="it.id"
              @click="saveNavState(it.path + '')"
            >
              <template slot="title">
                <i :class="iconsObject[it.id]"></i>
                <span>{{ it.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      // 左侧菜单
      menuList: [],
      iconsObject: {
        100: "iconfont icon-guanliyuan",
        200: "iconfont icon-movie",
        101: "iconfont icon-liebiao",
        102: "iconfont icon-mima",
        201: "iconfont icon-hot",
        202: "iconfont icon-shu",
      },
      isCollapse: true,
      // 被激活的连接
      activePath: "",
    };
  },
  // 类似onload
  created() {
    this.getMenuList();
    // this.getMenuListByRole();
    this.activePath = window.sessionStorage.getItem("activePath"); // 取出session里的访问路径
  },

  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // // 获取所有的导航菜单
    // async getMenuList() {
    //   // console.log("getMenuList");
    //   const { data: res } = await this.$http.get("menus");
    //   if (res.flag != 200) return this.$message.error("操作失败！！！");
    //   this.menuList = res.menus;
    // },

    // 根据角色获取所有的导航菜单
    async getMenuList() {
      console.log("getMenuListByRole");
      const role = window.sessionStorage.getItem("role");
      let roleID;
      switch (role) {
        case '超级管理员':
        case '普通管理员':
          roleID = 100;          
          break;
        case '普通用户':
          roleID = 200;
          break;
        default:
          break;
      }
      const { data: res } = await this.$http.get("menusByRole?roleID=" + roleID);
      if (res.flag != 200) return this.$message.error("操作失败！！！");
      this.menuList = res.menus;
    },
    // 切换菜单折叠与展开
    toggleCollapase() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存二级菜单的路径
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath); // 存放点击的二级菜单
      this.activePath = activePath; // 给点击的菜单添加高亮
    },
  },
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #333333;
  display: flex;
  justify-content: space-between; // 左右贴边
  padding-left: 0%; // 左边界
  align-items: center; // 水平
  color: #dddddd;
  font-size: 20px;
  > div {
    //左侧div加布局
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #3c3c3c;
  .el-menu {
    border-right: none; // 对其右边框
  }
}
.el-main {
  background-color: #000000;
}

.logo_img {
  width: 20%;
  height: 100%;
}

.toggle-button {
  background-color: rgba(73, 73, 73, 0.808);
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer; // 显示鼠标指针为：小手
}
</style>
