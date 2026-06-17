interface BatLogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

const BatLogo = ({ size = 80, className = '', animate = false }: BatLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {animate && (
        <defs>
          {/* Левое крыло */}
          <animateTransform
            id="lwing"
            attributeName="transform"
            type="rotate"
            values="0 100 90; -28 100 90; -8 100 90; -34 100 90; 0 100 90"
            keyTimes="0; 0.22; 0.45; 0.68; 1"
            dur="1.2s"
            repeatCount="indefinite"
          />
          {/* Правое крыло */}
          <animateTransform
            id="rwing"
            attributeName="transform"
            type="rotate"
            values="0 100 90; 28 100 90; 8 100 90; 34 100 90; 0 100 90"
            keyTimes="0; 0.22; 0.45; 0.68; 1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </defs>
      )}

      {/* Левое крыло */}
      <g style={{ transformOrigin: '100px 90px' }}>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 100 90; -28 100 90; -8 100 90; -34 100 90; 0 100 90"
            keyTimes="0; 0.22; 0.45; 0.68; 1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
        <path
          d="M100 90 C90 75, 70 55, 40 45 C20 38, 5 42, 2 55 C12 50, 28 52, 38 62 C20 60, 8 68, 10 80 C22 72, 40 72, 52 80 C38 82, 28 90, 32 100 C44 90, 62 86, 74 92 Z"
          fill="currentColor"
        />
        {/* Перепонки-жилки */}
        <line x1="100" y1="90" x2="52" y2="68" stroke="hsl(var(--background))" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="100" y1="90" x2="30" y2="58" stroke="hsl(var(--background))" strokeWidth="0.6" strokeOpacity="0.2" />
        <line x1="100" y1="90" x2="14" y2="70" stroke="hsl(var(--background))" strokeWidth="0.6" strokeOpacity="0.2" />
      </g>

      {/* Правое крыло */}
      <g style={{ transformOrigin: '100px 90px' }}>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 100 90; 28 100 90; 8 100 90; 34 100 90; 0 100 90"
            keyTimes="0; 0.22; 0.45; 0.68; 1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
        <path
          d="M100 90 C110 75, 130 55, 160 45 C180 38, 195 42, 198 55 C188 50, 172 52, 162 62 C180 60, 192 68, 190 80 C178 72, 160 72, 148 80 C162 82, 172 90, 168 100 C156 90, 138 86, 126 92 Z"
          fill="currentColor"
        />
        <line x1="100" y1="90" x2="148" y2="68" stroke="hsl(var(--background))" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="100" y1="90" x2="170" y2="58" stroke="hsl(var(--background))" strokeWidth="0.6" strokeOpacity="0.2" />
        <line x1="100" y1="90" x2="186" y2="70" stroke="hsl(var(--background))" strokeWidth="0.6" strokeOpacity="0.2" />
      </g>

      {/* Тело */}
      <ellipse cx="100" cy="92" rx="10" ry="13" fill="currentColor" />

      {/* Уши */}
      <polygon points="92,80 88,64 97,76" fill="currentColor" />
      <polygon points="108,80 112,64 103,76" fill="currentColor" />

      {/* Глаза */}
      <circle cx="95.5" cy="87" r="2.2" fill="hsl(var(--background))" fillOpacity="0.9" />
      <circle cx="104.5" cy="87" r="2.2" fill="hsl(var(--background))" fillOpacity="0.9" />
      <circle cx="95.5" cy="87" r="0.9" fill="hsl(var(--gold))" />
      <circle cx="104.5" cy="87" r="0.9" fill="hsl(var(--gold))" />

      {/* Хвост */}
      <path d="M97 105 Q100 118 103 105" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
};

export default BatLogo;
