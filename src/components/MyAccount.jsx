import { useEffect, useState } from "react";
import { fetchUserComments, fetchUserReviews } from "../axios-services";
import EditCommentModal from "./EditCommentModal";
import { updateReviewComment } from "../axios-services";
import MyComments from "./MyComments";
import MyReviews from "./MyReviews";

const MyAccount = ({ user, token, products }) => {
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [specificReviewId, setSpecificReviewId] = useState(0);
  const [specificCommentId, setSpecificCommentId] = useState(0);
  const [show, setShow] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const handleComment = async () => {
      if (token) {
        try {
          const userComment = await fetchUserComments(token);
          const userReviews = await fetchUserReviews(token);
          setReviews(userReviews);
          setComments(userComment);
          setRerender(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleComment();
  }, [token, rerender]);

  const handleDelete = async () => {
    console.log("specificCommentId :>> ", specificCommentId);

    const deleteComment = {
      id: specificCommentId,
      isPublic: commentIsPublic,
      token,
    };
    try {
      setRerender(true);
      await updateReviewComment(deleteComment);
      setRerender(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="account-container d-flex flex-column w-75 align-items-center">
      <div className="userInfo-container text-center">
        <h1>{user && user.username}</h1>
        <h1>Welcome Back!</h1>
      </div>
      <div className="d-flex w-75 justify-content-around gap-4">
        <MyComments
          token={token}
          comments={comments}
          setRerender={setRerender}
          specificCommentId={specificCommentId}
          setSpecificCommentId={setSpecificCommentId}
          handleShow={handleShow}
        />
        <MyReviews
          token={token}
          reviews={reviews}
          products={products}
          setRerender={setRerender}
          specificReviewId={specificReviewId}
          setSpecificReviewId={setSpecificReviewId}
          handleShow={handleShow}
        />
      </div>
      <EditCommentModal
        show={show}
        onHide={handleClose}
        id={specificCommentId}
        token={token}
        setRerender={setRerender}
      />
    </div>
  );
};

export default MyAccount;

/*<div className="comments-container">
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
                            setSpecificCommentId(comment.id);
                            setRerender(true);
                            handleShow()}}
                        >
                          Edit
                        </Button>
                        <Button variant="danger" className="rounded" onClick={()=>{
                          setSpecificCommentId(comment.id);
                          handleDelete()}}>
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Card>
                  </>
                );
              })}
          </div>
        </div> */
