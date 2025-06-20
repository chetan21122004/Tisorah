"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    budget: "",
    giftsNeeded: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Thank you for your message! We'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: "",
      companyName: "",
      phoneNumber: "",
      email: "",
      budget: "",
      giftsNeeded: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-edu-cursive md:text-6xl font-light text-gray-800 mb-6 tracking-tight">
            Let's Talk
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-light tracking-wide">
            WE CAN'T WAIT TO HEAR ABOUT YOUR NEXT PROJECT
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 text-lg leading-relaxed">
              Fill out the form below to request a custom gift design. Have a general question or just want to say hello? Email our team at{" "}
              <a 
                href="mailto:email@sdfsdf.com" 
                className="text-gray-800 hover:text-gray-600 transition-colors underline decoration-gray-300 hover:decoration-gray-500"
              >
                email@sdfsdf.com
              </a>
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* First Row */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 block">
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="h-12 pl-10 bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium text-gray-700 block">
                  Company Name
                </label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 pl-10 bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Third Row */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium text-gray-700 block">
                  Approximate Budget Per Hamper
                </label>
                <Input
                  id="budget"
                  name="budget"
                  type="text"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-lg"
                  placeholder="e.g., $50-100"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="giftsNeeded" className="text-sm font-medium text-gray-700 block">
                  Estimated Number of Gifts Needed
                </label>
                <Input
                  id="giftsNeeded"
                  name="giftsNeeded"
                  type="number"
                  value={formData.giftsNeeded}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-lg"
                  placeholder="e.g., 50"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 block">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-lg resize-none"
                placeholder="Tell us about your project, special requirements, or any questions you have..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-white px-12 py-3 rounded-lg text-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            We typically respond within 24 hours during business days
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm; 