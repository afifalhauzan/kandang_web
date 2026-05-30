import { Link, usePage } from "@inertiajs/react";
import { IconChevronDown, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import type { InertiaPageProps } from "../types/page-props";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AuthButton() {
    const { auth } = usePage<InertiaPageProps>().props;
    const userName = auth?.user?.name ?? "Akun";
    const userRole = auth?.user?.role ?? "unknown";
    const roleLabel = String(userRole).toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white">
                        <IconUser size={14} />
                    </div>
                    <span className="hidden sm:inline">{userName}</span>
                    <IconChevronDown size={14} className="text-white/60" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>
                    <p className="text-sm font-semibold">{userName}</p>
                    <p className="text-xs font-normal text-muted-foreground">Role: {roleLabel}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/pengaturan-bisnis" className="flex items-center gap-2">
                        <IconSettings size={16} />
                        Pengaturan Bisnis
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center gap-2">
                        <IconUser size={16} />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/logout" method="post" as="button" className="flex w-full items-center gap-2 text-destructive">
                        <IconLogout size={16} />
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
