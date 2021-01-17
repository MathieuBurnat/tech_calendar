import { createWebHistory, createRouter } from "vue-router";
import PageNotFound from "@/views/errors/PageNotFound.vue";
import Home from "@/views/Home.vue";
import PickACalender from "@/views/PickACalender.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import NewCalendar from "@/views/NewCalendar.vue";
import Calendar from "@/views/Calendar.vue";
import EditCase from "@/views/EditCase.vue";
import EditType from "@/views/EditType.vue";
import About from "@/views/About.vue";
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import TestData from "@/views/TestData.vue";

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
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/newcalendar",
    name: "NewCalendar",
    component: NewCalendar,
  },
  {
    path: "/pickacalendar",
    name: "PickACalender",
    component: PickACalender,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/editcase",
    name: "EditCase",
    component: EditCase,
  },
  {
    path: "/edittype",
    name: "EditType",
    component: EditType,
  },
  { //dev-options (go to the header)
    path: "/dev-header",
    name: "Header",
    component: Header,
  },
  { //dev-options (go to the footer)
    path: "/dev-footer",
    name: "Footer",
    component: Footer,
  },
  { //dev-options (go to a mongo test page)
    path: "/dev-test-data",
    name: "TestData",
    component: TestData,
  },
  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;