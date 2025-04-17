"use client";

import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  videoURL: string;
};

function VideoPlayer({ videoURL }: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="pointer-events-none relative min-w-full pt-[56.25%]">
      {isClient && (
        <ReactPlayer
          ref={playerRef}
          url={videoURL}
          playing
          muted
          loop
          controls={false}
          width="100%"
          height="100%"
          className="absolute inset-0"
        />
      )}
    </div>
  );
}

export default VideoPlayer;
