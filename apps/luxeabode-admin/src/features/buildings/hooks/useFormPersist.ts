// features/apartments/hooks/useFormPersist.ts
import type { CreateApartmentInput } from '@/lib/validators/building'
import type { UseFormReturn } from '@repo/ui/form'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useRouter } from '@tanstack/react-router'

export function useFormPersist(
  methods: UseFormReturn<CreateApartmentInput>,
  userId: string,
) {
  const [loaded, setLoaded] = useState(false)
  const { watch, reset } = methods
  const debounce = useDebounce(1500)
  const router = useRouter()

  const handleCancel = async () => {
    try {
      await fetch(`/api/form-cache?userId=${userId}`, {
        method: 'DELETE',
      })
      methods.reset()
      router.navigate({ to: '/buildings' })
    } catch (error) {
      console.log(error)
    }
  }

  // This watches the entire form for any change
  const values = watch()

  // Load from KV on initial mount
  useEffect(() => {
    async function loadCache() {
      setLoaded(false)
      try {
        const res = await fetch(`/api/form-cache?userId=${userId}`)
        const cachedData = await res.json()

        if (res.status === 200) reset(cachedData as any)
      } catch (error) {
        console.log(error)
      } finally {
        setLoaded(true)
      }
    }
    loadCache()
  }, [userId, reset])

  // Sync to KV (Debounced)
  useEffect(() => {
    if (!loaded) return
    const saveCache = async () => {
      try {
        await fetch('/api/form-cache', {
          method: 'POST',
          body: JSON.stringify({ userId, values }),
        })
      } catch (error) {
        console.log(error)
      }
    }

    debounce({
      cb: saveCache,
    })
  }, [values, userId])

  return {
    handleCancel,
  }
}
