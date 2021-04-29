"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var firebase_1 = require("firebase");
var state = {
    arrayOfUrls: [],
    token: null,
    isInfiniteScrollEnabled: false
};
var getters = {
    arrayOfUrls: function (state) {
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
    isInfiniteScrollEnabled: function (state) {
        return state.isInfiniteScrollEnabled;
    }
};
var mutations = {
    setArrayOfUrls: function (state, arrayOfUrls) {
        state.arrayOfUrls = arrayOfUrls;
    },
    setToken: function (state, token) {
        state.token = token;
    },
    setIsInfiniteScrollEnabled: function (state, value) {
        state.isInfiniteScrollEnabled = value;
    }
};
var actions = {
    getPictures: function (_a, aim) {
        var commit = _a.commit, dispatch = _a.dispatch;
        return __awaiter(this, void 0, Promise, function () {
            var storageRef, numberOfPicturesOnPage, token, page, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        storageRef = firebase_1["default"].storage().ref("/");
                        numberOfPicturesOnPage = 7;
                        token = state.token;
                        return [4 /*yield*/, token];
                    case 1:
                        page = (_g.sent())
                            ? storageRef.list({
                                maxResults: numberOfPicturesOnPage,
                                pageToken: token
                            })
                            : storageRef.list({ maxResults: numberOfPicturesOnPage });
                        _b = commit;
                        _c = ["setToken"];
                        return [4 /*yield*/, page];
                    case 2:
                        _b.apply(void 0, _c.concat([(_g.sent()).nextPageToken]));
                        _d = dispatch;
                        _e = ["requestProcessing"];
                        _f = {};
                        return [4 /*yield*/, page];
                    case 3: return [2 /*return*/, _d.apply(void 0, _e.concat([(_f.objOfFiles = _g.sent(),
                                _f.numberOfPicturesOnPage = numberOfPicturesOnPage,
                                _f.storageRef = storageRef,
                                _f.aim = aim,
                                _f)]))];
                }
            });
        });
    },
    requestProcessing: function (_a, _b) {
        var commit = _a.commit, getters = _a.getters, dispatch = _a.dispatch;
        var objOfFiles = _b.objOfFiles, numberOfPicturesOnPage = _b.numberOfPicturesOnPage, storageRef = _b.storageRef, aim = _b.aim;
        var arrayOfUrls = state.arrayOfUrls;
        var numberOfElements = 0;
        var slidesNumber = 5;
        objOfFiles.items.forEach(function (item) {
            numberOfElements++;
            var _a = item.name.split("-"), date = _a[0], email = _a[1];
            var countOfFormatSymbols = 5;
            var emailToSet = email.slice(0, email.length - countOfFormatSymbols);
            storageRef
                .child(item.name)
                .getDownloadURL()
                .then(function (url) {
                if (aim === "slider" && arrayOfUrls.length > slidesNumber - 1)
                    return;
                arrayOfUrls.push({
                    url: url,
                    email: emailToSet,
                    date: date
                });
                if (!(emailToSet in getters.usersAvatars)) {
                    commit("setUsersAvatars", { email: emailToSet, img: undefined });
                    dispatch("getSomeoneUserAvatar", { userEmail: emailToSet });
                }
            });
        });
        commit("setArrayOfUrls", arrayOfUrls);
        commit("setIsInfiniteScrollEnabled", numberOfPicturesOnPage === numberOfElements);
    }
};
exports["default"] = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
