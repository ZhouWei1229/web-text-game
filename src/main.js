import { createApp } from "vue";
import App from "./App.vue";
import store from "./store"; // 导入 Vuex store
import router from "./router"; // 导入 Vue Router 配置
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import "../src/style.scss";
const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(store);

app.mount("#app");
