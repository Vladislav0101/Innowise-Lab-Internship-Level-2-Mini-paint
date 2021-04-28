"use strict";
exports.__esModule = true;
var firebase_1 = require("firebase");
var state = {
    size: 5,
    color: "#000000",
    mode: "pencil"
};
var getters = {
    size: function (state) {
        return state.size;
    },
    color: function (state) {
        return state.color;
    },
    mode: function (state) {
        return state.mode;
    }
};
var mutations = {
    setSize: function (state, newSize) {
        state.size = newSize;
    },
    setColor: function (state, newColor) {
        state.color = newColor;
    },
    setMode: function (state, mode) {
        state.mode = mode;
    }
};
var actions = {
    setSize: function (_a, newSize) {
        var commit = _a.commit;
        commit("setSize", newSize);
    },
    setColor: function (_a, newColor) {
        var commit = _a.commit;
        commit("setColor", newColor);
    },
    setMode: function (_a, mode) {
        var commit = _a.commit;
        commit("setMode", mode);
    },
    savePicture: function (_a, _b) {
        var getters = _a.getters;
        var img = _b.img;
        var storageRef = firebase_1["default"].storage().ref();
        storageRef
            .child(+new Date() + "-" + getters.email + ".jpeg")
            .putString(img, "data_url");
    }
};
exports["default"] = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
