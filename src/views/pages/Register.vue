<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form @submit="onSubmit"  v-if="show">
                <span class="text-center d-flex justify-content-center mb-2 mt-1">
                  <div>
                    <img class="navbar-brand-full" src="img/tzuru_logo.png" width="180px" height="66px" alt="CoreUI Logo">
                    <p class="text-muted">
                      Start to manage your bussines today
                    </p>
                  </div>
                </span>
                
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input 
                    type="text" 
                    class="form-control" 
                    placeholder="Email" 
                    v-model="form.email"
                    autocomplete="Email"
                    required />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input 
                    type="password" 
                    class="form-control" 
                    placeholder="Password" 
                    v-model="form.password"
                    autocomplete="Password"
                    required />
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input 
                    type="password" 
                    class="form-control" 
                    placeholder="Password confirmation" 
                    v-model="form.password_confirmation"
                    autocomplete="Password-confirmation"
                    required />
                </b-input-group>

                <b-button v-if="!loading" variant="success" type="submit" block>Create Account</b-button>
                <b-button v-if="loading" variant="success" class="px-4" disabled block><i class="fa fa-spinner fa-spin" />  Loading</b-button>
                <span><router-link :to="{ path: '/login'}" class="mt-7" ><i class="fa fa-arrow-left" /> Back to login</router-link></span>
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="6">
                  <b-button block class="btn btn-facebook"><span><i class="fa fa-facebook" /> facebook</span></b-button>
                </b-col>
                <b-col cols="6">
                  <b-button block class="btn btn-twitter" type="button"><span><i class="fa fa-twitter" /> twitter</span></b-button>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
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
  name: 'Register',

  data(){
    return {
      loading: false,
      show:true,
      form: {
        user_role_id:10
      }
    }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.loading = true
      axios.post(config.defaultURL + '/api/v1/desk/users', this.form)
      .then(response => {
        if (response.status == 200) {
          this.storeRegister(response.data)
          this.loading = false
          this.$toasted.show(response.data.m, {
            position:'top-right', 
            duration: 5000,
            type: 'success',
            closeOnSwipe: true
          })
        }
      })
      .catch((error) => {
        error.response.data.map((m,index) => {
          this.$toasted.show(m, {
            position:'top-right', 
            duration: 5000,
            type: 'error',
            closeOnSwipe: true
          })
        })
        this.loading = false
      })
    },

    storeRegister(data){
      let action = async() => {
        await localStorage.setItem('auth_token', data.auth_token)
        await localStorage.setItem('user', JSON.stringify(data.user))
        await router.push({path: '/store/register'})
      }
      action()
    }
  }
}
</script>
