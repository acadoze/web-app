import Link from "next/link";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export default function Footer() {
  return (
    <footer className={`bg-blue site_footer py-[2.5rem] ${roboto.className}`}>
      <div className="flex justify-evenly">
        <div>
          <h6>Acadoze</h6>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/">About</Link></li>
          <li><Link href="/">Career</Link></li>
        </div>
        <div>
          <h6>Legal</h6>
          <li><Link href="/about">GDPR</Link></li>
          <li><Link href="/contact">T&C</Link></li>
          <li><Link href="/privacy">Impressum</Link></li>
          <li><Link href="/terms">Terms and conditions</Link></li>
        </div>
        <div>
          <h6>Contact</h6>
          <li><a>Email</a></li>
          <li><a>Blog</a></li>
          <li><a>Chat</a></li>
        </div>
        <div>
          <h6>Join our newsletter</h6>
          <li className={`${roboto.className}`}>
            <input className="px-2 py-2 mr-2 border-1 text-[white] bg-[#659bd5] border-[#312213] w-[250px] rounded-[60px]" />
            <button className={`${roboto.className} bg-[#00c2ff] relative text-[white] right-[82px] px-3 py-2 text-[.95rem] text-white rounded-[60px]`}>Submit</button>
          </li>
          
        </div>
        
        
      </div>
    </footer>
  )
}