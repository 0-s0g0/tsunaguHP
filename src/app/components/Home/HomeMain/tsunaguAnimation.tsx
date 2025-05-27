"use client" // Next.jsのクライアントコンポーネントとしてマーク

import { useState, useEffect } from "react" // Reactのフックをインポート
import { motion } from "framer-motion" // アニメーションライブラリをインポート

// 各文字を構成する図形の定義
const letterShapes = {
  // 各文字に対応する図形とその配置、アニメーション遅延時間を定義
  T: [
    { type: "rect", x: 0, y: 0, width: 100, height: 20, delay: 0 },
    { type: "rect", x: 40, y: 20, width: 20, height: 80, delay: 0.2 },
    { type: "circle", x: 90, y: 10, radius: 10, delay: 0.4 },
  ],
  S: [
    { type: "quarter-circle", x: 0, y: 0, size: 40, rotation: 0, delay: 0.6 },
    { type: "rect", x: 20, y: 20, width: 40, height: 20, delay: 0.8 },
    { type: "quarter-circle", x: 40, y: 40, size: 40, rotation: 180, delay: 1.0 },
    { type: "quarter-circle", x: 0, y: 60, size: 40, rotation: 90, delay: 1.2 },
  ],
  U1: [
    { type: "rect", x: 0, y: 0, width: 20, height: 60, delay: 1.4 },
    { type: "u-shape", x: 20, y: 40, width: 40, height: 40, delay: 1.6 },
    { type: "rect", x: 60, y: 0, width: 20, height: 60, delay: 1.8 },
  ],
  N: [
    { type: "rect", x: 0, y: 0, width: 20, height: 80, delay: 2.0 },
    { type: "diagonal", x: 20, y: 0, width: 40, height: 80, delay: 2.2 },
    { type: "rect", x: 60, y: 0, width: 20, height: 80, delay: 2.4 },
    { type: "circle", x: 45, y: 35, radius: 8, delay: 2.6 },
  ],
  A: [
    { type: "triangle", x: 20, y: 0, width: 40, height: 80, delay: 2.8 },
    { type: "rect", x: 15, y: 40, width: 50, height: 15, delay: 3.0 },
    { type: "circle", x: 40, y: 70, radius: 10, delay: 3.2 },
  ],
  G: [
    { type: "c-shape", x: 0, y: 0, size: 80, delay: 3.4 },
    { type: "rect", x: 40, y: 35, width: 30, height: 15, delay: 3.6 },
    { type: "rect", x: 55, y: 35, width: 15, height: 30, delay: 3.8 },
  ],
  U2: [
    { type: "rect", x: 0, y: 0, width: 20, height: 60, delay: 4.0 },
    { type: "u-shape", x: 20, y: 40, width: 40, height: 40, delay: 4.2 },
    { type: "rect", x: 60, y: 0, width: 20, height: 60, delay: 4.4 },
  ],
}

// 図形を描画するコンポーネント
const Shape = ({ shape, letterIndex, isFormed, colorPhase }: any) => {
  // 初期アニメーション用のプロパティを状態として管理
  const [initialAnimProps, setInitialAnimProps] = useState<{
    x: number
    y: number
    rotate: number
    scale: number
  } | null>(null)

  useEffect(() => {
    // 初期位置をランダムに設定（放射状に飛び出るように）
    const angle = Math.random() * 2 * Math.PI
    const distance = 800 + Math.random() * 400
    setInitialAnimProps({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotate: Math.random() * 360,
      scale: 0.5,
    })
  }, []) // 一度だけ実行

  const finalX = letterIndex * 140 + shape.x // 最終X座標
  const finalY = 200 + shape.y // 最終Y座標

  // 色変化のフェーズに応じて色を算出
  const getShapeColor = () => {
    if (!isFormed) return "#000000" // 未形成状態なら黒

    const letterProgress = Math.max(0, Math.min(1, (colorPhase - letterIndex * 0.3) / 0.7))

    if (letterProgress === 0) return "#000000"
    if (letterProgress === 1) {
      // 特定の図形や文字だけ赤くする
      if (shape.type === "circle" || shape.type === "u-shape" || letterIndex === 2 || letterIndex === 6) {
        return "#ef4444"
      }
      return "#000000"
    }

    // 色のフェードを計算（黒 → 赤）
    const red = Math.floor(239 * letterProgress)
    const green = Math.floor(68 * letterProgress)
    const blue = Math.floor(68 * letterProgress)
    return `rgb(${red}, ${green}, ${blue})`
  }

  // 図形の種類に応じてSVGを描画
  const renderShape = () => {
    const color = getShapeColor()
    switch (shape.type) {
      case "rect":
        return <rect width={shape.width} height={shape.height} fill={color} rx={2} />
      case "circle":
        return <circle r={shape.radius} fill={color} cx={shape.radius} cy={shape.radius} />
      case "quarter-circle":
        return (
          <path
            d={`M 0 ${shape.size} A ${shape.size} ${shape.size} 0 0 1 ${shape.size} 0 L 0 0 Z`}
            fill={color}
            transform={`rotate(${shape.rotation} ${shape.size / 2} ${shape.size / 2})`}
          />
        )
      case "u-shape":
        return (
          <path
            d={`M 0 0 L 0 ${shape.height - 20} A 20 20 0 0 0 20 ${shape.height} L ${shape.width - 20} ${shape.height} A 20 20 0 0 0 ${shape.width} ${shape.height - 20} L ${shape.width} 0`}
            fill="none"
            stroke={color}
            strokeWidth="8"
          />
        )
      case "diagonal":
        return (
          <path d={`M 0 ${shape.height} L ${shape.width} 0 L ${shape.width} 15 L 15 ${shape.height} Z`} fill={color} />
        )
      case "triangle":
        return (
          <path
            d={`M ${shape.width / 2} 0 L 0 ${shape.height} L 10 ${shape.height} L ${shape.width / 2} 20 L ${shape.width - 10} ${shape.height} L ${shape.width} ${shape.height} Z`}
            fill={color}
          />
        )
      case "c-shape":
        return (
          <path
            d={`M ${shape.size} 20 A 30 30 0 0 0 20 0 A 30 30 0 0 0 0 30 L 0 ${shape.size - 30} A 30 30 0 0 0 30 ${shape.size} A 30 30 0 0 0 60 ${shape.size - 20} L 60 ${shape.size - 40} A 10 10 0 0 1 40 ${shape.size - 40} A 10 10 0 0 1 20 ${shape.size - 20} L 20 40 A 10 10 0 0 1 40 20 L ${shape.size - 20} 20`}
            fill={color}
          />
        )
      default:
        return <rect width={20} height={20} fill={color} />
    }
  }

  // 初期アニメーションのプロパティがまだ未設定なら透明な要素を返す
  if (!initialAnimProps) {
    return <div style={{ position: 'absolute', opacity: 0 }} />
  }

  return (
    <motion.div
      className="absolute"
      initial={initialAnimProps} // 初期状態
      animate={{
        x: finalX,
        y: finalY,
        rotate: 0,
        scale: 1,
      }}
      transition={{
        duration: 2,
        delay: shape.delay,
        ease: "easeOut",
      }}
    >
      <svg
        width={shape.width || shape.radius * 2 || shape.size}
        height={shape.height || shape.radius * 2 || shape.size}
        className="overflow-visible"
      >
        {renderShape()} {/* 図形を描画 */}
      </svg>
    </motion.div>
  )
}

export default function TsunaguHero() {
  const [isFormed, setIsFormed] = useState(false) // 図形が整列済みか
  const [colorPhase, setColorPhase] = useState(0) // 色の進行段階

  useEffect(() => {
    // 図形が形成されるタイミングを設定
    const formationTimer = setTimeout(() => {
      setIsFormed(true)
    }, 6000)

    // 色変化を開始するタイミングを設定
    const colorTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setColorPhase((prev) => {
          if (prev >= 7) {
            clearInterval(interval)
            return 7
          }
          return prev + 0.1
        })
      }, 100)
    }, 6500)

    // クリーンアップ関数
    return () => {
      clearTimeout(formationTimer)
      clearTimeout(colorTimer)
    }
  }, [])

  const letters = ["T", "S", "U1", "N", "A", "G", "U2"] // 表示する文字の配列

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center">
      {/* 背景格子線 */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* メインの文字描画領域 */}
      <motion.div className="relative w-[980px] h-[400px] z-10">
        {letters.map((letter, letterIndex) => (
          <div key={letter}>
            {letterShapes[letter as keyof typeof letterShapes].map((shape, shapeIndex) => (
              <Shape
                key={`${letter}-${shapeIndex}`}
                shape={shape}
                letterIndex={letterIndex}
                isFormed={isFormed}
                colorPhase={colorPhase}
              />
            ))}
          </div>
        ))}
      </motion.div>

      {/* 装飾用のアニメーション図形 */}
      <motion.div
        className="absolute top-20 left-20 w-8 h-8 border-2 border-gray-300 rounded-full z-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-6 h-6 bg-gray-200 z-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-10 h-5 border-2 border-gray-300 rounded-full z-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
}
