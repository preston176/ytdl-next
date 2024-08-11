"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function DownloadPage() {
    const [url, setUrl] = useState('');
    const [resolution, setResolution] = useState('');
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
                    Download
                </button>


            </div>
        </div>
    );
}