import { problemCards } from "@/components/landing/content";
import { IconAlertTriangle, IconArrowLeft, IconArrowRight, IconClipboardText, IconHistory, IconTrendingUp3 } from "@tabler/icons-react";
import CarouselModule from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const icons = [IconClipboardText, IconAlertTriangle, IconHistory, IconTrendingUp3] as const;
const accentClasses = [
    "bg-stone-200 text-stone-700",
    "bg-rose-100 text-rose-700",
    "bg-amber-100 text-amber-700",
    "bg-emerald-100 text-emerald-700",
] as const;
const Carousel = CarouselModule.default;
type ProblemCarouselControlsProps = {
    next?: () => void;
    previous?: () => void;
};

const carouselResponsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
    },
} as const;

export default function LandingProblemSection() {
    return (
        <section id="masalah" className="bg-[#f1f3ee] px-6 py-15">
            <div className="mx-auto w-full max-w-5xl">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Tantangan harian</p>
                    <h2 className="mt-3 font-[Manrope] text-3xl font-semibold text-slate-900 md:text-4xl">
                        Tantangan operasional peternakan sering terasa kecil per hari, tapi besar dampaknya.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                        Bantuan nyata untuk peternak dan pengelola kandang
                    </p>
                </div>

                <Carousel
                    additionalTransfrom={0}
                    autoPlay={true}
                    containerClass="problem-carousel"
                    draggable
                    infinite
                    itemClass="px-2 p-10 pt-3 md:px-3"
                    keyBoardControl
                    minimumTouchDrag={80}
                    partialVisible={false}
                    renderButtonGroupOutside
                    responsive={carouselResponsive}
                    rewind={false}
                    slidesToSlide={1}
                >
                    {problemCards.map((card, index) => {
                        const Icon = icons[index];

                        return (
                            <article
                                key={card.title}
                                className="mx-auto min-h-[290px] w-full max-w-sm rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${accentClasses[index]}`}>
                                    <Icon size={22} />
                                </div>
                                <h3 className="font-[Manrope] text-xl font-semibold text-slate-900">{card.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                            </article>
                        );
                    })}
                </Carousel>
            </div>
        </section>
    );
}
