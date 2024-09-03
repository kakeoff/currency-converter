import { RouteRecordRaw } from "vue-router";
import ConvertView from "./views/ConvertView.vue";
import HomeView from "./views/HomeView.vue";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView },
  { path: "/convert", component: ConvertView },
];
