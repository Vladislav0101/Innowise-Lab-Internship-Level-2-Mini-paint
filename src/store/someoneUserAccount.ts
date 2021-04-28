import firebase from "firebase";
import { ActionTree, MutationTree, GetterTree } from "vuex";

import { IRootState, ISomeoneUser } from "@/types/index";
import { stringToDBFormat } from "@/utils/helpFunction";

const state: ISomeoneUser = {
  someoneUserInfo: null,
  someoneUserEmail: null,
  usersAvatars: {},
};

const getters: GetterTree<ISomeoneUser, IRootState> = {
  someoneUserInfo(state) {
    return state.someoneUserInfo;
  },
  someoneUserEmail(state) {
    return state.someoneUserEmail;
  },
  usersAvatars(state) {
    return state.usersAvatars;
  },
};

const mutations: MutationTree<ISomeoneUser> = {
  setSomeoneUserInfo(state, userInfo) {
    state.someoneUserInfo = userInfo;
  },
  setSomeoneUserEmail(state, email) {
    state.someoneUserEmail = email;
  },
  setUsersAvatars(state, { email, img }) {
    state.usersAvatars[email] = img;
    console.log("state.usersAvatars", state.usersAvatars);
  },
};

const actions: ActionTree<ISomeoneUser, IRootState> = {
  getSomeoneUserInfo({ commit }, email) {
    commit("setSomeoneUserEmail", email);

    const emailToDb = stringToDBFormat(email);
    firebase
      .database()
      .ref(`${emailToDb}/userInfo`)
      .on("value", (res) => {
        commit("setSomeoneUserInfo", res.val());
      });
  },

  getSomeoneUserAvatar({ getters, commit }, userEmail) {
    const storageRef = firebase.storage().ref();
    // if (getters.email === userEmail) {

    const emailToDB = stringToDBFormat(userEmail);

    firebase
      .database()
      .ref(`${emailToDB}/isAvatar`)
      .on("value", (res) => {
        const isAvatar = res.val();

        if (getters.usersAvatars[userEmail] === undefined) {
          if (isAvatar) {
            storageRef
              .child(`avatars/${userEmail}.jpeg`)
              .getDownloadURL()
              .then((url: string) => {
                commit("setUsersAvatars", { email: userEmail, img: url });
              });
          } else {
            commit("setUsersAvatars", { email: userEmail, img: null });
          }
        }
      });

    // } else {
    //   storageRef
    //     .child("avatars/")
    //     .listAll()
    //     .then((res) => {
    //       res.items.forEach((fullImgObj) => {
    //         fullImgObj.getDownloadURL().then((img) => {
    //           const email = fullImgObj.name.split(".jpeg")[0];

    //           commit("setUsersAvatars", { email, img });
    //         });
    //       });
    //     });
    // }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
