import { Metadata } from "next"
import BulkOrdersPageClient from "./BulkOrdersPageClient"

export const metadata: Metadata = {
  title: 'Bulk Orders | Corporate Gifting Solutions India - Tisorah',
  description: 'Place bulk orders for premium corporate gifts with Tisorah. Customized solutions for large-scale corporate gifting needs. Minimum order quantity 25 units.',
  keywords: 'bulk corporate gifts, wholesale corporate gifts india, bulk order gifts, corporate merchandise bulk',
  alternates: {
    canonical: 'https://tisorahbox.com/bulk-orders',
  }
}

export default function BulkOrdersPage() {
  return <BulkOrdersPageClient />
}
