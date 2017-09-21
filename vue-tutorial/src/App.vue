<template>
  <div id="wrapper">
 <!-- <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          计划板
        </a>
        <ul class="nav navbar-nav">
          <li><router-link to="/home">首页</router-link></li>
          <li><router-link to="/time-entries">计划列表</router-link></li>
        </ul>
      </div>
    </nav>  -->
    <div class="row">
  <div class="col-xs-offset-2 col-xs-8">
    <div class="page-header">
      <h1>Rhaast</h1>

    </div>
  </div>
</div>
<div class="row">
  <div class="col-xs-2 col-xs-offset-2">
    <div class="list-group">
      <!--使用指令v-link进行导航-->
      <router-link :to="{path: '/home'}" class="list-group-item" active-class="active">Home</router-link>
      <router-link :to="{path: '/time-entries'}" class="list-group-item" active-class="active">Add</router-link>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="panel">
      <div class="panel-body">
        <!--用于渲染匹配的组件-->
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
    <div class="container">
      <div class="col-sm-3">
        <sidebar></sidebar>

      </div>
      <!-- <div class="col-sm-9">
        <router-view></router-view>
      </div> -->
    </div>
  </div>
</template>
<script>
  import Sidebar from './components/Sidebar.vue'

  export default {
    components: { 'sidebar': Sidebar },
  }
</script>
<style>
.list-group-item.active, .list-group-item.active:hover, .list-group-item.active:focus{
background-color: #5272f9;
color: #fff;

}
</style>
