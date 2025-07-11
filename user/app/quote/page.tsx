import { Metadata } from "next"
import QuotePageClient from "./QuotePageClient"

export const metadata: Metadata = {
  title: 'Request Corporate Gift Quote | Get Custom Pricing - Tisorah',
  description: 'Get a personalized quote for premium corporate gifts in India. 24-hour response, bulk discounts, custom branding options. Fill our simple form for tailored solutions.',
  keywords: 'corporate gift quote, custom gift pricing, bulk gift quote india, corporate gifting consultation, business gift quotation',
  alternates: {
    canonical: 'https://tisorahbox.com/quote',
  }
}

export default function QuotePage() {
  return <QuotePageClient />
}
