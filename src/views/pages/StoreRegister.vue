<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col sm="8" md="8">
        <b-card>
          <div class="row mb-3 mt-3">
            <div class="col-4">
              <img src="/img/icons/sketch.svg" width="80px" alt="">
            </div>
            <div class="col-8">
              <h1>Tell us about your bussines</h1>
            </div>
          </div>
          <form  @submit="onSubmit"  @reset="onReset" v-if="show" >
            <b-form-group>
              <label for="company">Company Name <small class="text-danger">*</small></label>
              <b-form-input v-model="form.name" type="text" id="company" placeholder="Enter your company name"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="vat">Company email <small class="text-danger">*</small></label>
              <b-form-input v-model="form.email" type="text" id="vat" placeholder="E.g: contact@mycompany.com"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="street">Domain Name</label>
              <b-form-input v-model="form.domain_name" type="text" id="street" placeholder="www.mydomain.com"></b-form-input>
            </b-form-group>
            <b-row>
              <b-col>
                <b-form-group>
                  <label for="city">Description <small>(Optional)</small></label>
                  <b-textarea v-model="form.description"  class="form-control" rows="5" id="comment" type="text"  placeholder="Tell us something about your bussines"></b-textarea>
                  <small><b class="text-danger">*</b> Required</small>
                </b-form-group>
              </b-col>
            </b-row>
            
            <div class="form-actions">
              <b-button type="submit" v-if="!loading" variant="success" class="btn-lg">Continue!</b-button>
              <b-button disabled="" v-if="loading" variant="success" class="btn-lg">Loading <i class="fa fa-spinner fa-spin" /></b-button>
              <b-button @click="onReset" variant="default" class="btn-lg">Reset</b-button>
            </div>
          </form>
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
  name: 'StoreRegister',

  data(){
    return {
      loading: false,
      show:true,
      form: {
        store_type_id:10
      }
    }
  },

  mounted(){
    if (this.$route.query.a && JSON.parse(this.$route.query.a))  this.$toasted.show("You have not created a business yet", {
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
      
      axios.post(config.defaultURL + '/api/v1/desk/stores', this.form, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        if (response.status == 200) {
          this.storeLogin(response.data)
          this.loading = false
        }
      })
      .catch((error) => {
        if (error.response.data.length > 0) {
          error.response.data.map((m,index) => {
            this.$toasted.show(m, {
              position:'top-right', 
              duration: 5000,
              type: 'error',
              closeOnSwipe: true
            })
          })
        } else {
          router.push({ path: '/login?a=true' })
        }
        this.loading = false
      })
    },

    //  store_id for future request in the localstorage in the user object as an attribute
    storeLogin(data){
      let action = async() => {
        await localStorage.setItem('store', JSON.stringify(data))
        await router.push("/dashboard?a=true")
      }
      action()
    },

    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form = {
        store_type_id:10
      }
      /* Trick to reset/clear native browser form validation state */
      this.$nextTick(() => { this.show = true })
    }
  }
}
</script>
