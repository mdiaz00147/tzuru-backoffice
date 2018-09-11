<template>
  <div class="row">
    <div class="col-3">
        <div class="text-center">
          <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class=" rounded-circle img-thumbnail" alt="avatar">
          <!-- <input type="file" class="text-center mx-auto file-upload"> -->
          <button class="btn btn-sm btn-outline-dark mt-4 btn-block">Upload an avatar</button>
        </div>
        <br>
        <ul class="list-group">
            <li class="list-group-item text-muted">Activity <i class="fa fa-dashboard fa-1x"></i>
            </li>
            <li class="list-group-item text-right"><span class="float-left"><strong>Shares</strong></span> 125</li>
        </ul>
        <br>
        <div class="card">
          <div class="card-header">Social Media</div>
          <div class="card-body"><i class="fa fa-facebook fa-2x"></i>  <i class="fa fa-github fa-2x"></i>
              <i
              class="fa fa-twitter fa-2x"></i><i class="fa fa-pinterest fa-2x"></i>  <i class="fa fa-google-plus fa-2x"></i>
          </div>
        </div>
    </div>

    <div class="col-9">
      <b-card no-body>
        <b-tabs card>
          <b-tab>
            <template slot="title">
              <i class="icon-calculator"></i> Info 
            </template>
            <info/>
          </b-tab>
          <b-tab>
            <template slot="title">
              <i class="icon-credit-card"></i> Payment method 
            </template>
            <payment/>
          </b-tab>
          <b-tab>
            <template slot="title">
              <i class="icon-key"></i> Password 
            </template>
            <pass/>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import Info from './Info/Info'
import Payment from './Payment/Payment'
import Pass from './Pass/Pass'

export default {
  name:'Profile',
  components: {
    info: Info,
    payment: Payment,
    pass: Pass
  }
}
</script>
