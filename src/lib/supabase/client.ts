import { Database } from "@/types/database"

import { createClient } from "@supabase/supabase-js"

/**
 * Supabase Client
 *
 * SOLID Principles:
 * - Single Responsibility: Chỉ quản lý connection đến Supabase
 * - Dependency Inversion: Export abstraction, không expose implementation details
 *
 * Note: Sử dụng credentials từ .env file
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables. Please check your .env file.")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
})

// Log để verify connection (chỉ dùng trong development)
if (process.env.NODE_ENV === "development") {
    console.log("✅ Supabase connected:", supabaseUrl)
}
