<template>
  <div class="card">
    <div class="card-header">
      <div><i class="fa fa-rocket"></i> Email details</div>
    </div>
    <div class="card-body">
      <div v-if="show">
        <h5>
          Contact type: <b>{{email.name}}</b>
        </h5>
        <div v-if="messageContent.type === 'news_letter'">
          <p>
            Email: {{messageContent.email}}
          </p>
        </div>
        <div v-else>
          <div v-for="(item, key) in messageContent" >
            <p>
                {{ key.replace(/\w/, c => c.toUpperCase()) }}: {{ item }}
            </p>
          </div>
        </div>
        <label><b>Email server log:</b></label>
        <p v-for="(item, key) in serverLog" >
         <code >
            {{ key }}: {{ item }}
         </code>
        </p>
      </div>
      
      <div v-if="!show">
        <div class="jumbotron text-center">
          <h3>
            Please select an email first
          </h3>
          <p>
            <button class="btn bt-lg btn-info mt-3">
              <i class="fa fa-arrow-left"></i>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverBus } from '@/main'

export default {
  data(){
    return {
      email: {},
      show: false,
      messageContent: {},
      serverLog: {}
    }
  },

  created() {
    serverBus.$on('formsEmailObj', (server) => {
      this.email = server
      this.show  = true
      this.messageContent = JSON.parse(server.message)
      this.serverLog      = JSON.parse(server.server_log)
    })
  }
}
</script>

<style>

.StripeElement {
  background-color: white;
  height: 40px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
