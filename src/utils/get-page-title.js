import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Market 104'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
