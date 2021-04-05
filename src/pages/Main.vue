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
import { mapActions, mapGetters } from "vuex";
import throttle from "lodash/throttle";

import { IFeedObject } from "@/types/index";

import Header from "@/components/Header/Header.vue";
import PictureBox from "@/components/Main/PictureBox.vue";

interface MainDataProps {
  inputUser: string;
  arrOfChosenUserPict: string;
  lastCall: Date | null;
  distanceToTheBottom: number;
  isScroll: boolean;
}
export default Vue.extend({
  data(): MainDataProps {
    return {
      inputUser: "",
      arrOfChosenUserPict: "",
      lastCall: null,
      distanceToTheBottom: 300,
      isScroll: true
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

    setIsScroll(res: { [key: string]: number }) {
      this.isScroll = res.numberOfPicturesOnPage === res.numberOfElements;
    },

    subscribeToScroll() {
      window.addEventListener(
        "scroll",
        throttle(() => {
          const totalHeight = document.documentElement.scrollHeight;
          const scrollTop = window.pageYOffset;
          const displayHeight = document.documentElement.clientHeight;

          if (
            totalHeight - scrollTop - displayHeight <=
              this.distanceToTheBottom &&
            this.isScroll
          ) {
            this.getPictures().then(this.setIsScroll);
          }
        }, 300)
      );
    }
  },

  mounted() {
    this.getPictures().then(this.setIsScroll);

    this.subscribeToScroll();
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
