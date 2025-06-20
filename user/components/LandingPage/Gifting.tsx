import React from 'react'

const giftingCards = [
  {
    title: 'Ready to ship',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Ready_to_ship.jpg?v=1685185091',
    alt: 'Ready to ship gifts',
    text: 'We have a wide range of ready-to-ship, corporate gifts for employees, clients, and companies, beautifully handcrafted and assembled for every occasion.',
    buttonText: 'INQUIRE NOW',
  },
  {
    title: 'Semi - Customized',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Semi-Customized.jpg?v=1685185187&width=1240',
    alt: 'Semi customized gifts',
    text: 'Do you see a hamper that you like on our website? We can have your branding on theproducts you see in a hamper and make it feel like your very own.',
    buttonText: 'INQUIRE NOW',
  },
  {
    title: 'Custom curated',
    image: 'https://www.boxupgifting.com/cdn/shop/files/Custom_curated.jpg?v=1685185266&width=1240',
    alt: 'Custom curated gifts',
    text: 'Our Products stylist will help you curate truly one-of-a-kind hampers for the mostimportant people in your life – be it, family, friends, clients, or your employees',
    buttonText: 'INQUIRE NOW',
  },
];

const Gifting = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl  font-light mb-4 font-edu-cursive">What Make's Us Unique?</h2>
        <p className="text-md text-gray-600 font-light max-w-2xl mx-auto">
          We help companies send thoughtful, well branded gifts with a streamlined and stress-free process!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {giftingCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-2xl   p-4 overflow-hidden shadow-lg flex flex-col">
            <h3 className="text-md font-medium text-center font-edu-cursive mb-4">{card.title}</h3>
            <div className="relative h-72">
              <img 
                src={card.image} 
                alt={card.alt} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <p className="text-gray-600 mb-6 flex-1">{card.text}</p>
              <button className="border-2 border-black  w-1/2 mx-auto py-2 rounded-[100px] hover:bg-black hover:text-white transition-colors duration-300">
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gifting