
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl: string;
}

export const VideoPlayer = ({ videoUrl, posterUrl }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("durationchange", handleDurationChange);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("durationchange", handleDurationChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0];
    video.volume = newVolume / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newProgress = value[0];
    video.currentTime = (newProgress / 100) * video.duration;
    setProgress(newProgress);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const enterFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative group">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={posterUrl}
        onClick={togglePlay}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={togglePlay}
          className="bg-primary/80 hover:bg-primary text-white rounded-full p-3 transition-all transform hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex flex-col space-y-2">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleProgressChange}
            className="h-1"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-primary transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-primary transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-24 h-1"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <button
                onClick={enterFullscreen}
                className="text-white hover:text-primary transition-colors"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
