import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Flame,
  Film,
} from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  src: string;
  aspect: string;
}

const BUSINESS_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Artisanal Kitchen Craft',
    subtitle: 'Slow-cured spices & traditional Telugu preparation',
    tag: 'Authentic Heritage',
    src: encodeURI('/assets/videos/km_20250718_1080p_50f_20250719_002230.mp4'),
    aspect: 'aspect-[9/16]',
  },
  {
    id: 'vid-2',
    title: 'Fresh Batch Slow Cook',
    subtitle: 'Simmering spices with cold-pressed groundnut oil',
    tag: 'Kitchen Secret',
    src: encodeURI('/assets/videos/km_20260919_1080p_30f_20260919_223126.mp4'),
    aspect: 'aspect-[9/16]',
  },
  {
    id: 'vid-3',
    title: 'Coastal Andhra Prawns Pickle',
    subtitle: 'Juicy sea prawns marinated with fiery red chilli',
    tag: 'Customer Favourite',
    src: encodeURI('/assets/videos/PRAWNS PICKLE ????ORDER YOURS NOW.mp4'),
    aspect: 'aspect-[9/16]',
  },
  {
    id: 'vid-4',
    title: 'Spicy Boneless Chicken Pickle',
    subtitle: 'Tender chicken bites infused in aromatic Telugu masala',
    tag: 'Bestseller Delicacy',
    src: encodeURI('/assets/videos/Tasty Chicken pickleThe delicious and spicy ????Just feel it??????Our Starting price only 240Rs.mp4'),
    aspect: 'aspect-[9/16]',
  },
  {
    id: 'vid-5',
    title: 'Spice Up Every Bite',
    subtitle: 'Crispy, tangy, and bursting with robust natural flavor',
    tag: 'Taste The Passion',
    src: encodeURI('/assets/videos/vidssave.com ?? Chicken pickle Spice Up Every Bite with TASTYPICKLE.IN! 720P.mp4'),
    aspect: 'aspect-[9/16]',
  },
  {
    id: 'vid-6',
    title: 'Behind The Scenes',
    subtitle: 'Hand-pounded stone-ground spices in every jar',
    tag: 'Pure & Homemade',
    src: encodeURI('/assets/videos/VID_20250823_111558_110 (1).mp4'),
    aspect: 'aspect-[9/16]',
  },
];

interface VideoCardProps {
  video: VideoItem;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeout = useRef<any>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    if (!newMuted) {
      videoRef.current.volume = 1;
    }
    setIsMuted(newMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeout.current);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(hideControlsTimeout.current);
    };
  }, []);

  return (
    <div
      className="group relative rounded-3xl overflow-hidden bg-stone-900 border border-[#E7E2DA]/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Container */}
      <div
        className="relative w-full aspect-[9/16] bg-black cursor-pointer overflow-hidden select-none"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.src}
          playsInline
          loop
          muted={isMuted}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Ambient Dark Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

        {/* Top Header Badges & Audio Toggle */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 text-amber-300 backdrop-blur-md border border-white/10 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {video.tag}
          </span>

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 active:scale-95 text-white backdrop-blur-md border border-white/15 transition-all shadow-md focus:outline-none"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Mute</span>
              </>
            )}
          </button>
        </div>

        {/* Center Play Button Overlay (visible when paused or hover) */}
        {(!isPlaying || showControls) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="pointer-events-auto w-16 h-16 rounded-full bg-[#A30813]/90 hover:bg-[#851113] active:scale-90 text-white flex items-center justify-center shadow-xl backdrop-blur-sm border-2 border-white/30 transition-all duration-200"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white" />
              ) : (
                <Play className="w-7 h-7 fill-white translate-x-0.5" />
              )}
            </button>
          </div>
        )}

        {/* Bottom Details & Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 space-y-2 pointer-events-auto">
          {/* Title & Subtitle */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white tracking-tight leading-snug drop-shadow-sm">
              {video.title}
            </h3>
            <p className="text-xs text-white/80 line-clamp-2 mt-0.5 leading-relaxed">
              {video.subtitle}
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-3 pt-1">
            {/* Play/Pause Mini Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="text-xs font-semibold text-white/90 hover:text-white flex items-center gap-1.5 focus:outline-none"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-amber-400" />
                  <span>Play</span>
                </>
              )}
            </button>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Watch video in fullscreen"
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress Indicator Track */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-spicered transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const BusinessVideoSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-spicered/10 text-spicered font-accent border border-spicered/20">
          <Film className="w-3.5 h-3.5 text-spicered" />
          Our Kitchen in Action
        </span>
        <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-stone-900 tracking-tight">
          Watch How We Craft Authentic Andhra Pickles
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Step into our traditional kitchen. From selecting hand-picked spices to slow-cooking in cold-pressed groundnut oil, experience the passion and authenticity in every batch.
        </p>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {BUSINESS_VIDEOS.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
};
