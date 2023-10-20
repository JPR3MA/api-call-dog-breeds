import Axios from "axios";
import React from "react";
import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";

function Options() {
  var breedsHTMLString = "<option value='no-breed'>Select a Breed</option>";

  const [breedsList, setBreedsList] = useState("");

  if (breedsList === "") {
    Axios.get("https://dog.ceo/api/breeds/list/all").then((res) => {
      setBreedsList(res.data.message);
    });
  }

  for (const values in breedsList) {
    if (breedsList.hasOwnProperty(values)) {
      breedsHTMLString += `<option value='${values}'>${values}</option>`;
      for (const secondValues in breedsList[values]) {
        if (breedsList[values].hasOwnProperty(secondValues)) {
          breedsHTMLString += `
            <option value='${values}/${breedsList[values][secondValues]}'>
              ${breedsList[values][secondValues]} ${values}
            </option>
          `;
        }
      }
    }
  }

  var cleanBreedsHTMLString = DOMPurify.sanitize(breedsHTMLString);

  cleanBreedsHTMLString = `
    <select id='selectedBreed'>
      ${cleanBreedsHTMLString} 
    </select>
    <button onClick=checkBreed()>
      Fetch! (display selected breed on console)
    </button>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: cleanBreedsHTMLString }}></div>
  );
}

export default Options;
