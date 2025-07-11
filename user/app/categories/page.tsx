import { Metadata } from "next"
import CategoriesPageClient from "./CategoriesPageClient"

export const metadata: Metadata = {
  title: 'Corporate Gift Categories | Diwali, Events, Recognition & Festival Gifts',
  description: 'Explore corporate gift categories for all occasions - Diwali gifts, employee recognition, events, festivals & onboarding. Premium curated collections for Indian businesses.',
  keywords: 'corporate gift categories, diwali corporate gifts, employee recognition gifts, festival corporate gifts, event gifts, onboarding gifts',
  alternates: {
    canonical: 'https://tisorahbox.com/categories',
  }
}

export default function CategoriesPage() {
  return <CategoriesPageClient />
}
