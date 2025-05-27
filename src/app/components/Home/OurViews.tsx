"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Users, Lightbulb, Target } from "lucide-react"

const views = [
  {
    icon: Heart,
    title: "つながりを大切に",
    description: "人と人、企業と社会、技術と未来をつなぐことで、より良い世界を創造します。",
    color: "text-red-500",
  },
  {
    icon: Users,
    title: "共創の力",
    description: "多様な価値観と専門性を持つ人々が協力することで、革新的なソリューションを生み出します。",
    color: "text-blue-500",
  },
  {
    icon: Lightbulb,
    title: "革新への挑戦",
    description: "常に新しい技術と手法を探求し、従来の枠組みを超えた価値創造に挑戦し続けます。",
    color: "text-yellow-500",
  },
  {
    icon: Target,
    title: "持続可能な成長",
    description: "短期的な利益だけでなく、長期的な視点で社会と環境に配慮した成長を目指します。",
    color: "text-green-500",
  },
]

export default function OurViews() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="our-views" className="py-16 lg:py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Views</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            私たちが大切にしている価値観と、目指している未来への想いをご紹介します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {views.map((view, index) => (
            <motion.div
              key={view.title}
              className="bg-white rounded-xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-4 ${view.color}`}
              >
                <view.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{view.title}</h3>
              <p className="text-gray-600 leading-relaxed">{view.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
