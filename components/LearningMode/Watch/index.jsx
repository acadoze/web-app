import PlayerLoader from "@/components/PlayerLoader"
import { useEffect, useState } from "react"
export default function Watch() {
  const [showLoader, setLoader] = useState(true)
  
  useEffect(() => {
  }, [])
  
  return (
    showLoader ? 
      <PlayerLoader /> 
    : <></>
  )
}