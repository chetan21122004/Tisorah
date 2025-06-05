# Tisorah - Corporate Gifting Platform

This project is a corporate gifting platform built with Next.js and Supabase.

## Supabase Integration

The application uses Supabase as its database backend. The following tables have been set up:

1. `products` - Stores all product information
2. `quote_requests` - Stores user quote requests along with their shortlisted products

### Database Structure

#### Products Table
```sql
products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  long_description TEXT,
  moq INTEGER NOT NULL DEFAULT 1,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  customizable BOOLEAN DEFAULT FALSE,
  in_stock BOOLEAN DEFAULT TRUE,
  features JSONB,
  specifications JSONB,
  benefits TEXT[],
  images TEXT[],
  discount VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
)
```

#### Quote Requests Table
```sql
quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255) NOT NULL,
  message TEXT,
  budget VARCHAR(100),
  timeline VARCHAR(100),
  event_type VARCHAR(100),
  customization BOOLEAN DEFAULT FALSE,
  branding BOOLEAN DEFAULT FALSE,
  packaging BOOLEAN DEFAULT FALSE,
  shortlisted_products JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
)
```

## User Flow

1. Users browse products on the website
2. They can add products to their shortlist (stored in localStorage)
3. After shortlisting products, users can fill out a quote request form
4. When submitted, the form data and shortlisted products are stored in the Supabase database

## Key Files

- `lib/supabase.ts` - Supabase client setup and API functions
- `lib/shortlist.ts` - Functions to manage the shortlist in localStorage
- `types/supabase.ts` - TypeScript types for the Supabase database
- `app/quote/page.tsx` - Quote request form
- `app/shortlist/page.tsx` - Shortlist management page
- `app/admin/page.tsx` - Simple admin page to view quote requests

## Supabase Connection Details

- URL: `https://mobgvuggkfjinwftjrzo.supabase.co`
- Project ID: `mobgvuggkfjinwftjrzo`

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Access

To view submitted quote requests, navigate to `/admin` after starting the server.

## Future Enhancements

1. Add authentication for admin access
2. Create a more comprehensive admin panel for product management
3. Implement email notifications for new quote requests
4. Add status management for quote requests (pending, approved, completed, etc.)
5. Implement product filtering and search functionality 