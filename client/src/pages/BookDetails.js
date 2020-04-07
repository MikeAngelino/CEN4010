import React from "react";
// import Comments from "./Comments";
import CommentForm from "../components/Comments/CommentForm";
import Rating from "./Rating";
import StarRatings from "react-star-ratings";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

//useful for when you make calls to the api -- helps open a gateway to collect information
import axios from "axios";
import CommentList from "../components/Comments/CommentList";

//class
//will need this function when you call this class to get the id to call the book
class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params);
    this.state = {
      id: props.match.params.id,
      book: {},
      comments: [],
      purchased: true,
    };
  }
  componentDidMount() {
    // Get Book Data first
    axios
      .get("http://localhost:3002/api/books/" + this.state.id)
      .then(async (res) => {
        this.setState({
          book: res.data,
        });
        // After Book Data retrieved, retrieve the comments for that book
        try {
          await this.getComments();
        } catch (err) {
          console.log("Comments error", err);
        }
      });
  }

  async getComments() {
    const comments = await axios.get(
      "http://localhost:3002/api/Comments/Comments"
    );
    // Only get the comments associated with this book
    const filteredComments = comments.data.filter(
      (comment) => comment.discussion_id === this.state.id
    );
    this.setState({ ...this.state, comments: filteredComments });
  }

  handleSubmitReview = ({ mname, text, rating }) => {
    // Here add the axios method of sending a post request

    axios
      .post("http://localhost:3002/api/Comments", {
        text,
        rating,
        name: mname,
        discussion_id: this.state.id,
      })
      .then(async () => {
        // Update the state when a new comment is posted
        await this.getComments();
      });
  };

  calculateAvgRating = () => {
    const { comments } = this.state;
    if (comments.length > 0) {
      console.log("avg", comments);
      const tComments = comments.length;
      let sumOfReviews = 0;
      comments.forEach((comment) => {
        sumOfReviews = sumOfReviews + comment.rating;
      });
      return sumOfReviews / tComments;
    }
    return 0;
  };

  handleAddToWishList = (id) => {
    console.log("Book id", id);
  };

  render() {
    const { purchased } = this.state;
    return (
      <Container className="details">
        <Row>
          <Col className="details-img-col">
            <Image
              className="details-img"
              src={this.state.book.thumbnailUrl}
              fluid
            />
          </Col>

          <Col className="details-Basics">
            <h1>{this.state.book.title}</h1>

            <h3>{this.state.book.authors}</h3>
            <hr />
            <h2>{this.state.book.price}</h2>

            <ul>
              <li> ISBN: {this.state.book.isbn} </li>
              <li> Publisher: {this.state.book.publisher} </li>
              <li> Release Date: {this.state.book.publishedDate}</li>
              <li> Genre: {this.state.book.genre}</li>

              <li>
                {/* book rating render here */}
                <Row className="details-buttons">
                  {/* <Rating /> */}
                  <StarRatings
                    starRatedColor="#FFCC00"
                    starDimension="25px"
                    rating={this.calculateAvgRating()}
                    numberOfStars={5}
                    name="rating"
                  />
                </Row>
              </li>
            </ul>

            <Row className="details-buttons">
              <Col className="addtoCartBtn" xs={6}>
                <Button variant="primary" size="sm" block>
                  ADD TO CART
                </Button>
              </Col>

              <Col className="addtoWishlistBtn" xs={6}>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => this.handleAddToWishList(this.state.id)}
                  block
                >
                  ADD TO WISHLIST
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="details-description">
          <div className="centering">
            <h3>Overview</h3>
          </div>
          <p>{this.state.book.shortDescription}</p>
        </Row>

        <Row className="details-authorBio">
          <h3> Author Bio</h3>
          <p>{this.state.book.auth_bio}</p>
        </Row>

        <Row className="customer-reviews">
          <div className="col-lg-12 col-md-12 col-xs-12 text-center mt-5 mb-5">
            <h3>Customer Reviews</h3>
          </div>
          <div className="col-lg-12 col-md-12 col-xs-12 ">
            <CommentList comments={this.state.comments} />
          </div>
          {/* This is just a flag which will check if the User has purchased this book or not */}
          {/* Normally it will be checked via Database */}
          {/* Set it to flase the form will disappear */}
          {purchased && (
            <div className="col-lg-12 col-md-12 col-xs-12 ">
              {/* This is the component which will submit the review */}
              <CommentForm submit={this.handleSubmitReview} />
            </div>
          )}
          {/* <div> */}
          {/* book comments  rendered here*/}
          {/* <Comments /> */}
          {/* </div> */}
        </Row>
      </Container>
    );
  }
}

export default BookDetails;
