<template>
  <div>
    <span>客服首页：{{ name }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardStaff',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>
