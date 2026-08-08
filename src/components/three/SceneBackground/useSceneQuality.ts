import { useSyncExternalStore } from "react";

const DESKTOP_QUERY = "(min-width: 1024px)";

export type SceneQuality = "full" | "light";

function subscribe(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(DESKTOP_QUERY);
  mediaQuery.addEventListener("change", onChange);

  return () => mediaQuery.removeEventListener("change", onChange);
}

function getQuality(): SceneQuality {
  return window.matchMedia(DESKTOP_QUERY).matches ? "full" : "light";
}

export function useSceneQuality(): SceneQuality {
  return useSyncExternalStore(subscribe, getQuality, () => "light");
}
