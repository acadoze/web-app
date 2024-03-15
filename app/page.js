import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn  } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io";

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
            {/*<div className="bg-lightCyan rounded-[50px] h-[280px] shadow-2xl mb-[35px]"></div>*/}
            <img src="/top.png" className="z-[1]" />

            <div className={`${orbitron.className} z-[3] flex bg-gradient-to-r from-[#fff4fe] to-[#f4fcff] px-[1.6rem] py-[3rem] bg-[white] rounded-[50px] h-[260px] left-[10%] top-[220px] w-[630px] shadow-2xl absolute`}>

              <div className="w-[180px]">

                <h1 className="tracking-[1px] uppercase text-[1.5rem] font-[900]"> unlock <span className={`block text-[.8rem] font-[600] ${poppins.className} `}>the potential</span> </h1>
                <p className={`${poppins.className} my-3 text-[.8rem] flex items-center text-lightCyan`}>  <FaRegPlayCircle />&nbsp; Watch The Video </p>
                <p className={`${poppins.className} text-[.75rem]`}> Discover a new world of unexpected gaming and entertainment experience</p>
              </div>
              
              <div className="flex flex-col absolute left-[185px] top-[35px]">
                <img src="/duo/br-circle.png" className="w-[250px] h-[250px] relative bottom-[80px]" />
                <div className="flex absolute w-[300px]">
                  <img src="/duo/girl.png" className="h-[235px] w-[auto] absolute top-[-10px] left-[21px]" />
                  <img src="/duo/machine.png" className="h-[120px] w-[auto] left-[104px] top-[-28px] absolute"/>
                  <img src="/duo/boy.png" className="h-[235px] w-[auto] absolute top-[-10px] left-[85px]" />
                </div>
              </div>

            </div>

            <div className="bg-electricPurple rounded-[50px] relative top-[-134px] z-[1] h-[230px] w-[780px] shadow-2xl "></div>
          </div>
        </div>

        <section className="flex text-[white] x_spacing justify-center">
          <div className={`w-[300px] ${outfit.className}`}>
            <h2 className="text-[1.8rem] capitalise spacing-[10px] font-[600]">No More<br /> Boring<br /> Classroom!</h2>
            <p className="mb-[30px]">Open the door and lets discover!</p>
            <div>
              <Link href="signup" className="uppercase py-2 px-3 bg-[#659bd5] rounded-2xl mr-3">start your free trial</Link>
              <Link href="signup" className="uppercase py-2 px-3 border-2 border-[#0888d7] rounded-2xl">log in</Link>
            </div>
          </div>
          <div className="relative bottom-[70px]">
            <img src="/18.png" className="h-[380px] w-[auto]" />
          </div>
        </section>

        <section className="x_spacing relative flex flex-col items-center">
            <div className="bg-lightCyan rounded-[50px] z-[1] top-[141px] h-[200px] left-[0] absolute w-[inherit] shadow-2xl mb-[35px]"></div>

            <div className={`${orbitron.className} z-[3] flex bg-gradient-to-r from-[#fff4fe] to-[#f4fcff] px-[1.6rem] py-[3rem] bg-[white] rounded-[50px] h-[260px] relative mb-5 w-[630px] shadow-2xl`}>

              <div className="w-[180px]">

                <h1 className="tracking-[1px] uppercase text-[1.7rem] font-[900]"> history <span className={`block text-[1.1rem] font-[600] ${poppins.className} `}>the potential</span> </h1>
                <p className={`${poppins.className} text-[.8rem]`}> Discover a new world of unexpected gaming and entertainment experience</p>
              </div>
              
              <div className="flex flex-col absolute left-[210px] w-[400px] top-0">
                <img src="/14.png" className="absolute h-[200px] top-[57px] left-[28px] w-[auto] z-[5]" />
                <img src="/Sphynx.png" className="absolute left-[84px] z-[2] h-[170px] top-[62px] w-[auto]" />
                <img src="/43.png" className="absolute top-[113px] left-[210px] h-[136px] z-[5] w-[auto]" />
                <img src="/sun.png" className="absolute w-[auto] right-[10px] h-[100px]" />
                <img src="/Background Complete.png" className="absolute w-[auto] left-[57px] top-[13px] z-1 h-[183px]" />
                <img src="/Shadow.png" className="absolute w-[auto] left-[40px] top-[220px] h-[26px]" />
                <img src="/Trees.png" className="absolute w-[auto] top-[155px] left-[53px] h-[53px] z-[1]" />
                <img src="/Pyramids.png" className="absolute w-[auto] left-[61px] top-[105px] h-[103px] z-[0]" />
              </div>

            </div>
            <div className={`${orbitron.className} relative z-[3] flex bg-gradient-to-r from-[#fff4fe] to-[#f4fcff] px-[1.6rem] py-[3rem] bg-[white] rounded-[50px] h-[260px] w-[630px] shadow-2xl`}>
              
              <div className="flex flex-col relative w-[400px] top-0">
                <img src="/engineer.png" className="absolute h-[235px] top-[-24px] left-[0] z-[1] w-[auto] z-[5]" />
                <img src="/dna-machine.png" className="absolute h-[113px] top-[138px] left-[34px] z-[2] w-[auto] z-[5]" />
                <img src="/boy.png" className="absolute h-[235px] top-[-24px] left-[100px] w-[auto] z-[1]" />
              </div>

              <div className="w-[180px]">

                <h1 className="tracking-[1px] uppercase text-[1.7rem] font-[900]"> science <span className={`block text-[1.1rem] font-[600] ${poppins.className} `}>the potential</span> </h1>
                <p className={`${poppins.className} text-[.8rem]`}> Discover a new world of unexpected gaming and entertainment experience</p>
              </div>

            </div>

        </section>

        <section className={`flex ${outfit.className} px-5 justify-between h-[200px] px-[2.5rem] py-[1rem] text-[white] x_spacing bg-[#659bd5] rounded-2xl mt-[5rem]`}>
          <div>
            <h3 className="mb-[10px] text-[1.3rem]"> Questions? </h3>
            <p className="text-[.9rem]">Let us demonstrate everything to you.  We also offer:</p>
            <ul className="pl-3 text-[.9rem]">
              <li className="mt-3">Have 14 days free trial to test</li>
              <li>A super supportive team</li>
            </ul>
            <div className="flex mt-[1.5rem] gap-x-[20px]">
              <FaFacebookF />
              <BsInstagram />
              <IoLogoTwitter />
              <FaLinkedinIn />
            </div>
          </div>

          <div className="flex items-center">
            <Link href="/contact" className="uppercase text-[1rem] py-1 px-2 bg-[#00c2ff] rounded-2xl h"> Let&apos;s talk </Link>
            <img src="/31.png" className="w-[auto] h-[190px]" />
          </div>
        </section>

        <section className="x_spacing my-[4rem]">
          <h3 className={`uppercase text-[1.3rem] text-[white] ${poppins.className} `}> partners </h3>
          <div className="rounded-2xl bg-[#659bd5] h-[100px] flex justify-evenly items-center partners">
            <img src="/convai.png" className="" />
            <img src="/nvidia.png" className="" />
            <img src="/soonami.png" className="" />
            <img src="/foundance.png" className=""  />
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}

