import React, { forwardRef, useEffect, useRef, useState, useMemo } from 'react'
import { Chess } from 'chess.js'
import Engine from '../engine'
import { Chessboard } from 'react-chessboard'

const boardWrapper = {
  width: `70vw`,
  maxWidth: '70vh',
  margin: '3rem auto'
}

const buttonStyle = {
  cursor: 'pointer',
  padding: '10px 20px',
  margin: '10px 10px 0px 0px',
  borderRadius: '6px',
  backgroundColor: '#f0d9b5',
  border: 'none',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
}

export const PlayVsStockfish = () => {
  const engine = useMemo(() => new Engine(), [])

  const [game, setGame] = useState(new Chess())
  const [engineMessage, setEngineMessage] = useState('')
  const [ponderArrow, setPonderArrow] = useState([])

  function safeGameMutate(modify) {
    setGame(g => {
      const update = { ...g }
      modify(update)
      return update
    })
  }function findBestMove() {
    // exit if the game is over
    if (game.game_over() || game.in_draw()) return;

    engine.evaluatePosition(game.fen());

    engine.onMessage((message) => {
      console.log('Received message:', message);
      setEngineMessage(message);

      const bestMove = message.bestMove;
      const ponder = message.ponder;

      setPonderArrow([[ponder.substring(0, 2), ponder.substring(2, 4)]]);

      safeGameMutate((game) => {
        game.move({
          from: bestMove.substring(0, 2),
          to: bestMove.substring(2, 4),
        });
      });
    });
  }


  function onDrop(sourceSquare, targetSquare, piece) {
    const gameCopy = { ...game }
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1]?.toLowerCase() ?? 'q'
    })
    setGame(gameCopy)

    // illegal move
    if (move === null) return false

    findBestMove()

    return true
  }

  useEffect(() => {
    engine.init()

    // Don't forget to terminate Engine after unmount!
    return () => engine.terminate()
  }, [])

  return (
    <div style={boardWrapper}>
      <Chessboard
        id="PlayVsStockfish"
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
        }}
      />
      <button
        style={buttonStyle}
        onClick={() => {
          safeGameMutate(game => {
            game.reset()
          })
        }}
      >
        reset
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          safeGameMutate(game => {
            game.undo()
            game.undo()
          })
        }}
      >
        undo
      </button>
    </div>
  )
}
