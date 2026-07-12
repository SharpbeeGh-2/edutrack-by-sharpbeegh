interface SchoolBrandLogoProps {
  schoolName: string
  logoUrl?: string | null
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses: Record<string, string> = {
  sm: 'text-h5',
  md: 'text-h3',
  lg: 'text-h1',
}

// TODO Phase 1: schoolName and logoUrl should come from a school-context hook
// reading schools.school_name and school_branding_settings.portal_logo_url.
// Until that data layer exists, callers pass whatever they have.
export function SchoolBrandLogo({ schoolName, logoUrl, size = 'md' }: SchoolBrandLogoProps) {
  return (
    <div className="flex items-center gap-2">
      {logoUrl && (
        <img src={logoUrl} alt={schoolName} className="h-8 w-8 rounded-sm object-contain" />
      )}
      <span className={`font-semibold text-gray-800 ${sizeClasses[size]}`}>{schoolName}</span>
    </div>
  )
}