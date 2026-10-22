import Image from "next/image";

export function ValueSection() {
  return (
    <section
      id="about"
      className="grid min-h-dvh grid-cols-1 overflow-x-clip lg:min-h-screen lg:grid-cols-2"
    >
      <div className="relative min-h-[50vh] lg:min-h-full">
        <Image
          src="/images/sections/park-community.png"
          alt="People relaxing together in a park"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="page-x flex flex-col justify-between bg-cream py-12 text-chocolate lg:py-16 xl:py-20">
        <h2 className="font-playfair text-[clamp(2.1rem,4.5vw,64px)] font-normal uppercase leading-[0.9] tracking-[-0.045em]">
          <span className="block sm:whitespace-nowrap">
            A <span className="italic">city</span> can feel like
          </span>
          <span className="block sm:whitespace-nowrap">
            a <span className="italic">village</span> again
          </span>
        </h2>

        <div className="my-12 flex items-center justify-between gap-4 font-inter text-[11px] uppercase tracking-[0.08em] text-chocolate sm:text-[12px] lg:my-0 lg:text-[13px]">
          <span>Shared interests</span>
          <span aria-hidden>/</span>
          <span>Stronger communities</span>
        </div>

        <p className="max-w-[34rem] font-inter text-[16px] leading-[1.1] text-chocolate sm:text-[18px]">
          We live closer together than ever, yet many of us feel more disconnected
          than before. NeighbrVille helps you get involved, connect and belong –
          right where you live. One shared experience can make a neighborhood
          feel like a community!
        </p>
      </div>
    </section>
  );
}
