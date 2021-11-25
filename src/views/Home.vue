<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="tittle">后台办公</div>
        <el-dropdown class="userInfo" @command="handleCommand">
          <span class="el-dropdown-link">
            {{user.name}}<i><img :src="user.userFace"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <el-submenu :index="index+''" v-for="(item,index) in routes" :key="index"  v-if="!item.hidden">
              <template slot="title">
                <i :class="item.iconCls" style="color: #1accff;margin-right: 5px"></i>
                <span>{{item.name}}</span>
              </template>
                <el-menu-item :index="children.path" v-for="(children,indexj) in item.children" :key="indexj">{{children.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb v-if="this.$router.currentRoute.path != '/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
            欢迎来到首页
          </div>
          <router-view class="homeRouterView"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        user: JSON.parse(window.sessionStorage.getItem('user'))
      }
    },
    methods: {
      handleCommand(command){
        if (command == 'logout') {
          this.$confirm('此操作将注销登录信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('/logout')
          window.sessionStorage.removeItem('user')
          window.sessionStorage.removeItem('token')
          this.$router.push('/');
          this.$store.commit('initRoutes',[])
        }).catch(() => {
          this.$message({
            type: 'info',
            message: ''
          });          
        });
          
        } 
      }
    },
    computed: {
      routes() {
        return this.$store.state.routes 
      }
    },
  }
</script>

<style scoped>
  .homeHeader{
    background: #409eff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    box-sizing: border-box;
  }
  .homeHeader .tittle{
    font-size: 30px;
    font-family: 宋体;
    color: white;
  }
  .homeHeader .userInfo{
    cursor: pointer;
  }
  .el-dropdown-link img{
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-left: 8px;
  }
  .homeWelcome {
    text-align: center;
    font-size: 30px;
    font-family: 华文楷体;
    color: #409eff;
    padding-top: 50px;
  }
  .homeRouterView{
    margin-top: 24px;
  }
</style>