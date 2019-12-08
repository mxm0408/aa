<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="生日" prop="pwd"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pages"
      :total="total"
      @current-change="Change"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      limit: 1,//第几页
      tableData: [],
      search: "",
      total:0,//总页数
      pages:2//一页2条
    };
  },
  created() {
    this.getDate()
  },
  methods: {
    getDate() {
      this.$axios.get("/api/limit",{params:{pagenum:this.limit,limit:this.pages}}).then(({ data }) => {
        this.tableData = data.msg;
        this.total=data.pages
      });
    },
    Change(index) {
      this.limit=index
      this.getDate()
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style>
</style>