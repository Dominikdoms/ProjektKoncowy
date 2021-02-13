import React from 'react'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookF, faTwitter} from '@fortawesome/free-brands-svg-icons'

library.add(faFacebookF);
library.add(faTwitter);


export const Footer = () => {
    return (
        <footer className={"footer"}>
            <section className={"footer-container container"}>
                <div className={"footer-logo"}>
                    <h4 className={"footer-logo-header"}>TwójNotatnik</h4>
                    <p className={"footer-logo-copy"}>© 2019 TwójNotatnik Wszelkie prawa zastrzeżone twitter
                        facebook</p>
                </div>
                <div className={"footer-social-media"}>
                    <FontAwesomeIcon className={"facebook"} icon={['fab', 'facebook-f']}/>
                    <FontAwesomeIcon icon={['fab', 'twitter']}/>
                </div>
            </section>
        </footer>
    )
}