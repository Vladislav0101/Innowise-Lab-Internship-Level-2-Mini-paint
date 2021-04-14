<template>
  <div class="popover-box">
    <div class="notification"></div>

    <div :id="idElement">
      <Tool :class="toolClass" :mode="mode"><slot></slot></Tool>
    </div>

    <b-popover
      :target="idElement"
      triggers="hover"
      placement="right"
      class="popover"
    >
      <h2>{{ idElement }}</h2>
      <p>{{ text }}</p>
      <button class="agree-feature">OK</button>
    </b-popover>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Tool from "@/components/Create/Tool.vue";
import Popover from "@/components/Popover/Popover.vue";

export default Vue.extend({
  props: ["mode", "toolClass", "idElement", "text"],

  components: { Tool, Popover }
});
</script>
