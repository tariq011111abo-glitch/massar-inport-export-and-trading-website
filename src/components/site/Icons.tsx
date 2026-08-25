import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function IconLeaf(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M5 19c8 0 14-8 14-16-8 0-14 6-14 16Z" />
      <path d="M5 19c0-7 5-12 12-14" />
    </svg>
  );
}

export function IconShip(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 17 5 8h14l2 9" />
      <path d="M4 17c1.2 2 3.5 3 8 3s6.8-1 8-3" />
      <path d="M12 8V4M8 8V6h8v2" />
    </svg>
  );
}

export function IconOil(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M9 8V5h6v3l2 3v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-7l2-3Z" />
      <path d="M10 14h4" />
    </svg>
  );
}

export function IconDates(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <ellipse cx="9" cy="13" rx="3" ry="6" />
      <ellipse cx="15" cy="12" rx="3" ry="6" />
      <path d="M9 7c1-3 3-5 6-5" />
    </svg>
  );
}

export function IconRoute(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 7c6 0 4 10 10 10" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M7 3h4l1 5-2 1a12 12 0 0 0 5 5l1-2 5 1v4c0 1-1 2-2 2C10 19 5 14 5 5c0-1 1-2 2-2Z" />
    </svg>
  );
}

export function serviceIcon(name?: string | null) {
  switch (name) {
    case "import":
    case "export":
    case "route":
      return IconShip;
    case "oils":
      return IconOil;
    case "dates":
    case "food":
      return IconDates;
    case "trust":
    case "quality":
      return IconShield;
    case "malaysia":
    case "distribution":
    case "supply":
      return IconRoute;
    case "origin":
      return IconLeaf;
    default:
      return IconLeaf;
  }
}
