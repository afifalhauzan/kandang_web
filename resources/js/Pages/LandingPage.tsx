import { Head } from "@inertiajs/react";
import LandingAiSection from "@/components/landing/LandingAiSection";
import LandingBenefitsSection from "@/components/landing/LandingBenefitsSection";
import LandingClosingCtaSection from "@/components/landing/LandingClosingCtaSection";
import LandingDashboardPreviewSection from "@/components/landing/LandingDashboardPreviewSection";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeroSection from "@/components/landing/LandingHeroSection";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingProblemSection from "@/components/landing/LandingProblemSection";
import LandingSolutionSection from "@/components/landing/LandingSolutionSection";

export default function LandingPage() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-[#faf9f8] text-slate-900">
            <Head title="TernakMVP | Kelola Peternakan Lebih Mudah">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="pointer-events-none fixed left-[-120px] top-[260px] h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
            <div className="pointer-events-none fixed right-[-120px] top-[640px] h-80 w-80 rounded-full bg-amber-100/40 blur-3xl" />

            <LandingNavbar />

            <main className="relative" style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                <LandingHeroSection />
                <LandingProblemSection />
                <LandingSolutionSection />
                <LandingAiSection />
                <LandingDashboardPreviewSection />
                <LandingBenefitsSection />
                <LandingClosingCtaSection />
            </main>

            <LandingFooter />
        </div>
    );
}
