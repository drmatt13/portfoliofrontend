const Parrallax = ({background, speed, children}) => {

  return (
    <div style={{
      backgroundImage:"url(" + background + ")",
      // transform: 'translateZ(-9099px)'
    }}>
      {children}
    </div>
  )
}

export default Parrallax
