<template>
  <div>
    <div class="text-center">
      <img :src="user.avatar['medium']" class=" rounded-circle img-thumbnail custom-img" alt="avatar">
      <!-- <input type="file" class="text-center mx-auto file-upload"> -->
      <button v-if="!loading" class="btn btn-sm btn-outline-dark mt-4 btn-block" @click="selectInput()">Upload an avatar <i className="fa fa-camera"/></button>
      <button v-if="loading" class="btn btn-sm btn-outline-dark mt-4 btn-block" disabled>Loading <i class="fa fa-spinner fa-spin"/></button>
      <input
        type="file"
        v-on:change="(e) => _handleImageChange(e)"
        id="filestyle-0"
        tabIndex="-1"
        style="display:none"
      /> 
    </div>
    <br>
    <ul class="list-group">
      <li class="list-group-item text-muted">Activity <i class="fa fa-dashboard fa-1x"></i>
      </li>
      <li class="list-group-item text-right">
        <span class="float-left"><strong>last logged ip</strong></span>{{user.last_ip}}
      </li>
      <li class="list-group-item text-right">
        <span class="float-left"><strong>Created at</strong></span>{{user.created_at}}
      </li>
    </ul>
    <!-- <br>
    <div class="card">
      <div class="card-header">Social Media</div>
      <div class="card-body"><i class="fa fa-facebook fa-2x"></i>  <i class="fa fa-github fa-2x"></i>
        <i class="fa fa-twitter fa-2x"></i>
        <i class="fa fa-pinterest fa-2x"></i>  
        <i class="fa fa-google-plus fa-2x"></i>
      </div>
    </div> -->
  </div>
</template>

<style>
  .custom-img {
    width: 200px;
    height: 200px;
  }
</style>

<script>
import { serverBus } from '@/main'

export default {
  name:'Avatar',
  props:{
    user: {
      type: Object
    }
  },

  data(){
    return {
      form: {},
      loading: false
    }
  },

  created(){
    serverBus.$on('profileLoading', (val) => this.loading = val)
  },

  methods:{
    _handleImageChange(e) {
      e.preventDefault();
      let reader  = new FileReader();
      let file    = e.target.files[0];
      reader.onloadend = () => {
        this.form.avatar =  reader.result
        serverBus.$emit('profileUpdateUser', this.form, 'Avatar updated')
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

