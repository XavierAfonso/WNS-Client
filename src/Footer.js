import React, { Component } from 'react';


class Footer extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <>
                <div>
                    <footer class="page-footer font-small blue">
                        <div class="footer-copyright text-center py-3">© 2018 Copyright:
                         <a href="https://mdbootstrap.com/education/bootstrap/"> WNS.ch</a>
                        </div>
                    </footer>
                </div>
            </>
        );
    }
}

export default Footer;
