import '../css/Layout.css'
import '../css/Component.css'
import '../css/kokopu.css'
import ChessBoard from '../components/chess_play/ChessBoard'

export default function Home() {
  return (
    <div className="App">
      <ChessBoard />
    </div>
  )
}
