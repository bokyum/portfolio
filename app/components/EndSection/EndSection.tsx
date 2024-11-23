"use clinet";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateSplitText } from "../animations";
import { FaGithub } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);

export default function EndSection() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const titleRef = React.useRef<HTMLSpanElement | null>(null);
  const descriptionRef = React.useRef<HTMLParagraphElement | null>(null);
  const aRef = React.useRef<HTMLAnchorElement | null>(null);

  useGSAP(() => {
    const linkAnimation = gsap.timeline();
    linkAnimation.from(aRef.current, { opacity: 0, scale: 0.5 });

    const tl = gsap.timeline();
    tl.add(animateSplitText(titleRef, { duration: 1, y: -30 }), 0)
      .add(animateSplitText(descriptionRef, { duration: 0.5, y: 30 }), 0)
      .add(linkAnimation, 0);

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom 20%",
      animation: tl,
      markers: true,
      toggleActions: "restart reverse restart reverse",
    });
  });

  return (
    <section
      ref={containerRef}
      className=" w-screen h-screen bg-gradient-to-b from-slate-900 via-black to-slate-900 flex items-center justify-center flex-col gap-6 overflow-hidden"
    >
      <div className="relative z-10 text-center">
        <span
          ref={titleRef}
          className="text-5xl sm:text-7xl lg:text-9xl font-extrabold text-white"
        >
          End
        </span>
        <p
          ref={descriptionRef}
          className="mt-4 text-gray-400 text-lg sm:text-2xl"
        >
          Thanks for visiting. See you next time!
        </p>
      </div>

      <a
        ref={aRef}
        href="https://github.com/bokyum"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center gap-3 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white text-lg rounded-lg shadow-lg "
      >
        <FaGithub size={24} />
        Visit My GitHub
      </a>
    </section>
  );
}