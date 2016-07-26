<template>
  <div class="alert alert-info"><i class="fa fa-info-circle fa-lg"></i> 没有数据，<span class="btn btn-primary-outline btn-xs" @click="onAlertClick">点我</span> 添加新数据!</div>
</template>
<script>
  export default {
    name: 'EmptyDataView',
    methods: {
      onAlertClick () {
        this.$dispatch('alert')
      }
    }
  }
</script>
