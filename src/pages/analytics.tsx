// Packages
import { FC } from 'react'
import { Card, Grid, LinearProgress } from '@material-ui/core'

//Components
import BoardContainer from '../components/board_container'
import AnalysisContainer from '../components/analysis_container'

// Store
import { useStore } from '../context'

const Analytics: FC = () => {
  const store = useStore()
  const { isEvaluationFinished, reportMoves, history } = store

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <BoardContainer />
              </Grid>
              <Grid item xs={4}>
                {!isEvaluationFinished && (
                  <LinearProgress
                    value={(reportMoves.length / history.length) * 100}
                    variant="determinate"
                  />
                )}
                <AnalysisContainer />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Analytics
