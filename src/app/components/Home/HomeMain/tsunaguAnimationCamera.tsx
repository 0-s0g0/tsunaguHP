"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

// ヘルパー関数 (グローバルまたはコンポーネントのスコープ内に配置)
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

// 各文字を構成する図形の定義 (変更なしのため省略)
const letterShapes = {
  T: [
    { type: "rect", x: 12, y: 0, width: 72, height: 24, delay: 0, color: "#2BB673" },
    { type: "rect", x: 36, y: 23, width: 24, height: 73, delay: 0.2, color: "#2BB673" },
    { type: "circle", x: 0, y: 0, radius: 12, delay: 0.2, color: "#2BB673" }, // x,yはSVG要素の左上基点
    { type: "circle", x: 72, y: 0, radius: 12, delay: 0.4, color: "#2BB673" }, // 同上
  ],
  S: [
    { type: "rect", x: 36, y: 0, width: 48, height: 24, delay: 0.8, color: "#F7941D" },
    {
      type: "fan-shape",
      x: 14,
      y: 0, // SVGコンテナの文字 'S' 内での左上位置
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
      y: 0, // SVGコンテナの文字 'S' 内での左上位置
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
    { type: "circle", x: 32, y: 24, radius: 7, delay: 0.4, color: "#FFFFFF" },
    { type: "rect", x: 38, y: 38, width: 24, height: 20, delay: 0.8, color: "#F7941D" },
    {
      type: "fan-shape",
      x: 14,
      y: 0, // SVGコンテナの文字 'S' 内での左上位置
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
    }, // color 追加
    {
      type: "fan-shape",
      x: 14,
      y: 0, // SVGコンテナの文字 'S' 内での左上位置
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
    { type: "circle", x: 54, y: 58, radius: 7, delay: 0.4, color: "#FFFFFF" },
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
      color: "#FFFFFF",
    },
  ],
  N: [
    // N に color を追加
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
      color: "#FFFFFF",
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
      }, // sweepFlagが0なので上半円
      displayWidth: 70,
      displayHeight: 69,
      shapeViewBox: "-49 -68 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#2BB673",
    },
    { type: "circle", x: 24, y: 24, radius: 24, delay: 0.4, color: "#FFFFFF" },
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
      }, // sweepFlagが0なので上半円
      displayWidth: 70,
      displayHeight: 69,
      shapeViewBox: "-49 -68 100 100",
      delay: 1.0,
      rotation: 0,
      color: "#000000",
    },
  ],
  U2: [
    // U2 に color を追加
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
      color: "#FFFFFF",
    },
  ],
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
    const initialFillColor = "#CCCCCC" // グレー
    const initialStrokeColor = "#000000" // 黒
    const initialStrokeWidth = 1.5 // 移動中の淵の太さ

    // shape.color がない場合はデフォルトで黒にする
    const targetShapeColor = shape.color || "#000000"

    if (!isFormed) {
      return {
        fill: initialFillColor,
        stroke: initialStrokeColor,
        strokeWidth: initialStrokeWidth,
      }
    }

    // isFormed === true (移動完了後)
    // letterProgress: 0 (色変化開始前) -> 1 (完全に指定色)
    const letterProgress = Math.max(0, Math.min(1, (colorPhase - letterIndex * 0.3 - 0.5) / 0.5)) // 微調整

    const startRgb = hexToRgb(initialFillColor)
    const endRgb = hexToRgb(targetShapeColor)

    let currentFill = targetShapeColor
    if (startRgb && endRgb) {
      const r = Math.round(startRgb.r + (endRgb.r - startRgb.r) * letterProgress)
      const g = Math.round(startRgb.g + (endRgb.g - startRgb.g) * letterProgress)
      const b = Math.round(startRgb.b + (endRgb.b - startRgb.b) * letterProgress)
      currentFill = `rgb(${r},${g},${b})`
    }

    // ストロークは色づき始めると消える
    const currentStrokeWidth = initialStrokeWidth * (1 - letterProgress)
    const currentStroke = letterProgress < 1 ? initialStrokeColor : "none"

    // u-shape は特別扱い: 常に線画として扱い、線の色が変わる
    if (shape.type === "u-shape") {
      const uShapeStrokeColor = letterProgress === 1 ? targetShapeColor : initialFillColor // 線自体の色
      if (startRgb && endRgb) {
        const r = Math.round(startRgb.r + (endRgb.r - startRgb.r) * letterProgress)
        const g = Math.round(startRgb.g + (endRgb.g - startRgb.g) * letterProgress)
        const b = Math.round(startRgb.b + (endRgb.b - startRgb.b) * letterProgress)
        return {
          fill: "none",
          stroke: `rgb(${r},${g},${b})`,
          strokeWidth: shape.strokeWidth || 8, // 元の strokeWidth を優先
        }
      }
      return {
        // フォールバック
        fill: "none",
        stroke: targetShapeColor,
        strokeWidth: shape.strokeWidth || 8,
      }
    }

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
      case "quarter-circle": // path系は fill と stroke を個別に扱う
        return (
          <path
            d={`M 0 ${shape.size} A ${shape.size} ${shape.size} 0 0 1 ${shape.size} 0 L 0 0 Z`}
            transform={`rotate(${shape.rotation} ${shape.size / 2} ${shape.size / 2})`}
            fill={drawingProps.fill}
            stroke={drawingProps.stroke}
            strokeWidth={drawingProps.strokeWidth}
          />
        )
      case "u-shape": // getShapeDrawingProps で特別扱い済み
        return (
          <path
            d={`M 0 0 L 0 ${shape.height - 20} A 20 20 0 0 0 20 ${shape.height} L ${shape.width - 20} ${shape.height} A 20 20 0 0 0 ${shape.width} ${shape.height - 20} L ${shape.width} 0`}
            fill={drawingProps.fill} // "none"
            stroke={drawingProps.stroke}
            strokeWidth={drawingProps.strokeWidth} // 元の太さを使用
          />
        )
      case "diagonal":
        return (
          <path
            d={`M 0 ${shape.height} L ${shape.width} 0 L ${shape.width} 15 L 15 ${shape.height} Z`}
            fill={drawingProps.fill}
            stroke={drawingProps.stroke}
            strokeWidth={drawingProps.strokeWidth}
          />
        )
      case "triangle":
        return (
          <path
            d={`M ${shape.width / 2} 0 L 0 ${shape.height} L 10 ${shape.height} L ${shape.width / 2} 20 L ${shape.width - 10} ${shape.height} L ${shape.width} ${shape.height} Z`}
            fill={drawingProps.fill}
            stroke={drawingProps.stroke}
            strokeWidth={drawingProps.strokeWidth}
          />
        )
      case "c-shape":
      case "arc": // arc と c-shape は同じパスデータだったのでまとめる
        return (
          <path
            d={`M ${shape.size} 20 A 30 30 0 0 0 20 0 A 30 30 0 0 0 0 30 L 0 ${shape.size - 30} A 30 30 0 0 0 30 ${shape.size} A 30 30 0 0 0 60 ${shape.size - 20} L 60 ${shape.size - 40} A 10 10 0 0 1 40 ${shape.size - 40} A 10 10 0 0 1 20 ${shape.size - 20} L 20 40 A 10 10 0 0 1 40 20 L ${shape.size - 20} 20`}
            fill={drawingProps.fill}
            stroke={drawingProps.stroke}
            strokeWidth={drawingProps.strokeWidth}
          />
        )
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
  // viewBoxの調整: circleの場合、中心が(radius, radius)なので、viewBoxは "0 0 radius*2 radius*2" が適切
  // fan-shape は shapeViewBox を持っているのでそれを優先
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
        rotateY: 0,
        rotateX: 0,
        z: 0,
      }}
      transition={{
        duration: 2,
        delay: shape.delay,
        ease: "easeOut",
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        z: 20,
        rotateY: 5,
        scale: 1.05,
      }}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={svgViewBox}
        className="overflow-visible" // これにより、回転したrect2などがはみ出ても表示される
        style={{ display: "block" }}
      >
        {renderShape()}
      </svg>
    </motion.div>
  )
}

// TsunaguHero コンポーネント (変更なしのため省略)
interface TsunaguHeroProps {
  onAnimationComplete?: () => void
}

export default function TsunaguHero2({ onAnimationComplete }: TsunaguHeroProps) {
  const [isFormed, setIsFormed] = useState(false)
  const [colorPhase, setColorPhase] = useState(0)
  const [cameraPhase, setCameraPhase] = useState(0) // 0: initial, 1: formation, 2: T focus, 3-8: letter focus, 9: final pullback

  useEffect(() => {
    // Initial camera movement: pull back to front view
    const initialCameraTimer = setTimeout(() => {
      setCameraPhase(1) // Move to formation view
    }, 2500)

    const formationTimer = setTimeout(() => {
      setIsFormed(true)
      setCameraPhase(2) // Focus on T
    }, 6000)

    let colorIntervalId: NodeJS.Timeout | null = null
    const colorTimer = setTimeout(() => {
      colorIntervalId = setInterval(() => {
        setColorPhase((prev) => {
          const newPhase = prev + 0.1

          // Camera follows each letter as it gets colored
          if (newPhase >= 0.5 && newPhase < 1.2) {
            // T
            setCameraPhase(2)
          } else if (newPhase >= 1.2 && newPhase < 1.9) {
            // S
            setCameraPhase(3)
          } else if (newPhase >= 1.9 && newPhase < 2.6) {
            // U1
            setCameraPhase(4)
          } else if (newPhase >= 2.6 && newPhase < 3.3) {
            // N
            setCameraPhase(5)
          } else if (newPhase >= 3.3 && newPhase < 4.0) {
            // A
            setCameraPhase(6)
          } else if (newPhase >= 4.0 && newPhase < 4.7) {
            // G
            setCameraPhase(7)
          } else if (newPhase >= 4.7 && newPhase < 5.4) {
            // U2
            setCameraPhase(8)
          } else if (newPhase >= 5.4) {
            // Final pullback
            setCameraPhase(9)
          }

          if (newPhase >= 7) {
            if (colorIntervalId) clearInterval(colorIntervalId)
            return 7
          }
          return newPhase
        })
      }, 50)
    }, 6500)

    return () => {
      clearTimeout(initialCameraTimer)
      clearTimeout(formationTimer)
      clearTimeout(colorTimer)
      if (colorIntervalId) clearInterval(colorIntervalId)
    }
  }, [])

  useEffect(() => {
    if (!onAnimationComplete) return

    const completeTimer = setTimeout(() => {
      onAnimationComplete()
    }, 12000)

    return () => clearTimeout(completeTimer)
  }, [onAnimationComplete])

  const letters = ["T", "S", "U1", "N", "A", "G", "U2"]

  // Calculate camera position and rotation based on phase
  const getCameraTransform = () => {
    const letterPositions = [
      { x: 70, y: 0 }, // T
      { x: 210, y: 0 }, // S
      { x: 350, y: 0 }, // U1
      { x: 490, y: 0 }, // N
      { x: 630, y: 0 }, // A
      { x: 770, y: 0 }, // G
      { x: 910, y: 0 }, // U2
    ]

    switch (cameraPhase) {
      case 0: // Initial: far back, right bottom angle
        return {
          scale: 0.4,
          rotateX: 25,
          rotateY: -30,
          rotateZ: 0,
          x: 200,
          y: 100,
          perspective: 2000,
        }
      case 1: // Formation: move to front view
        return {
          scale: 0.8,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: 0,
          y: 0,
          perspective: 1500,
        }
      case 2: // T focus
        return {
          scale: 1.8,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: -letterPositions[0].x * 1.8 + 400, // Changed from +200 to +400 to move camera more to the left
          y: -letterPositions[0].y * 1.8,
          perspective: 1200,
        }
      case 3: // S focus
        return {
          scale: 1.8,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: -letterPositions[1].x * 1.8 + 400, // Changed from +200 to +400
          y: -letterPositions[1].y * 1.8,
          perspective: 1200,
        }
      case 4: // U1 focus
        return {
          scale: 1.8,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: -letterPositions[2].x * 1.8 + 400, // Changed from +200 to +400
          y: -letterPositions[2].y * 1.8,
          perspective: 1200,
        }
      case 5: // N focus
        return {
          scale: 1.8,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: -letterPositions[3].x * 1.8 + 400, // Changed from +200 to +400
          y: -letterPositions[3].y * 1.8,
          perspective: 1200,
        }
      case 6: // A focus
        return {
          scale: 1.8,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: -letterPositions[4].x * 1.8 + 400, // Changed from +200 to +400
          y: -letterPositions[4].y * 1.8,
          perspective: 1200,
        }
      case 7: // G focus
        return {
          scale: 1.8,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: -letterPositions[5].x * 1.8 + 400, // Changed from +200 to +400
          y: -letterPositions[5].y * 1.8,
          perspective: 1200,
        }
      case 8: // U2 focus
        return {
          scale: 1.8,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: -letterPositions[6].x * 1.8 + 400, // Changed from +200 to +400
          y: -letterPositions[6].y * 1.8,
          perspective: 1200,
        }
      case 9: // Final pullback
        return {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: 0,
          y: 0,
          perspective: 1000,
        }
      default:
        return {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: 0,
          y: 0,
          perspective: 1000,
        }
    }
  }

  const cameraTransform = getCameraTransform()

  return (
    <motion.div
      className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        perspective: `${cameraTransform.perspective}px`,
      }}
    >
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
        style={{
          width: "980px",
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: cameraTransform.scale,
          rotateX: cameraTransform.rotateX,
          rotateY: cameraTransform.rotateY,
          rotateZ: cameraTransform.rotateZ,
          x: cameraTransform.x,
          y: cameraTransform.y,
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        {letters.map((letter, letterIndex) =>
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
      </motion.div>

      {/* 装飾用のmotion.divは変更なし */}
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
    </motion.div>
  )
}
