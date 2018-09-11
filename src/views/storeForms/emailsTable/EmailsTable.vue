<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4"><span class="lstick"></span>Email logs overview</h4>
      <div v-if="!loading" >
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
          v-if="show"
        >
          <template slot="status" slot-scope="data">
            <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
          </template>
          <template slot="id" slot-scope="data">    
            <button 
              @click="sendEmailObj(data.item)" 
              class="btn btn-sm btn-success"
              v-if="!loaders['loader_' + data.item.id]"
            >
              Open
            </button>
            <button
              class="btn btn-sm btn-success"
              disabled
              v-if="loaders['loader_' + data.item.id]"
            >
              <i class="fa fa-spinner fa-spin" />
            </button>
          </template>
        </b-table>
        <nav v-if="show">
          <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
        <h2 v-if="!show" class="text-center">
          There is no logs yet
        </h2>
      </div>
      <div v-if="loading" class="text-center">
        <i class="fa fa-spinner fa-spin" />
        <p>Loading</p>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config/settings'
import router from '@/router'
import axios from 'axios'
import { serverBus } from '@/main'

export default {
  name: 'emails-table',
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

  data: () => {
    return {
      items: [],
      fields: [
        {key: 'name', sortable: true},
        {key: 'created_at' , sortable: true},
        {key:'id', label: 'Action' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      loaders: {},
      show: true,
      loading: false
    }
  },

  mounted() {
    this.getData()
  },
  
  methods: {
    sendEmailObj(data){
      this.loaders['loader_' + data.id] = true
      serverBus.$emit('formsEmailObj', data)
      this.$forceUpdate()
      setTimeout((object) => {
        this.loaders['loader_' + data.id] = false
        this.$forceUpdate()
      }, 250)
    },

    sendArrayEmails(data){
      serverBus.$emit('formsEmailsArray', data)
    },

    getData () {
      this.loading = true
      axios.get(config.defaultURL + '/api/v1/desk/stores/' + config.userStore().id + '/email_logs', {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        if (response.status == 200) {
          this.items = response.data
          this.sendArrayEmails(response.data)
          if (response.data.length < 1) this.show = false
          this.loading = false
        }
      })
      .catch((error) => {
        this.loading = false
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
