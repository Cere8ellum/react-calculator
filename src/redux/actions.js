export const GET_CAR_PRICE = "GET_CAR_PRICE";
export const GET_INITIAL_FEE = "GET_INITIAL_FEE";
export const GET_LEASE_TERM = "GET_LEASE_TERM";
export const GET_SUBMIT = "GET_SUBMIT";

/*ACTION CREATORS*/
export function actionGetPrice(data) {
  return {
    type: GET_CAR_PRICE,
    payload: data
  }
}

export function actionGetInitFee(data) {
  return {
    type: GET_INITIAL_FEE,
    payload: data
  }
}

export function actionGetLeaseTerm(data) {
  return {
    type: GET_LEASE_TERM,
    payload: data
  }
}

export function actionGetSubmit(data) {
  return {
    type: GET_SUBMIT,
    payload: data
  }
}
