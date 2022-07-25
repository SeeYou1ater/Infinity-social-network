import React, { useEffect, useState } from "react";
import './ProfileStatus.css';


function ProfileStatus(props) {

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect( () => { 
    setStatus(props.status); 
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status) 
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div className='App__status-wrapper'>
      {!editMode ?
      <div className='App__profileStatus'>
        { props.isOwner ? <span onDoubleClick={ activateEditMode }>{ props.status || 'No status' }</span> :
        <span>{ props.status || 'No status' }</span> }
        { props.isOwner && <button onClick={ activateEditMode }>Change</button> }
      </div> :
      <div className='status-input'>
        <input onChange={ onStatusChange } autoFocus={true} onBlur={ deactivateEditMode } value={ status }/> 
      </div>}
    </div>
  )
}


export default ProfileStatus;