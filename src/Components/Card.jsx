import '../Styles/global.css'
import '../Styles/card.css'

// Posso usar propiedades, usando destruturação
export function Card (props) {
  return (
    <div className='card'>
      <strong>{props.name}</strong>
      <small>{props.time}</small>
    </div>
  )
}
