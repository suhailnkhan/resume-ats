import { useCallback, useEffect, useState } from "react";

const useApi = () => {
  const [laoding, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const hanldeSubmit = ({ formDataa }) => {
    setLoading(true);
    const formData = new FormData();
    // Append the file
    formData.append("file", formDataa.files[0]);
    formData.append("jd", formDataa.jd);
    setData(null);

    const apiUrl = "http://127.0.0.1:8000/api/submit-resume/";
    const options = {
      method: "POST",
      body: formData,
    };
    // Make the POST request
    fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON data in the response
      })
      .then((data) => {
        console.log("Response:", data);
        setLoading(false);
        setData(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Fetch error:", error);
      });
  };

  return {
    hanldeSubmit,
    laoding,
    data,
  };
};

export default useApi;
