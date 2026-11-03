import React, { useEffect, useState } from 'react';
import { programs } from '../data/programs';
import { site } from '../data/content';
import { isSupabaseConfigured, submitEnquiry } from '../lib/supabase';

const workshopOptions = [
  'Young Gardeners Boot Camp',
  'AI & Digital Skills Workshop',
  'Traffic Path',
];

const programOptions = [
  ...programs.map((p) => p.title),
  ...workshopOptions,
];

const initialForm = {
  parent_name: '',
  phone: '',
  email: '',
  child_age: '',
  program: '',
  message: '',
};

export default function Contact({ preselectedProgram = '', onConsumedPreselect }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!preselectedProgram) return;
    setForm((c) => ({ ...c, program: preselectedProgram }));
    onConsumedPreselect?.();
  }, [preselectedProgram, onConsumedPreselect]);

  const validate = () => {
    const next = {};
    if (!form.parent_name.trim()) next.parent_name = "Parent's name is required.";
    if (!form.phone.trim()) next.phone = 'Phone number is required.';
    if (!form.child_age || Number(form.child_age) < 1) next.child_age = "Child's age is required.";
    if (!form.program) next.program = 'Please select a program.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((c) => ({ ...c, [name]: value }));
    setErrors((c) => ({ ...c, [name]: undefined }));
    setSuccess(false);
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setSubmitError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = {
        parent_name: form.parent_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        child_age: Number(form.child_age),
        program: form.program,
        message: form.message.trim() || null,
      };

      if (!isSupabaseConfigured) {
        console.info('Enquiry payload (Supabase pending):', payload);
        setSuccess(true);
        setForm(initialForm);
        return;
      }

      await submitEnquiry(payload);
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setSubmitError('We could not send your enquiry right now. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#FFFFFF] text-[#231F20] py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/*
          2-Column Split Matching Design Reference (Figure 12):
          Left side: Editorial typography directly on white background
          Right side: Soft grey panel containing form fields
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct on white background */}
          <div className="lg:col-span-5 space-y-6 pt-2">
            <div>
              <span
                className="text-[#8E793E] text-[12px] font-medium tracking-[0.16em] uppercase block mb-3"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Contact
              </span>
              <h2
                className="text-[36px] sm:text-[44px] lg:text-[48px] text-[#231F20] font-normal leading-[1.12] tracking-tight"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
              >
                Enrol your child
              </h2>
              <p
                className="mt-3 text-[#231F20]/80 text-[15px] sm:text-[16px] font-normal leading-relaxed max-w-md"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Ask about a program, a boot camp, or bringing a workshop to your school. Parents and schools are welcome to enquire.
              </p>
            </div>

            <div className="pt-4 space-y-6">
              {/* Call or WhatsApp */}
              <div>
                <span
                  className="block text-[12px] font-normal text-gray-500 mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Call or WhatsApp
                </span>
                <a
                  href={site.contact.phoneHref}
                  className="text-[17px] sm:text-[18px] font-medium text-[#231F20] hover:text-[#AD974F] transition-colors inline-block border-b border-[#231F20]/30 hover:border-[#AD974F] pb-0.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {site.contact.phone}
                </a>
              </div>

              {/* Email */}
              <div>
                <span
                  className="block text-[12px] font-normal text-gray-500 mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Email
                </span>
                <a
                  href={site.contact.emailHref}
                  className="text-[15px] sm:text-[16px] font-medium text-[#231F20] hover:text-[#AD974F] transition-colors inline-block border-b border-[#231F20]/30 hover:border-[#AD974F] pb-0.5 break-all"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {site.contact.email}
                </a>
              </div>

              {/* Instagram & Facebook */}
              <div>
                <span
                  className="block text-[12px] font-normal text-gray-500 mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Instagram &amp; Facebook
                </span>
                <div className="flex flex-wrap items-center gap-4 pt-0.5">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] sm:text-[16px] font-medium text-[#231F20] hover:text-[#AD974F] transition-colors inline-block border-b border-[#231F20]/30 hover:border-[#AD974F] pb-0.5"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    @{site.social.instagramHandle}
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="pt-2">
                <span
                  className="block text-[11px] font-light text-gray-400 mb-0.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Official Domain
                </span>
                <span
                  className="text-[14px] font-normal text-[#8E793E]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {site.domain}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Soft Grey Form Panel Matching Reference Figure 12 */}
          <div className="lg:col-span-7 w-full">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#EAEAEA] rounded-[4px] p-6 sm:p-8 lg:p-10 space-y-4 shadow-sm"
            >
              {/* Parent's name */}
              <div>
                <label
                  htmlFor="parent_name"
                  className="block text-[13px] font-medium text-[#231F20] mb-1.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Parent's name <span className="text-[#8E793E]">*</span>
                </label>
                <input
                  id="parent_name"
                  name="parent_name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.parent_name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.parent_name)}
                  className="w-full bg-white border border-[#D0D0D0] rounded-[2px] px-3.5 py-2.5 text-[15px] text-[#231F20] placeholder:text-gray-400 focus:border-[#AD974F] focus:outline-none transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
                {errors.parent_name && (
                  <p className="mt-1 text-xs text-red-600">{errors.parent_name}</p>
                )}
              </div>

              {/* Phone number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-[13px] font-medium text-[#231F20] mb-1.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Phone number <span className="text-[#8E793E]">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="03xx xxxxxxx"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                  className="w-full bg-white border border-[#D0D0D0] rounded-[2px] px-3.5 py-2.5 text-[15px] text-[#231F20] placeholder:text-gray-400 focus:border-[#AD974F] focus:outline-none transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Email & Child's age in 2 columns */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[13px] font-medium text-[#231F20] mb-1.5"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Email <span className="text-gray-500 font-light text-xs">(optional)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    className="w-full bg-white border border-[#D0D0D0] rounded-[2px] px-3.5 py-2.5 text-[15px] text-[#231F20] placeholder:text-gray-400 focus:border-[#AD974F] focus:outline-none transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="child_age"
                    className="block text-[13px] font-medium text-[#231F20] mb-1.5"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Child's age <span className="text-[#8E793E]">*</span>
                  </label>
                  <input
                    id="child_age"
                    name="child_age"
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 9"
                    value={form.child_age}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.child_age)}
                    className="w-full bg-white border border-[#D0D0D0] rounded-[2px] px-3.5 py-2.5 text-[15px] text-[#231F20] placeholder:text-gray-400 focus:border-[#AD974F] focus:outline-none transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                  {errors.child_age && (
                    <p className="mt-1 text-xs text-red-600">{errors.child_age}</p>
                  )}
                </div>
              </div>

              {/* Program of interest */}
              <div>
                <label
                  htmlFor="program"
                  className="block text-[13px] font-medium text-[#231F20] mb-1.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Program <span className="text-[#8E793E]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="program"
                    name="program"
                    value={form.program}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(errors.program)}
                    className="w-full bg-white border border-[#D0D0D0] rounded-[2px] px-3.5 py-2.5 text-[15px] text-[#231F20] focus:border-[#AD974F] focus:outline-none transition-colors cursor-pointer"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <option value="">Select a program</option>
                    {programOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.program && (
                  <p className="mt-1 text-xs text-red-600">{errors.program}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-[13px] font-medium text-[#231F20] mb-1.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Message <span className="text-gray-500 font-light text-xs">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#D0D0D0] rounded-[2px] px-3.5 py-2.5 text-[15px] text-[#231F20] placeholder:text-gray-400 focus:border-[#AD974F] focus:outline-none transition-colors resize-y min-h-[85px]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>

              {submitError && (
                <p className="text-xs text-red-600">{submitError}</p>
              )}

              {success && (
                <p
                  className="p-3 bg-green-50 border border-green-200 text-green-900 text-sm rounded-[2px]"
                  role="status"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Thank you. We have received your enquiry and will contact you shortly.
                </p>
              )}

              {/* Send enquiry button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#AD974F] hover:bg-[#F5D36B] text-[#231F20] font-medium px-8 py-3 text-[15px] transition-colors rounded-[2px] cursor-pointer inline-block shadow-sm"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {submitting ? 'Sending…' : 'Send enquiry'}
                </button>
              </div>

              {!isSupabaseConfigured && (
                <p
                  className="text-[11px] text-[#8E793E] pt-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Enquiries validate and save locally until Supabase credentials are provided by the team lead.
                </p>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
