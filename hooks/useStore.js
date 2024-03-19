import {create} from "zustand"
import {v4 as uuid} from "uuid"

/** 
  currentPlayerObj: {
    visemes: Array,
    audioPlay: string,
    textContent: string
  }
*/

export const useStore = create((set, get) => ({
  topic: "",
  audioPlaying: false,
  thread: [],

  chatPlayerObject: null,

  loadingAnswer: false,

  setLoader: (bool) => {
    set({loadingAnswer: bool})
  },

  setTopic: topic => {
    set({
      topic
    })
    console.log(topic)
  },

  askTutor: async (question) => {
    if (!question) return
    set(state => ({
      loadingAnswer: true
    }))
    try {
      const audioRes = await fetch(`/api/topic/${get().topic}/chat?question=${question}`)
      const audio = await audioRes.blob()
      const visemes = JSON.parse(await audioRes.headers.get('visemes'))
      const audioURL = URL.createObjectURL(audio)
      const audioPlayer = new Audio(audioURL)
      console.log(audioRes)

      audioPlayer.currentTime = 0
      audioPlayer.play()
      set({audioPlaying: true})
      set({loadingAnswer: false})

      audioPlayer.onended = () => {
        set(state => ({
          audioPlaying: false
        }))
      }

      const chatPlayerObject = {
        audioPlayer,
        visemes
      }

      set({chatPlayerObject})
    } catch (err) {
      set({loadingAnswer: false})
    }

      
  },
  
}))