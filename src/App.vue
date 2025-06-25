<script setup></script>

<template>
  <div id="App">
    <router-view></router-view>
  </div>
</template>

<style>
:root body {
  height: 100vh;
  background: #ffffff;
}
.content-container {
  display: inline-block;
  padding: 20px;
  margin: 20px;
  min-width: 1200px;
  width: 97%;
  border-radius: 10px;
  background: white;
}
.input-tip {
  margin: 0 10px;
  line-height: 40px;
}
.input-field {
  margin-right: 40px;
}
.content-row {
  margin-bottom: 20px;
}
</style>
