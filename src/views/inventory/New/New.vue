<template>
  <div>
    <top-nav :activeNew="true"/>
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
                  <input type="checkbox" class="custom-control-input" value="1"  v-model="form.publish" >
                  <label class="custom-control-label" for="customChk1">Product published</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" value="2"  v-model="form.featured">
                  <label class="custom-control-label" for="customChk2">Product featured</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
          </b-row>
          <div class="form-actions">
            <b-button v-if="!loading" type="submit" variant="warning mr-2">Create Now!</b-button>
            <b-button v-if="loading" variant="warning mr-2" disabled="">Creating <i class="fa fa-spinner fa-spin" /></b-button>
            <b-button type="button" variant="secondary" @click="reset">Reset</b-button>
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

export default {
  name:'InventoryNew',
  components: {
    'top-nav': NavTop,
    'drop-zone': DropZone
  },

  data(){
    return {
      loading: false,
      form: {
        images:[],
        publish: true
      }
    }
  },

  created(){
    serverBus.$on('inventoryDropZoneUpdated', (val) => this.form.images.push(val))
  },

  methods: {
    createProduct(evt){
      evt.preventDefault()
      this.loading = true
      axios.post(config.defaultURL + '/api/v1/desk/stores/' + config.userStore().uuid + '/products', this.form, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        if (response.status == 201) {
          this.$toasted.show('Product successfully created', { 
            position:'top-right', 
            duration: 5000,
            type: 'success',
            closeOnSwipe: true
          })
          this.reset()
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

<!-- :name,
  :sku,
  :weight,
  :length,
  :width,
  :height,
  :slug,
  :price,
  :regular_price,
  :promo_price,
  :featured,
  :publish,
  :short_description,
  :description,

  :stock_quantity,
  :stock_status,
  :category_ids,
  :tax_class_id,
  :provider_id) -->