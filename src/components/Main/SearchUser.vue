<template>
  <div class="search">
    <input
      type="text"
      v-model="inputUser"
      @input="$emit('inputUser', inputUser)"
      placeholder="find"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): { inputUser: string } {
    return {
      inputUser: ""
    };
  }
});
</script>
<style scoped>
.search input {
  padding-left: 10px;
}
</style>
