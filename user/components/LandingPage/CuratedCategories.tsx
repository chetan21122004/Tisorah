import { FC } from 'react';
import Link from 'next/link';

interface Category {
  name: string;
  image: string;
  slug?: string;
}

interface CuratedCategoriesProps {
  categories: Category[];
}

const CuratedCategories: FC<CuratedCategoriesProps> = ({ categories }) => {
  // Filter categories for the specific sections we want to display
  const displayCategories = {
    journal: categories.find(cat => cat.name === 'Journal') || { name: 'Journal', image: 'https://www.boxupgifting.com/cdn/shop/files/quokkabottles-LGPLafOVhqY-unsplash_copy_222d70ad-99f7-4de2-b07c-56c34b9fc8e4.jpg?v=1744178433' },
    drinkware: categories.find(cat => cat.name === 'Drinkware') || { name: 'Drinkware', image: 'https://www.boxupgifting.com/cdn/shop/files/quokkabottles-LGPLafOVhqY-unsplash_copy_222d70ad-99f7-4de2-b07c-56c34b9fc8e4.jpg?v=1744178433' },
    electronics: categories.find(cat => cat.name === 'Electronic Gadgets') || { name: 'Electronic Gadgets', image: 'https://www.boxupgifting.com/cdn/shop/files/Magnetic_charger_cable_holder_-_1_2_99287279-cc16-4f06-8d3d-8506f6347a50.jpg?v=1744178647' },
    coffee: categories.find(cat => cat.name === 'Coffee & Tea Delights') || { name: 'Coffee & Tea Delights', image: 'https://www.boxupgifting.com/cdn/shop/files/Tea_ceramic_cups_-_set_of_two_-_2_copy_2f7a4acc-f87d-4526-bd0d-13856992d8d9.jpg?v=1744178455' },
    lights: categories.find(cat => cat.name === 'Lights & Lamps') || { name: 'Lights & Lamps', image: 'https://www.boxupgifting.com/cdn/shop/files/joyce-g-3y9ymqvRR_s-unsplash_copy_2accb539-f2c2-4e4b-8997-f7751abc1209.jpg?v=1744178278' }
  };

  const getCategoryUrl = (category: Category) => {
    return category.slug ? `/categories/${category.slug}` : '/categories';
  };

  return (
    <section className="py-16 bg-[#F4F4F4]/30 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 border border-[#AD9660]/5 rotate-45 -translate-y-1/2 translate-x-1/2 rounded-[30%]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-[#AD9660]/5 rotate-45 translate-y-1/2 -translate-x-1/2 rounded-[30%]"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#AD9660] to-transparent mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-light text-[#323433] mb-4 font-['Frank_Ruhl_Libre'] text-center">
            Curated Gift Categories
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto font-light mb-10">
            Custom-branded gifts that connect with your audience
          </p>
        </div>
        
        <div className="hero-section text-center flex gap-6 max-w-6xl items-center justify-center mx-auto flex-col md:flex-row px-2">
          <div className="flex flex-col gap-6 md:w-1/2 w-full">
            <CategoryCard 
              category={displayCategories.journal} 
              height="h-[214px]" 
              url={getCategoryUrl(displayCategories.journal)} 
            />
            <CategoryCard 
              category={displayCategories.drinkware} 
              height="h-[400px]" 
              url={getCategoryUrl(displayCategories.drinkware)} 
            />
          </div>

          <div className="flex flex-col gap-8 md:w-1/2 w-full">
            <div className="text-left">
              <h3 className="text-2xl mb-4 font-light text-[#323433] font-['Frank_Ruhl_Libre']">Custom-branded gifts that connect with your audience.</h3>
              <Link href="/collections" className="bg-[#AD9660] text-white px-8 py-3 rounded-full hover:bg-[#9e865a] transition-all duration-300 flex items-center group inline-block">
                <span className="mr-2">Explore Collection</span>
                <div className="w-4 h-[1px] bg-white transform transition-all duration-300 group-hover:w-6"></div>
              </Link>
            </div>
            <CategoryCard 
              category={displayCategories.electronics} 
              height="h-[450px]" 
              url={getCategoryUrl(displayCategories.electronics)} 
            />
          </div>

          <div className="flex flex-col gap-6 md:w-1/2 w-full">
            <CategoryCard 
              category={displayCategories.coffee} 
              height="h-[214px]" 
              url={getCategoryUrl(displayCategories.coffee)} 
            />
            <CategoryCard 
              category={displayCategories.lights} 
              height="h-[400px]" 
              url={getCategoryUrl(displayCategories.lights)} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: Category;
  height: string;
  url: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ category, height, url }) => {
  return (
    <Link href={url} className="block">
      <div className="relative group overflow-hidden rounded-xl">
        <img
          src={category.image}
          alt={category.name}
          className={`w-full ${height} object-cover transition-transform duration-700 ease-out group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#323433]/70 via-[#323433]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-light text-xl font-['Frank_Ruhl_Libre']">{category.name}</h3>
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <span className="text-[#AD9660] text-xs tracking-wider font-light">Explore</span>
              <div className="ml-2 w-4 h-[1px] bg-[#AD9660] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl border-2 border-[#AD9660]/0 group-hover:border-[#AD9660]/20 transition-all duration-500"></div>
      </div>
    </Link>
  );
};

export default CuratedCategories; 