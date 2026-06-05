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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BorderBeam } from "@/components/ui/border-beam"

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
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.5] dark:bg-gray-50/[.15] dark:hover:bg-gray-50/[.20] "
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
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
            <Button>Add a Comment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0">
            <Card className="relative w-full overflow-hidden">
              <CardHeader>
                <CardTitle>Add a Comment</CardTitle>
                <CardDescription>
                  Share your thoughts about this portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    {submitSuccess && (
                      <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-800 dark:text-green-200">
                        Comment submitted successfully!
                      </div>
                    )}
                    {submitError && (
                      <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-200">
                        {submitError}
                      </div>
                    )}
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="comment">Comment</Label>
                      <Textarea
                        id="comment"
                        placeholder="Enter your comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        rows={4}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false)
                    setSubmitError(null)
                    setSubmitSuccess(false)
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </CardFooter>
              <BorderBeam duration={8} size={100} />
            </Card>
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
