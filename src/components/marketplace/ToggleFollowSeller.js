// ToggleFollowSeller.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFollowSeller } from "../../actions/marketplaceSellerActions";
import { getUserProfile } from "../../actions/userProfileActions";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import LoaderButton from "../LoaderButton";

function ToggleFollowSeller({ sellerDetail }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
    dispatch(getUserProfile());
  }, [dispatch, userInfo]);

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const [loading, setLoading] = useState(false);
  // const [isSellerFollowed, setIsSellerFollowed] = useState(false);
  const [isSellerFollowed, setIsSellerFollowed] = useState(
    profile?.followed_sellers?.some(
      (seller) => seller.seller_username === sellerDetail.seller_username
    ) || false
  );
  const [followSellerCount, setFollowSellerCount] = useState(
    sellerDetail?.follow_seller_count
  );

  console.log("follow_seller_count", sellerDetail?.follow_seller_count);

  useEffect(() => {
    if (profile && sellerDetail) {
      const followedSellers = profile.followed_sellers || [];
      const isFollowed = followedSellers.some(
        (seller) => seller.seller_username === sellerDetail.seller_username
      );
      setIsSellerFollowed(isFollowed);
    }
  }, [profile, sellerDetail]);

  const handleToggleFollowSeller = async () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setLoading(true);

      const toggleData = {
        seller_username: sellerDetail.seller_username,
      };

      try {
        const response = await dispatch(toggleFollowSeller(toggleData));
        setIsSellerFollowed((prev) => !prev);
        setFollowSellerCount(response?.follow_seller_count);
      } finally {
        setLoading(false);
      }
    }
  };

  function formatCount(saveCount) {
    if (saveCount >= 1000000) {
      // Format as million
      return (saveCount / 1000000).toFixed(1) + "m";
    } else if (saveCount >= 1000) {
      // Format as thousand
      return (saveCount / 1000).toFixed(1) + "k";
    } else {
      return saveCount?.toString();
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <div className="mt-2">
            <Button variant="outline-success" className="rounded" disabled>
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  Followers:
                  <span className="text-muted">
                    {" "}
                    {formatCount(followSellerCount)}
                  </span>
                </span>
                <span>
                  {loading && (
                    <span className="py-2">
                      <LoaderButton />
                    </span>
                  )}
                </span>
              </div>
            </Button>
          </div>

          <div className="mt-2">
            <span>
              {isSellerFollowed ? (
                <>
                  <Button
                    onClick={handleToggleFollowSeller}
                    variant="primary"
                    className="rounded"
                  >
                    Unfollow <FontAwesomeIcon icon={faUserCheck} />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleToggleFollowSeller}
                    variant="danger"
                    className="rounded"
                  >
                    Follow <FontAwesomeIcon icon={faPlusSquare} />
                  </Button>
                </>
              )}
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ToggleFollowSeller;
