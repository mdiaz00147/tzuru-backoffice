<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form  @submit="onSubmit"  @reset="onReset" v-if="show">
                  <h1>Password Recovery</h1>
                  <p class="text-muted">Did you forget your password ?</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input 
                      type="text" 
                      class="form-control" 
                      placeholder="Your Email" 
                      v-model="form.email"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12">
                      <b-button v-if="!loading" type="submit" variant="primary" class="px-12">Recover password now!</b-button>
                      <b-button v-if="loading" type="submit" variant="primary" class="px-12" disabled=""><i class="fa fa-spinner fa-spin" />  Loading</b-button>
                    </b-col>
                    <b-col cols="12">
                    <span><router-link :to="{ path: '/login'}"><i class="fa fa-arrow-left" /> Back to login</router-link></span>
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
  name: 'PasswordReset',
  data(){
    return {
      loading: false,
      show:true,
      form: {}
    }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.loading = true
      axios.post(config.defaultURL + '/api/v1/desk/users/password_recovery', this.form)
      .then(response => {
        this.$toasted.show(response.data.m, { 
          position:'top-right',
          duration: 5000,
          type: 'success',
          closeOnSwipe: true
        })
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
      let action = async() => {
        await localStorage.setItem('auth_token', data.auth_token)
        await router.push("dashboard?auth=true")
      }
      action()
    },

    onReset (evt) {
      evt.preventDefault()
      this.form = {}
      this.$nextTick(() => { this.show = true })
    }

  }
}
</script>
