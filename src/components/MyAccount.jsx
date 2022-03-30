import { useEffect, useState } from "react";
import { fetchUserComments, fetchUserReviews } from "../axios-services";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditCommentModal from "./EditCommentModal";


const MyAccount = ({ user, token }) => {
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [specificCommentId, setSpecificCommentId] = useState(0);
  const [show, setShow] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("comments", comments);
  console.log("token",token)

  useEffect(() => {
    const handleComment = async () => {
      if(token){
        try {
          const userComment = await fetchUserComments(token);
          console.log('usercomment :>> ', userComment);
          setComments(userComment);
          setRerender(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleComment();
    // fetchUserComments(token).then((response) => setComments(response));
    // fetchUserReviews(token).then(setReviews);
  }, [token, rerender]);

  return (
    <div className="account-container d-flex flex-column">
      <div className="userInfo-container">
        <h1>{user && user.username}</h1>
        <h1>Welcome Back!</h1>
      </div>
      <div className="comments-reviews d-flex gap-4">
        <div className="comments-container">
          <h5>Comments</h5>
          <div className="d-flex flex-column gap-4">
            {comments &&
              comments.map((comment) => {
                return (
                  <>
                    <Card key={comment.id}>
                      <Card.Body>
                        <Card.Text>{comment.comment}</Card.Text>
                      </Card.Body>
                      <ButtonGroup className="gap-2">
                        <Button
                          variant="secondary"
                          className="rounded"
                          onClick={()=>{
                            setSpecificCommentId(comment.id),
                            setRerender(true);
                            handleShow()}}
                        >
                          Edit
                        </Button>
                        <Button variant="danger" className="rounded">
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Card>
                  </>
                );
              })}
          </div>
        </div>
        <div className="reviews-container">
          <h5>Reviews</h5>
        </div>
      </div>
      <EditCommentModal show={show} onHide={handleClose} id={specificCommentId} token={token} setRerender={setRerender}/>
    </div>
  );
};

export default MyAccount;
