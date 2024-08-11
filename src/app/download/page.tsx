"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function DownloadPage() {
    const [url, setUrl] = useState('');
    const [resolution, setResolution] = useState('460p');
    const [format, setFormat] = useState('music/mp3');

    const handleDownload = () => {
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
                <button className="w-full bg-black text-white py-2 rounded-lg mb-8" onClick={() => alert('Search functionality not implemented yet')}>
                    Search
                </button>
                {/* Thumbnail and Options */}
                <div className="flex flex-col md:flex-row items-center mb-8">
                    {/* Thumbnail Image */}
                    <div className="flex-1 mb-4 md:mb-0 md:mr-4 flex justify-center">
                        <Image
                            src="/images/thumbnail.png"
                            alt="Thumbnail"
                            width={400}
                            height={225}
                            className="rounded-lg"
                        />
                    </div>

                    {/* Resolution and Format */}
                    <div className="flex flex-col flex-1 items-start">
                        <p className="text-center mb-4 md:mb-6 font-bold">I Built 100 Wells In Africa</p>

                        <div className="w-full flex justify-between mb-4">
                            <div className="flex-1 pr-2">
                                <label className="block text-gray-600 mb-2">Resolution</label>
                                <select
                                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                >
                                    <option value="460p">460p</option>
                                    <option value="720p">720p</option>
                                    <option value="1080p">1080p</option>
                                </select>
                            </div>
                            <div className="flex-1 pl-2">
                                <label className="block text-gray-600 mb-2">Format</label>
                                <select
                                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                >
                                    <option value="music/mp3">music/mp3</option>
                                    <option value="video/mp4">video/mp4</option>
                                    <option value="video/webm">video/webm</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-gray-600 text-sm mb-4 font-semibold">File Size: 5mb</div>
                        <button className="bg-red-500 text-white py-2 w-full rounded-lg" onClick={handleDownload}>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}