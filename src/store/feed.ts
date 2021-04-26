import firebase from "firebase";
import { ActionTree, MutationTree, GetterTree } from "vuex";

import { IRootState, IFeed } from "@/types/index";

const state: IFeed = {
  arrayOfUrls: [],
  token: null,
  isInfiniteScrollEnabled: false,
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

  isInfiniteScrollEnabled(state) {
    return state.isInfiniteScrollEnabled;
  },
};

const mutations: MutationTree<IFeed> = {
  setArrayOfUrls(state, arrayOfUrls): void {
    state.arrayOfUrls = arrayOfUrls;
  },
  setToken(state, token) {
    state.token = token;
  },
  setIsInfiniteScrollEnabled(state, value) {
    state.isInfiniteScrollEnabled = value;
  },
};

const actions: ActionTree<IFeed, IRootState> = {
  async getPictures({ commit, dispatch }, aim): Promise<void> {
    const storageRef = firebase.storage().ref("/");
    const numberOfPicturesOnPage = 7;

    const token = state.token;
    const page = (await token)
      ? storageRef.list({
          maxResults: numberOfPicturesOnPage,
          pageToken: token,
        })
      : storageRef.list({ maxResults: numberOfPicturesOnPage });

    commit("setToken", (await page).nextPageToken);

    return dispatch("requestProcessing", {
      objOfFiles: await page,
      numberOfPicturesOnPage,
      storageRef,
      aim,
    });
  },

  requestProcessing(
    { commit },
    { objOfFiles, numberOfPicturesOnPage, storageRef, aim }
  ) {
    const arrayOfUrls = state.arrayOfUrls;
    let numberOfElements = 0;
    const slidesNumber = 5;

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
          if (aim === "slider" && arrayOfUrls.length > slidesNumber - 1) return;
          arrayOfUrls.push({
            url: url,
            email: emailToSet,
            date: date,
          });
        });
    });

    commit("setArrayOfUrls", arrayOfUrls);
    commit(
      "setIsInfiniteScrollEnabled",
      numberOfPicturesOnPage === numberOfElements
    );
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
