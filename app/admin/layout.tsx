import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Login - Huawei HG8245H",
  description: "Optical Network Terminal Web Management Page",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
