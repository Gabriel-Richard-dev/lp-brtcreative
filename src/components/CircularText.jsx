import { useId } from 'react'

export default function CircularText({ text, className = '', speed = 16, icon = '↗' }) {
  const id = useId().replace(/:/g, '')

  return (
    <div className={`circular-text ${className}`} style={{ '--spin-speed': `${speed}s` }}>
      <svg viewBox="0 0 200 200" className="circular-text__ring">
        <path id={id} fill="none" d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0" />
        <text>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="circular-text__icon">{icon}</span>
    </div>
  )
}
