<template>
    <div class= "login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avater_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->  <!--重置表单就为这个表单添加一个ref引用，值就是组件的实例对象-->                                           <!--:rules绑定校验规则-->
            <el-form ref="loginFormRef" label-width="0px" :model="loginForm" :rules="loginFormRules" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">   <!--prop 验证规则生效-->
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetloginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      //   这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //   这是表单的验证规则对象
      loginFormRules: {
        //   验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //   点击重置按钮，重置登录表单
    resetloginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      // 获取表单的引用对象，拿表单的引用对象来调用validate
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        // result返回的是一个promise，可以用await和async来简化这次promise操作 ，await只能放在async中
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 调用一个API，把登陆成功之后的token保存到客户端的sessionStorage
        window.sessionStorage.setItem('token', res.data.token)
        // 登录成功后跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
    transform:translate(-50%,-50%);
}
.avater_box {
    height: 130px;
    width: 130px;
    border:1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform:translate(-50%,-50%);
    background-color: #fff;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding:0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>
