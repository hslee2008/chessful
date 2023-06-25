import { observer } from 'mobx-react-lite'
import { Chessboard } from 'react-chessboard'
import { useAnalysisStore } from '../../context'
import { StoreProps } from '../../stores/game'

const Board = () => {
  const store: StoreProps = useAnalysisStore()
  const { currentMoveOnTheBoard, expectedMoves, history } = store
  const arrows: Array<Array<string>> = []

  if (expectedMoves.length - 1 === history.length) {
    expectedMoves.map(i => arrows.push([i.substr(0, 2), i.substr(2)]))
  }

  return (
    <Chessboard
      position={store.game?.fen() || 'start'}
      customArrows={arrows.length ? [arrows[currentMoveOnTheBoard]] : []}
      onPieceDrop={(s, t) => false}
      boardWidth={300}
    />
  )
}

export default observer(Board)
