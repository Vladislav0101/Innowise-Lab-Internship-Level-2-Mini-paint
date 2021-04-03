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
import { IFeedObject } from "@/types/index";

export default Vue.extend({
  data(): {
    inputUser: string;
    arrOfChosenUserPict: string;
    lastCall: Date | null;
  } {
    return {
      inputUser: "",
      arrOfChosenUserPict: "",
      lastCall: null
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
    },
    throttle(t: number) {
      const previousCall: Date | null = this.lastCall;
      this.lastCall = new Date();

      if (
        (!previousCall || +this.lastCall - +previousCall > t) &&
        this.isScroll
      ) {
        this.getPictures();
      }
    }
  },
  mounted() {
    this.getPictures(0);
    window.addEventListener("scroll", () => {
      const totalHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const displayHeight = document.documentElement.clientHeight;

      if (totalHeight - scrollTop - displayHeight <= 300) {
        this.throttle(250);
      }
    });
  },
  computed: {
    ...mapGetters(["arrayOfUrls", "isScroll"])
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
