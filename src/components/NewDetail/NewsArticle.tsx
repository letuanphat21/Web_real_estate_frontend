import type { News } from "../../types/news.types";
import NewsShareBar from "./NewsShareBar";

interface NewsArticleProps {
  news: News;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";

export default function NewsArticle({ news }: NewsArticleProps) {
  const [cover, ...gallery] = news.images;

  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white">
      {/* Ảnh bìa */}
      <figure className="aspect-[16/9] overflow-hidden">
        <img
          src={cover?.imageUrl || FALLBACK_IMAGE}
          alt={cover?.title || news.title}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="p-6 md:p-10">
        {/* Nội dung: whitespace-pre-line để giữ xuống dòng từ DB */}
        <div className="whitespace-pre-line text-base leading-8 text-heading md:text-lg">
          {news.content}
        </div>

        {/* Các ảnh còn lại trong new_images */}
        {gallery.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {gallery.map((image) => (
              <figure
                key={image.id}
                className="overflow-hidden rounded-2xl bg-primary-50"
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                {image.title && (
                  <figcaption className="px-4 py-2.5 text-center text-xs text-body">
                    {image.title}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        <div className="mt-10 border-t border-line pt-6">
          <NewsShareBar title={news.title} />
        </div>
      </div>
    </article>
  );
}
