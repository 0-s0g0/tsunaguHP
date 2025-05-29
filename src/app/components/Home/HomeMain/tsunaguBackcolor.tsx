"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

// 各文字を構成する図形の定義 (変更なし)
export const letterShapes = {
  T: [
    { type: "rect", x: 12, y: 0, width: 72, height: 24, delay: 0 ,color: "#2BB673" },
    { type: "rect", x: 36, y: 23, width: 24, height: 73, delay: 0.2,color: "#2BB673"  },
    { type: "circle", x: 0, y: 0, radius: 12, delay: 0.2,color: "#2BB673"   },
    { type: "circle", x: 72, y: 0, radius: 12, delay: 0.4,color: "#2BB673"  },
  ],
  S: [
    { type: "rect", x: 36, y: 0, width: 48, height: 24, delay: 0.8, color:"#F7941D"  },
    { type: "fan-shape",
      x: 14, y: 0, 
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-46 -54 100 100",  delay: 1.0, rotation: 270 , color:"#ED1D26"   },
    { type: "fan-shape",
      x: 14, y: 0, 
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-46 -54 100 100",  delay: 1.0, rotation: 180  , color:"#000000"},
    { type: "circle", x: 32, y: 24, radius: 7, delay: 0.4 , color:"#edf2f7"  },
      { type: "rect", x: 38, y: 38, width: 24, height: 20, delay: 0.8,color:"#F7941D"  },
    { type: "fan-shape",
      x: 14, y: 0, 
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-83 -124 100 100",  delay: 1.0, rotation: 0 , color:"#F7941D"  }, 
      { type: "fan-shape",
      x: 14, y: 0, 
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
  N: [ 
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
    shapeParams: { pivotX: 0, pivotY: 0, radius: 70, arcStartX: 49.497, arcStartY: -49.497, arcEndX:  49.497, arcEndY: 49.497, arcLargeFlag: 1, arcSweepFlag: 0, },
    displayWidth: 70, displayHeight: 69, shapeViewBox: "-49 -68 100 100", delay: 1.0, rotation: 0, color:"#2BB673"},
    { type: "circle", x: 24, y: 24, radius: 24, delay: 0.4 ,color:"#edf2f7" },
    { type: "fan-shape",
    x: 14, y: 0,
    shapeParams: { pivotX: 0, pivotY: 0, radius: 70, arcStartX: 49.497, arcStartY: 49.497, arcEndX: 70, arcEndY: 0, arcLargeFlag: 0, arcSweepFlag: 0, },
    displayWidth: 70, displayHeight: 69, shapeViewBox: "-49 -68 100 100", delay: 1.0, rotation: 0, color:"#000000"},
  ],
  U2: [ 
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

// ヘルパー関数 (変更なし)
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// 共通の図形描画関数
const renderSpecificShape = (shape: any, drawingProps: any) => {
  switch (shape.type) {
    case "rect":
      return (
        <rect
          width={shape.width}
          height={shape.height}
          rx={2}
          {...drawingProps}
        />
      );
    case "circle":
      return (
        <circle
          r={shape.radius}
          cx={shape.radius}
          cy={shape.radius}
          {...drawingProps}
        />
      );
    case "rect2": {
      const rotationAngle = shape.angle || 0;
      const transformValue = `rotate(${rotationAngle} ${shape.width / 2} ${shape.height / 2})`;
      return (
        <rect
          width={shape.width}
          height={shape.height}
          rx={2}
          transform={transformValue}
          {...drawingProps}
        />
      );
    }
    case "fan-shape": {
      const params = shape.shapeParams || {};
      const pivotX = params.pivotX ?? 0;
      const pivotY = params.pivotY ?? 0;
      const radius = params.radius;
      const arcStartX = params.arcStartX;
      const arcStartY = params.arcStartY;
      const arcEndX = params.arcEndX;
      const arcEndY = params.arcEndY;
      const largeArcFlag = params.arcLargeFlag ?? 0;
      const sweepFlag = params.arcSweepFlag ?? 1;

      if (radius === undefined || arcStartX === undefined || arcStartY === undefined || arcEndX === undefined || arcEndY === undefined) {
        console.warn("Fan shape is missing required parameters in shapeParams:", shape);
        return <rect width="10" height="10" fill="red" />; // エラー表示
      }

      const d = `M ${pivotX} ${pivotY} L ${arcStartX} ${arcStartY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY} Z`;
      
      return (
        <path
          d={d}
          transform={shape.rotation ? `rotate(${shape.rotation} ${pivotX} ${pivotY})` : ""}
          fill={drawingProps.fill}
          stroke={drawingProps.stroke}
          strokeWidth={drawingProps.strokeWidth}
        />
      );
    }
    default:
      return <rect width={20} height={20} {...drawingProps} />; // フォールバック
  }
};

// 図形コンポーネント (メインの文字形成用)
const Shape = ({ shape, letterIndex, isFormed, colorPhase }: any) => {
  const [initialAnimProps, setInitialAnimProps] = useState<null | {
    x: number;
    y: number;
    rotate: number;
    scale: number;
  }>(null);

  useEffect(() => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = 800 + Math.random() * 400;
    setInitialAnimProps({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotate: Math.random() * 360,
      scale: 0.5,
    });
  }, []);

  const finalX = letterIndex * 140 + shape.x;
  const finalY = 200 + shape.y;

  const getShapeDrawingProps = useCallback(() => {
    const initialFillColor = "#FFFFFF"; 
    const initialStrokeColor = "#000000"; 
    const initialStrokeWidth = 1; 

    const targetShapeColor = shape.color || "#000000";

    if (!isFormed) {
      return {
        fill: initialFillColor,
        stroke: initialStrokeColor,
        strokeWidth: initialStrokeWidth,
      };
    }

    const letterProgress = Math.max(0, Math.min(1, (colorPhase - letterIndex * 0.3 - 0.5) / 0.5));

    const startRgb = hexToRgb(initialFillColor);
    const endRgb = hexToRgb(targetShapeColor);

    let currentFill = targetShapeColor;
    if (startRgb && endRgb) {
      const r = Math.round(startRgb.r + (endRgb.r - startRgb.r) * letterProgress);
      const g = Math.round(startRgb.g + (endRgb.g - startRgb.g) * letterProgress);
      const b = Math.round(startRgb.b + (endRgb.b - startRgb.b) * letterProgress);
      currentFill = `rgb(${r},${g},${b})`;
    }
    
    const currentStrokeWidth = initialStrokeWidth * (1 - letterProgress);
    const currentStroke = letterProgress < 1 ? initialStrokeColor : "none";

    return {
      fill: currentFill,
      stroke: currentStroke,
      strokeWidth: currentStrokeWidth,
    };
  }, [isFormed, colorPhase, letterIndex, shape.color]);


  const renderShapeContent = useCallback(() => {
    const drawingProps = getShapeDrawingProps();
    return renderSpecificShape(shape, drawingProps);
  }, [getShapeDrawingProps, shape]);

  if (!initialAnimProps) {
    return null;
  }

  const svgWidth = shape.displayWidth ?? (shape.width || (shape.type === 'circle' ? shape.radius * 2 : undefined) || shape.size || 50);
  const svgHeight = shape.displayHeight ?? (shape.height || (shape.type === 'circle' ? shape.radius * 2 : undefined) || shape.size || 50);
  let svgViewBox = shape.shapeViewBox;
  if (!svgViewBox) {
    if (shape.type === 'circle' && shape.radius) {
      svgViewBox = `0 0 ${shape.radius * 2} ${shape.radius * 2}`;
    } else {
      svgViewBox = `0 0 ${svgWidth} ${svgHeight}`;
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
        style={{ display: 'block' }}
      >
        {renderShapeContent()}
      </svg>
    </motion.div>
  );
};

// 背景で浮遊する図形コンポーネント
const FloatingShape = ({ shapeDef }: { shapeDef: any }) => {
  const { shape, initialX, initialY, duration, movementRange, sizeFactor } = shapeDef;

  const baseWidth = shape.displayWidth ?? (shape.width || (shape.type === 'circle' ? shape.radius * 2 : undefined) || shape.size || 30);
  const baseHeight = shape.displayHeight ?? (shape.height || (shape.type === 'circle' ? shape.radius * 2 : undefined) || shape.size || 30);
  
  const svgWidth = baseWidth * sizeFactor;
  const svgHeight = baseHeight * sizeFactor;


  let svgViewBox = shape.shapeViewBox;
  if (!svgViewBox) {
    if (shape.type === 'circle' && shape.radius) {
      svgViewBox = `0 0 ${shape.radius * 2} ${shape.radius * 2}`;
    } else {
      // 元の図形のwidth/heightをviewBoxに使用
      svgViewBox = `0 0 ${baseWidth} ${baseHeight}`;
    }
  }
  
  const drawingProps = {
    fill: shape.color || "#000000",
    stroke: "none",
  };

  return (
    <motion.div
      className="absolute"
      style={{
        width: svgWidth,
        height: svgHeight,
        opacity: 0.2 + Math.random() * 0.3, // ランダムな透明度 (0.2-0.5)
      }}
      initial={{ 
        x: initialX, 
        y: initialY, 
        rotate: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4 // ランダムな初期スケール (0.8-1.2)
      }}
      animate={{
        x: [initialX, initialX + (Math.random() - 0.5) * movementRange, initialX],
        y: [initialY, initialY + (Math.random() - 0.5) * movementRange, initialY],
        rotate: Math.random() > 0.5 ? [0, 360] : [0, -360],
        scale: [0.8 + Math.random() * 0.4, 1, 0.8 + Math.random() * 0.4] // スケールも少しアニメーション
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: Math.random() * 5, // アニメーション開始をずらす
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={svgViewBox}
        className="overflow-visible"
        style={{ display: 'block' }}
      >
        {renderSpecificShape(shape, drawingProps)}
      </svg>
    </motion.div>
  );
};


interface TsunaguHeroProps {
  onAnimationComplete?: () => void;
}

export default function TsunaguHero5({ onAnimationComplete }: TsunaguHeroProps) {
  const [isFormed, setIsFormed] = useState(false);
  const [colorPhase, setColorPhase] = useState(0);
  const [floatingShapesData, setFloatingShapesData] = useState<any[]>([]);

  useEffect(() => {
    const formationTimer = setTimeout(() => {
      setIsFormed(true);
    }, 6000); 

    let colorIntervalId: NodeJS.Timeout | null = null;
    const colorTimer = setTimeout(() => {
      colorIntervalId = setInterval(() => {
        setColorPhase((prev) => {
          if (prev >= 7) { 
            if (colorIntervalId) clearInterval(colorIntervalId);
            return 7;
          }
          return prev + 0.1;
        });
      }, 50); 
    }, 6500); 

    // 背景図形の生成
    const allShapeDefinitions: any[] = [];
    Object.values(letterShapes).forEach(shapesArray => {
      shapesArray.forEach(shape => allShapeDefinitions.push(shape));
    });

    const generatedShapes = [];
    const numberOfFloatingShapes = 25; // 背景に表示する図形の数

    // 画面サイズを取得（クライアントサイドでのみ実行）
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1000;
    const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;


    for (let i = 0; i < numberOfFloatingShapes; i++) {
      const randomShape = allShapeDefinitions[Math.floor(Math.random() * allShapeDefinitions.length)];
      generatedShapes.push({
        shape: randomShape,
        initialX: Math.random() * screenWidth,
        initialY: Math.random() * screenHeight,
        duration: 15 + Math.random() * 15, // 15-30秒
        movementRange: 80 + Math.random() * 100, // 移動範囲
        sizeFactor: 0.3 + Math.random() * 0.5, // サイズ係数 (0.3 - 0.8倍)
      });
    }
    setFloatingShapesData(generatedShapes);


    return () => {
      clearTimeout(formationTimer);
      clearTimeout(colorTimer);
      if (colorIntervalId) clearInterval(colorIntervalId);
    };
  }, []);

  useEffect(() => {
    if (!onAnimationComplete) return;
    const completeTimer = setTimeout(() => {
      onAnimationComplete();
    }, 10000); 
    return () => clearTimeout(completeTimer);
  }, [onAnimationComplete]);

  const letters = ["T", "S", "U1", "N", "A", "G", "U2"];

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* 背景のグリッドSVG (z-index: -10) */}
      <div className="absolute inset-0 opacity-30 -z-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 浮遊する背景図形たち (z-index: 0, グリッドより手前、メインより後ろ) */}
      <div className="absolute inset-0 z-0">
        {floatingShapesData.map((data, index) => (
          <FloatingShape
            key={`float-${index}-${data.shape.type}`} // よりユニークなキー
            shapeDef={data}
          />
        ))}
      </div>
      
      {/* メインの文字アニメーションコンテナ (z-index: 10) */}
      <motion.div
        className="relative h-[200px] sm:h-[300px] lg:h-[400px] z-10 scale-[35%] sm:scale-75 lg:scale-100 -translate-x-[100px] sm:translate-x-0"
        style={{ width: '980px' }} 
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
          ))
        )}
      </motion.div>

      {/* 装飾用のmotion.div (z-index: 20) */}
      <motion.div
        className="absolute top-20 left-20 w-8 h-8 border-2 border-gray-300 rounded-full z-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-6 h-6 bg-gray-200 z-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-10 h-5 border-2 border-gray-300 rounded-full z-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}