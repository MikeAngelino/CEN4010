import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { getWishLists } from "../actions/wishlistActions";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  async componentDidMount() {
    axios.get("http://localhost:3002/api/books").then((res) => {
      this.setState({
        books: res.data,
      });
    });
    try {
      await this.props.getWishLists();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <ul className="flexbox-container">
          {this.state.books.map((book) => (
            <li>
              <NavLink
                to={`/Book/${book._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="book-wrapper">
                  <div className="flexbox-item flexbox-item-3">
                    <img className="fit-container" src={book.thumbnailUrl} />
                  </div>
                  {book.title}
                  <p>by {book.authors}</p>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return { getWishLists: () => dispatch(getWishLists()) };
};
export default connect(null, mapDispatchToProps)(Home);
