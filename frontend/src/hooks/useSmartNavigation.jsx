import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useSmartNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const currentPath = location.pathname
    const isAssignmentSubPage = /^\/assignments\/\d+\/(submission|submissions|performance)$/.test(currentPath)
    const isAssignmentOverview = /^\/assignments\/\d+$/.test(currentPath)
    
    // Only save non-assignment pages as previous location
    if (!isAssignmentSubPage && !isAssignmentOverview) {
      sessionStorage.setItem('previousLocation', currentPath)
    }
    
    // For direct URL access to assignment pages, set a reasonable fallback
    if ((isAssignmentOverview || isAssignmentSubPage) && !sessionStorage.getItem('previousLocation')) {
      const intelligentFallback = getIntelligentFallback()
      sessionStorage.setItem('previousLocation', intelligentFallback)
    }
  }, [location])

  const getIntelligentFallback = () => {
    const referrer = document.referrer
    const isInternalReferrer = referrer && referrer.includes(window.location.origin)
    const hasHistoryEntries = window.history.length > 1
    
    if (isInternalReferrer) {
      // User came from within the app, likely from assignments page
      return '/assignments'
    } else if (hasHistoryEntries) {
      // User has browser history but no internal referrer
      // Could be from bookmarks or direct navigation within our app
      return '/assignments'
    } else {
      // External access (Google, direct URL typing, new tab)
      return '/home'
    }
  }

  const handleSmartBack = () => {
    const currentPath = location.pathname
    const isAssignmentSubPage = /^\/assignments\/\d+\/(submission|submissions|performance)$/.test(currentPath)
    const isAssignmentOverview = /^\/assignments\/\d+$/.test(currentPath)
    
    if (isAssignmentSubPage) {
      // Go back to assignment overview
      const assignmentId = currentPath.match(/\/assignments\/(\d+)\//)?.[1]
      if (assignmentId) {
        navigate(`/assignments/${assignmentId}`)
        return
      }
    }
    
    if (isAssignmentOverview) {
      // From overview, go to the saved previous location
      const previousLocation = sessionStorage.getItem('previousLocation')
      if (previousLocation && previousLocation !== currentPath) {
        navigate(previousLocation)
      } else {
        // Fallback based on likely source
        const fallback = getIntelligentFallback()
        navigate(fallback)
      }
      return
    }
    
    // For any other page, use browser history or go home
    const hasHistoryEntries = window.history.length > 1
    if (hasHistoryEntries) {
      navigate(-1)
    } else {
      navigate('/home')
    }
  }

  return handleSmartBack
}