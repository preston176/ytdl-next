"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';

interface Thumbnail {
    url: string;
}

interface AdaptiveFormat {
    url: string;
    qualityLabel?: string;
    audioQuality?: string;
}

interface VideoData {
    title: string;
    thumbnail: Thumbnail[];
    url: string;
    adaptiveFormats: AdaptiveFormat[];
    lengthSeconds: number;
}

const DownloadPageContent: React.FC = () => {
    const searchParams = useSearchParams();
    const videoIdFromQuery = searchParams.get('url');
    const [url, setUrl] = useState<string>(videoIdFromQuery || '');
    const [resolution, setResolution] = useState<string>('');
    const [format, setFormat] = useState<string>('video/mp4');
    const [videoData, setVideoData] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isPlaylist, setIsPlaylist] = useState<boolean>(false);

    useEffect(() => {
        if (url) {
            handleSearch();
        }
    }, [url]);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setIsPlaylist(false);

        try {
            const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);

            if (!response.ok) {
                throw new Error('Failed to fetch video data');
            }

            const data = await response.json();

            if (data.message === 'This is a playlist') {
                setIsPlaylist(true);
            } else {
                setVideoData(data as VideoData);
                setResolution(data.adaptiveFormats[0]?.url || '');
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            if (!resolution) {
                throw new Error('Please select a resolution');
            }

            const link = document.createElement('a');
            link.href = resolution;
            link.setAttribute('download', `${videoData?.title || 'video'}.mp4`);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error: any) {
            console.error('Download failed:', error.message);
            setError('Failed to download video. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Download videos from <span className="text-red-500">YouTube</span>
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    The <span className="font-semibold">YT-DL</span> team is working on bringing playlist support back online. Stay tuned!
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

                {isPlaylist && <h2 className="text-center text-2xl font-bold text-red-500 mb-4">This is a playlist</h2>}

                {videoData && !isPlaylist && (
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="flex-1 mb-4 md:mb-0 md:mr-4 flex justify-center">
                            <Image
                                src={videoData?.thumbnail[0]?.url || ''} // Assuming the first thumbnail is used
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
                                            <option key={index} value={item?.url}>
                                                {item.qualityLabel || item.audioQuality || 'Unknown'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1 pl-2">
                                    <label className="block text-gray-600 mb-2">Format</label>
                                    <select
                                        disabled={!resolution}
                                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="">Video/mp4</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-gray-600 text-sm mb-4 font-semibold">Video Duration: {videoData.lengthSeconds}</div>
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

export default function DownloadContents() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DownloadPageContent />
        </Suspense>
    );
}
