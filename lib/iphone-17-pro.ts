/**
 * Best-effort iPhone 17 Pro detection.
 *
 * Apple does not put the model in the User-Agent. Screen size 402×874 @3x is
 * shared with iPhone 16 Pro and iPhone 17. Exact ID needs GPU fingerprinting;
 * when WebGL still returns "Apple GPU" we report a medium-confidence match.
 */

export type IPhone17ProSignals = {
  userAgent?: string | null;
  screenWidth?: number | null;
  screenHeight?: number | null;
  devicePixelRatio?: number | null;
  gpuRenderer?: string | null;
  touchSupport?: boolean | null;
};

export type IPhone17ProDetection = {
  match: boolean;
  confidence: "high" | "medium" | null;
  label: string | null;
  reason: string | null;
};

/** CSS points for iPhone 17 Pro (same as 16 Pro / 17). */
const SCREEN_W = 402;
const SCREEN_H = 874;
const DPR = 3;
const TOLERANCE = 2;

function isIPhoneUa(ua: string): boolean {
  return /iPhone/i.test(ua) && !/iPad/i.test(ua);
}

function screenMatches(
  width?: number | null,
  height?: number | null,
  dpr?: number | null
): boolean {
  if (width == null || height == null || dpr == null) return false;
  const dprOk = Math.abs(dpr - DPR) < 0.15;
  if (!dprOk) return false;

  const portrait =
    Math.abs(width - SCREEN_W) <= TOLERANCE &&
    Math.abs(height - SCREEN_H) <= TOLERANCE;
  const landscape =
    Math.abs(width - SCREEN_H) <= TOLERANCE &&
    Math.abs(height - SCREEN_W) <= TOLERANCE;
  return portrait || landscape;
}

function normalizeGpu(renderer?: string | null): string {
  return (renderer || "").trim().toLowerCase();
}

export function detectIPhone17Pro(
  signals: IPhone17ProSignals
): IPhone17ProDetection {
  const ua = signals.userAgent || "";
  if (!isIPhoneUa(ua)) {
    return { match: false, confidence: null, label: null, reason: null };
  }

  if (signals.touchSupport === false) {
    return { match: false, confidence: null, label: null, reason: null };
  }

  const gpu = normalizeGpu(signals.gpuRenderer);
  const screenOk = screenMatches(
    signals.screenWidth,
    signals.screenHeight,
    signals.devicePixelRatio
  );

  // Explicit chip when Safari still exposes it (older iOS / some WebViews).
  if (/a19\s*pro/.test(gpu)) {
    return {
      match: true,
      confidence: "high",
      label: "iPhone 17 Pro",
      reason: `GPU: ${signals.gpuRenderer}`,
    };
  }

  // Clearly a different chip on the same-size screen → skip.
  if (screenOk && (/a18\s*pro/.test(gpu) || /^apple a18 gpu$/.test(gpu))) {
    return { match: false, confidence: null, label: null, reason: null };
  }
  if (screenOk && /apple a19 gpu/.test(gpu) && !/pro/.test(gpu)) {
    return { match: false, confidence: null, label: null, reason: null };
  }

  // Screen family match (17 Pro / 16 Pro / 17) when GPU is obfuscated.
  if (screenOk) {
    const strict = process.env.WEBHOOKY_IPHONE17_PRO_STRICT === "1";
    if (strict) {
      return { match: false, confidence: null, label: null, reason: null };
    }
    return {
      match: true,
      confidence: "medium",
      label: "iPhone 17 Pro (likely)",
      reason: `Screen ${signals.screenWidth}×${signals.screenHeight}@${signals.devicePixelRatio} (shared with 16 Pro / 17); GPU=${signals.gpuRenderer || "unknown"}`,
    };
  }

  return { match: false, confidence: null, label: null, reason: null };
}
