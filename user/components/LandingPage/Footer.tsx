import React from 'react';
import { Mail, MessageCircle, Facebook, Instagram, Twitter, Youtube, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[rgb(37,33,27)] text-white relative overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Header Description */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-12 gap-8">
          <div className="lg:max-w-4xl">
            <p className="text-lg leading-relaxed text-gray-200">
              At BoxUp Luxury Gifting, we are committed to delivering a luxurious and thoughtful gifting experience, where every detail is
              meticulously crafted to reflect the emotion of the individual giving a{' '}
              <span className="underline underline-offset-2">gifts</span> and the sophistication of our brand.
            </p>
          </div>
          
          {/* BoxUp Logo */}
          <div className="flex-shrink-0 lg:ml-8 flex items-center lg:items-center justify-center lg:justify-end">
            <div className="text-right text-white">
              <img src="https://www.boxupgifting.com/cdn/shop/files/footer.svg?v=1736756869" alt="BoxUp Logo" className="inline-block h-24 w-auto" />
            </div>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="space-y-8 mb-16">
          {/* Shop by Recipient */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Shop by Recipient</h3>
            <div className="flex flex-wrap items-center gap-1 text-sm text-gray-300">
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Women</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Men</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Husband</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Wife</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Boyfriend</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Girlfriend</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Parents</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Couple</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Moms to be</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Kids</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Baby Gifts</a>
            </div>
          </div>

          {/* Shop by Occasion */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Shop by Occasion</h3>
            <div className="flex flex-wrap items-center gap-1 text-sm text-gray-300">
              <a href="#" className="hover:text-white hover:underline transition-colors">Father's Day Gifts</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Thank You</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Birthday Gifts</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Anniversary Gifts</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Housewarming Gifts</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Get Well Soon Gifts</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Celebrations Gift Box</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for New Born Baby</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Self Care Hampers</a>
            </div>
          </div>

          {/* Shop By Interest */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Shop By Interest</h3>
            <div className="flex flex-wrap items-center gap-1 text-sm text-gray-300">
              <a href="#" className="hover:text-white hover:underline transition-colors">Love Gifts</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Dry Fruits Gifts</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Food Hampers</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Coffee Lovers</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Chocolate Gift Boxes</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Fitness Freaks</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Eco-friendly Gifts</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts for Colleagues</a>
            </div>
          </div>

          {/* By Price */}
          <div>
            <h3 className="text-lg font-semibold mb-3">By Price</h3>
            <div className="flex flex-wrap items-center gap-1 text-sm text-gray-300">
              <a href="#" className="hover:text-white hover:underline transition-colors">Gifts Under Rs 999</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Rs 1000 to Rs 2000</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Rs 2000 to Rs 3000</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">Above Rs 3000+</a>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-300">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ready To Ship Gifts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate Gifting</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Anniversary Gifts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-300">Help</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Become a Vendor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Return and Refund Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Make Your Own Hamper</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-300">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Join Our Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-300">Stay In Touch</h4>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="Enter please your e-mail"
                    className="w-full bg-white text-black pl-10 pr-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-3 pt-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Payment Icons */}
            <div className="flex flex-wrap justify-center items-center gap-2">
              {/* Paytm */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="text-blue-600 font-bold text-xs">Paytm</div>
              </div>
              
              {/* Amazon Pay */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="text-orange-500 font-bold text-xs">a</div>
              </div>
              
              {/* Google Pay */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="text-blue-500 font-bold text-xs">G Pay</div>
              </div>
              
              {/* PhonePe */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="text-purple-600 font-bold text-xs">Pe</div>
              </div>
              
              {/* Mastercard */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Mobikwik */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="text-blue-600 font-bold text-xs">M</div>
              </div>
              
              {/* Wallet */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="text-green-600 font-bold text-xs">W</div>
              </div>
              
              {/* RuPay */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="text-orange-600 font-bold text-xs">RuPay</div>
              </div>
              
              {/* PayPal */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="text-blue-600 font-bold text-xs">PayPal</div>
              </div>
              
              {/* UPI */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="text-orange-600 font-bold text-xs">UPI</div>
              </div>
              
              {/* Visa */}
              <div className="bg-white rounded-md p-2 w-12 h-8 flex items-center justify-center">
                <div className="text-blue-600 font-bold text-xs">VISA</div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="text-center text-sm text-gray-400">
              <p className="mb-1">
                10:00am - 6:00pm IST, Monday - Saturday | +91-9663939371 | info@boxupgifting.com
              </p>
              <p>© 2025, BoxUp Luxury Gifting</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;