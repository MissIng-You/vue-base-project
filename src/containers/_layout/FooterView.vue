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
          title: '成都万江港利科技股份有限公司'
        }
      }
    }
  }
</script>
