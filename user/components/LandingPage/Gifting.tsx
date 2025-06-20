import React from 'react'

const giftingCards = [
  {
    title: 'ENRICHING CONNECTIONS',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    alt: 'Enriching Connections',
    text: `Every occasion, great or small, deserves to be treasured. BoxUp's core value is to strengthen connections and cherish memorable occasions by adding a simple display of affection that enriches the bond.`,
  },
  {
    title: 'DEFINING LUXURY',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    alt: 'Defining Luxury',
    text: `Our luxury hampers are not defined by the monetary value of a product. Rather, luxury for BoxUp is associated with excellence, exclusivity, and effortlessness – something that's elevated above the norm. These hampers are not only well-crafted but also convey a sense of prestige and refinement`,
  },
  {
    title: 'GROW AND LET GROW',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    alt: 'Grow and Let Grow',
    text: `We strive to create the perfect blend of sourcing materials from the local community while maintaining premium hamper norms. Building a community is an important part of any business. Therefore, we go all out to acquire premium materials from local businesses that share our enthusiasm for providing the finest gifting experience.`,
  },
];

const Gifting = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl md:text-5xl font-edu-cursive text-center mb-12">What is Boxup Luxury Gifting ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {giftingCards.map((card, idx) => (
          <div key={idx} className="bg-white border p-1 overflow-hidden flex flex-col h-full">
            <div className="h-72 w-full bg-gray-100 flex items-center justify-center">
              <img src={card.image} alt={card.alt} className="object-cover w-full h-full" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-edu-cursive mb-2">{card.title}</h3>
              <p className="text-gray-700 text-sm">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gifting