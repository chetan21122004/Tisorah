import { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: 'Contact Us | Corporate Gifting Solutions India - TisorahBox',
  description: 'Get in touch with TisorahBox for premium corporate gifting solutions in India. Call +91 93701 72365 or email hello@tisorahbox.com. Office in Pune, Maharashtra.',
  keywords: 'contact tisorahbox, corporate gifts contact, corporate gifting company pune, premium gifts india contact',
  alternates: {
    canonical: 'https://tisorahbox.com/contact',
  }
}

export default function ContactPage() {
  return <ContactPageClient />
}
