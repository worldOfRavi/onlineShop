import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductImageUpload({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) {
  const inputRef = useRef(null);
  console.log(file);
  

// function triggers on image file change
  const handleImageFileChange = (event) => {
    // console.log(event.target.files[0]);
    let selectedFile = event.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

//   function to handle onDragOver event
function handleOnDragOver(event){
    event.preventDefault();
}

// function to handle onDrop event
function handleOnDrop(event){
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if(droppedFile) setFile(droppedFile)
}

function handleRemoveImage(){
    setFile(null)
    if(inputRef.current){
        inputRef.current.value = ""
    }
}

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div onDragOver={handleOnDragOver} onDrop={handleOnDrop} className="border-2 border-dashed p-2 m-2 rounded-md">
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!file ? (
          <Label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer h-32">
          <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
                <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" onClick={handleRemoveImage} size="icon" className="text-muted-foreground hover:text-foreground">
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
