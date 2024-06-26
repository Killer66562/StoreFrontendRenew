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
                path: "",
                component: () => import('../views/FullItemsPage.vue')
            },
            {
                path: ":itemId",
                component: () => import('../views/ItemDetailPage.vue'),
            }
        ]
    },
    {
        path: "/stores",
        children: [
            {
                path: ":storeId",
                component: () => import('../views/StorePage.vue')
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
        path: "/forget-password",
        component: () => import('../views/PasswordResetPage.vue')
    },
    {
        path: "/forget-password-confirm",
        component: () => import('../views/PasswordResetCodeConfirmPage.vue')
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
                component: () => import('../views/UserEditItemPage.vue'),
                path: "edit-item/:itemId"
            },
            {
                component: () => import('../views/UserStoreOrdersPage.vue'),
                path: "store-orders"
            },
            {
                component: () => import('../views/CreateItemReportPage.vue'),
                path: "create-item-report/:itemId"
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
            },
            {
                path: "item-reports",
                component: () => import('../views/AdminItemReportsPage.vue')
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