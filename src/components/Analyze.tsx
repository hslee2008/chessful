import React, { useState } from 'react'
import { Chessboard } from 'kokopu-react'
import { defaultPosition } from '../config/chessboard'
import { Position } from 'kokopu'
import { rateMove } from '../utils/rateMove'
import Button from '@mui/material/Button'

import '../css/Analyze.css'

export function Analyze({ history, elo, openingLength }) {
  const [index, setIndex] = useState(0)
  const [position, setPosition] = useState(new Position(defaultPosition))
  const [turn, setTurn] = useState('b')

  const eloChange = elo.map((el, i) => {
    if (i === 0) return 0
    if (elo[i - 1].includes('#')) return 'mate'
    return el - elo[i - 1]
  })
  const ratedMoves = eloChange.map((el, i) =>
    rateMove(el, turn, openingLength, i)
  )

  const handleNext = () => {
    if (index === history.length - 1) return

    setIndex(index + 1)
    setTurn(turn === 'w' ? 'b' : 'w')

    const newPosition = position
    newPosition.play(history[index])
    setPosition(newPosition)
  }

  return (
    <div className="analyze-board-container">
      {ratedMoves[index]}
      <Chessboard
        move={history[index]}
        position={position}
        animated={true}
        moveArrowColor={
          turn === 'b'
            ? eloChange[index] >= 0
              ? 'g'
              : eloChange[index] === 'mate'
              ? 'y'
              : 'r'
            : eloChange[index] <= 0
            ? 'g'
            : eloChange[index] === 'mate'
            ? 'y'
            : 'r'
        }
        turnVisible={false}
      />
      <Button onClick={handleNext}>Next</Button>
    </div>
  )
}
