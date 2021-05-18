import { ActionTree, MutationTree, GetterTree } from "vuex";
import firebase from "firebase/app";

import { IAnalytics, IRootState } from "@/types/index";

const state: IAnalytics = {
  drawingProcess: {
    start: null,
    end: null,
    isDrawing: false,
  },
  dataAnalytics: null,
  isLoadAnalytics: false,
};

const getters: GetterTree<IAnalytics, IRootState> = {
  drawingProcess(state) {
    return state.drawingProcess;
  },

  dataAnalytics(state) {
    return state.dataAnalytics;
  },

  isLoadAnalytics(state) {
    return state.isLoadAnalytics;
  },
};

const mutations: MutationTree<IAnalytics> = {
  setDrawingProcess(state, { start, end, isDrawing }) {
    if (start) state.drawingProcess.start = start;
    if (end) state.drawingProcess.end = end;
    if (isDrawing) state.drawingProcess.isDrawing = isDrawing;
  },

  setDataAnalytics(state, analyticsObject) {
    state.dataAnalytics = analyticsObject;
  },

  setIsLoadAnalytics(state, value) {
    state.isLoadAnalytics = value;
  },
};

const actions: ActionTree<IAnalytics, IRootState> = {
  setAnalyticsUnit({ dispatch, getters }, { data }) {
    const user = getters.user;

    firebase
      .database()
      .ref(`analytics/${new Date().getTime()}`)
      .update({ ...data, user: user });
  },

  setPageVisit({ dispatch }, eventName) {
    dispatch("setAnalyticsUnit", {
      data: {
        event: `visit-page`,
        type: eventName,
      },
    });
  },

  setDrawingProcess({ getters, commit, dispatch }, mode) {
    if (mode === "start") {
      commit("setDrawingProcess", {
        start: new Date().getTime(),
        isDrawing: true,
      });
    } else if (mode === "end") {
      if (getters.drawingProcess.isDrawing === true) {
        commit("setDrawingProcess", {
          end: new Date().getTime(),
          isDrawing: false,
        });

        const start = getters.drawingProcess.start;
        const end = getters.drawingProcess.end;

        dispatch("setAnalyticsUnit", {
          data: {
            event: "drawingProcess",
            startDrawing: start,
            endDrawing: end,
            totalTime: end - start,
          },
        });
      }
    }
  },

  getAnalytics({ commit, dispatch }) {
    const ref = firebase.database().ref("analytics");

    ref.on("value", (res) => {
      commit("setDataAnalytics", res.val());
      commit("setIsLoadAnalytics", true);
    });
  },
};

export default { state, getters, mutations, actions };
