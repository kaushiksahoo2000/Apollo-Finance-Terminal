import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Globe } from "lucide-react"
import Image from "next/image"

interface ArticleCardProps {
  title: string
  publishedDate: string
  site: string
  text?: string
  image?: string
  url: string
}

export function Article(
  { title, publishedDate, site, text, image, url }: ArticleCardProps = {
    title: "Abu Dhabi to Host Inaugural Middle East Blockchain Awards",
    publishedDate: "2022-10-05T15:57:27.000Z",
    site: "Coinjournal",
    text: "Dubai, United Arab Emirates, 5th October, 2022, Chainwire The first edition of the Middle East Blockchain Awards will be held in Abu Dhabi in November 2022, to recognise and reward outstanding efforts within the fields of blockchain and Web 3.0 innovations.",
    image: "",
    url: "https://coinjournal.net/news/abu-dhabi-to-host-inaugural-middle-east-blockchain-awards/",
  }
) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="w-1/4 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        {image && (
          <Image
            src={image}
            alt={title}
            height={200}
            width={400}
            className="h-48 w-full object-cover"
          />
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2 text-xl font-bold">{title}</h3>
        {/* <p className="mb-4 line-clamp-3 text-sm text-gray-600">{text}</p> */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(publishedDate)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">{site}</span>
        </div>
        <Badge
          variant="secondary"
          className="hover:bg-primary hover:text-primary-foreground"
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
          >
            Read More
          </a>
        </Badge>
      </CardFooter>
    </Card>
  )
}
