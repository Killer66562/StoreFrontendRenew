import { createRouter, RouteRecordRaw, RouterOptions, createWebHashHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: HomePage,
        meta: {
            KeepAlive: true
        }
    },
    {
        path: "/items",
        children: [
            {
                path: ":itemId",
                component: () => import('../views/ItemDetailPage.vue'),
            }
        ]
    },
    /*
    {
        path: "/test",
        component: () => import('../views/TestPage.vue')
    },
    {
        path: "/stores",
        children: [
            {
                path: ":storeId",
                component: () => import('../views/StorePageView.vue')
            }
        ]
    },
    */
    {
        path: "/register",
        component: () => import('../views/RegisterPage.vue')
    },
    {
        path: "/login",
        component: () => import('../views/LoginPage.vue')
    },
    {
        path: "/user",
        children: [
            {
                path: "",
                component: () => import('../views/UserInfoPage.vue')
            },
            {
                path: "store",
                component: () => import('../views/UserStorePage.vue'),
                props: true
            },
            {
                path: "create-store",
                component: () => import('../views/UserCreateStorePage.vue')
            },
            {
                path: "orders",
                component: () => import('../views/UserOrdersPage.vue')
            },
            /*
            {
                path: "add-item",
                component: () => import('../views/UserStoreAddItemView.vue')
            },
            */
            {
                path: "cart-items",
                component: () => import('../views/UserCartItemsPage.vue')
            },
            
            {
                path: "liked-items",
                component: () => import('../views/UserLikedItemsPage.vue')
            },
            {
                component: () => import('../views/UserStoreCreateItemPage.vue'),
                path: "create-item"
            },
            {
                component: () => import('../views/UserOrderSendPage.vue'),
                path: "create-orders"
            },
            {
                component: () => import('../views/UserStoreOrdersPage.vue'),
                path: "store-orders"
            }
        ]
    },
    {
        path: "/admin",
        children: [
            {
                path: "cities",
                component: () => import('../views/AdminCityPage.vue')
            },
            {
                path: "districts",
                component: () => import('../views/AdminDistrictPage.vue')
            },
            {
                path: "users",
                component: () => import('../views/AdminUsersPage.vue')
            }
        ]
    },
    {
        path: "/404",
        component: () => import('../views/NotFoundPage.vue')
    }
];

const options: RouterOptions = {
    history: createWebHashHistory(import.meta.env.VITE_APP_BASE),
    routes: routes,
}

const _router = createRouter(options);

export const router = _router;