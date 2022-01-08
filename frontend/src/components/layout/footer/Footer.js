import React from 'react';
import './Footer.css';
import playStore from '../../../assets/images/playstore.png';
import appStore from '../../../assets/images/Appstore.png';

function Footer() {
    return (
        <div id='footer'>

            <div className="left-footer">

                <div>Download App for Android and iOS mobile phone.</div>

                <img
                    src={playStore}
                    alt='playstore'
                    loading='lazy'
                    width="100%"
                    height="auto" />

                <img
                    src={appStore}
                    alt='Appstore'
                    loading='lazy'
                    width="100%"
                    height="auto" />

            </div>

            <div className="mid-footer">

                <h1>Ecommerce.</h1>

                <p>High Quality is our first priority.</p>

                <p>Copyrights 2021-2022 &copy; NixRajput</p>

            </div>

            <div className="right-footer">

                <h4>
                    Follow Us
                </h4>

                <a href='http://instagram.com/nixrajput'>Instagram</a>
                <a href='http://twitter.com/nixrajput_'>Twitter</a>
                <a href='http://facebook.com/nixrajput07'>Facebook</a>

            </div>

        </div>
    )
}

export default Footer;
