import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { updateReviewComment } from "../axios-services";

export default function MyComments({
  token,
  comments,
  setRerender,
  specificCommentId,
  setSpecificCommentId,
  handleShow,
}) {
  const handleDelete = async () => {
    const deleteComment = {
      id: specificCommentId,
      isPublic: false,
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
    <div className="comments-container w-50">
      <h5>Comments</h5>
      <div className="d-flex flex-column gap-4">
        {comments &&
          comments.map((comment) => {
            return (
              <Card key={comment.id}>
                <Card.Body>
                  <Card.Text>{comment.comment}</Card.Text>
                </Card.Body>
                <ButtonGroup className="gap-2">
                  <Button
                    variant="secondary"
                    className="rounded"
                    onClick={() => {
                      setSpecificCommentId(comment.id);
                      setRerender(true);
                      handleShow();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="rounded"
                    onClick={() => {
                      setSpecificCommentId(comment.id);
                      handleDelete();
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
