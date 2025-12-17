/**
 * Animation utilities and keyframes for smooth interactions
 * Uses motion/react compatible animation configurations
 */

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const slideLeft = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export const slideRight = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

export const scaleUp = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

// Transition presets
export const transitions = {
  smooth: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const,
  },
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
  springGentle: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
  },
  springBouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 20,
  },
  quick: {
    duration: 0.2,
    ease: "easeOut" as const,
  },
  slow: {
    duration: 0.5,
    ease: "easeInOut" as const,
  },
}

// Stagger animations for lists
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.spring,
  },
}

// Hover animations
export const hoverLift = {
  y: -4,
  transition: transitions.quick,
}

export const hoverScale = {
  scale: 1.05,
  transition: transitions.quick,
}

export const hoverScaleSmall = {
  hover: {
    scale: 1.02,
    transition: transitions.quick,
  },
  tap: {
    scale: 0.98,
    transition: transitions.quick,
  },
}

// Tap animations
export const tapScale = {
  scale: 0.98,
  transition: transitions.quick,
}

// Bar chart animations for sorting visualizers
export const barAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: (height: number) => ({
    height,
    opacity: 1,
    transition: transitions.spring,
  }),
  exit: { height: 0, opacity: 0 },
}

// Grid cell animations for pathfinding
export const cellAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: transitions.spring,
}

// Pulse animation for active elements
export const pulse = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
}

// Shake animation for errors
export const shake = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
  },
  transition: {
    duration: 0.5,
  },
}

// Rotate animation
export const rotate = {
  animate: {
    rotate: 360,
  },
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "linear" as const,
  },
}

// Fade in with delay
export const fadeInWithDelay = (delay: number = 0) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay,
      ...transitions.smooth,
    },
  },
})

// Slide up with delay
export const slideUpWithDelay = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      ...transitions.spring,
    },
  },
})

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: transitions.smooth,
}

// Card entrance
export const cardEntrance = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: transitions.spring,
}

// List item entrance
export const listItemEntrance = (index: number) => ({
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05,
      ...transitions.spring,
    },
  },
})
