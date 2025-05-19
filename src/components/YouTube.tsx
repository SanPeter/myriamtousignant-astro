import React from 'react';

interface YouTubeProps {
  id: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  allow?: string;
  className?: string;
}

export default function YouTube({
  id,
  title = "YouTube video player",
  width = 560,
  height = 315,
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
  className = "",
}: YouTubeProps) {
  return (
    <div className={`youtube-embed ${className}`}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        frameBorder="0"
        allow={allow}
        allowFullScreen
      />
    </div>
  );
}
