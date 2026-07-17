/**
 * Full HGA MULTISERVI lockup (icon + wordmark), traced from the brand
 * reference: "HGA" solid blue, spray-wand + bubble-cloud icon, and
 * "MULTISERVI" in white. One reusable SVG so header/hero stay in sync.
 */
export default function HgaMark({
  className,
  title = "HGA Multiservi",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 640 260"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="120"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="106"
        letterSpacing="-2"
        fill="var(--color-primary-light, #4fa2ff)"
      >
        HGA
      </text>

      <g fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M238 150 H420" />
        <path d="M238 150 L212 182" />
        <circle cx="196" cy="200" r="24" />
        <path d="M176 220 L150 246" />
      </g>

      <rect x="420" y="130" width="46" height="40" rx="7" fill="none" stroke="#ffffff" strokeWidth="7" />

      <g stroke="var(--color-primary-light, #4fa2ff)" strokeWidth="10" strokeLinecap="round">
        <path d="M478 128 L534 100" />
        <path d="M480 150 H548" />
        <path d="M478 172 L534 200" />
      </g>

      <path
        fill="none"
        stroke="#ffffff"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M420 108
           c0 -26 22 -46 48 -46
           c18 0 34 10 42 26
           c8 -10 20 -16 34 -16
           c24 0 44 20 44 44
           c0 22 -16 40 -37 44
           c6 6 10 14 10 24
           c0 18 -15 32 -33 32
           c-10 0 -19 -5 -25 -12"
      />

      <g fill="none" stroke="#ffffff" strokeWidth="6">
        <circle cx="424" cy="62" r="20" />
        <circle cx="500" cy="46" r="13" />
        <circle cx="560" cy="168" r="18" />
      </g>
      <circle cx="424" cy="62" r="4" fill="#ffffff" />
      <circle cx="500" cy="46" r="3.5" fill="#ffffff" />
      <circle cx="560" cy="168" r="3.5" fill="#ffffff" />

      <text
        x="215"
        y="240"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="32"
        letterSpacing="9"
        fill="#ffffff"
      >
        MULTISERVI
      </text>
    </svg>
  );
}
