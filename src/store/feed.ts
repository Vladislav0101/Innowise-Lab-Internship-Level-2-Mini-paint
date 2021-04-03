import firebase from "firebase";
import { IRootState, IFeed } from "@/types/index";
import { ActionTree, MutationTree, GetterTree } from "vuex";

const state: IFeed = {
  arrayOfUrls: [],
  token: null,
  page: null,
  isScroll: true,
};

const getters: GetterTree<IFeed, IRootState> = {
  arrayOfUrls(state) {
    // return state.arrayOfUrls.sort((a, b): number => {
    //   if (a.date > b.date) {
    //     return -1;
    //   } else if (a.date < b.date) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });
    return state.arrayOfUrls;
  },
  isScroll(state) {
    return state.isScroll;
  },
};

const mutations: MutationTree<IFeed> = {
  setArrayOfUrls(state, arrayOfUrls): void {
    state.arrayOfUrls = arrayOfUrls;
  },
  setToken(state, token) {
    state.token = token;
  },
  setPage(state, page) {
    state.page = page;
  },
  setIsScroll(state, value) {
    state.isScroll = value;
  },
};

const actions: ActionTree<IFeed, IRootState> = {
  async getPictures({ commit, dispatch }): Promise<void> {
    if (state.isScroll) {
      const storageRef = firebase.storage().ref("/");
      const numberOfPicturesOnPage = 7;

      const token = state.token;
      const page = token
        ? storageRef.list({
            maxResults: numberOfPicturesOnPage,
            pageToken: token,
          })
        : storageRef.list({ maxResults: numberOfPicturesOnPage });

      commit("setPage", page);
      commit("setToken", (await page).nextPageToken);
      dispatch("requestProcessing", {
        page: page,
        numberOfPicturesOnPage: numberOfPicturesOnPage,
        storageRef: storageRef,
      });
    }
  },
  requestProcessing({ commit }, { page, numberOfPicturesOnPage, storageRef }) {
    page.then((objOfFiles: any) => {
      const arrayOfUrls = state.arrayOfUrls;
      let numberOfElements = 0;

      objOfFiles.items.forEach((item: any) => {
        numberOfElements++;
        const [date, email]: string[] = item.name.split("-");
        const countOfFormatSymbols = 5;
        const emailToSet: string = email.slice(
          0,
          email.length - countOfFormatSymbols
        );

        storageRef
          .child(item.name)
          .getDownloadURL()
          .then((url: string) => {
            arrayOfUrls.push({
              url: url,
              email: emailToSet,
              date: date,
            });
          });
      });

      if (numberOfElements < numberOfPicturesOnPage) {
        commit("setIsScroll", false);
      }

      commit("setArrayOfUrls", arrayOfUrls);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
