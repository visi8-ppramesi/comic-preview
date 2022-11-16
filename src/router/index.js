import { createWebHistory, createRouter } from "vue-router";
import emitter from "@/utils/emitter.js";
import fbAnalytics from '@/utils/analytics.js'

// const authorRoutes = [
//     {
//         path: "/author/:id",
//         name: "Author",
//         component: () => import("@/pages/Author.vue"),
//         meta: {
//             showNav: true,
//             class: "Author"
//         }
//     },
//     {
//         path: "/authors",
//         name: "Authors",
//         component: () => import("@/pages/Authors.vue"),
//         meta: {
//             showNav: true,
//             class: "Author"
//         }
//     }
// ]

// const authRoutes = [
//     {
//         path: "/login",
//         name: "Login",
//         component: () => import("@/pages/Login.vue"),
//         meta: {
//             showNav: false,
//             requiresLoggedOut: true,
//             class: "Auth"
//         }
//     },
//     {
//         path: "/logout",
//         name: "Logout",
//         component: () => import("@/pages/Logout.vue"),
//         meta: {
//             showNav: false,
//             requiresAuth: true,
//             class: "Auth"
//         }
//     },
//     {
//         path: "/register",
//         name: "Register",
//         component: () => import("@/pages/Register.vue"),
//         meta: {
//             showNav: false,
//             requiresLoggedOut: true,
//             class: "Auth"
//         }
//     },
// ]

// const mineRoutes = [
//     {
//         path: "/my-account",
//         name: "MyAccount",
//         component: () => import("@/pages/MyAccount.vue"),
//         meta: {
//             showNav: true,
//             requiresAuth: true,
//             class: "User"
//         }
//     },
//     {
//         path: "/my-comics",
//         name: "MyComics",
//         component: () => import("@/pages/MyComics.vue"),
//         meta: {
//             showNav: true,
//             requiresAuth: true,
//             class: "User"
//         }
//     },
//     {
//         path: "/my-profile",
//         name: "MyProfile",
//         component: () => import("@/pages/MyProfile.vue"),
//         meta: {
//             showNav: true,
//             requiresAuth: true,
//             class: "User"
//         }
//     },
//     {
//         path: "/my-transactions",
//         name: "MyTransactions",
//         component: () => import("@/pages/MyTransactions.vue"),
//         meta: {
//             showNav: true,
//             requiresAuth: true,
//             class: "User"
//         }
//     },
//     {
//         path: "/my-notifications",
//         name: "MyNotifications",
//         component: () => import("@/pages/MyNotifications.vue"),
//         meta: {
//             showNav: true,
//             requiresAuth: true,
//             class: "User"
//         }
//     },
//     {
//         path: "/user/:id",
//         name: "User",
//         component: () => import("@/pages/User.vue"),
//         meta: {
//             showNav: true,
//             class: "User"
//         }
//     },
// ]

const infoRoutes = [
    // {
    //     path: "/about-us",
    //     name: "AboutUs",
    //     component: () => import("@/pages/AboutUs.vue"),
    //     meta: {
    //         showNav: true,
    //         class: "WebAppInfo"
    //     }
    // },
    {
        path: "/privacy-policy",
        name: "PrivacyPolicy",
        component: () => import("@/pages/PrivacyPolicy.vue"),
        meta: {
            showNav: true,
            class: "WebAppInfo"
        }
    },
    {
        path: "/terms-service",
        name: "TermsOfService",
        component: () => import("@/pages/TermsOfService.vue"),
        meta: {
            showNav: true,
            class: "WebAppInfo"
        }
    },
    {
        path: "/faq",
        name: "FAQ",
        component: () => import("@/pages/FAQ.vue"),
        meta: {
            showNav: true,
            class: "WebAppInfo"
        }
    },
]

const comicsRoutes = [
    {
        path: "/comic/:id",
        name: "Comic",
        component: () => import("@/pages/Comic.vue"),
        meta: {
            showNav: true,
            class: "Comic"
        }
    },
    {
        path: "/comics",
        name: "Comics",
        component: () => import("@/pages/Comics.vue"),
        meta: {
            showNav: true,
            class: "Comic"
        }
    },
    {
        path: "/comic/:comicId/chapter/:chapterId",
        name: "Chapter",
        component: () => import("@/pages/Chapter.vue"),
        meta: {
            showNav: true,
            class: "Comic"
        }
    },
    {
        path: "/comic/:comicId/chapter/:chapterId/page/:pageId",
        name: "Page",
        component: () => import("@/pages/Scene.vue"),
        meta: {
            showNav: true,
            class: "Comic"
        }
    },
    {
        path: "/comic/:comicId/chapter/:chapterId/page/:pageId/scene/:sceneId",
        name: "Scene",
        component: () => import("@/pages/ArScene.vue"),
        meta: {
            showNav: true,
            class: "Comic"
        }
    }
]

export const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: () => import("@/pages/Dashboard.vue"),
        meta: {
            showNav: true,
            showTopNav: false,
            class: "Home"
        }
    },
    // {
    //     path: "/test",
    //     name: "Test",
    //     component: () => import("@/pages/Test.vue"),
    //     meta: {
    //         showNav: true,
    //         class: "Dev"
    //     }
    // },
    // {
    //     path: "/search",
    //     name: "Search",
    //     component: () => import("@/pages/Search.vue"),
    //     meta: {
    //         showNav: true,
    //         class: "Search"
    //     }
    // },
    // ...authorRoutes,
    // ...authRoutes,
    ...infoRoutes,
    ...comicsRoutes,
    // ...mineRoutes,
    {
        path: '/contact-us',
        name: "ContactUs",
        component: () => import("@/pages/ContactUs.vue"),
        meta: {
            showNav: true,
            class: "ContactUs"
        }
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("@/pages/NotFound.vue"), meta: { showNav: true, class: "WebAppInfo" } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    //eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        if(to?.name && to.name === 'Chapter'){
            return { top: 0 }
        }
        //eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ top: 0, behavior: 'smooth' })
            }, 100)
        })
      // always scroll to top
        // return { 
        //     top: 0,
        //     behavior: 'smooth'
        // }
    },
});

router.beforeEach((to, from, next) => {
    const screenViewParams = {
        firebase_screen: to.name, 
        firebase_screen_class: routes.find(v => v.name == to.name).meta.class,
    }
    if(to.params){
        screenViewParams.params = to.params
    }
    fbAnalytics.logEvent('screen_view', screenViewParams)
    if(from.name && from.name !== 'Logout' && from.name !== 'Login' && from.name !== 'Register'){
        const fromRoute = {
            name: from.name,
            params: from.params,
            query: from.query
        }
        localStorage.setItem('fromRoute', JSON.stringify(fromRoute))
    }
    
    emitter.emit('navigate')
    const loggedIn = localStorage.getItem('uid')
  
    if(to.meta.requiresLoggedOut && !!loggedIn){
      return next('/')
    }
  
    if (to.meta.requiresAuth && !loggedIn) {
      return next('/login');
    }
  
    next();
  });

export default router;