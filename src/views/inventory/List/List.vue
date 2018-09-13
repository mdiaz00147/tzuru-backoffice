<template>
  <div>
    <top-nav :activeList="true"/>
    <b-card no-body style="border-top: none;" class="col-12">
      <br>
      <b-table 
        :hover="hover" 
        :striped="striped" 
        :bordered="bordered" 
        :small="small" 
        :fixed="fixed" 
        responsive="sm" 
        :items="items" 
        :fields="fields" 
        :current-page="currentPage" 
        :per-page="perPage"
      >
        <template slot="id" slot-scope="data">
          <div class="custom-control custom-checkbox ">
            <input type="checkbox" class="custom-control-input" value="1" >
            <label class="custom-control-label" for="customChk1"></label>
          </div>
        </template>

        <template slot="name" slot-scope="data">
          <p>{{data.item.name}}</p>
          <p><strong>Stock quntity:</strong> {{data.item.stock_quantity}}</p>
          <p><strong>Price:</strong>  ${{data.item.price}}</p>
          <div v-if="data.item.promo_price">
            <span  class="badge badge-success">Promo price:</span> ${{data.item.promo_price}}
          </div>

        </template>
        <template slot="image" slot-scope="data">
          <img  class="img-thumbnail rounded product__list-image" :src="data.item.images[0].thumb" />
        </template>
        
        <template slot="created_at" slot-scope="data">
          <b-row class="d-flex align-items-center">
            <b-form-group
              class="col-12"
              label-sr-only
              >
              <b-form-checkbox-group stacked>
                <div class="custom-control custom-checkbox ">
                  <input type="checkbox" class="custom-control-input" value="1"   >
                  <label class="custom-control-label" for="customChk1">Product published</label>
                </div>
                <div class="custom-control custom-checkbox ">
                  <input type="checkbox" class="custom-control-input" value="2"  >
                  <label class="custom-control-label" for="customChk2">Product featured</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
          </b-row>
        </template>

        <template slot="action" slot-scope="data">
          <router-link tag="button" :to="'/inventory/edit/' + data.item.uuid" class="btn btn-sm btn-primary">
            Details   <i class="fa fa-list"/>
          </router-link>
          <br>
          <button class="btn btn-sm btn-warning mt-1" >Variants <i class="fa fa-plus"/></button>
        </template>
      </b-table>
      <nav >
        <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
      </nav>
    </b-card>
  </div>
</template>

<style >
  .product__list-image {
    width: 140px;
    height: 140px;
  }

  .table__column-id {
    max-width: 20px !important;
    text-align: center
  }
</style>

<script>
import NavTop from './../Components/NavTop'
import axios from 'axios'
import config from '@/config/settings'
import { serverBus } from '@/main'

export default {
  name:'InventoryList',
  props: {
    server: { type: String },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'top-nav': NavTop
  },
  
  data(){
    return {
      items: [],
      fields: [
        {key: 'id', sortable: true, label: 'ID', class:'table__column-id'},
        {key: 'image', sortable: false},
        {key: 'name', sortable: true},
        {key: 'created_at' , label: '' },
        {key: 'action', label: 'Action' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      loaders: {},
      show: true,
      loading: false
    }
  },

  created(){
    this.listProducts()
  },

  methods: {
    listProducts(){
      this.loading = true
      axios.get(config.defaultURL + '/api/v1/desk/stores/' + config.userStore().uuid + '/products', {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        if (response.status == 200) {
          this.items = response.data.map((product) => {
            if (product['images'].length == 0) product['images'] = [{ thumb: '/img/products/default.jpg' }]
            return product
          })
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

    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    
    getRowCount (items) {
      return items.length
    }

  }

}
</script>
