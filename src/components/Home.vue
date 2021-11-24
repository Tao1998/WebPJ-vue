<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/shoes.png" alt class="logo_img" />
        <span>运动管理平台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!--侧边布局-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!--伸缩按钮-->
        <div class="toggle-button" @click="toggleCollapase">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
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
        200: "iconfont icon-yundong",
        101: "iconfont icon-liebiao",
        102: "iconfont icon-mima",
        103: "iconfont icon-yundong",
        104: "iconfont icon-shangpin",
        201: "iconfont icon-shu",
        202: "iconfont icon-qialuli",
        203: "iconfont icon-shiwu",
        204: "iconfont icon-denglu",
      },
      isCollapse: false,
      // 被激活的连接
      activePath: "",
    };
  },
  // 类似onload
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath"); // 取出session里的访问路径
  },

  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的导航菜单
    async getMenuList() {
      // console.log("getMenuList");
      const { data: res } = await this.$http.get("menus");
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
  background-color: #373d41;
  display: flex;
  justify-content: space-between; // 左右贴边
  padding-left: 0%; // 左边界
  align-items: center; // 水平
  color: #fff;
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
  background-color: #333744;
  .el-menu {
    border-right: none; // 对其右边框
  }
}
.el-main {
  background-color: #eaedf1;
}

.logo_img {
  width: 20%;
  height: 100%;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer; // 显示鼠标指针为：小手
}
</style>
