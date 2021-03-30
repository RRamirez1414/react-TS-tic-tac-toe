import React from 'react'

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
