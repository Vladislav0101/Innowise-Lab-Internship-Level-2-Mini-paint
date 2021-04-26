<template>
  <div class="picture_box" id="picture_box">
    <router-link :to="{ name: 'someoneUser' }" class="name">
      <span @click="getSomeoneUserInfoLocal"> {{ pictureInfo.email }}</span>
    </router-link>

    <img alt="picture" :src="pictureInfo.url" ref="image" />

    <span class="date">{{ dateLocal }}</span>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import Vue from "vue";

export default Vue.extend({
  data(): { dateLocal: string } {
    return {
      dateLocal: ""
    };
  },

  methods: {
    ...mapActions(["getSomeoneUserInfo"]),

    getSomeoneUserInfoLocal() {
      this.getSomeoneUserInfo(this.pictureInfo.email);
    }
  },

  props: ["pictureInfo"],

  mounted() {
    const pictureDate: Date = new Date(+this.pictureInfo.date),
      day = pictureDate.getDate(),
      month = pictureDate.getMonth(),
      year = pictureDate.getFullYear(),
      months: Array<string> = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

    this.dateLocal = `${("" + day).length < 2 ? "0" + day : day}/${
      months[month]
    }/${year}`;
  }
});
</script>
