"use client"

import { useState } from "react"

import TsunaguHero from "./components/Home/HomeMain/tsunaguAnimation"
import TsunaguHero2 from "./components/Home/HomeMain/tsunaguAnimationCamera"
import TsunaguHero3 from "./components/Home/HomeMain/tsunagucolorKousi"
import TsunaguHero4 from "./components/Home/HomeMain/tsunaguBlackAnimation"
import TsunaguHero5 from "./components/Home/HomeMain/tsunaguBackcolor"
import TsunaguHero6 from "./components/Home/HomeMain/tsunaguAnimationColorOnly"
import TsunaguHeroEnhanced from "./components/Home/HomeMain/tsunaguAnimationRouted"

import Header from "./components/Commonlayout/Header/Header" 
import Footer from "./components/Commonlayout/Footer/Footer"
import OurViews from "./components/Home/OurViews"


export default function Page() {
  const [showHeader, setShowHeader] = useState(false)

  const handleAnimationComplete = () => {
    setShowHeader(true)
  }

  return (
    <div className="min-h-screen">
      <Header isVisible={showHeader} />

      <main>
        <section id="home">
          <TsunaguHeroEnhanced onAnimationComplete={handleAnimationComplete} />
        </section>

        <OurViews />

        {/* 他のセクションを追加する場合はここに */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Coming Soon</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">より多くのコンテンツを準備中です。お楽しみに。</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}