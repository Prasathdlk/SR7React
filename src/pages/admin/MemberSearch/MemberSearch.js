import React from 'react'
import "assets/css/MemberSearch/MemberSearch.css"
import MemberSearchResult from './MemberSearchResult/MemberSearchResult'
import SearchBox from 'components/Search/SearchBox';
import { Link } from 'react-scroll';
const MemberSearch = () => {
 
  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className="col-lg-12">
          <SearchBox heading="" type="member"/>
          <br />
          <MemberSearchResult Links={Link}/>         
        </div>
      </div>
    </div>
  )
}

export default MemberSearch