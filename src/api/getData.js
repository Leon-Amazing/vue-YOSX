import graphql from "@/searchGraphql/search.graphql";

//  获取临时的TmpSecretID、TmpSecretKey、SessionToken
export const getUpload = that => {
  return new Promise(resolve => {
    that.$apollo
      .query({
        query: graphql.getUpload,
        variables: {
          Model: "40101",
          Token: "notoken",
          IndiSocialId: "6632843858368800000"
        }
      })
      .then(res => {
        resolve(res, "返回结果");
      })
      .catch(err => {
        console.log(err);
      });
  });
};

// 增加、删除员工信息(员工管理)
export const createUserInfo = (that, data) => {
  return new Promise(resolve => {
    that.$apollo
      .mutate({
        mutation: graphql.create_User_Info,
        variables: {
          IndiSocialId: "6632843858368800000", //公司
          IndiOwnerId: data.IndiOwnerId, // 个人的ID
          IndiSort: "", // 分类id :公司、个人
          IndiBirthdayImg1: "", //上传腾讯云返回的身份证正面名字
          IndiBirthdayImg2: "", // 上传腾讯云返回的身份证反面名字
          IndiDocumentPhoto: "", //上传腾讯云返回的身份证（营业执照）照片名字
          IndiTruename: data.IndiTruename, //名称（真实姓名、单位名称)+++
          IndiBirthday: data.IndiBirthday, //身份证编号（营业执照号）
          IndiMobile: data.IndiMobile, //手机号
          IndiPasswd: "", //密码
          IndiSharSellerName: data.IndiSharSellerName, //联系人
          IndiSharTelPhone: data.IndiSharTelPhone, //座机电话
          IndiSharProvinceId: "", //省、市、区、县、社区ID
          IndiSharAreaInfo: data.IndiSharAreaInfo, //详细地址（小区、栋、楼层、门号）
          IndiApprovalId: "", //审批人员id
          IndiArray: data.IndiArray, //排序
          IndiSex: data.IndiSex, //性别
          IndiName: data.IndiName, //昵称、简称
          IndiSpellInitial: "", //拼音字头
          IndiLoginMethod: "", //登录方式
          IndiLoginMethodId: "", //唯一id
          IndiQq: data.IndiQq, //qq
          IndiEmail: data.IndiEmail, //邮箱
          IndiAvatarImg22: data.IndiAvatarImg22, //头像ID（base64）(200200,300300)+++
          IndiAvatarImg88: "", //头像ID（base64）(800 * 800)
          IndiSocialDesc: "", //描述
          IndiPublicCoding: data.IndiPublicCoding, //会员对外编号---通过请求过来的8位编码+1+++工号
          IndiOutside: "false", //内部员工（true）还是外部员工（false）
          IndiApplycontent: "", //申请进社群内容
          IndiApplytime: "", //申请进社群时间
          IndiSignOut: "", //退群时间
          IndiState: data.IndiState, //用户状态
          IndiProductVerifyremark: "", //审核失败，违规原因
          IndiIsDeleted: "true", //删除标记
          indiGroupPublicCoding: "1001",
          Model: data.Model,
          Token: "notoken"
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        resolve(err);
      });
  });
};
// 修改员工信息(员工管理)
export const modifyUserInfo = (that, data) => {
  return new Promise(resolve => {
    that.$apollo
      .mutate({
        mutation: graphql.create_User_Info,
        variables: {
          IndiSocialId: "6632843858368800000", //公司
          IndiOwnerId: data.IndiOwnerId, // 个人的ID
          IndiSort: "NULL", // 分类id :公司、个人
          IndiBirthdayImg1: "NULL", //上传腾讯云返回的身份证正面名字
          IndiBirthdayImg2: "NULL", // 上传腾讯云返回的身份证反面名字
          IndiDocumentPhoto: "NULL", //上传腾讯云返回的身份证（营业执照）照片名字
          IndiTruename: data.IndiTruename, //名称（真实姓名、单位名称)+++
          IndiBirthday: data.IndiBirthday, //身份证编号（营业执照号）
          IndiMobile: data.IndiMobile, //手机号
          IndiPasswd: "NULL", //密码
          IndiSharSellerName: data.IndiSharSellerName, //联系人
          IndiSharTelPhone: data.IndiSharTelPhone, //座机电话
          IndiSharProvinceId: "NULL", //省、市、区、县、社区ID
          IndiSharAreaInfo: data.IndiSharAreaInfo, //详细地址（小区、栋、楼层、门号）
          IndiApprovalId: "NULL", //审批人员id
          IndiArray: data.IndiArray, //排序
          IndiSex: data.IndiSex, //性别
          IndiName: data.IndiName, //昵称、简称
          IndiSpellInitial: "NULL", //拼音字头
          IndiLoginMethod: "NULL", //登录方式
          IndiLoginMethodId: "NULL", //唯一id
          IndiQq: data.IndiQq, //qq
          IndiEmail: data.IndiEmail, //邮箱
          IndiAvatarImg22: data.IndiAvatarImg22, //头像ID（base64）(200200,300300)+++
          IndiAvatarImg88: "NULL", //头像ID（base64）(800 * 800)
          IndiSocialDesc: "NULL", //描述
          IndiPublicCoding: data.IndiPublicCoding, //会员对外编号---通过请求过来的8位编码+1+++工号
          IndiOutside: "NULL", //内部员工（true）还是外部员工（false）
          IndiApplycontent: "NULL", //申请进社群内容
          IndiApplytime: "NULL", //申请进社群时间
          IndiSignOut: "NULL", //退群时间
          IndiState: data.IndiState, //用户状态
          IndiProductVerifyremark: "NULL", //审核失败，违规原因
          IndiIsDeleted: "NULL", //删除标记
          indiGroupPublicCoding: "NULL",
          Model: "30101",
          Token: "notoken"
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        resolve(err);
      });
  });
};
// 用户基本信息回选(员工管理)
export const getUserInfo = (that, data) => {
  return new Promise(resolve => {
    that.$apollo
      .query({
        query: graphql.user_info,
        variables: {
          IndiSocialId: "6632843858368800000",
          IndiOwnerId: "",
          IndiTruename: "",
          IndiName: "",
          IndiSpellInitial: "",
          IndiSort: "",
          IndiSex: "",
          IndiBirthday: "",
          IndiPublicCoding: "",
          IndiLoginMethod: "",
          IndiLoginMethodId: "",
          IndiMobile: "",
          IndiEmail: "",
          IndiQq: "",
          IndiApplytime: "",
          IndiSignOut: "",
          IndiState: data, // 0正常用户，1000非正常用户，100销户
          IndiOutside: "",
          IndiApprovalId: "",
          Limit: "",
          Offset: "",
          IndiSharSellerName: "",
          IndiSharTelPhone: "",
          IndiSharProvinceId: "",
          IndiSharAreaInfo: "",
          indiGroupPublicCoding: "",
          Model: "41101",
          Token: "notoken"
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        resolve(err);
      });
  });
};

// 用户状态回选\水表性质\
export const userStatus = (that, data) => {
  return new Promise(resolve => {
    that.$apollo
      .query({
        query: graphql.user_status,
        variables: {
          IndiSocialId: "6632843858368800000",
          /*(1)行业id(行业id) */

          IndiAttributesClassId: data,
          /*(3)属性分类 */

          IndiAttributesId: "",
          /*(4)属性id */

          IndiAttributesName: "",
          Model: "40101",
          Token: "notoken"
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        resolve(err);
      });
  });
};

// 用水查询语句(员工管理)
export const waterNature = (that, data) => {
  return new Promise(resolve => {
    that.$apollo
      .query({
        query: graphql.water_nature,
        variables: {
          IndiSocialId: "6632843858368800000",
          IndiOwnerId: data,
          GoodId: "",
          GoodArray: "",
          LadderrateA: "",
          DosageA: "",
          LadderrateB: "",
          DosageB: "",
          LadderrateC: "",
          DosageC: "",
          LadderrateD: "",
          DosageD: "",
          RuleTime: "",
          Ifeffective: "",
          Remark: "",
          GoodName: "",
          GoodNameLogogram: "",
          GoodUnitId: "",
          Model: "40102",
          Token: "notoken"
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        resolve(err);
      });
  });
};

// 增加职务、职称、工作内容、权限(员工管理)
export const addUserPowerInfo = (that, obj) => {
  return new Promise(resolve => {
    that.$apollo
      .mutate({
        mutation: graphql.add_User_Power_Info,
        variables: {
          IndiSocialId: "6632843858368800000", //公司
          IndiOwnerId: obj.IndiOwnerId, // 个人的ID
          IndiAttributesClassId: obj.IndiAttributesClassId, // 类别-数组
          IndiAttributesId: obj.IndiAttributesId, // 自己对应的2-3位码
          Model: "10101",
          Token: "notoken"
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        resolve(err);
      });
  });
};
// 务、职称、工作内容、权限查询语句(员工管理)
export const getUserPowerInfo = (that, obj) => {
  return new Promise(resolve => {
    that.$apollo
      .query({
        query: graphql.get_User_power_Info,
        variables: {
          IndiSocialId: "6632843858368800000",
          IndiOwnerId: obj.IndiOwnerId,
          IndiAttributesClassId: "",
          IndiAttributesId: "",
          IndiAttributeArray: "",
          IndiAttributeIf: "",
          Model: "40101",
          Token: "notoken"
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        resolve(err);
      });
  });
};
