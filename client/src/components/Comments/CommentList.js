import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Comment from "./Comment";
export default class CommentList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <>
        {comments.map(comment => (
          <Row className="mb-5 mt-5">
            <Col lg={"12"} md={"12"} xs={"12"}>
              <Comment comment={comment} />
            </Col>
          </Row>
        ))}
      </>
    );
  }
}
