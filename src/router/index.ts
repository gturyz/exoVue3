import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/home"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/pages/register"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login"),
    },
  ],
});

export default router;
