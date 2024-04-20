"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useState } from "react";

export function Profile() {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [name, setName] = useState("John Doe");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [musicTaste, setMusicTaste] = useState("Rock");
  const [location, setLocation] = useState("San Fransisco, CA");
  const [interests, setInterests] = useState(
    "Hiking, Camping, Reading, Cooking"
  );
  const [bio, setBio] = useState(
    "Hi, I'm John! I'm a passionate outdoorsman who loves hiking, camping, and exploring new places. In my free time, you can find me reading, listening to music, or trying out new recipes in the kitchen. I'm looking to connect with like-minded individuals who share my love for adventure and personal growth. If you're interested in getting to know me better, feel free to reach out!"
  );
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center bg-gray-100 p-6 dark:bg-gray-800 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              placeholder="Enter your age"
              type="number"
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <RadioGroup
              className="flex items-center gap-4"
              defaultValue="male"
              id="gender"
            >
              <Label
                className="flex items-center gap-2 cursor-pointer"
                htmlFor="gender-male"
              >
                <RadioGroupItem id="gender-male" value="male" />
                Male
              </Label>
              <Label
                className="flex items-center gap-2 cursor-pointer"
                htmlFor="gender-female"
              >
                <RadioGroupItem id="gender-female" value="female" />
                Female
              </Label>
              <Label
                className="flex items-center gap-2 cursor-pointer"
                htmlFor="gender-other"
              >
                <RadioGroupItem id="gender-other" value="other" />
                Other
              </Label>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender-preference">Gender Preference</Label>
            <RadioGroup
              className="flex items-center gap-4"
              defaultValue="any"
              id="gender-preference"
            >
              <Label
                className="flex items-center gap-2 cursor-pointer"
                htmlFor="gender-preference-any"
              >
                <RadioGroupItem id="gender-preference-any" value="any" />
                Any
              </Label>
              <Label
                className="flex items-center gap-2 cursor-pointer"
                htmlFor="gender-preference-male"
              >
                <RadioGroupItem id="gender-preference-male" value="male" />
                Male
              </Label>
              <Label
                className="flex items-center gap-2 cursor-pointer"
                htmlFor="gender-preference-female"
              >
                <RadioGroupItem id="gender-preference-female" value="female" />
                Female
              </Label>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="music-taste">Music Taste</Label>
            <Select
              defaultValue="rock"
              onValueChange={(value) =>
                setMusicTaste(capitalizeFirstLetter(value))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select music taste" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="classical">Classical</SelectItem>
                <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Interests</Label>
            <Input
              id="location"
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Tell us about your interests"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interests">Bio</Label>
            <Textarea
              className="min-h-[120px]"
              id="interests"
              placeholder="Tell us about yourself"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <Input id="profile-picture" type="file" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              alt="Image 1"
              className="aspect-video rounded-md object-cover"
              height={200}
              src="/placeholder.svg"
              width={300}
            />
            <img
              alt="Image 2"
              className="aspect-video rounded-md object-cover"
              height={200}
              src="/placeholder.svg"
              width={300}
            />
            <img
              alt="Image 3"
              className="aspect-video rounded-md object-cover"
              height={200}
              src="/placeholder.svg"
              width={300}
            />
            <img
              alt="Image 4"
              className="aspect-video rounded-md object-cover"
              height={200}
              src="/placeholder.svg"
              width={300}
            />
          </div>
          <Button className="w-full" type="submit">
            Save Profile
          </Button>
        </div>
      </div>
      <div className="flex justify-center bg-gray-50 p-6 dark:bg-gray-900 pt-16">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                alt="Profile Picture"
                src="/placeholder-avatar.jpg"
              />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <div className="text-2xl font-bold">{name}</div>
              <div className="text-gray-500 dark:text-gray-400">
                {age} years old
              </div>
              <div className="text-gray-500 dark:text-gray-400">Male</div>
              <div className="text-gray-500 dark:text-gray-400">
                Interested in Any
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {musicTaste} music
              </div>
              <div className="text-gray-500 dark:text-gray-400">{location}</div>
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
            <img
              alt="Image 1"
              className="aspect-video rounded-md object-cover"
              height={200}
              src="/placeholder.svg"
              width={300}
            />
            <img
              alt="Image 2"
              className="aspect-video rounded-md object-cover"
              height={200}
              src="/placeholder.svg"
              width={300}
            />
            <img
              alt="Image 3"
              className="aspect-video rounded-md object-cover"
              height={200}
              src="/placeholder.svg"
              width={300}
            />
            <img
              alt="Image 4"
              className="aspect-video rounded-md object-cover"
              height={200}
              src="/placeholder.svg"
              width={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
