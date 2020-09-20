import React, { useState } from 'react';
import styles from './Analysis.module.css'
import {server} from '../../App';

const Analysis = () => {

    const [redirectCount, setCount] = useState('');
    const [input, setInput] = useState('');
    const [got, setGot] = useState(false);

    function getCounts(e) {
        e.preventDefault();
        let url = `${server}kowalski_analysis?shortLink=${input}`


        fetch(url)
            .then(x => x.text())
            .then(y => setCount(y))
            .then(setGot(true))
    }

    const handleInputChange = e => {
        setInput(e.target.value);
    }

    return (
        <div className={styles.card}>

            <form className="pure-form">
                <fieldset className={styles.cardItems}>
                    <legend>Want to know how popular you link is?</legend>
                    <div className={styles.redirectField}>
                        <input className={styles.item} type="longLink" placeholder="Paste Your link here" onChange={handleInputChange} />
                        <button type="submit" className="pure-button" onClick={getCounts}>Check it</button>
                    </div>
                </fieldset>
            </form>

             {got && <div className={styles.results}>
                <input className={styles.short} type="redirectCount" value={`Your link was visited ${redirectCount} times`} readOnly="" />
            </div>}
        </div>
    )
}

export default Analysis;