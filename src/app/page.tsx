import Head from 'next/head';
import { GlobeAltIcon, StarIcon, EyeIcon, SunIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    const ICONS = [
        {
            icon: GlobeAltIcon,
            description: "Global Access"
        },
        {
            icon: StarIcon,
            description: "Lossless Quality (4k)"
        },
        {
            icon: EyeIcon,
            description: "No Privacy Risks"
        },
        {
            icon: SunIcon,
            description: "Fast Downloads"
        },

    ]

    return (
        <div className="container mx-auto px-4">
            <Head>
                <title>YTDownloader</title>
                <meta name="description" content="Download videos from YouTube easily with YTDL" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="flex flex-col lg:flex-row justify-evenly items-start min-h-[100vh] md:mt-20">
                <div className="lg:w-1/2 md:px-10 mb-18">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 mt-20">
                        Download Videos from <span className='text-red-500'>YouTube</span>
                    </h1>
                    <p className="text-lg mb-8">
                        Download your Favourite YouTube videos and music for Free. No Ads
                    </p>
                    <div className="flex gap-4 mb-8">
                        <Link href="/download">
                            <button className="bg-black text-white py-3 px-6 text-lg font-medium rounded-lg">Get Started</button>
                        </Link>
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

                {/* <div className="lg:w-1/2 relative mt-12 lg:mt-0"> */}
                <Image
                    src="/images/hero.png"
                    alt="Hero image of Youtube Downloader app"
                    width={500}
                    height={741}
                    className='hidden md:block'
                />
                {/* </div> */}

            </section>
        </div>
    );
}
