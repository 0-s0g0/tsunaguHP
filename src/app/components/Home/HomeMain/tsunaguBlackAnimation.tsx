"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
// import SVG01U from "@/public/letterSVG/HIRAGANA01-U.svg"
// import SVG02GO from "@/public/letterSVG/HIRAGANA02-GO.svg"
// import SVG03KU from "@/public/letterSVG/HIRAGANA03-KU.svg"
// import SVG04TU from "@/public/letterSVG/HIRAGANA04-TU.svg"
// import SVG05NA from "@/public/letterSVG/HIRAGANA05-NA.svg"

// 各文字を構成する図形の定義
export const letterShapes = {
  T: [
    { type: "rect", x: 12, y: 0, width: 72, height: 24, delay: 0, color: "#000000" },
    { type: "rect", x: 36, y: 23, width: 24, height: 73, delay: 0.2, color: "#000000" },
    { type: "circle", x: 0, y: 0, radius: 12, delay: 0.2, color: "#000000" },
    { type: "circle", x: 72, y: 0, radius: 12, delay: 0.4, color: "#ff3333" },
  ],
  S: [
    { type: "rect", x: 36, y: 0, width: 48, height: 24, delay: 0.8, color: "#000000" },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 54,
        arcStartX: 0,
        arcStartY: -54,
        arcEndX: 54,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 1,
      },
      displayWidth: 54,
      displayHeight: 54,
      shapeViewBox: "-46 -54 100 100",
      delay: 1.0,
      rotation: 270,
      color: "#ff9933",
    },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 54,
        arcStartX: 0,
        arcStartY: -54,
        arcEndX: 54,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 1,
      },
      displayWidth: 54,
      displayHeight: 54,
      shapeViewBox: "-46 -54 100 100",
      delay: 1.0,
      rotation: 180,
      color: "#000000",
    },
    { type: "circle", x: 32, y: 24, radius: 7, delay: 0.4, color: "#edf2f7" },
    { type: "rect", x: 38, y: 38, width: 24, height: 20, delay: 0.8, color: "#000000" },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 54,
        arcStartX: 0,
        arcStartY: -54,
        arcEndX: 54,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 1,
      },
      displayWidth: 54,
      displayHeight: 54,
      shapeViewBox: "-83 -124 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#000000",
    },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 54,
        arcStartX: 0,
        arcStartY: -54,
        arcEndX: 54,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 1,
      },
      displayWidth: 54,
      displayHeight: 54,
      shapeViewBox: "-83 -124 100 100",
      delay: 1.0,
      rotation: 90,
      color: "#000000",
    },

    { type: "rect", x: 12, y: 72, width: 48, height: 24, delay: 0.8, color: "#000000" },
    { type: "circle", x: 54, y: 58, radius: 7, delay: 0.4, color: "#edf2f7" },
  ],
  U1: [
    { type: "rect", x: 0, y: 0, width: 24, height: 48, delay: 1.4, color: "#000000" },
    { type: "rect", x: 73, y: 0, width: 24, height: 48, delay: 1.6, color: "#000000" },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 70,
        arcStartX: -70,
        arcStartY: 0,
        arcEndX: 70,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 0,
      },
      displayWidth: 70,
      displayHeight: 69,
      shapeViewBox: "-49 -68 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#ffff2d",
    },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 50,
        arcStartX: -50,
        arcStartY: 0,
        arcEndX: 50,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 0,
      },
      displayWidth: 50,
      displayHeight: 50,
      shapeViewBox: "-69 -91 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#edf2f7",
    },
  ],
  N: [
    { type: "rect2", x: 37, y: -6, width: 20, height: 110, delay: 2.4, angle: 315, color: "#2dff96" },
    { type: "rect", x: 0, y: 12, width: 20, height: 84, delay: 2.0, color: "#000000" },
    { type: "rect", x: 72, y: 0, width: 20, height: 84, delay: 2.0, color: "#000000" },
    { type: "circle", x: 0, y: 0, radius: 10, delay: 0.4, color: "#000000" },
    { type: "circle", x: 72, y: 75, radius: 10, delay: 0.4, color: "#000000" },
  ],
  A: [
    { type: "rect", x: 0, y: 46, width: 24, height: 50, delay: 1.4, color: "#000000" },
    { type: "rect", x: 73, y: 46, width: 24, height: 50, delay: 1.6, color: "#000000" },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 70,
        arcStartX: -70,
        arcStartY: 0,
        arcEndX: 70,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 1,
      },
      displayWidth: 70,
      displayHeight: 69,
      shapeViewBox: "-49 -68 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#000000",
    },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 50,
        arcStartX: -50,
        arcStartY: 0,
        arcEndX: 50,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 1,
      },
      displayWidth: 50,
      displayHeight: 50,
      shapeViewBox: "-69 -96 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#edf2f7",
    },
    { type: "circle", x: 31, y: 50, radius: 18, delay: 0.4, color: "#2dffff" },
  ],
  G: [
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 70,
        arcStartX: 49.497,
        arcStartY: -49.497,
        arcEndX: 49.497,
        arcEndY: 49.497,
        arcLargeFlag: 1,
        arcSweepFlag: 0,
      },
      displayWidth: 70,
      displayHeight: 69,
      shapeViewBox: "-49 -68 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#000000",
    },
    { type: "circle", x: 24, y: 24, radius: 24, delay: 0.4, color: "#edf2f7" },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 70,
        arcStartX: 49.497,
        arcStartY: 49.497,
        arcEndX: 70,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 0,
      },
      displayWidth: 70,
      displayHeight: 69,
      shapeViewBox: "-49 -68 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#2d2dff",
    },
  ],
  U2: [
    { type: "rect", x: 0, y: 0, width: 24, height: 48, delay: 1.4, color: "#000000" },
    { type: "rect", x: 73, y: 0, width: 24, height: 48, delay: 1.6, color: "#000000" },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 70,
        arcStartX: -70,
        arcStartY: 0,
        arcEndX: 70,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 0,
      },
      displayWidth: 70,
      displayHeight: 69,
      shapeViewBox: "-49 -68 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#962dff",
    },
    {
      type: "fan-shape",
      x: 14,
      y: 0,
      shapeParams: {
        pivotX: 0,
        pivotY: 0,
        radius: 50,
        arcStartX: -50,
        arcStartY: 0,
        arcEndX: 50,
        arcEndY: 0,
        arcLargeFlag: 0,
        arcSweepFlag: 0,
      },
      displayWidth: 50,
      displayHeight: 50,
      shapeViewBox: "-69 -91 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#edf2f7",
    },
  ],
}

// ヘルパー関数
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

// 図形コンポーネント
const Shape = ({ shape, letterIndex, isFormed, colorPhase }: any) => {
  const [initialAnimProps, setInitialAnimProps] = useState<null | {
    x: number
    y: number
    rotate: number
    scale: number
  }>(null)

  useEffect(() => {
    const angle = Math.random() * 2 * Math.PI
    const distance = 800 + Math.random() * 400
    setInitialAnimProps({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotate: Math.random() * 360,
      scale: 0.5,
    })
  }, [])



  const finalX = letterIndex * 140 + shape.x
  const finalY = 200 + shape.y

  const getShapeDrawingProps = useCallback(() => {
    const initialFillColor = "#FFFFFF"
    const initialStrokeColor = "#000000"
    const initialStrokeWidth = 1

    const targetShapeColor = shape.color || "#000000"

    if (!isFormed) {
      return {
        fill: initialFillColor,
        stroke: initialStrokeColor,
        strokeWidth: initialStrokeWidth,
      }
    }

    const letterProgress = Math.max(0, Math.min(1, (colorPhase - letterIndex * 0.3 - 0.5) / 0.5))

    const accentColors = ["#ff3333", "#ff9933", "#ffff2d", "#2dff96", "#2dffff", "#2d2dff", "#962dff"]
    const accentColor = accentColors[letterIndex % accentColors.length]

    const startRgb = hexToRgb(initialFillColor)
    const accentRgb = hexToRgb(accentColor)
    const endRgb = hexToRgb(targetShapeColor)

    let currentFill = targetShapeColor

    if (startRgb && accentRgb && endRgb) {
      if (letterProgress < 0.3) {
        const phase1Progress = letterProgress / 0.3
        const r = Math.round(startRgb.r + (accentRgb.r - startRgb.r) * phase1Progress)
        const g = Math.round(startRgb.g + (accentRgb.g - startRgb.g) * phase1Progress)
        const b = Math.round(startRgb.b + (accentRgb.b - startRgb.b) * phase1Progress)
        currentFill = `rgb(${r},${g},${b})`
      } else if (letterProgress < 0.5) {
        currentFill = accentColor
      } else {
        const phase3Progress = (letterProgress - 0.5) / 0.5
        const r = Math.round(accentRgb.r + (endRgb.r - accentRgb.r) * phase3Progress)
        const g = Math.round(accentRgb.g + (endRgb.g - accentRgb.g) * phase3Progress)
        const b = Math.round(accentRgb.b + (endRgb.b - accentRgb.b) * phase3Progress)
        currentFill = `rgb(${r},${g},${b})`
      }
    }

    const currentStrokeWidth = initialStrokeWidth * (1 - letterProgress)
    const currentStroke = letterProgress < 1 ? initialStrokeColor : "none"

    return {
      fill: currentFill,
      stroke: currentStroke,
      strokeWidth: currentStrokeWidth,
    }
  }, [isFormed, colorPhase, letterIndex, shape.color, shape.type, shape.strokeWidth])

  const renderShape = useCallback(() => {
    const drawingProps = getShapeDrawingProps()

    switch (shape.type) {
      case "rect":
        return <rect width={shape.width} height={shape.height} rx={2} {...drawingProps} />
      case "circle":
        return <circle r={shape.radius} cx={shape.radius} cy={shape.radius} {...drawingProps} />
      case "rect2": {
        const rotationAngle = shape.angle || 0
        const transformValue = `rotate(${rotationAngle} ${shape.width / 2} ${shape.height / 2})`
        return <rect width={shape.width} height={shape.height} rx={2} transform={transformValue} {...drawingProps} />
      }
      case "fan-shape": {
        const params = shape.shapeParams || {}
        const pivotX = params.pivotX ?? 0
        const pivotY = params.pivotY ?? 0
        const radius = params.radius
        const arcStartX = params.arcStartX
        const arcStartY = params.arcStartY
        const arcEndX = params.arcEndX
        const arcEndY = params.arcEndY
        const largeArcFlag = params.arcLargeFlag ?? 0
        const sweepFlag = params.arcSweepFlag ?? 1

        if (
          radius === undefined ||
          arcStartX === undefined ||
          arcStartY === undefined ||
          arcEndX === undefined ||
          arcEndY === undefined
        ) {
          console.warn("Fan shape is missing required parameters in shapeParams:", shape)
          return <rect width="10" height="10" fill="red" />
        }

        const d = `M ${pivotX} ${pivotY} L ${arcStartX} ${arcStartY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY} Z`

        return (
          <path
            d={d}
            transform={shape.rotation ? `rotate(${shape.rotation} ${pivotX} ${pivotY})` : ""}
            fill={drawingProps.fill}
            stroke={drawingProps.stroke}
            strokeWidth={drawingProps.strokeWidth}
          />
        )
      }
      default:
        return <rect width={20} height={20} {...drawingProps} />
    }
  }, [getShapeDrawingProps, shape])

  if (!initialAnimProps) {
    return null
  }

  const svgWidth =
    shape.displayWidth ?? (shape.width || (shape.type === "circle" ? shape.radius * 2 : undefined) || shape.size || 50)
  const svgHeight =
    shape.displayHeight ??
    (shape.height || (shape.type === "circle" ? shape.radius * 2 : undefined) || shape.size || 50)

  let svgViewBox = shape.shapeViewBox
  if (!svgViewBox) {
    if (shape.type === "circle" && shape.radius) {
      svgViewBox = `0 0 ${shape.radius * 2} ${shape.radius * 2}`
    } else {
      svgViewBox = `0 0 ${svgWidth} ${svgHeight}`
    }
  }

  return (
    <motion.div
      className="absolute"
      initial={initialAnimProps}
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
        width={svgWidth}
        height={svgHeight}
        viewBox={svgViewBox}
        className="overflow-visible"
        style={{ display: "block" }}
      >
        {renderShape()}
      </svg>
    </motion.div>
  )
}

// ひらがな文字コンポーネント
const HiraganaCharacter = ({ index, isVisible }: { index: number; isVisible: boolean }) => {
  const hiraganaChars = ["う", "ご", "く","、", "つ", "な","が","る","、","は","み","だ","す"]

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      initial={{ opacity: 0, y: 20, scale: 0.1 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      style={{
        left: `${index * 60+80 }px`,
        top: "50px",
        width: "40px",
        height: "40px",
      }}
    >
      <div
        className="text-4xl font-bold  flex items-center justify-center"
        style={{
          // backgroundColor: colors[index], // Remove or comment this line to remove the background
          color: "black", // Change text color to black
          width: "80px",
          height: "80px",
        }}
      >
        {hiraganaChars[index]}
      </div>
    </motion.div>
  )
}

// TsunaguHero コンポーネント
interface TsunaguHeroProps {
  onAnimationComplete?: () => void
}

export default function TsunaguHero4({ onAnimationComplete }: TsunaguHeroProps) {
  const [isFormed, setIsFormed] = useState(false)
  const [colorPhase, setColorPhase] = useState(0)
  const [showHiragana, setShowHiragana] = useState(false)
  const [visibleHiraganaCount, setVisibleHiraganaCount] = useState(0)
  const [isClient, setIsClient] = useState(false) // ★ 1. マウント状態を管理するstateを追加
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const formationTimer = setTimeout(() => {
      setIsFormed(true)
    }, 6000)

    let colorIntervalId: NodeJS.Timeout | null = null
    const colorTimer = setTimeout(() => {
      colorIntervalId = setInterval(() => {
        setColorPhase((prev) => {
          if (prev >= 7) {
            if (colorIntervalId) clearInterval(colorIntervalId)
            return 7
          }
          return prev + 0.1
        })
      }, 50)
    }, 6500)

    return () => {
      clearTimeout(formationTimer)
      clearTimeout(colorTimer)
      if (colorIntervalId) clearInterval(colorIntervalId)
    }
  }, [])

  // ひらがな表示のタイミング制御
  useEffect(() => {
    const hiraganaTimer = setTimeout(() => {
      setShowHiragana(true)

      // 順番にひらがなを表示
      let hiraganaIntervalId: NodeJS.Timeout | null = null
      hiraganaIntervalId = setInterval(() => {
        setVisibleHiraganaCount((prev) => {
          if (prev >= 14) {
            // 5つのひらがなすべて表示完了
            if (hiraganaIntervalId) clearInterval(hiraganaIntervalId)
            return 14
          }
          return prev + 1
        })
      }, 50) // 0.4秒間隔で順番に表示

      return () => {
        if (hiraganaIntervalId) clearInterval(hiraganaIntervalId)
      }
    }, 10000) // TSUNAGUアニメーション完了後に開始

    return () => clearTimeout(hiraganaTimer)
  }, [])

  useEffect(() => {
    if (!onAnimationComplete) return

    const completeTimer = setTimeout(() => {
      onAnimationComplete()
    }, 12000) // ひらがな表示完了まで待つ

    return () => clearTimeout(completeTimer)
  }, [onAnimationComplete])

  const letters = ["T", "S", "U1", "N", "A", "G", "U2"]

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
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

      <motion.div
        className="relative h-[200px] sm:h-[300px] lg:h-[400px] z-10 scale-[35%] sm:scale-75 lg:scale-100 -translate-x-[100px] sm:translate-x-0"
        style={{ width: "980px" }}
      >
        {/* TSUNAGU文字のアニメーション */}
        {isClient && letters.map((letter, letterIndex) =>
          (letterShapes[letter as keyof typeof letterShapes] || []).map((shape, shapeIndex) => (
            <Shape
              key={`${letter}-${letterIndex}-${shapeIndex}`}
              shape={shape}
              letterIndex={letterIndex}
              isFormed={isFormed}
              colorPhase={colorPhase}
            />
          )),
        )}

        {/* ひらがな文字の表示 */}
        {showHiragana && (
          <>
            {[0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,].map((index) => (
              <HiraganaCharacter key={`hiragana-${index}`} index={index} isVisible={index < visibleHiraganaCount} />
            ))}
          </>
        )}
      </motion.div>

      {/* 装飾用の要素 */}
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
