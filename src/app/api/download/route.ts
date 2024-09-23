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
        const videoRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const playlistRegex = /(?:youtube\.com\/playlist\?list=)([a-zA-Z0-9_-]+)/;
        
        if (url.match(playlistRegex)) {
            return { type: 'playlist', id: url.match(playlistRegex)?.[1] || null };
        } else if (url.match(videoRegex)) {
            return { type: 'video', id: url.match(videoRegex)?.[1] || null };
        }
        
        return { type: null, id: null };
    };

    const { type, id } = extractVideoId(url);

    if (!id) {
        return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    if (type === 'playlist') {
        return NextResponse.json({ message: 'This is a playlist' }, { status: 200 });
    }

    const apiUrl = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${encodeURIComponent(id)}`;
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
        console.error('Error fetching video data:', error);  // Logs the error for debugging in Vercel
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
