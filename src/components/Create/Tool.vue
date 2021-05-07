<template>
  <div :class="toolClass" @click="setFigureMode">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import Vue from "vue";

export default Vue.extend({
  methods: {
    ...mapActions(["setMode"]),

    setFigureMode() {
      if (this.mode) this.setMode(this.mode);
    }
  },

  props: ["mode", "toolClass", "html"]
});
</script>
