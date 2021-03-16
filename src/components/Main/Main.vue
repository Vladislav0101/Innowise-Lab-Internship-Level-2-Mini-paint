<template>
  <main>
    <Header></Header>
    <section class="search">
      <input
        type="text"
        v-model="inputUser"
        @keypress.enter="filterUsers"
        @blur="filterUsers"
        placeholder="find"
      />
    </section>
    <section class="feed" v-if="arrOfChosenUserPict || arrayOfUrls">
      <PictureBox
        v-for="pictureInfo of arrOfChosenUserPict
          ? arrOfChosenUserPict
          : arrayOfUrls"
        :key="pictureInfo.date"
        :pictureInfo="pictureInfo"
      />
    </section>
    <section v-else>I'm sorry</section>
  </main>
</template>
<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header/Header.vue";
import PictureBox from "@/components/Main/PictureBox.vue";
import { mapActions, mapGetters } from "vuex";
import { IFeedObject, IMainData } from "@/utils/types";

export default Vue.extend({
  data(): IMainData {
    return {
      inputUser: "",
      arrOfChosenUserPict: ""
    };
  },
  methods: {
    ...mapActions(["getPictures"]),
    filterUsers(): void {
      if (this.inputUser) {
        this.arrOfChosenUserPict = this.arrayOfUrls.filter(
          (item: IFeedObject) => {
            return item.email === this.inputUser;
          }
        );
      } else {
        this.arrOfChosenUserPict = "";
      }
    }
  },
  mounted() {
    this.getPictures();
  },
  computed: {
    ...mapGetters(["arrayOfUrls"])
  },
  components: {
    Header,
    PictureBox
  }
});
</script>
<style scoped>
.search {
  text-align: center;
  margin-top: 10px;
}
.search input {
  padding-left: 10px;
}
.feed {
  display: grid;
  justify-content: center;
}
</style>
