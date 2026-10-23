import Image from "next/image";

export function ValueSection() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 overflow-x-clip lg:min-h-screen lg:grid-cols-2"
    >
      <div className="relative h-[42svh] min-h-[240px] lg:h-auto lg:min-h-full">
        <Image
          src="/images/sections/park-community.png"
          alt="People relaxing together in a park"
          fill
          className="object-cover object-[center_40%]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="page-x flex min-h-[58svh] flex-col justify-between bg-cream py-8 text-chocolate lg:min-h-full lg:py-16 xl:py-20">
        <h2 className="font-playfair text-[clamp(1.85rem,8.4vw,2.55rem)] font-normal uppercase leading-[0.92] tracking-[-0.045em] lg:text-[clamp(2.1rem,4.5vw,64px)] lg:leading-[0.9]">
          <span className="block lg:hidden">
            A <span className="italic">city</span> can feel like a
          </span>
          <span className="block lg:hidden">
            <span className="italic">village</span> again
          </span>
          <span className="hidden whitespace-nowrap lg:block">
            A <span className="italic">city</span> can feel like
          </span>
          <span className="hidden whitespace-nowrap lg:block">
            a <span className="italic">village</span> again
          </span>
        </h2>

        <div className="my-10 flex items-center justify-between gap-3 font-inter text-[11px] uppercase tracking-[0.12em] text-chocolate sm:text-[12px] lg:my-0 lg:text-[13px] lg:tracking-[0.08em]">
          <span>Shared interests</span>
          <span aria-hidden>/</span>
          <span>Stronger communities</span>
        </div>

        <p className="max-w-[34rem] font-inter text-[15px] leading-[1.35] text-chocolate lg:hidden">
          Your neighborhood is full of people doing interesting things, places
          waiting to be discovered and initiatives bringing others together
        </p>
        <p className="hidden max-w-[34rem] font-inter text-[16px] leading-[1.1] text-chocolate sm:text-[18px] lg:block">
          We live closer together than ever, yet many of us feel more disconnected
          than before. NeighbrVille helps you get involved, connect and belong –
          right where you live. One shared experience can make a neighborhood
          feel like a community!
        </p>
      </div>
    </section>
  );
}
