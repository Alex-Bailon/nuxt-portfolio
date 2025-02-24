'use client'

import { useState, useEffect, useCallback } from 'react'

interface CarouselProps {
  slides: React.ReactNode[]
  slidesToShow?: number
  autoplaySpeed?: number
}

export function Carousel({ 
  slides, 
  slidesToShow = 3,
  autoplaySpeed = 5000 
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - slidesToShow ? 0 : prevIndex + 1
    )
  }, [slides.length, slidesToShow])

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - slidesToShow : prevIndex - 1
    )
  }

  useEffect(() => {
    if (autoplaySpeed > 0) {
      const interval = setInterval(nextSlide, autoplaySpeed)
      return () => clearInterval(interval)
    }
  }, [nextSlide, autoplaySpeed])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide()
    }
    if (touchStart - touchEnd < -75) {
      prevSlide()
    }
  }

  // Adjust slidesToShow based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // mobile
        setCurrentIndex(0)
      } else if (window.innerWidth < 1024) { // tablet
        setCurrentIndex(0)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-300 ease-out"
        style={{ 
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div 
            key={index}
            className="flex-none"
            style={{ width: `${100 / slidesToShow}%` }}
          >
            <div className="px-2 h-full">
              {slide}
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
} 