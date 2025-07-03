import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useSmartNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const currentPath = location.pathname
    const isAssignmentSubPage = /^\/assignments\/\d+\/(submission|submissions|performance)$/.test(currentPath)
    const isAssignmentOverview = /^\/assignments\/\d+$/.test(currentPath)
    
    // Don't save assignment-related paths as previous location
    if (!isAssignmentSubPage && !isAssignmentOverview) {
      sessionStorage.setItem('previousLocation', currentPath)
    }
    
    // For direct URL access to assignment pages, set a reasonable fallback
    if ((isAssignmentOverview || isAssignmentSubPage) && !sessionStorage.getItem('previousLocation')) {
      // Check if user came from external source
      const hasHistoryEntries = window.history.length > 1
      if (!hasHistoryEntries) {
        // Direct access (typed URL, bookmark, new tab)
        sessionStorage.setItem('previousLocation', '/assignments')
      }
    }
  }, [location])

  const handleSmartBack = () => {
    const currentPath = location.pathname
    const isAssignmentSubPage = /^\/assignments\/\d+\/(submission|submissions|performance)$/.test(currentPath)
    
    if (isAssignmentSubPage) {
      // Go back to assignment overview
      const assignmentId = currentPath.match(/\/assignments\/(\d+)\//)?.[1]
      if (assignmentId) {
        navigate(`/assignments/${assignmentId}`)
        return
      }
    }
    
    // For overview page, go to saved previous location or intelligent fallback
    const previousLocation = sessionStorage.getItem('previousLocation')
    if (previousLocation && previousLocation !== currentPath) {
      navigate(previousLocation)
    } else {
      // Intelligent fallback based on user's likely intent
      const hasHistoryEntries = window.history.length > 1
      if (hasHistoryEntries) {
        navigate(-1) // Go back in browser history
      } else {
        navigate('/assignments') // Safe fallback for direct access
      }
    }
  }

  return handleSmartBack
}