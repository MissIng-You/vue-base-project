<template>
  <div id="index-view">

    <div class="card card-primary">
      <div class="card-header">表头</div>
      <div class="card-footer">
        <table class="table table-sm table-bordered table-striped table-hover-outline ">
          <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card-group card-info-outline">
      <div class="card card-info-outline">
        <div class="card-header">
          <span class="card-title">{{msg}}</span>
          <span class="card-subtitle">{{msg}}</span>
          <span class="card-link">1</span>
          <span class="card-link">2</span>
          <span class="card-link">3</span>
          <span class="card-link">4</span>
          <span class="card-link">5</span>
        </div>
        <div class="card-footer">{{msg}}</div>
        <div class="card-footer">{{msg}}</div>
      </div>
      <div class="card card-info-outline">
        <div class="card-header">
          <span class="card-title">{{msg}}</span>
          <span class="card-subtitle">{{msg}}</span>
          <span class="card-link">1</span>
          <span class="card-link">2</span>
          <span class="card-link">3</span>
          <span class="card-link">4</span>
          <span class="card-link">5</span>
        </div>
        <div class="card-footer">{{msg}}</div>
        <div class="card-footer">{{msg}}</div>
      </div>
      <div class="card card-info-outline">
        <div class="card-header">
          <span class="card-title">{{msg}}</span>
          <span class="card-subtitle">{{msg}}</span>
          <span class="card-link">1</span>
          <span class="card-link">2</span>
          <span class="card-link">3</span>
          <span class="card-link">4</span>
          <span class="card-link">5</span>
        </div>
        <div class="card-footer">{{msg}}</div>
        <div class="card-footer">{{msg}}</div>
      </div>
      <div class="card card-info-outline">
        <div class="card-header">
          <span class="card-title">{{msg}}</span>
          <span class="card-subtitle">{{msg}}</span>
          <span class="card-link">1</span>
          <span class="card-link">2</span>
          <span class="card-link">3</span>
          <span class="card-link">4</span>
          <span class="card-link">5</span>
        </div>
        <div class="card-footer">{{msg}}</div>
        <div class="card-footer">{{msg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'IndexView',

    data () {
      return {
        msg: 'Index View Template !'
      }
    }
  }
</script>
