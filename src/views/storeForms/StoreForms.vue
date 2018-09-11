<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="6" >
        <overview/>
        <emails-table/>
      </b-col>
      <b-col cols="6" >
        <last-email/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import emailsTable from './emailsTable/EmailsTable'
import lastEmail from './lastEmail/LastEmail'
import overview from './overview/Overview'

export default {
  name: 'StoreForms',
  components: {
    'emails-table': emailsTable,
    'overview': overview,
    'last-email': lastEmail
  }
}

</script>
