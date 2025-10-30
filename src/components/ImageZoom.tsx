'use client'

import { useState } from 'react'
// import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'

interface ImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export default function ImageZoom({ src, alt, width = 300, height = 300, className }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  const openZoom = () => setIsZoomed(true)
  const closeZoom = () => setIsZoomed(false)

  return (
    <>
      {/* Main Image with Zoom Trigger */}
      <div className="relative group cursor-zoom-in" onClick={openZoom}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-transform duration-300 hover:scale-105 ${className}`}
          style={{ width: 'auto', height: 'auto' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeZoom}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg border-2 border-white transition-colors duration-200 z-10"
            aria-label="Close zoom"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoomed Image */}
          <div className="relative max-w-4xl max-h-full">
            <img
              src={src}
              alt={alt}
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeZoom}
            aria-label="Close zoom by clicking outside"
          />
        </div>
      )}
    </>
  )
}