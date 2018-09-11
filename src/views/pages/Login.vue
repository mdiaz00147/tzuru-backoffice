<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form  @submit="onSubmit"  @reset="onReset" v-if="show">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input 
                    type="text" 
                    class="form-control" 
                    placeholder="Username" 
                    v-model="form.email"
                    autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input 
                    type="password" 
                    class="form-control" 
                    placeholder="Password" 
                    v-model="form.password"
                    autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="4">
                      <b-button v-if="!loading" type="submit" variant="primary" class="px-4">Login</b-button>
                      <b-button v-if="loading" type="submit" variant="primary" class="px-4" disabled=""><i class="fa fa-spinner fa-spin" />  Loading</b-button>
                    </b-col>
                    <b-col cols="8" class="text-right">
                      <router-link variant="link" class="px-0" :to="{ name: 'PasswordReset'}" ><i class="fa fa-arrow-left" /> Forgot password?</router-link>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <img class="navbar-brand-full" src="img/tzuru_logo.png" width="135" height="45" alt="CoreUI Logo">
                  <p class="mt-10">Don't have an account yet?</p>
                  <a 
                    variant="primary" 
                    class="btn btn-primary active mt-3"
                    href="#/register"
                    >Register Now!
                  </a>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import config from '@/config/settings'
import router from '@/router'
import axios from 'axios'

export default {
  name: 'Login',
  data(){
    return {
      loading: false,
      show:true,
      form: {}
    }
  },

  mounted(){
    if (this.$route.query.a && JSON.parse(this.$route.query.a))  this.$toasted.show("You must sign in first", {
      position:'top-right', 
      duration: 5000,
      type: 'success',
      closeOnSwipe: true
    })
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.loading = true
      axios.post(config.defaultURL + '/api/v1/desk/sessions', this.form)
      .then(response => {
        if (response.status == 200) this.storeLogin(response.data)
        this.loading = false
      })
      .catch((error) => {
        this.$toasted.show(error.response.data.m, { 
          position:'top-right', 
          duration: 5000,
          type: 'error',
          closeOnSwipe: true
        })
        this.loading = false
      })
    },
    
    storeLogin(data){
      let action
      if (!data.user.store) {
        action = async() => {
          await localStorage.setItem('auth_token', data.auth_token)
          await localStorage.setItem('user', JSON.stringify(data.user))
          await localStorage.setItem('store', JSON.stringify(data.user.store))
          await router.push("store/register?a=true")
        }
      } else {
        action = async() => {
          await localStorage.setItem('auth_token', data.auth_token)
          await localStorage.setItem('user', JSON.stringify(data.user))
          await localStorage.setItem('store', JSON.stringify(data.user.store))
          await router.push("dashboard?auth=true")
        }
      }
      
      action()
    },

    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form = {}
      /* Trick to reset/clear native browser form validation state */
      this.$nextTick(() => { this.show = true })
    }

  }
}
</script>
