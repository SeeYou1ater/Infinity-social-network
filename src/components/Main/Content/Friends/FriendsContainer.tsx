import React from "react";
import { ConnectedWithAuthRedirect } from "../../../../hoc/connectedWithAuthRedirect";
import Friends from "./Friends";




const FriendsContainer: React.FC<{}> = () => {
  
    return (
    <Friends/>
    )
  
}

export default ConnectedWithAuthRedirect(FriendsContainer)