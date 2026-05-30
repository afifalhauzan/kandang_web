import { TEH_MBOIS_IMAGES } from "./constants";

export default function TehMboisFooter() {
    return (
        <footer
            id="kontak"
            className="flex flex-col items-center justify-center gap-10 bg-white px-4 py-12 md:flex-row md:items-start md:px-8"
        >
            <div className="max-w-6xl flex w-full justify-between">
                <div className="text-center flex flex-row items-center justify-center gap-6 md:text-left">
                    <a href="/" className="mb-3 inline-flex items-center">
                        <img
                            src={TEH_MBOIS_IMAGES.logo}
                            alt="TehMbois"
                            className="h-16 w-auto object-contain opacity-90 transition-all hover:opacity-100"
                        />
                    </a>
                    <p className="text-md font-heading text-[#3f4945]">Segar, Mbois & Ora Mahal.</p>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 text-center md:items-end md:text-right">
                    <p className="text-xs text-[#8d493c] opacity-80">• 2024 TehMbois Indonesia. Mbois Banget, Segar Terus.</p>
                </div>
            </div>
        </footer>
    );
}
