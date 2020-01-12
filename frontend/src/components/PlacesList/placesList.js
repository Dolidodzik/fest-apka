import React, {Component} from 'react';
import './placesList.css'

import store from '../../redux/store';
import { connect } from 'react-redux';


export default class PlacesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PlacesListData: store.getState().data_for_api_call.PlacesListData
    }
    localStorage.setItem('PLACES_LIST', JSON.stringify( store.getState().data_for_api_call.PlacesListData ));
    this.HeadToPlaceDetails = this.HeadToPlaceDetails.bind(this);
  }

  componentDidMount(){

  }

  HeadToPlaceDetails(event){

    let data_for_api_call = {
      selected_place_id: event.target.id,
      what_to_load: "PLACE_DETAILS",
      PlacesListData: store.getState().data_for_api_call.PlacesListData
    }

    /* Changing view and sending data */
    store.dispatch({
      type: 'CHANGE_DATA_FOR_API_CALL',
      payload: data_for_api_call
    })
    this.props.history.push({
      pathname: '/loading',
    })

    event.preventDefault()
  }

  render() {


    function PlacesList(props) {

      let places = store.getState().data_for_api_call.PlacesListData;
      if(places){
        sessionStorage.setItem('PLACES_LIST', JSON.stringify( store.getState().data_for_api_call.PlacesListData ));
      }else{
        places = JSON.parse( sessionStorage.getItem('PLACES_LIST') )
      }

      if(places){
        const content = places.map((place) =>
          <div key={place.id} className="mt-5">

            <a href="#" className="place_link">
              <header>
                <h4 id={place.place_id} onClick={props.HeadToPlaceDetails}> {place.name} </h4>
              </header>
            </a>
            <div className="info mt-3">
              Address: {place.vicinity} <br/>
              Rating: {place.rating} <br/>
              Price level: {place.price_level} <br/>
            </div>

          </div>
        );

        return (
          <div>
            {content}
          </div>
        );
      }else{
        return ( <div> Nothing found! </div> );
      }
    }

    return (
      <div className="component-places-list">
        <div className="containter">
          <div className="row">

            <header className="col-12 px-5 mt-5 mb-2">
              <h2> Here are results: </h2>
            </header>

            <a href={"/"} className="col-12 my-4"> Back to home! </a>

            <div className="spacer col-1"></div>
            <main className="results col-10">

              <PlacesList places={this.places} HeadToPlaceDetails={this.HeadToPlaceDetails}/>

            </main>
            <div className="spacer col-1"></div>

            <div className="spacer padding-bottom"></div>

          </div>
        </div>
      </div>
    );
  }
}
