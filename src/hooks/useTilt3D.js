export function useTilt3D(max = 12) {
  function onMouseMove(e) {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--tilt-x', `${(-py * max).toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${(px * max).toFixed(2)}deg`)
    card.style.setProperty('--glare-x', `${px * 100 + 50}%`)
    card.style.setProperty('--glare-y', `${py * 100 + 50}%`)
  }

  function onMouseLeave(e) {
    const card = e.currentTarget
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  return { onMouseMove, onMouseLeave }
}
