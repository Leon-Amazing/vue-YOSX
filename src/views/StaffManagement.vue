<template>
  <div class="StaffManagement">
    <!-------------- 用户管理 ------------------->
    <el-row>
      <el-col :span="24">
        <div class="table">
          <div class="user_management_content" id="waterContent">
            <!-------打印 --------->
            <span class="icon">
              <span @click="dialogVisible3 = true">
                <i class="el-icon-printer"></i>打印
              </span>
              <span @click="dialogVisible4 = true">
                <i class="el-icon-share"></i>导出
              </span>
            </span>
            <el-table
              :data="
                water_tableData.slice(
                  (currentPage - 1) * pagesize,
                  currentPage * pagesize
                )
              "
              border
              stripe
              style="width: 100%"
              :row-style="{ height: '20px' }"
              :header-row-style="{ height: '20px' }"
              :cell-style="{ padding: '5px' }"
              ref="multipleTable"
              :row-key="getRowKeys"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                :reserve-selection="true"
                prop="IndiArray"
                align="center"
                width="65"
              >
              </el-table-column>
              <el-table-column
                prop="IndiArray"
                label="序号"
                width="55"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="IndiPublicCoding"
                label="用户编码"
                width="95"
                header-align="center"
                align="right"
              >
              </el-table-column>
              <el-table-column
                prop="IndiTruename"
                label="用户名"
                :fit="true"
                header-align="center"
                align="left"
              >
              </el-table-column>
              <el-table-column
                prop="IndiSharAreaInfo"
                label="用户地址"
                width="230"
                header-align="center"
                align="left"
              >
              </el-table-column>
              <el-table-column
                prop="IndiMobile"
                label="用户手机"
                width="120"
                header-align="center"
                align="left"
              >
              </el-table-column>
              <el-table-column
                prop="IndiSharTelPhone"
                label="用户电话"
                width="160"
                header-align="center"
                align="left"
              >
              </el-table-column>
              <el-table-column
                prop="IndiState"
                label="用户状态"
                width="90"
                header-align="center"
                align="center"
              >
              </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top: 20px;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageLength"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-------------------------打印----------------------->
    <el-dialog :visible.sync="dialogVisible3" width="40%">
      <template slot="title">打印项目</template>
      <span class="title-h5" style="line-height:35px;">
        <i class="el-icon-edit"></i>
        打印哪些数据
      </span>
      <div>
        <el-radio v-model="print_radio" label="1" @change="selected"
          >当前筛选的数据（{{ multipleSelection.length }}条）</el-radio
        >
        <el-radio v-model="print_radio" label="2" @change="selected"
          >全部数据（{{ water_tableData.length }}条）</el-radio
        >
      </div>
      <div style="margin-top:30px;">
        <span class="title-h5" style="line-height:35px;">
          <i class="el-icon-printer"></i>
          打印哪些字段
        </span>
        <el-row>
          <el-col>
            <el-checkbox
              :label="item.text"
              border
              v-model="item.check"
              size="medium"
              v-for="(item, index) in cities"
              :key="index"
            ></el-checkbox>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="print" size="small">开始打印</el-button>
      </span>
    </el-dialog>
    <!--------------------------导出--------------------->
    <el-dialog :visible.sync="dialogVisible4" width="40%">
      <template slot="title">导出项目</template>
      <span class="title-h5" style="line-height:35px;margin-top:20px;">
        <i class="el-icon-edit"></i>
        导出哪些数据
      </span>
      <div>
        <el-radio v-model="print_radio" label="1" @change="selected"
          >当前筛选的数据（{{ multipleSelection.length }}条）</el-radio
        >
        <el-radio v-model="print_radio" label="2" @change="selected"
          >全部数据（{{ water_tableData.length }}条）</el-radio
        >
      </div>
      <div style="margin-top:30px;">
        <span class="title-h5" style="line-height:35px;">
          <i class="el-icon-document"></i>
          导出哪些字段
        </span>
        <el-row>
          <el-col>
            <el-checkbox
              :label="item.text"
              v-model="item.check"
              border
              size="medium"
              v-for="(item, index) in cities"
              :key="index"
            ></el-checkbox>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="small" @click="exportTable"
          >开始导出</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import print from "print-js";
export default {
  name: "StaffManagement",
  inject: ["reload"], //从App.vue注入-实现页面无空白刷新
  components: {
    // smUpload
  },
  data() {
    return {
      //打印的相关数据
      dialogVisible3: false,
      dialogVisible4: false,
      print_radio: "1",
      cities: [
        {
          text: "序号",
          check: true
        },
        {
          text: "用户编码",
          check: true
        },
        {
          text: "用户名",
          check: true
        },
        {
          text: "用户地址",
          check: true
        },
        {
          text: "用户手机",
          check: true
        },
        {
          text: "用户电话",
          check: true
        },
        {
          text: "用户状态",
          check: true
        }
      ],
      printData: [], // 要打印的数据
      confirmField: [], // 要打印字段
      multipleSelection: [], //按需打印的数据
      // 提供选择的打印字段
      properties: [
        {
          field: "IndiArray",
          displayName: "序号"
        },
        {
          field: "IndiPublicCoding",
          displayName: "用户编码"
        },
        {
          field: "IndiTruename",
          displayName: "用户名"
        },
        {
          field: "IndiSharAreaInfo",
          displayName: "用户地址"
        },
        {
          field: "IndiMobile",
          displayName: "用户手机"
        },
        {
          field: "IndiSharTelPhone",
          displayName: "用户电话"
        },
        {
          field: "IndiState",
          displayName: "用户状态"
        }
      ],
      // 分页相关数据
      pageLength: 0, //表格总的条数
      currentPage4: 1,
      pagesize: 10, //一页多少条
      currentPage: 1, //当前页
      removeCompaniesNameList: [], //删除的数据
      //表格数据
      water_tableData: []
    };
  },
  created() {
    this.$axios
      .get("/table/tableInfo")
      .then(res => {
        this.water_tableData = res.data.data;
        this.pageLength = this.water_tableData.length;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // 切换页数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 选择、全选
    handleSelectionChange(rows) {
      console.log(rows, "选择的");
      this.multipleSelection = [];
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.multipleSelection.push(row);
          }
        });
      }
    },
    getRowKeys(row) {
      return row.IndiArray;
    },
    // ----------打印---------
    selected(value) {
      console.log(value);
    },
    print() {
      if (this.print_radio === "1") {
        this.printData = this.multipleSelection;
      } else {
        this.printData = this.water_tableData;
      }
      this.confirmField = [];
      if (this.printData == undefined) {
        this.$message.error("错误，请筛选需要打印的数据，或选全部数据");
        return;
      }
      this.dialogVisible3 = false;
      console.log(this.printData, "查看数据");
      console.log(this.properties, "查看打印字段");
      this.cities.forEach((item, index) => {
        if (item.check == true) {
          this.confirmField.push(this.properties[index]);
        }
      });
      const style =
        "@media print { td {text-align: center; height: 50px;  } th {height:38px; }}";
      // eslint-disable-next-line no-undef
      printJS({
        printable: this.printData,
        properties: this.confirmField,
        header: "用户基本信息",
        type: "json",
        style: style
      });
    },
    //---------excel导出--------
    exportTable() {
      // this.totals为需要导出的数量
      // this.DefaultData.exportExcelMax限制一下导出的总条数
      if (this.print_radio === "1") {
        this.printData = this.multipleSelection;
      } else {
        this.printData = this.water_tableData;
      }
      if (this.printData == undefined) {
        this.$message.error("错误，请筛选需要导出的数据，或选择全部数据");
        return;
      }
      this.dialogVisible4 = false;
      if (this.printData.length <= 1000) {
        this.$confirm(
          "确定要导出当前<strong>" +
            this.printData.length +
            "</strong>条数据？",
          "提示",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
          .then(() => {
            this.getExpportData();
          })
          .catch(() => {});
      } else {
        this.$confirm(
          "当前要导出的<strong>" +
            this.printData.length +
            "</strong>条数据，数据量过大，不能一次导出！<br/>建议分时间段导出所需数据。",
          "提示",
          {
            dangerouslyUseHTMLString: true,
            showCancelButton: false
          }
        )
          .then(() => {})
          .catch(() => {});
      }
    },
    // 对导出数据格式处理
    formatJson(filterVal, jsonData) {
      console.log(filterVal, jsonData);
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 导出的列表数据
    getExpportData() {
      const loading = this.$loading({
        lock: true,
        text: "正在导出，请稍等......",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      if (this.printData.length > 0) {
        require.ensure([], () => {
          /* eslint-disable */
            // 这里的径路要修改正确
            const { export_json_to_excel } = require("../vendor/Export2Excel");
            /* eslint-enable  */
          // 导出的表头
          let tHeader = [];
          // 导出表头要对应的数据
          let filterVal = [];
          // 循环添加需要导出相关字段
          this.cities.forEach((item, index) => {
            if (item.check == true) {
              tHeader.push(this.properties[index].displayName);
              filterVal.push(this.properties[index].field);
            }
          });
          // 如果对导出的数据没有可处理的需求，把下面的handleDataList换成res.data.list即可，删掉上面相应的代码
          const data = this.formatJson(filterVal, this.printData);
          // this.DefaultData.formatLongDate.getNow()自己写的一个获取当前时间，方便查找导出后的文件。根据需求自行可处理。
          export_json_to_excel(tHeader, data);
          this.$message({
            message: "导出成功",
            duration: 2000,
            type: "success"
          });
        });
      } else {
        this.$message({
          message: "数据出錯，请联系管理员",
          duration: 2000,
          type: "warning"
        });
      }
      loading.close();
    }
  }
};
</script>
<style lang="less" scoped>
// 工作内容和权限
.work_content .choice {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
  display: inline-block;
  line-height: 0.5;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  font-weight: 500;
  line-height: 30px;
  padding: 0px;
  padding-right: 5px;
  font-size: 12px;
  border-radius: 4px;
  margin-left: 5px;
  margin-top: 5px;
  .normal {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
    display: inline-block;
    border-radius: 4px 0 0 4px;
    width: 10px;
    &:hover {
      background: rgb(59, 188, 197);
      border-color: rgb(59, 188, 197);
    }
    font {
      color: transparent;
    }
  }
  .color {
    color: #ecf5ff;
    background: rgb(59, 188, 197);
    border-color: rgb(59, 188, 197);
  }
}
.jurisdiction .choice {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
  display: inline-block;
  line-height: 0.5;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  font-weight: 500;
  line-height: 30px;
  padding: 0px;
  padding-right: 5px;
  font-size: 12px;
  border-radius: 4px;
  margin-left: 5px;
  margin-top: 5px;
  .normal {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
    display: inline-block;
    border-radius: 4px 0 0 4px;
    width: 10px;
    &:hover {
      background: rgb(59, 188, 197);
      border-color: rgb(59, 188, 197);
    }
    font {
      color: transparent;
    }
  }
  .color {
    color: #ecf5ff;
    background: rgb(59, 188, 197);
    border-color: rgb(59, 188, 197);
  }
}
//员工基本信息
.deletePw {
  margin-top: 30px;
  border-bottom: 1px solid;
  color: #409eff;
  width: 96px;
  &:hover {
    color: rgb(7, 72, 95);
  }
}
/*新建基础信息*/
.new_user {
  font-size: 16px;
  display: inline-block;
  padding: 30px;
  padding-bottom: 100px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: auto;
  backface-visibility: hidden;
  z-index: 999;
  width: 800px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .common {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 180px;
    position: absolute;
    left: 50px;
    z-index: 9999;
  }
  .btn {
    bottom: 20px;
    margin-top: 45px;
    margin-right: 50px;
    span {
      margin-left: 20px;
      &:nth-child(1) {
        margin-left: 400px;
      }
    }
  }
}
/*新建用水性质*/
.new_waterNatureTable {
  font-size: 16px;
  display: inline-block;
  padding: 30px;
  padding-bottom: 100px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: auto;
  backface-visibility: hidden;
  z-index: 999;
  width: 900px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .add {
    button {
      color: #fff;
      background: rgb(67, 106, 204);
      border: none;
      margin-top: 20px;
      line-height: 25px;
      font-size: 13px;
      padding: 5px 10px;
      border-radius: 4px;
      &:hover {
        color: #000;
        background: rgb(201, 206, 223);
        border-color: rgb(201, 206, 223);
      }
    }
  }
  .total_content {
    margin-top: 10px;
  }
  .contentData {
    position: relative;
    span {
      position: absolute;
      top: 58px;
    }
    .first {
      position: absolute;
    }
    .demo-input-suffix {
      margin-top: 22px;
      font {
        margin-left: 40px;
      }
    }
  }
}
.companies {
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 5px;
  .title {
    color: rgb(43, 14, 14);
  }
}
.companiesName .choice {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
  display: inline-block;
  line-height: 0.5;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  font-weight: 500;
  padding: 6px;
  font-size: 12px;
  border-radius: 4px;
  margin-left: 5px;
  margin-top: 5px;
  i {
    margin-left: 5px;
  }
}
.companiesName button.active {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
.table {
  margin-top: 20px;
  button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
    margin-left: 10px;
  }
  .submit {
    background-color: rgb(44, 62, 80);
    color: #fff;
    border-color: rgb(44, 62, 80);
  }
  .water {
    background-color: rgb(106, 212, 191);
    color: #fff;
    border-color: rgb(106, 212, 191);
  }
  .save {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
    line-height: 10px;
    font-size: 10px;
    padding: 5px;
    &:hover {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
  }
  .icon {
    font-size: 15px;
    span {
      margin-left: 10px;
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .user_management_content {
    // width: 1420px;
    margin: 50px auto;
    position: relative;
    .description {
      color: #ccc;
      font-size: 14px;
      position: absolute;
      left: 0;
    }
    .moveLocation {
      color: #000;
      background-color: aliceblue;
      display: inline-block;
      width: 25px;
      line-height: 25px;
      margin-left: 3px;
      border-radius: 4px;
      &:hover {
        background-color: rgb(34, 51, 148);
        color: aliceblue;
      }
    }
    .addProject {
      width: 30px;
      height: 30px;
      padding: 3px;
      border-radius: 4px;
      color: #fff;
      margin-left: 5px;
      background-color: rgb(10, 150, 179);
      &:hover {
        cursor: pointer;
        color: #000;
        background-color: rgb(160, 198, 206);
      }
    }
    .opera1 {
      margin-left: 5px;
      color: #409eff;
    }
    .opera1:hover {
      color: #000;
      cursor: pointer;
    }
    .waterTitle {
      color: rgb(67, 106, 204);
      font-size: 15px;
      font-weight: bold;
      position: absolute;
      left: 5px;
      top: -40px;
      .el-icon-user-solid {
        color: rgb(67, 106, 204);
      }
      .save {
        color: #fff;
        background: rgb(59, 188, 197);
        border-color: rgb(59, 188, 197);
        line-height: 25px;
        font-size: 13px;
        padding: 0 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        &:hover {
          color: #000;
          background: rgb(177, 234, 238);
          border-color: rgb(177, 234, 238);
        }
      }
      .location {
        color: #fff;
        background: rgb(154, 152, 101);
        border-color: rgb(154, 152, 101);
        line-height: 25px;
        font-size: 13px;
        padding: 0 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        &:hover {
          color: #000;
          background: rgb(235, 233, 175);
          border-color: rgb(235, 233, 175);
        }
      }
      .add {
        color: #fff;
        background: rgb(67, 106, 204);
        border-color: rgb(67, 106, 204);
        line-height: 25px;
        font-size: 13px;
        padding: 0 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        &:hover {
          color: #000;
          background: #ecf5ff;
          border-color: #b3d8ff;
        }
      }
    }
    .icon {
      position: absolute;
      right: 10px;
      top: -40px;
      .common {
        color: #fff;
        line-height: 25px;
        font-size: 13px;
        padding: 0 20px;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      .normal {
        background: #67c23a;
        border-color: #67c23a;
        &:hover {
          color: #000;
          background: rgb(189, 223, 173);
          border-color: rgb(189, 223, 173);
        }
      }
      .unused {
        background: #e6a23c;
        border-color: #e6a23c;
        &:hover {
          color: #000;
          background: rgb(231, 223, 183);
          border-color: rgb(231, 223, 183);
        }
      }
      .logout {
        background: rgb(125, 125, 125);
        border-color: rgb(125, 125, 125);
        &:hover {
          color: #000;
          background: rgb(240, 209, 209);
          border-color: rgb(240, 209, 209);
        }
      }
      .unfinished {
        background: rgb(0, 178, 241);
        border-color: rgb(0, 178, 241);
        &:hover {
          color: #000;
          background: rgb(130, 177, 194);
          border-color: rgb(130, 177, 194);
        }
      }
      .finished {
        background: rgb(252, 211, 9);
        border-color: rgb(252, 211, 9);
        &:hover {
          color: #000;
          background: rgb(226, 212, 141);
          border-color: rgb(226, 212, 141);
        }
      }
    }
  }
}
/* ---------------复制过来的结构样式-------------*/
a {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
a:active {
  text-decoration: none;
}
/*
 * 修改el默认样式
 */
.el-radio__input.is-checked .el-radio__inner {
  border-color: #20a0ff;
  background: #fff;
}
.el-radio__input.is-checked .el-radio__inner::after {
  background: #20a0ff;
}
.el-form-item {
  margin-bottom: 10px;
}
.el-form-item__content {
  line-height: 22px;
}
/*
 * 分隔
 */
/*
 * 上传照片
 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 100px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
.up_img_text {
  height: 78px;
}
.enterprise {
  width: 150px;
}
/*
 * 上传照片分割
 */
.subnav {
  display: flex;
  flex-direction: row;
  font-size: 22px;
  font-weight: 300;
  line-height: 60px;
  color: rgba(115, 115, 203, 1);
  .water_meter {
    margin-left: 100px;
  }
  div {
    position: relative;
    cursor: pointer;
  }
  div::before {
    content: "";
    position: absolute;
    bottom: 0;
    height: 2px;
    width: 100%;
    background: rgba(115, 115, 203, 1);
  }
}
.basic_info {
  display: inline-block;
  position: relative;
  .icon {
    color: rgb(117, 136, 8);
    font-size: 20px;
    margin-right: 5px;
  }
  div {
    display: inline;
    font-weight: 300;
    color: rgba(115, 115, 203, 1);
  }
}
.basic_info::before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
  background: rgba(115, 115, 203, 1);
}
.information {
  span {
    color: #ccc;
  }
}
.waterMeter {
  position: relative;
  .waterNature {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 180px;
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 9999;
    ul {
      list-style: none;
      padding: 6px 0;
      margin: 0;
      box-sizing: border-box;
      li {
        font-size: 14px;
        padding: 0 20px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #606266;
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        cursor: pointer;
        text-align: left;
        &:hover {
          background-color: rgb(245, 247, 250);
        }
      }
    }
  }
  .waterNature {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 180px;
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 9999;
    ul {
      list-style: none;
      padding: 6px 0;
      margin: 0;
      box-sizing: border-box;
      li {
        font-size: 14px;
        padding: 0 20px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #606266;
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        cursor: pointer;
        text-align: left;
        &:hover {
          background-color: rgb(245, 247, 250);
        }
      }
    }
  }
}
.waterMeter .basic_info {
  .icon {
    color: rgb(0, 101, 59);
    font-size: 25px;
  }
}
/**上传身份证 */
.id_card {
  line-height: 20px;
  .title {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .id_card_row {
    display: flex;
    .avatar-uploader_right {
      margin-left: 20px;
    }
  }
}
/*
 *表单样式
 */
.img_info {
  margin-right: 20px;
  .img_text {
    line-height: 40px;
  }
  .main_img {
    width: 150px;
  }
}
.img_info {
  .max_img {
    width: 300px;
  }
}
.img_text {
  line-height: 40px;
}
.el-input {
  position: relative;
}
</style>
<style lang="less">
.el-input-group__prepend {
  background-color: #c0c4cc80;
  color: rgb(74, 78, 88);
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px 0 0 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}
.search_1 .el-input__inner {
  border-radius: 0;
}
.new_waterNatureTable .el-input__inner,
.new_user .el-input__inner {
  height: 35px;
  line-height: 35px;
}

.new_user .el-button {
  padding: 8px 12px;
}
.search .el-input__inner {
  text-align: left;
}
// 打印 导出样式
.el-dialog__header,
.el-dialog__body {
  text-align: left;
}
.el-dialog__header {
  padding: 10px 20px;
  color: #fff;
  background-color: rgb(120, 144, 156);
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
    position: relative;
    bottom: 8px;
  }
}
.el-dialog__body {
  padding: 15px;
  width: 800px;
  .el-checkbox.is-bordered.el-checkbox--medium {
    margin-left: 0;
    margin-bottom: 10px;
    width: 224px;
    height: 36px;
  }
}
.title-h5 .el-icon-edit:before,
.title-h5 .el-icon-printer:before,
.title-h5 .el-icon-document:before {
  font-size: 20px;
}

//上传头像
.departmentHead .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.departmentHead .el-upload:hover {
  border-color: #409eff;
}
.departmentHead-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px !important;
  text-align: center;
}
.depart {
  width: 60px;
  height: 60px;
  display: block;
}
.cell .demo-basic--circle {
  width: 36px;
  height: 36px;
}
.picturBlock {
  display: inline-block;
  margin-right: 10px;
}
</style>
