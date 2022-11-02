import React,{useRef, useState,useEffect} from 'react'
import DisableModal from "./DisableModal"

function Disable({ data,collectorId, onRefresh }) {
 const ref = useRef()
 const [modalOpen, setModalOpen] = useState(false);
 useEffect(() => {
   const checkIfClickedOutside = e => {
     if (modalOpen && ref.current && !ref.current.contains(e.target)) {
       setModalOpen(false)
     }
   }
    document.addEventListener("click", checkIfClickedOutside)
    return () => {
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [modalOpen])
  return (

    <div ref={ref}>
        <button onClick={() => {
           setModalOpen(true);
        }
      }>
         <img src="/assets/images/totalVector.svg" alt=''/> 
        </button>     
      
        {modalOpen && <DisableModal data={data} 
        onRefresh={onRefresh} setModalOpen={setModalOpen} />}
    </div>
  

  )
}

export default Disable