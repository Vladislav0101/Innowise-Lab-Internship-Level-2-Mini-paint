import { ActionTree, MutationTree, GetterTree } from "vuex";
import firebase from "firebase/app";

import { IAnalytics, IRootState } from "@/types/index";

const state: IAnalytics = {
  drawingProcess: {
    start: null,
    end: null,
    isDrawing: false,
  },
};

const getters: GetterTree<IAnalytics, IRootState> = {
  drawingProcess(state) {
    return state.drawingProcess;
  },
};

const mutations: MutationTree<IAnalytics> = {
  setDrawingProcess(state, { start, end, isDrawing }) {
    if (start) state.drawingProcess.start = start;
    if (end) state.drawingProcess.end = end;
    if (isDrawing) state.drawingProcess.isDrawing = isDrawing;
  },
};

const actions: ActionTree<IAnalytics, IRootState> = {
  setEventFirebaseAnalytics({ commit }, { eventName, data }) {
    firebase.analytics().logEvent(`${eventName}`, { ...data });
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

        dispatch("setEventFirebaseAnalytics", {
          eventName: "drawing-process",
          data: {
            startDrawing: start,
            endDrawing: end,
            totalTime: end - start,
          },
        });
      }
    }
  },
};

export default { state, getters, mutations, actions };
