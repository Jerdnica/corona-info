import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/home/Home";
import CountryDetails from "@/components/country-details/CountryDetails";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Home },
        { path: '/country/:slug', component: CountryDetails }
    ]
})
export default router
