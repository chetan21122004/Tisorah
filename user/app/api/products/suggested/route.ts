import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get("limit") || "4")

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    // Fetch random products from the products table
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .limit(limit)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching suggested products:", error)
    return NextResponse.json({ error: "Failed to fetch suggested products" }, { status: 500 })
  }
} 