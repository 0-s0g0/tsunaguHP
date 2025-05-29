"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
// 各文字を構成する図形の定義 (変更なしのため省略)
export const letterShapes = {
  T: [
    { type: "rect", x: 12, y: 0, width: 72, height: 24, delay: 0 ,color: "#2BB673" },
    { type: "rect", x: 36, y: 23, width: 24, height: 73, delay: 0.2,color: "#2BB673"  },
    { type: "circle", x: 0, y: 0, radius: 12, delay: 0.2,color: "#2BB673"  }, // x,yはSVG要素の左上基点
    { type: "circle", x: 72, y: 0, radius: 12, delay: 0.4,color: "#2BB673"  },// 同上
  ],
  S: [
    { type: "rect", x: 36, y: 0, width: 48, height: 24, delay: 0.8, color:"#F7941D"  },
    { type: "fan-shape",
      x: 14, y: 0, // SVGコンテナの文字 'S' 内での左上位置
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-46 -54 100 100",  delay: 1.0, rotation: 270 , color:"#ED1D26"   },
    { type: "fan-shape",
      x: 14, y: 0, // SVGコンテナの文字 'S' 内での左上位置
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-46 -54 100 100",  delay: 1.0, rotation: 180  , color:"#000000"},
    { type: "circle", x: 32, y: 24, radius: 7, delay: 0.4 , color:"#edf2f7"  },
      { type: "rect", x: 38, y: 38, width: 24, height: 20, delay: 0.8,color:"#F7941D"  },
    { type: "fan-shape",
      x: 14, y: 0, // SVGコンテナの文字 'S' 内での左上位置
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-83 -124 100 100",  delay: 1.0, rotation: 0 , color:"#F7941D"  }, // color 追加
      { type: "fan-shape",
      x: 14, y: 0, // SVGコンテナの文字 'S' 内での左上位置
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-83 -124 100 100",  delay: 1.0, rotation: 90 ,color: "#2BB673"  },
    
    { type: "rect", x: 12, y: 72, width: 48, height: 24, delay: 0.8,color:"#F7941D"  },
    { type: "circle", x: 54, y: 58, radius: 7, delay: 0.4 ,color:"#edf2f7" },
  ],  
  U1: [
    { type: "rect", x: 0, y: 0, width: 24, height: 48, delay: 1.4,color:"#F7941D"  },
    { type: "rect", x: 73, y: 0,  width: 24, height: 48, delay: 1.6,color:"#F7941D"  },
    { type: "fan-shape",
      x: 14, y: 0, 
      shapeParams: { pivotX: 0, pivotY: 0, radius: 70, arcStartX: -70, arcStartY: 0, arcEndX: 70, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 0, },
      displayWidth: 70,  displayHeight: 69, shapeViewBox: "-49 -68 100 100",  delay: 1.0, rotation: 0,color:"#ED1D26"   },
    { type: "fan-shape",
      x: 14, y: 0, 
      shapeParams: { pivotX: 0, pivotY: 0, radius: 50, arcStartX: -50, arcStartY: 0, arcEndX: 50, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 0, },
      displayWidth: 50,  displayHeight: 50, shapeViewBox: "-69 -91 100 100",  delay: 1.0, rotation: 0,color:"#edf2f7"  },
  ],
  N: [ // N に color を追加
    { type: "rect2", x: 37, y: -6, width: 20, height: 110, delay: 2.4 ,angle:315, color: "#ED1D26"}, 
    { type: "rect", x: 0, y: 12, width: 20, height: 84, delay: 2.0, color: "#662D92" },
    { type: "rect", x: 72, y: 0, width: 20, height: 84, delay: 2.0, color: "#662D92" },
    { type: "circle", x: 0, y: 0, radius: 10, delay: 0.4, color: "#662D92" },
    { type: "circle", x: 72, y: 75, radius: 10, delay: 0.4, color: "#662D92" },
  ],
  A: [ 
    { type: "rect", x: 0, y: 46, width: 24, height: 50, delay: 1.4,color:"#0F75BB"  },
    { type: "rect", x: 73, y: 46,  width: 24, height: 50, delay: 1.6,color:"#0F75BB"  },
    { type: "fan-shape",
      x: 14, y: 0, 
      shapeParams: { pivotX: 0, pivotY: 0, radius: 70, arcStartX: -70, arcStartY: 0, arcEndX: 70, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 70,  displayHeight: 69, shapeViewBox: "-49 -68 100 100",  delay: 1.0, rotation: 0,color:"#24AAE1"   },
    { type: "fan-shape",
      x: 14, y: 0, 
      shapeParams: { pivotX: 0, pivotY: 0, radius: 50, arcStartX: -50, arcStartY: 0, arcEndX: 50, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 50,  displayHeight: 50, shapeViewBox: "-69 -96 100 100",  delay: 1.0, rotation: 0,color:"#edf2f7"  },
    { type: "circle", x: 31, y: 50, radius: 18, delay: 0.4, color: "#ED1D26" },

  ],
  G: [
    {type: "fan-shape",
    x: 14, y: 0,
    shapeParams: { pivotX: 0, pivotY: 0, radius: 70, arcStartX: 49.497, arcStartY: -49.497, arcEndX:  49.497, arcEndY: 49.497, arcLargeFlag: 1, arcSweepFlag: 0, }, // sweepFlagが0なので上半円
    displayWidth: 70, displayHeight: 69, shapeViewBox: "-49 -68 100 100", delay: 1.0, rotation: 0, color:"#2BB673"},
    { type: "circle", x: 24, y: 24, radius: 24, delay: 0.4 ,color:"#edf2f7" },
    { type: "fan-shape",
    x: 14, y: 0,
    shapeParams: { pivotX: 0, pivotY: 0, radius: 70, arcStartX: 49.497, arcStartY: 49.497, arcEndX: 70, arcEndY: 0, arcLargeFlag: 0, arcSweepFlag: 0, }, // sweepFlagが0なので上半円
    displayWidth: 70, displayHeight: 69, shapeViewBox: "-49 -68 100 100", delay: 1.0, rotation: 0, color:"#000000"},
  ],
  U2: [ // U2 に color を追加
     { type: "rect", x: 0, y: 0, width: 24, height: 48, delay: 1.4,color:"#F7941D"  },
    { type: "rect", x: 73, y: 0,  width: 24, height: 48, delay: 1.6,color:"#F7941D"  },
    { type: "fan-shape",
      x: 14, y: 0, 
      shapeParams: { pivotX: 0, pivotY: 0, radius: 70, arcStartX: -70, arcStartY: 0, arcEndX: 70, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 0, },
      displayWidth: 70,  displayHeight: 69, shapeViewBox: "-49 -68 100 100",  delay: 1.0, rotation: 0,color:"#ED1D26"   },
    { type: "fan-shape",
      x: 14, y: 0, 
      shapeParams: { pivotX: 0, pivotY: 0, radius: 50, arcStartX: -50, arcStartY: 0, arcEndX: 50, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 0, },
      displayWidth: 50,  displayHeight: 50, shapeViewBox: "-69 -91 100 100",  delay: 1.0, rotation: 0,color:"#edf2f7"  },
  ],
}


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

export default function TsunaguHero6({ onAnimationComplete }: TsunaguHeroProps) {
  const [isFormed, setIsFormed] = useState(false)

  useEffect(() => {
    const formationTimer = setTimeout(() => {
      setIsFormed(true)
    }, 6000) // 格子アニメーションがなくなったため、この遅延は調整が必要かもしれません

    return () => {
      clearTimeout(formationTimer)
    }
  }, [])

  useEffect(() => {
    if (!onAnimationComplete) return

    // 格子アニメーションがなくなったため、完了タイミングを調整
    // Shapeのアニメーションが約2秒 + delayなので、最大のdelayを考慮して設定
    // letterShapes内の最大のdelay値に基づいて調整するとより正確になります
    const completeTimer = setTimeout(() => {
      onAnimationComplete()
    }, 8000) // この値はShapeアニメーションの持続時間とdelayに基づいて調整してください

    return () => clearTimeout(completeTimer)
  }, [onAnimationComplete])

  const letters = ["T", "S", "U1", "N", "A", "G", "U2"]

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* AnimatedGridコンポーネントの呼び出しを削除 */}
      {/*
      <div className="absolute inset-0 opacity-80">
        <AnimatedGrid />
      </div>
      */}

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
              isFormed={isFormed} // isFormed は Shapeコンポーネント内で現在使用されていませんが、将来的に使用する可能性を考慮して残しています
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