import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import HttpClient from "@/services/HttpClient";
HttpClient.getInstance();

const app = createApp(App);

app.use(router);

app.mount("#app");
