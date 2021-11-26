<template>
  <div>
    <div>
      <el-input v-model="jl.name" placeholder="添加职称等级..." prefix-icon="el-icon-plus" style="width: 300px"></el-input>
      <el-select size="small" v-model="jl.tittleLevel" placeholder="请选择">
        <el-option
          v-for="item in tittleLevels" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    <el-button type="primary" icon="el-icon-plus" size="small" @click="addJobLevel">添加</el-button>
    </div>
    <div>
      <el-table :data="jls" border stripe style="width: 54%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id"  label="编号"  width="50"></el-table-column>
        <el-table-column prop="name"  label="职称名称"  width="150"></el-table-column>
        <el-table-column prop="tittleLevel"  label="职称等级"  width="150"></el-table-column>
        <el-table-column prop="createDate"  label="创建日期"  width="150"></el-table-column>
        <el-table-column prop="enabled"  label="是否启用"  width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
            <el-tag v-else type="danger">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditView(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="small" :disabled="this.multipleSelection.length==0" type="danger" @click="deleteMany">批量删除</el-button>
    </div>
    <el-dialog title="编辑职称" :visible.sync="dialogVisible" width="30%">
      <table>
        <tr>
          <td><el-tag>职称名称</el-tag></td>
          <td>
            <el-input v-model="updateJl.name" size="small"></el-input>
          </td>
        </tr>
        <tr>
          <td><el-tag>职称等级</el-tag></td>
          <td>
            <el-select size="small" v-model="updateJl.tittleLevel" placeholder="请选择">
              <el-option
                v-for="item in tittleLevels" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td><el-tag>是否启用</el-tag></td>
          <td>
            <el-switch style="display: block" v-model="updateJl.enabled" active-color="#13ce66" inactive-color="#ff4949" active-text="已启用" inactive-text="未启用">
            </el-switch>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'JoblevelMana',
    data() {
      return {
        jl: {
          name: '',
          tittleLevel: ''
        },
        tittleLevels:[
          '正高级',
          '副高级',
          '中级',
          '初级',
          '员级'
        ],
        jls:[],
        updateJl: {
          name: '',
          tittleLevel: '',
          enabled: false
        },
        dialogVisible: false,
        multipleSelection: []
      }
    },
    mounted () {
      this.initJls()
    },
    methods: {
      deleteMany(){
        this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条职称, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let ids = []
            this.multipleSelection.forEach(item=>{
              ids.push(item.id)
            })
            console.log(ids)
            this.deleteRequest('/system/basic/joblevel' , ids).then(resp=> {
              console.log("🚀 ~ file: PosMana.vue ~ line 65 ~ this.deleteRequest ~ resp", resp)
              if (resp) {
                this.initJls()
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleSelectionChange(val){
        this.multipleSelection = val
      },
      doUpdate(){
        this.putRequest('/system/basic/joblevel',this.updateJl).then(resp=>{
          if (resp) {
            console.log("🚀 ~ file: JoblevelMana.vue ~ line 110 ~ this.putRequest ~ resp", resp)
            this.dialogVisible = false
            this.initJls()
          }
        })
      },
      showEditView(data){
        Object.assign(this.updateJl,data)
        this.updateJl.createDate = ''
        this.dialogVisible = true
      },
      handleDelete(data){
        this.$confirm('此操作将永久删除[' + data.name + ']职位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/system/basic/joblevel', data.id).then(resp=>{
            if (resp) {
              this.initJls()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      addJobLevel(){
        console.log(this.jl)
        if (this.jl.name && this.jl.tittleLevel) {
          console.log("111")
          this.postRequest('/system/basic/joblevel',this.jl).then(reps=>{
            if (resp) {
              this.initJls()
            }
          })
        } else {
              this.$message.error('字段不能为空')
        }
      },
      initJls(){
        this.getRequest('/system/basic/joblevel').then(resp=>{
          if (resp) {
            this.jls = resp
            this.jl.name = ''
            this.jl.tittleLevel = ''
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>