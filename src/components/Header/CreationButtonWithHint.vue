<template>
  <Popover :idElement="idElement" :text="text">
    <CreationButton />
  </Popover>
</template>

<script lang="ts">
import Vue from "vue";

import Popover from "@/components/Popover/Popover.vue";
import CreationButton from "@/components/Header/CreationButton.vue";
export default Vue.extend({
  components: { Popover, CreationButton },

  props: ["idElement", "text"]
});
</script>
