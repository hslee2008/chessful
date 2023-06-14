import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

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
        <DialogTitle id="alert-dialog-title">{'Checkmate'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {turn === 'w' ? 'Black' : 'White'} is the <mark>winner</mark> of the
            game
            <br />
            {turn === 'w' ? 'White' : 'Black'} is the <mark>loser</mark> of the
            game
            <br />
            <br />
            {history.map((move, index) => (
              <span key={index}>
                {move}
                {index !== history.length - 1 && ','}
                {'\n'}
              </span>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function Time({ showDialog, white, black }) {
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function Stalemate({ showDialog, history }) {
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
        <DialogTitle id="alert-dialog-title">{'Stalemate'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The game is a <mark>draw</mark>
            <br />
            Thre is no legal play for the king
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function Dead({ showDialog, history }) {
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
          {'Insufficient Material'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The game is a <mark>draw</mark>
            <br />
            There are not enough pieces to force a checkmate
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
  }, [ showDialog ] )

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
