import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfileManagement() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and Email are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    // Send formData to your backend API
    // Example: fetch('/api/update-profile', { method: 'POST', body: formData })

    alert("Profile updated!");
  };

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle>Profile Management</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Profile Picture</label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="mt-2 w-20 h-20 object-cover rounded-full border"
              />
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit">Save Profile</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
