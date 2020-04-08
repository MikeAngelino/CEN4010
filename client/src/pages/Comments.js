import React, { Component } from "react";
import '../index.css';
import axios from 'axios';
import comInput from './comInput';

class Comments extends Component {

  // state = {
  //   comment: ""
  // }

  // addComment = () => {
  //   const addCom = {comment: this.state.comment}

  //   if(addCom.comment && addCom.comment.length > 0){
  //     axios.post('/api/comments', addCom)
  //       .then(res => {
  //         if(res.data){
  //           this.props.getTodos();
  //           this.setState({comment: ""})
  //         }
  //       })
  //       .catch(err => console.log(err))
  //   }else {
  //     console.log('input field required')
  //   }
  // }

  // handleChange = (e) => {
  //   this.setState({
  //     comment: e.target.value
  //   })
  // }

//   render() {
//     let { comment } = this.state;
//     return (
//       <div>
//         <input type="text" onChange={this.handleChange} value={comment} />
//         <button onClick={this.addComment}>add todo</button>
//         <textarea maxLength="500" rows="4" cols="55" onInput={this.handleChange} value={comment} ></textarea>  
//       </div>
//     )
//   }
// }

// ------------------

  state = {
    comments: ""
  }

    componentDidMount(){
    this.getComments();
  }

  addComment = () => {
    const addCom = {comments: this.state.comments}

    if(addCom.comments && addCom.comments.length > 0){
      axios.post('/api/comments', addCom)
        .then(res => {
          if(res.data){
            this.props.getComments();
            this.setState({comments: ""})
          }
        })
        .catch(err => console.log(err))
    }else {
      console.log('input field required')
    }
  }

  handleChange = (e) => {
    this.setState({
      comments: e.target.value
    })
  }

  getComments = () => {
    axios.get('/api/comments')
      .then(res => {
        if(res.data){
          this.setState({
            add: res.data
          })
        }
      })
      .catch(err => console.log(err))
  }


    deleteComments = (id) => {
    axios.delete(`/api/comments/${id}`)
      .then(res => {
        if(res.data){
          this.comments()
        }
      })
      .catch(err => console.log(err))
  }


  render() {
    let { comments } = this.state;

    return(
      <div>
        <div class="reviews">
         <div class="row blockquote review-item">
             <div class="col-md-3 text-center">
               <img class="rounded-circle reviewer" src="https://drive.google.com/uc?id=1HRgRJ-wOZAn2uCWtOYLwTz774jUYHlro"/>
             <div class="caption">
                 <small>by <a href="#Miguel">Miguel</a></small>
             </div>

             </div>
             <div class="col-md-9">
             <h3>Greatest book I've read</h3>
             <div class="ratebox text-center" data-id="0" data-rating="5"></div>
             <p class="review-text">Found myself hating to pause the reading. The author puts you right in the middle of Hogwarts. I'm looking forward to the whole series. </p>

             <small class="review-date">February 26, 2019</small>
            </div>

        </div>  
        </div>
         <div class="col-md-9">
             <div class="review-text">
               <label for="name">
                   Leave Review</label>
                  <textarea maxLength="500" rows="4" cols="55"  name="comment" id="message" class="form-control" required="required"
                    onInput={this.handleChange} value={comments}  placeholder="Write here"></textarea>
           </div>
        </div>
            <div class="col-md-12">
              <button 
                  type="submit" 
                  onClick={this.addComment} 
                  class="btn btn-primary pull-right" 
                  id="btnContactUs">
                  Post Review</button>
            </div>
      </div>
    )
  }
}

export default Comments;



// <Form onSubmit={this.handleSubmit.bind(this)}>
// <div className="write-review" >
//     <center>
//       <h5>Rate this book</h5>
//     </center> 
//     <div>
//        <center>
//          <Form.Check type={'checkbox'} label="Be Anonymous?" onChange={this.setReviewName.bind(this)}/>
//        </center>
//        <center className="review-name"> How you will appear to other customers: </center>
//        <center className="review-name">{this.state.reviewNickname}</center>
//        <center className="rating-stars">
//           <StarRatingComponent  name={"Rate this book" } value={this.starRating} onStarClick={this.onStarClick.bind(this)} starCount={5} ></StarRatingComponent>
//        </center>
//        <center>Tell us what you think</center> 
//        <center>
//          <textarea maxLength="500" rows="4" cols="55" onInput={this.setComment.bind(this)} value={this.comment} ></textarea>  
//            <div style={{paddingTop: "1%" }}>
//              <Button disabled={!this.state.ifPurchased} variant="primary" size="sm" type="submit">&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;</Button>
//            </div>
//           {this.state.reviews.map((reviews, index) => (
//           <ListGroup key={index}>
//             <ListGroup.Item key={index}>
//               <center style={{paddingTop: "1%" }}> 
//                     <Container>
//                           <div class="card">
//                             <p class="card-header">
//                             Comment by {this.state.reviews[index].nickname}
//                             </p>
//                             <div class="card-body">
//                               <blockquote class="blockquote mb-0">
//                                 <p>{this.state.reviews[index].comment}</p>
//                                 <footer class="blockquote-footer">Rate given by {this.state.reviews[index].nickname} is: {this.state.reviews[index].rating}</footer>
//                               </blockquote>
//                             </div>
//                           </div>
//                     </Container>
//               </center>
//       </ListGroup.Item>
//   </ListGroup>
// ))}
//        </center>  
//     </div>
// </div>
// </Form>

