<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" 
        />
    </template>\
    <template slot="dropdown">
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <router-link variant="link" class="dropdown-item " :to="{ name: 'Profile'}" ><i class="fa fa-user" />  Profile</router-link>
      <router-link variant="link" class="dropdown-item " :to="{ name: 'Settings'}" ><i class="fa fa-wrench" />  Settings</router-link>
      <router-link variant="link" class="dropdown-item " :to="{ name: 'Subscription'}" ><i class="fa fa-usd" />  Subscription</router-link>
      <b-dropdown-item @click="logout">
        <i class="fa fa-lock" /> Logout
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import config from '@/config/settings'
// import { serverBus } from '@/main'
// import axios from 'axios'


export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },

  data: () => {
    return { itemsCount: 42 }
  },

  mounted(){
    // this.getUser()
  },

  methods: {
    logout(){
      config.logout()
    }
  }
}
</script>
