import React, { useState } from "react";
import { Form, Image } from "react-bootstrap";
import newBookImg from "../../Assets/Imgs/default_book.png";

const UploadImg = ({ img, setImg, defaultImg, altText }) => {
  const [image, setimage] = useState();
  const handleImgChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];

      if (file && file.type.startsWith("image/") && file.size < 10485760) {
        // 10MB size limit
        const reader = new FileReader();

        reader.onload = () => {
          setImg(file);
          setimage(reader.result);
        };

        reader.readAsDataURL(file);
      }
    } else {
      setimage(newBookImg);
    }
  };

  return (
    <Form.Group>
      <div className="custom-file">
        <Form.Control
          type="file"
          className="custom-file-input"
          id="customFile"
          onChange={handleImgChange}
        />
        <Form.Label className="custom-file-label" htmlFor="customFile">
          Joriy rasm
        </Form.Label>
      </div>
      {img ? (
        <Image width={"600px"} src={image} alt={altText} fluid />
      ) : (
        <div>
          <Image
            src={defaultImg ? defaultImg : newBookImg}
            alt={altText}
            fluid
          />
        </div>
      )}
    </Form.Group>
  );
};

export default UploadImg;
