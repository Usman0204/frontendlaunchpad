import React from 'react';
import './index.css';
import { MDBProgress } from 'mdbreact';
const ClosedPoolCard = (props) => {

  // console.log("props in TotalBnbPerTier",props.TotalBnbPerTier);
  // console.log("props in amountAllocatedForPresale",props.amountAllocatedForPresale);
  // console.log("props in tierAllocation",props.tierAllocation);
  // const [progressValue,setProgressValue]=useState('')

  //let progressValue=(((((props.TotalBnbPerTier/( 10**18) / props.tokenPriceInBNB))/((props.amountAllocatedForPresale)*(props.tierAllocation/100)))*100).toFixed(3));
  let progressValue=(((((props.TotalBnbPerTier/( 10**18) / props.tokenPriceInBNB))/((props.amountAllocatedForPresale)))*100).toFixed(3));
  progressValue = progressValue > 100 ? 100 : progressValue;

  return (

    <div className=" card-main">
      <div className="main-image">
        <img src={props?.logoURL} alt="" style={{ width: 60, height: 60, borderRadius: '50%' }} />
        <h1>{props?.projectName}</h1>
        { props?.kycVerified ?<button>KYC</button>:''}
      </div>
      <div className="progress-baar">
        <div className="percentage">
          <p className="one">Progress</p>
          <p>{progressValue}%</p>
          
        </div>
        <MDBProgress material  value={progressValue} />
        {/* <div class="progress">
          <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div> */}
        <div className='button text-center'>
          <button>closed</button>
        </div>
      </div>
    </div>
  );
}
export default ClosedPoolCard

