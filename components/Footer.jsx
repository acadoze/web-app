import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue site_footer py-[2.5rem]">
      <div className="flex justify-evenly">
        <div>
          <h6>Acadoze</h6>
          <li>Home</li>
          <li>About</li>
          <li>Career</li>
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
          <li>Email</li>
          <li>Blog</li>
          <li>Chat</li>
        </div>
        <div>
          <h6>Join our newsletter</h6>
          <li className=" mb-[15px]">Enter your email here *</li>
          <li>
            <input className="px-3 py-4 mr-2 border-1 border-[#312213] w-[250px] rounded-sm" />
            <button className="bg-[#bada55] py-[10px] px-[20px] text-white rounded-[100px]">Send</button>
          </li>
          
        </div>
        
        
      </div>
    </footer>
  )
}