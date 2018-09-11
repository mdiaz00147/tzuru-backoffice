<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/tzuru_logo.png" width="135" height="45" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="ml-auto">
        <b-dropdown variant="link" no-caret>
          <template slot="button-content">
            <i class="icon-bell" style="color:black"></i>
            <b-badge pill variant="danger">5</b-badge>
          </template>
          <b-dropdown-header>Notifications</b-dropdown-header>
          <b-dropdown-item>First Action</b-dropdown-item>
          <b-dropdown-item>Second Action</b-dropdown-item>
          <b-dropdown-item>Third Action</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>Something else here...</b-dropdown-item>
          <b-dropdown-item disabled>Disabled action</b-dropdown-item>
        </b-dropdown>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>

      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>

    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="https://coreui.io">Tzuru</a>
        <span class="ml-1">&copy; 2018</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://asoftio.com/">Asoftio LLC</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import config from '@/config/settings'
import router from '@/router'
import axios from 'axios'
import nav from '@/_nav'
import { 
    Header as AppHeader, SidebarToggler, 
    Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, 
    Aside as AppAside, AsideToggler, 
    Footer as TheFooter, Breadcrumb
  } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
  name: 'full',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },

  data () {
    return {
      nav: nav.items
    }
  },

  beforeMount(){
    this.checkStore()
  },

  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  },

  methods: {
    checkStore () {
      axios.get(config.defaultURL + '/api/v1/desk/sessions/verify', {
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("auth_token")
        },
      })
      .then(response => {
        
      })
      .catch((error) => {
        router.push({ path: '/login?a=true' })
      })
    },
  }
}
</script>
