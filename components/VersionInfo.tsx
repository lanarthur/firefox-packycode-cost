import packageJson from "../package.json"

interface VersionInfoProps {
  repositoryUrl?: string
}

export function VersionInfo({
  repositoryUrl = packageJson.repository.url
}: VersionInfoProps) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <div className="flex items-center justify-center">
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-2">
          <span>{packageJson.displayName}</span>
          <span>•</span>
          <span>v{packageJson.version}</span>
          <span>•</span>
          <a
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            href={repositoryUrl}
            onClick={(e) => {
              e.preventDefault()
              chrome.tabs.create({
                url: repositoryUrl
              })
            }}
            rel="noopener noreferrer"
            target="_blank">
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
