const initialstate = {
  logindata: [],
  pass: "",
};

export function LoginReducer(state = initialstate, action) {
  switch (action.type) {
    case setlogindata:
      return { ...state, logindata: action.payload };

    case setpass:
      return { ...state, pass: action.payload };

    default:
      return state;
  }
}

// action types
export const setlogindata = "LoginReducer/logindata";
export const setpass = "LoginReducer/pass";

// selectors
export const getlogindata = (state) => state.logindata.logindata;
export const getpass = (state) => state.logindata.pass;

// actions for dispatch
export const setlogindataaction = (data) => ({
  type: setlogindata,
  payload: data,
});

export const setpassaction = (data) => ({
  type: setpass,
  payload: data,
});
