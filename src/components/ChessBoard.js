import { useEffect, useState } from 'react'
import { Position, Game } from 'kokopu'
import { Chessboard } from 'kokopu-react'
import useChessClock from 'react-chess-clock'

import TimeFormat from 'hh-mm-ss'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'

import { Checkmate, Stalemate, Dead, Time, Start } from './Dialog'
import Config from './Config'
import { smallScreenLimits, defaultPosition } from '../config/chessboard'

function ChessBoard() {
  const game = new Game()
  const [current, setCurrent] = useState(game.mainVariation())

  const initialTimer = 600
  const [players, clock] = useChessClock(initialTimer)

  const { white, black } = players
  const { pause, start, toggle, reset: resetTimer, activePlayer } = clock

  // Board status
  const [position, setPosition] = useState(defaultPosition)
  const [turn, setTurn] = useState('w')
  const [history, setHistory] = useState([])

  // Board configuration
  const [flipped, setFlipped] = useState(false)
  const [two, setTwo] = useState(localStorage.getItem('two') === 'true')
  const [colorset, setColorset] = useState(
    localStorage.getItem('colorset') || 'original'
  )
  const [pieceset, setPieceset] = useState(
    localStorage.getItem('pieceset') || 'cburnett'
  )

  // Dialogs
  const [checkmateDialog, setCheckmateDialog] = useState(false)
  const [staleMateDialog, setStaleMateDialog] = useState(false)
  const [insufficientMaterial, setInsufficientMaterial] = useState(false)
  const [configOpened, setConfigOpened] = useState(false)
  const [time, setTime] = useState(false)
  const [startingDialog, setStartingDialog] = useState(false)

  function handleMovePlayed(move) {
    if (activePlayer !== null) toggle()
    else return

    const newPosition = new Position(position)
    newPosition.play(move)
    setPosition(newPosition)
    setTurn(newPosition.turn())
    setCurrent(current.play(move))

    setHistory([...history, move])

    if (localStorage.getItem('flipping') === 'true') {
      setFlipped(!flipped)
    }

    if (newPosition.isCheckmate()) {
      setCheckmateDialog(true)
    }

    if (newPosition.isStalemate()) {
      setStaleMateDialog(true)
    }

    if (newPosition.isDead()) {
      setInsufficientMaterial(true)
    }
  }

  const reset = () => {
    setPosition(defaultPosition)
    setTurn('w')
    setFlipped(false)
    setCurrent(game.mainVariation())
    setCheckmateDialog(false)
    setStaleMateDialog(false)
    setInsufficientMaterial(false)
    resetTimer()
    setStartingDialog(true)
  }

  const startGame = () => {
    start()
  }

  useEffect(() => {
    if (white.timer === 0 || black.timer === 0) {
      setTime(true)
    }
  }, [white.timer, black.timer])

  return (
    <>
      <div className="clock">
        <div className="timer">
          {TimeFormat.fromMs(white.timer, 'mm:ss').split('.')[0]}
        </div>
        <div className="timer">
          {TimeFormat.fromMs(black.timer, 'mm:ss').split('.')[0]}
        </div>
      </div>

      {!two ? (
        <Chessboard
          position={position}
          flipped={flipped}
          interactionMode="playMoves"
          smallScreenLimits={smallScreenLimits}
          pieceset={pieceset}
          colorset={colorset}
          squareSize={56}
          onMovePlayed={move => handleMovePlayed(move)}
        />
      ) : (
        <div className="two-boards">
          <Chessboard
            position={position}
            flipped={false}
            interactionMode="playMoves"
            smallScreenLimits={smallScreenLimits}
            pieceset={pieceset}
            colorset={colorset}
            squareSize={56}
            onMovePlayed={move => handleMovePlayed(move)}
          />

          <Chessboard
            position={position}
            flipped={true}
            interactionMode="playMoves"
            smallScreenLimits={smallScreenLimits}
            pieceset={pieceset}
            colorset={colorset}
            squareSize={56}
            onMovePlayed={move => handleMovePlayed(move)}
          />
        </div>
      )}

      <Checkmate
        showDialog={checkmateDialog}
        turn={turn}
        history={history}
        fen={position.fen()}
      />
      <Stalemate showDialog={staleMateDialog} history={history} />
      <Dead showDialog={insufficientMaterial} history={history} />
      <Time showDialog={time} white={white.timer} black={black.timer} />
      <Start start={startGame} showDialog={startingDialog} />
      <Config
        show={configOpened}
        setShow={setConfigOpened}
        setTwo={setTwo}
        setColorset={setColorset}
        setPieceset={setPieceset}
      />

      <div className="toolbar">
        <Button
          onClick={() => setConfigOpened(true)}
          startIcon={<SettingsIcon />}
        >
          Config
        </Button>
        <Button onClick={reset} startIcon={<RestartAltIcon />}>
          Reset
        </Button>
        <IconButton onClick={pause}>
          {activePlayer === null ? <PlayArrowIcon /> : <PauseIcon />}
        </IconButton>
      </div>
    </>
  )
}

export default ChessBoard
