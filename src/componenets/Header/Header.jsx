import React from 'react'
import styles from './Header.module.css'
import logo from '../../public/images/logo.png'

function Header() {
    return (<>
        <div>
            <div className={styles.header}>
                <img src={logo} alt="logo" style={{ height: "100px" }} />
            </div></div>
    </>)
}

export default Header