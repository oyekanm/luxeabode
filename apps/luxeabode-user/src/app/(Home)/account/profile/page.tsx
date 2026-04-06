'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Edit2 } from 'lucide-react'
import { useState } from 'react'

const USER_DATA = {
  name: 'Sarah Anderson',
  email: 'sarah.anderson@email.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  location: 'San Francisco, CA',
  joinDate: 'January 2025',
  memberStatus: 'Gold Member',
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(USER_DATA)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    setIsEditing(false)
    // Handle save logic here
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? 'default' : 'outline'}
          className="gap-2"
        >
          <Edit2 className="w-4 h-4" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Header Card */}
      <Card className="overflow-hidden border-border">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 h-32" />
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-12 mb-6">
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-24 h-24 rounded-lg border-4 border-card bg-muted"
              />
            </div>
            <div className="flex-1 pt-8">
              <div className="mb-4">
                {isEditing ? (
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-2xl font-bold mb-2 bg-background"
                  />
                ) : (
                  <h2 className="text-2xl font-bold mb-1">{formData.name}</h2>
                )}
                <p className="text-sm text-primary font-medium">{formData.memberStatus}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Member since {formData.joinDate}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-6">
            {/* Email */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium">Email Address</label>
              </div>
              {isEditing ? (
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background"
                />
              ) : (
                <p className="text-foreground">{formData.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium">Phone Number</label>
              </div>
              {isEditing ? (
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background"
                />
              ) : (
                <p className="text-foreground">{formData.phone}</p>
              )}
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium">Location</label>
              </div>
              {isEditing ? (
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-background"
                />
              ) : (
                <p className="text-foreground">{formData.location}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 mt-8 border-t border-border pt-6">
              <Button onClick={handleSubmit} className="flex-1">
                Save Changes
              </Button>
              <Button
                onClick={() => {
                  setFormData(USER_DATA)
                  setIsEditing(false)
                }}
                variant="outline"
                className="flex-1"
              >
                Discard
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
