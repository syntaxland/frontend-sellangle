// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { sendEmailOtp } from "../../actions/emailOtpActions";
// import Loader from "../../components/Loader";
// import Message from "../../components/Message"; 

// const SendEmailOtp = () => {
//   const dispatch = useDispatch();
 
//   const emailOtpSend = useSelector((state) => state.emailOtpSend);
//   const { loading, success, error } = emailOtpSend;

//   const handleSendEmailOtp = () => {
//     dispatch(sendEmailOtp());
//   };

//   return (
//     <div>
//       {loading && <Loader />}
//       {error && <Message variant="danger">{error}</Message>}
//       {success && (
//         <Message variant="success">Email OTP sent successfully!</Message>
//       )}
//       <button onClick={handleSendEmailOtp} disabled={loading || success}>
//         Send Email OTP
//       </button>
//     </div>
//   );
// };

// export default SendEmailOtp;
