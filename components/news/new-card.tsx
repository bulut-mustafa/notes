import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { NewsItem } from "@/lib/types";

export default function NewsCard({ id, newsItem }: { id: string; newsItem: NewsItem }) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname.includes(id);

  const handleClick = () => {
    router.push(`/news/${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex group rounded-lg gap-4 p-3 text-sm cursor-pointer transition-all border bg-[#fafafa] hover:bg-[#fef6f4] ${
        isActive ? "border-2 border-[#d6c2bc] bg-[#fef6f4]" : "border border-transparent"
      }`}
    >
      {/* Image on the left */}
      <div className="w-24 h-24 flex-shrink-0 relative rounded overflow-hidden bg-gray-100">
        {newsItem.image ? (
          <Image
            src={newsItem.image}
            alt={newsItem.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No image
          </div>
        )}
      </div>

      {/* Content on the right */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <p
          className={`font-semibold text-base truncate ${
            isActive ? "text-[#4b4744]" : "text-[#333]"
          }`}
        >
          {newsItem.title}
        </p>
        <div className="mt-1 text-xs text-gray-500 truncate">
          {newsItem.source} • {formatDate(newsItem.publishedAt)}
        </div>
      </div>
    </div>
  );
}
