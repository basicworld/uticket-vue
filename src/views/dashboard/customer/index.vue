<template>
  <div>
    <span>客户首页：{{ name }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardCustomer',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>
