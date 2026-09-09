/**
 * VideoController.js
 * Enforces a hard maximum of 3 videos playing simultaneously.
 */

class VideoController {
  constructor() {
    this.playingVideos = []; // Array of video elements
    this.maxConcurrent = 3;
  }

  requestPlay(videoElement) {
    if (this.playingVideos.includes(videoElement)) {
      return; // Already playing or requested
    }

    // If at limit, pause the oldest one
    if (this.playingVideos.length >= this.maxConcurrent) {
      const oldestVideo = this.playingVideos.shift();
      oldestVideo.pause();
    }

    this.playingVideos.push(videoElement);
    
    // Play the new video and catch promise rejection
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Handle rejection silently, remove from playing array
        this.unregister(videoElement);
      });
    }
  }

  unregister(videoElement) {
    this.playingVideos = this.playingVideos.filter(v => v !== videoElement);
    if (!videoElement.paused) {
      videoElement.pause();
    }
  }
}

export const videoController = typeof window !== 'undefined' ? new VideoController() : null;
