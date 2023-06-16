import openingData from '../data/openings.json'

function parseFEN(fen) {
  return fen.split('-')[0].trim()
}
function findOpening(fen) {
  fen = parseFEN(fen)
  const opening = openingData.find(opening => opening.fen === fen)
  return opening ? opening.name : null
}

export { findOpening }
