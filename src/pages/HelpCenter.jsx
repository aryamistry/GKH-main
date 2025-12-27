import React from 'react';
import { ChevronDown } from 'lucide-react';

const HelpCenter = () => {
  const [expanded, setExpanded] = React.useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How does pre-ordering work?',
      answer:
        'You can browse available meals from verified home chefs and pre-order them for your preferred meal time (lunch or dinner). Payment is processed securely, and your meal is prepared fresh.'
    },
    {
      id: 2,
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, debit cards, and digital payment methods including UPI and wallets.'
    },
    {
      id: 3,
      question: 'Can I cancel my order?',
      answer:
        'You can cancel orders up to 24 hours before the scheduled meal time. Refunds are processed within 5-7 business days.'
    },
    {
      id: 4,
      question: 'How are chefs verified?',
      answer: 'All chefs go through a rigorous verification process including identity checks, kitchen inspections, and hygiene certifications.'
    },
    {
      id: 5,
      question: 'Is food hygiene guaranteed?',
      answer:
        'Yes, all our chefs maintain strict hygiene standards and are regularly inspected. We ensure fresh ingredients and safe food handling practices.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Help Center</h1>
        <p className="text-lg text-slate-600">Find answers to common questions about Ghar Ka Khana</p>
      </div>

      <div className="space-y-3">
        {faqs.map(faq => (
          <div
            key={faq.id}
            className="bg-white rounded-xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <button
              onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-orange-50 transition"
            >
              <p className="font-semibold text-slate-900 text-left">{faq.question}</p>
              <ChevronDown
                size={20}
                className={`text-primary transition-transform ${expanded === faq.id ? 'rotate-180' : ''}`}
              />
            </button>
            {expanded === faq.id && (
              <div className="px-6 py-4 bg-orange-50 border-t border-orange-100">
                <p className="text-slate-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
        <p className="mb-4">Contact our support team for immediate assistance</p>
        <a
          href="mailto:support@gharkakhana.com"
          className="inline-block px-6 py-3 bg-white text-primary font-semibold rounded-full hover:shadow-lg transition"
        >
          Email Support
        </a>
      </div>
    </div>
  );
};

export default HelpCenter;
