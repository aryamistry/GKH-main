import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
        <p className="text-lg text-slate-600">We'd love to hear from you. Get in touch with our team.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <Mail className="text-primary mt-1" size={24} />
              <div>
                <p className="font-semibold text-slate-900">Email</p>
                <a href="mailto:hello@gharkakhana.com" className="text-slate-600 hover:text-primary">
                  hello@gharkakhana.com
                </a>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Phone className="text-primary mt-1" size={24} />
              <div>
                <p className="font-semibold text-slate-900">Phone</p>
                <a href="tel:+919999999999" className="text-slate-600 hover:text-primary">
                  +91 9999 999 999
                </a>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <MapPin className="text-primary mt-1" size={24} />
              <div>
                <p className="font-semibold text-slate-900">Address</p>
                <p className="text-slate-600">
                  Ghar Ka Khana<br />
                  Mumbai, Maharashtra<br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-orange-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-orange-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full border border-orange-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Subject"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border border-orange-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Your message"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
          >
            <Send size={18} /> Send Message
          </button>
          {submitted && (
            <p className="text-green-600 font-semibold text-center">Message sent successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
