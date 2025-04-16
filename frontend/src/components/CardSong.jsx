import React from 'react'
import '../styles/card_song_style.css'

const CardSong = ({ title, artist, lyrics_and_chords }) => {
  return (
    <div className="card-song">
      <div>
        <p className="song-name"> "{title}"</p>
        <h3 className="song-name">{artist}</h3>
      </div>
    </div>
  )
}

export default CardSong
