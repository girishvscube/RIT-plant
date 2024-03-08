import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import FeedbackForm from "./Feedback";

const Predict = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState();
  const [predictionResults, setPredictionResults] = useState();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("http://127.0.0.1:5000/predict_plant", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");

        setLoading(false);
      }

      const data = await response.json();
      // Handle the response data as needed
      console.log("Prediction result:", data);
      setPredictionResults(data);

      setLoading(false);
      // You can update state or perform other actions with the received data
    } catch (error) {
      console.error("Error:", error);

      setLoading(false);
      // Handle errors, display error messages, etc.
    }
  };

  useEffect(() => {
    function googleTranslateElementInit() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout:
            window.google.translate.TranslateElement.InlineLayout.HORIZONTAL, // Set to HORIZONTAL for one-line style
          autoDisplay: false,
        },
        "google_translate_element"
      );
    }

    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      script.addEventListener("load", googleTranslateElementInit);
    } else {
      googleTranslateElementInit();
    }
  }, []);

  return (
    <div className="h-screen w-full   bgImage bg-opacity-10">
      <div className="text-white text-4xl text-center pt-10 capitalize">
        IMAGE BASED PLANT RECOGNITION
      </div>
      <FeedbackForm/>
      <div className="w-full flex justify-end px-10">
        <div id="google_translate_element" className="w-[300px]"></div>
      </div>

     

      <div className="grid grid-cols-2 gap-6">
        <div className="text-white">
          <div className="w-full flex flex-col items-center justify-center h-screen my-auto p-4  rounded-lg text-center">
            <input type="file" onChange={handleFileChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 mx-auto max-w-full max-h-[40vh]"
              />
            )}

            <button
              className="mt-4 w-32 py-2 bg-black rounded-md text-white"
              onClick={handlePredict}
            >
              {loading ? "Loadin...." : "Predict"}
            </button>
          </div>
        </div>

        <div className="text-white w-full mt-[20vh] ">
          <p className="text-center text-3xl pt-6">Prediction Results</p>

          {loading ? (
            <p className="text-3xl text-center">Loading</p>
          ) : (
            <>
              <div className="w-[90%] flex flex-col gap-4 h-[70vh]  p-4 m-auto mt-10 rounded-md  text-white shadow-2xl">
                <div className="flex gap-2">
                  <p className="font-[600]">Name:</p>
                  <p className="font-[800]">{predictionResults?.name}</p>
                </div>

                <div className="flex gap-2">
                  <p className="font-[600]">scientific_name:</p>
                  <p className="font-[800]">
                    {predictionResults?.scientific_name}
                  </p>
                </div>

                <div className="flex gap-2">
                  <p className="font-[600]">recognition:</p>
                  <p className="font-[800]">{predictionResults?.recognition}</p>
                </div>

                <div className="flex gap-2">
                  <p className="font-[600]">first_identified:</p>
                  <p className="font-[800]">
                    {predictionResults?.first_identified}
                  </p>
                </div>

                <div className="flex gap-2">
                  <p className="font-[600]">discovery_year:</p>
                  <p className="font-[800]">
                    {predictionResults?.discovery_year}
                  </p>
                </div>

                <div className="flex gap-2">
                  <p className="font-[600]">QR Code:</p>
                  {predictionResults && (
                    <QRCode value={JSON.stringify(predictionResults)} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predict;
