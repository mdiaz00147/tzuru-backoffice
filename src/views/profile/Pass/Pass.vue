<template>
  <div>
    <p>Update your current password</p>
    
    <hr>
    <form class="form" action="##" @submit="updateUser" >
      <b-form-group>
        <label for="vat">New Password</label>
        <b-input-group>
          <b-input-group-prepend>
            <b-button variant="secondary">
              <i class="icon-paper-plane"></i>
            </b-button>
          </b-input-group-prepend>
          <b-form-input type="password" placeholder="Password" v-model="form.password"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group>
        <label for="vat">Password confirmation</label>
        <b-input-group>
          <b-input-group-prepend>
            <b-button variant="secondary">
              <i class="icon-target"></i>
            </b-button>
          </b-input-group-prepend>
          <b-form-input type="password" placeholder="Confirmation"  v-model="form.password_confirmation"></b-form-input>
        </b-input-group>
      </b-form-group>

      <div class="form-actions">
        <b-button v-if="!loading" type="submit" variant="danger" class="mr-2" :disabled="disabled">Update password</b-button>
        <b-button v-if="loading" variant="danger" class="mr-2" disabled>Loading <i class="fa fa-spinner fa-spin"/></b-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config/settings'
import { serverBus } from '@/main'

export default {
  data() {
    return{
      loading: false,
      form: {},
      disabled: true
    }
  },

  updated(){
    if(this.form.password && this.form.password_confirmation) this.disabled = false
  },
  
  created(){
    serverBus.$on('profileLoading', (val) => this.loading = val)
  },

  methods: {
    updateUser(evt){
      evt.preventDefault()
      serverBus.$emit('profileUpdateUser', this.form, 'Password updated')
    }
  }
}
</script>
