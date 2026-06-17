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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? 'animate-wing' : ''} ${className}`}
    >
      <path
        d="M50 32c-3-7-9-11-15-11 2 3 2 6 1 8-5-6-13-9-21-8 4 2 7 6 8 10-4-2-9-2-13 0 6 1 11 4 15 9 6 7 14 11 18 12 0 3 3 6 6 6s6-3 6-6c4-1 12-5 18-12 4-5 9-8 15-9-4-2-9-2-13 0 1-4 4-8 8-10-8-1-16 2-21 8-1-2-1-5 1-8-6 0-12 4-15 11z"
        fill="currentColor"
      />
      <circle cx="46" cy="44" r="1.6" fill="hsl(var(--background))" />
      <circle cx="54" cy="44" r="1.6" fill="hsl(var(--background))" />
    </svg>
  );
};

export default BatLogo;
