import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Help from "@/views/Help.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;