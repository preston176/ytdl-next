import Head from 'next/head';
import { GlobeAltIcon, StarIcon, EyeIcon, SunIcon } from '@heroicons/react/24/solid';

export default function Home() {
    const ICONS = [
        {
            icon: GlobeAltIcon,
            description: "lorem5"
        },
        {
            icon: StarIcon,
            description: "lorem5"
        },
        {
            icon: EyeIcon,
            description: "lorem5"
        },
        {
            icon: SunIcon,
            description: "lorem5"
        },

    ]

    return (
        <div className="container mx-auto px-4">
            <Head>
                <title>YTDownloader</title>
                <meta name="description" content="Download videos from YouTube easily with YTDL" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="flex flex-col lg:flex-row justify-between items-start min-h-[100vh]">
                <div className="lg:w-1/2">
                    <div className="font-bold text-2xl mb-8 mt-10">LOGO</div>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                        Download Videos from <span className='text-red-500'>YouTube</span>
                    </h1>
                    <p className="text-lg mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget. Et integer facilisi eget diam.
                    </p>
                    <div className="flex gap-4 mb-8">
                        <button className="bg-black text-white py-3 px-6 text-lg font-medium rounded-lg">Get Started</button>
                        <button className="bg-white border border-black text-black py-3 px-6 text-lg font-medium rounded-lg">Learn More</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-black p-5 rounded">
                        {
                            ICONS.map((icon, index) => (
                                <div key={index} className='flex items-center gap-2 text-lg'>
                                    <icon.icon className="h-12 w-6 text-black" />
                                    <p className="text-lg">{icon.description}</p>
                                </div>
                            ))
                        }

                    </div>
                </div>

                <div className="lg:w-1/2 relative mt-12 lg:mt-0">
                </div>

            </section>
        </div>
    );
}
