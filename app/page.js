import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <head>
        <title>Home | Acadoze</title>
      </head>
      <Header />
      <section className="flex bg-gradient-to-r from-[#a6debd] to-[#f7c6b5] px-[7rem] gap-x-[7rem] py-[3rem]">
        <div className="w-[300px]">
          <img 
            src="/teach.webp"
            className="object-cover" 
            style={{
              width: 'inherit',
              height: 'inherit',
            }}
          />
        </div>
        <div className="flex-1 flex flex-col items-center mt-3">
          <h1 className="text-[3.5rem] font-[700] bg-[#a3debd] text-[#312213] py-[.5rem] px-[2rem] rounded-[100px] mb-5">ACADOZE</h1>
          <h2 className="text-[1.55rem] text-[#312213] font-semibold mb-3">Your dose of integrated STEM in any subject classroom.</h2>
          <p className="text-[#000] text-[1.15rem] tracking-[.5px] leading-[2rem] mb-3 text-center">Lesson integration projects and content bringing creativity and problem solving skills into any classroom to grow future thinking learners. From video instruction with real life examples to AI tutors to answer questions and clarify concepts. Acadoze keeps you going with an ever-evolving classroom. </p>
          <Link href="/register" className="font-semibold rounded-[100px] text-[#312213] text-[1rem] py-2 px-5 bg-[#bada55]">Start your free trial</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}