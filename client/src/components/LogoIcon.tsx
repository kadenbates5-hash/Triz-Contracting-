export default function LogoIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 4 L92 24 V58 C92 78 76 90 50 96 C24 90 8 78 8 58 V24 Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <rect x="28" y="22" width="44" height="11" rx="2" fill="currentColor" />
      <rect x="43.5" y="22" width="13" height="42" rx="2" fill="currentColor" />
      <rect x="26" y="70" width="48" height="9" rx="2" fill="var(--color-accent)" />
    </svg>
  );
}
