import { Chess } from 'chess.js';

export function coordinateToSan(move) {
  const chess = new Chess();
  const chessMove = chess.move(move, { sloppy: true });

  if (chessMove) {
    return chessMove.san;
  }

  return null; // Move not valid
}
