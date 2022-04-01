import { useEffect, useState } from "react";
import { fetchUserComments, fetchUserReviews } from "../axios-services";
import EditCommentModal from "./EditCommentModal";
import EditReviewsModal from "./EditReviewsModal";
import MyComments from "./MyComments";
import MyReviews from "./MyReviews";

const MyAccount = ({ user, token, products }) => {
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [specificReviewId, setSpecificReviewId] = useState(null);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [specificCommentId, setSpecificCommentId] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

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
          setRerender(false);
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
          products={products}
          comments={comments}
          setRerender={setRerender}
          handleShow={handleCommentShow}
          specificCommentId={specificCommentId}
          setSpecificCommentId={setSpecificCommentId}
        />
        <MyReviews
          token={token}
          reviews={reviews}
          products={products}
          setRerender={setRerender}
          handleShow={handleReviewsShow}
          specificReviewId={specificReviewId}
          setSpecificReviewId={setSpecificReviewId}
        />
      </div>
      <EditCommentModal
        token={token}
        id={specificCommentId}
        show={showCommentsModal}
        setRerender={setRerender}
        onHide={handleCommentClose}
      />
      <EditReviewsModal
        token={token}
        reviews={reviews}
        id={specificReviewId}
        show={showReviewsModal}
        setRerender={setRerender}
        onHide={handleReviewsClose}
      />
    </div>
  );
};

export default MyAccount;
