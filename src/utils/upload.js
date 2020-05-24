//  SDK 依赖引入
import COS from "cos-js-sdk-v5";
import SnowflakeId from "snowflake-id";
import { getUpload } from "@/api/getData";
//  图片上传
export const uploadImg = (that, selectedFile) => {
  return new Promise(resolve => {
    getUpload(that).then(res => {
      let data = res.data.GraphServerInquire;
      // 获得临时的TmpSecretID、TmpSecretKey、SessionToken
      if (!selectedFile) return;
      console.log(selectedFile, "文件对象");
      // 初始化实例 生成签名
      var cos = new COS({
        SecretId: data.TmpSecretID, // 临时的TmpSecretID
        SecretKey: data.TmpSecretKey, // 临时的TmpSecretKey
        XCosSecurityToken: data.SessionToken // 临时的SessionToken
      });
      const getID = () => {
        // 雪花算法获取19位图片名字
        var snowflake = new SnowflakeId();
        return snowflake.generate();
      };
      const getName = () => {
        // 获取图片的后缀
        console.log(selectedFile.name);
        let arrName = selectedFile.name.split(".");
        console.log(arrName);
        return arrName[1];
      };
      let key = getID() + "." + getName();
      cos.putObject(
        {
          // 上传文件的配置
          Bucket: "text1-1300121906", // 容器，存储桶列表名称
          Region: "ap-chengdu", // 地区
          Key: key, // 上传文件名
          StorageClass: "STANDARD", // 存储的方式
          Body: selectedFile, // 上传文件的对象
          onProgress: function(progressData) {
            console.log(JSON.stringify(progressData));
          }
        },
        function(err, data) {
          // statusCode为200时说明文件上传成功
          if (data.statusCode == 200) {
            let imgCode = data.Location.split("/");
            console.log(imgCode);
            resolve(imgCode[1]);
          }
          console.log(err || data);
          console.log(data.Location);
        }
      );
    });
  });
};
//  处理图片回显
export const returnImg = (that, imgCode) => {
  return new Promise(resolve => {
    getUpload(that).then(res => {
      let data = res.data.GraphServerInquire;
      let cos = new COS({
        SecretId: data.TmpSecretID, // 临时的TmpSecretID
        SecretKey: data.TmpSecretKey, // 临时的TmpSecretKey
        XCosSecurityToken: data.SessionToken // 临时的SessionToken
      });
      let url = cos.getObjectUrl({
        /* 获得图片的url地址 */
        Bucket: "text1-1300121906" /* 容器，存储桶列表名称 */,
        Region: "ap-chengdu" /* 存储桶所在地域，必须字段 */,
        Key: imgCode /* 下载文件的名字必须 */
      });
      resolve(url);
    });
  });
};

//  上传头像删除上一次的图片
export const deleteImg = (that, imgCode) => {
  return new Promise(resolve => {
    getUpload(that).then(res => {
      let data = res.data.GraphServerInquire;
      let cos = new COS({
        SecretId: data.TmpSecretID, // 临时的TmpSecretID
        SecretKey: data.TmpSecretKey, // 临时的TmpSecretKey
        XCosSecurityToken: data.SessionToken // 临时的SessionToken
      });
      cos.deleteObject(
        {
          /* 获得图片的url地址 */
          Bucket: "text1-1300121906" /* 容器，存储桶列表名称 */,
          Region: "ap-chengdu" /* 存储桶所在地域，必须字段 */,
          Key: imgCode /* 下载文件的名字必须 */
        },
        function(err, data) {
          console.log(err || data);
        }
      );
      resolve("删除成功");
    });
  });
};
