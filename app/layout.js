import { Poppins } from "next/font/google";
import "./normalize.css";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"]});

export const metadata = {
  title: "Acadoze",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
