import {create} from "zustand"

export const useStore = create((set, get) => ({
  learningMode: "watch",
  setLearningMode: (mode) => set({learningMode: mode})
}))