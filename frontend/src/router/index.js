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
        path: 'search-page',
        name: 'search-page',
        component: () => import('@/views/SearchPage/SearchPage.vue'),
        meta: {
          title: 'Versace - Mua bán sMua bán sản phẩm thời trang chính hãng, chất lượng',
        },
        props: route => ({
          searchString: route.query.searchString,
          gender: route.query.gender,
        }),
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
            component: () => import('@/views/MemberInfo/MemberIdentity/MemberIdentity'),
            meta: { title: 'Thông tin cá nhân - Versace Việt Nam'}
          },
          {
            path: 'purchase-order',
            name: 'purchase-order',
            component: () => import('@/views/MemberInfo/PurchaseOrder/PurchaseOrder'),
            meta: { title: 'Đơn mua - Versace Việt Nam'}
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
          token: route.query.token
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
            meta: { title: 'Cửa hàng - Kênh người bán | Versace Việt Nam' }
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
            component: () => import('@/views/ProductOperation/AddProduct.vue'),
            meta: { title: 'Thêm sản phẩm | Versace Việt Nam' }
          },
          {
            path: 'update-product/:id',
            name: 'update-product',
            component: () => import('@/views/ProductOperation/UpdateProduct.vue'),
            meta: { title: 'Cập nhật sản phẩm | Versace Việt Nam' },
            props: route => ({id: parseInt(route.params.id)})
          },
          {
            path: 'all-order',
            name: 'all-order',
            component: () => import('@/views/OrderManagement/AllOrder.vue'),
            meta: { title: 'Tất cả đơn hàng | Versace Việt Nam' }
          },
          {
            path: 'pending-confirm-order',
            name: 'pending-confirm-order',
            component: () => import('@/views/OrderManagement/PendingConfirmOrder.vue'),
            meta: { title: 'Đơn hàng chờ xác nhận | Versace Việt Nam' }
          },
          {
            path: 'confirm-order',
            name: 'confirm-order',
            component: () => import('@/views/OrderManagement/ConfirmOrder.vue'),
            meta: { title: 'Đơn hàng đã xác nhận | Versace Việt Nam' }
          },
          {
            path: 'cancel-order',
            name: 'cancel-order',
            component: () => import('@/views/OrderManagement/CancelOrder.vue'),
            meta: { title: 'Đơn hàng đã hủy | Versace Việt Nam' }
          },
          {
            path: 'order-detail/:id',
            name: 'order-detail',
            component: () => import('@/views/OrderManagement/OrderDetail.vue'),
            meta: { title: 'Chi tiết đơn hàng | Versace Việt Nam' },
            props: route => ({id: parseInt(route.params.id)})
          },
        ]
      },
      {
        path: 'admin',
        name: 'admin/',
        component: ()=> import('@/views/AdminPage/AdminPage.vue'),
        meta: {
          title: 'Quản lý - Versace Việt Nam'
        },
        children: [
          {
            path: 'shop-management',
            name: 'shop-management',
            component: () => import('@/views/AdminPage/ShopManagement/ShopManagement.vue')
          },
          {
            path: 'account-management',
            name: 'account-management',
            component: () => import('@/views/AdminPage/AccountsManagement/AccountsManagement.vue')
          },
          {
            path: 'product-management',
            name: 'product-management',
            component: () => import('@/views/AdminPage/ShopManagement/ProductManagement.vue')
          },
          {
            path: 'order-management',
            name: 'order-management',
            component: () => import('@/views/AdminPage/ShopManagement/OrderManagement.vue')
          },
        ],
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
