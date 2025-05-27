"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#team" },
      { name: "Careers", href: "#careers" },
      { name: "News", href: "#news" },
    ],
    services: [
      { name: "Web Development", href: "#web-dev" },
      { name: "Mobile Apps", href: "#mobile" },
      { name: "Consulting", href: "#consulting" },
      { name: "Support", href: "#support" },
    ],
    resources: [
      { name: "Blog", href: "#blog" },
      { name: "Documentation", href: "#docs" },
      { name: "Help Center", href: "#help" },
      { name: "Privacy Policy", href: "#privacy" },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* 会社情報 */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">TSUNA</span>
                <span className="text-red-500">GU</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                人と技術をつなぎ、未来を創造するデジタルソリューション企業です。
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} />
                <span>contact@tsunagu.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} />
                <span>+81-3-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} />
                <span>東京都渋谷区</span>
              </div>
            </div>
          </motion.div>

          {/* リンクセクション */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {category === "company" ? "Company" : category === "services" ? "Services" : "Resources"}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ソーシャルリンクとコピーライト */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© {currentYear} TSUNAGU. All rights reserved.</p>

          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
