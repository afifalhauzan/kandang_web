import { Head } from "@inertiajs/react";
import Lenis from "lenis";
import { useEffect } from "react";
import TehMboisFooter from "../components/landing/TehMboisFooter";
import TehMboisTopNav from "../components/landing/TehMboisTopNav";
import OutletExperienceSection from "../components/landing/outlet/OutletExperienceSection";
import OutletHeroSection from "../components/landing/outlet/OutletHeroSection";
import OutletVisitSection from "../components/landing/outlet/OutletVisitSection";
import AppLayout from "../layouts/AppLayout";

export default function OutletPage() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.9,
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        let rafId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = window.requestAnimationFrame(raf);
        };
        rafId = window.requestAnimationFrame(raf);

        const handleAnchorClick = (event: Event) => {
            const target = event.target as HTMLElement | null;
            const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;

            if (!anchor) {
                return;
            }

            const hash = anchor.getAttribute("href");
            if (!hash) {
                return;
            }

            if (hash === "#") {
                event.preventDefault();
                lenis.scrollTo(0, { duration: 0.8 });
                return;
            }

            const element = document.querySelector(hash) as HTMLElement | null;
            if (!element) {
                return;
            }

            event.preventDefault();
            lenis.scrollTo(element, { offset: -72, duration: 0.9 });
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            document.removeEventListener("click", handleAnchorClick);
            window.cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return (
        <AppLayout className="bg-[#f7faf7] text-[#181c1b]">
            <Head title="Outlet TehMbois" />
            <div className="font-plus-jakarta bg-[#f7faf7] text-[#181c1b]">
                <TehMboisTopNav />

                <main id="outlet">
                    <OutletHeroSection />
                    <OutletExperienceSection />
                    <OutletVisitSection />
                </main>

                <TehMboisFooter />
            </div>
        </AppLayout>
    );
}
