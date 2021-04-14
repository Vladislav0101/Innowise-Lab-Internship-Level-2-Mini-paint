<template>
  <Popover :idElement="idElement" :text="text">
    <ToSliderButton />
  </Popover>
</template>

<script lang="ts">
import Vue from "vue";

import Popover from "@/components/Popover/Popover.vue";
import ToSliderButton from "@/components/Main/ToSliderButton.vue";

export default Vue.extend({
  components: { Popover, ToSliderButton },

  props: ["idElement", "text"]
});
</script>
