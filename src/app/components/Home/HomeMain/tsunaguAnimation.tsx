"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

// 各文字を構成する図形の定義
const letterShapes = {
  T: [
    { type: "rect", x: 12, y: 0, width: 72, height: 24, delay: 0 },
    { type: "rect", x: 36, y: 23, width: 24, height: 73, delay: 0.2 },
    { type: "circle", x: 0, y: 0, radius: 12, delay: 0.2 },
    { type: "circle", x: 72, y: 0, radius: 12, delay: 0.4 },// 同上
  ],
  S: [
    { type: "rect", x: 36, y: 0, width: 48, height: 24, delay: 0.8 },
    { type: "fan-shape",
      x: 14, y: 0, // SVGコンテナの文字 'S' 内での左上位置
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-46 -54 100 100",  delay: 1.0, rotation: 270   },
    { type: "fan-shape",
      x: 14, y: 0, // SVGコンテナの文字 'S' 内での左上位置
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-46 -54 100 100",  delay: 1.0, rotation: 180   },
    { type: "circle", x: 32, y: 24, radius: 7, delay: 0.4 },
     { type: "rect", x: 38, y: 38, width: 24, height: 20, delay: 0.8 },
   { type: "fan-shape",
      x: 14, y: 0, // SVGコンテナの文字 'S' 内での左上位置
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-83 -124 100 100",  delay: 1.0, rotation: 0  },
      { type: "fan-shape",
      x: 14, y: 0, // SVGコンテナの文字 'S' 内での左上位置
      shapeParams: { pivotX: 0, pivotY: 0, radius: 54, arcStartX: 0, arcStartY: -54, arcEndX: 54, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 1, },
      displayWidth: 54,  displayHeight: 54, shapeViewBox: "-83 -124 100 100",  delay: 1.0, rotation: 90  },
    
    { type: "rect", x: 12, y: 72, width: 48, height: 24, delay: 0.8 },
    { type: "circle", x: 54, y: 58, radius: 7, delay: 0.4 },




],  
  U1: [
    { type: "rect", x: 0, y: 0, width: 24, height: 48, delay: 1.4 },
    { type: "rect", x: 72, y: 0,  width: 24, height: 48, delay: 1.6 },
    { type: "fan-shape",
      x: 14, y: 0, // SVGコンテナの文字 'S' 内での左上位置
      shapeParams: { pivotX: 0, pivotY: 0, radius: 70, arcStartX: -70, arcStartY: 0, arcEndX: 70, arcEndY: 0,  arcLargeFlag: 0, arcSweepFlag: 0, },
      displayWidth: 70,  displayHeight: 70, shapeViewBox: "-50 -68 100 100",  delay: 1.0, rotation: 0  },
  ],
  N: [
    // "custom-arc" と "costam-arc" が混在しています。統一を推奨します。
    { type: "custom-arc",x: 0, y: 0, Rargeradius: 30,Smallradius: 30, startAngle: 0, endAngle: 90, delay: 0.5},
    { type: "rect", x: 0, y: 0, width: 20, height: 80, delay: 2.0 },
    { type: "diagonal", x: 20, y: 0, width: 40, height: 80, delay: 2.2 },
    { type: "rect", x: 60, y: 0, width: 20, height: 80, delay: 2.4 },
    { type: "circle", x: 45, y: 35, radius: 8, delay: 2.6 }, // x,y は左上基点
  ],
  A: [
    { type: "triangle", x: 20, y: 0, width: 40, height: 80, delay: 2.8 },
    { type: "rect", x: 15, y: 40, width: 50, height: 15, delay: 3.0 },
    { type: "circle", x: 40, y: 70, radius: 10, delay: 3.2 }, // x,y は左上基点
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

// 図形コンポーネント
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

  const getShapeColor = useCallback(() => {
    if (!isFormed) return "#000000";

    const letterProgress = Math.max(0, Math.min(1, (colorPhase - letterIndex * 0.3) / 0.7));

    if (letterProgress === 0) return "#000000";
    if (letterProgress === 1) {
      if (shape.type === "circle" || shape.type === "u-shape" || letterIndex === 2 || letterIndex === 6) {
        return "#ef4444"; // red-500
      }
      return "#000000";
    }

    const red = Math.floor(239 * letterProgress);
    const green = Math.floor(68 * letterProgress);
    const blue = Math.floor(68 * letterProgress);
    return `rgb(${red}, ${green}, ${blue})`;
  }, [isFormed, colorPhase, letterIndex, shape.type]);

  const renderShape = useCallback(() => {
    const color = getShapeColor();

    switch (shape.type) {
      case "rect":
        return <rect width={shape.width} height={shape.height} fill={color} rx={2} />;
      case "circle":
        return <circle r={shape.radius} fill={color} cx={shape.radius} cy={shape.radius} />;
      case "quarter-circle":
        return (
          <path
            d={`M 0 ${shape.size} A ${shape.size} ${shape.size} 0 0 1 ${shape.size} 0 L 0 0 Z`}
            fill={color}
            transform={`rotate(${shape.rotation} ${shape.size / 2} ${shape.size / 2})`}
          />
        );
      case "u-shape":
        return (
          <path
            d={`M 0 0 L 0 ${shape.height - 20} A 20 20 0 0 0 20 ${shape.height} L ${shape.width - 20} ${shape.height} A 20 20 0 0 0 ${shape.width} ${shape.height - 20} L ${shape.width} 0`}
            fill="none"
            stroke={color}
            strokeWidth="8"
          />
        );
      case "diagonal":
        return (
          <path d={`M 0 ${shape.height} L ${shape.width} 0 L ${shape.width} 15 L 15 ${shape.height} Z`} fill={color} />
        );
      case "triangle":
        return (
          <path
            d={`M ${shape.width / 2} 0 L 0 ${shape.height} L 10 ${shape.height} L ${shape.width / 2} 20 L ${shape.width - 10} ${shape.height} L ${shape.width} ${shape.height} Z`}
            fill={color}
          />
        );
      case "c-shape":
        return (
          <path
            d={`M ${shape.size} 20 A 30 30 0 0 0 20 0 A 30 30 0 0 0 0 30 L 0 ${shape.size - 30} A 30 30 0 0 0 30 ${shape.size} A 30 30 0 0 0 60 ${shape.size - 20} L 60 ${shape.size - 40} A 10 10 0 0 1 40 ${shape.size - 40} A 10 10 0 0 1 20 ${shape.size - 20} L 20 40 A 10 10 0 0 1 40 20 L ${shape.size - 20} 20`}
            fill={color}
          />
        );
      case "arc":
          return (
          <path
            d={`M ${shape.size} 20 A 30 30 0 0 0 20 0 A 30 30 0 0 0 0 30 L 0 ${shape.size - 30} A 30 30 0 0 0 30 ${shape.size} A 30 30 0 0 0 60 ${shape.size - 20} L 60 ${shape.size - 40} A 10 10 0 0 1 40 ${shape.size - 40} A 10 10 0 0 1 20 ${shape.size - 20} L 20 40 A 10 10 0 0 1 40 20 L ${shape.size - 20} 20`}
            fill={color}
          />
        );
      // ▼▼▼ 新しい fan-shape の処理 ▼▼▼
      case "fan-shape": {
        const params = shape.shapeParams || {}; // shapeParamsがない場合のフォールバック
        const pivotX = params.pivotX ?? 0;
        const pivotY = params.pivotY ?? 0;
        const radius = params.radius;
        const arcStartX = params.arcStartX;
        const arcStartY = params.arcStartY;
        const arcEndX = params.arcEndX;
        const arcEndY = params.arcEndY;
        const largeArcFlag = params.arcLargeFlag ?? 0;
        const sweepFlag = params.arcSweepFlag ?? 1; // デフォルトは時計回りに設定

        // 必須パラメータのチェック（本番用にはより詳細なチェックを推奨）
        if (radius === undefined || arcStartX === undefined || arcStartY === undefined || arcEndX === undefined || arcEndY === undefined) {
          console.warn("Fan shape is missing required parameters in shapeParams:", shape);
          return <rect width="10" height="10" fill="red" />; // エラー表示
        }

        const d = `M ${pivotX} ${pivotY} L ${arcStartX} ${arcStartY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY} Z`;
        
        return (
          <path
            d={d}
            fill={color}
            transform={shape.rotation ? `rotate(${shape.rotation} ${pivotX} ${pivotY})` : ""}
          />
        );
      }
      // ▲▲▲ fan-shape の処理ここまで ▲▲▲
      default:
        return <rect width={20} height={20} fill={color} />; // デフォルトのフォールバック
    }
  }, [getShapeColor, shape]);

  if (!initialAnimProps) {
    return null;
  }

  // ▼▼▼ SVG要素の width, height, viewBox を修正 ▼▼▼
  const svgWidth = shape.displayWidth ?? (shape.width || shape.radius * 2 || shape.size || 50);
  const svgHeight = shape.displayHeight ?? (shape.height || shape.radius * 2 || shape.size || 50);
  const svgViewBox = shape.shapeViewBox ?? `0 0 ${svgWidth} ${svgHeight}`;
  // ▲▲▲ ここまで修正 ▲▲▲

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
        {renderShape()}
      </svg>
    </motion.div>
  );
};

interface TsunaguHeroProps {
  onAnimationComplete?: () => void;
}

export default function TsunaguHero({ onAnimationComplete }: TsunaguHeroProps) {
  const [isFormed, setIsFormed] = useState(false);
  const [colorPhase, setColorPhase] = useState(0);

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
            // onAnimationComplete は全体のタイムアウトで呼ぶことにしているので、ここでは呼ばない
            return 7;
          }
          return prev + 0.1;
        });
      }, 100);
    }, 6500);

    return () => {
      clearTimeout(formationTimer);
      clearTimeout(colorTimer);
      if (colorIntervalId) clearInterval(colorIntervalId);
    };
  }, []); // onAnimationComplete を依存配列から削除、代わりに下のuseEffectで処理

  // アニメーション完了の通知 (全体のタイムアウトとして)
  useEffect(() => {
    if (!onAnimationComplete) return; // onAnimationCompleteが指定されていなければ何もしない

    const completeTimer = setTimeout(() => {
      onAnimationComplete();
    }, 10000); // 十分な時間を設定 (例: 10秒後)

    return () => clearTimeout(completeTimer);
  }, [onAnimationComplete]);

  const letters = ["T", "S", "U1", "N", "A", "G", "U2"];

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
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