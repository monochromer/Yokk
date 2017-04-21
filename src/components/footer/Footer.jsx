import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer_container">
                <div className="row footer_row">
                    <div className="col-md-2">
                        <a href="http://soshace.com" target="_blank">
                            <img src="/img/logo.png" alt="Soshace Logo" className="img-responsive footer_logo" />
                        </a>
                    </div>
                    <div className="col-md-8 text-center">
                        <span className="footer_copyright">Copyright © 2016 Soshace </span>
                    </div>
                    <div className="col-md-2 text-right">
                        <div className="footer__github">
                            <a className="github-button" href="https://github.com/soshace/EOP-2" data-style="mega" data-count-href="/soshace/EOP-2/watchers" data-count-api="/repos/soshace/EOP-2#subscribers_count" data-count-aria-label="# watchers on GitHub" aria-label="Watch soshace/EOP-2 on GitHub">Watch</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;