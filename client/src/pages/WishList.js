import React, { Component } from "react";
import "../index.css";
import { connect } from "react-redux";
class WishList extends Component {
  render() {
    const { wishLists } = this.props;
    return (
      <div class="container">
        <div class="row">
          <div class="col-lg-12 my-3">
            <div class="pull-right">
              <div class="btn-group">
                <button class="btn btn-info" id="list">
                  List View
                </button>
                <button class="btn btn-danger" id="grid">
                  Grid View
                </button>
              </div>
            </div>
          </div>
        </div>
        {wishLists.map((wishList) => (
          <div id="products" key={wishList._id} class="row view-group mb-5">
            <div class="item col-xs-12 col-lg-12">
              <div class="card">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-xs-4">
                    <div class="img-event">
                      <img
                        style={{ height: "343px" }}
                        class="img img-fluid"
                        src={`${wishList.thumbnailUrl}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-xs-8 d-flex align-items-center">
                    <div class="caption card-body">
                      <h4 class="group card-title inner list-group-item-heading">
                        {wishList.title}
                      </h4>
                      <p class="group inner list-group-item-text">
                        {wishList.shortDescription}
                      </p>
                      <p class="lead float-left mt-4">${wishList.price}</p>
                      <a
                        class="btn btn-success float-right mt-4"
                        href="http://www.jquery2dotnet.com"
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state.wishLists.wishlists);
  return {
    wishLists: state.wishLists.wishlists,
  };
};

export default connect(mapStateToProps)(WishList);

{
  /* <div>
            <ul className="flexbox-container">

            <div className="book-wrapper">
                <div className="flexbox-item flexbox-item-1" >
                    <img className="fit-container" src="https://kbimages1-a.akamaihd.net/52c896b6-2750-4c3d-a844-0760f23117f9/353/569/90/False/how-to-study-smart-study-secrets-of-an-honors-student.jpg" />
                </div>
                <h4>How to study</h4>
            </div>

            <div className="book-wrapper">
                <div className="flexbox-item flexbox-item-2">
                    <img className="fit-container" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1457542606l/25136217._SY475_.jpg" />
                </div>
                <h4>Up and Going</h4>
            </div>
            </ul>
          </div> */
}
