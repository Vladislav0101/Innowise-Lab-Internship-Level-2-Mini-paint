<template>
  <div class="wrapper">
    <Header />
    <div class="information-box">
      <HeaderInformation :userEmail="someoneUserEmail" />
      <AccountInfo :information="someoneUserInfo" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Vue from "vue";

import Header from "@/components/Header/Header.vue";
import HeaderInformation from "@/components/Account/HeaderInformation.vue";
import AccountInfo from "@/components/Account/AccountInfo.vue";

export default Vue.extend({
  computed: { ...mapGetters(["someoneUserInfo", "someoneUserEmail"]) },

  components: { Header, HeaderInformation, AccountInfo }
});
</script>
