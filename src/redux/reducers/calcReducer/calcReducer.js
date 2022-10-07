import * as types from '../../actions';

const initialState = {
  carPrice: {
    value: 3300000,
    min: 1000000,
    max: 6000000
  },
  initialFee: {
    value: 13,
    min: 10,
    max: 60
  },
  leaseTerm: {
    value: 60,
    min: 1,
    max: 60
  },
  submit: false,
}

function removeNeedless(value) {
  return value.replace(/[^\d]/g, '');
}

function checkCondition(state, value) {
  if(value < state.min) {
    return state.min;
  } else if(value > state.max) {
    return state.max;
  }
  return value;
}

export const calcReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_CAR_PRICE:
      if(action.payload)
      return {
        ...state,
        carPrice: {
          value: checkCondition(initialState.carPrice, action.payload)
        },
      }
    case types.GET_INITIAL_FEE:
      return {
        ...state,
        initialFee: {
          value: checkCondition(initialState.initialFee, removeNeedless(action.payload))
        },
      }
    case types.GET_LEASE_TERM:
      return {
        ...state,
        leaseTerm: {
          value: checkCondition(initialState.leaseTerm, action.payload)
        },
      }

      case types.GET_SUBMIT:
      return {
        ...state,
        submit: action.payload
      }

    default: 
      return state  
  }
}

