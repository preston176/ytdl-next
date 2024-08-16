import "@/styles/global.css";
import Navbar from './../components/Navbar';
export const metadata = {
  title: 'YTDL-Next',
  description: 'Download your Favourite videos and music from YouTube',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <script src="//code.tidio.co/qhhancpt76pkxaxn1jz28irsb5lcuszf.js" async></script>
      <body>
      <Navbar/>
        <div>
          {children}
        </div>

      </body>
    </html>
  )
}
