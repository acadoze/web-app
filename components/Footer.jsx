import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#c8c5c1] site_footer py-[2.5rem]">
      <div className="flex justify-evenly">
        <div>
          <h6>Contact</h6>
          <li>info@acadoze.com</li>
          <li>Tel: 123-456-7890</li>
          <li>Berlin, Germany</li>
        </div>
        <div>
          <h6> Subscribe for News and Updates</h6>
          <li className=" mb-[10px]">Enter your email here *</li>
          <li>
            <input className="px-3 py-4 mr-2 border-1 border-[#312213] w-[250px] rounded-sm" />
            <button className="bg-[#bada55] py-[10px] px-[20px] text-white rounded-[100px]">Send</button>
          </li>
        </div>
        <div>
          <h6>Menu</h6>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/privacy">Privacy Policy</Link></li>
          <li><Link href="/terms">Terms and conditions</Link></li>
        </div>
        <div>
          <h6>Socials</h6>
          <li><a href="">Linkedin</a></li>
          <li><a href="">Facebook</a></li>
        </div>
        
      </div>
    </footer>
  )
}