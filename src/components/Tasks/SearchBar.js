import React from 'react'
import Card from '../shared/Card'

export default function SearchBar({search, setSearch}) {
  return (
    <Card>
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlfor="search">Search</label>
            <input id="search" type="text" role="searchbox" placeholder="Search Movies" 
            onSubmit ={(e) => setSearch(e.target.value.replace(' ', '+'))} />
            <button type="submit">Submit</button>
      </form>
    </Card>
  )
}
