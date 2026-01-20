"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Register plugin once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface AnimationConfig {
    selector: string;
    from: gsap.TweenVars;
    to: gsap.TweenVars;
    scrollTrigger?: {
        trigger?: string | Element | null;
        start?: string;
        end?: string;
        once?: boolean;
    };
}

export function useScrollAnimations(
    containerRef: React.RefObject<HTMLElement | null>,
    animations: AnimationConfig[],
    deps: React.DependencyList = []
) {
    const animationsRef = useRef<gsap.core.Tween[]>([]);

    useIsomorphicLayoutEffect(() => {
        if (!containerRef.current) return;

        // Clear any existing animations
        animationsRef.current.forEach(tween => tween.kill());
        animationsRef.current = [];

        // Create GSAP context for proper cleanup
        const ctx = gsap.context(() => {
            animations.forEach((config) => {
                const elements = gsap.utils.toArray(config.selector);

                if (elements.length === 0) return;

                // Set initial state immediately to prevent flash
                gsap.set(elements, config.from);

                const triggerElement = config.scrollTrigger?.trigger || containerRef.current;

                const tween = gsap.to(elements, {
                    ...config.to,
                    scrollTrigger: config.scrollTrigger ? {
                        trigger: triggerElement,
                        start: config.scrollTrigger.start || "top 80%",
                        end: config.scrollTrigger.end || "bottom 20%",
                        toggleActions: config.scrollTrigger.once !== false
                            ? "play none none none"
                            : "play none none reverse",
                        once: config.scrollTrigger.once !== false,
                    } : undefined,
                });

                animationsRef.current.push(tween);
            });
        }, containerRef);

        // Refresh ScrollTrigger after a small delay to ensure DOM is ready
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(refreshTimeout);
            ctx.revert();
            animationsRef.current = [];
        };
    }, [containerRef, ...deps]);
}

// Simple animation hook for non-scroll animations (like footer)
export function useMountAnimation(
    containerRef: React.RefObject<HTMLElement | null>,
    animations: { selector: string; from: gsap.TweenVars; to: gsap.TweenVars }[]
) {
    useIsomorphicLayoutEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            animations.forEach((config) => {
                const elements = gsap.utils.toArray(config.selector);
                if (elements.length === 0) return;

                // Animate from -> to on mount
                gsap.fromTo(elements, config.from, config.to);
            });
        }, containerRef);

        return () => ctx.revert();
    }, [containerRef]);
}

// Refresh ScrollTrigger - call this after page transitions
export function refreshScrollTrigger() {
    if (typeof window !== 'undefined') {
        ScrollTrigger.refresh();
    }
}
