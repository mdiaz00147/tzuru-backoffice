<template>
  <b-nav fill tabs>
    <b-nav-item :active="activeList" :to="{name:'InventoryList'}">
      All <i class="icon-options-vertical" />
    </b-nav-item>
    <b-nav-item :active="activeNew" :to="{name:'InventoryNew'}">
      New <i class="icon-plus" />
    </b-nav-item>
    <b-nav-item  >
      Import <i class="icon-cloud-upload" />
    </b-nav-item>
  </b-nav>
</template>

<script>
export default {
  props: {
    activeList: {
      type: Boolean
    },
    activeNew: {
      type: Boolean
    }
  },
  name: 'NavTop'
}
</script>
