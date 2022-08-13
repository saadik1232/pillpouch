import { useEffect, useState } from "react";
import { RefreshRoles } from "../MultiComp/RefreshRoles";
import { useDispatch, useSelector } from "react-redux";
import {
  getlogindata,
  getpass,
  setlogindataaction,
} from "../../Store/LoginReducer";
import spinnericon from "../../assets/images/spinner.gif";

export default function ProtectedRoute({ children, onenter }) {
  const userdata = useSelector(getlogindata);
  const dispatch = useDispatch();

  const pass = useSelector(getpass);

  const [state, setstate] = useState(false);
  const [datauser, setdatauser] = useState(null);

  //console.log("route protector and data from redux", userdata);

  useEffect(() => {
    //onenter();
    console.log("use effect for route protector and data from redux", userdata);
    if (localStorage.getItem("userid")) {
      setstate(true);
      RefreshRoles(userdata, dispatch, pass).then((res) => {
        setstate(false);
        console.log("api hit to refresh roles", res.data.data);
        let path = res.data.data;
        dispatch(setlogindataaction(path));
      });
      //RefreshRoles(userdata, dispatch, pass);
    }
    return () => {};
  }, []);

  return state ? (
    <>
      {" "}
      <section class="content-section">
        <div className="gifloader">
          <img src={spinnericon} alt="" />
        </div>
      </section>{" "}
    </>
  ) : (
    children
  );
}
