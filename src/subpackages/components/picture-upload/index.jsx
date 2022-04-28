import React, {useCallback, useRef, useState} from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import ReactCrop from "react-image-crop";

export default function PictureUpload({fileName, onClose, onReady}) {
  const [image, setImage] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({unit: "%", x: 10, y: 10, width: 80, height: 80});

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      // noinspection JSCheckFunctionSignatures
      reader.addEventListener("load", () => setImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  async function handleReady() {
    if (imgRef.current == null)
      return;

    const imageBlob = await getCroppedImg(imgRef.current, crop, fileName);

    onReady(imageBlob);
  }

  return (
    <Modal show={true} scrollable size="lg">
      <Modal.Body>
        <Form>
          <Form.Group as={Row}>
            <Col>
              <Form.Control id="imageInput"
                            type="file" accept="*.jpg;*.jpeg;*.png"
                            onChange={onSelectFile}/>
            </Col>
          </Form.Group>
        </Form>

        <br/>

        <ReactCrop src={image}
                   crop={crop}
                   onImageLoaded={onLoad}
                   onChange={setCrop}/>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClose}>Закрыть</Button>
        <Button onClick={handleReady}>Готово</Button>
      </Modal.Footer>
    </Modal>
  );
}

function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  // New lines to be added
  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        blob.name = fileName;
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
}