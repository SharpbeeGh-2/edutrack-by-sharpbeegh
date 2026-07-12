interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses: Record<string, string> = {
  sm: 'text-h5',
  md: 'text-h3',
  lg: 'text-h1',
}

// Swap in a real <img src="/logo.svg" ... /> here once the logo file is supplied.
// Check clear-space and usage rules in the Branding Standard doc before adding it.
export function BrandLogo({ size = 'md' }: BrandLogoProps) {
  return (
    <span className={`font-semibold text-primary ${sizeClasses[size]}`}>
      EduTrack <span className="font-normal text-gray-500">by SharpbeeGh</span>
    </span>
  )
}