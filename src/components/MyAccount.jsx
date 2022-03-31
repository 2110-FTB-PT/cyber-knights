import { useEffect, useState } from "react";
import { fetchUserComments, fetchUserReviews } from "../axios-services";
import EditCommentModal from "./EditCommentModal";
import EditReviewsModal from "./EditReviewsModal";
import MyComments from "./MyComments";
import MyReviews from "./MyReviews";

const MyAccount = ({ user, token, products }) => {
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [specificReviewId, setSpecificReviewId] = useState(0);
  const [specificCommentId, setSpecificCommentId] = useState(0);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [rerender, setRerender] = useState(false);
  console.log("reviews :>> ", reviews);

  const handleCommentClose = () => setShowCommentsModal(false);
  const handleCommentShow = () => setShowCommentsModal(true);

  const handleReviewsClose = () => setShowReviewsModal(false);
  const handleReviewsShow = () => setShowReviewsModal(true);

  useEffect(() => {
    const handleComment = async () => {
      if (token) {
        try {
          const userComment = await fetchUserComments(token);
          const userReviews = await fetchUserReviews(token);
          setReviews(userReviews);
          setComments(userComment);
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleComment();
  }, [token, rerender]);

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
          handleShow={handleCommentShow}
        />
        <MyReviews
          token={token}
          reviews={reviews}
          products={products}
          setRerender={setRerender}
          specificReviewId={specificReviewId}
          setSpecificReviewId={setSpecificReviewId}
          handleShow={handleReviewsShow}
        />
      </div>
      <EditCommentModal
        show={showCommentsModal}
        onHide={handleCommentClose}
        id={specificCommentId}
        token={token}
        setRerender={setRerender}
      />
      <EditReviewsModal
        token={token}
        reviews={reviews}
        show={showReviewsModal}
        id={specificReviewId}
        setRerender={setRerender}
        onHide={handleReviewsClose}
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
