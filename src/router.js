import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {x: 0, y: 0}
  },
  routes: [
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue')
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        },
      ]
    },
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            rule:2,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Ana Sayfa', active: true },
            ],
          }
        },
        {
          path: '/okulislemleri',
          name: 'okulislemleri',
          component: () => import('./views/School.vue'),
          meta: {
            rule:0,
            breadcrumb: [
              { title: '', url: '/' },
              { title: 'Okul İşlemleri', active: true },
            ],
          }
        },
        {
          path: '/ogretmenislemleri',
          name: 'ogretmenislemleri',
          component: () => import('./views/Teacher.vue'),
          meta: {
            rule:1,
            breadcrumb: [
              { title: '', url: '/' },
              { title: 'Öğretmen İşlemleri', active: true },
            ],
          }
        },
        {
          path: '/bransislemleri',
          name: 'bransislemleri',
          component: () => import('./views/Branch.vue'),
          meta: {
            rule:1,
            breadcrumb: [
              { title: '', url: '/' },
              { title: 'Branş İşlemleri', active: true },
            ],
          }
        },
        {
          path: '/bolumislemleri',
          name: 'bolumislemleri',
          component: () => import('./views/Department.vue'),
          meta: {
            rule:1,
            breadcrumb: [
              { title: '', url: '/' },
              { title: 'Bölüm İşlemleri', active: true },
            ],
          }
        },
      ],
    },

    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

export default router
