import React from 'react'

const giftingCards = [
  {
    title: 'Ready to Ship',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Ready_to_ship.jpg?v=1685185091',
    alt: 'Ready to ship gifts',
    text: 'Experience our curated collection of ready-to-ship corporate gifts, meticulously handcrafted and elegantly assembled for every occasion.',
    buttonText: 'Explore Options',
  },
  {
    title: 'Semi-Customized',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Semi-Customized.jpg?v=1685185187&width=1240',
    alt: 'Semi customized gifts',
    text: 'Transform our exquisite hampers into your own by incorporating your distinctive branding, creating a perfect blend of luxury and personalization.',
    buttonText: 'Customize Now',
  },
  {
    title: 'Custom Curated',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Custom_curated.jpg?v=1685185266&width=1240',
    alt: 'Custom curated gifts',
    text: 'Our expert stylists craft bespoke gift experiences, creating unique hampers that reflect your appreciation for clients, employees, and loved ones.',
    buttonText: 'Start Creating',
  },
];

const Gifting = () => {
  return (
    <section className="bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 border border-[#AD9660]/5 rotate-45 -translate-y-1/2 translate-x-1/2 rounded-[30%]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-[#AD9660]/5 rotate-45 translate-y-1/2 -translate-x-1/2 rounded-[30%]"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#AD9660]/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center mb-16">
          {/* Decorative line */}
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#AD9660] to-transparent mb-6"></div>
          
          <h2 className="text-3xl md:text-4xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre'] text-center">
            The Art of Corporate Gifting
          </h2>
          <p className="text-gray-600 font-light max-w-2xl mx-auto text-center text-sm md:text-base">
            Elevating corporate relationships through meticulously curated gift experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {giftingCards.map((card, idx) => (
            <div key={idx} className="group relative">
              <div className="bg-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg">
                <div className="relative">
                  {/* Decorative border */}
                  <div className="absolute inset-0 border-2 border-[#AD9660]/0 group-hover:border-[#AD9660]/20 transition-all duration-500 rounded-xl z-10"></div>
                  
                  {/* Image container */}
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/70 via-[#323433]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Title with decorative line */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-[1px] bg-[#AD9660]/30"></div>
                      <h3 className="text-xl font-light text-[#323433] font-['Frank_Ruhl_Libre']">{card.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-8 font-light leading-relaxed">
                      {card.text}
                    </p>

                    <button className="w-full bg-transparent border border-[#AD9660] text-[#323433] px-8 py-3 rounded-full hover:bg-[#AD9660] hover:text-white transition-all duration-300 flex items-center justify-center group">
                      <span className="mr-2 text-sm tracking-wide font-light">{card.buttonText}</span>
                      <div className="w-4 h-[1px] bg-current transform transition-all duration-300 group-hover:w-6"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gifting