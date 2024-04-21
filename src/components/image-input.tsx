import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export function ImageInput({
  onUpload,
}: {
  onUpload: (images: string[]) => void;
}) {
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImages((prevImages) => [...prevImages, file]);
    }
  };

  const handleSubmit = async () => {
    const newUploadedImages: string[] = [];
    for (const file of images) {
      const uniqueName = uuidv4();
      const filePath = `${uniqueName}.${file.name.split(".").pop()}`;
      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image:", error);
      } else {
        console.log("Image uploaded:", filePath);
        newUploadedImages.push(filePath);
      }
    }
    setUploadedImages(newUploadedImages);
    onUpload(newUploadedImages);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <Label htmlFor="image" className="items-center flex justify-center">
        Add up to 4 memorable photos
      </Label>
      <div className="flex justify-between w-full gap-5 items-center pt-2 ">
        <Input
          accept="image/*"
          id="image"
          type="file"
          className="flex justify-center items-center p-3"
          onChange={handleImageChange}
        />
        <div
          onClick={handleSubmit}
          className="rounded-md h-12 bg-slate-700 p-5 text-white text-center items-center flex justify-center cursor-pointer"
        >
          Add
        </div>
      </div>
    </div>
  );
}
