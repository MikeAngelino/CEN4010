import React, { Component } from "react";
//import { Container } from "react-bootstrap/lib/Tab";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { addToWishList } from "../actions/wishlistActions";
import { getCartItems, deleteCartItem } from "../actions/cartAction";
const api = require("axios");

class ShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const { carts, deleteCartItem, getCartItems, addToWishList } = this.props;
    return (
      <Container className="cartDetails">
        <Row>
          <div>
            <h1>Shopping Cart</h1>
          </div>
        </Row>

        {carts.length > 0 &&
          carts.map((cart) => {
            return (
              <Row className="mb-4 card" key={cart._id}>
                <Col xs={"12"} lg={"12"} md="12" className="cart-wrapper">
                  <Row>
                    <Col xs={"2"} md={"2"} lg={"2"}>
                      <img className="img img-fluid" src={cart.thumbnailUrl} />
                    </Col>
                    <Col xs={"10"} md={"10"} lg={"10"}>
                      <div class="caption card-body">
                        <h4 class="group card-title inner list-group-item-heading">
                          {cart.title}
                        </h4>
                        <p class="group inner list-group-item-text">
                          {cart.shortDescription}
                        </p>
                        <p class="lead float-left mt-4">Price ${cart.price}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={"12"} xs={"12"} md={"12"}>
                      <div className="details-buttons btn-group float-right">
                        <div className="addtoCartBtn" xs={6}>
                          <Button
                            variant="outline-secondary"
                            size="lg"
                            block
                            onClick={async () => {
                              await deleteCartItem(cart._id);
                              await getCartItems();
                            }}
                          >
                            REMOVE FROM CART
                          </Button>
                        </div>

                        <div className="addtoWishlistBtn" xs={6}>
                          <Button
                            variant="outline-secondary"
                            size="lg"
                            block
                            onClick={async () => {
                              await addToWishList(cart);
                            }}
                          >
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
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
          })}

        <div style={{ borderTop: "1px solid rgba(0,0,0,.125)" }}>
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
  deleteCartItem: (id) => dispatch(deleteCartItem(id)),
  addToWishList: (data) => dispatch(addToWishList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);
