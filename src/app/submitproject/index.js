import React, { useCallback, useState } from 'react';
import './index.css';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useWeb3React } from '@web3-react/core'
import Getweb3 from '../../hooks/Getweb3';
import Web3 from "web3";
import axios from 'axios';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Environment from '../../utils/Environment';
import DeployContact from '../../hooks/DeployContact'
import ApproveContract, { BalanceOfContract, BalanceOfDiscountToken } from '../../hooks/approve'
import BigNumber from 'bignumber.js';
// import { useHistory } from "react-router-dom";

const SubmitProject = () => {

    //let history = useHistory();
    const { account } = useWeb3React();
    const [open, setOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectSymbol, setProjectSymbol] = useState('');
    const [kycFirstName, setkycFirstName] = useState('');
    const [kycSecondName, setkycSecondName] = useState('');
    const [projectDescription, setprojectDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [logokyc, setLogoKyc] = useState('');
    const [logo64, setLogo64] = useState('');
    const [logo64kyc, setLogo64kyc] = useState('');
    const [selectedImg, setSelectedImg] = useState([]);
    const [selectedImgkyc, setSelectedImgkyc] = useState([]);
    const [logoUrlkyc, setLogoUrlkyc] = useState([]);
    const [logoUrl, setLogoUrl] = useState([]);
    const [contractAddress, setContractAddress] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [twitterLink, setTwitterLinkt] = useState('');
    const [telegramLink, setTelegramLink] = useState('');
    //optional link
    const [discardLink, setDiscardLink] = useState('');
    const [mediumLink, setMediumLink] = useState('');

    const [personName, setPersonName] = useState('');
    const [personEmail, setPersonEmail] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const [totalSupply, setTotalSupply] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [dateend, setDateEnd] = useState('');
    const [datefirst, setDatefirst] = useState('');
    const [datesecond, setDatesecond] = useState('');
    const [datethird, setDatethird] = useState('');
    //new field
    const [decimals, setDecimals] = useState('');
    const [price, setPrice] = useState('');
    const [iteration1, setIteration1] = useState('');
    const [iteration2, setIteration2] = useState('');
    const [iteration3, setIteration3] = useState('');
    const [getToken, setTotalToken] = useState('');
    const [minAllocationPerUser, setminAllocationPerUser] = useState('');
    const [maxAllocationPerUser, setmaxAllocationPerUser] = useState('');

    const [liquidityPercentage, setliquidityPercentage] = useState('');
    const [launchPadFeePercentage, setlaunchPadFeePercentage] = useState('');


    const [projectNameError, setProjectNameError] = useState({});
    const [projectSymbolError, setProjectSymbolError] = useState({});
    const [projectDescriptionError, setProjectDescriptionError] = useState({});
    const [logoError, setlogoError] = useState({});

    const [contractAddressError, setContractAddressError] = useState({});
    const [websiteLinkError, setwebsiteLinkError] = useState({});
    const [twitterLinkError, settwitterLinkError] = useState({});
    const [telegramLinkError, settelegramLinkError] = useState({});

    const [personNameError, setpersonNameError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [walletAddressError, setWalletAddressError] = useState({});
    const [tokenListingPriceInBNB, setlistingPrice] = useState('');

    const [minallo, setMinTotalAllocationError] = useState({});
    const [maxallo, setMaxTotalAllocationError] = useState({});

    const [totalSupplyError, setTotalSupplyError] = useState({});
    const [amountError, setAmountError] = useState({});
    const [dateError, setDateError] = useState({});

    const [decimalsError, setDecimalsError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [iteration1Error, setIteration1Error] = useState('');
    const [iteration2Error, setIteration2Error] = useState('');
    const [liquidityPercentageError, setliquidityPercentageError] = useState('');

    const [Tierdiscount, setTierdiscount] = useState(0)
    const { deployprojectonlaunchpad } = DeployContact();
    const { Approvetoken } = ApproveContract(contractAddress);
    const { BalanceOfToken } = BalanceOfContract(contractAddress);
    const { BalanceOfTokenDiscount } = BalanceOfDiscountToken(Environment.TokenDiscount);
    const handleImageChange = (e) => {

        setLogo(e.target.value);
        setSelectedImg([]);
        if (e.target.files) {
            const filesarray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImg((preImage) => preImage.concat(filesarray));
            Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setLogoUrl(filesarray)
        }
        var files = e.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = _handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
    }

    const handlekycImageChange = (e) => {

        setLogoKyc(e.target.value);
        setSelectedImgkyc([]);
        if (e.target.files) {
            const filesarray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

            setSelectedImgkyc((preImage) => preImage.concat(filesarray));
            Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setLogoUrlkyc(filesarray)
        }
        var files = e.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = _handleReaderLoadedkyc.bind(this);

            reader.readAsBinaryString(file);
        }
    }

    const handleChangeDate = (e) => {
        // const d=new Date(e.target.value);
        // setDate(d)
        setDate(e.target.value)
    }
    const handlePresaleEndDate = (e) => {
        // const d=new Date(e.target.value);
        // setDate(d)
        setDateEnd(e.target.value)
    }
    const firstClaimDate = (e) => {
        // const d=new Date(e.target.value);
        // setDate(d)
        setDatefirst(e.target.value)
    }
    const secondClaimDate = (e) => {
        // const d=new Date(e.target.value);
        // setDate(d)
        setDatesecond(e.target.value)
    }
    const thirdClaimDate = (e) => {
        // const d=new Date(e.target.value);
        // setDate(d)
        setDatethird(e.target.value)
    }

    const _handleReaderLoaded = (readerEvt) => {
        var binaryString = readerEvt.target.result;
        var base64textString = btoa(binaryString);
        var base64 = base64textString
        setLogo64(base64)

    }

    const _handleReaderLoadedkyc = (readerEvt) => {
        var binaryString = readerEvt.target.result;
        var base64textString = btoa(binaryString);
        var base64 = base64textString
        setLogo64kyc(base64)

    }


    const renderPhotos = (source) => {
        return source.map((photo) => {
            return <img src={photo} alt="" width="200" height="200" key={photo} />
        })
    }
    const renderPhotoskyc = (source) => {
        return source.map((photo) => {
            return <img src={photo} alt="" width="200" height="200" key={photo} />
        })
    }



    const result = Web3.utils.isAddress(contractAddress);
    const result1 = Web3.utils.isAddress(walletAddress);

    const SubmitForm = useCallback(async (e) => {
        
        e.preventDefault();
        formValidation();

        try {
            // && totalSupply !== '' && amount !== '' && date !== '' && decimals !== '' && contractAddress !== ''
            //     && price !== '' && iteration1 !== '' && iteration2 !== ''   totalSupplyOfToken: totalSupply, preSaleStartDateAndTime: '', amountAllocatedForPresale: amount,
            //  tokenDecimals: decimals, tokenPriceInBNB: price, firstIterationPercentage: iteration1, secondIterationPercentage: iteration2
            if (projectName !== '' && projectSymbol !== '' && projectDescription !== '' && logo64 !== ''
                && websiteLink !== '' && twitterLink !== '' && telegramLink !== '' && personName !== '' && personEmail !== '' && totalSupply !== '' && amount !== '' && date !== '' && decimals !== '' && contractAddress !== ''
                && walletAddress !== '' && tokenListingPriceInBNB !== '' && liquidityPercentage!=='') {

                const epochStartTime = new Date(date).getTime() / 1000.0;
                const epochEndTime = new Date(dateend).getTime() / 1000.0;
                const tokenPriceInBNB = new BigNumber(price).multipliedBy(new BigNumber(10).pow(18));
                const PancaketokenListingPriceInBNB = new BigNumber(tokenListingPriceInBNB).multipliedBy(new BigNumber(10).pow(18));
                const maxAllocationPerUsers = new BigNumber(maxAllocationPerUser).multipliedBy(new BigNumber(10).pow(18));
                const minAllocationPerUsers = new BigNumber(minAllocationPerUser).multipliedBy(new BigNumber(10).pow(18));
                const amountAllocatedForPresale = new BigNumber(amount);

                const maxCap = (amountAllocatedForPresale).multipliedBy(tokenPriceInBNB);

                const _liquidityPercentage = new BigNumber(liquidityPercentage);
                const launchPadFeePercentage = new BigNumber(2);
                const participationBalanceTokens = (maxCap).dividedBy(tokenPriceInBNB).multipliedBy(new BigNumber(10).pow(decimals));
                const liquidityBalanceTokens = participationBalanceTokens.multipliedBy(_liquidityPercentage).dividedBy(new BigNumber(100));
                const launchPadBalanceTokens = participationBalanceTokens.multipliedBy(launchPadFeePercentage).dividedBy(new BigNumber(100));
                const totalTokens = participationBalanceTokens.plus(liquidityBalanceTokens).plus(launchPadBalanceTokens).dividedBy(new BigNumber(10).pow(18));

                const totalTokensinWei = participationBalanceTokens.plus(liquidityBalanceTokens).plus(launchPadBalanceTokens);

                const tier1Requirements = 3000000;
                const tier2Requirements = 2000000;
                 const tier3Requirements = 1000000;
        
                const tier1DiscountPercentage = 25;
                const tier2DiscountPercentage = 20;
                const tier3DiscountPercentage = 10;
        
                var discounted=0
                setOpen(true)
           //     console.log("hereeeeeeeee", totalTokens);
             //  let BalanceOfContract = await BalanceOfToken();
          //      console.log("balvvvvvvvvvvvvvv", BalanceOfContract);
              
             //   console.log("consile",BalanceOfContract >= totalTokensinWei.toNumber().toString())
                //   if (BalanceOfContract >= totalTokensinWei.toNumber().toString()) {
                    let approve = await Approvetoken(Environment.DeployerAddress, totalTokens);
                 //   debugger
                    if (approve.status) {

                     
                        let tokencontractofdiscountinwei = await BalanceOfTokenDiscount();
                        let tokencontractofdiscount = tokencontractofdiscountinwei / 10 ** 18;
                
                        if (tokencontractofdiscount >= tier1Requirements) {
                            discounted=tier1DiscountPercentage
                        }
                        else if (tokencontractofdiscount >= tier2Requirements) {
                            discounted=tier2DiscountPercentage
                        }
                        else if (tokencontractofdiscount >= tier3Requirements) {
                            discounted=tier3DiscountPercentage
                        }
                        else {
                            discounted=0
                        }
                    
                         const discount = 1 - ((1 * discounted) / 100);

                        const leoCornArguments = ({
                            nameOfProject: projectName,
                            _saleStartTime: epochStartTime,
                            _saleEndTime: epochEndTime,
                            _projectOwner: walletAddress,
                            tokenToIDO: contractAddress,
                            tokenDecimals: decimals,
                            _numberOfIdoTokensToSell: amountAllocatedForPresale.toNumber().toString(),
                            _tokenPriceInBNB: tokenPriceInBNB.toNumber().toString(),
                            _tokenListingPriceInBNB: PancaketokenListingPriceInBNB.toNumber().toString(),
                            maxAllocaPerUser: maxAllocationPerUsers.toNumber().toString(),
                            minAllocaPerUser: minAllocationPerUsers.toNumber().toString(),
                            liquidityPercentage: liquidityPercentage,


                        })

                        console.log("argssssssssssssssssssssssssssssssssssssssssssss", leoCornArguments);


                     
                        
                     //   const  discount=1;
                        let deployer = await deployprojectonlaunchpad(leoCornArguments, discount)
                        let contractAddressDeployed = deployer.events.OwnershipTransferred[0].address;


                        await axios.post('http://34.211.81.68:4750/project/createProject', {
                            projectName: projectName, symbol: projectSymbol,
                            projectDescription: projectDescription, logoURL: logo64, contractAddress: contractAddress, websiteLink: websiteLink,
                            twitterLink: twitterLink, telegramlink: telegramLink, discrodLink: discardLink, mediumLink: mediumLink,
                            contactPersonName: personName, contactPersonEmail: personEmail, contactPersonWalletAddress: walletAddress, totalSupplyOfToken: totalSupply, preSaleStartDateAndTime: date, amountAllocatedForPresale: amount, preSaleEndDateAndTime: dateend,
                            tokenDecimals: decimals, tokenPriceInBNB: price, firstIterationPercentage: '100', secondIterationPercentage: '0', thirdIterationPercentage: '0', firstClaimTime: dateend, secondClaimTime: dateend, thirdClaimTime: dateend,
                            minAllocationPerUser: minAllocationPerUser, maxAllocationPerUser: maxAllocationPerUser, launchPadFeePercentage: '2', liquidityPercentage: liquidityPercentage, contractAddressDeployed: contractAddressDeployed, statusOfApplication: 'Approved', tokenListingPriceInBNB: tokenListingPriceInBNB, kycPassportPicture: logo64kyc, kycFirstName: kycFirstName, kycSecondName: kycSecondName
                        })
                            .then((response) => {
                                setOpen(false)
                                toast.success('Project Submitted', {
                                    position: "top-center",
                                    autoClose: 7000,
                                });
                             //   history.push("/projects");
                            });
                    }
                    else {
                        setOpen(false)
                        toast.error('Invalid Form Submission', {
                            position: "bottom-center",
                            autoClose: 2000,
                        });
                    }
                }
            
            //     else{
            //         setOpen(false)
            //     }
            // }
        }

        catch (err) {
            console.log("catcj",err);
            toast.error('Invalid Form Submission', {
                position: "bottom-center",
                autoClose: 2000,
            });
            setOpen(false)
            return false
        }

    })
    const formValidation = () => {
        const projectNameError = {};
        const projectSymbolError = {};
        const projectDescriptionError = {};
        const logoError = {};
        const contractAddressError = {};
        const websiteLinkError = {};
        const twitterLinkError = {};
        const telegramLinkError = {};
        const personNameError = {};
        const emailError = {};
        const walletAddressError = {};
        const totalSupplyError = {};
        const amountError = {};
        const dateError = {};
        //new filed
        const decimalsError = {};
        const priceError = {};
        const iteration1Error = {};
        const iteration2Error = {};
        const liquidityPercentageError = {};
        const minallo = {};
        const maxallo = {};
        let isValid = true;
        if (projectName === '') {
            projectNameError.nameError = "Project Name is Required";
            isValid = false;
        }
        if (projectSymbol === '') {
            projectSymbolError.symbolError = "Symbol is Required";
            isValid = false;
        }
        if (projectDescription === '') {
            projectDescriptionError.DespError = "Description is Required";
            isValid = false;
        }
        if (logo === '') {
            logoError.logoError = "Logo is Required";
            isValid = false;
        }
        if (contractAddress === '') {
            contractAddressError.contractError = "Contract Addresd is Required";
            isValid = false;
        } else if (!result) {
            contractAddressError.contractError = "Invalid Contract Address"
        }
        if (websiteLink === '') {
            websiteLinkError.websiteError = "Websitelink is Required";
            isValid = false;
        }
        if (twitterLink === '') {
            twitterLinkError.twitterError = "Twitterlink is Required";
            isValid = false;
        }
        if (telegramLink === '') {
            telegramLinkError.telegramError = "Telegramlink is Required";
            isValid = false;
        }

        if (personName === '') {
            personNameError.personNameError = "Person Name is Required";
            isValid = false;
        }

        if (personEmail === '') {
            emailError.emailError = "Email is Required";
            isValid = false;
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(personEmail)) {
            emailError.emailNameError = "Invalid Email";
            isValid = false;
        }
        if (walletAddress === '') {
            walletAddressError.walletAddressError = "Wallet Address is Required";
            isValid = false;
        }
        else if (!result1) {
            walletAddressError.walletAddressError = "Invalid Wallet Address"
        }
        if (totalSupply === '') {
            totalSupplyError.totalSupplyError = "Total Supply is Required";
            isValid = false;
        }
        if (amount === '') {
            amountError.amountError = "Amount is Required";
            isValid = false;
        }
        // else if (amount < totalSupply) {
        //     amountError.BigamountError = "Presale Amount is less than Total Supply.";
        //     isValid = false;
        // }
        if (date === '') {
            dateError.dateError = "Date is Required";
            isValid = false;
        }
        //new 
        if (decimals === '') {
            decimalsError.decimalsError = "Token Decimals is Required";
            isValid = false;
        }
        if (price === '') {
            priceError.priceError = "Token Price is Required";
            isValid = false;
        }
        if (iteration1 === '') {
            iteration1Error.iteration1Error = "Iteration 1 is Required";
            isValid = false;
        }
        if (iteration2 === '') {
            iteration2Error.iteration1Error = "Iteration 2 is Required";
            isValid = false;
        }
        if (liquidityPercentage === '' && liquidityPercentage < 51) {
            liquidityPercentageError.liquidityPercentage = "Pancake Liquidity must be greater than 51 %";
            isValid = false;
        }
        if (maxAllocationPerUser === '') {
            maxallo.AmountError = "Amount is Required";
            isValid = false;
        }
        if (minAllocationPerUser === '') {
            minallo.AmountError = "Amount is Required";
            isValid = false;
        }
        if (tokenListingPriceInBNB === '') {
            minallo.AmountError = "Amount is Required";
            isValid = false;
        }
        else if (minAllocationPerUser > maxAllocationPerUser) {
            minallo.BigamountError = "Max Allocation must be greater than Min Allocation";
            isValid = false;
        }
        setProjectNameError(projectNameError);
        setProjectSymbolError(projectSymbolError)
        setProjectDescriptionError(projectDescriptionError);
        setlogoError(logoError);
        setContractAddressError(contractAddressError);
        setwebsiteLinkError(websiteLinkError);
        settwitterLinkError(twitterLinkError);
        settelegramLinkError(telegramLinkError);

        setpersonNameError(personNameError);
        setEmailError(emailError);
        setWalletAddressError(walletAddressError);
        setTotalSupplyError(totalSupplyError);
        setAmountError(amountError);
        setDateError(dateError);
        //new
        setMinTotalAllocationError(minallo);
        setMaxTotalAllocationError(maxallo);
        setDecimalsError(decimalsError);
        setPriceError(priceError);
        setIteration1Error(iteration1Error);
        setIteration2Error(iteration2Error);
        setliquidityPercentageError(liquidityPercentageError)
        return isValid;
    }
    return (
        <>
            <Backdrop className="loader" xs={{ color: '#fff' }} open={open}><CircularProgress color="primary" style={{ width: "100px", height: '100px' }} /></Backdrop>
            <div className='landing-nft submit-project'>
                <Navbar />
                <section className="header-section submit-projects" >
                    <img src={require("../../static/images/landing-leocorn/back-ground-header.png")} className="main-heads-ones" alt="" />
                    <div className="auto-container">
                        <div className="submit-project">
                            <div className="inner-submit-upper-div">
                                <h1>Submit Your Project</h1>
                                <p>* Required</p>
                                <p className='valide'>* To make sure there will be no issues during the presale time, please disable all reward and tax fee function in your token contract. </p>
                            </div>
                            <div className="container">
                                <form >
                                    <div className="row">
                                        <div className="col-xl-8 col-lg-8 col-md-12">
                                            <div className="inner-submit-lower-div">
                                                <h4>Basic Details</h4>
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Project Name<span>*</span></label>
                                                            <input value={projectName} onChange={(e) => setProjectName(e.target.value)} type="text" class="form-control" id="example" aria-describedby="text" placeholder="Enter your project name" />
                                                            {Object.keys(projectNameError).map((key) => {
                                                                // console.log("name",nameError);
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{projectNameError[key]}</p>
                                                                // return <ToastContainer className="inputErrors">{projectNameError[key]}<ToastContainer/>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleInputsymbol">Symbol<span>*</span></label>
                                                            <input value={projectSymbol} onChange={(e) => setProjectSymbol(e.target.value)} type="text" class="form-control" id="exampleInputsymbol" placeholder="Enter your project symbol" />
                                                            {Object.keys(projectSymbolError).map((key) => {
                                                                // console.log("name",nameError);
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{projectSymbolError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="exampleInputdescription">Project Description<span>*</span></label>
                                                            <textarea value={projectDescription} onChange={(e) => setprojectDescription(e.target.value)} class="form-control" placeholder="What is your project about" rows="3" id="comment"></textarea>
                                                            {Object.keys(projectDescriptionError).map((key) => {
                                                                return <p className="inputErrors">{projectDescriptionError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    {/* <div class="col-lg-12">
                                                <div class="form-group">
                                                    <label for="exampleInputsymbol">Upload Logo (500X500 pixels)<span>*</span></label>
                                                    <div className="dashed-border-new">
                                                        <div className="main-image-div"> */}
                                                    {/* <img src={logo?logo:require("../../static/images/submit-form/cloud.png")} alt="" /> */}
                                                    {/* {selectedImg ? renderPhotos(selectedImg) : null}
                                                        </div>
                                                    </div>
                                                    <p><span><input type="file"
                                                        value={logo}
                                                        onChange={handleImageChange}
                                                        name="avatar" className="custom-file-inputt" accept="image/*" id="contained-button-file" /></span></p>
                                                    {Object.keys(logoError).map((key) => {
                                                        return <p className="inputErrors">{logoError[key]}</p>
                                                    })}
                                                </div>
                                            </div> */}
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="exampleInputcontractaddress">Project Contract Address<span>*</span></label>
                                                            <input type="text" value={contractAddress}
                                                                onChange={(e) => setContractAddress(e.target.value)}
                                                                class="form-control" id="exampleInputcontractaddress" placeholder="Enter Contract Address of your project" />
                                                            {Object.keys(contractAddressError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{contractAddressError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 col-md-12 col-12 ">
                                            <div className="right-side-main-image inner-submit-lower-div ">

                                                <div class="form-group">
                                                    <label for="exampleInputsymbol">Upload Logo (500X500 pixels)<span>*</span></label>
                                                    <div className="dashed-border-new">
                                                        <div className="main-image-div main-bvc">
                                                            <img src={logo ? logo : require("../../static/images/submit-form/cloud.png")} alt="" />
                                                            {selectedImg ? renderPhotos(selectedImg) : null}
                                                        </div>
                                                        <p className="text-center"><span>
                                                            <label for="filess" className="msindh">Upload Image</label>
                                                            <input type="file" id="filess"
                                                                value={logo}
                                                                onChange={handleImageChange}
                                                                name="avatar" className="d-none custom-file-inputt" accept="image/*" />
                                                        </span></p>
                                                        {Object.keys(logoError).map((key) => {
                                                            return <p className="inputErrors">{logoError[key]}</p>
                                                        })}
                                                    </div>

                                                </div>
                                            </div>



                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-xl-8 col-lg-8 col-md-12">
                                            <div className="inner-submit-lower-div">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Contact Person Name<span>*</span></label>
                                                            <input type="text" value={personName}
                                                                onChange={(e) => setPersonName(e.target.value)}
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter Contact Person Name" />
                                                            {Object.keys(personNameError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{personNameError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleemail">Contact Person Email Address<span>*</span></label>
                                                            <input type="email" value={personEmail}
                                                                onChange={(e) => setPersonEmail(e.target.value)}
                                                                class="form-control" id="exampleemail" placeholder="Enter twitter link" />
                                                            {Object.keys(emailError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{emailError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="example">Token Owner Wallet Address<span>*</span></label>
                                                            <input type="text" value={walletAddress}
                                                                onChange={(e) => setWalletAddress(e.target.value)}
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter Contact Person’s Wallet Address" />
                                                            {Object.keys(walletAddressError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{walletAddressError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-8 col-lg-8 col-md-12">
                                            <div className="inner-submit-lower-div">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Website Link<span>*</span></label>
                                                            <input type="text" value={websiteLink}
                                                                onChange={(e) => setWebsiteLink(e.target.value)}
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter website address " />
                                                            {Object.keys(websiteLinkError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{websiteLinkError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleInputsymbol">Twitter Link<span>*</span></label>
                                                            <input type="text" value={twitterLink}
                                                                onChange={(e) => setTwitterLinkt(e.target.value)}
                                                                class="form-control" id="exampleInputsymbol" placeholder="Enter twitter link " />
                                                            {Object.keys(twitterLinkError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{twitterLinkError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Telegram Link<span>*</span></label>
                                                            <input type="text" value={telegramLink}
                                                                onChange={(e) => setTelegramLink(e.target.value)}
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter Telegram link" />
                                                            {Object.keys(telegramLinkError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{telegramLinkError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleInputsymbol">Discord Link<span></span></label>
                                                            <input type="text"
                                                                value={discardLink}
                                                                onChange={(e) => setDiscardLink(e.target.value)}
                                                                class="form-control" id="exampleInputsymbol" placeholder="Enter Discord link " />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleInputsymbol">Medium Link</label>
                                                            <input type="text"
                                                                value={mediumLink}
                                                                onChange={(e) => setMediumLink(e.target.value)}
                                                                class="form-control" id="exampleInputsymbol" placeholder="Enter Medium link " />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-8 col-lg-10 col-md-12">
                                            <div className="inner-submit-lower-div">
                                                <h4>Presale Details</h4>
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Total Supply of Token<span>*</span></label>
                                                            <input type="number" value={totalSupply}
                                                                onChange={(e) => setTotalSupply(e.target.value)}
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter total supply of your token" />
                                                            {Object.keys(totalSupplyError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{totalSupplyError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleamount">Amount Allocated for Presale <span>*</span></label>
                                                            <input type="number" value={amount}
                                                                onChange={(e) => setAmount(e.target.value)}
                                                                class="form-control" id="exampleamount" placeholder="Enter total allocation for this presale" />
                                                            {Object.keys(amountError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{amountError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Token Decimals<span>*</span></label>
                                                            <input type="number" value={decimals}
                                                                onChange={(e) => setDecimals(e.target.value)}
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter Your Token Decimals" />
                                                            {Object.keys(decimalsError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{decimalsError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleamount">Presale Price in BNB<span>*</span></label>
                                                            <input type="number" value={price}
                                                                onChange={(e) => setPrice(e.target.value)}
                                                                class="form-control" id="exampleamount" placeholder="Enter Your Token Price" />
                                                            {Object.keys(priceError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{priceError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleamount">Listing Price in BNB<span>*</span></label>
                                                            <input type="number" value={tokenListingPriceInBNB}
                                                                onChange={(e) => setlistingPrice(e.target.value)}
                                                                class="form-control" id="exampleamount" placeholder="Enter Pancake Listing Price" />
                                                            {Object.keys(priceError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{priceError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleamount">Soft Cap</label>
                                                            <input type="number" value={amount * price * 0.5}
                                                               
                                                                class="form-control" id="exampleamount" placeholder="Soft Cap"  readOnly/>
                                                         
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleamount">Hard Cap</label>
                                                            <input type="number" value={amount * price}
                                                               
                                                                class="form-control" id="exampleamount" placeholder="Hard Cap" readOnly />
                                                         
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Presale Start Date & Time(UTC)<span>*</span></label>
                                                            <br></br>
                                                            <div class="sd-container">

                                                                <input class="sd"
                                                                    type="date"
                                                                    value={date}
                                                                    onChange={handleChangeDate}
                                                                    id="party" type="datetime-local" name="partydate"  ></input>
                                                                <span class="open-button">
                                                                    <button type="button">📅</button>
                                                                </span>
                                                                {Object.keys(dateError).map((key) => {
                                                                    console.log("key", key);
                                                                    return <p className="inputErrors">{dateError[key]}</p>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Presale End Date & Time(UTC)<span>*</span></label>
                                                            <br></br>
                                                            <div class="sd-container">
                                                                <input class="sd"
                                                                    type="date"
                                                                    value={dateend}
                                                                    onChange={handlePresaleEndDate}
                                                                    id="party" type="datetime-local" name="partydate" ></input>
                                                                <span class="open-button">
                                                                    <button type="button">📅</button>
                                                                </span>
                                                                {Object.keys(dateError).map((key) => {
                                                                    console.log("key", key);
                                                                    return <p className="inputErrors">{dateError[key]}</p>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleamount">Liquidity Percentage For Pancake <span>*</span></label>
                                                            <input type="number" value={liquidityPercentage}
                                                                onChange={(e) => setliquidityPercentage(e.target.value)}
                                                                class="form-control" id="exampleamount" placeholder="Enter Liquidity Percentage For Pancake" />
                                                            {/* <p className="errormsg">Pancake Liquidity must be greater than 51 %</p> */}
                                                            {Object.keys(liquidityPercentageError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{liquidityPercentageError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="exampleamount">LaunchPad Fee Percentage<span>*</span></label>
                                                            <input type="number" value={2}
                                                                onChange={(e) => setlaunchPadFeePercentage('2')}
                                                                class="form-control" id="exampleamount" placeholder="Enter LaunchPad Fee Percentage" readOnly />
                                                            {/* {Object.keys(amountError).map((key) => {
                                                            console.log("key", key);
                                                            return <p className="inputErrors">{amountError[key]}</p>
                                                        })} */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="row">
                                <div className="col-xl-8 col-lg-10 col-md-12">
                                    <div className="inner-submit-lower-div">
                                        <h4>Vesting Details</h4>
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="example">Iteration 1 Percentage<span>*</span></label>
                                                    <input type="number" value={iteration1}
                                                        onChange={(e) => setIteration1(e.target.value)}
                                                        class="form-control" id="example" aria-describedby="text" placeholder="Enter Your Iteration  1 Percentage" />
                                                    {Object.keys(iteration1Error).map((key) => {
                                                        
                                                        console.log("key", key);
                                                        return <p className="inputErrors">{iteration1Error[key]}</p>
                                                    })}
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="exampleamount">Iteration 2 Percentage <span>*</span></label>
                                                    <input type="number" value={iteration2}
                                                        onChange={(e) => setIteration2(e.target.value)}
                                                        class="form-control" id="exampleamount" placeholder="Enter Your Iteration 2 Percentage" />
                                                    {Object.keys(iteration2Error).map((key) => {
                                                        console.log("key", key);
                                                        return <p className="inputErrors">{iteration2Error[key]}</p>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="example">Iteration 3 Percentage<span>*</span></label>
                                                    <input type="number" value={iteration3}
                                                        onChange={(e) => setIteration3(e.target.value)}
                                                        class="form-control" id="example" aria-describedby="text" placeholder="Enter Your Iteration  1 Percentage" />
                                                    {Object.keys(iteration1Error).map((key) => {
                                                        
                                                        console.log("key", key);
                                                        return <p className="inputErrors">{iteration1Error[key]}</p>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                                    {/* <div className="row">
                                    <div className="col-xl-8 col-lg-10 col-md-12">
                                        <div className="inner-submit-lower-div">
                                            <h4>Claim Time</h4>
                                            <div class="row"> */}

                                    {/* <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label for="example"> Claim Date & Time<span>*</span></label>
                                                        <br></br>
                                                        <div class="sd-container">

                                                            <input class="sd"
                                                                type="date"
                                                                value={datefirst}
                                                                onChange={firstClaimDate}
                                                                id="party" type="datetime-local" name="partydate" ></input>
                                                            <span class="open-button">
                                                                <button type="button">📅</button>
                                                            </span>
                                                            {Object.keys(dateError).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{dateError[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div> */}
                                    {/* <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="example">Second Claim Start Date & Time<span>*</span></label>
                                                    <br></br>
                                                    <div class="sd-container">
                                                       
                                                        <input class="sd"
                                                            type="date"
                                                            value={datesecond}
                                                            onChange={secondClaimDate}
                                                            id="party" type="datetime-local" name="partydate" ></input>
                                                        <span class="open-button">
                                                            <button type="button">📅</button>
                                                        </span>
                                                        {Object.keys(dateError).map((key) => {
                                                            console.log("key", key);
                                                            return <p className="inputErrors">{dateError[key]}</p>
                                                        })}
                                                    </div>
                                                </div>
                                            </div> */}

                                    {/* <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="example">Third Claim Start Date & Time<span>*</span></label>
                                                    <br></br>
                                                    <div class="sd-container">
                                                       
                                                        <input class="sd"
                                                            type="date"
                                                            value={datethird}
                                                            onChange={thirdClaimDate}
                                                            id="party" type="datetime-local" name="partydate" ></input>
                                                        <span class="open-button">
                                                            <button type="button">📅</button>
                                                        </span>
                                                        {Object.keys(dateError).map((key) => {
                                                            console.log("key", key);
                                                            return <p className="inputErrors">{dateError[key]}</p>
                                                        })}
                                                    </div>
                                                </div>
                                            </div> */}
                                    {/* </div>
                                        </div>
                                    </div>
                                </div> */}
                                    <div className="row">
                                        <div className="col-xl-8 col-lg-10 col-md-12">
                                            <div className="inner-submit-lower-div">
                                                <h4>Allocation Limits </h4>
                                                <div class="row">

                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Min Allocation Per User(BNB)<span>*</span></label>
                                                            <input type="number" value={minAllocationPerUser}
                                                                onChange={(e) => setminAllocationPerUser(e.target.value)}
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter min allocation" />
                                                            {Object.keys(minallo).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{minallo[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Max Allocation Per User(BNB)<span>*</span></label>
                                                            <input type="number" value={maxAllocationPerUser}
                                                                onChange={(e) => setmaxAllocationPerUser(e.target.value)}
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter max allocation" />
                                                            {Object.keys(maxallo).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{maxallo[key]}</p>
                                                            })}
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-8 col-lg-10 col-md-12">
                                            <div className="inner-submit-lower-div">
                                                <h4>KYC Details</h4>
                                                <div class="row">

                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">First name of project owner</label>
                                                            <input type="text"
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter First Name" onChange={(e) => setkycFirstName(e.target.value)} />
                                                            {/* {Object.keys(minallo).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{minallo[key]}</p>
                                                            })} */}
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="example">Last name of project owner</label>
                                                            <input type="text"
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter Last Name" onChange={(e) => setkycSecondName(e.target.value)} />
                                                            {/* {Object.keys(maxallo).map((key) => {
                                                                console.log("key", key);
                                                                return <p className="inputErrors">{maxallo[key]}</p>
                                                            })} */}
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-4 col-md-12 col-12 ">
                                            <div className="right-side-main-image inner-submit-lower-div ">

                                                <div class="form-group">
                                                    <label for="exampleInputsymbol">Upload id or passport</label>
                                                    <div className="dashed-border-new">
                                                        <div className="main-image-div main-bvc">
                                                            <img src={logokyc ? logokyc : require("../../static/images/submit-form/cloud.png")} alt="" />
                                                            {selectedImgkyc ? renderPhotoskyc(selectedImgkyc) : null}
                                                        </div>
                                                        <p className="text-center"><span>
                                                            <label for="filees" className="mnjhks">Upload Image</label>
                                                            <input type="file" id="filees"
                                                                value={logokyc}
                                                                onChange={handlekycImageChange}
                                                                name="avatar" className="d-none custom-file-inputt" accept="image/*" />
                                                        </span></p>
                                                        {/* {Object.keys(logoError).map((key) => {
                                                            return <p className="inputErrors">{logoError[key]}</p>
                                                        })} */}
                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-8 col-lg-8 col-md-12">
                                            <div className="inner-submit-lower-div">
                                                <div class="row">
                                                    {/* <p> Total Token for Approval and Presale : {getToken}</p> */}
                                                </div>
                                                <div class="col-lg-6">
                                                    {!account ?
                                                        <div className="" >
                                                            <button type="button" className="disabled" disabled >Submit</button>

                                                        </div> : <div className="buttons-submit">
                                                            <button type="button" className="button_button" onClick={SubmitForm}>Submit</button>

                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>


                <Footer />




            </div>
        </>
    );
}

// }

export default SubmitProject;

