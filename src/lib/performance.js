// small screens are usually weaker, but a low core count catches an old/weak
// desktop too — viewport width alone would let it through every check below
export function isLowPowerDevice() {
  if (typeof window === 'undefined') return false
  const smallScreen = window.matchMedia('(max-width: 999px)').matches
  const fewCores = (navigator.hardwareConcurrency || 8) <= 4
  return smallScreen || fewCores
}
