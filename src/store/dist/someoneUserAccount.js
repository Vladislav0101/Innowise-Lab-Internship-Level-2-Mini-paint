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
        var _b;
        var email = _a.email, img = _a.img;
        state.usersAvatars = Object.assign({}, state.usersAvatars, (_b = {},
            _b[email] = img,
            _b));
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
    getSomeoneUserAvatar: function (_a, _b) {
        var getters = _a.getters, commit = _a.commit, state = _a.state;
        var userEmail = _b.userEmail, target = _b.target;
        var storageRef = firebase_1["default"].storage().ref();
        var emailToDB = helpFunction_1.stringToDBFormat(userEmail);
        firebase_1["default"]
            .database()
            .ref(emailToDB + "/isAvatar")
            .on("value", function (res) {
            var isAvatar = res.val();
            if (getters.usersAvatars[userEmail] === undefined) {
                if (target === "updateUserAvatar") {
                    delete state.usersAvatars[userEmail];
                }
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
    }
};
exports["default"] = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
