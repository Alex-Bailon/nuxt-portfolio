'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown } from '@/components/icons/ChevronDown'
import { Download } from '@/components/icons/Download'
import { Carousel } from '@/components/Carousel'
import { Timeline } from '@/components/Timeline'
import data from '@/data'
import type { Project, Reference } from '@/types'

export default function Home() {
  const [showIntro, setShowIntro] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const introText = "Hi, welcome! My name is Alex Bailon 👋"

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="imageWrapper">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src="/AlexBailon.webp"
              alt="Alex Bailon"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div>
          <h1 className={`introText ${showIntro ? 'start-typing' : ''} text-4xl font-bold mb-4`}>
            {introText}
            <span className="cursor">|</span>
          </h1>
          <h2 className="text-2xl text-gray-600 dark:text-gray-300">
            Sr Full Stack Developer + DevOps + Technical Team Lead
          </h2>
        </div>
      </div>

      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-bold mb-6">About Alex</h2>
          <div dangerouslySetInnerHTML={{ __html: data.bio }} className="prose dark:prose-invert" />
        </div>

        <div className="md:col-span-5">
          <div className="space-y-4">
            {[
              { title: 'Tech Stack', content: data.techStack },
              { title: 'Skills', content: data.skills },
              { title: 'Hobbies', content: data.hobbies }
            ].map((section) => (
              <div key={section.title} className="border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === section.title ? null : section.title)}
                  className="flex justify-between items-center w-full py-4 text-left"
                >
                  <span className="text-lg font-medium">{section.title}</span>
                  <ChevronDown />
                </button>
                {activeAccordion === section.title && (
                  <div className="pb-4">
                    {section.title === 'Tech Stack' ? (
                      Object.entries(section.content as Record<string, string[]>).map(([category, technologies]) => (
                        <div key={category} className="mb-4">
                          <h4 className="font-medium mb-2">{category}:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {technologies.map((tech) => (
                              <li key={tech}>{tech}</li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <ul className="list-disc pl-5 space-y-1">
                        {(section.content as string[]).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <blockquote className="mt-8 pl-4 border-l-4 border-gray-300 italic">
            Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.
            <br/>
            <span className="text-sm">- Albert Einstein</span>
          </blockquote>
        </div>
      </div>

      {/* Projects Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">My Work</h2>
        <Carousel
          autoplaySpeed={0}
          slides={data.projects.map((project: Project) => (
            <div key={project.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
              <Image
                src={project.metadata.image?.url || project.metadata.img || ''}
                alt={project.title}
                width={400}
                height={275}
                className="w-full h-1/2 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.metadata.description}</p>
                <div className="space-y-2">
                  <a
                    href={project.metadata.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block"
                  >
                    Link to live site
                  </a>
                  <a
                    href={project.metadata.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block"
                  >
                    Link to Github Repository
                  </a>
                </div>
              </div>
            </div>
          ))}
        />
      </section>

      {/* References Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">What Others Have to Say</h2>
        <Carousel
          autoplaySpeed={0}
          slides={data.refs.map((ref: Reference) => (
            <div key={ref.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
              <p className="text-gray-600 dark:text-gray-300 mb-6">{ref.ref}</p>
              <div className="mt-auto">
                <h4 className="font-bold">{ref.name}</h4>
                <p className="text-gray-500">{ref.relation}</p>
                <a
                  href={ref.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  View LinkedIn
                </a>
              </div>
            </div>
          ))}
        />
      </section>

      {/* Experience Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">
          My Experience ({new Date().getFullYear() - 2020}+ Years)
        </h2>
        <Timeline items={data.experience} />
      </section>

      {/* Resume Download */}
      <div className="text-center">
        <a
          href="/A_Bailon_Resume.pdf"
          download="Alex_Bailon_Resume.pdf"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download />
          <span className="ml-2">Download Resume</span>
        </a>
      </div>
    </div>
  )
}

// Add the typing animation styles
const styles = `
.introText {
  opacity: 0;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
}

.introText.start-typing {
  opacity: 1;
  width: 100%;
  animation: typing 3s steps(40, end);
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 1em;
  background-color: currentColor;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink {
  from, to { opacity: 1 }
  50% { opacity: 0 }
}
`

// Add styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}
