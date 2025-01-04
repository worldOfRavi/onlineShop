import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

export default function ProductImageUpload({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoading
}) {
  const inputRef = useRef(null);
//   console.log(file);
  

  // function triggers on image file change
  const handleImageFileChange = (event) => {
    // console.log(event.target.files[0]);
    let selectedFile = event.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  //   function to handle onDragOver event
  function handleOnDragOver(event) {
    event.preventDefault();
  }

  // function to handle onDrop event
  function handleOnDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  }

//   function to remove the image
  function handleRemoveImage() {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

//   function to upload the image when the button is clicked
  async function uploadImageToCloudinary(){
    const data = new FormData();
    data.append('my_file',file);
    // console.log(data);
    setImageLoading(true)
    const response  = await axios.post("http://localhost:5000/api/admin/products/upload-image", data);

    if(response?.data?.result?.url){
        setImageLoading(false);
        setUploadedImageUrl(response?.data?.result?.url)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleOnDragOver}
        onDrop={handleOnDrop}
        className="border-2 border-dashed p-2 m-2 rounded-md"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer h-32"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{file.name}</p>
            <Button
              variant="ghost"
              onClick={handleRemoveImage}
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 justify-end my-2">
      {uploadedImageUrl && <p className="text-green-500">Image uploaded successfully!</p>}
        <Button
          className="disabled:bg-muted-foreground disabled:cursor-not-allowed"
          disabled={!file}
          onClick = {uploadImageToCloudinary}
        >
          Upload Image
        </Button>
      </div>
    </div>
  );
}
