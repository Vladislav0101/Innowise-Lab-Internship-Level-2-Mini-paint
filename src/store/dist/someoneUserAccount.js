"use strict";
exports.__esModule = true;
var firebase_1 = require("firebase");
var helpFunction_1 = require("@/utils/helpFunction");
var state = {
    someoneUserInfo: null,
    someoneUserEmail: null,
    usersAvatars: {}
};
var getters = {
    someoneUserInfo: function (state) {
        return state.someoneUserInfo;
    },
    someoneUserEmail: function (state) {
        return state.someoneUserEmail;
    },
    usersAvatars: function (state) {
        return state.usersAvatars;
    }
};
var mutations = {
    setSomeoneUserInfo: function (state, userInfo) {
        state.someoneUserInfo = userInfo;
    },
    setSomeoneUserEmail: function (state, email) {
        state.someoneUserEmail = email;
    },
    setUsersAvatars: function (state, _a) {
        var email = _a.email, img = _a.img;
        state.usersAvatars[email] = img;
        console.log("state.usersAvatars", state.usersAvatars);
    }
};
var actions = {
    getSomeoneUserInfo: function (_a, email) {
        var commit = _a.commit;
        commit("setSomeoneUserEmail", email);
        var emailToDb = helpFunction_1.stringToDBFormat(email);
        firebase_1["default"]
            .database()
            .ref(emailToDb + "/userInfo")
            .on("value", function (res) {
            commit("setSomeoneUserInfo", res.val());
        });
    },
    getSomeoneUserAvatar: function (_a, userEmail) {
        var getters = _a.getters, commit = _a.commit;
        var storageRef = firebase_1["default"].storage().ref();
        // if (getters.email === userEmail) {
        var emailToDB = helpFunction_1.stringToDBFormat(userEmail);
        firebase_1["default"]
            .database()
            .ref(emailToDB + "/isAvatar")
            .on("value", function (res) {
            var isAvatar = res.val();
            if (getters.usersAvatars[userEmail] === undefined) {
                if (isAvatar) {
                    storageRef
                        .child("avatars/" + userEmail + ".jpeg")
                        .getDownloadURL()
                        .then(function (url) {
                        commit("setUsersAvatars", { email: userEmail, img: url });
                    });
                }
                else {
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
    }
};
exports["default"] = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
