import { Box, Button, Grid, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { useStore } from '../context'
import { StoreProps } from '../stores/game'
import Commands from './commands'
import Move from './move'
import Report from './report'

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      backgroundColor: theme.palette.common.white
    },
    bold: {
      fontWeight: 600
    }
  })
)

const Moves = () => {
  const store = useStore() as StoreProps

  const moves = store.history

  const { currentMoveOnTheBoard, reportMoves, expectedPoints, mateIn } = store

  return store.history.length ? (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      style={{ height: '100%' }}
    >
      <Grid item xs={8} style={{ maxWidth: '100%', overflowY: 'scroll' }}>
        <Grid container>
          {moves.map((i, index) => {
            const status =
              reportMoves.length > index ? reportMoves[index] : 'ok'
            const score =
              expectedPoints.length > index ? expectedPoints[index + 1] : NaN
            const mateInX = mateIn.length > index ? mateIn[index + 1] : NaN

            return (
              <Grid key={`${index}_${i}`} item xs={6}>
                <Move
                  status={status}
                  currentMove={index === currentMoveOnTheBoard - 1}
                  index={index}
                  move={i}
                  score={score}
                  mateIn={mateInX}
                />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
      <Grid item xs={2} style={{ maxWidth: '100%' }}>
        <Report />
      </Grid>
      <Grid item xs={2} style={{ maxWidth: '100%' }}>
        <Commands />
      </Grid>
    </Grid>
  ) : null
}

export default observer(Moves)
