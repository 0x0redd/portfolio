import { cn } from "@/lib/utils";

export function AboutShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "about-ios min-h-screen bg-ios-bg text-ios-label",
        className
      )}
    >
      {children}
    </div>
  );
}

export function IosCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-ios-card p-5 shadow-ios md:rounded-3xl md:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function IosSectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mb-4 text-xl font-semibold tracking-tight text-ios-label md:text-2xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
