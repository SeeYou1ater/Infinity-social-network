import React from "react";


class ProfileStatus extends React.Component {

  state = {
    editStatusMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editStatusMode: true
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editStatusMode: false
    })
    this.props.updateStatus(this.state.status)
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
    <>
      <div className='status-wrapper'>
        {!this.state.editStatusMode ?
        <div className='status'>
          <span onDoubleClick={ this.activateEditMode }>{this.props.status || 'No status'}</span>
          <button onClick={ this.activateEditMode }>Change</button>
        </div> :
        <div className='status-input'>
          <input onChange={ this.onStatusChange } autoFocus={true} onBlur={ this.deactivateEditMode } value={ this.state.status }/> 
        </div>}
      </div>
    </>
    )
  }
}


export default ProfileStatus;