'use client'

import React, { useRef, useEffect } from 'react';

const clientLogos = [
  'https://www.boxupgifting.com/cdn/shop/files/frame-88-1651742428557_1200x_1.png?v=1657792548',
  'https://www.boxupgifting.com/cdn/shop/files/frame-22-1-1651850465061_1200x_1.png?v=1657792129',
  'https://www.boxupgifting.com/cdn/shop/files/image-5-1651850465054_1200x_1.png?v=1657792173',
  'https://www.boxupgifting.com/cdn/shop/files/frame-26-1651850465057_1200x_1.png?v=1657792222',
  'https://www.boxupgifting.com/cdn/shop/files/frame-60-1651742428513_1200x_1.png?v=1657792319',
  'https://www.boxupgifting.com/cdn/shop/files/frame-25-1651850465058_1200x_1.png?v=1657792263',
  'https://www.boxupgifting.com/cdn/shop/files/frame-70-1651742428534_1200x_1.png?v=1657792287',
  'https://www.boxupgifting.com/cdn/shop/files/frame-62-1651742428518_1200x_1.png?v=1657792343',
  'https://www.boxupgifting.com/cdn/shop/files/image-11-1651850465051_1200x_1.png?v=1657792237',
  'https://www.boxupgifting.com/cdn/shop/files/frame-24-2-1651850465059_1200x_1.png?v=1657792198',
  'https://www.boxupgifting.com/cdn/shop/files/frame-27-1651850465055_1200x_1.png?v=1657792155',
  'https://www.boxupgifting.com/cdn/shop/files/frame-80-1651742428548_1200x_1.png?v=1657793041',
  'https://www.boxupgifting.com/cdn/shop/files/280.png?v=1657795826',
  'https://www.boxupgifting.com/cdn/shop/files/frame-63-1651742428519_1200x_1.png?v=1657792374',
  'https://www.boxupgifting.com/cdn/shop/files/frame-66-1651742428529_1200x_1.png?v=1657792527',
  'https://www.boxupgifting.com/cdn/shop/files/frame-88-1651742428557_1200x_1.png?v=1657792548',
  'https://www.boxupgifting.com/cdn/shop/files/frame-84-1651742428555_1200x_1.png?v=1657792585',
  'https://www.boxupgifting.com/cdn/shop/files/frame-73-1651742428537_1200x_1.png?v=1657792615',
  'https://www.boxupgifting.com/cdn/shop/files/frame-69-1651742428533_1200x_1.png?v=1657792635',
  'https://www.boxupgifting.com/cdn/shop/files/frame-64-1651742428521_1200x_1.png?v=1657792653',
  'https://www.boxupgifting.com/cdn/shop/files/frame-23-2-1651850465060_1200x_1.png?v=1657792677',
  'https://www.boxupgifting.com/cdn/shop/files/frame-76-1651742428539_1200x_1.png?v=1657792697',
];

// Repeat the logos to create a looping effect
const repeatCount = 3; // Adjust for smoother loop
const repeatedRow1 = Array.from({ length: repeatCount }, () => clientLogos.slice(0, Math.ceil(clientLogos.length / 2))).flat();
const repeatedRow2 = Array.from({ length: repeatCount }, () => clientLogos.slice(Math.ceil(clientLogos.length / 2))).flat();

const OurClient: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  let autoScrollInterval: number | null = null;
  const isHovered = useRef(false);

  // Auto-scroll logic
  useEffect(() => {
    function startAutoScroll() {
      if (autoScrollInterval) return;
      autoScrollInterval = window.setInterval(() => {
        if (!isHovered.current && scrollRef.current) {
          scrollRef.current.scrollBy({ left: 1, behavior: 'smooth' });
          // Looping effect: if near end, reset to start
          if (
            scrollRef.current.scrollLeft + scrollRef.current.offsetWidth >=
            scrollRef.current.scrollWidth - 2
          ) {
            scrollRef.current.scrollLeft = 0;
          }
        }
      }, 16); // ~60fps
    }
    function stopAutoScroll() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }
    startAutoScroll();
    return () => stopAutoScroll();
    // eslint-disable-next-line
  }, []);

  // Pause/resume on hover
  const handleMouseEnter = () => {
    isHovered.current = true;
  };
  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-normal text-center mb-10 font-playfair">Our Clients</h2>
        <div className="flex items-center justify-center">
         
          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-hidden py-2 px-1 custom-hide-scrollbar"
            style={{ scrollBehavior: 'smooth', maxWidth: '1200px', width: '100%' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col space-y-3 min-w-max">
              <div className="flex space-x-8">
                {repeatedRow1.map((logo, idx) => (
                  <div key={idx} className="flex-shrink-0 flex items-center justify-center group" style={{ minWidth: 90, minHeight: 32 }}>
                    <img
                      src={logo}
                      alt={`Client logo row1-${idx + 1}`}
                      className="h-8 object-contain grayscale group-hover:grayscale-0 transition duration-300"
                      style={{ maxWidth: 110 }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex space-x-8">
                {repeatedRow2.map((logo, idx) => (
                  <div key={idx} className="flex-shrink-0 flex items-center justify-center group" style={{ minWidth: 90, minHeight: 32 }}>
                    <img
                      src={logo}
                      alt={`Client logo row2-${idx + 1}`}
                      className="h-8 object-contain grayscale group-hover:grayscale-0 transition duration-300"
                      style={{ maxWidth: 110 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
         
        </div>
      </div>
   
    </section>
  );
};

export default OurClient; 