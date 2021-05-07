import { mapGetters } from "vuex";

const isCurrentVersion = {
  computed:{
    ...mapGetters(['version'])
    isCurrentVersion(){
      return this.a
    }
  }
};
