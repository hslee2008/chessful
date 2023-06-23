export const rateMove = ( eloChange, turn, openingLength, index ) => {
  if (index < openingLength) return 'Opening'

  if (turn === 'w') {
    if (eloChange >= 0 && eloChange <= 0.1) return 'Good'
    if (eloChange > 1 && eloChange <= 0.2) return 'Awsome'
    if (eloChange > 0.2 && eloChange <= 1) return 'Excellent'
    if (eloChange > 1 && eloChange <= 2.0) return 'Brilliant'
    if (eloChange > 2.0) return 'Genius'

    if (eloChange < 0 && eloChange >= -0.1) return 'Bad'
    if (eloChange < -0.1 && eloChange >= -1) return 'Mistake'
    if (eloChange < -1 && eloChange >= -2) return 'Blunder'
    if (eloChange < -2) return 'Horrible'
  } else {
    if (eloChange > 0 && eloChange <= 0.1) return 'Bad'
    if (eloChange > 1 && eloChange <= 0.2) return 'Mistake'
    if (eloChange > 0.2 && eloChange <= 1) return 'Blunder'
    if (eloChange > 1 && eloChange <= 2.0) return 'Horrible'
    if (eloChange > 2.0) return 'Terrible'

    if (eloChange <= 0 && eloChange >= -0.1) return 'Good'
    if (eloChange < -0.1 && eloChange >= -1) return 'Awsome'
    if (eloChange < -1 && eloChange >= -2) return 'Excellent'
    if (eloChange < -2) return 'Brilliant'
  }
}
