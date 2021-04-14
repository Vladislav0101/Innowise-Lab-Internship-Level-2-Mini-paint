<template>
  <button class="save" @click="save">
    <img src="../../assets/save.png" alt="picture" />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import { mapGetters } from "vuex";

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

  props: ["canvas"],

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
