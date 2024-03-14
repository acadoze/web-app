import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link";
import { FaRegPlayCircle } from "react-icons/fa";

import { Orbitron, Poppins, Outfit } from "next/font/google";
const orbitron = Orbitron({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400", "500", "600", "700", "800", "900"]});
const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Header />
      <section className="bg-blue py-[2rem]">
        <div className="flex flex-col items-center w-[780px] mx-[auto]">
          <div className=" relative h-[700px] w-[inherit]">
            <div className="bg-lightCyan rounded-[50px] h-[280px] shadow-2xl mb-[35px]"></div>

            <div className={`${orbitron.className} flex bg-gradient-to-r from-[#fff4fe] to-[#f4fcff] px-[1.6rem] py-[3rem] bg-[white] rounded-[50px] h-[260px] left-[10%] top-[220px] w-[630px] shadow-2xl absolute`}>

              <div className="w-[180px]">

                <h1 className="tracking-[1px] uppercase text-[1.7rem] font-[900]"> unlock <span className={`block text-[1.1rem] font-[600] ${poppins.className} `}>the potential</span> </h1>
                <p className={`${poppins.className} my-3 text-[.8rem] flex items-center text-lightCyan`}>  <FaRegPlayCircle />&nbsp; Watch The Video </p>
                <p className={`${poppins.className} text-[.8rem]`}> Discover a new world of unexpected gaming and entertainment experience</p>
              </div>
              
              <div className="flex flex-col absolute left-[210px] top-0">
                <img src="/duo/br-circle.png" className="w-[280px] h-[280px] relative bottom-[80px]" />
                <div className="flex absolute w-[300px]">
                  <img src="/duo/girl.png" className="h-[270px] w-[auto] absolute top-[-10px] left-[21px]" />
                  <img src="/duo/machine.png" className="h-[120px] w-[auto] left-[104px] top-[-28px] absolute"/>
                  <img src="/duo/boy.png" className="h-[270px] w-[auto] absolute top-[-10px] left-[85px]" />
                </div>
              </div>

            </div>

            <div className="bg-electricPurple rounded-[50px] h-[230px] w-[780px] shadow-2xl "></div>
          </div>
        </div>

        <section className="flex text-[white] x_spacing justify-center">
          <div className={`w-[300px] ${outfit.className}`}>
            <h2 className="text-[1.8rem] capitalise spacing-[10px] font-[600]">No More<br /> Boring<br /> Classroom!</h2>
            <p className="mb-[30px]">Open the door and lets discover!</p>
            <div>
              <Link href="signup" className="uppercase py-2 px-3 bg-[#659bd5] rounded-2xl mr-3">start your free trial</Link>
              <Link href="signup" className="uppercase py-2 px-3 border-1 border-[#0888d7] rounded-2xl">log in</Link>
            </div>
          </div>
          <div className="relative bottom-[70px]">
            <img src="/18.png" className="h-[380px] w-[auto]" />
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}

