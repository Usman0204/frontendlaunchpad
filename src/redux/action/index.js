import axios from "axios";
import Getweb3 from '../../hooks/Getweb3';
import { getBep20Contract } from '../../utils/contractHelpers'
export const useContarctAction = () => async (dispatch) => {
  const web3 = Getweb3();
  await axios.get("http://34.211.81.68:4750/project/all/active")
  .then(async (res) => {
     try{
       for (let elem of res.data.msg) {
        
        let tokenAddress = elem.contractAddressDeployed;
        console.log("token address", tokenAddress)
       const contract = getBep20Contract(tokenAddress, web3)
       console.log('contracr', contract)
         elem.preSaleStartDateAndTime = await contract.methods.saleStartTime().call();
         elem.preSaleEndDateAndTime = await contract.methods.saleEndTime().call()

        //  console.log("elmsssssss1",  preSaleStartDateAndTime)
        //    console.log("elmsssssss2",  preSaleEndDateAndTime)
          // elem.t1StarTtime = await contract.methods.saleStartTime().call();
          // elem.t1EndTime = await contract.methods.saleEndTime().call()
          // elem.t2StarTtime = await contract.methods.saleStartTimeTierTwo().call();
          // elem.t2EndTime = await contract.methods.saleEndTimeTierTwo().call();
          // elem.t3StarTtime = await contract.methods.saleStartTimeTierThree().call();
          // elem.t3EndTime = await contract.methods.saleEndTimeTierThree().call()
          elem.tokenPriceInBNB = await contract.methods.tokenPriceInBNB().call();
          // elem.TotalBnbinTwoTier = await contract.methods.totalBnbInTierTwo().call()
          // elem.TotalBnbinThreeTier = await contract.methods.totalBnbInTierThree().call();
          // elem.t4StarTtime = await contract.methods.saleStartTimeTierFour().call();
          // elem.t4EndTime = await contract.methods.saleEndTimeTierFour().call()
          elem.softcap= await contract.methods.softCap().call();
          elem.hardcap= await contract.methods.maxCap().call();
          elem.TotalBnbinOneTier = await contract.methods.totalBnbReceived().call();
          
       }
     }
     catch(err){
       return false;
     }
      if (res.data.status) {
        dispatch({
          type: "ACTIVEPOOLDATA",
          payload: res.data.msg,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    })
};

export const usePendingContarctAction = () => async (dispatch) => {
  const web3 = Getweb3();
  await axios.get("http://34.211.81.68:4750/project/all/pending")
    .then(async (res) => {
      try{
        for (let elem of res.data.msg) {
         
         let tokenAddress = elem.contractAddressDeployed;
         console.log("token address", tokenAddress)
        const contract = getBep20Contract(tokenAddress, web3)
          // elem.preSaleStartDateAndTime = await contract.methods.saleStartTime().call();
          // elem.preSaleEndDateAndTime = await contract.methods.saleEndTime().call();
 
         //  console.log("elmsssssss1",  preSaleStartDateAndTime)
         //    console.log("elmsssssss2",  preSaleEndDateAndTime)
           // elem.t1StarTtime = await contract.methods.saleStartTime().call();
           // elem.t1EndTime = await contract.methods.saleEndTime().call()
           // elem.t2StarTtime = await contract.methods.saleStartTimeTierTwo().call();
           // elem.t2EndTime = await contract.methods.saleEndTimeTierTwo().call();
           // elem.t3StarTtime = await contract.methods.saleStartTimeTierThree().call();
           // elem.t3EndTime = await contract.methods.saleEndTimeTierThree().call()
          // elem.tokenPriceInBNB = await contract.methods.tokenPriceInBNB().call();
           // elem.TotalBnbinTwoTier = await contract.methods.totalBnbInTierTwo().call()
           // elem.TotalBnbinThreeTier = await contract.methods.totalBnbInTierThree().call();
           // elem.t4StarTtime = await contract.methods.saleStartTimeTierFour().call();
           // elem.t4EndTime = await contract.methods.saleEndTimeTierFour().call()
           elem.softcap= await contract.methods.softCap().call();
           elem.hardcap= await contract.methods.maxCap().call();
           elem.TotalBnbinOneTier = await contract.methods.totalBnbReceived().call();
        
        }
      }
      catch(err){
        return false;
      }
      if (res.data.status) {
        dispatch({
          type: "PENDINGPOOLDATA",
          payload: res.data.msg,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    })
};

export const useClosingContarctAction = () => async (dispatch) => {
  const web3 = Getweb3();
  await axios.get("http://34.211.81.68:4750/project/all/finished")
    .then(async (res) => {
      try{
        for (let elem of res.data.msg) {
          let tokenAddress = elem.contractAddressDeployed;

          const contract = getBep20Contract(tokenAddress, web3)
          let avg=0;
          try {
            avg = await contract.methods.totalBnbReceived().call();
            elem.TotalBnbinOneTier=avg;
          } catch (error) {
            avg=0
            elem.TotalBnbinOneTier=avg;
          }
             
          //  elem.TotalBnbinTwoTier = await contract.methods.totalBnbInTierTwo().call()
          //  elem.TotalBnbinThreeTier = await contract.methods.totalBnbInTierThree().call();
        }
      }
      catch(err){
        console.log('third', err)
        return false;
      }
      if (res.data.status) {
        dispatch({
          type: "CLOSEDPOOLDATA",
          payload: res.data.msg,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    })
};







