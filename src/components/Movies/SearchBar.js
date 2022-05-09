import React from 'react'
import Card from '../shared/Card'

export default function SearchBar({search, setSearch}) {
  return (
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search</label>
            <input id="search" type="text" role="searchbox" placeholder="Search Movies" 
            onChange ={(e) => setSearch(e.target.value.replace(' ', '+'))} />
      </form>

  )

  
}
