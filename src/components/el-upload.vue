<template>
  <div class="upload_content">
    <div class="img" v-if="url" style="width:200px;">
      <img :src="url" />
    </div>
    <el-upload
      v-else
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :limit="1"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="onChange"
      :multiple="true"
      style="border-style: none"
    >
      <div class="upload_img_text">
        <i class="el-icon-plus"></i>
        <span>{{ idCard.title }}</span>
      </div>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>

    <div class="deleteImg" v-if="url">
      <el-button type="primary" plain @click="deleteImg">
        删除图片
      </el-button>
    </div>
    <div class="cover" v-else>
      <el-button type="primary" plain @click="submit">
        {{ isSucess === true ? "上传成功" : "上传图片" }}
      </el-button>
    </div>
  </div>
</template>
<script>
// 引入gql
import gql from "graphql-tag";
//  SDK 依赖引入
import COS from "cos-js-sdk-v5";
// 引入雪花算法
import SnowflakeId from "snowflake-id";
export default {
  data() {
    return {
      isSucess: false, // 是否上传成功
      dialogImageUrl: "",
      dialogVisible: false,
      selectedFile: "",
      filename: "",
      data: "",
      key: "",
      url: "",
      imageName: "" // 上传之后的图片名字
    };
  },
  props: ["idCard"],
  watch: {
    idCard: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        console.log(newValue, "监听父组件传过来的值");
      }
    }
  },
  created() {
    // 从我们自己服务器请求得到临时的TmpSecretID、TmpSecretKey、SessionToken
    this.$apollo
      .query({
        query: gql`
          query($Model: String, $Token: String, $IndiSocialId: String) {
            GraphServerInquire(
              Model: $Model
              Token: $Token
              IndiSocialId: $IndiSocialId
            ) {
              SessionToken
              TmpSecretID
              TmpSecretKey
              ExpiredTime
            }
          }
        `,
        variables: {
          Model: "40101",
          Token: "notoken",
          IndiSocialId: "6632843858368800000"
        }
      })
      .then(res => {
        this.data = res.data.GraphServerInquire; // data保存请求得到临时的TmpSecretID、TmpSecretKey、SessionToken数据
        // 下载图片渲染到页面
        console.log(this.idCard.name, "渲染图片的名字");
        var cos = new COS({
          SecretId: this.data.TmpSecretID, // 临时的TmpSecretID
          SecretKey: this.data.TmpSecretKey, // 临时的TmpSecretKey
          XCosSecurityToken: this.data.SessionToken // 临时的SessionToken
        });
        this.url = cos.getObjectUrl({
          /* 获得图片的url地址 */
          Bucket: "text1-1300121906" /* 容器，存储桶列表名称 */,
          Region: "ap-chengdu" /* 存储桶所在地域，必须字段 */,
          Key: this.idCard.name /* 下载文件的名字必须 */
        });
        // if (this.url.indexOf("http") != -1) {
        //   this.url = "";
        // }
        console.log(this.url, "++++");
      })
      .catch(error => {
        console.log(error, "111");
      });
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.isSucess = false;
      this.imageName = "";
    },
    onChange(file, fileList) {
      console.log(file, fileList);
      this.selectedFile = file.raw; // 文件对象
      this.filename = this.selectedFile.name; // 一开始的文件名字
    },
    submit() {
      if (!this.selectedFile) return;
      if (this.imageName) return;
      let that = this;
      // 初始化实例 生成签名
      var cos = new COS({
        SecretId: this.data.TmpSecretID, // 临时的TmpSecretID
        SecretKey: this.data.TmpSecretKey, // 临时的TmpSecretKey
        XCosSecurityToken: this.data.SessionToken // 临时的SessionToken
      });
      this.key = this.getID() + "." + this.getName(); // 重新给文件取名字，保证不会重复
      // 上传文件到腾讯云的容器-Bucket
      cos.putObject(
        {
          // 上传文件的配置
          Bucket: "text1-1300121906", // 容器，存储桶列表名称
          Region: "ap-chengdu", // 地区
          Key: this.key, // 上传文件名
          StorageClass: "STANDARD", // 存储的方式
          Body: this.selectedFile, // 上传文件的对象
          onProgress: function(progressData) {
            console.log(JSON.stringify(progressData));
          }
        },
        function(err, data) {
          // statusCode为200时说明文件上传成功
          console.log(err || data);
          console.log(data.Location);
          let arr = data.Location.split("/");
          that.imageName = arr[1];
          if (that.imageName) that.isSucess = true;
          // 把图片名字和对应的Id传给父组件
          that.$emit("func", that.imageName, that.idCard.id);
        }
      );
    },
    deleteImg() {
      this.url = "";
      console.log(this.idCard.name);
      // 初始化实例 生成签名
      var cos = new COS({
        SecretId: this.data.TmpSecretID, // 临时的TmpSecretID
        SecretKey: this.data.TmpSecretKey, // 临时的TmpSecretKey
        XCosSecurityToken: this.data.SessionToken // 临时的SessionToken
      });
      cos.deleteObject(
        {
          Bucket: "text1-1300121906" /* 容器，存储桶列表名称 */,
          Region: "ap-chengdu" /* 存储桶所在地域，必须字段 */,
          Key: this.idCard.name /* 文件的名字必须 */
        },
        function(err, data) {
          console.log(err || data, "111");
        }
      );
    },
    getID() {
      // 雪花算法获取19位图片名字
      var snowflake = new SnowflakeId();
      return snowflake.generate();
    },
    getName() {
      // 获取图片的后缀
      let arrName = this.filename.split(".");
      return arrName[1];
    }
  }
};
</script>
<style lang="less" scoped>
.cover {
  width: 200px;
  height: 50px;
  background-color: #fff;
  position: absolute;
  top: 180px;
  padding-left: 25px;
  padding-top: 12px;
  z-index: 999;
}
.deleteImg {
  padding-left: 25px;
  padding-top: 12px;
}
.img {
  img {
    width: 148px;
    height: 176px;
    border-radius: 6px;
  }
}
.upload_content {
  height: 235px;
  overflow: hidden;
  position: relative;
}
.el-auto-upload--picture-card {
  line-height: 0;
}
.upload_img_text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  span {
    font-size: 16px;
    line-height: 16px;
    margin-top: 40px;
  }
}
</style>
<style lang="less">
.disabled {
  .el-upload--picture-card {
    display: none;
  }
}
.el-upload--picture-card {
  height: 178px;
  width: 150px;
}
.el-upload-list--picture-card {
  .el-upload-list__item {
    height: 178px;
    width: 150px;
  }
}
.idCard {
  .el-upload--picture-card {
    width: 300px;
  }
  .el-upload-list--picture-card {
    .el-upload-list__item {
      width: 300px;
      height: 178px;
    }
  }
}
.el-upload--picture-card {
  background: #fff;
}
.el-loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 0;
  top: 0;
}
</style>
