import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Organisation from "../views/Organisation.vue";
import EditOrganisation from "../views/EditOrganisation";
import UserOrganisation from "../views/UserOrganisation";
import Logout from "../views/Logout";
import OrganisationShifts from "../views/OrganisationShifts";

const routes = [
  {
    path: "/organisationShifts/:id",
    name: "/organisationShifts",
    component: OrganisationShifts,
  },

  {
    path: "/logout",
    name: "/logout",
    component: Logout,
  },

  {
    path: "/userOrganisation/:id",
    name: "/userOrganisation",
    component: UserOrganisation,
  },

  {
    path: "/editOrganisation/:id",
    name: "editOrganisation",
    component: EditOrganisation,
  },

  {
    path: "/organisation",
    name: "organisation",
    component: Organisation,
  },

  {
    path: "/login",
    name: "login",
    component: Login,
  },

  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
