'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface FullscreenIframeProps {
    src: string;
    title: string;
    thumbnailSrc: string; // 新增缩略图属性
}

export default function FullscreenIframe({ src, title, thumbnailSrc }: FullscreenIframeProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen(prev => !prev);
    }, []);

    const handlePlay = useCallback(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isFullscreen]);

    return (
        <div 
            className={`${
                isFullscreen 
                    ? 'fixed inset-0 z-50 bg-black' 
                    : 'relative w-full h-[500px]'
            }`}
        >
            {!isLoaded ? (
                <div className="relative w-full h-full">
                    <Image 
                        src={thumbnailSrc}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <button 
                        onClick={handlePlay}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-400 text-white font-bold py-4 px-6 rounded-full flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2">Play</span>
                    </button>
                </div>
            ) : (
                <iframe 
                    src={src}
                    title={title}
                    className="w-full h-full rounded-lg"
                />
            )}
            <button 
                onClick={toggleFullscreen}
                className={`absolute ${
                    isFullscreen ? 'top-4 right-4' : 'top-2 right-2'
                } bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded flex items-center`}
            >
                {isFullscreen ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 5h4V3H3v6h2V5zm10 0v4h2V3h-6v2h4zm-10 10H3v-6h2v4h4v2H5zm10-2v-4h2v6h-6v-2h4z" clipRule="evenodd" />
                        </svg>
                        <span>Exit Fullscreen</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span>Fullscreen</span>
                    </>
                )}
            </button>
        </div>
    );
}