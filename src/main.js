import Vue from "vue";
import App from "./App.vue";
import router from "./router";
require("./mock");
Vue.config.productionTip = false;

//引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//引入请求相关
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
Vue.use(VueApollo);
//创建ApolloClient实例
const apolloClient = new ApolloClient({
  // 这里使用绝对路径
  uri: "http://192.168.31.228:8085/graphql"
  // uri: "http://api.tern.video:8085/graphql"
});
//Provider 保存了可以在接下来被所有子组件使用的 Apollo 客户端实例。
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

//引入axios全局注册
import axios from "axios";
Vue.prototype.$axios = axios;

// 注册指令，全局指令
Vue.directive("my-drag", {
  bind(el, binding) {
    el.onmousedown = function(ev) {
      var disX = ev.clientX - this.offsetLeft;
      var disY = ev.clientY - this.offsetTop;
      document.onmousemove = function(ev) {
        var L = ev.clientX - disX;
        var T = ev.clientY - disY;
        if (binding.modifiers["x"]) {
          el.style.left = L + "px";
          el.style.top = "0px";
        } else if (binding.modifiers["y"]) {
          el.style.left = "0px";
          el.style.top = T + "px";
        } else {
          el.style.left = L + "px";
          el.style.top = T + "px";
        }
      };
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
