import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const extractVideoId = (url: string) => {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const videoId = extractVideoId(url);

    if (!videoId) {
        return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const apiUrl = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${encodeURIComponent(videoId)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
            'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(apiUrl, options);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch video data' }, { status: 500 });
        }

        const data: VideoData = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
