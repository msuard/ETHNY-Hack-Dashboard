import React from 'react';
import PropTypes from 'prop-types';


class Dropdown extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      shippingId: "",
      shippingIdsList: [],
      formattedId: ""
    }
  }

  componentDidUpdate(prevProps, prevState){

    if(this.props.shippingIds !== prevProps.shippingIds && typeof(this.props.shippingIds[0]) === 'string'){
      let newState = this.state;
      newState.shippingIdsList = this.props.shippingIds;
      newState.shippingId = this.props.shippingIds[0];
      newState.formattedId = newState.shippingId.slice(0, 24) + '...';

      this.setState(newState);
    }

    if(this.props.shippingId !== prevProps.shippingId && typeof(this.props.shippingId) === 'string'){
      let newState = this.state;
      newState.shippingId = this.props.shippingId;
      newState.formattedId = newState.shippingId.slice(0, 24) + '...';

      this.setState(newState);
    }

    console.log(this.state)

  }

  async componentDidMount(){

    if(this.props.shippingIds[0] && typeof(this.props.shippingIds[0]) === 'string'){
      this.setState({
        shippingId: this.props.shippingIds[0],
        shippingIdsList: this.props.shippingIds,
        formattedId: this.props.shippingIds[0].slice(0, 24) + '...'
      });
    }


    console.log(this.state)

    // setInterval(this.props.refreshShippingIds, 500)
  }

  handleClick(shippingId){

    return () => {

      console.log(shippingId);

      let newState = this.state;
      newState.shippingId = shippingId;
      newState.formattedId = newState.shippingId.slice(0, 24) + '...';

      this.setState(newState);

      this.props.onSelectShippingId(shippingId)
    }

  }


  render(){


    return(

      <div className="dropdown">
        <button id="dropdownButton" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
          { this.state.formattedId }
        </button>
        <div className="dropdown-menu">
          {
            this.state.shippingIdsList.map((shippingId) => {

              return(
                <a className="dropdown-item" key={shippingId} onClick={this.handleClick(shippingId)}>{shippingId.toString().slice(0, 24) + '...'}</a>
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








