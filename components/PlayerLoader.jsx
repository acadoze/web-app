import { FaPlay } from "react-icons/fa6";
import { ThreeCircles } from "react-loader-spinner";

export default function PlayerLoader({setLoader, isLoading}) {
  return (
    <div className="w-[inherit] h-[340px] rounded-[inherit] flex justify-center items-center" >
      <ThreeCircles
        visible={true}
        height="50"
        width="50"
        color="#10c6fe"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      
    </div>
  )
}