import React, { Component } from "react";
//import { Container } from "react-bootstrap/lib/Tab";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { getCartItems } from "../actions/cartAction";
const api = require("axios");

class ShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Harry Potter and the Cursed Child - Parts I & II",
      author: "by " + "J. K. Rowling, John Tiffany, Jack Thorne",
      isbn: "9781338099133",
      price: "$17.99",
      publisher: "Scholastic, Inc.",
      releaseDate: "07/31/2016",
      genre: "Fiction",
      description:
        "The Eighth Story. Nineteen Years Later. Based on an original new story by J.K. Rowling, John Tiffany, and Jack Thorne, a new play by Jack Thorne, Harry Potter and the Cursed Child is the eighth story in the Harry Potter series and the first official Harry Potter story to be...",
      authorBio:
        "J.K. Rowling is the author of the seven Harry Potter novels, which have sold over 450 million copies and have been translated into 79 languages, and three companion books originally published for charity. She is also the author of The Casual Vacancy, a novel for adults published in 2012, and, under the pseudonym of Robert Galbraith, is the author of the Cormoran Strike crime series. J.K. Rowling is making her screenwriting debut and is a producer on the film Fantastic Beasts and Where to Find Them, a further extension of the Wizarding World, due for release...",
      image: "https://images-na.ssl-images-amazon.com/images/I/71zWjTSsq1L.jpg",
      reviews: [],
      totalPrice: 0,
    };
  }

  async componentDidMount() {
    //   Get the cart Item of the user by his ID
    //	 For  now it's hard coded in cartAction.js
    await this.props.getCartItems();
  }

  calculateTotalPrice() {
    const { carts } = this.props;
    if (carts.length > 0) {
      let sum = 0;
      carts.forEach((cart) => {
        sum = sum + cart.price;
      });
      return sum;
    }
    return 0;
  }

  render() {
    const { carts } = this.props;
    return (
      <Container className="cartDetails">
        <Row>
          <div>
            <h1>Shopping Cart</h1>
          </div>
        </Row>

        {carts.length > 0 &&
          carts.map((cart) => {
            console.log(cart);
            return (
              <Row key={cart._id}>
                <div className="cart-wrapper">
                  <Row>
                    <Col xs={"12"} md={"12"} lg={"12"}>
                      <div className="cartbox-item cartbox-item-1">
                        <img
                          className="cartImage-container"
                          src={cart.thumbnailUrl}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="details-buttons mt-4">
                    <div className="addtoCartBtn" xs={6}>
                      <Button variant="outline-secondary" size="lg" block>
                        REMOVE FROM CART
                      </Button>
                    </div>

                    <div className="addtoWishlistBtn" xs={6}>
                      <Button variant="outline-secondary" size="lg" block>
                        ADD TO WISHLIST
                      </Button>
                    </div>

                    <div className="addtoWishlistBtn" xs={6}>
                      <Button variant="outline-secondary" size="lg" block>
                        UPDATE QUANTITY
                      </Button>
                    </div>

                    <div className="addtoWishlistBtn" xs={6}>
                      <Button variant="outline-secondary" size="lg" block>
                        SAVE FOR LATER
                      </Button>
                    </div>
                  </Row>
                </div>
              </Row>
            );
          })}

        <div>
          <p class="total">Total Price: ${this.calculateTotalPrice()}</p>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  carts: state.carts.carts,
});

const mapDispatchToProps = (dispatch) => ({
  getCartItems: () => dispatch(getCartItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);
