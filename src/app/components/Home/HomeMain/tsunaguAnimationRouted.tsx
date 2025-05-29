"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

// 各文字を構成する図形の定義 (Definitions of shapes composing each letter)
export const letterShapes = {
  T: [
    { type: "rect", x: 12, y: 0, width: 72, height: 24, delay: 0, color: "#2BB673" },
    { type: "rect", x: 36, y: 23, width: 24, height: 73, delay: 0.2, color: "#2BB673" },
    { type: "circle", x: 0, y: 0, radius: 12, delay: 0.2, color: "#2BB673" },
    { type: "circle", x: 72, y: 0, radius: 12, delay: 0.4, color: "#2BB673" },
  ],
  S: [
    { type: "rect", x: 36, y: 0, width: 48, height: 24, delay: 0.8, color: "#F7941D" },
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
      color: "#ED1D26",
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
    { type: "rect", x: 38, y: 38, width: 24, height: 20, delay: 0.8, color: "#F7941D" },
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
      color: "#F7941D",
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
      color: "#2BB673",
    },
    { type: "rect", x: 12, y: 72, width: 48, height: 24, delay: 0.8, color: "#F7941D" },
    { type: "circle", x: 54, y: 58, radius: 7, delay: 0.4, color: "#edf2f7" },
  ],
  U1: [
    { type: "rect", x: 0, y: 0, width: 24, height: 48, delay: 1.4, color: "#F7941D" },
    { type: "rect", x: 73, y: 0, width: 24, height: 48, delay: 1.6, color: "#F7941D" },
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
      color: "#ED1D26",
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
    { type: "rect2", x: 37, y: -6, width: 20, height: 110, delay: 2.4, angle: 315, color: "#ED1D26" },
    { type: "rect", x: 0, y: 12, width: 20, height: 84, delay: 2.0, color: "#662D92" },
    { type: "rect", x: 72, y: 0, width: 20, height: 84, delay: 2.0, color: "#662D92" },
    { type: "circle", x: 0, y: 0, radius: 10, delay: 0.4, color: "#662D92" },
    { type: "circle", x: 72, y: 75, radius: 10, delay: 0.4, color: "#662D92" },
  ],
  A: [
    { type: "rect", x: 0, y: 46, width: 24, height: 50, delay: 1.4, color: "#0F75BB" },
    { type: "rect", x: 73, y: 46, width: 24, height: 50, delay: 1.6, color: "#0F75BB" },
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
      color: "#24AAE1",
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
    { type: "circle", x: 31, y: 50, radius: 18, delay: 0.4, color: "#ED1D26" },
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
      color: "#2BB673",
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
      color: "#000000",
    },
  ],
  U2: [
    { type: "rect", x: 0, y: 0, width: 24, height: 48, delay: 1.4, color: "#F7941D" },
    { type: "rect", x: 73, y: 0, width: 24, height: 48, delay: 1.6, color: "#F7941D" },
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
      color: "#ED1D26",
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

// 背景の装飾図形コンポーネント (Background decorative shape component)
const BackgroundShape = ({
  index,
  isFormed,
  isFloating,
}: { index: number; isFormed: boolean; isFloating: boolean }) => {
  const colors = [
    "rgba(43, 182, 115, 0.3)", // Green
    "rgba(247, 148, 29, 0.3)", // Orange
    "rgba(237, 29, 38, 0.3)", // Red
    "rgba(15, 117, 187, 0.3)", // Blue
    "rgba(102, 45, 146, 0.3)", // Purple
    "rgba(36, 170, 225, 0.3)", // Light Blue
    "rgba(255, 193, 7, 0.3)", // Yellow
    "rgba(220, 53, 69, 0.3)", // Pink
  ]

  const lightColors = [
    "rgba(43, 182, 115, 0.08)", // Green
    "rgba(247, 148, 29, 0.08)", // Orange
    "rgba(237, 29, 38, 0.08)", // Red
    "rgba(15, 117, 187, 0.08)", // Blue
    "rgba(102, 45, 146, 0.08)", // Purple
    "rgba(36, 170, 225, 0.08)", // Light Blue
    "rgba(255, 193, 7, 0.08)", // Yellow
    "rgba(220, 53, 69, 0.08)", // Pink
  ]

  const isCircle = Math.random() > 0.5
  const size = 15 + Math.random() * 40
  const color = colors[Math.floor(Math.random() * colors.length)]
  const lightColor = lightColors[Math.floor(Math.random() * lightColors.length)]

  const initialX = Math.random() * window.innerWidth
  const initialY = Math.random() * window.innerHeight

  // 端の位置を決定（四隅や画面外） (Determine edge positions (corners or off-screen))
  const edgePositions = [
    { x: -100, y: Math.random() * window.innerHeight }, // Left edge
    { x: window.innerWidth + 100, y: Math.random() * window.innerHeight }, // Right edge
    { x: Math.random() * window.innerWidth, y: -100 }, // Top edge
    { x: Math.random() * window.innerWidth, y: window.innerHeight + 100 }, // Bottom edge
  ]
  const edgePosition = edgePositions[index % 4]

  // フローアニメーション用のランダムな位置 (Random position for flow animation)
  const flowX = Math.random() * window.innerWidth
  const flowY = Math.random() * window.innerHeight

  return (
    <motion.div
      className="absolute"
      initial={{
        x: initialX,
        y: initialY,
        rotate: Math.random() * 360,
        scale: 0,
      }}
      animate={
        isFloating
          ? {
              // 第3段階：薄くフローアニメーション (Phase 3: Light flow animation)
              x: [edgePosition.x, flowX, flowX + (Math.random() - 0.5) * 200],
              y: [edgePosition.y, flowY, flowY + (Math.random() - 0.5) * 200],
              rotate: [0, 360, 720],
              scale: [0.5, 0.8, 1, 0.8],
              opacity: [0.3, 0.6, 0.4, 0.6],
            }
          : isFormed
            ? {
                // 第2段階：端に移動 (Phase 2: Move to edge)
                x: [initialX, edgePosition.x],
                y: [initialY, edgePosition.y],
                rotate: [0, 180],
                scale: [1, 0.5],
                opacity: [1, 0.3],
              }
            : {
                // 第1段階：文字形成中のアニメーション (Phase 1: Animation during letter formation)
                x: initialX + (Math.random() - 0.5) * 300,
                y: initialY + (Math.random() - 0.5) * 300,
                rotate: Math.random() * 720,
                scale: [0, 1, 0.8, 1],
                opacity: [0, 1, 0.8, 1],
              }
      }
      transition={
        isFloating
          ? {
              duration: 12 + Math.random() * 8,
              delay: Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }
          : isFormed
            ? {
                duration: 2,
                delay: 0.5 + Math.random() * 1,
                ease: "easeInOut",
              }
            : {
                duration: 8 + Math.random() * 4,
                delay: Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }
      }
    >
      {isCircle ? (
        <div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: isFloating ? lightColor : color,
          }}
        />
      ) : (
        <div
          className="rounded-sm"
          style={{
            width: size,
            height: size,
            backgroundColor: isFloating ? lightColor : color,
            transform: `rotate(${Math.random() * 45}deg)`,
          }}
        />
      )}
    </motion.div>
  )
}

// 図形コンポーネント (Shape component)
const Shape = ({ shape, letterIndex, isFormed }: any) => {
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
    const targetShapeColor = shape.color || "#000000"
    return {
      fill: targetShapeColor,
      stroke: "none",
      strokeWidth: 0,
    }
  }, [shape.color])

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
          return <rect width="10" height="10" fill="red" /> // Fallback for missing params
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
        return <rect width={20} height={20} {...drawingProps} /> // Default fallback shape
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

interface TsunaguHeroProps {
  onAnimationComplete?: () => void
}

export default function TsunaguHeroEnhanced({ onAnimationComplete }: TsunaguHeroProps) {
  const [isFormed, setIsFormed] = useState(false)
  const [isFloating, setIsFloating] = useState(false)

  useEffect(() => {
    const formationTimer = setTimeout(() => {
      setIsFormed(true)
    }, 4000) // 文字完成タイミング (Timing for letter completion)

    return () => {
      clearTimeout(formationTimer)
    }
  }, [])

  useEffect(() => {
    if (isFormed) {
      const floatingTimer = setTimeout(() => {
        setIsFloating(true)
      }, 3000) // 端に移動後、3秒待ってフローアニメーション開始 (After moving to edge, wait 3s and start flow animation)

      return () => {
        clearTimeout(floatingTimer)
      }
    }
  }, [isFormed])

  useEffect(() => {
    if (!onAnimationComplete) return

    const completeTimer = setTimeout(() => {
      onAnimationComplete()
    }, 8000) // Overall animation complete timing

    return () => clearTimeout(completeTimer)
  }, [onAnimationComplete])

  const letters = ["T", "S", "U1", "N", "A", "G", "U2"]

  return (
    <div className="relative w-full h-screen bg-gray-200 overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* 大胆なカメラワーク用コンテナ (Container for bold camera work) */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{
          scale: 0.1,
          rotateX: 90,
          rotateY: 45,
          rotateZ: 180,
          x: -2000,
          y: 1000,
        }}
        animate={{
          scale: [0.1, 3, 0.8, 1.2, 1],
          rotateX: [90, -30, 15, -5, 0],
          rotateY: [45, -60, 30, -10, 0],
          rotateZ: [180, 720, -180, 90, 0],
          x: [-2000, 1500, -800, 300, 0],
          y: [1000, -600, 400, -100, 0],
        }}
        transition={{
          duration: 5,
          times: [0, 0.3, 0.6, 0.8, 1],
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* カラフルな背景図形 (Colorful background shapes) */}
        <div className="absolute inset-0">
          {Array.from({ length: 60 }, (_, i) => (
            <BackgroundShape key={i} index={i} isFormed={isFormed} isFloating={isFloating} />
          ))}
        </div>

        {/* メイン文字コンテナ (Main text container) */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-full h-full"
          // MODIFIED: Removed the floating animation for the text container when isFormed is true.
          // The text will now remain stable after formation.
          animate={
            isFormed
              ? {
                  // Previously caused floating:
                  // y: [0, -30, 15, 0],
                  // rotateZ: [0, 2, -1, 0],
                }
              : {}
          }
          transition={
            isFormed
              ? {
                  // Previously made the float repeat:
                  // duration: 8,
                  // repeat: Number.POSITIVE_INFINITY,
                  // ease: "easeInOut",
                }
              : {}
          }
        >
          <motion.div
            className="relative h-[200px] sm:h-[300px] lg:h-[400px] scale-[35%] sm:scale-75 lg:scale-100 -translate-x-[100px] sm:translate-x-0"
            style={{ width: "980px" }} // Approximate width for 7 letters * 140px
            initial={{ rotateY: 45, rotateX: 30 }}
            animate={{
              rotateY: [45, -15, 5, 0],
              rotateX: [30, -10, 5, 0],
            }}
            transition={{
              duration: 4, // This animation helps settle the text block
              ease: "easeOut",
            }}
          >
            {letters.map((letter, letterIndex) =>
              (letterShapes[letter as keyof typeof letterShapes] || []).map((shape, shapeIndex) => (
                <Shape
                  key={`${letter}-${letterIndex}-${shapeIndex}`}
                  shape={shape}
                  letterIndex={letterIndex}
                  isFormed={isFormed} // isFormed prop passed but not actively used by Shape's animation logic
                />
              )),
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 追加の動的要素（文字完成後に表示） (Additional dynamic elements (display after text formation)) */}
      {isFormed && (
        <>
          <motion.div
            className="absolute top-20 left-20 w-8 h-8 border-2 border-orange-400 rounded-full z-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 1],
              opacity: [0, 1, 0.7],
              rotate: 360,
            }}
            transition={{
              scale: { duration: 1 },
              opacity: { duration: 1 },
              rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          />

          <motion.div
            className="absolute bottom-32 right-32 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 z-30 rounded-sm"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1],
              opacity: [0, 0.8],
              rotate: -360,
              x: [0, 30, -30, 0],
            }}
            transition={{
              scale: { duration: 1, delay: 0.5 },
              opacity: { duration: 1, delay: 0.5 },
              rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              x: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          />

          <motion.div
            className="absolute top-1/3 right-20 w-10 h-5 border-2 border-green-400 rounded-full z-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1],
              opacity: [0, 0.6],
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              scale: { duration: 1, delay: 1 },
              opacity: { duration: 1, delay: 1 },
              y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          />
        </>
      )}
    </div>
  )
}