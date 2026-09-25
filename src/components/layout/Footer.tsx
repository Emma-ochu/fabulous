import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../home/Logo";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
    aria-hidden='true'
  >
    <path d='M16.6 5.82c-.94-.83-1.52-2.02-1.52-3.32h-3.1v13.6c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1-2.72-2.72 2.72 2.72 0 0 1 2.72-2.72c.29 0 .57.05.83.13v-3.14a5.9 5.9 0 0 0-.83-.06A5.82 5.82 0 0 0 3.44 16.3a5.82 5.82 0 0 0 5.82 5.82 5.82 5.82 0 0 0 5.82-5.82V9.01a8.9 8.9 0 0 0 5.2 1.67V7.58a5.62 5.62 0 0 1-3.68-1.76z' />
  </svg>
);

const Footer = () => {
  return (
    <footer id='contact' className='bg-[#2E2E2E] text-white'>
      <div className='h-1 bg-[#C9A227]' />

      <div className='max-w-7xl mx-auto px-6 py-16 md:py-20'>
        <div className='grid md:grid-cols-3 gap-12 md:gap-10'>
          {/* Brand */}
          <div className='md:col-span-1'>
            <Logo tagline light className='text-2xl md:text-3xl' />

            <p className='mt-6 text-gray-400 text-sm leading-relaxed max-w-sm'>
              Carefully curated skincare products to help you achieve healthy,
              glowing, and radiant skin every day.
            </p>

            <div className='mt-6 flex gap-3'>
              <a
                href='https://wa.me/2347048603741'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C9A227] hover:border-[#C9A227] transition-all duration-300'
                aria-label='WhatsApp'
              >
                <MessageCircle className='w-4 h-4' aria-hidden='true' />
              </a>
              <a
                href='https://tiktok.com/@fabuloussmart.med'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C9A227] hover:border-[#C9A227] transition-all duration-300'
                aria-label='TikTok'
              >
                <TikTokIcon className='w-4 h-4' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-sm uppercase tracking-[0.2em] text-[#C9A227] font-semibold'>
              Quick Links
            </h4>
            <ul className='mt-6 space-y-3'>
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: "Reviews", href: "/#testimonials" },
                { name: "FAQ", href: "/#faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className='text-sm text-gray-400 hover:text-white transition-colors duration-200'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='text-sm uppercase tracking-[0.2em] text-[#C9A227] font-semibold'>
              Contact Us
            </h4>

            <div className='mt-6 space-y-4'>
              <a
                href='https://wa.me/2347048603741'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 group'
              >
                <div className='w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors'>
                  <Phone
                    className='w-4 h-4 text-[#25D366]'
                    aria-hidden='true'
                  />
                </div>
                <div>
                  <p className='text-xs text-gray-500'>WhatsApp</p>
                  <p className='text-sm text-white group-hover:text-[#C9A227] transition-colors'>
                    0704 860 3741
                  </p>
                </div>
              </a>

              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center'>
                  <Mail className='w-4 h-4 text-gray-400' aria-hidden='true' />
                </div>
                <div>
                  <p className='text-xs text-gray-500'>Email</p>
                  <p className='text-sm text-gray-300'>
                    fabuloussmartsolutions@gmail.com
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center'>
                  <MapPin
                    className='w-4 h-4 text-gray-400'
                    aria-hidden='true'
                  />
                </div>
                <div>
                  <p className='text-xs text-gray-500'>Location</p>
                  <p className='text-sm text-gray-300'>Enugu, Nigeria</p>
                </div>
              </div>

              {/* Business Hours - Added */}
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center'>
                  <Clock className='w-4 h-4 text-gray-400' aria-hidden='true' />
                </div>
                <div>
                  <p className='text-xs text-gray-500'>Business Hours</p>
                  <p className='text-sm text-white'>Monday – Saturday</p>
                  <p className='text-sm text-gray-400'>9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-xs text-gray-500'>
            © 2026 Fabulouss Skin Care Mart. All rights reserved.
          </p>
          <p className='text-xs text-gray-600'>
            Designed with care for beautiful skin.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
