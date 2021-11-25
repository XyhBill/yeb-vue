<template>
  <div>
    <el-form v-loading="loading" :rules="rules" ref="loginForm" :model="loginForm" class="loginConainer">
      <h3 class="loginTittle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px; margin-right:5px"></el-input>
        <h3>{{loginForm.code}}</h3>
      </el-form-item>
      <el-checkbox v-model="ckecked" class="loginRemeber">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
// import { postRequest } from '../utils/api';
  export default {
    name: 'Login',
    data() {
      return {
        loading: false,
        // captchaUrl: '/captcha?time=' + new Date(),
        captchaUrl: '/captcha',
        loginForm: {
          username: 'admin',
          password: '123',
          code: '123',
        },
        ckecked: true,
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
        }
      }
    },
    methods: {
      submitLogin(){
        // const tokenStr = resp.obj.tokenHead+resp.obj.token
        // window.sessionStorage.setItem('tokenStr',tokenStr)
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true
            this.postRequest('/login',this.loginForm).then(resp => {
              if (resp) {
                this.loading = false
                const tokenStr = resp.obj.tokenHead + resp.obj.token
                window.sessionStorage.setItem('tokenStr',tokenStr)
                let path = this.$route.query.redirect
                this.$router.push((path == '/' || path == undefined) ? '/home' : path)
              }
            })
          } else {
            this.$message.error('错了哦，这是一条错误消息');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .loginConainer{
    border-radius: 15px;
    background-clip: border-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .loginTittle{
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .loginRemeber{
    text-align: left;
    margin: 0px 0px 15px 0px;
  }
  .el-form-item__content{
    display: flex;
    align-items: center;
  }
</style>