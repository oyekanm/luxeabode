import { redirect } from '@tanstack/react-router'

export function redirectTo(path: string) {
  return redirect({ to: path })
}
