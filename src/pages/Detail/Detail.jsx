import React from 'react'
import { useLocation } from 'react-router-dom';
import styles from './Detail.module.css'
import { useNavigate } from 'react-router-dom';

function Detail() {

    const navigate = useNavigate();
    const { state } = useLocation()

    const car = state.carData;
    return (
        <div className={styles.container}>
            <div className="container">
                <div class="row">
                    <div class="col-md-5">
                        <div class="project-info-box mt-0">
                            <h5>Car DETAILS</h5>
                            <p class="mb-0">{car.ldecs}</p>
                        </div>

                        <div className={`project-info-box ${styles.detail}`}>
                            <p><b>Name: </b>{car.name}</p>
                            <p><b>Price: </b>{car.price}/day</p>
                        </div>
                        <button onClick={() => navigate("/bookingform", {state: {carData: car}})} class="btn btn-primary mb-0">Rent me Now</button>
                    </div>

                    <div class="col-md-7">
                        <img src={car.imageUrl} alt="detailPageImage" class="rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail