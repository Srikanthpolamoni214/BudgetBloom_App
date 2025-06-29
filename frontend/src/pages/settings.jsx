import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import "../styles/setting.css"

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Profile Management */}
      <Card className="rounded-2xl shadow-lg settings-section">
        <CardHeader>
          <CardTitle>Profile Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grid-cols-2-md">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <Input placeholder="Your Name" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Input type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Profile Picture</label>
            <input type="file" accept="image/*" className="file-input" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Profile</Button>
        </CardFooter>
      </Card>

      <Separator />

      {/* Currency & Language Preferences */}
      <Card className="rounded-2xl shadow-lg settings-section">
        <CardHeader>
          <CardTitle>Currency & Language Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grid-cols-2-md">
            <div>
              <label className="block mb-1 font-medium">Default Currency</label>
              <Select >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  {/* Add more currencies */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Language</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  {/* Add more languages */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>

      <Separator />

      {/* Notification Settings */}
      <Card className="rounded-2xl shadow-lg settings-section">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="settings-switch-label">Email Notifications</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="settings-switch-label">Push Notifications</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="settings-switch-label">SMS Alerts</span>
            <Switch />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Update Notifications</Button>
        </CardFooter>
      </Card>

      <Separator />

      {/* Security Section */}
      <Card className="rounded-2xl shadow-lg settings-section">
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grid-cols-2-md">
              <Input type="password" placeholder="Current Password" />
              <Input type="password" placeholder="New Password" />
              <Input type="password" placeholder="Confirm Password" />
            </div>
            <Button>Change Password</Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Multi-Factor Authentication</h3>
            <p>Enable or disable MFA for your account.</p>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Delete Account Section */}
      <Card className="rounded-2xl shadow-lg border border-red-200 card-delete">
        <CardHeader>
          <CardTitle className="card-title">Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Delete Account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
