<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <!--头像-->
                <img src="../assets/logo.png" alt />
            </div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login_form" label-width="0px">
      
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-denglu-copy"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-mima"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>           
                </el-form-item>
            </el-form>
        
        </div>
    </div>
</template>

<script>
import { getRoutesOfRole } from "../router/index";

export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "密码为 6~8 位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {

        if (!valid) return;
        // 调用get请求
        const {data :res} = await this.$http.post("login", this.loginForm); // 访问后台
        if (res.flag == "ok") {
          window.sessionStorage.setItem('flag','ok'); // session 放置

          console.log(res.user.role)
          // 获取后台传过来的 role，这里暂且设置为 普通用户
          const role = '普通用户'
          window.sessionStorage.setItem('role', role); // session 放置

          // 根据用户角色筛选出该用户可访问的路由列表
          const routes = getRoutesOfRole([role])
          // 打印这个列表
          console.log(role ,"可以访问以下路由", routes);

          // 打印一下当前 router 可访问的路由列表
          console.log("添加角色路由之前", this.$router.getRoutes());

          // 把刚才筛选出来的，该角色可访问的路由表添加进 router
          this.$router.addRoutes(routes);

          // 添加之后，打印一下现在的 router，看看是不是添加进来了
          console.log("添加角色路由之后", this.$router.getRoutes());

          this.$message.success("登陆成功！！！");          
          this.$router.push({ path: "/home"});
        }else{
          this.$message.error("登录失败！！！");
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
    // 跟节点样式
    .login_container {
    background-color: #2b4b6b;
    height: 100%;
    }

    .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    }

    .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #eee;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%; // 加圆角
      background-color: #eee;
    }
    }

    .btns {
    display: flex;// 弹性布局
    justify-content: flex-end; // 尾部对齐
  }
  .login_form {
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;// 设置边框
  }
</style>
