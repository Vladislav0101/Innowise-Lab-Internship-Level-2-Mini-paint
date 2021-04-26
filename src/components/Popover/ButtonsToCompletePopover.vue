<template>
  <div>
    <button class="agree-feature" @click="checkFeatureLocal">Ok</button>
    <button @click.prevent="complete">Complete</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  methods: {
    ...mapActions(["checkFeature", "completeAll"]),

    checkFeatureLocal(): void {
      this.checkFeature(this.idElement);
    },

    complete() {
      this.completeAll(true);
    }
  },

  props: ["idElement"]
});
</script>
