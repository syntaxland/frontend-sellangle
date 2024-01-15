// // // ResendEmailOtp
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Form, Button } from "react-bootstrap";
// import { resendEmailOtp } from "../../actions/emailOtpActions";
// import Loader from "../Loader";
// import Message from "../Message";

// const ResendEmailOtp = () => {
//   const dispatch = useDispatch();

//   const emailOtpResend = useSelector((state) => state.emailOtpResend);
//   const { loading, success, error } = emailOtpResend;

//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(60);

//   const handleResendEmailOtp = () => {
//     dispatch(resendEmailOtp());
//     setResendDisabled(true);
//   };

//   useEffect(() => {
//     let timer;
//     if (countdown > 0 && resendDisabled) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else {
//       setResendDisabled(false);
//       setCountdown(60);
//     }

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [countdown, resendDisabled]);

//   return (
//     <Form onSubmit={handleResendEmailOtp} action="#">
//       {loading && <Loader />}
//       {error && <Message variant="danger">{error}</Message>}
//       {success && (
//         <Message variant="success">Email OTP resent successfully!</Message>
//       )}
//       <Button variant="link" type="submit" disabled={resendDisabled}>
//         Resend OTP {resendDisabled && `(${countdown}s)`}
//       </Button>
//     </Form>
//   );
// };

// export default ResendEmailOtp;

// // import React from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { resendEmailOtp } from "../../actions/emailOtpActions";
// // import Loader from "../../components/Loader";
// // import Message from "../../components/Message";

// // const ResendEmailOtp = () => {
// //   const dispatch = useDispatch();

// //   const emailOtpResend = useSelector((state) => state.emailOtpResend);
// //   const { loading, success, error } = emailOtpResend;

// //   const handleResendEmailOtp = () => { 
// //     dispatch(resendEmailOtp());
// //   };

// //   return (
// //     <div>
// //       {loading && <Loader />}
// //       {error && <Message variant="danger">{error}</Message>}
// //       {success && (
// //         <Message variant="success">Email OTP resent successfully!</Message>
// //       )}
// //       <button onClick={handleResendEmailOtp} disabled={loading || success}>
// //         Resend Email OTP
// //       </button>
// //     </div>
// //   );
// // };

// // export default ResendEmailOtp;
