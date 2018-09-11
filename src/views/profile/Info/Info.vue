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
          <b-form-input type="text"  placeholder="Phone" :value="user.phone" v-model="form.phone"></b-form-input>
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

export default {
  name:'Info',
  data() {
    return{
      loading: false,
      user: {},
      form: {}
    }
  },

  mounted(){
    this.getUser()
  },

  methods: {
    updateUser(evt){
      evt.preventDefault()
      this.loading = true
      axios.put(config.defaultURL + '/api/v1/desk/users/' + this.user.id, this.form, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        if (response.status == 200) {
          this.loading = false
          this.$toasted.show('User updated', { 
            position:'top-right', 
            duration: 5000,
            type: 'success',
            closeOnSwipe: true
          })
          this.getUser()
        }
      })
      .catch((error) => {
        this.loading = false
        error.response.data.map((m) => { 
          this.$toasted.show(m, { 
            position:'top-right', 
            duration: 5000,
            type: 'error',
            closeOnSwipe: true
          })
        })
      })
    },

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
    }
  }
}
</script>
