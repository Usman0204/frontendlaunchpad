import React, { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core'
import './index.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ClaimTokens, ClaimVestedToken, VestedPeriod, Contribute,ClaimSecondVestedTokens } from '../../hooks/PoolDataFetcher';
import useAuth from '../../hooks/useAuth';
import { useSelector } from "react-redux";
import {WhiteListedAllTiers} from '../../hooks/PoolDataFetcher'
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ClosePool = (props) => {
    const [open, setOpen] = useState(false);
    const closeingstore = useSelector((state) => state.PoolActiveReducer.ClosedData);
    const tier = props.match.params.tier;
    const id = props.match.params.id;
    // console.log("id",id)
    let tierMinValue = '';
    let tierMaxValue = '';
    let logo='';
    let name = '';
    let description = '';
    let weblink = '';
    let twitterlink = '';
    let telegramlink = '';
    let mediumlink = '';
    let discardlink = '';
    let symbol = '';
    let price ;
    let tokenAddress='';
    let prersaleTime
    let tokenSale='';
    let firstIterationPercentage = ''
    let secondIterationPercentage = ''
    let thirdIterationPercentage=''
    let firstClaimTime=''
    let secondClaimTime=''
    let thirdClaimTime=''
    closeingstore.find((elem) => {
           
       if(elem.id==id){

           logo=elem.logoURL
           name=elem.projectName;
           description = elem.projectDescription
           weblink= elem.websiteLink.includes("https://") ? elem.websiteLink : `https://${elem.websiteLink}`  ;
           twitterlink= elem.twitterLink.includes("https://") ? elem.twitterLink : `https://${elem.twitterLink}` ;
           telegramlink= elem.telegramlink.includes("https://") ? elem.telegramlink : `https://${elem.telegramlink}` ;
           mediumlink= elem.mediumLink.includes("https://") ? elem.mediumLink : `https://${elem.mediumLink}` ;
           discardlink= elem.discrodLink.includes("https://") ? elem.discrodLink : `https://${elem.discrodLink}` ;
           symbol=elem.symbol;
           price=elem.tokenPriceInBNB;
           tokenAddress=elem.contractAddressDeployed;
           prersaleTime = new Date(elem.preSaleEndDateAndTime);
           tokenSale=elem.amountAllocatedForPresale
           firstIterationPercentage = elem.firstIterationPercentage
           secondIterationPercentage = elem.secondIterationPercentage
           thirdIterationPercentage=elem.thirdIterationPercentage
           firstClaimTime=new Date(elem.firstClaimTime);
           secondClaimTime=elem.secondClaimTime
           thirdClaimTime=elem.thirdClaimTime
       }
        if (tier == 1) {
            tierMinValue = elem.minAllocationPerUser;
            tierMaxValue = elem.maxAllocationPerUser;
        }
        // if (tier == 2) {
        //     tierMinValue = elem.tier2MinAmountPerUserInBNB;
        //     tierMaxValue = elem.tier2MaxAmountPerUserInBNB;
        // }
        // if (tier == 3) {
        //     tierMinValue = elem.tier3MinAmountPerUserInBNB;
        //     tierMaxValue = elem.tier3MaxAmountPerUserInBNB;
        // }
        // if (tier == 4) {
        //     tierMinValue = elem.tier4MinAmountPerUserInBNB;
        //     tierMaxValue = elem.tier4MaxAmountPerUserInBNB;
        // }

    })
    const [show, setshow] = useState(false);
    const { login } = useAuth();
    const { account } = useWeb3React();
    const { claimToken } = ClaimTokens(tokenAddress)
    const { vestedClaim } = ClaimVestedToken(tokenAddress);

    const { SecondvestedClaim } = ClaimSecondVestedTokens(tokenAddress);
    const { vestingPeriod } = VestedPeriod(tokenAddress)
    const { tier1Con } = Contribute(tokenAddress);
    const [TierContribute, setTierContribute] = useState('0');
    const contribute = useCallback(async (e) => {
        if (account) {
            try {
                const tier1 = await tier1Con();
                if (tier == 1) { setTierContribute(tier1.tier1Contribute) }
                if (tier == 2) { setTierContribute(tier1.tier2Contribute) }
                if (tier == 3) { setTierContribute(tier1.tier3Contribute) }
                // if (tier == 4) { setTierContribute(tier1.tier4Contribute) }
            }
            catch (err) {
                return false;
            }
        }
        else {
            return 0;
        }
    }, [tier1Con])
    const { WhiteListTiers } = WhiteListedAllTiers(tokenAddress);
    const [whiteList,setWhiteList]=useState(Boolean);
    const CheckWhiteList = useCallback(async (e) => {
        if (account) {   
            try {            
                if (tier ==1) {          
                    const checkwhitelist= await WhiteListTiers();
                    setWhiteList(checkwhitelist.t1)  
                }
                else if (tier == 2 ) {
                    const checkwhitelist= await WhiteListTiers();
                    setWhiteList(checkwhitelist.t2)  
                }
                else if (tier == 3 ) {
                    const checkwhitelist= await WhiteListTiers();
                    setWhiteList(checkwhitelist.t3)  
                }
                // else if (tier == 4 ) {
                //     const checkwhitelist= await T4();
                //     setWhiteList(checkwhitelist)
                // }
                // else {
                //     toast.error('White Listed', {
                //         position: "top-right",
                //         autoClose: 2000,
                //     });
                // }
            }
            catch (err) {
                return false;
            }
        }
    }, [WhiteListTiers])
    
    const FirstClaimToken = useCallback(async (e) => {
        setOpen(true)
        e.preventDefault();
        if (account) {
            try {
                await claimToken();
                setOpen(false)
                toast.success('Claim Done', {
                    position: "top-center",
                    autoClose: 7000,
                });
            }
            catch (err) {
                setOpen(false)
                return false;
            }
        }
        else {
            login("injected")
        }
    }, [claimToken])
    const VestedClaimToken = useCallback(async (e) => {
        setOpen(true)
        e.preventDefault();
        if (account) {
            try {
                await vestedClaim();
                setOpen(false)
                toast.success('Finalization Done', {
                    position: "top-center",
                    autoClose: 7000,
                });

            }
            catch (err) {
                setOpen(false)
                return false;
            }
        }
        else {
            login("injected")
        }
    }, [vestedClaim])


    const SecondVestedClaimToken = useCallback(async (e) => {
        e.preventDefault();
        if (account) {
            try {
                await SecondvestedClaim();
            }
            catch (err) {
                return false;
            }
        }
        else {
            login("injected")
        }
    }, [SecondvestedClaim])
    const [claimTime, setClaimTime] = useState('');
    const [period, setPeriod] = useState('')
    const [now, setNow] = useState('');

    const vestedPeriod = useCallback(async (e) => {
        if (tokenAddress) {
            try {
                const period = await vestingPeriod();
                setPeriod(period);
               const now = Math.floor(Date.now() / 1000)
                setNow(now)
                const locatime = new Date(period * 1000)
                const time = locatime.toGMTString()
                setClaimTime(time)
            }
            catch (err) {
                return false;
            }
        }
    }, [vestingPeriod])

    useEffect(() => {
        contribute();
        vestedPeriod()
        CheckWhiteList();
    }, [account, tokenAddress])
    return (
        <>
        <Backdrop className="loader" xs={{ color: '#fff'}} open={open}><CircularProgress color="primary"  style={{width: "100px", height:'100px'}}/></Backdrop>
       
        <div className='landing-nft main-pool'>
            <Navbar />
            <section className="header-section main-pool">
                <img src={require("../../static/images/landing-leocorn/background-main-head.png")} className="main-heads-one" alt="" />
                <div className="auto-container">
                    <div className="row main-pool-page">
                        <div className="col-xl-5 col-lg-4 col-md-12 col-12">
                            <div className="main-left-side">
                                <div className="upper">
                                    <div className="left-inner">
                                        <div className="image">
                                            <img src={logo} style={{ width: 100, height: 100, borderRadius: '50%' }} />
                                        </div>
                                        <div className="name-socials">
                                            <h1>{name}</h1>
                                            <div className="socials">
                                                <a className='linkss' href={weblink} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page1.png")} alt="" /></a>
                                                <a className='linkss' href={twitterlink} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page4.png")} alt="" /></a>
                                                <a className='linkss' href={telegramlink} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page3.png")} alt="" /></a>
                                                {mediumlink?
                                                    <a className='linkss' href={mediumlink} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page5.png")} alt="" /></a> : ""
                                                }
                                                {discardlink ?
                                                    <a className='linkss' href={discardlink} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page2.png")} alt="" /></a> : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-inner">
                                        <button className="button-one" type="button">CLOSED</button>
                                        {/* <button className="button-two" type="button">Tier {tier}</button> */}
                                     
                                    </div>
                                </div>
                                <div className="para">
                                    <p className="para-one">{description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-8 col-md-12 col-12 offset-xl-0   offset-0">
                            <div className="main-right-side">
                                <div className="wallet-balance">
                                    <div className="wallet-balancess">
                                        <h6>Your Current Contribution</h6>
                                        <div className="image-text">
                                            <img src={require("../../static/images/submit-form/coin-bnb.png")} alt="" />
                                            <h4>{TierContribute / (10 ** 18)} BNB</h4>
                                        </div>
                                        <h6>Your Tokens</h6>
                                        <div className="image-text">
                                            <img src={logo} style={{ width: 30, height: 30, borderRadius: '50%', marginTop: 5 }} alt="" />
                                            <h4>{(TierContribute / (10 ** 18)) / (price)} {symbol}</h4>
                                        </div>
                                    </div>
                                    <hr className="hr-submit-form"></hr>
                                    <div className="form-bnb">
                                        
                                        {symbol === 'HERON' || symbol === 'heron'? 
                                           <div style={{ fontSize: 16, textAlign: 'center', fontWeight: 600 }}>
                                           <p style={{ color: 'green' }}>Tokens will be distributed manually as per vesting schedule
                                           </p>
                                       </div> : 

                                    <div>
                                       
                                       <div style={{ fontSize: 16, textAlign: 'center', fontWeight: 600 }}>
                                       <p style={{ color: 'green' }}>Presale Ended!You can reedem {firstIterationPercentage}% of<br />
                                           your tokens   after presale finalize.
                                       </p>
                                   </div>
                                    
                                       { TierContribute>0?
                                        <div className="buttons">
                                            <button type="button" className="vested_btn" onClick={FirstClaimToken}>REDEEM</button>
                                        </div>:
                                        <div className="buttons">
                                           <button type="button" className="vested_btn1" onClick={FirstClaimToken}>REDEEM</button>
                                         </div>
                                       }
                                        {/* <div style={{ fontSize: 16, textAlign: 'center', marginTop: 20, fontWeight: 600 }}>
                                            <p style={{ color: 'green' }}>You can reedem {secondIterationPercentage}% of Your tokens<br />
                                                on {secondClaimTime}
                                            </p>
                                        </div>
                                        <div className="buttons">
                                            <button type="button" className={now > period ? "vested_btn" : "vested_btn1"} onClick={VestedClaimToken}>REDEEM</button>
                                        </div>
                                        <div style={{ fontSize: 16, textAlign: 'center', marginTop: 20, fontWeight: 600 }}>
                                            <p style={{ color: 'green' }}>You can reedem {thirdIterationPercentage}% of Your tokens<br />
                                                on {thirdClaimTime}
                                            </p>
                                        </div>
                                        <div className="buttons">
                                            <button type="button" className={now > period ? "vested_btn" : "vested_btn1"} onClick={SecondVestedClaimToken}>REDEEM</button>
                                        </div>
                                         */}
                                        {/* ------------------Joinnning Pool MODAL----------------- */}
                                        <Modal isOpen={show} toggle={props.toggleBuyWallet} className="register-modal joining-pool-modal">
                                            <ModalHeader toggle={props.toggleBuyWallet}>
                                                <button type="button" class="close" data-dismiss="modal" onClick={() => setshow(false)} aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </ModalHeader>
                                            <ModalBody className="modal-body">
                                                <div className="container main-divs">
                                                    <h1>Joining the pool</h1>
                                                    <div className="transaction-approved">
                                                        <h2 className="main-h">Transaction approved!</h2>
                                                        <h3 className="main-hthree">You have successfully joined this pool</h3>
                                                    </div>
                                                </div>
                                            </ModalBody>
                                        </Modal>

                                       </div>
                                    }
                                    </div>
                                </div>
                                <div className="pool-details">
                                    <div className="poor-detailss">
                                        <h6>Pool Details</h6>
                                        <p>Price: {price} BNB Per {symbol}</p>
                                        <p>For Sale:{tokenSale} {symbol}</p>
                                        <p>Max contribution: {tierMaxValue} BNB</p>
                                        <p>Min contribution: {tierMinValue} BNB</p>
                                    </div>
                                    <div className="calender">
                                        <h1>CLOSED</h1>
                                        <div className="main-calender">
                                            <h1>0 <br></br><span>DAYS</span></h1>
                                            <h1>0 <br></br><span>HRS</span></h1>
                                            <h1>0 <br></br><span>MIN</span></h1>
                                            <h1>0 <br></br><span>SEC</span></h1>
                                        </div>
                                        <p>{prersaleTime?.toUTCString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
        </>
    );
}
export default ClosePool

