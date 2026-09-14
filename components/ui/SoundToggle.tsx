"use client";

import { useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isMuted, isMutedOnServer, setMuted, subscribeSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

/** Turns the click sound off and on. The choice is remembered in this browser. */
export function SoundToggle({ className }: { className?: string }) {
  const muted = useSyncExternalStore(subscribeSound, isMuted, isMutedOnServer);
  const Icon = muted ? VolumeX : Volume2;

  return (
    <button
      type="button"
      data-no-sound
      aria-pressed={muted}
      aria-label={muted ? "Turn click sound on" : "Turn click sound off"}
      title={muted ? "Sound off" : "Sound on"}
      onClick={() => setMuted(!muted)}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-ink/5 hover:text-ink",
        className,
      )}
    >
      <Icon size={16} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
