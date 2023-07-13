import React, { useEffect, useState } from 'react'
import styles from './BookingForm.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
function BookingForm() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [drivingLicense, setDrivingLicense] = useState("");
    const [pickDate, setPickDate] = useState();
    const [returnDate, setReturnDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderPrice, setOrderPrice] = useState(0);
    const [isInsured, setIsInsured] = useState(false);
    const [damageProtection, setDamageProtection] = useState(0)
    const { state } = useLocation()
    const car = state.carData;

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData"));
        setUserName(data?.userName)
        setAddress(data?.address)
        setPhoneNumber(data?.phoneNumber);
        setDrivingLicense(data?.drivingLicense);
        setPickDate(data?.pickDate);
        setReturnDate(data?.returnDate);
        setTotalPrice(data?.totalPrice);
        setOrderPrice(data?.orderPrice);
        setIsInsured(data?.isInsured);
    }, [])

    useEffect(() => {
        const pd = new Date(pickDate?.split('T')[0]);
        const rd = new Date(returnDate?.split('T')[0]);
        const diff = rd.getTime() - pd.getTime();
        const days = Math.round(diff / (24 * 60 * 60 * 1000));
        console.log(days)
        const totalPrice = days * car.price
        setTotalPrice(totalPrice ? totalPrice : 0)
        console.log(isInsured)
        setOrderPrice(totalPrice ? totalPrice : 0)
        if (isInsured) {
            setDamageProtection(days * 15000)
            setOrderPrice(totalPrice + (days * 15000))
        }
    }, [pickDate, returnDate, isInsured])

    const handleChange = () => {
        const obj = { userName, address, phoneNumber, drivingLicense, pickDate, returnDate, totalPrice, orderPrice, isInsured }
        localStorage.setItem("userData", JSON.stringify(obj))
        navigate("/")
    }

    const handleCheckout = () => {
        fetch(`${process.env.REACT_APP_FORM_API_URL}/rentalform/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                itemId: car.id,
                driverName: userName,
                address: address,
                phoneNumber: phoneNumber,
                driverLicenseNumber: drivingLicense,
                totalPrice: orderPrice,
                pickDate: pickDate,
                returnDate: returnDate
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log({ first: data })
                if (isInsured) {
                    fetch(`${process.env.REACT_APP_FORM_API_URL}/rentalform/add`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }, body: JSON.stringify({
                            itemId: 152,
                            driverName: userName,
                            address: address,
                            phoneNumber: phoneNumber,
                            driverLicenseNumber: drivingLicense,
                            totalPrice: damageProtection,
                            pickDate: pickDate,
                            returnDate: returnDate
                        })
                    }).then(data => data.json())
                        .then(data => console.log({ data }))
                }
            })
            localStorage.clear()
            navigate("/checkout")
    }

    return (
        <div className={styles.container}>
            <div className="container">
                <div class="row">
                    <div class="col-md-5">
                        {/* <div class="project-info-box mt-0">
                            <h5>Car DETAILS</h5>
                            <p class="mb-0">{car.ldecs}</p>
                        </div> */}

                        <div className={`project-info-box ${styles.detail}`}>
                            <p><b>Name: </b>{car.name}</p>
                            <p><b>Price: </b>{car.price}/day</p>
                            <form>
                                <div class="mb-3">
                                    <label class="form-label">User Name</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userName}
                                        onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">address</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setAddress(e.target.value)} value={address} />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Phone Number</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Driving License Number</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setDrivingLicense(e.target.value)} value={drivingLicense} />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Pick Date</label>
                                    <input type="datetime-local" class="form-control" id="exampleInputPassword1" onChange={(e) => setPickDate(e.target.value)} value={pickDate} />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Return Date</label>
                                    <input type="datetime-local" class="form-control" id="exampleInputPassword1" onChange={(e) => setReturnDate(e.target.value)} value={returnDate} />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Total Price</label>
                                    <input type="textTime" class="form-control" id="exampleInputPassword1" onChange={(e) => setTotalPrice(e.target.value)} value={totalPrice} />
                                </div>
                            </form>
                        </div>
                        {/* <button href="#x" class="btn btn-primary mb-0">Rent me Now</button> */}
                    </div>

                    <div class={`col-md-7`}>
                        <img src={car.imageUrl} alt="detailPageImage" class="rounded" />
                        <div class={`project-info-box ${styles.orderPrice}`}>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => setIsInsured(!isInsured)} checked={isInsured} />
                                <label class="form-check-label" for="exampleCheck1">If you would like to pay Rs. 15,000 per day for "Damage Protection</label>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Order Price</label>
                                <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setOrderPrice(e.target.value)} value={orderPrice} />
                            </div>
                            <button class="btn btn-primary" onClick={handleCheckout}>Checkout</button>
                            <button class="btn btn-primary" style={{ marginLeft: "20px" }} onClick={handleChange}> Change Car</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BookingForm