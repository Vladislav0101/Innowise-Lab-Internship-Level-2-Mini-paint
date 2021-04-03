<template>
  <div class="picture_box" id="picture_box">
    <span class="name">{{ pictureInfo.email }}</span>
    <img alt="picture" :src="pictureInfo.url" />
    <span class="date">{{ dateLocal }}</span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): { dateLocal: string } {
    return {
      dateLocal: ""
    };
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
<style scoped>
.date {
  text-align: right;
  margin-top: 5px;
}
</style>
