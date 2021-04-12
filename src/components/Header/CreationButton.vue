<template>
  <Popover :idElement="'creation-button'" :requiredVersion="'1.0'">
    <router-link :to="{ name: 'create' }">
      <button class="createButton">
        create
      </button>
    </router-link>
  </Popover>
</template>
<script lang="ts">
import Vue from "vue";

import Popover from "@/components/Popover/Popover.vue";

export default Vue.extend({
  components: { Popover }
});
</script>
