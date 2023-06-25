import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import toPGN from '../../utils/toPGN'

function Checkmate({ showDialog, turn, history }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  // Show the dialog when `showDialog` prop is true
  React.useEffect(() => {
    if (showDialog) {
      setOpen(true)
    }
  }, [showDialog])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{`Checkmate (${
          turn === 'w' ? 'Black' : 'White'
        } Wins)`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Link to={`/analytics?pgn=${toPGN(history)}`}>Analyze</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function Time({
  showDialog,
  white,
  black,
  history,
  bestHistory,
  openingLength,
  elo
}) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  // Show the dialog when `showDialog` prop is true
  React.useEffect(() => {
    if (showDialog) {
      setOpen(true)
    }
  }, [showDialog])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{'Time out'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {white === 0 ? 'Black' : 'White'} is the <mark>winner</mark> of the
            game
            <Link to={`/analytics?pgn=${toPGN(history)}`}>Analyze</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function Stalemate({ showDialog, history, bestHistory, openingLength, elo }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  // Show the dialog when `showDialog` prop is true
  React.useEffect(() => {
    if (showDialog) {
      setOpen(true)
    }
  }, [showDialog])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{'Stalemate (Draw)'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Link to={`/analytics?pgn=${toPGN(history)}`}>Analyze</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function Dead({ showDialog, history, bestHistory, openingLength, elo }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  // Show the dialog when `showDialog` prop is true
  React.useEffect(() => {
    if (showDialog) {
      setOpen(true)
    }
  }, [showDialog])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {'Insufficient Material (Draw)'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Link to={`/analytics?pgn=${toPGN(history)}`}>Analyze</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function Start({ start, showDialog }) {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    start()
  }

  // Show the dialog when `showDialog` prop is true
  React.useEffect(() => {
    if (showDialog) {
      setOpen(true)
    }
  }, [showDialog])

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Start'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click on the piece you want to move and then click on the square you
            want to move to.

            <br />

            <Link to="/ai">Play against the AI</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Start</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export { Checkmate, Stalemate, Dead, Time, Start }
