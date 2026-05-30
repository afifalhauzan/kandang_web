import { useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "motion/react";
import "./CircularText.css";

type HoverMode = "slowDown" | "speedUp" | "pause" | "goBonkers";

type CircularTextProps = {
    text: string;
    spinDuration?: number;
    onHover?: HoverMode;
    className?: string;
};

const getTransition = (duration: number) => ({
    rotate: {
        ease: "linear" as const,
        duration,
        repeat: Infinity,
        repeatType: "loop" as const,
    },
    scale: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
    },
});

export default function CircularText({
    text,
    spinDuration = 20,
    onHover = "speedUp",
    className = "",
}: CircularTextProps) {
    const letters = Array.from(text);
    const controls = useAnimation();
    const rotation = useMotionValue(0);

    useEffect(() => {
        const start = rotation.get();
        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration),
        });
    }, [spinDuration, text, onHover, controls, rotation]);

    const handleHoverStart = () => {
        const start = rotation.get();

        let transitionConfig;
        let scaleVal = 1;

        switch (onHover) {
            case "slowDown":
                transitionConfig = getTransition(spinDuration * 2);
                break;
            case "speedUp":
                transitionConfig = getTransition(spinDuration / 4);
                break;
            case "pause":
                transitionConfig = {
                    rotate: { duration: 0 },
                    scale: { type: "spring" as const, damping: 20, stiffness: 300 },
                };
                scaleVal = 1;
                break;
            case "goBonkers":
                transitionConfig = getTransition(spinDuration / 20);
                scaleVal = 0.8;
                break;
            default:
                transitionConfig = getTransition(spinDuration);
        }

        controls.start({
            rotate: start + 360,
            scale: scaleVal,
            transition: transitionConfig,
        });
    };

    const handleHoverEnd = () => {
        const start = rotation.get();
        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration),
        });
    };

    return (
        <motion.div
            className={`circular-text ${className}`}
            style={{ rotate: rotation }}
            initial={{ rotate: 0 }}
            animate={controls}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
        >
            {letters.map((letter, i) => {
                const rotationDeg = (360 / letters.length) * i;
                const factor = Math.PI / letters.length;
                const x = factor * i;
                const y = factor * i;
                const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

                return (
                    <span key={`${letter}-${i}`} style={{ transform, WebkitTransform: transform }}>
                        {letter}
                    </span>
                );
            })}
        </motion.div>
    );
}
