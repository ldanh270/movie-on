"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FeedbackService } from "@/services/feedback.service"
import { Loader2, CheckCircle2, XCircle, User, Mail, MessageSquare, FileText } from "lucide-react"
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

            setTimeout(() => {
                setFormData({
                    sender: "",
                    email: "",
                    title: "",
                    description: "",
                })
                setStatus("idle")
            }, 3000)
        } catch (error) {
            setStatus("error")
            console.error("Error submitting feedback:", error)

            setTimeout(() => {
                setStatus("idle")
            }, 5000)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="sender" className="flex items-center gap-2 text-sm font-medium select-none">
                            <User className="h-4 w-4 text-primary" />
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
                            className="h-12 transition-all focus-visible:ring-primary/20"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium select-none">
                            <Mail className="h-4 w-4 text-primary" />
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
                            className="h-12 transition-all focus-visible:ring-primary/20"
                        />
                    </div>
                </div>

                {/* Feedback Field */}
                <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium select-none">
                        <MessageSquare className="h-4 w-4 text-primary" />
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
                        className="h-12 transition-all focus-visible:ring-primary/20"
                    />
                </div>

                {/* Details Field */}
                <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium select-none">
                        <FileText className="h-4 w-4 text-primary" />
                        Message (Optional)
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Tell us more..."
                        value={formData.description}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="min-h-[140px] resize-none transition-all focus-visible:ring-primary/20"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] select-none"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                        </>
                    )}
                </Button>
            </form>

            {/* Status Messages */}
            {status === "success" && (
                <div className="animate-in fade-in-0 slide-in-from-bottom-4 flex items-start gap-3 rounded-xl border border-green-500/50 bg-gradient-to-br from-green-500/10 to-green-500/5 p-4 shadow-sm select-none">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="font-semibold text-green-900 dark:text-green-100">
                            Message sent successfully!
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Thanks for reaching out. We&apos;ll get back to you soon.
                        </p>
                    </div>
                </div>
            )}

            {status === "error" && (
                <div className="animate-in fade-in-0 slide-in-from-bottom-4 flex items-start gap-3 rounded-xl border border-red-500/50 bg-gradient-to-br from-red-500/10 to-red-500/5 p-4 shadow-sm select-none">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="font-semibold text-red-900 dark:text-red-100">
                            Oops! Something went wrong
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Please try again or email us directly.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
