const initState = {
  AllActivePoolData:[],
  PendingData:[],
  ClosedData:[]
};
export const PoolActiveReducer = (state = initState, action) => {
  const { type, payload } = action; //object destructring
  console.log("seonddddddddd",action.payload)
  switch (type) {
    case "ACTIVEPOOLDATA":
      return {
        ...state,
        AllActivePoolData: payload,
      };
      case "PENDINGPOOLDATA":
        return {
          ...state,
          PendingData: payload,
        };
        case "CLOSEDPOOLDATA":
        return {
          ...state,
          ClosedData: payload,
        };
    default:
      return state;
  }
};