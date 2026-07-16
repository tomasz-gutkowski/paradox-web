import { useState, useEffect, useRef } from "react";
import * as React from "react";

interface props{
    designWidth?: number;
    children?: React.ReactNode;
}

function ScaledPage({ designWidth = 1600, children }: props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [innerHeight, setInnerHeight] = useState(0);

    useEffect(() => {
        const outer = containerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;

        const recalculate = () => {
            const newScale = outer.offsetWidth / designWidth;
            setScale(newScale);
            setInnerHeight(inner.scrollHeight * newScale);
        };

        // Watch both — outer for width changes, inner for content height changes
        const observer = new ResizeObserver(recalculate);
        observer.observe(outer);
        observer.observe(inner);

        return () => observer.disconnect();
    }, [designWidth]);

    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: innerHeight, minHeight: "100dvh", overflow: "hidden", position: "relative" }}
        >
            <div
                ref={innerRef}
                style={{
                    width: designWidth,
                    transformOrigin: "top left",
                    transform: `scale(${scale})`,
                    position: "absolute",
                }}
            >
                {children}
            </div>
        </div>
    );
}
export default ScaledPage