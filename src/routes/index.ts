import { createRouter, RouteRecordRaw, RouterOptions, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import('../views/HomePage.vue')
    },
    {
        path: "/items",
        children: [
            {
                path: ":itemId",
                component: () => import('../views/ItemDetailPage.vue')
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
            }
        ]
    },
    {
        path: "/404",
        component: () => import('../views/NotFoundPage.vue')
    }
];

const options: RouterOptions = {
    history: createWebHashHistory(),
    routes: routes,
}

const _router = createRouter(options);

export const router = _router;