import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Film,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  src: string;
}

// 5 Remaining Videos (First video removed as requested)
const BUSINESS_VIDEOS: VideoItem[] = [
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
  currentlyPlayingId: string | null;
  onPlayRequested: (id: string) => void;
  onPauseRequested: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  currentlyPlayingId,
  onPlayRequested,
  onPauseRequested,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  // Guarantee that initial muted state is set on DOM element to prevent browser autoplay blocks
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
    }
  }, []);

  // Pause this video if another video starts playing
  useEffect(() => {
    if (currentlyPlayingId !== video.id && isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentlyPlayingId, video.id, isPlaying]);

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el) return;

    if (hasEnded) {
      el.currentTime = 0;
      setHasEnded(false);
    }

    if (el.paused) {
      try {
        onPlayRequested(video.id);
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
      onPauseRequested(video.id);
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
    <div className="group relative rounded-3xl overflow-hidden bg-stone-950 border border-[#E7E2DA]/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between w-full select-none">
      {/* Video Container */}
      <div
        className="relative w-full aspect-[9/16] bg-black cursor-pointer overflow-hidden"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.src}
          playsInline
          loop
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => {
            setIsPlaying(true);
            setHasEnded(false);
            onPlayRequested(video.id);
          }}
          onPause={() => {
            setIsPlaying(false);
            onPauseRequested(video.id);
          }}
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update arrow states and active dot index based on scroll position
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 10;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);

    // Calculate approximate active slide
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 24
      : el.clientWidth;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), BUSINESS_VIDEOS.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Scroll smoothly by one card unit (or viewport on mobile)
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Pause any playing video when user actively slides to another card
    setCurrentlyPlayingId(null);

    const firstCard = el.firstElementChild as HTMLElement | null;
    const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth * 0.8;

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToSlide = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCurrentlyPlayingId(null);
    const firstCard = el.firstElementChild as HTMLElement | null;
    const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    el.scrollTo({
      left: index * scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
        <div className="max-w-2xl space-y-3">
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

        {/* Carousel Desktop Header Controls */}
        <div className="hidden sm:flex items-center gap-3 self-end">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous videos"
            className="w-12 h-12 rounded-full border border-stone-300 bg-white/90 text-stone-800 shadow-sm flex items-center justify-center hover:bg-[#A30813] hover:text-white hover:border-[#A30813] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next videos"
            className="w-12 h-12 rounded-full border border-stone-300 bg-white/90 text-stone-800 shadow-sm flex items-center justify-center hover:bg-[#A30813] hover:text-white hover:border-[#A30813] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Relative Carousel Viewport */}
      <div className="relative">
        {/* Floating Left Arrow (Mobile & Overlay) */}
        <button
          type="button"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Previous slide"
          className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 text-white backdrop-blur-md flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:opacity-0 disabled:pointer-events-none focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Floating Right Arrow (Mobile & Overlay) */}
        <button
          type="button"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Next slide"
          className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 text-white backdrop-blur-md flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:opacity-0 disabled:pointer-events-none focus:outline-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Horizontal Slider Track:
            - Mobile: 1 card (~86vw / max-w-[340px])
            - Tablet: 2 cards (~48%)
            - Desktop: 3 cards (~31.8%)
        */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 scrollbar-none touch-pan-x"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {BUSINESS_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="flex-shrink-0 snap-start w-[85vw] max-w-[330px] sm:w-[calc(50%-12px)] sm:max-w-none lg:w-[calc(33.333%-16px)]"
            >
              <VideoCard
                video={video}
                currentlyPlayingId={currentlyPlayingId}
                onPlayRequested={(id) => setCurrentlyPlayingId(id)}
                onPauseRequested={(id) => {
                  if (currentlyPlayingId === id) setCurrentlyPlayingId(null);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Dots & Mobile Navigation Footer */}
      <div className="flex items-center justify-center gap-2 pt-6">
        {BUSINESS_VIDEOS.map((video, idx) => (
          <button
            key={video.id}
            type="button"
            onClick={() => scrollToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === idx
                ? 'w-7 h-2.5 bg-[#A30813]'
                : 'w-2.5 h-2.5 bg-stone-300 hover:bg-stone-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
