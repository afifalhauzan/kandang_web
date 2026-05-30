import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type AppLayoutProps = {
    children: ReactNode;
    className?: string;
};

export default function AppLayout({ children, className }: AppLayoutProps) {
    return <div className={cn("min-h-screen bg-background text-foreground", className)}>{children}</div>;
}
