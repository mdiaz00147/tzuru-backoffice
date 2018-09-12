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
        <template slot="image" slot-scope="data">
          <img  class="img-thumbnail rounded product__list-image" :src="data.item.images[0].thumb" />
        </template>
      </b-table>
      <nav >
        <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
      </nav>
    </b-card>
  </div>
</template>

<style scoped>
  .product__list-image {
    width: 150px;
    height: 150px;
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
        {key: 'image', sortable: false},
        {key: 'name', sortable: true},
        {key: 'created_at' , sortable: true},
        {key:'id', label: 'Action' }
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
