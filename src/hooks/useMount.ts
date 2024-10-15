import { useEffect, useState } from 'react'

export const useMount = () => {
  const [mount, mountSet] = useState(false)

  useEffect(() => mountSet(true), [])

  return mount
}
