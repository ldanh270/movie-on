"use client";

import { LocalStorageService } from "@/services/local-storage.service";
import { useEffect } from "react";

interface SaveToHistoryProps {
  movieId: string;
  title: string;
  slug: string;
  posterUrl?: string | null;
  rating?: number | null;
}

export default function SaveToHistory({
    movieId,
    title,
    slug,
    posterUrl,
    rating,
}: SaveToHistoryProps) {
    useEffect(() => {
        LocalStorageService.addToWatchHistory({
            id: movieId,
            title,
            slug,
            posterUrl: posterUrl || undefined,
            rating,
        });
    }, [movieId, title, slug, posterUrl, rating]);

    return null;
}
