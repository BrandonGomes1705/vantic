import { onBeforeUpdate, onUpdated, Ref } from "vue";
import { animate, easeOut, PlaybackControls } from "popmotion";

const WIDTH = "width";
const HEIGHT = "height";
type Dimension = "height" | "width";
type DimensionAnimation = PlaybackControls | null;

export default function useSmoothReflow(element: Ref<HTMLElement | undefined>) {
  let initialDimensions = { height: 0, width: 0 };
  let finalDimensions = { height: 0, width: 0 };
  let animations: {
    height: DimensionAnimation;
    width: DimensionAnimation;
  } = {
    height: null,
    width: null,
  };

  const getElementDimension = (dimension: Dimension) => {
    if (element.value) {
      return parseInt(getComputedStyle(element.value)[dimension].slice(0, -2));
    }

    return 0;
  };

  const setElementDimension = (dimension: Dimension, value: number) => {
    if (element.value) {
      element.value.style[dimension] = `${value}px`;
    }
  };

  const resetElementDimension = (dimension: Dimension) => {
    if (element.value) {
      element.value.style[dimension] = "";
    }
  };

  const setInitialDimensions = () => {
    initialDimensions = {
      height: getElementDimension(HEIGHT),
      width: getElementDimension(WIDTH),
    };
  };

  const setFinalDimensions = () => {
    finalDimensions = {
      height: getElementDimension(HEIGHT),
      width: getElementDimension(WIDTH),
    };
  };

  const resetElementDimensions = () => {
    resetElementDimension(HEIGHT);
    resetElementDimension(WIDTH);
  };

  const setElementDimensions = ({
    height,
    width,
  }: {
    height: number;
    width: number;
  }) => {
    setElementDimension(HEIGHT, height);
    setElementDimension(WIDTH, width);
  };

  const clearExistingAnimations = () => {
    if (animations.height) {
      animations.height.stop();
    }
    if (animations.width) {
      animations.width.stop();
    }
  };

  const hideElementOverflow = () => {
    if (element.value) {
      element.value.style.overflow = "hidden";
    }
  };

  const resetElementOverflow = () => {
    if (element.value) {
      element.value.style.overflow = "";
    }
  };

  const animateDimension = (dimension: Dimension) => {
    animations[dimension] = animate({
      from: initialDimensions[dimension],
      to: finalDimensions[dimension],
      duration: 300,
      ease: easeOut,
      onUpdate: (value) => setElementDimension(dimension, value),
      onComplete: () => {
        resetElementDimension(dimension);
        resetElementOverflow();
      },
    });
  };

  const startAnimations = () => {
    animateDimension(WIDTH);
    animateDimension(HEIGHT);
  };

  onBeforeUpdate(() => {
    if (!element.value) return;

    clearExistingAnimations();
    hideElementOverflow();
    setInitialDimensions();
    resetElementDimensions();
  });

  onUpdated(() => {
    if (!element.value) return;

    setFinalDimensions();
    setElementDimensions(initialDimensions);
    startAnimations();
  });
}
