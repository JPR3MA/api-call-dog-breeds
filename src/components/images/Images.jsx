import Axios from "axios";
import React from "react";
import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import "./Images.css";

function Images() {
  var imagesHTMLString = "";

  const [specificBreedImages, setSpecificBreedImages] = useState("");

  function fetchDogBreed(breed) {
    if (breed === "no-breed") {
      setSpecificBreedImages([
        "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg",
      ]);
    } else {
      Axios.get(`https://dog.ceo/api/breed/${breed}/images`).then((res) => {
        setSpecificBreedImages(res.data.message);
      });
    }
  }

  if (specificBreedImages === "") {
    fetchDogBreed("no-breed");
  }

  for (let i = 0; i < specificBreedImages.length; i++) {
    imagesHTMLString += `<img src=${specificBreedImages[i]} alt='IMAGE COULD NOT LOAD'>`;
  }

  var cleanImagesHTMLString = DOMPurify.sanitize(imagesHTMLString);

  return (
    <div>
      <button
        onClick={() =>
          fetchDogBreed(document.getElementById("selectedBreed").value)
        }
      >
        Display Images!
      </button>
      <div
        className="breed__images"
        dangerouslySetInnerHTML={{ __html: cleanImagesHTMLString }}
      ></div>
    </div>
  );
}

export default Images;
