import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Profile = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('buscador');

  return (
    <div>
        <input type="text" value={query || ''} onChange={(e) => setSearchParams({buscador: e.target.value})}/>
        <h2>Search Query: {query}</h2>
    </div>
  )
}

export default Profile
