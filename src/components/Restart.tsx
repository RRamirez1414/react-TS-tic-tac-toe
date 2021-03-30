import React from 'react'

//Restart props
type RestartProps = {
  render: boolean
  restart: () => void
}

const Button = ({ render, restart }: RestartProps) => {
  if (render) {
    return (
      <div className="reset">
        <button
          onClick={(): void => {
            restart()
          }}
        >
          Restart?
        </button>
      </div>
    )
  }
  return <div></div>
}

export default Button
