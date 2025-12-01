import { supabase } from "@/lib/supabase"

/**
 * FeedbackService
 * SOLID Principles:
 * - Single Responsibility: Chỉ quản lý feedback operations
 * - Dependency Inversion: Phụ thuộc vào Supabase abstraction
 */

export interface CreateFeedbackData {
    sender: string
    email: string
    title: string
    description: string
}

export interface Feedback {
    id: string
    sender: string
    email: string
    title: string
    description: string | null
    created_at: string
}

export class FeedbackService {
    /**
     * Create a new feedback entry
     */
    static async createFeedback(data: CreateFeedbackData) {
        try {
            console.log("Submitting feedback:", data)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: feedback, error } = await (supabase as any)
                .from("feedback")
                .insert({
                    sender: data.sender.trim(),
                    email: data.email.trim().toLowerCase(),
                    title: data.title.trim(),
                    description: data.description.trim() || null,
                })
                .select()
                .single()

            if (error) {
                console.error("Supabase error:", {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code,
                })
                throw new Error(error.message || "Failed to submit feedback")
            }

            console.log("Feedback submitted successfully:", feedback)
            return feedback as Feedback
        } catch (error) {
            console.error("Error in createFeedback:", error)
            throw error
        }
    }

    /**
     * Get all feedback (Admin only)
     */
    static async getAllFeedback() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error } = await (supabase as any)
                .from("feedback")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) {
                console.error("Error fetching feedback:", error)
                throw error
            }

            return (data || []) as Feedback[]
        } catch (error) {
            console.error("Error in getAllFeedback:", error)
            return []
        }
    }

    /**
     * Get feedback by ID
     */
    static async getFeedbackById(id: string) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error } = await (supabase as any)
                .from("feedback")
                .select("*")
                .eq("id", id)
                .single()

            if (error) {
                console.error("Error fetching feedback:", error)
                return null
            }

            return data as Feedback | null
        } catch (error) {
            console.error("Error in getFeedbackById:", error)
            return null
        }
    }
}
