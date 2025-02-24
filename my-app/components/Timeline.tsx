interface TimelineItemProps {
  period: string
  title: string
  company: string
  location: string
  responsibilities: string[]
}

interface TimelineProps {
  items: TimelineItemProps[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12">
            {/* Dot */}
            <div className="absolute left-3 top-5 -translate-x-1/2 h-3 w-3 rounded-full bg-primary" />
            
            {/* Content */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {item.period}
                </time>
              </div>
              
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {item.company} | {item.location}
              </p>
              
              <ul className="mt-4 list-disc pl-5 space-y-2">
                {item.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-gray-300">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 