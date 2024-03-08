import React, { useState } from "react";
import Modal from "react-modal";

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setFeedback("");
  };

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the feedback to the server or handle it in any other way
    alert("Feedback submitted:");
    handleCloseModal();
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="bg-blue-400 text-white p-3">Give Feedback</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Feedback Modal"
      >
        <div className="w-full pt-40">
          <div className="w-1/2 m-auto flex flex-col">
            <h2 className="font-[800] text-center">Feedback Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="feedback">Your Feedback:</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  className="border border-black p-2"
                  rows="4"
                  cols="50"
                  value={feedback}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center mt-4 gap-4">
              <button className="border p-3 bg-blue-300 rounded-lg" type="submit">Submit Feedback</button>
              <button className="border border-black p-3 rounded-lg"  onClick={handleCloseModal}>Close</button>
              </div>
              
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FeedbackForm;
