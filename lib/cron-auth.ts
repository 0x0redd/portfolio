import { timingSafeEqual } from "crypto";

/** Vercel Cron sends Authorization: Bearer <CRON_SECRET>. */
export function isAuthorizedCron(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Allow in development only when no secret is set.
    return process.env.NODE_ENV !== "production";
  }

  const header = request.headers.get("authorization") || "";
  const expected = `Bearer ${secret}`;
  if (header.length !== expected.length) return false;

  try {
    return timingSafeEqual(
      Buffer.from(header),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}
