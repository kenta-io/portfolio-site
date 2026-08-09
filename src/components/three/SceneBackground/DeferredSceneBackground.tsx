"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SceneBackground = dynamic(() =>
  import("./index").then((mod) => mod.SceneBackground),
);

export function DeferredSceneBackground() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const idle =
      "requestIdleCallback" in window
        ? requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 200);
    const cancel =
      "cancelIdleCallback" in window ? cancelIdleCallback : clearTimeout;
    const id = idle(() => setShouldMount(true));
    return () => cancel(id as never);
  }, []);

  if (!shouldMount) return null;
  return <SceneBackground />;
}
