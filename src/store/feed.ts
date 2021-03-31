import firebase from "firebase";
import { IRootState, IFeed } from "@/types/index";
import { ActionTree, MutationTree, GetterTree } from "vuex";

const state: IFeed = {
  arrayOfUrls: [],
};

const getters: GetterTree<IFeed, IRootState> = {
  arrayOfUrls(state) {
    return state.arrayOfUrls.sort((a, b): number => {
      if (a.date > b.date) {
        return -1;
      } else if (a.date < b.date) {
        return 1;
      } else {
        return 0;
      }
    });
  },
};

const mutations: MutationTree<IFeed> = {
  setArrayOfUrls(state, arrayOfUrls): void {
    state.arrayOfUrls = arrayOfUrls;
  },
};

const actions: ActionTree<IFeed, IRootState> = {
  async getPictures({ commit }): Promise<void> {
    const arrayOfUrls: Array<object> = [];
    const storageRef = firebase.storage().ref();

    storageRef.listAll().then((objOfFiles) => {
      objOfFiles.items.forEach((item) => {
        const [date, email]: string[] = item.name.split("-");
        const countOfFormatSymbols = 5;
        const emailToSet: string = email.slice(
          0,
          email.length - countOfFormatSymbols
        );

        storageRef
          .child(item.name)
          .getDownloadURL()
          .then((url) => {
            arrayOfUrls.push({
              url: url,
              email: emailToSet,
              date: date,
            });
          });
      });
    });
    commit("setArrayOfUrls", arrayOfUrls);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
