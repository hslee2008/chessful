import React, { useState } from 'react'

export function GameEndPlayStat({ history, bestHistory, openingLength }) {
  const whiteMoves = history.filter((move, index) => index % 2 === 0)
  const blackMoves = history.filter((move, index) => index % 2 === 1)
  const whiteBestMoves = bestHistory.filter((move, index) => index % 2 === 0)
  const blackBestMoves = bestHistory.filter((move, index) => index % 2 === 1)
  const whiteMatchingMoves = whiteMoves.filter(
    (move, index) => move === whiteBestMoves[index]
  ).length
  const blackMatchingMoves = blackMoves.filter(
    (move, index) => move === blackBestMoves[index]
  ).length
  const whiteAccuracy =
    (whiteMatchingMoves / (whiteMoves.length - openingLength / 2)) * 100
  const blackAccuracy =
    (blackMatchingMoves / (blackMoves.length - openingLength / 2)) * 100

  return (
    <div>
      {' '}
      {history.map((move, index) => (
        <span key={index}>
          {move}
          {index !== history.length - 1 && ','}
          {'\n'}
        </span>
      ))}
      <br />
      <br />
      {bestHistory.map((move, index) => (
        <span key={index}>
          {move}
          {index !== history.length - 1 && ','}
          {'\n'}
        </span>
      ))}
      <br />
      <br />
      white: {whiteAccuracy}%<br />
      black: {blackAccuracy}%
    </div>
  )
}
