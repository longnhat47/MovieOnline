import HomeView from '../views/home/HomeView.vue'
import WatchMovieView from '../views/home/WatchMovieView.vue'
import UpdateProfileView from '../views/home/UpdateProfileView.vue'
import ChangePasswordView from '../views/home/ChangePasswordView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PageNotFoundView from '@/views/404View.vue'
// import ChangePassword from '@/views/home/ChangePasswordView.vue'

import AdminView from '@/views/admin/AdminView.vue'
// import CategoryView from '@/views/admin/CategoryView.vue'


export const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFoundView',
    component: PageNotFoundView
  },{
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: WatchMovieView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/update-profile',
    name: 'UpdateProfile',
    component: UpdateProfileView
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePasswordView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  }
  // {
  //   path: '/dang-nhap',
  //   name: 'Login',
  //   component: LoginView,
  // },
  // {
  //   path: '/dang-ky',
  //   name: 'Register',
  //   component: RegisterView,
  // },
  // {
  //   path: '/change-password',
  //   name: 'ChangePassword',
  //   component: ChangePassword,
  // },
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   component: AdminView,
  // },
  // {
  //   path: '/admin/category',
  //   name: 'AdminCategory',
  //   component: CategoryView,
  // }
]
