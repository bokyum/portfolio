"use client";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import AsciiBackground from "./AsciiBackground";
import { ascii } from "./ascii";
gsap.registerPlugin(ScrollTrigger);
export default function Container({ children }: { children: ReactNode }) {
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 모바일 회전 이벤트 처리

    const refreshScrollTrigger = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };
    window.scrollTo(0, 0);
    window.addEventListener("orientationchange", refreshScrollTrigger);
    return () => {
      window.removeEventListener("orientationchange", refreshScrollTrigger);
    };
  }, []);

  useGSAP(() => {
    gsap.set(contentRef.current, { autoAlpha: 0, height: "100%" });
    const tl = gsap.timeline();
    tl.to(loadingRef.current, {
      duration: 1,
      color: "transparent",
      autoAlpha: 0,
      display: "none",
    }).to(contentRef.current, {
      duration: 2,
      autoAlpha: 1,
    });
  });

  return (
    <main className="min-h-screen ">
      <div ref={loadingRef}>
        <AsciiBackground
          ascii={ascii}
          height={200}
          width={200}
          blockSize={200}
          refs={bgRefs}
          animate={false}
        />
        <div
          className="fixed text-center text-white z-50"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <p className="mt-4 text-xl font-semibold tracking-wide animate-pulse">
              Loading...
            </p>
          </div>
        </div>
      </div>

      <div
        className="opacity-0 break-all w-screen overflow-x-hidden h-screen"
        ref={contentRef}
      >
        {children}
      </div>
    </main>
  );
}
