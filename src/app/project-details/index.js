
import { connect } from "react-redux";
import React, { useState,useEffect } from 'react';
import Web3 from "web3";
import './index.css';
import axios from 'axios';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const SubmitProject = (props) => {

        const [projectName,setProjectName]=useState('');
        const [inputs, setInputs] = useState({
            projectName:'', symbol:'', projectDescription:'', contractAddress:'', 
            websiteLink:'', twitterLink:'', telegramlink:'', discrodLink:'', mediumLink:'', 
            contactPersonName:'', contactPersonEmail:'' ,contactPersonWalletAddress:'',
            totalSupplyOfToken:'',preSaleStartDateAndTime:'',tokenDecimals:'',tokenPriceInBNB:'',
             amountAllocatedforPresale:'',tier1Allocation:'',tier1MaxAmountPerUserInBNB:'',tier1MinAmountPerUserInBNB:'',
             tier2Allocation:'', tier2MaxAmountPerUserInBNB:'', tier2MinAmountPerUserInBNB:'', tier3Allocation:'', 
             tier3MaxAmountPerUserInBNB:'', tier3MinAmountPerUserInBNB:'', tier4Allocation:'', tier4MaxAmountPerUserInBNB:'',
            tier4MinAmountPerUserInBNB:'',statusOfApplication:'Pending',maxAllocationPerUser:'',minAllocationPerUser:'',firstClaimTime:'',secondClaimTime:'',thirdClaimTime:'',firstIterationPercentage:'',secondIterationPercentage:'',thirdIterationPercentage:'',preSaleEndDateAndTime:'',liquidityPercentage:'',launchPadFeePercentage:''
        })
        const [projectSymbol,setProjectSymbol]=useState('');
        const [projectDescription,setprojectDescription]=useState('');
        const [logo,setLogo]=useState('');
        const [selectedImg,setSelectedImg]=useState([]);
        const [logoUrl,setLogoUrl]=useState([]);
        // console.log("logoUrl::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::",logoUrl);
        const handleImageChange=(e)=>{
            setLogo(e.target.value);
            setSelectedImg([]);
               if (e.target.files){
                   const filesarray=Array.from(e.target.files).map((file)=>URL.createObjectURL(file));
                //    console.log("filesarray:::::::::::::::::::::::::::::::",filesarray)
                   setSelectedImg((preImage)=>preImage.concat(filesarray));
                   Array.from(e.target.files).map((file)=>URL.createObjectURL(file))
                   setLogoUrl(filesarray)
               }
        }
        const renderPhotos=(source)=>{
            return source.map((photo)=>{
                return <img src={photo} alt="" width="200" height="200" key={photo} />    
            })
        }

    console.log("preSaleStartDateAndTime",inputs.preSaleStartDateAndTime);

        const getProjectDetail=async()=>{
            try {
        
                  await axios.post("http://34.211.81.68:4750/project/editProject",{...inputs,id,statusOfApplication:'Approved'})
                    .then((response) => {
                        console.log("response========edit>",response)
                        // getDate(response.data.msg)
                        toast.success('Project Approved Succesfully', {
                            position: "top-right",
                            autoClose: 2000,
                        });
                    });
          
              }
              catch (err) {
                toast.error('Project Not Approved', {
                    position: "bottom-center",
                    autoClose: 2000,
                });
                // eslint-disable-next-line no-console
                // console.log(err);
                // alert("Invalid Address")
          
          
          }
        }
        const getProjectRejected=async()=>{
            try {
        
                  await axios.post("http://34.211.81.68:4750/project/editProject",{id,statusOfApplication:'Rejected'})
                    .then((response) => {
                        console.log("response========edit>",response)
                        // getDate(response.data.msg)
                    });
              }
              catch (err) {
                // eslint-disable-next-line no-console
                // console.log(err);
                // alert("Invalid Address")
          
          
          }
        }
          
        const id=props.match.params.id;

        const handleChangeDate=(e)=>{
            const currentTimestamp=e.target.value;
            // console.log("currentTimestamp::::::::::=============",currentTimestamp);
            // let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
            // console.log("date::::::::::=============",date);
        }
        const [contractAddress,setContractAddress]=useState('');
        const [websiteLink,setWebsiteLink]=useState('');
        const [twitterLink,setTwitterLinkt]=useState('');
        const [telegramLink,setTelegramLink]=useState('');
    
        //optional link
        const [discardLink,setDiscardLink]=useState('');
        const [mediumLink,setMediumLink]=useState('');
    
        const [personName,setPersonName]=useState('');
        const [personEmail,setPersonEmail]=useState('');
        const [walletAddress,setWalletAddress]=useState('');
    
        const [totalSupply,setTotalSupply]=useState('');
        const [amount,setAmount]=useState('');
        const [date,setDate]=useState('');

        const [projectNameError,setProjectNameError]=useState({});
        const [projectSymbolError,setProjectSymbolError]=useState({});
        const [projectDescriptionError,setProjectDescriptionError]=useState({});
        const [logoError,setlogoError]=useState({});
    
        const [contractAddressError,setContractAddressError]=useState({});
        const [websiteLinkError,setwebsiteLinkError]=useState({});
        const [twitterLinkError,settwitterLinkError]=useState({});
        const [telegramLinkError,settelegramLinkError]=useState({});
    
        const [personNameError,setpersonNameError]=useState({});
        const [emailError,setEmailError]=useState({});
        const [walletAddressError,setWalletAddressError]=useState({});
    
        const [totalSupplyError,setTotalSupplyError]=useState({});
        const [amountError,setAmountError]=useState({});
        const [dateError,setDateError]=useState({});
        
        const [kycFirstName, setkycFirstName] = useState('');
        const [kycSecondName, setkycSecondName] = useState('');
    
        const result = Web3.utils.isAddress(contractAddress);
        const result1 = Web3.utils.isAddress(walletAddress);
        console.log("result",result);
    
        


        const formValidation=()=>{
           
            const projectNameError={};
            const projectSymbolError={};
            const projectDescriptionError={};
            const logoError={};
            const contractAddressError={};
            const websiteLinkError={};
            const twitterLinkError={};
            const telegramLinkError={};
            
            const personNameError={};
            const emailError={};
            const walletAddressError={};
    
            const totalSupplyError={};
            const amountError={};
            const dateError={};
            
    
       
            let isValid=true;
    
            
             if(projectSymbol===''){
                projectSymbolError.symbolError="Symbol is Required";
                isValid=false;
            }
             if(projectDescription===''){
                projectDescriptionError.DespError="Description is Required";
                isValid=false;
            }
           if(logo===''){
                logoError.logoError="Logo is Required";
                isValid=false;
           }
            if(contractAddress===''){
                contractAddressError.contractError="Contract Addresd is Required";
                isValid=false;
            }else if(!result){
                contractAddressError.contractError="Invalid Contract Address"
            }
        
             if(websiteLink===''){
                websiteLinkError.websiteError="Websitelink is Required";
                isValid=false;
            }
             if(twitterLink===''){
                twitterLinkError.twitterError="Twitterlink is Required";
                isValid=false; 
            }
            if(telegramLink===''){
                telegramLinkError.telegramError="Telegramlink is Required";
                isValid=false;
            }
          
            if(personName===''){
                personNameError.personNameError="Person Name is Required";
                isValid=false;
            }
            
             if(personEmail===''){
                emailError.emailError="Email is Required";
                isValid=false;
            }
            else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(personEmail)){
                emailError.emailNameError="Invalid Email";
                isValid=false;
            }
             if(walletAddress===''){
                walletAddressError.walletAddressError="Wallet Address is Required";
                isValid=false; 
            }
            else if(!result1){
                walletAddressError.walletAddressError="Invalid Wallet Address"
            }
            if(totalSupply===''){
                totalSupplyError.totalSupplyError="TotalSupply is Required";
                isValid=false;
            }
            if(amount===''){
                amountError.amountError="Amount is Required";
                isValid=false; 
            }
            if(date===''){
                dateError.dateError="Date is Required";
                isValid=false;
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
            return isValid;
        }

      
        const handleChange = (e) => {
            const { name, value } = e.target;
            setInputs(inputs => ({ ...inputs, [name]: value }));
        }
         
//   const [data,getData]=useState({});
// //   const [changedData,getchangedData]=useState([]);
//   console.log("rechanged data::::::::",data)
    
 
//   console.log("id from ur::::::::::::::::",id);
  
  const EditForm=()=>{
     
        try {
    
               axios.get("http://34.211.81.68:4750/project/"+id)
                .then((response) => {
                    console.log("response========>",response)
                    setInputs(response.data.msg)
                });
      
          }
          catch (err) {
           
             console.log(err);
          
      }


}

  useEffect(() => {
         EditForm();
     
  },[id])


  //Tier Input state 
  const [tier1,setTier1]=useState('');
  const [tier2,setTier2]=useState('');
  const [tier3,setTier3]=useState('');
  const [tier4,setTier4]=useState('');
  //min value
  const [tier1MinValue,setTier1MinValue]=useState('');
  const [tier2MinValue,setTier2MinValue]=useState('');
  const [tier3MinValue,setTier3MinValue]=useState('');
  const [tier4MinValue,setTier4MinValue]=useState('');
  //max value
  const [tier1MaxValue,setTier1MaxValue]=useState('');
  const [tier2MaxValue,setTier2MaxValue]=useState('');
  const [tier3MaxValue,setTier3MaxValue]=useState('');
  const [tier4MaxValue,setTier4MaxValue]=useState('');
  //Tiers Error
  const [tier1Error,setTier1Error]=useState({});
  const [tier2Error,setTier2Error]=useState({});
  const [tier3Error,setTier3Error]=useState({});
  const [tier4Error,setTier4Error]=useState({});
  //Min value error
  const [tier1MinValueError,setTier1MinValueError]=useState('');
  const [tier2MinValueError,setTier2MinValueError]=useState('');
  const [tier3MinValueError,setTier3MinValueError]=useState('');
  const [tier4MinValueError,setTier4MinValueError]=useState('');
  //Max value error
  const [tier1MaxValueError,setTier1MaxValueError]=useState('');
  const [tier2MaxValueError,setTier2MaxValueError]=useState('');
  const [tier3MaxValueError,setTier3MaxValueError]=useState('');
  const [tier4MaxValueError,setTier4MaxValueError]=useState('');


//   console.log("Tier1:::::::::::::::::::::::::::::::::::::::",tier1);
//   console.log("Tier2:::::::::::::::::::::::::::::::::::::::",tier2);
//   console.log("Tier3::::::::::::::::::::::::::::::::::::::",tier3);
//   console.log("Tier4:::::::::::::::::::::::::::::::::::::::",tier4);
  const Sum=(e)=>{
    e.preventDefault();
   const tier1Error={};
   const tier2Error={};
   const tier3Error={};
   const tier4Error={};

   const tier1MinValueError={}
   const tier2MinValueError={}
   const tier3MinValueError={}
   const tier4MinValueError={}

   const tier1MaxValueError={}
   const tier2MaxValueError={}
   const tier3MaxValueError={}
   const tier4MaxValueError={}
   let isValid=true;
    
            
//    if(tier1===''){
//     tier1Error.tier1AllocationError="Tier1 Allocation is Required";
//       isValid=false;
//   }
//   if(tier2===''){
//     tier2Error.tier2AllocationError="Tier2 Allocation is Required";
//       isValid=false;
//   }
//   if(tier3===''){
//     tier3Error.tier3AllocationError="Tier3 Allocation is Required";
//       isValid=false;
//   }
//   if(tier4===''){
//     tier4Error.tier4AllocationError="Tier4 Allocation is Required";
//       isValid=false;
//   }


//   if(tier1MinValue===''){
//     tier1MinValueError.tier1MinError="Tier1 Min contribution is Required";
//       isValid=false;
//   }
//   if(tier2MinValue===''){
//     tier2MinValueError.tier2MinError="Tier2 Min contribution is Required";
//       isValid=false;
//   }
//   if(tier3MinValue===''){
//     tier3MinValueError.tier3MinError="Tier3 Min contribution is Required";
//       isValid=false;
//   }
//   if(tier4MinValue===''){
//     tier4MinValueError.tier4MinError="Tier4 Min contribution is Required";
//       isValid=false;
//   }

//   if(tier1MaxValue===''){
//     tier1MaxValueError.tier1MaxError="Tier1 Max contribution is Required";
//       isValid=false;
//   }
//   if(tier2MaxValue===''){
//     tier2MaxValueError.tier2MaxError="Tier2 Max Contribution is Required";
//       isValid=false;
//   }
//   if(tier3MaxValue===''){
//     tier3MaxValueError.tier3MaxError="Tier3 Max contribution is Required";
//       isValid=false;
//   }
//   if(tier3MaxValue===''){
//     tier4MaxValueError.tier4MaxError="Tier4 Max contribution is Required";
//       isValid=false;
//   }
  setTier1Error(tier1Error);
  setTier2Error(tier2Error);
  setTier3Error(tier3Error);
  setTier4Error(tier4Error);

  setTier1MinValueError(tier1MinValueError);
  setTier2MinValueError(tier2MinValueError);
  setTier3MinValueError(tier3MinValueError);
  setTier4MinValueError(tier4MinValueError);

  setTier1MaxValueError(tier1MaxValueError);
  setTier2MaxValueError(tier3MaxValueError);
  setTier3MaxValueError(tier3MaxValueError);
  setTier4MaxValueError(tier4MaxValueError);
  
    //  const sum=parseInt(tier1)+parseInt(tier2)+parseInt(tier3)+parseInt(tier4)
    //  console.log("sum",sum);
    // if(sum==100){
    //     console.log("sum is 100")
    // }else if(sum<100){
    //     alert("Sum less 100")
    // }else{
    //     alert("Sum above 100")
    // }

    if(isValid){
        getProjectDetail()
    }

    return isValid;
    
  }

        return (
            <div className='landing-nft detail-project'>

                <Navbar />

                <section className="header-section submit-projectss">
                    <img src={require("../../static/images/landing-leocorn/back-ground-header.png")} className="main-heads-ones" alt="" />
                    <div className="auto-container">
                        <div className="submit-project">
                            <div className="inner-submit-upper-div">
                                <h1>Project Details</h1>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="col-xl-8 col-lg-10 col-md-12">
                                        <div className="inner-submit-lower-div">
                                            <h4>Basic Details</h4>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="example">Project Name<span>*</span></label>
                                                        <input type="text"
                                                        value={inputs.projectName}
                                                        name="projectName"
                                                        onChange={handleChange}
                                                        className="form-control" id="example" aria-describedby="text" placeholder="Enter your project name here" readOnly />
                                                        {/* {Object.keys(projectNameError).map((key) => {
                                                           console.log("name",projectNameError);
                                                           console.log("key", key);
                                                        return <p className="inputErrors">{projectNameError[key]}</p>
                                                      })} */}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="exampleInputsymbol">Symbol<span>*</span></label>
                                                        <input type="text"
                                                        value={inputs.symbol}
                                                        name="symbol"
                                                        onChange={handleChange}
                                                        className="form-control" id="exampleInputsymbol" placeholder="Enter your project symbol i.e $BNB"  readOnly/>
                                                        {/* {Object.keys(projectSymbolError).map((key) => {
                                console.log("name",nameError);
                                console.log("key", key);
                                return <p className="inputErrors">{projectSymbolError[key]}</p>
                            })} */}
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label for="exampleInputdescription">Project Description<span>*</span></label>
                                                        <textarea className="form-control" 
                                                        value={inputs.projectDescription}
                                                        name="projectDescription"
                                                        onChange={handleChange}
                                                        placeholder="What is your project about" rows="3" id="comment" readOnly></textarea>
                                                        {/* {Object.keys(projectDescriptionError).map((key) => {
                                console.log("name",nameError);
                                console.log("key", key);
                                return <p className="inputErrors">{projectDescriptionError[key]}</p>
                            })} */}
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label for="exampleInputsymbol">Upload Logo (500X500 pixels)<span>*</span></label>
                                                        <div className="dashed-border-new">
                                                            <div className="main-image-div">
                                                                <img src={inputs.logoURL} style={{width:200}} alt="" />
                                                                
                                                            </div>
                                                        </div>
                                                            <p><span><input type="file" name="avatar" className="custom-file-inputt" accept="image/*" id="contained-button-file" readOnly/></span></p>
                                                    </div>
                                                </div>

                                                {/* <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label for="exampleInputcontractaddress">Project Contract Address<span>*</span></label>
                                                        <input type="text"
                                                                    value={inputs.contractAddress}
                                                                    name="contractAddress"
                                                                    onChange={handleChange}
                                                            className="form-control" id="exampleInputcontractaddress" placeholder="Enter Contract Address of your project" />
                                                     
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="hr-submit-form"></hr>

                                <div className="row">
                                    <div className="col-xl-8 col-lg-10 col-md-12">
                                        <div className="inner-submit-lower-div">
                                            <h4>Project Socials</h4>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="example">Website Link<span>*</span></label>
                                                        <input type="text"
                                                        value={inputs.websiteLink}
                                                        name="websiteLink"
                                                        onChange={handleChange}
                                                            className="form-control" id="example" aria-describedby="text" placeholder="Enter website address of your project" readOnly/>
                                                        {/* {Object.keys(websiteLinkError).map((key) => {
                                console.log("name",nameError);
                                console.log("key", key);
                                return <p className="inputErrors">{websiteLinkError[key]}</p>
                            })} */}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="exampleInputsymbol">Twitter Link<span>*</span></label>
                                                        <input type="text"
                                                        value={inputs.twitterLink}
                                                        name="twitterLink"
                                                        onChange={handleChange}
                                                            className="form-control" id="exampleInputsymbol" placeholder="Enter twitter link of your project" readOnly/>
                                                        {/* {Object.keys(twitterLinkError).map((key) => {
                                console.log("name",nameError);
                                console.log("key", key);
                                return <p className="inputErrors">{twitterLinkError[key]}</p>
                            })} */}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="example">Telegram Link<span>*</span></label>
                                                        <input type="text"
                                                         value={inputs.telegramlink}
                                                         name="telegramlink"
                                                         onChange={handleChange}
                                                            className="form-control" id="example" aria-describedby="text" placeholder="Enter your project name here" readOnly />
                                                        {/* {Object.keys(telegramLinkError).map((key) => {
                                console.log("name",nameError);
                                console.log("key", key);
                                return <p className="inputErrors">{telegramLinkError[key]}</p>
                            })} */}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="exampleInputsymbol">Discord Link<span></span></label>
                                                        <input type="text" 
                                                         value={inputs.discrodLink}
                                                         name="discrodLink"
                                                         onChange={handleChange}
                                                        className="form-control" id="exampleInputsymbol" placeholder="Enter telegram link of your project" readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="exampleInputsymbol">Medium Link<span></span></label>
                                                        <input type="text"
                                                        value={inputs.mediumLink}
                                                        name="mediumLink"
                                                        onChange={handleChange}
                                                        className="form-control" id="exampleInputsymbol" placeholder="Enter discord link of your project" readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="hr-submit-form"></hr>

                                <div className="row">
                                    <div className="col-xl-8 col-lg-10 col-md-12">
                                        <div className="inner-submit-lower-div">
                                            <h4>Contact Person Details</h4>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="example">Contact Person Name<span>*</span></label>
                                                        <input type="text"
                                                         value={inputs.contactPersonName}
                                                         name="contactPersonName"
                                                         onChange={handleChange}
                                                            className="form-control" id="example" aria-describedby="text" placeholder="Enter Contact Person Name" readOnly />
                                                        {/* {Object.keys(personNameError).map((key) => {
                                console.log("name",nameError);
                                console.log("key", key);
                                return <p className="inputErrors">{personNameError[key]}</p>
                            })} */}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="exampleemail">Contact Person Email Address<span>*</span></label>
                                                        <input type="email"
                                                         value={inputs.contactPersonEmail}
                                                         name="contactPersonEmail"
                                                         onChange={handleChange}
                                                            className="form-control" id="exampleemail" placeholder="Enter twitter link of your project" readOnly/>
                                                        {/* {Object.keys(emailError).map((key) => {
                                console.log("name",nameError);
                                console.log("key", key);
                                return <p className="inputErrors">{emailError[key]}</p>
                            })} */}
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label for="example">Contact Person Wallet Address<span>*</span></label>
                                                        <input type="text"
                                                         value={inputs.contactPersonWalletAddress}
                                                         name="contactPersonWalletAddress"
                                                         onChange={handleChange}
                                                            className="form-control" id="example" aria-describedby="text" placeholder="Enter Contact Person’s Wallet Address" readOnly/>
                                                        {/* {Object.keys(walletAddressError).map((key) => {
                                console.log("name",nameError);
                                console.log("key", key);
                                return <p className="inputErrors">{walletAddressError[key]}</p>
                            })} */}
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="hr-submit-form"></hr>


                                <div className="row">
                                    <div className="col-xl-8 col-lg-10 col-md-12">
                                        <div className="inner-submit-lower-div">
                                            <h4>Presale Details</h4>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="example">Total Supply of Token<span>*</span></label>
                                                        <input type="number"
                                                         value={inputs.totalSupplyOfToken}
                                                         name="totalSupplyOfToken"
                                                         onChange={handleChange}
                                                            className="form-control" id="example" aria-describedby="text" placeholder="Enter total supply of your token" readOnly/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="exampleamount">Amount Allocated for Presale <span>*</span></label>
                                                        <input type="number"
                                                         value={inputs.amountAllocatedForPresale}
                                                         name="amountAllocatedforPresale"
                                                         onChange={handleChange}
                                                            className="form-control" id="exampleamount" placeholder="Enter total allocation for this presale" readOnly />
                         
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="example">Token Decimals<span>*</span></label>
                                                    <input type="number" 
                                                           value={inputs.tokenDecimals}
                                                           name="tokenDecimals"
                                                           onChange={handleChange}
                                                        class="form-control" id="example" aria-describedby="text" placeholder="Enter Your Token Decimals" readOnly/>
                                                   
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="exampleamount">Token Price in BNB<span>*</span></label>
                                                    <input type="number" 
                                                         value={inputs.tokenPriceInBNB}
                                                         name="tokenPriceInBNB"
                                                         onChange={handleChange}
                                                        class="form-control" id="exampleamount" placeholder="Enter Your Token Price" readOnly />
                                                  
                                                </div>
                                            </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="example">Presale Start Date & Time<span>*</span></label>
                                                        <br></br>
                                                        <div className="sd-container">
                                                            <input className="sd"
                                                            value={inputs.preSaleStartDateAndTime?.split('Z')[0]}
                                                            
                                                             name="preSaleStartDateAndTime"
                                                             onChange={handleChange}
                                                                id="party" type="datetime-local"  readOnly></input>
                                                                  {/* <input className="sd" style={{color:'white'}}
                                                             value={inputs.preSaleStartDateAndTime}
                                                             name="preSaleStartDateAndTime"
                                                             onChange={handleChange}
                                                                /> */}
                                                            <span className="open-button">
                                                                <button type="button">📅</button>
                                                            </span>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="example">Presale End Date & Time<span>*</span></label>
                                                        <br></br>
                                                        <div className="sd-container">
                                                            <input className="sd"
                                                            value={inputs.preSaleEndDateAndTime?.split('Z')[0]}
                                                            
                                                             name="preSaleEndDateAndTime"
                                                             onChange={handleChange}
                                                                id="party" type="datetime-local" readOnly ></input>
                                                                  {/* <input className="sd" style={{color:'white'}}
                                                             value={inputs.preSaleStartDateAndTime}
                                                             name="preSaleStartDateAndTime"
                                                             onChange={handleChange}
                                                                /> */}
                                                            <span className="open-button">
                                                                <button type="button">📅</button>
                                                            </span>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="exampleamount">Liquidity Percentage For Pancake <span>*</span></label>
                                                    <input type="number" value={inputs.liquidityPercentage}
                                                       
                                                        class="form-control" id="exampleamount" placeholder="Enter Liquidity Percentage For Pancake" readOnly />
                                                
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="exampleamount">LaunchPad Fee Percentage<span>*</span></label>
                                                    <input type="number" value={inputs.launchPadFeePercentage}
                                                     
                                                        class="form-control" id="exampleamount" placeholder="Enter LaunchPad Fee Percentage" readOnly/>
                                                 
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
                                                    <input type="number" name="firstIterationPercentage" value={inputs.firstIterationPercentage}
                                                 
                                                        class="form-control" id="example" aria-describedby="text" placeholder="Enter Your Iteration  1 Percentage" />
                                                
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="exampleamount">Iteration 2 Percentage <span>*</span></label>
                                                    <input type="number " name="secondIterationPercentage" value={inputs.secondIterationPercentage}
                                                      
                                                        class="form-control" id="exampleamount" placeholder="Enter Your Iteration 2 Percentage" />
                                              
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="exampleamount">Iteration 3 Percentage <span>*</span></label>
                                                    <input type="number " name="thirdIterationPercentage" value={inputs.thirdIterationPercentage}
                                                       
                                                        class="form-control" id="exampleamount" placeholder="Enter Your Iteration 3 Percentage" />
                                             
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-xl-8 col-lg-10 col-md-12">
                                    <div className="inner-submit-lower-div">
                                        <h4>Claim Times</h4>
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="example">Claim time</label>
                                                    <input type="datetime-local" name="firstClaimTime" value={inputs.firstClaimTime?.split('Z')[0]}
                                                        // onChange={(e) => setIteration1(e.target.value)}
                                                        class="form-control" id="example" aria-describedby="text" placeholder="Enter your  claim time" readOnly />
                                                    {/* {Object.keys(iteration1Error).map((key) => {
                                                        // console.log("name",nameError);
                                                        console.log("key", key);
                                                        return <p className="inputErrors">{iteration1Error[key]}</p>
                                                    })} */}
                                                </div>
                                            </div>
                                            {/* <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="exampleamount">Second claim time</label>
                                                    <input type="datetime-local" name="secondClaimTime" value={inputs.secondClaimTime?.split('Z')[0]}
                                                      
                                                        class="form-control" id="exampleamount" placeholder="Enter Your Second claim time" />
                                               
                                                </div>
                                            </div> */}
                                            {/* <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="exampleamount">Third claim time</label>
                                                    <input type="datetime-local" name="thirdClaimTime" value={inputs.thirdClaimTime?.split('Z')[0]}
                                                       
                                                        class="form-control" id="exampleamount" placeholder="Enter Your Third claim time" />
                                                
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>                   
                                <div className="row">
                                    <div className="col-xl-8 col-lg-10 col-md-12">
                                        <div className="inner-submit-lower-div">
                                            <h4>Allocation Limits</h4>
                                       
                                            {/* <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="example">Tier 1 Allocation (65% of presale allocation) <span>*</span></label>
                                                        <input type="text" 
                                                        value={inputs.tier1Allocation}
                                                        name="tier1Allocation"
                                                        onChange={handleChange}
                                                        className="form-control" id="example" aria-describedby="text" placeholder="Enter Tier 1 allocation" />
                                                       
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="exampleamount">Min allocation per user <span>*</span></label>
                                                        <input type="text" 
                                                         value={inputs.minAllocationPerUser}
                                                         name="minAllocationPerUser"
                                                         onChange={handleChange}
                                                        className="form-control" id="example" aria-describedby="text" placeholder="Enter min allocation" readOnly/>
                                                        {/* {Object.keys(tier1MinValueError).map((key) => {
                                                         console.log("name",tier1MinValueError);
                                                         console.log("key", key);
                                                         return <p className="inputErrors">{tier1MinValueError[key]}</p>
                                                       })}  */}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label for="example">Max allocation per user<span>*</span></label>
                                                        <input type="text" 
                                                           value={inputs.maxAllocationPerUser}
                                                           name="maxAllocationPerUser"
                                                           onChange={handleChange}
                                                        className="form-control" id="example" aria-describedby="text" placeholder="Enter max allocation" readOnly/>
                                                         {/* {Object.keys(tier1MaxValueError).map((key) => {
                                                         console.log("name",tier1MaxValueError);
                                                         console.log("key", key);
                                                         return <p className="inputErrors">{tier1MaxValueError[key]}</p>
                                                       })}  */}
                                                    </div>
                                                </div>
                                            </div>
                                             {/* className={inputs.statusOfApplication!=='Approved'?'button-reject':'disabled'} */}
                                             {/* <ToastContainer style={{fontSize:20}}/> */}
                                                        {/* <button type="button" className="button-edit">EDIT</button> */}
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="buttons-submit">
                                                        {/* <button type="button" 
                                                        className={inputs.statusOfApplication!=='Approved'?'button-approve':'disabled'}
                                                        onClick={getProjectDetail}>SAVE & APPROVE</button>
                                                        <button   type="button" 
                                                     
                                                        className="button-reject"
                                                         onClick={getProjectRejected}>REJECT</button> */}
                                                         <Link to="/projects" className="back_btn">Back</Link>
                                                       
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
                                                                class="form-control" id="example" aria-describedby="text" placeholder="Enter First Name" value={inputs.kycFirstName} onChange={(e) => setkycFirstName(e.target.value)} readOnly/>
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
                                                                class="form-control" id="example" aria-describedby="text" value={inputs.kycSecondName} placeholder="Enter Last Name" onChange={(e) => setkycSecondName(e.target.value)} readOnly />
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
                                                        <img src={inputs.kycPassportPicture} style={{width:200}} alt="" />
                                                        </div>
                                                        <p className="text-center"><span>
                                                            <label for="filees" className="mnjhks">Upload Image</label>
                                                            <input type="file" id="filees"
                                                               
                                                              
                                                                name="avatar" className="d-none custom-file-inputt" accept="image/*" readOnly />
                                                        </span></p>
                                                      
                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                           
                               
                         </form>
                        </div>


                    </div>
            </section>
            

            <Footer />

        </div>
    );
}
export default SubmitProject;


