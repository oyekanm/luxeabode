'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Lock, Bell, CreditCard, Trash2, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    promotionalEmails: false,
    reviewReminders: true,
  })

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security</p>
      </div>

      {/* Security Section */}
      <Card className="border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="font-serif text-xl font-bold">Security</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Change Password</h3>
            <div className="space-y-3">
              <Input type="password" placeholder="Current Password" className="bg-background" />
              <Input type="password" placeholder="New Password" className="bg-background" />
              <Input type="password" placeholder="Confirm New Password" className="bg-background" />
            </div>
            <Button className="mt-4">Update Password</Button>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add an extra layer of security to your account
            </p>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </div>
      </Card>

      {/* Notifications Section */}
      <Card className="border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-serif text-xl font-bold">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h3 className="font-medium">Booking Updates</h3>
              <p className="text-sm text-muted-foreground">Get notified about your reservations</p>
            </div>
            <Switch
              checked={notifications.bookingUpdates}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, bookingUpdates: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h3 className="font-medium">Promotional Emails</h3>
              <p className="text-sm text-muted-foreground">Receive offers and special deals</p>
            </div>
            <Switch
              checked={notifications.promotionalEmails}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, promotionalEmails: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h3 className="font-medium">Review Reminders</h3>
              <p className="text-sm text-muted-foreground">Remind me to review completed stays</p>
            </div>
            <Switch
              checked={notifications.reviewReminders}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, reviewReminders: checked })
              }
            />
          </div>
        </div>

        <Button className="mt-6">Save Preferences</Button>
      </Card>

      {/* Payment Method Section */}
      <Card className="border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-5 h-5 text-primary" />
          <h2 className="font-serif text-xl font-bold">Payment Methods</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/2026</p>
            </div>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </div>
        </div>

        <Button variant="outline" className="mt-4">
          Add Payment Method
        </Button>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20 bg-destructive/5 p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <h2 className="font-serif text-xl font-bold text-destructive">Danger Zone</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteModal(true)}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="border-border max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h3 className="font-serif text-lg font-bold">Delete Account?</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1">
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
