import { createStyles, makeStyles } from '@material-ui/core'

import Board from './board'

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
)

const BoardContainer = () => {
  const classes = useStyles()

  return (
    <div className={classes.card}>
      <Board />
    </div>
  )
}

export default BoardContainer
