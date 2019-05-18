import React from 'react';
import PropTypes from 'prop-types';
import Shipping from "../shippingCompany";


class Dropdown extends React.Component {


  constructor(props){
    super(props);

    this.state = {
    }
  }

  componentDidUpdate(prevProps, prevState){

    console.log(this.props.decryptedData)

  }

  async componentDidMount(){
    console.log(this.props.decryptedData)
  }



  render(){

    return(


      <table className="table">
        <thead>
        <tr>
          <th scope="col">Timestamp</th>
          <th scope="col">orientation</th>
        </tr>
        </thead>
        <tbody>

          {
            this.props.decryptedData.map((dataPoint) => {

              return(
                <tr key={dataPoint.timestamp}>
                  <td>{dataPoint.timestamp}</td>
                  <td>{dataPoint.orientation}</td>
                </tr>
              )

            })
          }

        </tbody>
      </table>



    )

  }


}

Dropdown.propTypes = {

};

export default Dropdown








