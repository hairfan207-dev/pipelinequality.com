'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{ question: string; answer: string }>;

  return (
    <section className='bg-white text-navy'>
      <div className='pq-shell py-8 text-center lg:py-12'>
        <h2 className='text-navy'>{t('title')}</h2>
        <div className='mx-auto mt-8 max-w-3xl rounded-3xl bg-[#f4f7fb] px-4 py-2 text-left sm:px-8'>
          {items.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className='border-b border-navy/10 last:border-b-0'>
                <button
                  type='button'
                  onClick={() => setOpenIndex(open ? null : index)}
                  className='flex w-full items-center justify-between gap-4 py-4 text-left'
                  aria-expanded={open}
                >
                  <span className='text-[0.98rem] font-medium text-navy'>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-navy/50 transition ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open && (
                  <p className='pb-4 text-[0.95rem] leading-relaxed text-navy/70'>{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
