"use client"

import { useState, useEffect } from "react"
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { X, Linkedin, MessageCircle, Send } from "lucide-react"
import { Toast } from "./toast"

interface DocumentationReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DocumentationReviewModal({ isOpen, onClose }: DocumentationReviewModalProps) {
  const t = useTranslations('documentationReviewModal')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string; description: string } | null>(null)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      
      // Calculate scrollbar width before hiding it
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      
      // Prevent body scroll and compensate for scrollbar width
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      
      // Also compensate fixed elements (like navbar)
      const fixedElements = document.querySelectorAll('nav')
      fixedElements.forEach((el) => {
        (el as HTMLElement).style.paddingRight = `${scrollbarWidth}px`
      })
    } else {
      // Re-enable body scroll and remove padding
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
      
      // Remove padding from fixed elements
      const fixedElements = document.querySelectorAll('nav')
      fixedElements.forEach((el) => {
        (el as HTMLElement).style.paddingRight = '0px'
      })
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
      
      // Cleanup fixed elements
      const fixedElements = document.querySelectorAll('nav')
      fixedElements.forEach((el) => {
        (el as HTMLElement).style.paddingRight = '0px'
      })
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 200) // Match animation duration
  }

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        // Reset form
        setFormData({ name: '', company: '', email: '', phone: '', message: '' })
        setIsSubmitting(false)
        
        // Show success toast
        setToast({
          type: 'success',
          message: 'Request Submitted Successfully!',
          description: 'Thank you! We\'ll review your documentation request and get back to you shortly.'
        })
        
        // Close modal after short delay
        setTimeout(() => {
          handleClose()
        }, 2000)
      } else {
        setIsSubmitting(false)
        setToast({
          type: 'error',
          message: 'Submission Failed',
          description: 'Something went wrong. Please try again or contact us directly.'
        })
      }
    } catch (error) {
      setIsSubmitting(false)
      setToast({
        type: 'error',
        message: 'Submission Failed',
        description: 'Something went wrong. Please try again or contact us directly.'
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      >
        <div 
          className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col transition-all duration-300 ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <img src="/pipleline-quality-logo.png" alt="Pipeline Quality" className="w-10 h-10" />
              <h2 className="text-xl md:text-2xl font-bold text-navy">
                {t('title')}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-red-500 transition-all duration-300 p-3 rounded-full bg-gray-100 hover:bg-red-50 hover:scale-110 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content - Hidden scrollbar */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="px-6 py-6">
              <p className="text-gray-600 mb-6">
                {t('description')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent outline-none transition-all"
                    placeholder={t('form.namePlaceholder')}
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.company')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent outline-none transition-all"
                    placeholder={t('form.companyPlaceholder')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent outline-none transition-all"
                    placeholder={t('form.emailPlaceholder')}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent outline-none transition-all"
                    placeholder={t('form.phonePlaceholder')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent outline-none transition-all resize-none"
                    placeholder={t('form.messagePlaceholder')}
                  />
                </div>
                <div className="text-[10px] md:text-xs text-gray-500 italic leading-relaxed py-2">
                  {t('form.privacyNote')}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-muted-gold text-white hover:bg-muted-gold/90 font-semibold py-4 px-6 rounded-lg text-base transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t('form.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t('form.submit')}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer with Social Icons */}
          <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <span className="text-sm text-gray-600 font-medium">{t('footer.connectWith')}</span>
              <div className="flex items-center gap-3">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/pipeline-quality"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/491728137111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#1DA851] transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          description={toast.description}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
