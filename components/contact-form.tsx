'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Toast } from './toast';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tTypes = useTranslations('contact');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string; description: string } | null>(null);

  const supportTypes = tTypes.raw('supportTypes') as string[];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setToast({
          type: 'error',
          message: 'File Too Large',
          description: 'File size must be less than 10MB'
        });
        e.target.value = '';
        return;
      }
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setToast({
          type: 'success',
          message: t('successTitle'),
          description: t('successMessage')
        });
        form.reset();
        setFileName(null);
      } else {
        setToast({
          type: 'error',
          message: t('errorTitle'),
          description: t('errorMessage')
        });
      }
    } catch (error) {
      setToast({
        type: 'error',
        message: t('errorTitle'),
        description: t('errorMessage')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='space-y-6'>

      {/* Name */}
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-semibold text-navy mb-2'
        >
          {t('name')} *
        </label>
        <input
          type='text'
          id='name'
          name='name'
          required
          placeholder={t('namePlaceholder')}
          className='w-full px-4 py-3 border border-steel/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-muted-gold focus:border-transparent'
        />
      </div>

      {/* Company */}
      <div>
        <label
          htmlFor='company'
          className='block text-sm font-semibold text-navy mb-2'
        >
          {t('company')} *
        </label>
        <input
          type='text'
          id='company'
          name='company'
          required
          placeholder={t('companyPlaceholder')}
          className='w-full px-4 py-3 border border-steel/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-muted-gold focus:border-transparent'
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-semibold text-navy mb-2'
        >
          {t('email')} *
        </label>
        <input
          type='email'
          id='email'
          name='email'
          required
          placeholder={t('emailPlaceholder')}
          className='w-full px-4 py-3 border border-steel/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-muted-gold focus:border-transparent'
        />
      </div>

      {/* Project Support Type */}
      <div>
        <label
          htmlFor='supportType'
          className='block text-sm font-semibold text-navy mb-2'
        >
          {t('supportType')}
        </label>
        <select
          id='supportType'
          name='supportType'
          className='w-full px-4 py-3 border border-steel/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-muted-gold focus:border-transparent bg-white'
        >
          <option value=''>{t('supportTypePlaceholder')}</option>
          {supportTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor='message'
          className='block text-sm font-semibold text-navy mb-2'
        >
          {t('message')} *
        </label>
        <textarea
          id='message'
          name='message'
          required
          rows={5}
          placeholder={t('messagePlaceholder')}
          className='w-full px-4 py-3 border border-steel/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-muted-gold focus:border-transparent resize-none'
        ></textarea>
      </div>

      {/* File Upload */}
      <div>
        <label
          htmlFor='attachment'
          className='block text-sm font-semibold text-navy mb-2'
        >
          {t('fileUpload')}
        </label>
        <div className='relative'>
          <input
            type='file'
            id='attachment'
            name='attachment'
            accept='.pdf,.dwg,.xlsx,.xls,.doc,.docx'
            onChange={handleFileChange}
            className='hidden'
          />
          <label
            htmlFor='attachment'
            className='flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-steel/30 rounded-lg hover:border-muted-gold cursor-pointer transition-colors'
          >
            <Upload className='w-5 h-5 text-steel' strokeWidth={2} />
            <span className='text-sm text-charcoal'>
              {fileName || t('fileUploadHint')}
            </span>
          </label>
        </div>
      </div>

      {/* GDPR Consent */}
      <div className='flex flex-col gap-3'>
        <div className='flex items-start gap-3'>
          <input
            type='checkbox'
            id='gdpr'
            name='gdpr'
            required
            className='mt-1 w-4 h-4 text-muted-gold border-steel/30 rounded focus:ring-2 focus:ring-muted-gold'
          />
          <label htmlFor='gdpr' className='text-sm text-charcoal'>
            {t('gdprConsent')}{' '}
            <a href={`/${locale}/privacy`} target='_blank' rel='noopener noreferrer' className='text-muted-gold hover:underline'>
              {t('privacyPolicy')}
            </a>
            . *
          </label>
        </div>
        <p className='text-[10px] md:text-xs text-charcoal/60 leading-relaxed italic'>
          {t('privacyNote')}
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-muted-gold text-white hover:bg-muted-gold/90 font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
      >
        {isSubmitting ? (
          <span className='flex items-center justify-center gap-2'>
            <svg
              className='animate-spin h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            {t('submitting')}
          </span>
        ) : (
          t('submit')
        )}
      </Button>

      {/* Contact Icons */}
      <div className='flex flex-col items-center gap-3 pt-2'>
        <p className='text-sm text-charcoal/70 font-medium'>Or connect with us directly:</p>
        <div className='flex items-center gap-3'>
          {/* LinkedIn */}
          <a
            href='https://www.linkedin.com/company/pipelinequality'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 font-medium'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
            </svg>
            <span className='text-sm'>LinkedIn</span>
          </a>

          {/* WhatsApp */}
          <a
            href='https://wa.me/491728137111'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-lg hover:bg-[#1DA851] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 font-medium'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'/>
            </svg>
            <span className='text-sm'>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <p className='text-sm text-charcoal/70 text-center'>{t('disclaimer')}</p>
    </form>

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
  );
}
