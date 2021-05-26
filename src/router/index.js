import { createRouter, createWebHistory } from 'vue-router'



//懒加载 const Home  = () => import  ('../components/Home.vue')
const Home = () => import ('../views/home/Home.vue')
const Category = () => import ('../views/category/Category.vue')
const ShopCart = () => import ('../views/shopcart/ShopCart.vue')
const Profile = () => import ('../views/profile/Profile.vue')
const Detail = () => import ('../views/detail/Detail.vue')

const routes = [
  {
    path:'/',
    //redirect重定向
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
  },
  {
    path:'/category',
    component:Category,
  },
  {
    path:'/shopcart',
    component:ShopCart,
  },
  {
    path:'/profile',
    component:Profile,
  },
  {
    path:'/detail/:iid',
    component:Detail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router