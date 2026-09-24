"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const FAIL_MESSAGES = [
  "Login failed. Username or password is incorrect.",
  "Error 401: Nice try.",
  "Access denied.",
  "Wrong password.",
  "Connection timed out… emotionally.",
];

export default function FakeHuaweiAdminPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    window.setTimeout(() => {
      const ok =
        username.trim().toLowerCase() === "admin" &&
        password === "admin";

      if (ok) {
        setLoggedIn(true);
        setBusy(false);
        return;
      }

      const next = attempts + 1;
      setAttempts(next);
      setError(FAIL_MESSAGES[Math.min(next - 1, FAIL_MESSAGES.length - 1)]);
      setBusy(false);
      setPassword("");
    }, 650);
  }

  if (loggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#c8c8c8] px-4">
        <p className="select-none text-center text-[clamp(4rem,22vw,12rem)] font-black leading-none tracking-tight text-[#1e4a73]">
          bruh
        </p>
        <button
          type="button"
          onClick={() => {
            setLoggedIn(false);
            setUsername("admin");
            setPassword("admin");
            setError(null);
          }}
          className="mt-8 text-sm text-[#2f5f8f] underline"
        >
          Logout
        </button>
        <Link href="/" className="mt-3 text-sm text-[#555] underline">
          Go home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#c8c8c8] font-sans text-[13px] text-[#222] antialiased">
      <div className="border-b border-[#7a9bb8] bg-gradient-to-b from-[#4a7eaf] to-[#2f5f8f] px-4 py-2 text-white shadow-sm">
        <div className="mx-auto flex max-w-[720px] items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/15 text-[10px] font-bold tracking-tight"
              aria-hidden
            >
              H
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">
                Huawei HG8245H
              </p>
              <p className="text-[11px] text-white/80">
                Optical Network Terminal
              </p>
            </div>
          </div>
          <p className="hidden text-[11px] text-white/75 sm:block">
            Web Management Page
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[420px] px-3">
        <div className="overflow-hidden rounded border border-[#9aa8b5] bg-[#f4f6f8] shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
          <div className="border-b border-[#b8c4d0] bg-gradient-to-b from-[#e8eef4] to-[#d5dee8] px-4 py-2">
            <h1 className="text-sm font-bold text-[#1e4a73]">User Login</h1>
          </div>

          <form onSubmit={onSubmit} className="space-y-3 px-5 py-5">
            <p className="text-[12px] leading-relaxed text-[#555]">
              Please enter the username and password to log in to the device.
            </p>

            <label className="block">
              <span className="mb-1 block text-[12px] text-[#333]">
                Username
              </span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="h-8 w-full rounded-sm border border-[#8fa0b0] bg-white px-2 outline-none focus:border-[#3d6fa0]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[12px] text-[#333]">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="h-8 w-full rounded-sm border border-[#8fa0b0] bg-white px-2 outline-none focus:border-[#3d6fa0]"
              />
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-sm border border-[#e0a8a8] bg-[#fff0f0] px-2 py-1.5 text-[12px] text-[#a32020]"
              >
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setUsername("admin");
                  setPassword("admin");
                  setError(null);
                }}
                className="h-8 min-w-[72px] rounded-sm border border-[#8fa0b0] bg-gradient-to-b from-[#f7f9fb] to-[#d9e1ea] px-3 text-[12px] hover:brightness-105"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={busy}
                className="h-8 min-w-[72px] rounded-sm border border-[#2f5f8f] bg-gradient-to-b from-[#5b8fc0] to-[#3a6ea3] px-3 text-[12px] font-medium text-white disabled:opacity-60"
              >
                {busy ? "…" : "Login"}
              </button>
            </div>
          </form>

          <div className="border-t border-[#cdd6df] bg-[#e9eef3] px-4 py-2 text-[11px] text-[#666]">
            Default account: admin / admin · Firmware V3R017C10S108
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-[#555]">
          Copyright © Huawei Technologies Co., Ltd. 2000–
          {new Date().getFullYear()}. All rights reserved.
        </p>
        <p className="mt-2 text-center text-[11px] text-[#777]">
          (This is a meme. You&apos;re on a portfolio, not a router.){" "}
          <Link href="/" className="text-[#2f5f8f] underline">
            Go home
          </Link>
        </p>
      </div>
    </div>
  );
}
