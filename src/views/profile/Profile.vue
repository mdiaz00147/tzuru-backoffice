<template>
  <div class="row">
    <div class="col-12 col-md-3">
      <avatar :user="user"/>
      <br>
    </div>

    <div class="col-12 col-md-9">
      <b-card no-body>
        <b-tabs card>
          <b-tab>
            <template slot="title">
              <i class="icon-calculator"></i> Info 
            </template>
            <info :user="user" />
          </b-tab>
          <b-tab>
            <template slot="title">
              <i class="icon-credit-card"></i> Payment method 
            </template>
            <payment/>
          </b-tab>
          <b-tab>
            <template slot="title">
              <i class="icon-key"></i> Password 
            </template>
            <pass/>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import Info from './Info/Info'
import Payment from './Payment/Payment'
import Pass from './Pass/Pass'
import Avatar from './Avatar/Avatar'
import axios from 'axios'
import config from '@/config/settings'
import { serverBus } from '@/main'

export default {
  name:'Profile',
  data(){
    return{
      user: {
        avatar: "http://ssl.gstatic.com/accounts/ui/avatar_2x.png",
        address: {}
      }
    }
  },

  components: {
    info: Info,
    payment: Payment,
    pass: Pass,
    avatar: Avatar
  },

  beforeMount(){
    this.getUser()
  },

  created(){
    serverBus.$on('profileUpdateUser', (user,msg) => this.updateUser(user,msg))
  },

  methods: {
    getUser(){
      axios.get(config.defaultURL + '/api/v1/desk/users/' + config.userData().uuid, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        if (response.status == 200) {
          this.user = response.data
        }
      })
      .catch((error) => {
      })
    },

    updateUser(user,msg){
      serverBus.$emit('profileLoading', true)
      axios.put(config.defaultURL + '/api/v1/desk/users/' + config.userData().uuid, user, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        if (response.status == 200) {
          this.$toasted.show(msg, { 
            position:'top-right', 
            duration: 5000,
            type: 'success',
            closeOnSwipe: true
          })
          serverBus.$emit('profileLoading', false)
          serverBus.$emit('userUpdated', response.data)
          config.setUser(response.data)
          this.user = response.data
        }
      })
      .catch((error) => {
        error.response.data.map((m) => {
          this.$toasted.show(m, { 
            position:'top-right', 
            duration: 5000,
            type: 'error',
            closeOnSwipe: true
          })
        })
        serverBus.$emit('profileLoading', false)
      })
    }
  }
}
</script>
