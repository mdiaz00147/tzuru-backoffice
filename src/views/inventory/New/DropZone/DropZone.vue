<template>
  <div class="col-12 mb-4">
    <label for="">Product images</label>
    <div class="drop__zone-container ">
      <div class="row">
        <div v-for="item in images64">
          <div>
            <img :src="item['base']" alt="" class="img-thumbnail drop__zone-image ml-2" >
            <i class="fa fa-times text-danger" @click="destroyImage(item)"></i>
          </div>
        </div> 
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <h5 v-if="images64.length == 0" >
          Dropzone
        </h5>
      </div>
    </div>
    
    <a v-if="!loading" class="btn btn-sm btn-outline-dark mt-4 btn-block" @click="selectInput()">Add Image <i class="icon-plus"/></a>
    <button v-if="loading" class="btn btn-sm btn-outline-dark mt-4 btn-block" disabled>Loading <i class="fa fa-spinner fa-spin"/></button>
    <input
      type="file"
      v-on:change="(e) => _handleImageChange(e)"
      id="filestyle-0"
      tabIndex="-1"
      style="display:none"
    /> 
  </div>
</template>

<style scoped>
  .drop__zone-container{
    border: 2px dotted #e0e1e2;
    height: 220px;
    padding: 0.5rem;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .drop__zone-image{
    width: 200px;
    height: 200px;
  }
</style>

<script>
import { serverBus } from '@/main'
import axios from 'axios'
import config from '@/config/settings'
import _ from 'lodash'

export default {
  name:'DropZone',
  data(){
    return {
      loading: false,
      images64: []
    }
  },

  created(){
    serverBus.$on('inventoryFormReset', () => {
      this.images64 = []
      loading: false
    })
    serverBus.$on('inventoryEditProduct', (val) => {
      this.images64 = val.map((prod) => {
        return {
          uuid: prod.uuid,
          base: prod.original
        }
      })
    })
  },

  methods:{
    _handleImageChange(e) {
      this.loading = true
      e.preventDefault();
      let reader  = new FileReader();
      let file    = e.target.files[0];
      reader.onloadend = () => {
        this.images64.push({
          base: reader.result
        })
        this.loading = false
        serverBus.$emit('inventoryDropZoneUpdated', reader.result)
      }
      reader.readAsDataURL(file);
    },

    selectInput() {
      let element = document.getElementById("filestyle-0")
      element.click()
    },

    destroyImage(item){
      if (!item.uuid) this.removeLocal(item)
      else axios.delete(config.defaultURL + '/api/v1/desk/stores/' + config.userStore().uuid + '/mult_images/' + item.uuid, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        if (response.status == 200) {
          this.$toasted.show('Image removed', { 
            position:'top-right', 
            duration: 5000,
            type: 'success',
            closeOnSwipe: true
          })
          this.removedOnServer(item)
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
        })
      })
    },

    removedOnServer(item){
      let arr = this.images64
          arr = arr.map((m) => { if(m.uuid != item.uuid) return m })
      this.images64 = _.compact(arr)
    },

    removeLocal(item){
      let arr = this.images64
          arr = arr.map((m) => { if(m.base != item.base) return m })
      this.images64 = _.compact(arr)
    }

  }
}
</script>
