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

// 5 Active Videos (Compact card collection)
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

  // Track touch / mouse positions so gestures (horizontal sliding & vertical page scrolling) don't trigger togglePlay
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const mouseStartPos = useRef<{ x: number; y: number } | null>(null);
  const isGestureMoving = useRef(false);

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

  const toggleSound = (e: React.MouseEvent | React.TouchEvent) => {
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

  const toggleFullscreen = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    }
  };

  // Touch gesture listeners enabling simultaneous horizontal sliding and vertical page scroll
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    isGestureMoving.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartPos.current.x);
    const dy = Math.abs(e.touches[0].clientY - touchStartPos.current.y);
    if (dx > 6 || dy > 6) {
      isGestureMoving.current = true;
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isGestureMoving.current = false;
      touchStartPos.current = null;
    }, 150);
  };

  // Mouse click vs drag detection
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartPos.current) {
      const dx = Math.abs(e.clientX - mouseStartPos.current.x);
      const dy = Math.abs(e.clientY - mouseStartPos.current.y);
      if (dx > 6 || dy > 6) {
        isGestureMoving.current = true;
        setTimeout(() => {
          isGestureMoving.current = false;
        }, 150);
      }
      mouseStartPos.current = null;
    }
  };

  return (
    <div
      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-950 border border-[#E7E2DA]/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between w-full h-full select-none"
      style={{ touchAction: 'pan-x pan-y' }}
    >
      {/* Video Container — touchAction: pan-x pan-y permits both finger sliding & vertical page scrolling */}
      <div
        className="relative w-full h-full bg-black cursor-pointer overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          if (isGestureMoving.current) return;
          togglePlay();
        }}
        style={{ touchAction: 'pan-x pan-y' }}
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
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] pointer-events-none"
        />

        {/* Ambient Dark Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

        {/* Top Header Badges & Audio Toggle */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-auto">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-amber-300 backdrop-blur-md border border-white/10 shadow-sm pointer-events-none">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            {video.tag}
          </span>

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSound}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 hover:bg-black/90 active:scale-95 text-white backdrop-blur-md border border-white/15 transition-all shadow-md focus:outline-none cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[9px] font-bold tracking-wider uppercase">Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[9px] font-bold tracking-wider uppercase">Mute</span>
              </>
            )}
          </button>
        </div>

        {/* Center Play Button Overlay (compact, centered) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isGestureMoving.current) return;
                togglePlay();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              aria-label={hasEnded ? 'Replay video' : 'Play video'}
              className="pointer-events-auto w-12 h-12 rounded-full bg-[#A30813] hover:bg-[#851113] active:scale-95 text-white flex items-center justify-center shadow-xl backdrop-blur-sm border-2 border-white/40 transition-all duration-200 cursor-pointer"
            >
              {hasEnded ? (
                <RotateCcw className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
              )}
            </button>
          </div>
        )}

        {/* Bottom Details & Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 z-20 space-y-1.5 pointer-events-auto">
          {/* Title & Subtitle */}
          <div className="pointer-events-none">
            <h3 className="font-serif text-sm sm:text-base font-bold text-white tracking-tight leading-snug drop-shadow-sm line-clamp-1">
              {video.title}
            </h3>
            <p className="text-[11px] text-white/80 line-clamp-1 leading-tight">
              {video.subtitle}
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            {/* Play/Pause Mini Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="text-[11px] font-semibold text-white/90 hover:text-white flex items-center gap-1 focus:outline-none cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-amber-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-amber-400" />
                  <span>Play</span>
                </>
              )}
            </button>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              aria-label="Watch video in fullscreen"
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress Indicator Track */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden pointer-events-none">
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

  // Mouse drag-to-scroll support for desktop and DevTools
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const getCardStep = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return 300;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 24 : (typeof window !== 'undefined' && window.innerWidth >= 640 ? 20 : 16);
    return firstCard ? firstCard.offsetWidth + gap : el.clientWidth * 0.75;
  }, []);

  // Update arrow states and active dot index based on scroll position
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 8;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);

    const step = getCardStep();
    const index = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(index, 0), BUSINESS_VIDEOS.length - 1));
  }, [getCardStep]);

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

  // Mouse drag handlers for desktop / simulated touch
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    isMouseDown.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
    el.style.scrollBehavior = 'auto';
    el.style.scrollSnapType = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - startX.current;
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;
    const el = scrollContainerRef.current;
    if (el) {
      el.style.scrollBehavior = '';
      el.style.scrollSnapType = '';
    }
  };

  // Scroll smoothly by one card unit (or viewport on mobile)
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Pause any playing video when user slides
    setCurrentlyPlayingId(null);

    const step = getCardStep();
    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  const scrollToSlide = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCurrentlyPlayingId(null);
    const step = getCardStep();
    el.scrollTo({
      left: index * step,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-4">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-spicered/10 text-spicered font-accent border border-spicered/20">
            <Film className="w-3.5 h-3.5 text-spicered" />
            Our Kitchen in Action
          </span>
          <h2 className="font-serif text-2xl sm:text-3.5xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            Watch How We Craft Authentic Andhra Pickles
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl">
            Step into our traditional kitchen. From selecting hand-picked spices to slow-cooking in cold-pressed groundnut oil, experience the passion in every jar.
          </p>
        </div>

        {/* Carousel Desktop Header Controls */}
        <div className="hidden sm:flex items-center gap-2.5 self-end">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous videos"
            className="w-10 h-10 rounded-full border border-stone-300 bg-white/95 text-stone-800 shadow-sm flex items-center justify-center hover:bg-[#A30813] hover:text-white hover:border-[#A30813] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next videos"
            className="w-10 h-10 rounded-full border border-stone-300 bg-white/95 text-stone-800 shadow-sm flex items-center justify-center hover:bg-[#A30813] hover:text-white hover:border-[#A30813] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Relative Carousel Viewport */}
      <div className="relative">
        {/* Floating Left Arrow (Mobile & Small screens) */}
        <button
          type="button"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Previous slide"
          className="sm:hidden absolute left-1 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/75 text-white backdrop-blur-md flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:opacity-0 disabled:pointer-events-none focus:outline-none cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Floating Right Arrow (Mobile & Small screens) */}
        <button
          type="button"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Next slide"
          className="sm:hidden absolute right-1 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/75 text-white backdrop-blur-md flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:opacity-0 disabled:pointer-events-none focus:outline-none cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Horizontal Slider Track:
            - Desktop: ~4 compact cards visible simultaneously (~260-280px wide each)
            - Tablet: ~2-3 cards visible
            - Mobile: 1 compact card visible (~260-280px, ~75vw, height ~420px max)
            - touchAction: 'pan-x pan-y' allows natural native vertical page scrolling & finger sliding!
        */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto snap-x snap-mandatory py-2 px-1 scrollbar-none cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x pan-y',
            overscrollBehaviorX: 'contain',
          }}
        >
          {BUSINESS_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="flex-shrink-0 snap-start w-[76vw] max-w-[270px] sm:w-[250px] lg:w-[calc(25%-18px)] lg:min-w-[240px] lg:max-w-[275px] h-[410px] sm:h-[440px] lg:h-[450px]"
              style={{ touchAction: 'pan-x pan-y' }}
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

      {/* Carousel Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 pt-5">
        {BUSINESS_VIDEOS.map((video, idx) => (
          <button
            key={video.id}
            type="button"
            onClick={() => scrollToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeIndex === idx
                ? 'w-6 h-2 bg-[#A30813]'
                : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
