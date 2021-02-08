import homeRoute from "./homeRoute.js"
import todoRoute from "./todoRoute.js"
import {
    createWebHistory,
    createRouter
} from "vue-router"
const routes = [
    ...homeRoute, ...todoRoute
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router