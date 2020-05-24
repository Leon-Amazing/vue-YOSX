const Mock = require("mockjs");
//格式： Mock.mock( url, post/get , 返回的数据)；
Mock.mock("/table/tableInfo", "get", require("./tableData"));
