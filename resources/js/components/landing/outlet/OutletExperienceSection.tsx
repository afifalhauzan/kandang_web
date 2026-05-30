const IMAGE_BOOTH =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCpTRCGvgSGqq2xK7yHvDA4az6ly44TFigt0xvD5reYvClSO4ogO5EnY-GQigdlHxVtLklB5N8M1xTfglGLeJ10FJC-T-4yNNCEt_eaJx0fol_STgTsNYAyP6Amjz8hSggGtneltV1Hy7fQv4MFLdPZ3rzXnAvSrXVKEWAj7R9HvyODEqcABiMJCNEU9LmTMKj84FAVUwoa2xwujd8JVGEGz7EnUIrbwD9ubi5fVeB4dIzEdApYJZwd1BmxjTfnnBQ5dKBDm0Uo7qfi";
const IMAGE_BREW =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCoxuad-IawHtdtuj_6_YEcyzwRs90ozyR60lHEbOwGJuQZCvvgYrcC_yNMvWZRzfrPcWM2UD0HmJQeVejJCSa_ETyzkCS4TLdDx8MYnvwtMVMZzkO2nJUh6DCCdHuFrgU8jhO1uBq6rBCCbSArSpZx6YI6rnc0uIXXQ3DiWn6ocb1liFejv0jDb-a5ZS23OTtKY-sa4P7HOzS6IaY_VlpTV80wkIPRn2NKPhMoB_sFnasd88qpwOAvdkkviClx123FmNYi9ecmVVEb";
const IMAGE_SPOT =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBydY_TWOT0w25QaC_RwMo8zWOSjyanZavBIEXCF0jMizA-ec1oJ5IoyOhTMflqlOXRLkmxSubSNWZONsdjaFl3pqJIFQXZlYGdxvNFMt1EWio_LX6WkDnCUcxpYb6r_9uwwh_JyWvgVxjLK7joxLi8afqRVI8LMFfUua9-D67FD3Hzc3SfmPAHUVLXqsQQca5To0jX0gQVP8729C6uiTN_1t2OxuswEeyYf_E8YDxZ9tFkDpm-knft6n0WRef_ZzEIyQDCNY8F3-sz";

export default function OutletExperienceSection() {
    return (
        <section className="mx-auto max-w-[1280px] px-4 py-20 md:px-8">
            <div className="mb-12">
                <h2 className="text-4xl font-bold md:text-5xl">Setiap Sudut Punya Cerita</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="group relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#e6e9e6] lg:col-span-8 lg:row-span-2">
                    <img src={IMAGE_BOOTH} alt="Suasana Booth" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                        <h3 className="mb-2 text-2xl font-bold md:text-3xl">Suasana Booth</h3>
                        <p className="max-w-md text-white/80">
                            Ambience semi-outdoor yang santai dengan material kayu alami, pas buat chill bareng teman.
                        </p>
                    </div>
                </div>

                <div className="group relative min-h-[300px] overflow-hidden rounded-[2rem] bg-[#e6e9e6] lg:col-span-4">
                    <img src={IMAGE_BREW} alt="Proses Penyeduhan" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="mb-2 text-xl font-bold md:text-2xl">Proses Penyeduhan</h3>
                        <p className="text-sm text-white/80">Menghidangkan kesegaran dari daun teh Wonosari pilihan.</p>
                    </div>
                </div>

                <div className="group relative min-h-[300px] overflow-hidden rounded-[2rem] bg-[#e6e9e6] lg:col-span-4">
                    <img src={IMAGE_SPOT} alt="Spot Nongkrong Favorit" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="mb-2 text-xl font-bold md:text-2xl">Spot Favorit</h3>
                        <p className="text-sm text-white/80">Tempat favorit mahasiswa Malang untuk ngobrol atau nugas.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
