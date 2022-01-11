import React, { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core'
import './index.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PoolDataFetcher from '../../hooks/PoolDataFetcher';
import { Contribute } from '../../hooks/PoolDataFetcher';
import {WhiteListedAllTiers} from '../../hooks/PoolDataFetcher'
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { MDBProgress } from 'mdbreact';

const ComingPool = (props) => { 
    const store = useSelector((state) => state.PoolActiveReducer.PendingData);
    const id = props.match.params.id;
    const tier = props.match.params.tier;
    let tierMinValue = '';
    let tierMaxValue = '';
    let tier1Allocation='';
    let tier2Allocation='';
    let tier3Allocation='';
    let TotalBnbinOneTier='';
    let TotalBnbinTwoTier='';
    let TotalBnbinThreeTier='';
    let progressValue='';
    let logo='';
    let name = '';
    let description = '';
    let weblink = '';
    let twitterlink = '';
    let telegramlink = '';
    let mediumlink = '';
    let discardlink = '';
    let symbol = '';
    let tokenPriceInBNB='' ;
    let tokenAddress='';
    let prersaleTime = new Date()
    let amountAllocatedForPresale='';
    let preSaleStartDateAndTime='';
    let preSaleEndDateAndTime='';
    store.find((elem) => {
        if(elem.id==id){
            console.log('elem:::' , elem)
        logo=elem.logoURL
        name=elem.projectName;
        description = elem.projectDescription
        weblink= elem.websiteLink.includes("https://") ? elem.websiteLink : `https://${elem.websiteLink}`  ;
        twitterlink= elem.twitterLink.includes("https://") ? elem.twitterLink : `https://${elem.twitterLink}` ;
        telegramlink= elem.telegramlink.includes("https://") ? elem.telegramlink : `https://${elem.telegramlink}` ;
        mediumlink= elem.mediumLink.includes("https://") ? elem.mediumLink : `https://${elem.mediumLink}` ;
        discardlink= elem.discrodLink.includes("https://") ? elem.discrodLink : `https://${elem.discrodLink}` ;
        symbol=elem.symbol;
        tokenPriceInBNB=elem.tokenPriceInBNB;
        tokenAddress=elem.contractAddressDeployed;
        amountAllocatedForPresale=elem.amountAllocatedForPresale;
        preSaleEndDateAndTime= elem.preSaleEndDateAndTime;
        preSaleStartDateAndTime=elem.preSaleStartDateAndTime;    
    }
    if (tier == 1) {
        tierMinValue = elem.minAllocationPerUser;
        tierMaxValue = elem.maxAllocationPerUser;
        tier1Allocation=elem.tier1Allocation;
        TotalBnbinOneTier=elem.TotalBnbinOneTier
        progressValue= ((((TotalBnbinOneTier/( 10**18) / tokenPriceInBNB))/((amountAllocatedForPresale)*(tier1Allocation/100)))*100).toFixed(3)
        prersaleTime = new Date(elem.preSaleEndDateAndTime * 1000);
        }
        // if (tier == 2) {
        //     tierMinValue = elem.tier2MinAmountPerUserInBNB;
        //     tierMaxValue = elem.tier2MaxAmountPerUserInBNB;
        //     tier2Allocation=elem.tier2Allocation;
        //     TotalBnbinTwoTier=elem.TotalBnbinTwoTier;
        //     progressValue= ((((TotalBnbinTwoTier/( 10**18) / tokenPriceInBNB))/((amountAllocatedForPresale)*(tier2Allocation/100)))*100).toFixed(3)
        // prersaleTime = new Date(elem.t2EndTime * 1000);

        // }
        // if (tier == 3) {
        //     tierMinValue = elem.tier3MinAmountPerUserInBNB;
        //     tierMaxValue = elem.tier3MaxAmountPerUserInBNB;
        //     tier3Allocation=elem.tier3Allocation;
        //     TotalBnbinThreeTier=elem.TotalBnbinThreeTier
        //     progressValue= ((((TotalBnbinThreeTier/( 10**18) / tokenPriceInBNB))/((amountAllocatedForPresale)*(tier3Allocation/100)))*100).toFixed(3)
        // prersaleTime = new Date(elem.t3EndTime * 1000);

        // }
        // if (tier == 4) {
        //     tierMinValue = elem.tier4MinAmountPerUserInBNB;
        //     tierMaxValue = elem.tier4MaxAmountPerUserInBNB;
        // }

    })
    const [amount, setAmount] = useState(0)
    const [show, setshow] = useState(false);
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    function timer(time) {
        var time= new Date(preSaleEndDateAndTime * 1000);
        var now = new Date()
        var diff = time.getTime() - now.getTime()
        if (diff <= 0) {
            return;
        }
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor(diff / (1000 * 60 * 60));
        var mins = Math.floor(diff / (1000 * 60));
        var secs = Math.floor(diff / 1000);
        var d = days;
        var h = hours - days * 24;
        var m = mins - hours * 60;
        var s = secs - mins * 60;
        setDay(d);
        setHour(h);
        setMin(m);
        setSec(s)
    }
    useEffect(() => {
        timerdata();
    }, [tier])
    // http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:4750/
    const timerdata = async () => {
        try {
            axios.get("http://34.211.81.68:4750/project/" + id)
                .then((response) => {
                    var time = new Date(response.data.msg.preSaleStartDateAndTime);
                    if (tier == 1) {
                        time.setHours(new Date(response.data.msg.preSaleStartDateAndTime).getHours() + 8)
                    } else if (tier == 2) {
                        time.setHours(new Date(response.data.msg.preSaleStartDateAndTime).getHours() + 22)
                    } else if (tier == 3) {
                        time.setHours(new Date(response.data.msg.preSaleStartDateAndTime).getHours() + 24)
                        time.setMinutes(new Date(response.data.msg.preSaleStartDateAndTime).getMinutes() + 10)
                    } else {
                        time = new Date(response.data.msg.preSaleEndDateAndTime)
                    }
                    setInterval(() => {
                        timer(time);
                    }, 1000)
                });
        }
        catch (err) {
            return false;
       }
    }
    const { account } = useWeb3React();

    const { onTransfer } = PoolDataFetcher(tokenAddress, amount);
    const { WhiteListTiers } = WhiteListedAllTiers(tokenAddress);
    const { tier1Con } = Contribute(tokenAddress);
    const [TierContribute, setTierContribute] = useState('0');
    const contribute = useCallback(async (e) => {
        if (account && tokenAddress) {
            try {
                const tier1 = await tier1Con();
                if (tier == 1) { setTierContribute(tier1.tier1Contribute) }
                if (tier == 2) { setTierContribute(tier1.tier2Contribute) }
                if (tier == 3) { setTierContribute(tier1.tier3Contribute) }
            }
            catch (err) {
                return false
            }
        }
        else {
            return 0;
        }
    }, [tier1Con])
    console.log('hereeeeeeeee', TierContribute)
    const JoinPool = useCallback(async (e) => {
        e.preventDefault();
        if (account) {
            try {            
                if (tier == 1 && amount <= tierMaxValue && amount >= tierMinValue) {
                    const pay = await onTransfer();              
                }
                else if (tier == 2 && amount <= tierMaxValue && amount >= tierMinValue) {
                    const pay = await onTransfer();  
                }
                else if (tier == 3 && amount <= tierMaxValue && amount >= tierMinValue) {
                    const pay = await onTransfer();
                }
                else if (tier == 4 && amount <= tierMaxValue && amount >= tierMinValue) {
                    const pay = await onTransfer();
                }
                else {
                    toast.error('Invalid Value', {
                        position: "top-right",
                        autoClose: 2000,
                    });
                }
            }
            catch (err) {
                return false;
            }
        }
        // else {
        //     login("injected")
        // }

    }, [onTransfer])

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

    useEffect(() => {
        CheckWhiteList();
        contribute();
    }, [account, tokenAddress])

    return (
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
                                                {mediumlink ?
                                                    <a className='linkss' href={mediumlink} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page5.png")} alt="" /></a> : ""
                                                }
                                                {discardlink ?

                                                    <a className='linkss' href={discardlink} target="_blank"><img src={require("../../static/images/landing-leocorn/pool-page2.png")} alt="" /></a> : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-inner">
                                        <button className="button-one-one" type="button">Coming Soon</button>
                                        {/* <button className="button-two" type="button">Tier {tier}</button> */}
                                        {/* {whiteList?
                                        <button className="button-three" type="button">WhiteListed</button>:
                                        <button className="button-four" type="button">Not WhiteListed</button>} */}
                                        {/* <div className="text_main"><p>{progressValue}%</p></div> */}
                                    {/* <div class="progress">
                                     <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                       </div> */}
                                          {/* <MDBProgress material  value={progressValue} /> */}
                                      
                                    </div>
                                </div>
                                <div className="para">
                                    <p className="para-one">{description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-8 col-md-12 col-12 offset-xl-0   offset-0">
                            <div className="main-right-side">
                                {/* <div className="wallet-balance">
                                    <div className="wallet-balancess">
                                        <h6>Your Current Contribution</h6>
                                        <div className="image-text">
                                            <img src={require("../../static/images/submit-form/coin-bnb.png")} alt="" />
                                            <h4>{TierContribute / (10 ** 18)} BNB</h4>
                                        </div>
                                        <div className="image-text">
                                            <img src={logo} style={{ width: 30, height: 30, borderRadius: '50%', marginTop: 5 }} alt="" />
                                            <h4>{(TierContribute ) / (tokenPriceInBNB)} {symbol}</h4>
                                        </div>
                                    </div>
                                    <hr className="hr-submit-form"></hr>
                                    <div className="form-bnb">
                                        {TierContribute != tierMaxValue ?
                                            <form>
                                                <div class="form-group">
                                                    <label for="example">Your Contribution</label>
                                                    <input type="number" class="form-control" id="example"
                                                        value={amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                        aria-describedby="text" placeholder="0.0" />
                                                    <div className="bnb-drop">
                                                        <div className="drop-down-single-line">
                                                            <div class="dropdown show">
                                                                <a class=" " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <span className="image"><img src={require("../../static/images/submit-form/coin-bnb.png")} alt="" /></span>BNB<span className="main-carret"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                              
                                               <div className="buttons">
                                                 <button type="button" onClick={JoinPool}>CONTRIBUTE & JOIN POOL</button>
                                                
                                             </div>
                                            </form> :
                                            <div style={{ fontSize: 16, display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                                                <p style={{ color: 'yellow' }}>This Presale is currently in progress</p>
                                            </div>
                                        }
                                   
                                    </div>
                                </div> */}
                                <div className="pool-details">
                                    <div className="poor-detailss">
                                        <h6>Pool Details</h6>
                                        <p>Price: {tokenPriceInBNB  } BNB Per {symbol} </p>
                                        {/* <p>Price: {tokenSale} BNB = 100,000,000 ${symbol}</p> */}
                                        <p>For Sale:{amountAllocatedForPresale} {symbol}</p>
                                        <p>Max contribution: {tierMaxValue} BNB</p>
                                        <p>Min contribution: {tierMinValue} BNB</p>
                                    </div>
                                    {/* <div className="calender">
                                        <h1>Start IN</h1>
                                        <div className="main-calender">
                                            <h1>{day} <br></br><span>DAYS</span></h1>
                                            <h1>{hour} <br></br><span>HRS</span></h1>
                                            <h1>{min} <br></br><span>MIN</span></h1>
                                            <h1>{sec} <br></br><span>SEC</span></h1>
                                        </div>
                                        <p>{prersaleTime.toUTCString()}</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
export default ComingPool

