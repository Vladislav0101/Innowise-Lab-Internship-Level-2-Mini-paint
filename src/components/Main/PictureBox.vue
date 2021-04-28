<template>
  <div class="picture_box" id="picture_box">
    <router-link :to="{ name: 'someoneUser' }">
      <div @click="getSomeoneUserInfoLocal" class="name">
        <Avatar :mail="pictureInfo.email" />
        <span> {{ pictureInfo.email }}</span>
      </div>
    </router-link>

    <img alt="picture" :src="pictureInfo.url" />

    <span class="date">{{ dateLocal }}</span>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import Vue from "vue";

import Avatar from "@/components/Account/Avatar.vue";

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
  },

  components: { Avatar }
});
</script>
