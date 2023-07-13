import React, { useEffect, useState } from 'react'
import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom'
function Card({ car }) {
  const navigate = useNavigate()

  const [carData, setCarData] = useState(null)

  const handleNameClick = () => {
    navigate("/detail",{state: {carData}})
  }

  const handleClick = () =>{
    navigate("/bookingform",{state: {carData}})
  }

  useEffect(()=>{
    setCarData(car)
  },[car])

  return (
    <>
      <div className={`${styles.card} w-75`}>
        <div className="card-body" style={{ display: "flex" }}>
          <img src={car.imageUrl} className="card-img-left" style={{ height: "auto", width: "250px" }} alt="carImage" />
          <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
            <h5 className="card-title" onClick={handleNameClick}>{car.name}</h5>
            <p className="card-text">{car.sdecs}</p>
            <button className="btn btn-primary" style={{ width: "150px" }} onClick={handleClick}>Rent Me Now</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card