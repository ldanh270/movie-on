"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FeedbackService } from "@/services/feedback.service"
import { Loader2, Send, CheckCircle2, XCircle } from "lucide-react"
import { useState } from "react"

export default function FeedbackForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
    const [formData, setFormData] = useState({
        sender: "",
        email: "",
        title: "",
        description: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setStatus("idle")

        try {
            await FeedbackService.createFeedback(formData)

            setStatus("success")

            // Reset form after 2 seconds
            setTimeout(() => {
                setFormData({
                    sender: "",
                    email: "",
                    title: "",
                    description: "",
                })
                setStatus("idle")
            }, 2000)
        } catch (error) {
            setStatus("error")
            console.error("Error submitting feedback:", error)

            // Reset error status after 3 seconds
            setTimeout(() => {
                setStatus("idle")
            }, 3000)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-card p-6 md:p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="sender" className="text-sm font-medium">
                            Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="sender"
                            name="sender"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.sender}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="h-11"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="h-11"
                        />
                    </div>
                </div>

                {/* Title Field */}
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                        Feedback <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter your offer"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="h-11"
                    />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                        Details
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe it more detail"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="min-h-[120px] resize-none"
                    />
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full gap-2" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            Send
                        </>
                    )}
                </Button>
            </form>

            {/* Status Messages */}
            {status === "success" && (
                <div className="flex items-center gap-2 rounded-lg border border-green-500 bg-green-500/10 p-4 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="font-medium">Your feedback has been submitted successfully!</p>
                </div>
            )}

            {status === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-700 dark:text-red-400">
                    <XCircle className="h-5 w-5" />
                    <p className="font-medium">Failed to submit feedback. Please try again.</p>
                </div>
            )}
        </div>
    )
}
