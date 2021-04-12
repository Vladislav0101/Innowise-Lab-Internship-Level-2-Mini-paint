<template>
  <Popover :idElement="'save-button'" :requiredVersion="'1.0'">
    <button class="save" @click="save">
      <img src="../../assets/save.png" alt="picture" />
    </button>
  </Popover>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import { mapGetters } from "vuex";

import Popover from "@/components/Popover/Popover.vue";

export default Vue.extend({
  methods: {
    save(): void {
      const storageRef = firebase.storage().ref();
      const img: string = this.canvas.toDataURL();

      storageRef
        .child(`${+new Date()}-${this.email}.jpeg`)
        .putString(img, "data_url");
      alert("Save completed");
    }
  },

  components: { Popover },

  props: ["canvas", "popoverText"],

  computed: {
    ...mapGetters(["email"])
  }
});
</script>

<style scoped>
.save img {
  width: 35px;
}
</style>
