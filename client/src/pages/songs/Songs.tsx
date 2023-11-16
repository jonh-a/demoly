import React from 'react'
import { useGetSongs } from '../../hooks/useGetSongs';

const Songs = () => {
  const songs = useGetSongs()
  console.log(songs)

  return (
    <div>Songs</div>
  )
}

export default Songs