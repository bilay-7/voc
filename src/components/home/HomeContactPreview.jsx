import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export default function HomeContactPreview() {
  const { site } = useContent();

  return (
    <section className="bg-[#FFFFFF] text-[#231F20] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 w-full border-t border-[#231F20]/10">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-6 space-y-4">
            <span
              className="text-[#8E793E] text-[11px] sm:text-[12px] font-medium tracking-[0.16em] uppercase block"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Get In Touch
            </span>

            <h2
              className="text-[30px] sm:text-[38px] lg:text-[44px] text-[#231F20] font-normal leading-[1.14] tracking-tight"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 500 }}
            >
              Enrol your child or partner with us
            </h2>

            <p
              className="text-gray-600 text-[14.5px] sm:text-[16px] font-light leading-relaxed max-w-xl"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Ask about an upcoming boot camp, individual program modules, or bringing a hands-on STEM &amp; Life Skills workshop to your school or community.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center gap-2 border border-[#AD974F]/40 bg-[#AD974F]/10 hover:bg-[#AD974F]/20 text-[#231F20] px-4 py-2.5 rounded-[2px] text-sm font-medium transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Phone className="w-4 h-4 text-[#8E793E]" />
                <span>Call or WhatsApp: {site.contact.phone}</span>
              </a>

              <a
                href={site.contact.emailHref}
                className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-700 px-4 py-2.5 rounded-[2px] text-sm font-light transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Mail className="w-4 h-4 text-[#8E793E]" />
                <span>{site.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Teaser Card to Enrolment Form */}
          <div className="lg:col-span-6 bg-[#EAEAEA]/60 border border-[#231F20]/15 p-6 sm:p-8 rounded-[2px] shadow-sm">
            <div className="flex items-center gap-2.5 mb-3">
              <MessageSquare className="h-5 w-5 text-[#8E793E]" />
              <h3
                className="text-lg font-semibold text-[#231F20]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Online Enrolment &amp; Inquiries
              </h3>
            </div>

            <p
              className="text-gray-600 text-sm font-light leading-relaxed mb-5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Submit our quick enquiry form to select your program of interest, your child's age, and your preferred schedule. Our team will get back to you promptly.
            </p>

            <div className="space-y-2 mb-6 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#8E793E] shrink-0" />
                <span>Quick response within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#8E793E] shrink-0" />
                <span>Flexible batches for Young Gardeners &amp; AI Workshops</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#8E793E] shrink-0" />
                <span>School partnerships and customized group sessions</span>
              </div>
            </div>

            <Link
              to="/contact"
              className="btn-primary w-full !h-11 text-[14.5px] inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Go to Enrolment Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
