<template>
  <div class="modal-box">
    <div class="modal-window">
      <h2>We have some new features, would you like to see them?</h2>
      <form>
        <button @click="agree">Yes</button>
        <button @click="disagree">No</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapMutations } from "vuex";
import Vue from "vue";

export default Vue.extend({
  methods: {
    ...mapMutations(["setIsLearningPathActive"]),
    ...mapActions(["setVersionOnDB"]),

    agree() {
      this.setIsLearningPathActive(true);
    },

    disagree() {
      this.setIsLearningPathActive(false);
      this.setVersionOnDB(true);
    }
  }
});
</script>

<style>
.modal-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
form {
  display: flex;
  justify-content: space-around;
}
</style>
