"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FeedbackService } from "@/services/feedback.service"

import { useState } from "react"

import { FileText, Loader2, Mail, MessageSquare, User } from "lucide-react"
import { toast } from "sonner"

export default function FeedbackForm() {
    const [isLoading, setIsLoading] = useState(false)
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

        try {
            await FeedbackService.createFeedback(formData)

            toast.success("Message sent successfully!", {
                description: "Thanks for reaching out. We'll get back to you soon.",
            })

            // Reset form
            setFormData({
                sender: "",
                email: "",
                title: "",
                description: "",
            })
        } catch (error) {
            toast.error("Oops! Something went wrong", {
                description: "Please try again or email us directly.",
            })
            console.error("Error submitting feedback:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
                {/* Name Field */}
                <div className="space-y-2">
                    <Label
                        htmlFor="sender"
                        className="flex items-center gap-2 text-sm font-medium select-none"
                    >
                        <User className="text-primary h-4 w-4" />
                        Name
                    </Label>
                    <Input
                        id="sender"
                        name="sender"
                        type="text"
                        placeholder="John Doe"
                        value={formData.sender}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="focus-visible:ring-primary/20 h-12 transition-all"
                    />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <Label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm font-medium select-none"
                    >
                        <Mail className="text-primary h-4 w-4" />
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="focus-visible:ring-primary/20 h-12 transition-all"
                    />
                </div>
            </div>

            {/* Feedback Field */}
            <div className="space-y-2">
                <Label
                    htmlFor="title"
                    className="flex items-center gap-2 text-sm font-medium select-none"
                >
                    <MessageSquare className="text-primary h-4 w-4" />
                    Subject
                </Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="What's on your mind?"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="focus-visible:ring-primary/20 h-12 transition-all"
                />
            </div>

            {/* Details Field */}
            <div className="space-y-2">
                <Label
                    htmlFor="description"
                    className="flex items-center gap-2 text-sm font-medium select-none"
                >
                    <FileText className="text-primary h-4 w-4" />
                    Message (Optional)
                </Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell us more..."
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="focus-visible:ring-primary/20 min-h-[140px] resize-none transition-all"
                />
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                size="lg"
                className="w-full gap-2 transition-all select-none hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>Send Message</>
                )}
            </Button>
        </form>
    )
}
