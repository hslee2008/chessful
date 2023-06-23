import { Chess } from 'chess.js'
import STOCKFISH from 'stockfish.js'

export function getBestMove(fen, depth) {
  return new Promise((resolve, reject) => {
    const stockfish = new Worker('/stockfish.js')

    stockfish.postMessage('stop') // Stop previous analysis (if any)
    stockfish.postMessage('position fen ' + fen)
    stockfish.postMessage('go depth ' + depth)

    stockfish.onmessage = event => {
      if (event.data.startsWith('bestmove')) {
        const bestMoveUCI = event.data.split(' ')[1]
        const chess = new Chess()
        chess.load(fen)
        const moveObj = chess.move(bestMoveUCI, { sloppy: true })
        const bestMoveSAN = moveObj ? moveObj.san : null
        resolve(bestMoveSAN)
      }
    }
  })
}
