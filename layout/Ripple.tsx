import React, { useCallback, useEffect, useRef, useState } from "react";

interface RippleProps {
  isEnabled?: boolean;
}

const Ripple: React.FC<RippleProps> = React.memo(({ isEnabled = true }) => {
  const inkRef = useRef<HTMLSpanElement>(null);
  const [isRippleActive, setIsRippleActive] = useState<boolean>(false);

  const createRipple = useCallback(
    (event: MouseEvent | PointerEvent) => {
      const ripple = inkRef.current;
      const target = ripple?.parentElement;
      if (!ripple || !target || !isEnabled) return;

      if (isRippleActive) {
        ripple.style.animation = "none";
        void ripple.offsetWidth; // Force reflow
      }

      ripple.style.animation = "none";
      void ripple.offsetHeight; // Force reflow

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      Object.assign(ripple.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
        animation: "ripple 0.4s linear",
      });

      setIsRippleActive(true);
    },
    [isEnabled, isRippleActive]
  );

  useEffect(() => {
    const target = inkRef.current?.parentElement;
    if (!target || !isEnabled) return;

    target.addEventListener("pointerdown", createRipple);
    return () => target.removeEventListener("pointerdown", createRipple);
  }, [isEnabled, createRipple]);

  const onAnimationEnd = useCallback((): void => {
    setIsRippleActive(false);
  }, []);

  return (
    <span
      role="presentation"
      ref={inkRef}
      className={`ripple-ink ${isRippleActive ? "active" : ""}`}
      onAnimationEnd={onAnimationEnd}
    />
  );
});

export default Ripple;
