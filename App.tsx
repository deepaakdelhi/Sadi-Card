/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, Calendar, Clock, Users, Music, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Components ---

const PetalRain = () => {
  const [petals, setPetals] = useState<{ id: number; left: string; delay: string; duration: string; type: 'rose' | 'marigold' }[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 5 + 5}s`,
      type: Math.random() > 0.5 ? 'rose' : 'marigold' as const,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {p.type === 'rose' ? (
            <div className="w-4 h-4 bg-pink-400 rounded-full opacity-60 blur-[1px]" />
          ) : (
            <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-60 blur-[1px]" />
          )}
        </div>
      ))}
    </div>
  );
};

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center py-8">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-md border border-deep-gold/30 rounded-lg min-w-[80px] gold-glow">
          <span className="text-3xl font-serif font-bold text-deep-gold">{item.value}</span>
          <span className="text-[10px] uppercase tracking-widest text-ivory/70">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const BaaratFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-24 pointer-events-none z-50 overflow-hidden bg-gradient-to-t from-royal-maroon/20 to-transparent">
      <motion.div
        className="flex gap-12 items-end h-full whitespace-nowrap"
        animate={{ x: ['100%', '-100%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-8 items-end">
            <span className="text-4xl">🐘</span>
            <span className="text-4xl">🐎</span>
            <span className="text-3xl">🥁</span>
            <span className="text-3xl">🎺</span>
            <span className="text-4xl">👳</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#800000', '#FF4500'],
    });
    setTimeout(() => setShowContent(true), 1500);
  };

  return (
    <div className="min-h-screen bg-ivory selection:bg-deep-gold selection:text-white">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" // Placeholder for Shehnai-like sound
        preload="auto"
      />

      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* The Door */}
            <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
              {/* Left Door */}
              <motion.div
                className="absolute left-0 w-1/2 h-full bg-[#3d2b1f] border-r-4 border-deep-gold/50 cursor-pointer origin-left flex items-center justify-end pr-4"
                animate={isOpened ? { rotateY: -110 } : { rotateY: 0 }}
                transition={{ duration: 2, ease: [0.45, 0, 0.55, 1] }}
                onClick={handleOpen}
                style={{
                  backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
                  boxShadow: 'inset -10px 0 30px rgba(0,0,0,0.5)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-deep-gold gold-glow border-2 border-champagne-gold flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-royal-maroon" />
                </div>
              </motion.div>

              {/* Right Door */}
              <motion.div
                className="absolute right-0 w-1/2 h-full bg-[#3d2b1f] border-l-4 border-deep-gold/50 cursor-pointer origin-right flex items-center justify-start pl-4"
                animate={isOpened ? { rotateY: 110 } : { rotateY: 0 }}
                transition={{ duration: 2, ease: [0.45, 0, 0.55, 1] }}
                onClick={handleOpen}
                style={{
                  backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
                  boxShadow: 'inset 10px 0 30px rgba(0,0,0,0.5)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-deep-gold gold-glow border-2 border-champagne-gold flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-royal-maroon" />
                </div>
              </motion.div>

              {/* Golden Glow Behind */}
              <AnimatePresence>
                {isOpened && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.5 }}
                    className="absolute inset-0 bg-gradient-radial from-deep-gold via-sunset-orange to-transparent opacity-50 blur-3xl"
                  />
                )}
              </AnimatePresence>

              {!isOpened && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute z-10 text-ivory text-center pointer-events-none"
                >
                  <p className="font-cursive text-4xl mb-2">Tap to Enter</p>
                  <Sparkles className="mx-auto animate-pulse text-deep-gold" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && (
        <main className="relative z-10">
          <PetalRain />
          <BaaratFooter />

          {/* Hero Section */}
          <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1920"
                alt="Royal Palace Background"
                className="w-full h-full object-cover opacity-30"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ivory via-transparent to-ivory" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <div className="mb-8 inline-block p-2 rounded-full border-2 border-deep-gold/30">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-deep-gold gold-glow pixar-glow">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400"
                    alt="Harsh and Shivani Pixar Style"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-royal-maroon mb-4">
                Harsh <Heart className="inline text-sunset-orange fill-sunset-orange" size={40} /> Shivani
              </h1>
              <p className="font-cursive text-3xl md:text-4xl text-deep-gold mb-8">A Tale of Two Souls</p>
              
              <div className="max-w-md mx-auto">
                <Countdown targetDate="2026-04-15T19:00:00" />
              </div>
            </motion.div>
          </section>

          {/* The Pillars Section */}
          <section className="py-20 px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-royal-maroon mb-2">The Pillars</h2>
              <div className="w-24 h-1 bg-deep-gold mx-auto" />
              <p className="mt-4 text-deep-gold italic font-serif">Family Blessings</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Groom Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border-t-8 border-royal-maroon shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Users size={80} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-royal-maroon mb-6 border-b border-deep-gold/20 pb-2">Groom Side</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-deep-gold font-bold uppercase tracking-widest text-xs mb-2">Aashirwad</h4>
                    <p className="text-lg font-serif">Shri Krishan Gopal Dubey & Smt. Shanti Devi</p>
                    <p className="text-sm text-gray-500">(Grandparents)</p>
                  </div>
                  <div>
                    <h4 className="text-deep-gold font-bold uppercase tracking-widest text-xs mb-2">Margdarshak</h4>
                    <p className="text-lg font-serif">Shri Ramakant Dubey & Smt. Girja Dubey</p>
                    <p className="text-sm text-gray-500">(Parents)</p>
                  </div>
                </div>
              </motion.div>

              {/* Bride Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border-t-8 border-sunset-orange shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Users size={80} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-royal-maroon mb-6 border-b border-deep-gold/20 pb-2">Bride Side</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-deep-gold font-bold uppercase tracking-widest text-xs mb-2">Aashirwad</h4>
                    <p className="text-lg font-serif">Shri Ram Pratap Bohare & Smt. Dropati Devi</p>
                    <p className="text-sm text-gray-500">(Grandparents)</p>
                  </div>
                  <div>
                    <h4 className="text-deep-gold font-bold uppercase tracking-widest text-xs mb-2">Margdarshak</h4>
                    <p className="text-lg font-serif">Shri Upendra Bohare & Smt. Rani</p>
                    <p className="text-sm text-gray-500">(Parents)</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* The Shahi Itinerary */}
          <section className="py-20 bg-royal-maroon text-ivory px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-champagne-gold mb-2">The Shahi Itinerary</h2>
                <div className="w-24 h-1 bg-deep-gold mx-auto" />
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Lagan Sagai',
                    date: '15th April',
                    time: '7:00 PM',
                    venue: 'HS Farm, Sabhapur Road',
                    desc: 'Near Delhi-Dehradun Highway',
                    map: 'https://maps.app.goo.gl/j9RTQQozpW8P8FaA6',
                    icon: <Sparkles className="text-deep-gold" />,
                  },
                  {
                    title: 'Mehndi & Haldi',
                    date: '17th & 18th April',
                    time: 'Full Day',
                    venue: 'Family Residence',
                    desc: 'A celebration of colors',
                    icon: <Sparkles className="text-deep-gold" />,
                  },
                  {
                    title: 'The Wedding',
                    date: '19th April',
                    time: '11:00 AM',
                    venue: 'Amar Palace, Agra',
                    desc: 'The Royal Union',
                    map: 'https://maps.app.goo.gl/47nsVGrGmwgYo8dm9',
                    icon: <Heart className="text-deep-gold" />,
                  },
                  {
                    title: 'Vidai',
                    date: '20th April',
                    time: '11:00 AM',
                    venue: 'Amar Palace',
                    desc: 'A new beginning',
                    icon: <Music className="text-deep-gold" />,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-deep-gold/30 p-6 rounded-2xl hover:bg-white/20 transition-all group"
                  >
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="font-serif text-xl font-bold text-champagne-gold mb-2">{item.title}</h3>
                    <div className="space-y-2 text-sm text-ivory/80">
                      <p className="flex items-center gap-2"><Calendar size={14} /> {item.date}</p>
                      <p className="flex items-center gap-2"><Clock size={14} /> {item.time}</p>
                      <p className="flex items-center gap-2"><MapPin size={14} /> {item.venue}</p>
                      <p className="text-xs italic opacity-60">{item.desc}</p>
                    </div>
                    {item.map && (
                      <a
                        href={item.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-deep-gold hover:text-champagne-gold transition-colors"
                      >
                        View Location <MapPin size={12} />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* RSVP & Credits */}
          <section className="py-20 px-4 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-ivory border-4 border-double border-deep-gold p-12 rounded-[3rem] gold-glow"
            >
              <h2 className="font-serif text-3xl font-bold text-royal-maroon mb-8">The Royal Welcome</h2>
              
              <div className="grid md:grid-cols-2 gap-12 text-left">
                <div>
                  <h4 className="text-deep-gold font-bold uppercase tracking-widest text-xs mb-4">Welcomers</h4>
                  <p className="font-serif text-sm leading-relaxed">
                    Shri Sundarlal Agnihotri,<br />
                    Shri Kamla-Birendra Mishra,<br />
                    Smt. Raksha Devi, and Team.
                  </p>
                </div>
                <div>
                  <h4 className="text-deep-gold font-bold uppercase tracking-widest text-xs mb-4">RSVP</h4>
                  <p className="font-serif text-sm leading-relaxed">
                    Shri Radharaman Dubey,<br />
                    Shri Vijay Naresh Dubey,<br />
                    and all Dubey brothers.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-deep-gold/20">
                <h4 className="text-deep-gold font-bold uppercase tracking-widest text-xs mb-4">With Best Compliments</h4>
                <p className="font-serif text-lg">
                  Sourabh, Anuj, Santosh, Ansh, Vansh, Shashwat,<br />
                  and the Entire Dubey Family.
                </p>
              </div>

              <div className="mt-12">
                <button className="px-8 py-3 bg-royal-maroon text-ivory rounded-full font-bold tracking-widest hover:bg-deep-gold transition-all gold-leaf-hover">
                  RSVP NOW
                </button>
              </div>
            </motion.div>
          </section>

          <footer className="py-12 text-center text-deep-gold/60 text-xs tracking-widest uppercase">
            <p>© 2026 Harsh & Shivani Wedding • Made with Love</p>
          </footer>

          <div className="h-24" /> {/* Spacer for Baarat Footer */}
        </main>
      )}
    </div>
  );
}
