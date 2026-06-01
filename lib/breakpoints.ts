/** Desktop layout starts at 1025px (hamburger hidden, 2-col layouts, etc.). */
export const BREAKPOINT_DESKTOP = 1025;

export const MEDIA_DESKTOP = `(min-width: ${BREAKPOINT_DESKTOP}px)`;

export const MEDIA_BELOW_DESKTOP = `(max-width: ${BREAKPOINT_DESKTOP - 1}px)`;
