export interface YouTubePlayerVars {
    autoplay?: 0 | 1
    modestbranding?: 0 | 1
    rel?: 0 | 1
    start?: number
    controls?: 0 | 1
    fs?: 0 | 1
    playsinline?: 0 | 1
}

export interface YouTubePlayerEvents {
    onReady?: (event: YouTubePlayerReadyEvent) => void
    onStateChange?: (event: YouTubePlayerStateChangeEvent) => void
    onError?: (event: YouTubePlayerErrorEvent) => void
}

export interface YouTubePlayerOptions {
    videoId: string
    playerVars?: YouTubePlayerVars
    events?: YouTubePlayerEvents
}

export interface YouTubePlayerReadyEvent {
    target: YouTubePlayer
}

export interface YouTubePlayerStateChangeEvent {
    data: YouTubePlayerState
    target: YouTubePlayer
}

export interface YouTubePlayerErrorEvent {
    data: number
    target: YouTubePlayer
}

export enum YouTubePlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
}

export interface YouTubePlayer {
    destroy: () => void
    getCurrentTime: () => number
    getDuration: () => number
    getPlayerState: () => YouTubePlayerState
    seekTo: (seconds: number, allowSeekAhead: boolean) => void
    playVideo: () => void
    pauseVideo: () => void
    stopVideo: () => void
    mute: () => void
    unMute: () => void
    setVolume: (volume: number) => void
    getVolume: () => number
}

export type YouTubePlayerConstructor = new (
    elementId: string,
    options: YouTubePlayerOptions,
) => YouTubePlayer

export interface YouTubeIframeAPI {
    Player: YouTubePlayerConstructor
    PlayerState: typeof YouTubePlayerState
    loaded?: number
}

declare global {
    interface Window {
        YT?: YouTubeIframeAPI
        onYouTubeIframeAPIReady?: () => void
    }
}
