import {
  Container,
  Card,
  Button,
  Col,
  Row
} from 'react-bootstrap';

// Importing the useQuery and useMutation hooks from Apollo, GET_ME query, and REMOVE_BOOK mutation
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};
  console.log(userData);
  const [removeBook] = useMutation(REMOVE_BOOK);

  // create function that accepts the book"s mongo _id value as param and deletes the book from the database
  async function handleDeleteBook(bookId) {
    try {
      await removeBook({
        variables: {bookId: bookId}
      });
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  }


  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container >
        <h2>
          {userData.savedBooks?.length
              ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            :'You have no saved books!'}
        </h2>
        <Row>
        <Col>
        {userData.savedBooks?.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}>
                  Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
