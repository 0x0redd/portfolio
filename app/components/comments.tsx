"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const modalContentClassName =
  "gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#141414]/85 p-0 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:max-w-[440px] [&>button]:right-4 [&>button]:top-4 [&>button]:flex [&>button]:h-8 [&>button]:w-8 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/10 [&>button]:bg-white/5 [&>button]:text-white/70 [&>button]:opacity-100 [&>button]:transition-colors hover:[&>button]:bg-white/10 hover:[&>button]:text-white"

const fieldClassName =
  "border-white/10 bg-white/[0.04] text-white placeholder:text-white/35 focus-visible:ring-white/20"

interface Review {
  name: string
  comment: string
}

// Generate a simple avatar URL from name
const getAvatarUrl = (name: string) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&size=128`
}

// Generate username from name
const getUsername = (name: string) => {
  return `@${name.toLowerCase().replace(/\s+/g, "")}`
}

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "group relative h-full w-80 cursor-pointer overflow-hidden rounded-sm border border-white/10 p-4",
        "bg-[#141414]/40 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-md",
        "transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#e5fdfd]/10 via-white/[0.04] to-purple-500/5 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-white/[0.02]"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex flex-row items-center gap-2">
          <img
            className="rounded-full ring-1 ring-white/15"
            width="32"
            height="32"
            alt=""
            src={img}
          />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium text-white/45">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm leading-relaxed text-white/75">
          {body}
        </blockquote>
      </div>
    </figure>
  )
}

export function MarqueeDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/review")
        const data = await response.json()
        
        if (response.ok && data.testimonials) {
          setReviews(data.testimonials)
        } else {
          console.error("Failed to fetch reviews:", data.error)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, comment }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitSuccess(true)
        // Reset form
        setName("")
        setComment("")
        // Refresh reviews
        const refreshResponse = await fetch("/api/review")
        const refreshData = await refreshResponse.json()
        if (refreshResponse.ok && refreshData.testimonials) {
          setReviews(refreshData.testimonials)
        }
        // Close modal after a short delay
        setTimeout(() => {
          setIsOpen(false)
          setSubmitSuccess(false)
        }, 1500)
      } else {
        setSubmitError(data.error || "Failed to submit comment")
      }
    } catch (error) {
      setSubmitError("An error occurred while submitting your comment")
      console.error("Error submitting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Convert reviews to display format
  const displayReviews = reviews.map((review) => ({
    name: review.name,
    username: getUsername(review.name),
    body: review.comment,
    img: getAvatarUrl(review.name),
  }))

  const firstRow = displayReviews.slice(0, Math.ceil(displayReviews.length / 2))
  const secondRow = displayReviews.slice(Math.ceil(displayReviews.length / 2))

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden ">
      <div className="mb-5 flex w-full flex-col items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-center">
          The Word on the Streets
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center max-w-2xl">
          What fellow photographers and creatives are saying
        </p>  
      </div>
      <div className="mb-8 flex w-full justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full border border-white/10 bg-white/5 px-6 text-white backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10">
              Add a Comment
            </Button>
          </DialogTrigger>
          <DialogContent
            overlayClassName="bg-black/50 backdrop-blur-md"
            className={modalContentClassName}
          >
            <DialogHeader className="space-y-2 border-b border-white/10 px-6 py-6 text-left">
              <DialogTitle className="text-2xl font-semibold tracking-tight text-white">
                Add a Comment
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-white/50">
                Share your thoughts about this portfolio.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="grid w-full gap-4 px-6 py-5">
                {submitSuccess && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                    Comment submitted successfully!
                  </div>
                )}
                {submitError && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                    {submitError}
                  </div>
                )}
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="name" className="text-white/70">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className={fieldClassName}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="comment" className="text-white/70">
                    Comment
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows={4}
                    disabled={isSubmitting}
                    className={cn(fieldClassName, "resize-none")}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-white/10 px-6 py-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false)
                    setSubmitError(null)
                    setSubmitSuccess(false)
                  }}
                  disabled={isSubmitting}
                  className="rounded-full border-white/10 bg-transparent text-white/70 hover:border-white/20 hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full border border-white/10 bg-white text-black hover:bg-white/90"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading reviews...</p>
          </div>
        </div>
      ) : displayReviews.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-muted-foreground">No reviews yet. Be the first to add one!</p>
        </div>
      ) : (
        <>
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review, index) => (
              <ReviewCard key={`${review.username}-${index}`} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review, index) => (
              <ReviewCard key={`${review.username}-${index}`} {...review} />
            ))}
          </Marquee>
        </>
      )}
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 "></div>
    </div>
  )
}
