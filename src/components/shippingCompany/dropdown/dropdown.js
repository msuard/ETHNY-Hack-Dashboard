import React from 'react';
import PropTypes from 'prop-types';


class Dropdown extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      shippingId: "1",
      shippingIdsList: [1,2]
    }
  }

  componentDidUpdate(prevProps, prevState){

    if(this.props.shippingIds !== prevProps.shippingIds){
      let newState = this.state;
      newState.shippingIdsList = this.props.shippingIds;
      newState.shippingId = this.props.shippingIds[0];
      this.setState(newState);
    }

    console.log(this.state)

  }

  async componentDidMount(){

    this.setState({
      shippingId: this.props.shippingIds[0],
      shippingIdsList: this.props.shippingIds
    });

    console.log(this.state)
  }

  handleClick(shippingId){

    return () => {

      console.log(shippingId);

      let newState = this.state;
      newState.shippingId = shippingId;
      this.setState(newState);

      this.props.onSelectShippingId(shippingId)
    }

  }


  render(){

    return(

      <div className="dropdown">
        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
          {this.state.shippingId}
        </button>
        <div className="dropdown-menu">
          {
            this.state.shippingIdsList.map((shippingId) => {

              return(
                <a className="dropdown-item" key={shippingId} onClick={this.handleClick(shippingId)}>{shippingId}</a>
              )

            })
          }

        </div>
      </div>

    )

  }


}

Dropdown.propTypes = {

};

export default Dropdown








