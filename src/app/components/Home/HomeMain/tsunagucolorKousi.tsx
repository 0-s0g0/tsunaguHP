"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {letterShapes} from "./function/letterShapes";


// 図形コンポーネント
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
    // 常にカラフルな色を使用
    const targetShapeColor = shape.color || "#000000"


    return {
      fill: targetShapeColor,
      stroke: "none",
      strokeWidth: 0,
    }
  }, [shape.color, shape.type, shape.strokeWidth])

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

interface TsunaguHeroProps {
  onAnimationComplete?: () => void
}

// アニメーション格子線コンポーネントを追加
const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 垂直線 - 一本ずつ順番に出現 */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`vertical-${i}`}
          className="absolute h-full w-px bg-gray-300"
          style={{ left: `${(i + 1) * 3}%` }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: 1,
            scaleY: 1,
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}

      {/* 水平線 - 一本ずつ順番に出現 */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`horizontal-${i}`}
          className="absolute w-full h-px bg-gray-300"
          style={{ top: `${(i + 1) * 6}%` }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: 1,
            scaleX: 1,
          }}
          transition={{
            duration: 0.8,
            delay:  1+ i * 0.2, // 垂直線の後に開始
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export default function TsunaguHero3({ onAnimationComplete }: TsunaguHeroProps) {
  const [isFormed, setIsFormed] = useState(false)

  useEffect(() => {
    const formationTimer = setTimeout(() => {
      setIsFormed(true)
    }, 6000)

    return () => {
      clearTimeout(formationTimer)
    }
  }, [])

  useEffect(() => {
    if (!onAnimationComplete) return

    const completeTimer = setTimeout(() => {
      onAnimationComplete()
    }, 8000) // 少し短縮

    return () => clearTimeout(completeTimer)
  }, [onAnimationComplete])

  const letters = ["T", "S", "U1", "N", "A", "G", "U2"]

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-80">
        <AnimatedGrid />
      </div>

      <motion.div
        className="relative h-[200px] sm:h-[300px] lg:h-[400px] z-10 scale-[35%] sm:scale-75 lg:scale-100 -translate-x-[100px] sm:translate-x-0"
        style={{ width: "980px" }}
      >
        {letters.map((letter, letterIndex) =>
          (letterShapes[letter as keyof typeof letterShapes] || []).map((shape, shapeIndex) => (
            <Shape
              key={`${letter}-${letterIndex}-${shapeIndex}`}
              shape={shape}
              letterIndex={letterIndex}
              isFormed={isFormed}
            />
          )),
        )}
      </motion.div>

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
