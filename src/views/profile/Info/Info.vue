<template>
  <b-col md="12" class="text-left">
    <form @submit="updateUser">
    <b-form-group>
      <label for="company">Name</label>
      <b-form-input type="text" placeholder="Name" :value="user.name" v-model="form.name" ></b-form-input>
    </b-form-group>
    <b-form-group>
      <label for="vat">Last Name</label>
      <b-form-input type="text" placeholder="Last Name" :value="user.last_name" v-model="form.last_name"></b-form-input>
    </b-form-group>
    <b-form-group>
      <label for="street">Email</label>
      <b-form-input type="text"  placeholder="Email" :value="user.email" v-model="form.email"></b-form-input>
    </b-form-group>
    <b-row>
      <b-col sm="12">
        <b-form-group>
          <label for="city">Phone</label>
          <b-form-input type="text"  placeholder="Phone" :value="user.phone" v-model="form.phone"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col sm="8">
        <b-form-group>
          <label for="city">Street</label>
          <b-form-input type="text"  placeholder="Phone" ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group>
          <label for="postal-code">Postal Code</label>
          <b-form-input type="text"  placeholder="Postal Code"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group>
      <label for="country">Country</label>
      <b-form-input type="text"  placeholder="Country name"></b-form-input>
    </b-form-group>
    <div class="form-actions">
      <b-button v-if="!loading" type="submit" variant="warning" class="mr-2">Save changes</b-button>
      <b-button v-if="loading" variant="warning" class="mr-2" disabled>Save changes <i class="fa fa-spinner fa-spin"/></b-button>
      <b-button variant="secondary">Cancel</b-button>
    </div>
    </form>
</b-col>
</template>

<script>
import config from '@/config/settings'
import axios from 'axios'
import { serverBus } from '@/main'

export default {
  name:'info',
  props:{
    user:{
      type: Object
    }
  },

  data() {
    return{
      loading: false,
      form: {}
    }
  },

  created(){
    serverBus.$on('profileLoading', (val) => this.loading = val)
  },

  methods: {
    updateUser(evt){
      evt.preventDefault()
      serverBus.$emit('profileUpdateUser', this.form, 'User updated')
    }
  }
}
</script>
