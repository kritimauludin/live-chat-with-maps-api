import Vue from 'vue'
import Router from 'vue-router'
import GoogleMaps from '@/components/home/GoogleMaps'
import SignUp from '@/components/auth/SignUp'
import SignIn from '@/components/auth/SignIn'
import ViewProfile from '@/components/profile/ViewProfile'
import firebase from 'firebase/app'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoogleMaps',
      component: GoogleMaps,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(req => req.meta.requiresAuth)){
    let user = firebase.auth().currentUser
    if(user){
      next()
    }else {
      next({ name: 'SignIn'})
    }
  }else{
    next()
  }
})

export default router
