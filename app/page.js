import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link";
import { FaRegPlayCircle } from "react-icons/fa";

import { Orbitron, Poppins } from "next/font/google";
const orbitron = Orbitron({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400", "500", "600", "700", "800", "900"]});

export default function Home() {
  return (
    <main>
      <Header />
      <section className="bg-blue py-[2rem]">
        <div className="flex flex-col items-center w-[780px] mx-[auto]">
          <div className=" relative h-[700px] w-[inherit]">
            <div className="bg-lightCyan rounded-[50px] h-[250px] shadow-2xl mb-[35px]"></div>

            <div className={`${orbitron.className} bg-gradient-to-r from-[#fff4fe] to-[#f4fcff] px-[1.6rem] py-[3rem] bg-[white] rounded-[50px] h-[260px] left-[10%] top-[21%] w-[630px] shadow-2xl absolute`}>
              <div className="w-[180px]">

                <h1 className="tracking-[1px] uppercase text-[1.7rem] font-[900]"> unlock <span className={`block text-[1.1rem] font-[600] ${poppins.className} `}>the potential</span> </h1>
                <p className={`${poppins.className} my-3 text-[.8rem] flex items-center text-lightCyan`}>  <FaRegPlayCircle />&nbsp; Watch The Video </p>
                <p className={`${poppins.className} text-[.8rem]`}> Discover a new world of unexpected gaming and entertainment experience</p>
              </div>
                

            </div>

            <div className="bg-electricPurple rounded-[50px] h-[250px] w-[780px] shadow-2xl "></div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

