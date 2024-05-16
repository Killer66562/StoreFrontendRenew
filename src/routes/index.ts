import { createRouter, RouteRecordRaw, RouterOptions, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import('../views/HomePage.vue')
    },
    /*
    {
        path: "/test",
        component: () => import('../views/TestPage.vue')
    },
    {
        path: "/items",
        children: [
            {
                path: ":itemId",
                component: () => import('../views/ItemDetailView.vue')
            }
        ]
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
    {
        path: "/register",
        component: () => import('../views/RegisterPageView.vue')
    },
    */
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
            /*
            {
                path: "orders",
                component: () => import('../views/UserOrdersPageView.vue')
            },
            {
                path: "create-store",
                component: () => import('../views/UserCreateStoreView.vue')
            },
            {
                path: "add-item",
                component: () => import('../views/UserStoreAddItemView.vue')
            },
            {
                path: "cart-items",
                component: () => import('../views/UserCartItemsView.vue')
            },
            {
                path: "buy-next-time-items",
                component: () => import('../views/UserBNTItemsPageView.vue')
            }
            */
        ]
    },
    /*
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
    }
    */
];

const options: RouterOptions = {
    history: createWebHashHistory(),
    routes: routes,
}

const _router = createRouter(options);

export const router = _router;