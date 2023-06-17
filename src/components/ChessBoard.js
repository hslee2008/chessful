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

import { findOpening } from '../utils/findOpening'
import parseNotation from '../utils/parseNotation'
import { getBestMove } from '../utils/bestNextMove'
import { coordinateToSan } from '../utils/coordinateToSan'

import EvalBar from './EvalBar'
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
  const [position, setPosition] = useState(new Position(defaultPosition))
  const [turn, setTurn] = useState('w')
  const [history, setHistory] = useState([])
  const [bestHistory, setBestHistory] = useState([])
  const [opening, setOpening] = useState(null)
  const [latestMove, setLatestMove] = useState(null)
  const [isCheck, setIsCheck] = useState(false)
  const [king, setKing] = useState(null)
  const [openingLength, setOpeningLength] = useState(0)

  // Board configuration
  const [flipped, setFlipped] = useState(false)
  const [two, setTwo] = useState(localStorage.getItem('two') === 'true')
  const [colorset, setColorset] = useState(
    localStorage.getItem('colorset') || 'original'
  )
  const [pieceset, setPieceset] = useState(
    localStorage.getItem('pieceset') || 'cburnett'
  )
  const [evalBar, setEval] = useState(
    localStorage.getItem('eval') === 'true' || false
  )
  const [timer, setTimer] = useState(
    localStorage.getItem('timer') === 'true' || false
  )
  const [displayOpening, setDisplayOpening] = useState(
    localStorage.getItem('opening') === 'true' || false
  )
  const [color, setColor] = useState(
    localStorage.getItem('color') === 'true' || false
  )

  // Dialogs
  const [checkmateDialog, setCheckmateDialog] = useState(false)
  const [staleMateDialog, setStaleMateDialog] = useState(false)
  const [insufficientMaterial, setInsufficientMaterial] = useState(false)
  const [configOpened, setConfigOpened] = useState(false)
  const [time, setTimeLose] = useState(false)
  const [startingDialog, setStartingDialog] = useState(false)

  async function handleMovePlayed(move) {
    if (activePlayer !== null) toggle()
    else return

    const newPosition = new Position(position)
    newPosition.play(move)
    setPosition(newPosition)
    setCurrent(current.play(move))
    setLatestMove(move)
    setHistory([...history, move])

    setOpening(findOpening(newPosition.fen()))
    const moveBest = await getBestMove(position.fen(), 10, turn)
    setBestHistory([...bestHistory, moveBest])

    if (localStorage.getItem('flipping') === 'true') {
      setFlipped(!flipped)
    }

    if (newPosition.isCheckmate()) {
      setCheckmateDialog(true)
    }

    if (newPosition.isCheck()) {
      setIsCheck(true)
      setKing(newPosition.kingSquare(turn === 'w' ? 'b' : 'w'))
    } else {
      setIsCheck(false)
    }

    if (newPosition.isStalemate()) {
      setStaleMateDialog(true)
    }

    if (newPosition.isDead()) {
      setInsufficientMaterial(true)
    }

    if (opening !== null) {
      setOpeningLength(openingLength + 1)
    }

    setTurn(newPosition.turn())
  }

  const reset = () => {
    setPosition(new Position(defaultPosition))
    setTurn('w')
    setFlipped(false)
    setCurrent(game.mainVariation())
    setCheckmateDialog(false)
    setStaleMateDialog(false)
    setInsufficientMaterial(false)
    resetTimer()
    setLatestMove(null)
    setHistory([])
    setOpening(null)
    setIsCheck(false)
    setStartingDialog(true)
  }

  const startGame = () => {
    start()
  }

  useEffect(() => {
    if ((white.timer === 0 || black.timer === 0) && timer) setTimeLose(true)
  }, [white.timer, black.timer, timer])

  return (
    <div>
      {evalBar && (
        <div className="eval-container">
          <EvalBar depth={30} fen={position.fen()} />
        </div>
      )}
      <div>
        {timer && (
          <div className="clock">
            <div className="timer">
              {TimeFormat.fromMs(white.timer, 'mm:ss').split('.')[0]}
            </div>
            <div className="timer">
              {TimeFormat.fromMs(black.timer, 'mm:ss').split('.')[0]}
            </div>
          </div>
        )}

        <div className="opening">
          {opening && displayOpening && (
            <div>
              <span className="opening-name">{opening}</span>
            </div>
          )}
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
            squareMarkers={
              color
                ? (latestMove ? `Y${parseNotation(latestMove)}` : '') +
                  (isCheck ? `,R${king}` : '')
                : null
            }
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
              squareMarkers={
                color
                  ? (latestMove ? `Y${parseNotation(latestMove)}` : '') +
                    (isCheck ? `,R${king}` : '')
                  : null
              }
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
              squareMarkers={
                color
                  ? (latestMove ? `Y${parseNotation(latestMove)}` : '') +
                    (isCheck ? `,R${king}` : '')
                  : null
              }
              onMovePlayed={move => handleMovePlayed(move)}
            />
          </div>
        )}

        <Checkmate
          showDialog={checkmateDialog}
          turn={turn}
          history={history}
          bestHistory={bestHistory}
          openingLength={openingLength}
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
          setEval={setEval}
          setTimer={setTimer}
          setDisplayOpening={setDisplayOpening}
          setColor={setColor}
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
          {timer && (
            <IconButton onClick={pause}>
              {activePlayer === null ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChessBoard
