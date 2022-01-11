import { Link,NavLink } from 'react-router-dom';
import React,{useState}from 'react';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import './index.css';
import { useWeb3React } from '@web3-react/core'
import useAuth from '../../hooks/useAuth'

const Navbar=(props)=>{
    const [show, setshow] = useState(false);
    const { account } = useWeb3React();
    const { login, logout } = useAuth();
    const connectWallet = () => {
        setshow(true);    
    }
    const connectMetamask = () => {
        if (account) {
            logout()
        } else {
            login("injected")
        }
        setshow(false);
    }
    const trustWallet = async () => {
        localStorage.setItem("connectorId", "walletconnect")
        if (account) {
          logout()
        } else {
          login("walletconnect")
        }
        // window.$("#exampleModal").modal('hide');
      }
    const disconnectWallet=()=>{
        logout(); 
    }
     
       return (
            <div className="main-header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/"><img src={require("../../static/images/landing-leocorn/rc-launchpad-logo.png")} alt="" /></a>
                        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <div className="hamburger">
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </div>
                        </button>
                        <div className="collapse navbar-collapse nav-links" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    {/* <Link className="nav-link  pr-lg-4" to="/pools">Pool  <span className="sr-only">(current)</span></Link> */}
                                    <NavLink activeClassName="nav-link " className='pr-lg-3' to='/submit-project'>Submit Your Project</NavLink>
                                </li>
                                  {account==="0x7d5b329759254348D532dab6Aef36A9710157C2A" || account === "0xe0aCDC61b4A33FEFCD604b93CabA23E3f04C755D" || account==="0x49A61ba8E25FBd58cE9B30E1276c4Eb41dD80a80"?
                                <li className="nav-item active">
                                <NavLink ClassName="nav-link " className='pr-lg-3' to='/adminproject'>Admin</NavLink>
                                </li>:''}
                                {/* {account==="0x7d5b329759254348D532dab6Aef36A9710157C2A" || account === "0xe0aCDC61b4A33FEFCD604b93CabA23E3f04C755D"? */}
                                <li className="nav-item active">
                                {/* <Link className="nav-link  pr-lg-4" href="/poolss">Pool  <span className="sr-only">(current)</span></Link> */}
                                <NavLink activeClassName="nav-link" className='pr-lg-3' to='/projects'>My Projects</NavLink>
                            </li>
                            </ul>
                            <div className="button-head">
                            {/* <button className="button-one" type="button" onClick={this.connectWallet}>Connect Wallet</button> */}
                            {account ? <button className="button-one back" type="button"  onClick={disconnectWallet} >Disconnect</button> : <button className="button-one" type="button" onClick={connectWallet}>Connect Wallet</button>}
                                {/* <button className="button-one" type="button">Connect Wallet</button> */}
                            </div>
                            {/* ------------------Connect Wallet MODAL----------------- */}
                            <Modal isOpen={show} toggle={props.toggleBuyWallet}  className="register-modal connect-modal">
                                <ModalHeader toggle={props.toggleBuyWallet}>
                                    <button type="button" class="close" data-dismiss="modal" onClick={() => setshow(false)} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </ModalHeader>
                                <ModalBody className="modal-body">
                                    <div className="container main-divs">
                                        <h1>Select Wallet Provider</h1>
                                        <div className="meta-mask" onClick={connectMetamask}>
                                            <Link className="main-link-meta" to="#"><img src={require("../../static/images/landing-leocorn/Group 16.png")} alt="" /></Link>
                                        </div>
                                        <div className="scan-wallet" onClick={trustWallet}>
                                            <Link className="main-link-meta" to="#"><img src={require("../../static/images/landing-leocorn/sacn-wallet.png")} alt="" /></Link>
                                            <h1>WalletConnect</h1>
                                            <Link className="link-scan" to="#"><p>Scan with WalletConnect to Connect</p></Link>
                                        </div>
                                        <p className="main-term">By connecting, I accept LEOCORN's   <Link className="link-scan" >Terms of Service</Link></p>
                                    </div>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

export default Navbar