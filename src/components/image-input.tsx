import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function ImageInput() {
  const [images, setImages] = useState<File[]>([]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImages((prevImages) => [...prevImages, file]);
      console.log(images);
    }

    console.log(images);
  };
  useEffect(() => {
    console.log(images);
  }, [images]);
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
        <div className="rounded-md h-12 bg-slate-700 p-5 text-white text-center items-center flex justify-center">
          Add
        </div>
      </div>
    </div>
  );
}
