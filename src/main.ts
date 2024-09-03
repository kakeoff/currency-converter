import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./index.css";
import { routes } from "./routes";

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(pinia).mount("#app");
