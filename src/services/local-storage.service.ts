/**
 * LocalStorageService
 * SOLID Principles:
 * - Single Responsibility: Chỉ quản lý localStorage operations
 */

export interface WatchHistoryItem {
    id: string
    title: string
    slug: string
    posterUrl?: string
    rating?: number | null
    watchedAt: string
}

export interface WatchLaterItem {
    id: string
    title: string
    slug: string
    posterUrl?: string
    rating?: number | null
    savedAt: string
}

const WATCH_HISTORY_KEY = "movieon_watch_history"
const WATCH_LATER_KEY = "movieon_watch_later"

export class LocalStorageService {
    // Watch History Methods
    static getWatchHistory(): WatchHistoryItem[] {
        if (typeof window === "undefined") return []
        try {
            // ĐÂY LÀ localStorage của BROWSER
            const data = localStorage.getItem(WATCH_HISTORY_KEY)
            return data ? JSON.parse(data) : []
        } catch (error) {
            console.error("Error getting watch history:", error)
            return []
        }
    }

    static addToWatchHistory(item: Omit<WatchHistoryItem, "watchedAt">) {
        if (typeof window === "undefined") return

        try {
            const history = this.getWatchHistory()
            const filtered = history.filter((h) => h.id !== item.id)
            const newHistory = [{ ...item, watchedAt: new Date().toISOString() }, ...filtered]
            const limited = newHistory.slice(0, 50)
            // LƯU VÀO localStorage của BROWSER
            localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(limited))
        } catch (error) {
            console.error("Error adding to watch history:", error)
        }
    }

    static removeFromWatchHistory(id: string) {
        if (typeof window === "undefined") return

        try {
            const history = this.getWatchHistory()
            const filtered = history.filter((h) => h.id !== id)
            localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(filtered))
        } catch (error) {
            console.error("Error removing from watch history:", error)
        }
    }

    static clearWatchHistory() {
        if (typeof window === "undefined") return
        localStorage.removeItem(WATCH_HISTORY_KEY)
    }

    // Watch Later Methods
    static getWatchLater(): WatchLaterItem[] {
        if (typeof window === "undefined") return []
        try {
            const data = localStorage.getItem(WATCH_LATER_KEY)
            return data ? JSON.parse(data) : []
        } catch (error) {
            console.error("Error getting watch later:", error)
            return []
        }
    }

    static addToWatchLater(item: Omit<WatchLaterItem, "savedAt">) {
        if (typeof window === "undefined") return false

        try {
            const watchLater = this.getWatchLater()
            if (watchLater.some((w) => w.id === item.id)) {
                return false
            }
            const newWatchLater = [{ ...item, savedAt: new Date().toISOString() }, ...watchLater]
            localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(newWatchLater))
            return true
        } catch (error) {
            console.error("Error adding to watch later:", error)
            return false
        }
    }

    static removeFromWatchLater(id: string) {
        if (typeof window === "undefined") return

        try {
            const watchLater = this.getWatchLater()
            const filtered = watchLater.filter((w) => w.id !== id)
            localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(filtered))
        } catch (error) {
            console.error("Error removing from watch later:", error)
        }
    }

    static isInWatchLater(id: string): boolean {
        if (typeof window === "undefined") return false
        const watchLater = this.getWatchLater()
        return watchLater.some((w) => w.id === id)
    }

    static clearWatchLater() {
        if (typeof window === "undefined") return
        localStorage.removeItem(WATCH_LATER_KEY)
    }
}
