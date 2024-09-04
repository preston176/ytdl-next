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
    ];

    return (
        <div className="container mx-auto px-4">
            <Head>
                <title>YTDownloader</title>
                <meta name="description" content="Download videos from YouTube easily with YTDL" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Hero Section */}
            <section className="flex flex-col lg:flex-row justify-evenly items-start md:mt-20">
                <div className="lg:w-1/2 md:px-10 mb-18">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 mt-20">
                        Download Videos from <span className='text-red-500'>YouTube</span>
                    </h1>
                    <p className="text-lg mb-8">
                        Download your Favourite YouTube videos and music for Free. No Ads.
                    </p>
                    <div className="flex gap-4 mb-8">
                        <Link href="/download">
                            <button className="bg-black text-white py-3 px-6 text-lg font-medium rounded-lg">Get Started</button>
                        </Link>
                        <Link href="#how-it-works">
                            <button className="bg-white border border-black text-black py-3 px-6 text-lg font-medium rounded-lg">Learn More</button></Link>
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

                <Image
                    src="/images/hero.png"
                    alt="Hero image of Youtube Downloader app"
                    width={500}
                    height={741}
                    className='hidden md:block'
                />
            </section>

            {/* Steps Section */}
            <section className="my-20 bg-gray-100 p-10 rounded-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12" id='how-it-works'>How it Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="text-center p-6 border rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Copy the YouTube URL</h3>
                        <p className="text-lg">Easily copy the URL of the YouTube video you want to download.</p>
                    </div>
                    <div className="text-center p-6 border rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Choose Download Quality</h3>
                        <p className="text-lg">Select from various quality options, including 4K, to suit your needs.</p>
                    </div>
                    <div className="text-center p-6 border rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Download and Enjoy</h3>
                        <p className="text-lg">Click download and enjoy your video offline, ad-free.</p>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section className="my-20">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="text-center p-6 border rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Ad-Free Experience</h3>
                        <p className="text-lg">
                            Enjoy uninterrupted video downloads without any annoying ads. Experience a seamless and ad-free downloading process.
                        </p>
                    </div>
                    <div className="text-center p-6 border rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Lightning-Fast Speeds</h3>
                        <p className="text-lg">
                            Experience ultra-fast download speeds. Get your videos in seconds, thanks to our optimized download technology.
                        </p>
                    </div>
                    <div className="text-center p-6 border rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">High-Quality Downloads</h3>
                        <p className="text-lg">
                            Download videos in stunning 4K quality. Enjoy crystal-clear videos and music with no loss in quality.
                        </p>
                    </div>
                </div>

            </section>

            {/* Testimonials Section */}
            <section className="my-20 bg-gray-100 p-10 rounded-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="p-6 border rounded-lg">
                        <p className="text-lg mb-4">"This app is incredible! It has made downloading videos so easy."</p>
                        <h4 className="text-xl font-bold">David</h4>
                    </div>
                    <div className="p-6 border rounded-lg">
                        <p className="text-lg mb-4">"I love the quality and speed of the downloads, never thought it was possible. Highly recommend!"</p>
                        <h4 className="text-xl font-bold">Joseh </h4>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="my-20 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-8">Ready to Get Started?</h2>
                <Link href="/download">
                    <button className="bg-red-500 text-white py-3 px-8 text-lg font-medium rounded-lg">Download Now</button>
                </Link>
            </section>
        </div>
    );
}
