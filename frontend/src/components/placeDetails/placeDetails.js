import React, {Component} from 'react';
import './placeDetails.css'

/* Importing axois */
import axios from 'axios';

/* Importing animations */
import Fade from 'react-reveal/Fade';



export default class placeDetails extends Component {

    getInitialState(){
      /* Getting data from api */
      this.GetDetailsFromApi();
    }

    constructor(props) {
      super(props);
      this.state ={
        data: "initial_value",
        ReviewsVisible: false,
        GalleryShown: false,
      }
    }

    GalleryHeaderClick(){
      let value = this.state.GalleryShown;
      this.setState({
        GalleryShown: !value
      })
    }

    /* This function handles clicks of reviews header */
    ReviewsHeaderClick() {
      let value = this.state.ReviewsVisible;
      this.setState({
        ReviewsVisible: !value
      })
    }

    render() {

      /* Setting data */
      let data = JSON.parse(localStorage.getItem("place_details_data"));

      /* This function returns html with reviews */
      function Reviews(props) {
        const content = props.reviews.map((review) =>
          <div key={review.id} className="mt-5">

              <header>
                <h4 id={review.place_id} onClick={review.getComponent}> {review.name} </h4>
              </header>
              <div className="info mt-3 px-4">
                <a href={review.author_url} target="_blank"> {review.author_name} </a> <br/>
                <div className="mt-2"> {review.text} </div> <br/>
                <div> <b>Rating:</b> {review.rating} </div> <br/>
              </div>

          </div>
        );

        return (
          <div>
            {content}
          </div>
        );
      }

      /* This function returns html with gallery */
      function Gallery(props) {
        console.log(props)
        const content = props.reviews.map((review) =>
          <div key={review.id} className="">

          </div>
        );

        return (
          <div>
            {content}
          </div>
        );
      }

      return (
        <div className="place_details_component">
          <div className="containter">
            <div className="row">

                <div className="spacer col-1"></div>
                  <header className="col-10 p-3 py-5">
                    <h2> Details of
                      <div className="place_name"> {data.name}!</div>
                    </h2>
                  </header>
                <div className="spacer col-1"></div>

                <a href={"/placesList"} className="col-12 mt-3"> Back to places list! </a>
                <a href={"/"} className="col-12 mb-4"> Back to home! </a>


                <div className="col-12"> <b>Address:</b> {data.vicinity} </div>
                <div className="col-12"> <b>Website:</b> {data.website} </div>
                <div className="col-12"> <b>Phone:</b> {data.formatted_phone_number} </div>
                <div className="col-12 mb-5"> <b>Excat address:</b> {data.formatted_address} </div>


                <header className="col-12 mt-5 px-5 mb-5" onClick={this.GalleryHeaderClick.bind(this)}>
                  <span className="gallery_header"> Photos linked with this place: </span>
                  { this.state.GalleryShown && <span className="up_arrow"> &#9650; </span> }
                  { !this.state.GalleryShown && <span className="dropdown_arrow"> &#9660; </span> }
                </header>
                <Fade when={this.state.GalleryShown}>
                  stopy
                </Fade>


                <div className="col-12 mt-4"> <b>Rating:</b> {data.rating} </div>
                <div className="col-12"> <b>Number of ratings:</b> {data.user_ratings_total} </div>
                <div className="col-12" onClick={this.ReviewsHeaderClick.bind(this)}>
                  <b>Reviews:</b>
                  { this.state.ReviewsVisible && <span className="up_arrow"> &#9650; </span> }
                  { !this.state.ReviewsVisible && <span className="dropdown_arrow"> &#9660; </span> }
                </div>
                <Fade when={this.state.ReviewsVisible}>
                  <Reviews reviews={data.reviews} className="" getComponent={this.getComponent}/>
                </Fade>



            </div>
          </div>
        </div>
      );
    }

  }