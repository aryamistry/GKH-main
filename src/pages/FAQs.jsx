import React from 'react';

const FAQs = () => {
  const [expanded, setExpanded] = React.useState(null);

  const faqs = [
    {
      id: 1,
      category: 'For Customers',
      questions: [
        {
          q: 'What areas does Ghar Ka Khana service?',
          a: 'We currently service major cities across India. Check our app to see if your area is covered.'
        },
        {
          q: 'How fresh is the food?',
          a:
            'All meals are prepared fresh on the day of delivery by verified home chefs. Pre-ordering ensures we prepare exactly what you need.'
        },
        {
          q: 'What if I receive a wrong order?',
          a: 'Contact our support team immediately with photos. We will send the correct order and provide a refund or credit.'
        }
      ]
    },
    {
      id: 2,
      category: 'For Home Chefs',
      questions: [
        {
          q: 'What are the requirements to become a chef on Ghar Ka Khana?',
          a:
            'You need a verified kitchen space, food handler certification, and liability insurance. We verify all safety standards before approval.'
        },
        {
          q: 'How much can I earn?',
          a: 'Earnings depend on orders and pricing. We take 15% commission. Many chefs earn ₹20,000-50,000 per month part-time.'
        },
        {
          q: 'How do I manage orders?',
          a: 'Use our mobile app dashboard to accept/reject orders, track earnings, and manage your menu.'
        }
      ]
    },
    {
      id: 3,
      category: 'General',
      questions: [
        {
          q: 'How is payment handled?',
          a: 'Payments are secured through encrypted gateways. Customers pay upfront via card, UPI, or wallet.'
        },
        {
          q: 'What is your cancellation policy?',
          a:
            'Orders can be cancelled 24 hours before delivery for full refund. Late cancellations are non-refundable.'
        },
        {
          q: 'How do ratings and reviews work?',
          a:
            'Customers rate chefs and dishes 1-5 stars. Ratings help build trust and help chefs improve their service.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-600">
          Find quick answers to questions about using Ghar Ka Khana
        </p>
      </div>

      <div className="space-y-10">
        {faqs.map(category => (
          <div key={category.id}>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{category.category}</h2>
            <div className="space-y-3">
              {category.questions.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <button
                    onClick={() =>
                      setExpanded(
                        expanded === `${category.id}-${idx}`
                          ? null
                          : `${category.id}-${idx}`
                      )
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-orange-50 transition"
                  >
                    <p className="font-semibold text-slate-900 text-left">{faq.q}</p>
                    <span
                      className={`text-primary transition-transform ${
                        expanded === `${category.id}-${idx}` ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {expanded === `${category.id}-${idx}` && (
                    <div className="px-6 py-4 bg-orange-50 border-t border-orange-100">
                      <p className="text-slate-700">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Didn't find your answer?</h2>
        <p>Check our Help Center or contact our support team</p>
      </div>
    </div>
  );
};

export default FAQs;
