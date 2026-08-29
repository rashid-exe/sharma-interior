import { useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91 96253 52772',
    sub: 'Mon–Sat, 9am–7pm',
    href: 'tel:99',
    cta: 'Call Now',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+91 96253 52772',
    sub: 'Quick response guaranteed',
    href: 'https://wa.me/919625352772?text=Hi%20Sharma%20Interior%2C%20I%27m%20interested%20in%20an%20interior%20consultation.',
    cta: 'Start Chat',
    highlight: true,
  },
  {
    icon: MapPin,
    title: 'Service Areas',
    value: 'Noida · Greater Noida',
    sub: 'Ghaziabad & all of NCR',
    href: null,
    cta: null,
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Mon – Sat',
    sub: '9:00 AM – 7:00 PM',
    href: null,
    cta: null,
  },
];

const SERVICES = [
  'Living Room Design', 'Bedroom Interiors', 'Modular Kitchens',
  'Office Interiors', 'Bathroom Design', 'Outdoor & Balcony',
  'False Ceiling', 'Wallpaper & Wall Art', 'Lighting Design',
  'Furniture Customisation', 'Complete Home Renovation', 'Commercial Spaces',
];

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Sharma Interior | Interior Design in Noida, Greater Noida, Ghaziabad';
    window.scrollTo({ top: 0 });
  }, []);

  const whatsappTemplateMsg = encodeURIComponent(
    'Hi Sharma Interior! I found your catalogue and I\'m interested in:\n\n' +
    '📍 Location: \n' +
    '🏠 Project Type: \n' +
    '📐 Area (sq ft): \n' +
    '💰 Budget: \n\n' +
    'Please contact me to discuss further.'
  );

  return (
    <>
      {/* Header */}
      <div
        className="pt-36 pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden text-center"
        style={{
          background: 'linear-gradient(to bottom, var(--charcoal-2) 0%, var(--charcoal) 100%)',
          borderBottom: '1px solid rgba(201,169,110,0.1)',
        }}
      >
        <div className="absolute inset-0 opacity-8"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 80%, #c9a96e 0%, transparent 60%)' }}
        />
        <div className="relative max-w-2xl mx-auto">
          <div className="section-label justify-center mb-6">Let's Connect</div>
          <h1 className="font-display font-light text-cream mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Start Your <span className="gold-gradient-text italic">Dream Project</span>
          </h1>
          <p className="text-cream/50 text-lg leading-relaxed">
            Reach out on WhatsApp or call us — we'd love to bring your vision to life. Initial consultation is always free.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <section className="py-20 px-6 md:px-12 lg:px-24" style={{ background: 'var(--charcoal)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_CARDS.map(({ icon: Icon, title, value, sub, href, cta, highlight }, i) => (
            <div
              key={i}
              className="glass-card p-6 flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1"
              style={highlight ? {
                background: 'linear-gradient(135deg, rgba(201,169,110,0.1), rgba(201,169,110,0.03))',
                border: '1px solid rgba(201,169,110,0.3)',
              } : {}}
            >
              <div
                className="w-11 h-11 flex items-center justify-center"
                style={{
                  background: highlight
                    ? 'rgba(201,169,110,0.2)'
                    : 'rgba(201,169,110,0.08)',
                  border: '1px solid rgba(201,169,110,0.2)',
                }}
              >
                <Icon size={18} className="text-gold" />
              </div>
              <div>
                <div className="text-xs text-muted tracking-widest uppercase mb-1">{title}</div>
                <div className="font-display text-lg text-cream font-light">{value}</div>
                <div className="text-xs text-cream/40 mt-0.5">{sub}</div>
              </div>
              {href && cta && (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`mt-auto flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-colors ${
                    highlight ? 'text-gold hover:text-gold-light' : 'text-cream/50 hover:text-gold'
                  }`}
                >
                  {cta} <ArrowRight size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA - Main */}
      <section
        className="py-20 px-6 md:px-12 lg:px-24"
        style={{ background: 'var(--charcoal-2)', borderTop: '1px solid rgba(201,169,110,0.08)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="section-label justify-center mb-6">Fastest Way to Reach Us</div>
          <h2 className="font-display font-light text-cream mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Send Us a <span className="gold-gradient-text italic">WhatsApp Message</span>
          </h2>
          <p className="text-cream/50 mb-8 leading-relaxed">
            No forms, no waiting. Click below to open a pre-filled WhatsApp message — just fill in your details and we'll respond promptly.
          </p>

          {/* Template preview */}
          <div
            className="glass-card p-5 mb-8 text-left max-w-sm mx-auto rounded-sm"
            style={{ border: '1px solid rgba(201,169,110,0.15)' }}
          >
            <div className="text-xs text-gold tracking-widest uppercase mb-3">Message Template</div>
            {[
              'Hi Sharma Interior!',
              '📍 Location: [Your Area]',
              '🏠 Project Type: [Bedroom/Kitchen...]',
              '📐 Area: [sq ft]',
              '💰 Budget: [Your Budget]',
            ].map((line, i) => (
              <p key={i} className="text-cream/60 text-sm">{line}</p>
            ))}
          </div>

          <a
            href={`https://wa.me/919625352772?text=${whatsappTemplateMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Open WhatsApp Chat
          </a>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 px-6 md:px-12 lg:px-24" style={{ background: 'var(--charcoal)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-8">What We Offer</div>
          <h2 className="font-display font-light text-cream mb-10" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Our <span className="gold-gradient-text italic">Services</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {SERVICES.map((service, i) => (
              <span
                key={i}
                className="px-4 py-2 border border-gold/15 text-cream/60 text-sm hover:border-gold/40 hover:text-gold transition-all cursor-default"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/919625352772"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </>
  );
}
