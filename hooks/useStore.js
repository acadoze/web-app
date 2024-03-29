import {create} from "zustand"
import {v4 as uuid} from "uuid"

/** 
  currentPlayerObj: {
    visemes: Array,
    audioPlay: string,
    textContent: string
  }
*/

export const useTeacherPage = create((set, get) => ({
  profile: null,
  resources: null,
  students: null,
  classRooms: null,
  showSubBanner: false,
  activeClassRoom: null,
  currentStudentRecord: null,

  setSubBanner: val => {
    set({
      showSubHeader: val
    })
  },

  setCurrentStudentRecord: val => {
    set({
      currentStudentRecord: val
    })
  },

  setActiveClassRoom: obj => {
    set({
      activeClassRoom: obj
    })
  },

  setProfile: (profile) => {
    set({
      profile
    })
  },
  setStudents: (list) => {
    set({
      students: list
    })
  },
  setClassRooms: (list) => {
    set({
      classRooms: list
    })
  },
  setResources: (list) => {
    set({
      resources: list
    })
  }
}))

export const useStore = create((set, get) => ({
  topicId: "",
  assignedTopics: [],
  authToken: null,

  chatPlayerObject: null,

  loadingAnswer: false,

  authExpired: false,

  setAuthToken: authToken => {
    set({authToken})
  },

  setAssignedTopics: (assignedTopics) => {
    set({assignedTopics})
  },

  setLoader: (bool) => {
    set({loadingAnswer: bool})
  },

  setTopicId: topicId => {
    set({
      topicId
    })
    console.log(topicId)
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

  askTutor: async (question, topicId) => {
    if (!question) return
    set(state => ({
      loadingAnswer: true
    }))
    try {
      const audioRes = await fetch(`${process.env.API_BASE}/topic/${get().topicId}/chat?question=${question}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
      if (audioRes.status !== 200) {
        return
      }
      const audio = await audioRes.blob()
      const visemes = JSON.parse(audioRes.headers.get("visemes"))
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
      console.error(err)
      set({loadingAnswer: false})
    }

      
  },
  
}))