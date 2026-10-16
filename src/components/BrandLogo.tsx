import { VILLA_LOGO } from '../data/villaData';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function BrandLogo({
  className = '',
  showText = true,
  size = 'md',
}: BrandLogoProps) {
  const sizeMap = {
    sm: { img: 'w-8 h-8', text: 'text-base', subtext: 'text-[9px]' },
    md: { img: 'w-10 h-10', text: 'text-lg', subtext: 'text-[10px]' },
    lg: { img: 'w-14 h-14', text: 'text-xl', subtext: 'text-xs' },
    xl: { img: 'w-24 h-24', text: 'text-2xl', subtext: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Logo Mark Container with subtle rounded border */}
      <div
        className={`${currentSize.img} rounded-xl overflow-hidden bg-white shrink-0 flex items-center justify-center border border-slate-100 shadow-2xs`}
      >
        <img
          src={VILLA_LOGO}
          alt="Logo WebMudah Villa"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`${currentSize.text} font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors`}
          >
            WebMudah
          </span>
          <span
            className={`${currentSize.subtext} font-bold tracking-[0.2em] text-[#b38a42] uppercase mt-0.5`}
          >
            VILLA
          </span>
        </div>
      )}
    </div>
  );
}
