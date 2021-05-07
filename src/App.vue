<template>
  <div id="app">
    <ModalIsNeedTour v-if="isNeedToLearningPath" />
    <router-view to="/"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ModalIsNeedTour from "@/components/Popover/ModalIsNeedTour.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  computed: { ...mapGetters(["isNeedToLearningPath"]) },

  components: { ModalIsNeedTour }
});
</script>
