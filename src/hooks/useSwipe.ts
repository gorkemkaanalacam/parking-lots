import { useState } from "react";
import { useSwipeable } from "react-swipeable";

interface SwipeHookProps {
  onRated(direction: "left" | "right"): void;
}

export const useSwipe = (props: SwipeHookProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwipe = (direction: "left" | "right") => {
    setPosition({ x: direction === "left" ? -500 : 500, y: 0 });
    setIsAnimating(true);
    props.onRated(direction);

    setTimeout(() => {
      setPosition({ x: 0, y: 0 });
      setIsAnimating(false);
    }, 300);
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (e) => {
      if (!isAnimating) setPosition({ x: e.deltaX, y: e.deltaY });
    },
    onSwiped: (e) => {
      if (!isAnimating) {
        const direction = e.deltaX > 0 ? "right" : "left";
        if (Math.abs(e.deltaX) > 100) handleSwipe(direction);
        else setPosition({ x: 0, y: 0 });
      }
    },
    touchEventOptions: { passive: false },
    trackMouse: true,
  });

  return { isAnimating, position, swipeHandlers, handleSwipe };
};
