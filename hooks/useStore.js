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

  playAudio: () => {
    const chatPlayerObject = get().chatPlayerObject
    if (!chatPlayerObject || !chatPlayerObject.audioPlayer) {
      return 
    }
    chatPlayerObject.audioPlayer.play()
    set({
      chatPlayerObject: {...chatPlayerObject, audioPlaying: false}
    })
  },
  pauseAudio: async () => {
    const chatPlayerObject = get().chatPlayerObject
    if (!chatPlayerObject || !chatPlayerObject.audioPlayer || !chatPlayerObject.audioPlaying) {
      return 
    }
    chatPlayerObject.audioPlayer.pause()
    set({
      chatPlayerObject: {...chatPlayerObject, audioPlaying: false}
    })    
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

      audioPlayer.currentTime = 0
      audioPlayer.play()
      
      set({loadingAnswer: false})

      audioPlayer.onended = () => {
        set({chatPlayerObject: {...get().chatPlayerObject, audioPlaying: false}})
      };

      audioPlayer.onpaused = () => {
        set({chatPlayerObject: {...get().chatPlayerObject, audioPlaying: false}})
        console.log(chatPlayerObject)
      }

      audioPlayer.onplay = () => {
        set({chatPlayerObject: {...get().chatPlayerObject, audioPlaying: true}})
      }

      const chatPlayerObject = {
        audioPlayer,
        visemes,
      }

      set({chatPlayerObject})
    } catch (err) {
      set({loadingAnswer: false})
    }

      
  },
  
}))