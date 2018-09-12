<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        :src="avatar"
        class="img-avatar custom-avatar"
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

<style>
  .custom-avatar {
    width: 35px;
    height: 35px;
  }
</style>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import config from '@/config/settings'
import { serverBus } from '@/main'

export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },

  data: () => {
    return { 
      itemsCount: 42,
      avatar: ''
    }
  },

  created(){
    serverBus.$on('userUpdated', (val) => {
      this.avatar = val.avatar['thumb']
    })
  },

  mounted(){
    this.avatar = config.userData().avatar['thumb']
  },

  methods: {
    logout(){
      config.logout()
    }
  }
}
</script>
