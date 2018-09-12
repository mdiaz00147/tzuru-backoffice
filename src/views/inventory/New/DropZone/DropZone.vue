<template>
  <div class="col-12 mb-4">
    <label for="">Product images</label>
    <div class="drop__zone-container ">
      <div class="row">
        <div v-for="item in images64">
          <img :src="item['base']" alt="" class="img-thumbnail drop__zone-image ml-2" >
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
    }
  }
}
</script>
