"use client"

import { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

interface ToastProps {
  type: 'success' | 'error'
  message: string
  description?: string
  onClose: () => void
  duration?: number
}

export function Toast({ type, message, description, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (  
    <div className="fixed top-4 right-4 z-[200] animate-in slide-in-from-top-5 fade-in duration-300">
      <div className={`
        min-w-[320px] max-w-md rounded-xl shadow-2xl p-4 backdrop-blur-sm
        ${type === 'success' 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200' 
          : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200'
        }
      `}>
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
            ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
          `}>
            {type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : (
              <XCircle className="w-6 h-6 text-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pt-0.5">
            <h3 className={`
              font-bold text-base mb-1
              ${type === 'success' ? 'text-green-900' : 'text-red-900'}
            `}>
              {message}
            </h3>
            {description && (
              <p className={`
                text-sm
                ${type === 'success' ? 'text-green-700' : 'text-red-700'}
              `}>
                {description}
              </p>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`
              flex-shrink-0 p-1.5 rounded-full transition-all duration-200
              ${type === 'success' 
                ? 'hover:bg-green-200 text-green-600 hover:text-green-800' 
                : 'hover:bg-red-200 text-red-600 hover:text-red-800'
              }
            `}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={`
          mt-3 h-1 rounded-full overflow-hidden
          ${type === 'success' ? 'bg-green-200' : 'bg-red-200'}
        `}>
          <div 
            className={`
              h-full rounded-full
              ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
            `}
            style={{
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}
