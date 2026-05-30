export type AuthUser = {
    id: number;
    name: string;
    email: string;
    role?: "owner" | "kasir" | string | null;
};

export type InertiaPageProps = {
    auth?: {
        user?: AuthUser | null;
    };
};
