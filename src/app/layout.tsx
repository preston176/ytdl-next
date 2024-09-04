import "@/styles/global.css";
import Navbar from './../components/Navbar';
import Footer from "@/components/Footer";

export const metadata = {
  title: 'YTDL-Next',
  description: 'Download your favourite videos and music from YouTube',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="//code.tidio.co/qhhancpt76pkxaxn1jz28irsb5lcuszf.js" async></script>
      </head>
      <body>
    
          <Navbar />
          <div>
            {children}
          </div>
          <Footer />
      </body>
    </html>
  );
}
