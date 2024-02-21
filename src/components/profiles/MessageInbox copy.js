// MessageInbox.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Button, Container, Row, Col } from "react-bootstrap";
import { getMessages, clearMessageCounter } from "../../actions/messagingActions";
import Message from "../Message";
import Loader from "../Loader";
import DOMPurify from "dompurify";
import Pagination from "../Pagination";

const MessageInbox = () => {
  const dispatch = useDispatch();

  const messaging = useSelector((state) => state.messaging);
  const { loading, messages, loadingError } = messaging;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = messages?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  const [expandedMessages, setExpandedMessages] = useState([]);

  const expandMessage = (messageId) => {
    setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
  };

  const clearMsgCounter = (msgId) => {
    const messageData = {
      msg_id: msgId,
    };
    dispatch(clearMessageCounter(messageData));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center py-3">Message Inbox</h2>
          {loadingError && <Message variant="danger">{loadingError}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <>
              <ListGroup>
                {currentItems?.map((message) => (
                  <ListGroup.Item key={message.id}>
                    <h4>{message?.subject}</h4>
                    <p>{message?.sender?.username}</p>
                    <p>{new Date(message?.timestamp).toLocaleString()}</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          expandedMessages.includes(message.id)
                            ? message.message
                            : message.message.split(" ")?.length > 10
                            ? message.message
                                .split(" ")
                                ?.slice(0, 10)
                                .join(" ") + " ..."
                            : message.message
                        ),
                      }}
                    />
                    {message?.message?.split(" ")?.length > 10 &&
                      !expandedMessages.includes(message.id) && (
                        <Button
                          variant="link"
                          // onClick={() => expandMessage(message.id)}
                          // onClick={() =>
                          //   clearMsgCounter(message.id)
                          // }
                          onClick={() => {
                            expandMessage(message.id);
                            clearMsgCounter(message.id);
                          }}
                        >
                          Read More
                        </Button>
                      )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
             
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={messages?.length}
                currentPage={currentPage}
                paginate={paginate} 
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MessageInbox;
