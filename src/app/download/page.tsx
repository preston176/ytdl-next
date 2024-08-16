"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Thumbnail {
    url: string;
}

interface VideoData {
    title: string;
    thumbnail: Thumbnail[];
    url: string;
    adaptiveFormats: object[];
}

export default function DownloadPage() {
    const searchParams = useSearchParams();
    const videoIdFromQuery = searchParams.get('url');
    const [url, setUrl] = useState<string>(videoIdFromQuery || '');
    const [resolution, setResolution] = useState<string>(''); 
    const [format, setFormat] = useState<string>('music/mp3');
    const [videoData, setVideoData] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // console.log('Video ID from query:', videoIdFromQuery); // Log the videoId from query

    // Effect to handle the search when URL changes
    useEffect(() => {
        if (url) {
            handleSearch();
        }
    }, []);

    const extractVideoId = (url: string) => {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const videoId = extractVideoId(url);

            if (!videoId) {
                throw new Error('Invalid YouTube URL');
            }

            const apiUrl = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${encodeURIComponent(videoId)}`;
            const options = {
                method: 'GET',
                headers: {
                    // 'x-rapidapi-key': process.env.RAPID_API_KEY,
                    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
                    'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com',
                },
            };

            const response = await fetch(apiUrl, options);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data: VideoData = await response.json();
            setVideoData(data);
            console.log(videoData)
            setResolution(data.adaptiveFormats[0]?.url || ''); // Assuming adaptiveFormats is an array of objects with URL property
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        // Handle download logic here
        console.log(`Downloading from ${url} at ${resolution} in ${format}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Download videos from <span className="text-red-500">YouTube</span>
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    On <span className="font-semibold">YT-DL</span> you can download long videos, shorts, and even gigantic playlists in just one click.
                </p>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Paste the url of the video, shorts or playlist here"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <button className="w-full bg-black text-white py-2 rounded-lg mb-8" onClick={handleSearch}>
                    Search
                </button>

                {loading && <p className="text-center text-gray-600">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {videoData && (
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="flex-1 mb-4 md:mb-0 md:mr-4 flex justify-center">
                            <Image
                                src={videoData?.thumbnail[3]?.url} // Adjusted index to 0 assuming the first thumbnail is used
                                alt={videoData.title}
                                width={400}
                                height={225}
                                className="rounded-lg"
                            />
                        </div>

                        <div className="flex flex-col flex-1 items-start">
                            <p className="text-center mb-4 md:mb-6 font-bold">{videoData.title}</p>
                            <div className="w-full flex justify-between mb-4">
                                <div className="flex-1 pr-2">
                                    <label className="block text-gray-600 mb-2">Resolution</label>
                                    <select
                                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        value={resolution}
                                        onChange={(e) => setResolution(e.target.value)}
                                    >
                                        {videoData?.adaptiveFormats.map((item, index: number) => (
                                            <option key={index} value={item?.url} onChange={(e) => setResolution(e.target.value)}>{item?.qualityLabel}</option>))}
                                    </select>
                                </div>
                                <div className="flex-1 pl-2">
                                    <label className="block text-gray-600 mb-2">Format</label>
                                    <select
                                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"

                                    >


                                    </select>
                                </div>
                            </div>
                            <div className="text-gray-600 text-sm mb-4 font-semibold">File Size: 5mb</div>
                            <button className="bg-red-500 text-white py-2 w-full rounded-lg" onClick={handleDownload}>
                                Download
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
