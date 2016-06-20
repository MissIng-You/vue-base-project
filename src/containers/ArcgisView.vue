<template>
  <div class="claro">
    <div>{{ arcgis }}</div>
    <div id="world-map"></div>
    <div id="menuDiv">
      <h3>U.S. Educational Attainment</h3>
      <p>Select the variables to include in the predominance map for exploring adult educational attainment by U.S. county.</p>
      <select id="menu">
        <option value="all" selected>All educational attainment</option>
        <option value="attendedCol">Attended at least some college</option>
        <option value="bachelor">Finished bachelor's degree</option>
        <option value="postgrad">Finished post graduate degree</option>
      </select><br><br>
      <div id="legendDiv"></div>
    </div>
    <!--<input v-model="arcgis">-->
  </div>
</template>
<script>
//  import $ from 'jquery'
//  import config from '../shared/dojo.map.config'
//  import '../components/scc.bootstrap-custom-scss'
//  import '../vendor/arcgis/init'
//  import mapMini from '../shared/map/map.init'
//  import Map from 'esri/map'
//  import node from 'dojo/node'

  export default {
    name: 'ArcgisView',

    data () {
      return {
        arcgis: 'this is template body'
      }
    },

    ready () {
      /*eslint no-new: "error"*/
      /*eslint no-unused-vars: "off"*/
//      console.log($)
//      console.log(config)
//      console.log(esri)
    }

  }
</script>

