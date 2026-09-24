/**
 * Webhooky push helper — https://api.webhooky.app/YOUR_KEY
 * Set WEBHOOKY_URL to the full endpoint URL (treat like a password).
 */

export type WebhookyPayload = {
  title?: string;
  message?: string;
  sound?: string;
  vibrate?: boolean;
};

export type WebhookyResult =
  | { ok: true; delivered: number; raw: unknown }
  | { ok: false; skipped?: boolean; error: string; raw?: unknown };

function getEndpoint(): string | null {
  const url = process.env.WEBHOOKY_URL?.trim();
  if (!url) return null;
  return url.replace(/\/$/, "");
}

export async function sendWebhooky(
  payload: WebhookyPayload
): Promise<WebhookyResult> {
  const endpoint = getEndpoint();
  if (!endpoint) {
    return {
      ok: false,
      skipped: true,
      error: "WEBHOOKY_URL is not configured",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const raw = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        error: `Webhooky HTTP ${response.status}`,
        raw,
      };
    }

    const success =
      raw && typeof raw === "object" && "success" in raw
        ? Boolean((raw as { success?: boolean }).success)
        : true;
    const delivered =
      raw && typeof raw === "object" && "delivered" in raw
        ? Number((raw as { delivered?: number }).delivered) || 0
        : 1;

    if (!success) {
      const reason =
        raw && typeof raw === "object" && "reason" in raw
          ? String((raw as { reason?: string }).reason)
          : "not_delivered";
      return { ok: false, error: reason, raw };
    }

    return { ok: true, delivered, raw };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Webhooky request failed";
    return { ok: false, error: message };
  }
}
