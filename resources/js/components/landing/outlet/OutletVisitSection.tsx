import { IconArrowNarrowRight, IconClockHour4, IconMapPin } from "@tabler/icons-react";

const MAPS_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.449054106856!2d112.61109671050306!3d-7.952459679200308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e0!3m2!1sid!2sid!4v1779203669083!5m2!1sid!2sid";

const MAPS_EXTERNAL_URL =
    "https://www.google.com/maps/place/Universitas+Brawijaya/@-7.9524597,112.6110967,17z/";

export default function OutletVisitSection() {
    return (
        <section className="overflow-hidden bg-[#f1f4f1] py-20">
            <div className="mx-auto max-w-[1280px] px-4 md:px-8">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div>
                        <div className="group relative h-[350px] w-full overflow-hidden rounded-[2rem] border border-[#bec9c4]/40 shadow-lg">
                            <iframe
                                src={MAPS_EMBED_URL}
                                width="400"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lokasi Outlet TehMbois"
                                className="h-full w-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-8 lg:pl-8">
                        <h2 className="mb-6 text-5xl font-black leading-tight text-[#181c1b]">Siap Nongkrong Bareng TehMbois?</h2>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <a
                                href={MAPS_EXTERNAL_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#096956] px-8 py-5 text-sm font-semibold text-white shadow-md transition-all hover:scale-105"
                            >
                                Buka Google Maps
                            </a>
                            <a
                                href="/#menu"
                                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#6f7975] bg-white px-8 py-5 text-sm font-semibold text-[#181c1b] transition-all hover:bg-[#e0e3e0]"
                            >
                                Lihat Menu
                                <IconArrowNarrowRight size={18} />
                            </a>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white p-6">
                                <div className="mb-3 flex items-center gap-3 text-[#096956]">
                                    <IconMapPin size={18} />
                                    <h4 className="text-sm font-bold">Alamat</h4>
                                </div>
                                <p className="text-sm text-[#181c1b]">
                                    Jl. Veteran No.10-11
                                    <br />
                                    Lowokwaru, Malang
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#bec9c4]/40 bg-white p-6">
                                <div className="mb-3 flex items-center gap-3 text-[#096956]">
                                    <IconClockHour4 size={18} />
                                    <h4 className="text-sm font-bold">Jam Operasional</h4>
                                </div>
                                <p className="text-sm text-[#181c1b]">10.00 - 22.00 WIB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
