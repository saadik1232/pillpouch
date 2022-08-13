import axios from "axios";
import { baseurl } from "../../Api/ApiData";
import { setlogindataaction } from "../../Store/LoginReducer";

export async function RefreshRoles(data, dispatch, pass) {
  console.log("this is the protectd route", data);
  var datatosend = JSON.stringify({
    email: data.email,
    password: pass,
  });

  var config = {
    method: "post",
    url: baseurl + "SignIn",
    headers: {
      "Content-Type": "application/json",
    },
    data: datatosend,
  };

  //   return await axios(config);
  await axios(config).then((res) => {
    console.log("api hit to refresh roles", res.data.data);
    let path = res.data.data;
    dispatch(setlogindataaction(path));
  });
}
