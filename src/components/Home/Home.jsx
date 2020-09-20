import React, { useState } from 'react';
import styles from './Home.module.css';

const server = "http://localhost:8080/api/";



const Home = () => {
    const [input, setInput] = useState('');
    const [shortLink, setShortLink] = useState('');
    const [customLink, setCustomLink] = useState('');
    const [isCustom, setCustom] = useState(false);
    const [qr, setQR] = useState(0);

    function callGets(e){
        e.preventDefault();
        postData();
        getQR();
    }

    function postData() {
        let url = customLink.length ?
            `${server}save_link?link=${input}&shortLink=${customLink}`
            :
            `${server}save_link?link=${input}`;

        fetch(url, { method: 'POST' })
            .then(x => x.text())
            .then(y => setShortLink(y))
            

    }

    function getQR() {

        fetch(`${server}get_QR?link=${input}`)
            .then(x => x.blob())
            .then(y => setQR(URL.createObjectURL(y)))
    }   


    const handleInputChange = e => {
        setInput(e.target.value);
    }

    const handleCustomLinks = e => {
        setCustom(e.target.checked)
    }

    const handleCustomInput = e => {
        setCustomLink(e.target.value)
    }

    return (
        <div className={styles.card}>

            <form className="pure-form">
                <fieldset className={styles.cardItems}>

                    <legend>Put it here</legend>
                    <div className={styles.longLink}>
                        <input className={styles.item} type="longLink" placeholder="Paste Your link here" onChange={handleInputChange} />
                        <label className={styles.item} htmlFor="default-remember">
                            <input type="checkbox" id="default-remember" onChange={handleCustomLinks} />Want custom link?</label>
                    </div>
                    {isCustom && <input className={styles.item} type="customLink" placeholder="Type whatever you want" onChange={handleCustomInput} />}
                    <button type="submit" className="pure-button" onClick={callGets}>Shorten it</button>
                </fieldset>
            </form>
        <div>Take it: </div>
            <div className={styles.results}>

                {!!shortLink.length
                    && <input className={styles.short} type="shortLink" value={shortLink} readOnly="" />}
                {!!qr && <img src={`${qr}`} alt="here might be something useful"/>}
            </div>
        </div>
    )
};

export default Home;