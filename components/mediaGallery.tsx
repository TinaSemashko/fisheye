"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type MediaItem = {
  id: number;
  title: string;
  image?: string | null;
  video?: string | null;
  likes: number;
  date: string;
};

type SortOption = "popularity" | "date" | "title";

type Props = {
  medias: MediaItem[];
};

const MediaGallery = ({ medias }: Props) => {
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [likesById, setLikesById] = useState<Record<number, number>>(() =>
    Object.fromEntries(medias.map((media) => [media.id, media.likes]))
  );
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleLike = (mediaId: number) => {
    const alreadyLiked = likedIds.has(mediaId);

    setLikesById((prev) => ({
      ...prev,
      [mediaId]: prev[mediaId] + (alreadyLiked ? -1 : 1),
    }));

    setLikedIds((prev) => {
      const next = new Set(prev);
      if (alreadyLiked) {
        next.delete(mediaId);
      } else {
        next.add(mediaId);
      }
      return next;
    });
  };

  const sortedMedias = useMemo(() => {
    const withCurrentLikes = medias.map((media) => ({
      ...media,
      likes: likesById[media.id],
    }));

    switch (sortBy) {
      case "popularity":
        return withCurrentLikes.sort((a, b) => b.likes - a.likes);
      case "date":
        return withCurrentLikes.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "title":
        return withCurrentLikes.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return withCurrentLikes;
    }
  }, [medias, sortBy, likesById]);

  const totalLikes = Object.values(likesById).reduce((sum, n) => sum + n, 0);

  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + sortedMedias.length) % sortedMedias.length;
    });
  };

  const showNext = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % sortedMedias.length;
    });
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, sortedMedias.length]);

  const activeMedia = lightboxIndex !== null ? sortedMedias[lightboxIndex] : null;

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-6">
        <p className="text-gray-500 m-0">
          Total : <span className="font-bold text-[#901C1C]">{totalLikes} ♥</span>
        </p>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-gray-500">
            Trier par
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="border border-[#e7ded3] rounded-lg px-3 py-2 bg-white"
          >
            <option value="popularity">Popularité</option>
            <option value="date">Date</option>
            <option value="title">Titre</option>
          </select>
        </div>
      </div>

      <ul className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMedias.map((media, index) => {
          const isLiked = likedIds.has(media.id);
          return (
            <li key={media.id}>
              <figure className="m-0">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="block w-full p-0 border-0 bg-transparent cursor-pointer text-left"
                  aria-label={`Ouvrir ${media.title} en grand`}
                >
                  {media.video ? (
                    <video
                      src={`/${media.video}`}
                      className="w-full h-56 object-cover rounded-lg"
                      muted
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={`/${media.image}`}
                      alt={media.title}
                      width={400}
                      height={280}
                      className="w-full h-56 object-cover rounded-lg"
                    />
                  )}
                </button>
                <figcaption className="flex items-center justify-between mt-2">
                  <span className="font-semibold">{media.title}</span>
                  <button
                    type="button"
                    onClick={() => handleLike(media.id)}
                    aria-pressed={isLiked}
                    aria-label={`${isLiked ? "Retirer le like de" : "Liker"} la photo ${media.title}, ${media.likes} likes actuellement`}
                    className={`flex items-center gap-1 hover:text-[#901C1C] ${
                      isLiked ? "text-[#901C1C] font-semibold" : "text-gray-500"
                    }`}
                  >
                    {media.likes} ♥
                  </button>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      {activeMedia && (
        <div
          role="dialog"
          aria-label="image closeup view"
          aria-modal="true"
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-6"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close dialog"
            className="absolute top-6 right-6 text-white text-3xl leading-none"
          >
            ✕
          </button>

          <button
            type="button"
            onClick={showPrev}
            aria-label="Previous image"
            className="absolute left-6 text-white text-4xl leading-none"
          >
            ‹
          </button>

          <div className="max-w-4xl w-full">
            {activeMedia.video ? (
              <video
                src={`/${activeMedia.video}`}
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded-lg"
              />
            ) : (
              <Image
                src={`/${activeMedia.image}`}
                alt={activeMedia.title}
                width={1200}
                height={800}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            )}
            <p className="text-white text-center mt-4">{activeMedia.title}</p>
          </div>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next image"
            className="absolute right-6 text-white text-4xl leading-none"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
};

export default MediaGallery;