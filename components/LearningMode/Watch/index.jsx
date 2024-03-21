import PlayerLoader from "@/components/PlayerLoader"
import { useEffect, useState } from "react"
export default function Watch() {
  const [showLoader, setLoader] = useState(true)
  
  useEffect(() => {
  }, [])
  
  return (
    <>
      <iframe width="560" height="315" className="w-[inherit] h-[inherit]" src="https://www.youtube.com/embed/SolayM9AVcI" frameBorder="0" loading="lazy" allowFullScreen>
      </iframe>

    </> 
  )
}