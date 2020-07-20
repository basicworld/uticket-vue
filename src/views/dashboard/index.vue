<template>
  <div>
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import customerDashBoard from './customer'
import staffDashBoard from './staff'
export default {
  name: 'Dashboard',
  components: { customerDashBoard, staffDashBoard },
  data() {
    return {
      currentRole: 'staffDashBoard'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'customerDashBoard'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
