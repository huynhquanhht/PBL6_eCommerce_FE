import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: '',
    component: () => import('@/views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home/Home.vue'),
        meta: {
          title: 'Versace - Mua bán sản phẩm thời trang chính hãng, chất lượng'
        }
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('@/views/ProductDetail/ProductDetail'),
        meta: {
          title: 'Product detail'
        },
        props: route => ({id: parseInt(route.params.id)})
      },
      {
        path: '/cart',
        name: '',
        component: () => import('@/views/OrderCart/OrderCart'),
        meta: { title: 'Giỏ hàng - Versace'}
      },
      {
        path: '/payment',
        name: '',
        component: () => import('@/views/Payment/Payment'),
        meta: { title: 'Thanh toán - Versace'}
      },
      {
        path: 'member-info',
        name: 'member-info',
        component: () => import('@/views/MemberInfo/MemberInfo'),
        children: [
          {
            path: 'personal-identity',
            name: 'personal-identity',
            component: () => import('@/views/MemberInfo/MemberIdentity/MemberIdentity')
          },
          {
            path: 'purchase-order',
            name: 'purchase-order',
            component: () => import('@/views/MemberInfo/PurchaseOrder/PurchaseOrder')
          }
        ]
      }
    ]
  },
  {
    path: '',
    name: '',
    component: () => import('@/views/Extra.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/LoginSignup/LoginSignup.vue'),
        children: [
          {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginSignup/LoginForm.vue'),
            meta: {
              title: 'Đăng nhập tài khoản | Mua sắm online | Versace Việt Nam'
            }
          },
          {
            path: '/signup',
            name: 'signup',
            component: () => import('@/views/LoginSignup/SignupForm.vue'),
            meta: { title: 'Đăng ký ngay | Versace Việt Nam' }
          },
        ],
        redirect: '/login'
      },
      {
        path: 'require-reset-password',
        name: 'require-reset-password',
        component: () => import('@/views/ResetPassword/RequireResetPassword'),
        meta: { title: 'Đặt lại mật khẩu | Versace Việt Nam' }
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/views/ResetPassword/ResetPassword'),
        meta: { title: 'Đặt mật khẩu mới | Versace Việt Nam' },
        props: route => ({
          email: route.query.email,
          decodedKey: route.query.key
        })
      },
      {
        path: '/shop-chanel',
        component: () => import('@/views/ShopOwner/ShopOwner.vue'),
        children: [
          {
            path: 'shop-info',
            name: 'shop-info',
            component: () => import('@/views/ShopInfo/ShopInfo.vue'),
            meta: { title: 'Đăng ký của hàng | Versace Việt Nam' }
          },
          {
            path: 'product-list',
            name: 'product-list',
            component: () => import('@/views/ProductList/ProductList.vue'),
            meta: { title: 'Quản lý sản phẩm | Kênh người bán | Versace Việt Nam'}
          },
          {
            path: 'add-product',
            name: 'add-product',
            component: () => import('@/views/AddProduct/AddProduct.vue'),
            meta: { title: 'Thêm sản phẩm | Versace Việt Nam' }
          },
          {
            path: 'bill-management',
            name: 'bill-management',
            component: () => import('@/views/AllBill/AllBill.vue'),
          }
        ]
      },
    ],
    redirect: '/login'
  },
  {
    path: '/other-error',
    name: 'other-error',
    component: () => import('@/views/Error/OtherError'),
    meta: { title: 'Lỗi' }
  },
  {
    path: '/error401',
    name: 'error401',
    component: () => import('@/views/Error/Error401'),
    meta: { title: '401 - Lỗi xác thực' }
  },
  {
    path: '/error403',
    name: 'error403',
    component: () => import('@/views/Error/Error403'),
    meta: { title: '403 - Lỗi truy cập' }
  },
  {
    path: '*',
    name: 'error404',
    component: () => import('@/views/Error/Error404'),
    meta: { title: '404 - Lỗi không tim thấy trang' }
  },
  {
    path: '/error500',
    name: 'error500',
    component: () => import('@/views/Error/Error500'),
    meta: { title: '500 - Lỗi server ' }
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
