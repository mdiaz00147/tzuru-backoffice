<template>
  <div>
    <b-card :no-body="true">
      <b-card-body class="p-0 clearfix">
        <i class="fa fa-cogs bg-primary p-4 px-5 font-2xl mr-3 float-left"></i>
        <div class="h5 text-primary mb-0 pt-3">{{newsLetterCount}}</div>
        <div class="text-muted text-uppercase font-weight-bold font-xs">NEWSLETTER SUBSCRIPTIONS</div>
      </b-card-body>
    </b-card>

    <b-card :no-body="true">
      <b-card-body class="p-0 clearfix">
        <i class="fa fa-laptop bg-info p-4 px-5 font-2xl mr-3 float-left"></i>
        <div class="h5 text-info mb-0 pt-3">{{contactCount}}</div>
        <div class="text-muted text-uppercase font-weight-bold font-xs">CONTACT FORMS RECEIVED</div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { serverBus } from '@/main'

export default {
  data(){
    return {
      newsLetterCount: 0,
      contactCount: 0
    }
  },
  
  created() {
    serverBus.$on('formsEmailsArray', (server) => {
      let newsArray = []
      let contactArray = []

      server.map((email,index) => {
        if (JSON.parse(email.message).type === "contact") contactArray.push(1)
        if (JSON.parse(email.message).type === "news_letter") newsArray.push(1)
      })

      this.newsLetterCount = newsArray.length
      this.contactCount = contactArray.length
    })
  }
}
</script>
