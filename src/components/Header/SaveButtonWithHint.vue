<template>
  <Popover :idElement="idElement" :text="text">
    <SaveButton />
  </Popover>
</template>

<script lang="ts">
import Vue from "vue";

import Popover from "@/components/Popover/Popover.vue";
import SaveButton from "@/components/Header/SaveButton.vue";

export default Vue.extend({
  components: { Popover, SaveButton },

  props: ["idElement", "text"]
});
</script>
