<template>
  <div>
    <top-nav v-if="!this.edit_mode" :activeNew="true"/>
    <top-nav v-if="this.edit_mode" :activeEdit="true"/>
    <b-card no-body style="border-top: none;">
      <b-card-body>
        <form @submit="createProduct">
          <b-form-group label="Name"  label-for="elementsAppend" description="E.g: Mountain Cycle">
            <b-input-group>
              <b-form-input id="elementsAppend" type="text" v-model="form.name"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group label="SKU" label-for="elementsAppend" description="E.g: M12T-Men-WS">
            <b-input-group>
              <b-form-input id="elementsAppend" type="text" v-model="form.sku"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-row>
            <drop-zone/>
          </b-row>
          <b-row>
            <b-form-group class="col-4" label="Price" label-for="elementsAppend" description="E.g 21.00">
              <b-input-group>
                <b-input-group-append><b-input-group-text>$</b-input-group-text></b-input-group-append>
                <b-form-input id="elementsAppend" type="number" v-model="form.price"></b-form-input>
                <b-input-group-append><b-input-group-text>USD</b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group class="col-4" label="Promotional price" label-for="elementsAppend" description="E.g 19.99">
              <b-input-group>
                <b-input-group-append><b-input-group-text>$</b-input-group-text></b-input-group-append>
                <b-form-input id="elementsAppend" type="number" v-model="form.promo_price"></b-form-input>
                <b-input-group-append><b-input-group-text>USD</b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group class="col-4" label="Stock available" label-for="elementsAppend" description="E.g 5000">
              <b-input-group>
                <b-form-input id="elementsAppend" type="number" v-model="form.stock_quantity"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-row>

          <b-row>
            <b-form-group class="col-3" label="Weight" label-for="elementsAppend" description="E.g 100.5">
              <b-input-group>
                <b-form-input id="elementsAppend" type="number" v-model="form.weight"></b-form-input>
                <b-input-group-append><b-input-group-text>Lbs</b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group class="col-3" label="Length" label-for="elementsAppend" description="E.g 6.0">
              <b-input-group>
                <b-form-input id="elementsAppend" type="number" v-model="form.length"></b-form-input>
                <b-input-group-append><b-input-group-text>CM</b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group class="col-3" label="Width" label-for="elementsAppend" description="E.g 2.5">
              <b-input-group>
                <b-form-input id="elementsAppend" type="number" v-model="form.width"></b-form-input>
                <b-input-group-append><b-input-group-text>CM</b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group class="col-3" label="Height" label-for="elementsAppend" description="E.g 4.5">
              <b-input-group>
                <b-form-input id="elementsAppend" type="number" v-model="form.height"></b-form-input>
                <b-input-group-append><b-input-group-text>CM</b-input-group-text></b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-row>
          
          <b-form-group label="Slug" label-for="elementsPrependAppend" description="How your product URL will look like. E.g: https://mydomain.com/inventory/this-is-my-slug">
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text>https://yourdomain.com/inventory/</b-input-group-text>
              </b-input-group-prepend>
              <b-form-input id="elementsPrependAppend" type="text" v-model="form.slug"></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Description"  label-for="elementsPrependAppend" description="How your product URL will look like. E.g: https://mydomain.com/inventory/this-is-my-slug">
            <b-input-group>
              <b-form-textarea
                state="invalid"
                placeholder="Product description"
                v-model="form.description"
                :rows="3">
              </b-form-textarea>
            </b-input-group>
          </b-form-group>
          <hr>
          <b-row>
            <b-form-group
              class="col-12"
              label-sr-only
              >
              <b-form-checkbox-group stacked>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customChk1"   v-model="form.publish" >
                  <label class="custom-control-label" for="customChk1">Product published</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customChk2"   v-model="form.featured">
                  <label class="custom-control-label" for="customChk2">Product featured</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
          </b-row>
          <hr>
          <div class="form-actions">
            <div v-if="this.edit_mode">
              <b-button v-if="!loading" type="submit" variant="primary mr-2">Save changes <i class="icon-cloud-upload" /></b-button>
              <b-button v-if="loading" variant="primary mr-2" disabled="">Loading <i class="fa fa-spinner fa-spin" /></b-button>
              <b-button type="button" variant="danger" disabled>Delete product</b-button>
            </div>
            <div v-else>
              <b-button v-if="!loading" type="submit" variant="warning mr-2">Create Now!</b-button>
              <b-button v-if="loading" variant="warning mr-2" disabled>Loading <i class="fa fa-spinner fa-spin" /></b-button>
              <b-button type="button" variant="secondary" @click="reset">Reset</b-button>
            </div>
          </div>
        </form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import NavTop from './../Components/NavTop'
import DropZone from './DropZone/DropZone'
import axios from 'axios'
import config from '@/config/settings'
import { serverBus } from '@/main'
import Vue from 'vue'

export default {
  name:'InventoryNew',
  components: {
    'top-nav': NavTop,
    'drop-zone': DropZone
  },

  data(){
    return {
      product_uuid: false,
      edit_mode: false,
      loading: false,
      form: {
        images:[],
        publish: true
      }
    }
  },

  beforeRouteLeave(to, from , next) {
    this.edit_mode = false
    this.product_uuid = false
    this.form =  {
      images:[],
      publish: true
    }
    serverBus.$emit('inventoryFormReset')
    next()
  },

  created(){
    if (this.$route.params.uuid) {
      this.edit_mode = true
      this.product_uuid = this.$route.params.uuid
      this.fetchProduct(this.$route.params.uuid)
    }
    serverBus.$on('inventoryDropZoneUpdated', (val) => this.form.images.push(val))
  },

  methods: {
    fetchProduct(uuid){
      this.loading = true
      axios.get(config.defaultURL + '/api/v1/desk/stores/' + config.userStore().uuid + '/products/' + uuid, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        if (response.status == 200) {
          this.form = response.data
          this.loading = false
          serverBus.$emit('inventoryEditProduct', response.data.images)
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
          this.loading = false
        })
      })
    },

    createProduct(evt){
      evt.preventDefault()
      let url
      let method = this.edit_mode ? ('PUT') : ('POST')
      if(!this.edit_mode) url =  config.defaultURL + '/api/v1/desk/stores/' + config.userStore().uuid + '/products'
      if(this.edit_mode) url =  config.defaultURL + '/api/v1/desk/stores/' + config.userStore().uuid + '/products/' + this.product_uuid
      this.loading = true
      axios({
        url:url,
        data:this.form,
        method:method,
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        if (response.status == 201 || response.status == 200) {
          let msg = this.edit_mode ? ('Product successfully updated') : ('Product successfully created')
          this.$toasted.show(msg, { 
            position:'top-right', 
            duration: 5000,
            type: 'success',
            closeOnSwipe: true
          })
          if (!this.edit_mode) this.reset()
          this.loading = false
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
          this.loading = false
        })
      })
    },

    reset(){
      this.form = {
        images:[],
        publish: true
      }
      serverBus.$emit('inventoryFormReset')
    }
  }
}
</script>
