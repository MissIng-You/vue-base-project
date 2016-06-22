<template>
  <div id="footer">
    <div class="navbar-footer fixed-bottom">&copy;Copyright {{footerMeta.title}}</div>
  </div>
</template>

<script>
  export default {
    name: 'FooterView',
    data () {
      return {
        footerMeta: {
          title: 'Vue.js Project V1.0'
        }
      }
    }
  }
</script>
