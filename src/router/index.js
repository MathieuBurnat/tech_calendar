import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Help from "@/views/Help.vue";
import PageNotFound from "@/views/errors/PageNotFound.vue";
import TestData from "@/views/test-dataVue/TestData.vue";
import New from "@/views/test-dataVue/New.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/help",
    name: "Help",
    component: Help,
  },
  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  },
  {
    path: "/test-data",
    name: "testData",
    component: TestData,
  },
  {
    path: "/test-data/new",
    name: "new-testData",
    component: New,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;