"use client";
import { Label } from "@/components/ui/label";
import { JSX, SVGProps } from "react";
import { ImageInput } from "./image-input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Back } from "./back";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useStore } from "@/lib/hook";

export function Profile() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  async function fetchUser() {
    const { data, error } = await supabase.from("users").select("*").eq("id", 1);

    if (error) {
      console.error("Error fetching user:", error);
    } else {
      console.log("User:", data);
    }
  }
  async function createUser() {
    if (!name || !age) {
      console.error("Name and age are required");
      return;
    }
    const { data, error } = await supabase
      .from("users")
      .update([
        {
          name: name,
          age: age,
          gender: gender,
          genderPreference: genderPreference,
          location: location,
          interests: interests,
          bio: bio,
          pfp: null,
          images: uploadedImages,
        },
      ])
      .eq("id", 1);

    if (error) {
      console.error("Error creating user:", error);
    } else {
      console.log("User created:", data);
    }
  }
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [name, setName] = useState("John Doe");
  const [age, setAge] = useState("18");
  const [gender, setGender] = useState("Male");
  const [genderPreference, setGenderPreference] = useState("Female");
  const [musicTaste, setMusicTaste] = useState("Rock");
  const [location, setLocation] = useState("San Fransisco, CA");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [interests, setInterests] = useState("Hiking, Camping, Reading, Cooking");
  const [bio, setBio] = useState(
    "Hi, I'm John! I'm a passionate outdoorsman who loves hiking, camping, and exploring new places. In my free time, you can find me reading, listening to music, or trying out new recipes in the kitchen. I'm looking to connect with like-minded individuals who share my love for adventure and personal growth. If you're interested in getting to know me better, feel free to reach out!"
  );
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const showNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => {
      if (prevQuestion < questions.length) {
        return prevQuestion + 1;
      }
      return prevQuestion;
    });
  };
  const showPreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => {
      if (prevQuestion > 0) {
        return prevQuestion - 1;
      }
      return prevQuestion;
    });
  };

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await Promise.all(
        uploadedImages.map(async (imageName) => {
          const { data, error } = await supabase.storage.from("images").download(imageName);
          if (error) {
            console.error("Error fetching image:", error);
          } else if (data) {
            const url = URL.createObjectURL(data);
            return url;
          }
        })
      );

      setImageUrls(urls.filter(Boolean) as string[]);
    };

    fetchImages();
  }, [uploadedImages]);

  const questions = [
    { question: "Name", placeholder: "Enter your name", function: setName },
    { question: "Age", placeholder: "Enter your age", function: setAge },
    {
      question: "Gender",
      placeholder: "Enter your gender",
      function: setGender,
    },
    {
      question: "Gender Preference",
      placeholder: "Enter gender preference",
      function: setGenderPreference,
    },
    {
      question: "Location",
      placeholder: "Enter your location",
      function: setLocation,
    },
    {
      question: "Music Taste",
      placeholder: "What kind of music do you like?",
      function: setMusicTaste,
    },
    {
      question: "Interests",
      placeholder: "Hobbies? Interests?, etc",
      function: setInterests,
    },
    {
      question: "Bio",
      placeholder: "Tell the world a bit about yourself",
      function: setBio,
    },
  ];

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="absolute top-5 left-5">
        <Back before="/" />
      </div>
      <div className="flex items-center justify-center gap-[100px] bg-gray-100 p-6 dark:bg-gray-800 lg:p-12 w-full flex-col">
        <div className="text-5xl text-center font-corm">Fill out basic information first...</div>
        <div className="flex flex-col items-center justify-center w-full -mt-5 mb-[200px]">
          {questions.map((eachQuestion: { question: string; placeholder: string }, index: number) => (
            <div key={index} className={`question w-2/3 ${index !== currentQuestion ? "hidden" : ""}`}>
              <div className="space-y-2 w-full ">
                <Label htmlFor="name">{questions[index].question}</Label>
                <Textarea
                  className=""
                  id="name"
                  placeholder={questions[index].placeholder}
                  onChange={(e) => questions[index].function(e.target.value)}
                />
              </div>
            </div>
          ))}
          <div className={`w-2/3  ${currentQuestion === 8 ? "" : "hidden"}`}>
            <ImageInput
              onUpload={(images) => {
                setUploadedImages(images);
                console.log("Uploaded Images: ", images);
              }}
            />
          </div>

          <div className="flex justify-between w-2/3">
            <div className={`flex items-center gap-2 mt-5 ${currentQuestion === 0 ? "invisible" : ""}`}>
              <Button size="icon" variant="outline" onClick={showPreviousQuestion} disabled={currentQuestion === 0}>
                <ArrowRightIcon className="h-4 w-4 rotate-180" />
                <span className="sr-only">Previous</span>
              </Button>
              <span className="text-sm font-medium">Next</span>
            </div>
            <div onClick={currentQuestion === 8 ? createUser : () => {}} className="flex items-center gap-2 mt-5">
              {" "}
              <span className="text-sm font-medium">{currentQuestion === 8 ? "Submit" : "Next"}</span>
              <Link href={`/${currentQuestion === 8 ? "aichat" : "profile"}`}>
                <Button size="icon" variant="outline" onClick={showNextQuestion} disabled={currentQuestion === questions.length + 1}>
                  <ArrowRightIcon className="h-4 w-4 " />
                  <span className="sr-only">Next</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-gray-50 p-6 dark:bg-gray-900 pt-16">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage alt="Profile Picture" src="/placeholder-avatar.jpg" />
              <Image alt="asdf" height={200} src={imageUrls[0] ? imageUrls[0] : "/placeholder.svg"} width={300} />
            </Avatar>
            <div className="space-y-1 text-center">
              <div className="text-2xl font-bold">{name}</div>
              <div className="text-gray-500 dark:text-gray-400">{age} years old</div>
              <div className="text-gray-500 dark:text-gray-400">{gender}</div>
              <div className="text-gray-500 dark:text-gray-400">Interested in {genderPreference}</div>
              <div className="text-gray-500 dark:text-gray-400">{location}</div>
              <div className="text-gray-500 dark:text-gray-400">{musicTaste} music</div>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>{bio}</p>
            <div className="space-y-2">
              <div className="font-medium">Interests:</div>
              <div>{interests}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              alt="/placeholder.svg"
              className="aspect-video rounded-md object-cover"
              height={200}
              src={imageUrls[1] ? imageUrls[1] : "/placeholder.svg"}
              width={300}
            />
            <Image
              alt="Image 2"
              className="aspect-video rounded-md object-cover"
              height={200}
              src={imageUrls[2] ? imageUrls[2] : "/placeholder.svg"}
              width={300}
            />
            <Image
              alt="Image 3"
              className="aspect-video rounded-md object-cover"
              height={200}
              src={imageUrls[3] ? imageUrls[3] : "/placeholder.svg"}
              width={300}
            />
            <Image
              alt="Image 4"
              className="aspect-video rounded-md object-cover"
              height={200}
              src={imageUrls[4] ? imageUrls[4] : "/placeholder.svg"}
              width={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
