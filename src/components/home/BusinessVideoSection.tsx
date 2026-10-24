import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Film,
  RotateCcw,
} from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  src: string;
}

const BUSINESS_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Artisanal Kitchen Craft',
    subtitle: 'Slow-cured spices & traditional Telugu preparation',
    tag: 'Authentic Heritage',
    src: '/assets/videos/km_20250718_1080p_50f_20250719_002230.mp4#t=0.001',
  },
  {
    id: 'vid-2',
    title: 'Fresh Batch Slow Cook',
    subtitle: 'Simmering spices with cold-pressed groundnut oil',
    tag: 'Kitchen Secret',
    src: '/assets/videos/km_20260919_1080p_30f_20260919_223126.mp4#t=0.001',
  },
  {
    id: 'vid-3',
    title: 'Coastal Andhra Prawns Pickle',
    subtitle: 'Juicy sea prawns marinated with fiery red chilli',
    tag: 'Customer Favourite',
    src: '/assets/videos/PRAWNS%20PICKLE%20%F0%9F%A6%90%F0%9F%A6%90ORDER%20YOURS%20NOW.mp4#t=0.001',
  },
  {
    id: 'vid-4',
    title: 'Spicy Boneless Chicken Pickle',
    subtitle: 'Tender chicken bites infused in aromatic Telugu masala',
    tag: 'Bestseller Delicacy',
    src: '/assets/videos/Tasty%20Chicken%20pickleThe%20delicious%20and%20spicy%20%F0%9F%98%8B%F0%9F%98%8BJust%20feel%20it%E2%9D%A4%EF%B8%8F%E2%9D%A4%EF%B8%8F%E2%9D%A4%EF%B8%8FOur%20Starting%20price%20only%20240Rs.mp4#t=0.001',
  },
  {
    id: 'vid-5',
    title: 'Spice Up Every Bite',
    subtitle: 'Crispy, tangy, and bursting with robust natural flavor',
    tag: 'Taste The Passion',
    src: '/assets/videos/vidssave.com%20%F0%9F%94%A5%20Chicken%20pickle%20Spice%20Up%20Every%20Bite%20with%20TASTYPICKLE.IN!%20720P.mp4#t=0.001',
  },
  {
    id: 'vid-6',
    title: 'Behind The Scenes',
    subtitle: 'Hand-pounded stone-ground spices in every jar',
    tag: 'Pure & Homemade',
    src: '/assets/videos/VID_20250823_111558_110%20(1).mp4#t=0.001',
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
  const [hasEnded, setHasEnded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Guarantee that initial muted state is set on DOM element to prevent browser autoplay/play blocks
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
    }
  }, []);

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el) return;

    if (hasEnded) {
      el.currentTime = 0;
      setHasEnded(false);
    }

    if (el.paused) {
      try {
        await el.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Playback error:', err);
        // Fallback: retry with muted set explicitly
        el.muted = true;
        setIsMuted(true);
        try {
          await el.play();
          setIsPlaying(true);
        } catch (retryErr) {
          console.error('Muted playback retry error:', retryErr);
        }
      }
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    const nextMuted = !isMuted;
    el.muted = nextMuted;
    if (!nextMuted) {
      el.volume = 1;
    }
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    const el = videoRef.current;
    if (!el) return;
    const current = el.currentTime;
    const total = el.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    }
  };

  return (
    <div className="group relative rounded-3xl overflow-hidden bg-stone-950 border border-[#E7E2DA]/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
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
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => {
            setIsPlaying(true);
            setHasEnded(false);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setHasEnded(true);
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Ambient Dark Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

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

        {/* Center Play Button Overlay (always visible when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label={hasEnded ? 'Replay video' : 'Play video'}
              className="pointer-events-auto w-16 h-16 rounded-full bg-[#A30813] hover:bg-[#851113] active:scale-95 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white/40 transition-all duration-200"
            >
              {hasEnded ? (
                <RotateCcw className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 fill-white text-white translate-x-0.5" />
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
              className="h-full bg-gradient-to-r from-amber-400 to-[#A30813] transition-all duration-100 ease-linear rounded-full"
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
