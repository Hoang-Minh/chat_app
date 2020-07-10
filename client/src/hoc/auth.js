/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const { history } = props;

    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      //To know my current status, send Auth request
      dispatch(auth()).then((response) => {
        //Not Loggined in Status
        console.log("dispatch auth()", response);
        console.log("dispatch auth() - option", option);

        const {
          payload: { isAuth, isAdmin },
        } = response;

        console.log(isAuth);

        if (!isAuth) {
          if (option) {
            console.log("login???");
            history.push("/login");
          }
          //Loggined in Status
        } else {
          console.log("admin route???");
          //supposed to be Admin page, but not admin person wants to go inside
          if (adminRoute && !isAdmin) {
            history.push("/");
          }
          //Logged in Status, but Try to go into log in page
          else {
            console.log("option???");
            if (option === false) {
              history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
