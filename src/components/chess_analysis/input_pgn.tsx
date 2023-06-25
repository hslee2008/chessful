// Packages
import { Box, Button, TextField } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Store
import { useAnalysisStore } from '../../context'
import { StoreProps } from '../../stores/game'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const InputPgn = () => {
  const store: StoreProps = useAnalysisStore()
  const query = useQuery()
  const [text, setText] = useState<string>('')
  const handleVerify = () => {
    store.loadPgn(text)
  }

  useEffect(() => {
    const pgn = query.get('pgn')
    if (pgn) {
      setText(pgn)
      store.loadPgn(pgn)
    }
  }, [])

  return (
    <Box>
      Add a valid PGN to start. Use bottom commands to control
      <Box>
        <TextField
          id="outlined-multiline-static"
          label="PGN"
          multiline
          minRows={4}
          onChange={e => setText(e.target.value)}
          value={text}
          fullWidth
        />
      </Box>
      <Box style={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" onClick={handleVerify}>
          Import
        </Button>
      </Box>
    </Box>
  )
}

export default observer(InputPgn)
