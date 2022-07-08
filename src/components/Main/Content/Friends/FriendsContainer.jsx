import React from "react";
import { ConnectedWithAuthRedirect } from "../../../../hoc/connectedWithAuthRedirect";
import Friends from "./Friends";




class FriendsContainer extends React.Component {
  render() {
    return (
    <Friends/>
    )
  }
}

export default ConnectedWithAuthRedirect(FriendsContainer)