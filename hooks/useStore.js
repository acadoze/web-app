import {create} from "zustand"
import {v4 as uuid} from "uuid"
import axios from "axios"

/** 
  currentPlayerObj: {
    visemes: Array,
    audioPlay: string,
    textContent: string
  }
*/

export const useStore = create((set, get) => ({
  loadingTopicContent: false,
  topic: "",

  tutorPlayerObject: null,
  chatPlayerObject: null,

  setTopic: topic => {
    set({
      topic
    })
  },

  setLoaderState: (value) => {
    set({
      loadingTopicContent: value
    })
  },

  askTutor: (question) => {
    if (!question) return
    axios.get(`/api/topic/${get().topic}/chat?question=${question}`)
    .then(async chatResponse => {
      const content = JSON.parse(chatResponse.data.message.content)
      console.log(content)

      const audioRes = await fetch(`/api/tts?resource_type=content&content=${content.answer}`)
      const audio = await audioRes.blob()
      const visemes = JSON.parse(await audioRes.headers.get('visemes'))
      const audioURL = URL.createObjectURL(audio)
      const audioPlayer = new Audio(audioURL)

      audioPlayer.currentTime = 0
      audioPlayer.play()

      const chatPlayerObject = {
        audioPlayer,
        visemes,
        textContent: content.answer
      }

      set({chatPlayerObject})
    })
  },

  playTextContent: async (tutorPlayerObject) => {
    set({loadingTopicContent: true})
    if (!tutorPlayerObject.audioPlayer) {

      const audioRes = await fetch(`/api/tts?resource_type=topic&topic=${get().topic}`)

      const audio = await audioRes.blob()
      const visemes = JSON.parse(await audioRes.headers.get('visemes'))
      const audioURL = URL.createObjectURL(audio)
      const audioPlayer = new Audio(audioURL)

      let tutorPlayerObject = {}

      tutorPlayerObject.visemes = visemes
      tutorPlayerObject.audioPlayer = audioPlayer
      tutorPlayerObject.audioPlayer.onended = () => {}

      tutorPlayerObject.audioPlayer.currentTime = 0
      tutorPlayerObject.audioPlayer.play()

      set({
        loadingTopicContent: false,
        tutorPlayerObject
      })
    }
    
  },

  stopTutorPlayerObject: (tutorPlayerObject) => {
    tutorPlayerObject.audioPlayer.pause()
  },

  getTopicContent: async (topic) => {
    set({loadingTopicContent: true})

    axios.get(`/api/topic/${get().topic}`)
    .then(async (response) => {
      const {data} = response

      const tutorPlayerObject = {
        textContent: data.topicContent.textContent
      }

      set(state => ({
        loadingTopicContent: false,
        tutorPlayerObject
      }))
      get().playTextContent(tutorPlayerObject)
    })
  },
  
}))