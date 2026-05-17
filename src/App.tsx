/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'motion/react';
import { 
  Camera, 
  Video, 
  Star, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  ChevronRight, 
  X, 
  Menu,
  Clock,
  Mail,
  ChevronDown,
  Globe,
  Award,
  Users,
  Film,
  CameraIcon,
  Smile,
  PartyPopper
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface PortfolioItem {
  id: number;
  category: 'Weddings' | 'Portraits' | 'Events' | 'Films';
  imageUrl: string;
  title: string;
}

// --- Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 text-center">
    {subtitle && <p className="text-gold uppercase tracking-[0.2em] text-sm mb-3 font-medium">{subtitle}</p>}
    <h2 className="text-4xl md:text-5xl font-serif text-warm-white mb-4">{children}</h2>
    <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
  </div>
);

const Counter = ({ target, duration = 2, label }: { target: number; duration?: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-serif text-gold mb-2">
        {count}{target === 4.9 ? '' : '+'}{target === 4.9 ? '★' : ''}
      </div>
      <p className="text-warm-white/60 uppercase tracking-widest text-xs font-medium">{label}</p>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Weddings' | 'Portraits' | 'Events' | 'Films'>('All');
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services: Service[] = [
    { id: '1', title: 'Wedding Photography & Films', description: 'Cinematic storytelling for your most precious day.', icon: <Film className="w-6 h-6" /> },
    { id: '2', title: 'Pre-Wedding & Post-Wedding Shoots', description: 'Romantic sessions in iconic UAE landscapes.', icon: <Camera className="w-6 h-6" /> },
    { id: '3', title: 'Portrait & Headshot Sessions', description: 'Professional branding and personal portraits.', icon: <Users className="w-6 h-6" /> },
    { id: '4', title: 'Child & Family Photography', description: 'Capturing the heart of your home and family.', icon: <Smile className="w-6 h-6" /> },
    { id: '5', title: 'Fashion Portfolio Shoots', description: 'Editorial style photography for aspiring models.', icon: <CameraIcon className="w-6 h-6" /> },
    { id: '6', title: 'Birthday & Celebration Shoots', description: 'Commemorating life milestones with joy.', icon: <PartyPopper className="w-6 h-6" /> },
    { id: '7', title: 'Corporate & Event Coverage', description: 'Expert documentation of business milestones.', icon: <Award className="w-6 h-6" /> },
    { id: '8', title: '360 Photo Booth', description: 'Immersive video experience for dynamic events.', icon: <Globe className="w-6 h-6" /> },
    { id: '9', title: 'Selfie Booth Rental', description: 'Fun, interactive photo sessions for all guests.', icon: <Smile className="w-6 h-6" /> },
  ];

  const portfolio: PortfolioItem[] = [
    { id: 1, category: 'Weddings', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', title: 'Elegant Emirate Nuptials' },
    { id: 2, category: 'Portraits', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop', title: 'Desert Sunset Portrait' },
    { id: 3, category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop', title: 'Corporate Gala Abu Dhabi' },
    { id: 4, category: 'Films', imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop', title: 'Cinematic Love Story' },
    { id: 5, category: 'Weddings', imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop', title: 'Grand Mosque Sessions' },
    { id: 6, category: 'Portraits', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', title: 'Executive Headshot' },
    { id: 7, category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop', title: 'Royal Reception' },
    { id: 8, category: 'Films', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop', title: 'Heritage Village Film' },
    { id: 9, category: 'Weddings', imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop', title: 'Garden Wedding Magic' },
  ];

  const testimonials: Testimonial[] = [
    { id: 1, name: 'Fatima Al Mazrouei', role: 'Abu Dhabi National', text: 'SNS Photography captured our family wedding with such grace. Every shot feels like a painting. The team was professional and understood our traditions perfectly.', rating: 5 },
    { id: 2, name: 'James & Emily Turner', role: 'British Expats', text: 'We booked a sunset desert shoot. The results were mind-blowing. They know exactly how to use the Abu Dhabi light. Highly recommend for any expats looking for high-quality work.', rating: 5 },
    { id: 3, name: 'Ravi Nair', role: 'Indian Community, Abu Dhabi', text: 'Used their 360 photo booth for my daughter’s birthday. It was the highlight of the night! Fast delivery of the films and great energy from the staff.', rating: 5 },
  ];

  const filteredPortfolio = activeFilter === 'All' 
    ? portfolio 
    : portfolio.filter(item => item.category === activeFilter);

  const stats = [
    { label: 'Google Rating', value: '4.9 \u2605' },
    { label: 'Happy Clients', value: '127+' },
    { label: 'Facebook Followers', value: '3,600+' },
    { label: 'Years Experience', value: '5+' },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative font-sans selection:bg-gold selection:text-primary">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left" style={{ scaleX }} />

      {/* WhatsApp Fixed Button */}
      <a 
        href="https://wa.me/971569303987" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-1 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          Chat with us
        </span>
      </a>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <h1 className="text-xl md:text-2xl font-serif tracking-widest text-warm-white">
              SNS <span className="text-gold">PHOTOGRAPHY</span>
            </h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold"> & Films Abu Dhabi</p>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            {['Services', 'About', 'Portfolio', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-xs uppercase tracking-[0.2em] font-medium hover:text-gold transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('contact')}
              className="bg-gold text-primary px-6 py-2 rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-white transition-all active:scale-95"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-warm-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-charcoal w-full border-t border-gold/10 overflow-hidden"
            >
              <div className="flex flex-col p-8 space-y-6">
                {['Services', 'About', 'Portfolio', 'Contact'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-sm uppercase tracking-widest text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image / Gradient */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2560&auto=format&fit=crop" 
              className="w-full h-full object-cover scale-105 opacity-40"
              alt="Cinematic background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary" />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex flex-col items-center mb-6">
                <span className="flex items-center text-xs uppercase tracking-[0.3em] font-semibold text-gold mb-4 py-1 px-4 border border-gold/30 rounded-full bg-gold/5">
                  <MapPin className="w-3 h-3 mr-2" /> Abu Dhabi, UAE
                </span>
                <span className="flex items-center text-xs text-warm-white/70 tracking-widest space-x-2">
                  <span className="text-gold flex"><Star className="w-3 h-3 fill-gold" /><Star className="w-3 h-3 fill-gold" /><Star className="w-3 h-3 fill-gold" /><Star className="w-3 h-3 fill-gold" /><Star className="w-3 h-3 fill-gold" /></span>
                  <span>4.9 — 127 Google Reviews</span>
                </span>
              </div>

              <h1 className="text-5xl md:text-8xl font-serif text-warm-white mb-6 leading-tight">
                SNS Photography <br /> <span className="italic font-normal">& Films</span>
              </h1>
              
              <p className="text-lg md:text-xl text-warm-white/60 max-w-2xl mx-auto mb-10 tracking-widest font-light">
                Weddings. Portraits. Moments. <br /> Captured Forever.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => scrollTo('contact')}
                  className="w-full sm:w-auto bg-gold text-primary px-10 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-xl active:scale-95"
                >
                  Book a Session
                </button>
                <button 
                  onClick={() => scrollTo('portfolio')}
                  className="w-full sm:w-auto border border-white/30 text-white px-10 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all active:scale-95"
                >
                  Watch Our Films
                </button>
              </div>
            </motion.div>
          </div>

          {/* Mouse Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-gold/60 rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* SOCIAL PROOF BANNER */}
        <section className="bg-charcoal py-10 border-y border-gold/10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center md:border-r last:border-0 border-gold/20 px-4">
                  <span className="text-2xl font-serif text-gold mb-1">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-widest text-warm-white/40">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-primary">
          <div className="container mx-auto px-6">
            <SectionTitle subtitle="Excellence in every frame">What We Create</SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-charcoal p-10 border border-white/5 hover-gold-glow group rounded-sm"
                >
                  <div className="text-gold mb-6 group-hover:scale-110 transition-transform inline-block">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif text-warm-white mb-4 tracking-wide">{service.title}</h3>
                  <p className="text-warm-white/50 text-sm leading-relaxed mb-8 font-light">
                    {service.description}
                  </p>
                  <button 
                    onClick={() => scrollTo('contact')}
                    className="flex items-center text-[10px] uppercase tracking-[0.3em] font-bold text-gold group-hover:translate-x-2 transition-transform"
                  >
                    Enquire Now <ChevronRight className="w-3 h-3 ml-1" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-charcoal/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-gold/30 z-0" />
                <img 
                  src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1200&auto=format&fit=crop" 
                  alt="Behind the scenes at SNS studio"
                  className="relative z-10 w-full h-[600px] object-cover rounded-sm shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-gold/30 z-0" />
              </div>

              <div className="w-full lg:w-1/2">
                <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-3">Our Legacy</p>
                <h2 className="text-4xl md:text-5xl font-serif text-warm-white mb-8 leading-tight">
                  More Than Photos — <br /> We Create <span className="text-gold italic font-normal text-6xl">Cinematic Memories</span>
                </h2>
                <div className="space-y-6 text-warm-white/60 leading-relaxed font-light mb-10">
                  <p>
                    Strategically located in Al Rawdah, Abu Dhabi, near the Civil Wedding Judicial Department, SNS Photography & Films has established itself as a premier destination for luxury visual storytelling.
                  </p>
                  <p>
                    From multi-national weddings to intimate corporate portraits, we bring a cinematic approach to every session. Our team blends traditional artistry with modern technology to deliver visuals that resonate emotionally and stand the test of time.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                  <Counter target={127} label="Verified Reviews" />
                  <Counter target={500} label="Sessions Completed" />
                  <Counter target={4.9} label="Average Rating" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-24 bg-primary">
          <div className="container mx-auto px-6">
            <SectionTitle subtitle="Visual Storytelling">Our Work</SectionTitle>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {['All', 'Weddings', 'Portraits', 'Events', 'Films'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as any)}
                  className={`px-8 py-2 text-[10px] uppercase tracking-[0.3em] font-medium transition-all rounded-full border ${
                    activeFilter === filter 
                      ? 'bg-gold border-gold text-primary' 
                      : 'border-white/10 text-warm-white/50 hover:border-gold/50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPortfolio.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-[4/5] group cursor-pointer overflow-hidden rounded-sm"
                    onClick={() => setSelectedImage(item)}
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-8">
                      <p className="text-gold text-[10px] uppercase tracking-widest mb-1">{item.category}</p>
                      <h4 className="text-warm-white font-serif text-xl">{item.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-8 right-8 text-warm-white p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <motion.img 
                layoutId={`img-${selectedImage.id}`}
                src={selectedImage.imageUrl} 
                alt={selectedImage.title}
                className="max-h-[85vh] max-w-full object-contain shadow-2xl rounded-sm"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-10 text-center">
                <p className="text-gold uppercase tracking-[0.3em] text-xs mb-2">{selectedImage.category}</p>
                <h3 className="text-2xl md:text-3xl font-serif text-warm-white">{selectedImage.title}</h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 360 & SELFIE BOOTH SECTION */}
        <section className="py-24 bg-charcoal">
          <div className="container mx-auto px-6">
            <SectionTitle subtitle="Elevate Your Event">Experience the Innovation</SectionTitle>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="relative group overflow-hidden rounded-sm bg-primary p-12 border border-white/5 hover:border-gold/30 transition-all">
                <div className="flex justify-between items-start mb-8">
                  <Globe className="w-12 h-12 text-gold" />
                  <span className="text-[10px] uppercase tracking-widest text-gold/40">Exclusive Feature</span>
                </div>
                <h3 className="text-3xl font-serif mb-6">360 Photo Booth</h3>
                <p className="text-warm-white/50 font-light leading-relaxed mb-10">
                  Step into the spotlight. Our 360 photo booth captures breathtaking slo-mo videos from every angle, perfect for luxury weddings and corporate activations in Abu Dhabi. High-speed sharing included.
                </p>
                <button 
                  onClick={() => scrollTo('contact')}
                  className="w-full py-4 border border-gold text-gold uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold hover:text-primary transition-all active:scale-95"
                >
                  Rent for Your Event
                </button>
              </div>

              <div className="relative group overflow-hidden rounded-sm bg-primary p-12 border border-white/5 hover:border-gold/30 transition-all">
                <div className="flex justify-between items-start mb-8">
                  <Smile className="w-12 h-12 text-gold" />
                  <span className="text-[10px] uppercase tracking-widest text-gold/40">Most Popular</span>
                </div>
                <h3 className="text-3xl font-serif mb-6">Selfie Booth Rental</h3>
                <p className="text-warm-white/50 font-light leading-relaxed mb-10">
                  Interactive fun for guests of all ages. Custom backdrops, digital props, and instant prints. Our selfie booths are designed to complement refined event aesthetics while providing endless entertainment.
                </p>
                <button 
                  onClick={() => scrollTo('contact')}
                  className="w-full py-4 border border-gold text-gold uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold hover:text-primary transition-all active:scale-95"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-24 bg-primary relative">
          <div className="container mx-auto px-6">
            <SectionTitle subtitle="Kind words">What Our Clients Say</SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-charcoal p-10 rounded-sm border border-white/5 relative">
                  <div className="flex mb-6 text-gold">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold" />)}
                  </div>
                  <p className="text-warm-white font-light italic leading-relaxed mb-8">"{t.text}"</p>
                  <div>
                    <h4 className="font-serif text-lg tracking-wide">{t.name}</h4>
                    <p className="text-gold text-[10px] uppercase tracking-[0.2em]">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT / BOOKING SECTION */}
        <section id="contact" className="py-24 bg-primary relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20">
              {/* Form */}
              <div className="w-full lg:w-3/5">
                <h2 className="text-4xl md:text-5xl font-serif text-warm-white mb-2">Book Your Session</h2>
                <p className="text-warm-white/50 mb-10 tracking-widest font-light">Tell us about your event and we will return with a bespoke proposal.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2 text-gold/60">Full Name</label>
                      <input type="text" className="bg-charcoal border border-white/10 p-4 font-light focus:outline-none focus:border-gold transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2 text-gold/60">Phone Number (+971)</label>
                      <input type="tel" className="bg-charcoal border border-white/10 p-4 font-light focus:outline-none focus:border-gold transition-colors" placeholder="+971 50 XXXXXXX" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2 text-gold/60">Email Address</label>
                      <input type="email" className="bg-charcoal border border-white/10 p-4 font-light focus:outline-none focus:border-gold transition-colors" placeholder="john@example.com" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2 text-gold/60">Preferred Service</label>
                      <select className="bg-charcoal border border-white/10 p-4 font-light focus:outline-none focus:border-gold transition-colors appearance-none">
                        {services.map(s => <option key={s.id}>{s.title}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2 text-gold/60">Event Date</label>
                    <input type="date" className="bg-charcoal border border-white/10 p-4 font-light focus:outline-none focus:border-gold transition-colors" />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2 text-gold/60">Message / Special Requests</label>
                    <textarea className="bg-charcoal border border-white/10 p-4 h-32 font-light focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Details about your dream session..."></textarea>
                  </div>

                  <button type="submit" className="w-full bg-gold text-primary py-5 rounded-sm uppercase tracking-[0.3em] font-bold text-sm hover:bg-white transition-all active:scale-95">
                    Send Enquiry
                  </button>
                </form>
              </div>

              {/* Info Panel */}
              <div className="w-full lg:w-2/5">
                <div className="bg-charcoal p-12 rounded-sm h-full border border-gold/10">
                  <h3 className="text-2xl font-serif mb-10 text-gold italic">Contact Details</h3>
                  
                  <div className="space-y-10">
                    <div className="flex items-start">
                      <Phone className="w-6 h-6 text-gold mr-6" />
                      <div>
                        <p className="text-xs uppercase tracking-widest text-warm-white/40 mb-2">Call Us</p>
                        <p className="text-lg font-medium">+971 56 930 3987</p>
                        <p className="text-lg font-medium text-gold/80">+971 52 744 6003 (Booking)</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="w-6 h-6 text-gold mr-6" />
                      <div>
                        <p className="text-xs uppercase tracking-widest text-warm-white/40 mb-2">Location</p>
                        <p className="text-lg font-medium leading-relaxed">
                          Al Rawdah W58, <br /> Near Judicial Department, <br /> Abu Dhabi, UAE
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="w-6 h-6 text-gold mr-6" />
                      <div>
                        <p className="text-xs uppercase tracking-widest text-warm-white/40 mb-2">Studio Hours</p>
                        <div className="text-lg font-medium">
                          <p>Mon – Sat: 8:00 AM – 8:00 PM</p>
                          <p className="text-gold/80 italic">Friday: By Appointment</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-6">
                        <Globe className="w-6 h-6 text-gold" />
                      </div>
                      <div className="flex flex-col space-y-4">
                         <a href="https://instagram.com/snsphotography_84" target="_blank" rel="noreferrer" className="flex items-center hover:text-gold transition-colors">
                           <Instagram className="w-4 h-4 mr-3" /> @snsphotography_84
                         </a>
                         <a href="#" className="flex items-center hover:text-gold transition-colors">
                           <Facebook className="w-4 h-4 mr-3" /> SNS Photography & Films
                         </a>
                      </div>
                    </div>
                  </div>

                  {/* Maps Embed Placeholder */}
                  <div className="mt-12 w-full h-48 bg-primary rounded-sm border border-white/5 flex items-center justify-center p-4 overflow-hidden relative group">
                     {/* Using a static map image for reliability */}
                     <img 
                       src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                       alt="Abu Dhabi map"
                       className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale filter invert"
                     />
                     <div className="relative text-center">
                        <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                        <span className="text-[10px] uppercase tracking-widest text-gold">Al Rawdah, Abu Dhabi</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-primary pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif text-warm-white mb-6">SNS <span className="text-gold">Photography</span></h2>
              <p className="text-warm-white/40 max-w-sm font-light leading-relaxed mb-8">
                Capturing Abu Dhabi's most precious moments since day one. We blend cinematic film techniques with high-end photography to tell your unique family and corporate stories.
              </p>
              <div className="flex space-x-6 text-warm-white/60">
                <a href="#" className="hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-gold transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-gold transition-colors"><MessageCircle className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-8">Quick Links</h4>
              <ul className="space-y-4 text-xs font-medium uppercase tracking-[0.2em] text-warm-white/50">
                <li><button onClick={() => scrollTo('services')} className="hover:text-gold">Services</button></li>
                <li><button onClick={() => scrollTo('about')} className="hover:text-gold">About Us</button></li>
                <li><button onClick={() => scrollTo('portfolio')} className="hover:text-gold">Portfolio</button></li>
                <li><button onClick={() => scrollTo('contact')} className="hover:text-gold">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-8">Contact</h4>
              <ul className="space-y-4 text-sm font-light text-warm-white/50">
                <li>Al Rawdah W58, Abu Dhabi</li>
                <li className="text-gold">+971 56 930 3987</li>
                <li>Mon – Sat: 8AM – 8PM</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/20 text-center md:text-left gap-4">
            <p>&copy; 2025 SNS Photography & Films. Abu Dhabi, UAE. All rights reserved.</p>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-gold">Privacy Policy</a>
              <a href="#" className="hover:text-gold">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
