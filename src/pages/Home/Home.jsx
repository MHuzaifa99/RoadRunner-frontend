import React, { useEffect, useState } from 'react'
import logo from '../../public/images/logo.png'
import Card from '../../componenets/Card/Card'
import styles from './Home.module.css'

function Home() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(false);
    console.log(process.env.REACT_APP_CARS_API_URL)
    fetch(`${process.env.REACT_APP_CARS_API_URL}/cars/get`)
    .then(data => data.json())
    .then(data =>{
      const arr = data.filter((d) => {
        console.log(d.id !== 152)
        return d.id !== 152})
        console.log({arr})
        setCars(arr)
        setLoading(true)
      })
  },[])

  return (
    <> 
    <div className={styles.container}>{loading ? cars.map((c)=> {
      return <Card car={c}/>
    }): "loading"}
    </div>
    </>)
}

export default Home