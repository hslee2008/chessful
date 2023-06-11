import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { Chessboard } from 'kokopu-react'

export default function Config({
  show,
  setShow,
  setTwo,
  setColorset,
  setPieceset
}) {
  const [two, setTwoCheckBox] = useState(localStorage.getItem('two') === 'true')
  const [flipping, setFlipping] = useState(
    localStorage.getItem('flipping') === 'true'
  )
  const [colorset, setColorsetIn] = useState(
    localStorage.getItem('colorset') || 'original'
  )
  const [pieceset, setPiecesetIn] = useState(
    localStorage.getItem('pieceset') || 'cburnett'
  )

  const handleFlipping = () => {
    localStorage.setItem('flipping', !flipping)
    setFlipping(!flipping)
  }

  const handleTwo = () => {
    localStorage.setItem('two', !two)
    setTwoCheckBox(!two)
  }

  const handleClose = () => {
    setShow(false)
    setTwo(two)
    setColorset(colorset)
    setPieceset(pieceset)

    localStorage.setItem('colorset', colorset)
    localStorage.setItem('pieceset', pieceset)
  }

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{'Configuration'}</DialogTitle>
        <DialogContent>
          <FormControlLabel
            label="Flip Board"
            control={<Checkbox checked={flipping} onChange={handleFlipping} />}
          />
          <FormControlLabel
            label="Two Boards"
            control={<Checkbox checked={two} onChange={handleTwo} />}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="colorset-select-label">Colorset</InputLabel>
            <Select
              labelId="colorset-select-label"
              value={colorset}
              onChange={e => setColorsetIn(e.target.value)}
              label="Colorset"
            >
              {Object.keys(Chessboard.colorsets()).map(colorset => (
                <MenuItem value={colorset} key={colorset}>
                  {colorset}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="pieceset-select-label">Pieceset</InputLabel>
            <Select
              labelId="pieceset-select-label"
              value={pieceset}
              onChange={e => setPiecesetIn(e.target.value)}
              label="Pieceset"
            >
              {Object.keys(Chessboard.piecesets()).map(pieceset => (
                <MenuItem value={pieceset} key={pieceset}>
                  {pieceset}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
