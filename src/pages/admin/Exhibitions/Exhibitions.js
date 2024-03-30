import React,{useEffect} from 'react'
import ExhibitionDetails from './ExhibitionDetails/ExhibitionDetails';

const Exhibitions = () => { 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <ExhibitionDetails />
  )
}

export default Exhibitions