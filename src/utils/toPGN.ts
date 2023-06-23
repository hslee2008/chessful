export default function toPGN(moves: string[]): string {
  let pgn = '';

  // Add moves to the PGN
  for (let i = 0; i < moves.length; i++) {
    // Determine the move number and the move itself
    const moveNumber = Math.floor(i / 2) + 1;
    const move = moves[i];

    // Add the move to the PGN
    if (i % 2 === 0) {
      // White's move
      pgn += moveNumber + '. ';
    }

    pgn += move + ' ';
  }

  return pgn;
}
