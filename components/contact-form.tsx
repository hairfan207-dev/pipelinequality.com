'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FieldName = 'name' | 'company' | 'email' | 'location' | 'industry' | 'services' | 'message' | 'privacy';
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_ORDER: FieldName[] = ['name', 'company', 'email', 'location', 'industry', 'services', 'message', 'privacy'];

export function ContactForm() {
  const t = useTranslations('contact.enquiry');
  const industries = t.raw('industries') as string[];
  const services = t.raw('serviceOptions') as string[];
  const durations = t.raw('durations') as string[];
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Errors = {};
    const value = (key: string) => String(data.get(key) ?? '').trim();

    if (!value('name')) nextErrors.name = t('errors.name');
    if (!value('company')) nextErrors.company = t('errors.company');
    if (!value('email')) nextErrors.email = t('errors.email');
    else if (!EMAIL_PATTERN.test(value('email'))) nextErrors.email = t('errors.emailFormat');
    if (!value('location')) nextErrors.location = t('errors.location');
    if (!value('industry')) nextErrors.industry = t('errors.industry');
    if (data.getAll('services').filter((item) => String(item).trim()).length === 0) {
      nextErrors.services = t('errors.services');
    }
    if (!value('message')) nextErrors.message = t('errors.details');
    if (data.get('privacy') !== 'yes') nextErrors.privacy = t('errors.privacy');

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus(null);
      const first = FIELD_ORDER.find((field) => nextErrors[field]);
      const target = first === 'services'
        ? form.querySelector<HTMLElement>('input[name="services"]')
        : form.querySelector<HTMLElement>(`#${first}`);
      target?.focus();
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch('/api/send-email', { method: 'POST', body: new FormData(form) });
      if (response.ok) {
        setStatus('success');
        form.reset();
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className='contact-final' noValidate onSubmit={handleSubmit}>
      <Field id='name' label={t('name')} error={errors.name} autoComplete='name' />
      <Field id='company' label={t('company')} error={errors.company} autoComplete='organization' />
      <Field id='email' label={t('email')} error={errors.email} type='email' autoComplete='email' inputMode='email' />
      <Field id='phone' label={t('phone')} optionalLabel={t('optional')} type='tel' autoComplete='tel' />
      <Field id='location' label={t('location')} error={errors.location} autoComplete='address-level2' />
      <div className={errors.industry ? 'is-invalid' : undefined}>
        <label htmlFor='industry'>{t('industry')}</label>
        <select id='industry' name='industry' defaultValue='' aria-invalid={Boolean(errors.industry)} aria-describedby={errors.industry ? 'industry-error' : undefined}>
          <option value=''>{t('selectIndustry')}</option>
          {industries.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.industry ? <p id='industry-error' className='field-error'>{errors.industry}</p> : null}
      </div>

      <fieldset className={`is-wide contact-services${errors.services ? ' is-invalid' : ''}`} aria-invalid={Boolean(errors.services)} aria-describedby={errors.services ? 'services-error' : undefined}>
        <legend>{t('services')}</legend>
        <ul>
          {services.map((option) => (
            <li key={option}>
              <label>
                <input type='checkbox' name='services' value={option} />
                <span>{option}</span>
              </label>
            </li>
          ))}
        </ul>
        {errors.services ? <p id='services-error' className='field-error'>{errors.services}</p> : null}
      </fieldset>

      <Field id='projectStart' name='projectStart' label={t('start')} optionalLabel={t('optional')} autoComplete='off' />
      <div>
        <label htmlFor='duration'>
          {t('duration')}
          <span className='opt'>{t('optional')}</span>
        </label>
        <select id='duration' name='duration' defaultValue=''>
          <option value=''>{t('selectDuration')}</option>
          {durations.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className={`is-wide${errors.message ? ' is-invalid' : ''}`}>
        <label htmlFor='message'>{t('details')}</label>
        <textarea id='message' name='message' rows={6} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
        {errors.message ? <p id='message-error' className='field-error'>{errors.message}</p> : null}
      </div>

      <div className={`is-wide contact-privacy${errors.privacy ? ' is-invalid' : ''}`}>
        <input
          id='privacy'
          name='privacy'
          type='checkbox'
          value='yes'
          aria-invalid={Boolean(errors.privacy)}
          aria-describedby={errors.privacy ? 'privacy-error' : undefined}
        />
        <label htmlFor='privacy'>
          {t('privacyBefore')}
          <a href='/privacy'>{t('privacyLink')}</a>
          {t('privacyAfter')}
        </label>
        {errors.privacy ? <p id='privacy-error' className='field-error'>{errors.privacy}</p> : null}
      </div>

      <div className='pq-hp' aria-hidden='true'>
        <label htmlFor='pq_leave_blank'>Leave blank</label>
        <input id='pq_leave_blank' name='pq_leave_blank' type='text' tabIndex={-1} autoComplete='off' defaultValue='' />
      </div>

      {status ? (
        <p className={`is-wide contact-status is-${status}`} role={status === 'error' ? 'alert' : 'status'}>
          {status === 'success' ? t('success') : t('error')}
        </p>
      ) : null}

      <button className='is-wide' type='submit' disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  error,
  optionalLabel,
  type = 'text',
  autoComplete,
  inputMode,
}: {
  id: string;
  name?: string;
  label: string;
  error?: string;
  optionalLabel?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: 'email' | 'tel' | 'text';
}) {
  return (
    <div className={error ? 'is-invalid' : undefined}>
      <label htmlFor={id}>
        {label}
        {optionalLabel ? <span className='opt'>{optionalLabel}</span> : null}
      </label>
      <input
        id={id}
        name={name ?? id}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? <p id={`${id}-error`} className='field-error'>{error}</p> : null}
    </div>
  );
}
