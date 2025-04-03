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

  // const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
  //   if (playedSeconds >= endTime && playerRef.current) {
  //     playerRef.current.seekTo(startTime, "seconds");
  //   }
  // };

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
          // onProgress={handleProgress}
          width="100%"
          height="100%"
          className="absolute inset-0"
          // config={{
          //   youtube: {
          //     playerVars: { start: startTime },
          //   },
          // }}
        />
      )}
    </div>
  );
}

export default VideoPlayer;
