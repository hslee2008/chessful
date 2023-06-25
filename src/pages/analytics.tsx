// Packages
import {
  Grid,
  LinearProgress,
  createStyles,
  makeStyles
} from '@material-ui/core'
import { FC } from 'react'

//Components
import AnalysisContainer from '../components/chess_analysis/analysis_container'
import BoardContainer from '../components/chess_analysis/board_container'

// Store
import { useAnalysisStore } from '../context'

const useStyles = makeStyles(theme =>
  createStyles({
    board: {
      margin: 5
    },
    analysis: {
      margin: 5
    },
    container: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      },
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "100px"
      }
    }
  })
)

const Analytics: FC = () => {
  const store = useAnalysisStore()
  const { isEvaluationFinished, reportMoves, history } = store
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.board}>
        <BoardContainer />
      </div>
      <div className={classes.analysis}>
        <AnalysisContainer />
        {!isEvaluationFinished && (
          <LinearProgress
            value={(reportMoves.length / history.length) * 100}
            variant="determinate"
          />
        )}
      </div>
    </div>
  )
}

export default Analytics
