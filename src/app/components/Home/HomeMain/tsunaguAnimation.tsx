"use client"

import { useState, useEffect, useCallback } from "react" // useCallback を追加しましたが、現状必須ではありません
import { motion } from "framer-motion"

// 各文字を構成する図形の定義
const letterShapes = {
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

// 図形コンポーネント
const Shape = ({ shape, letterIndex, isFormed, colorPhase }: any) => {
  const [initialAnimProps, setInitialAnimProps] = useState<null | {
    x: number;
    y: number;
    rotate: number;
    scale: number;
  }>(null);

  useEffect(() => {
    // クライアントサイドでのみ実行
    const angle = Math.random() * 2 * Math.PI;
    const distance = 800 + Math.random() * 400;
    setInitialAnimProps({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotate: Math.random() * 360,
      scale: 0.5,
    });
  }, []); // 空の依存配列でマウント時に一度だけ実行

  const finalX = letterIndex * 140 + shape.x;
  const finalY = 200 + shape.y;

  const getShapeColor = useCallback(() => {
    if (!isFormed) return "#000000";

    const letterProgress = Math.max(0, Math.min(1, (colorPhase - letterIndex * 0.3) / 0.7));

    if (letterProgress === 0) return "#000000";
    if (letterProgress === 1) {
      // 最終的な色（赤い部分を含む）
      if (shape.type === "circle" || shape.type === "u-shape" || letterIndex === 2 || letterIndex === 6) {
        return "#ef4444"; // red-500
      }
      return "#000000";
    }

    // グラデーション中
    const red = Math.floor(239 * letterProgress); // ef -> 239
    const green = Math.floor(68 * letterProgress); // 44 -> 68
    const blue = Math.floor(68 * letterProgress); // 44 -> 68
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
      default:
        return <rect width={20} height={20} fill={color} />;
    }
  }, [getShapeColor, shape]);

  // initialAnimProps が設定されるまで何もレンダリングしない
  if (!initialAnimProps) {
    return null;
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
        width={shape.width || shape.radius * 2 || shape.size || 0} // size が 0 の場合のフォールバック
        height={shape.height || shape.radius * 2 || shape.size || 0} // size が 0 の場合のフォールバック
        className="overflow-visible" // SVGがクリッピングされないように
        style={{ display: 'block' }} // 余分なスペースを避ける
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
    // 図形の移動完了を待つ
    const formationTimer = setTimeout(() => {
      setIsFormed(true);
    }, 6000); // 全てのshape.delayの最大値 + duration(2s) を考慮した時間

    // 色の変化開始
    const colorTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setColorPhase((prev) => {
          if (prev >= 7) { // letters.length
            clearInterval(interval);
            if (onAnimationComplete) { // 色の変化が完了したら通知
                // onAnimationComplete(); // このタイミングか、さらに遅延させるか
            }
            return 7;
          }
          return prev + 0.1;
        });
      }, 100); // 色の変化の速度
      // interval をクリアするために return で関数を返す
      return () => clearInterval(interval);
    }, 6500); // formationTimer の後

    return () => {
      clearTimeout(formationTimer);
      clearTimeout(colorTimer); // colorTimer 自体もクリア
    };
  }, [onAnimationComplete]);

  // アニメーション完了の通知 (全体のタイムアウトとして)
  useEffect(() => {
    const completeTimer = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 10000); // 10秒後にアニメーション完了とみなす (適宜調整)

    return () => clearTimeout(completeTimer);
  }, [onAnimationComplete]);

  const letters = ["T", "S", "U1", "N", "A", "G", "U2"];

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* 格子線の背景 */}
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
        style={{ width: '980px' }} // コンテンツの基本幅を指定
      >
        {letters.map((letter, letterIndex) => (
          // letterShapesの型安全性を高めるために、letterがキーとして存在するか確認
          (letterShapes[letter as keyof typeof letterShapes] || []).map((shape, shapeIndex) => (
            <Shape
              key={`${letter}-${letterIndex}-${shapeIndex}`} // より一意なキー
              shape={shape}
              letterIndex={letterIndex}
              isFormed={isFormed}
              colorPhase={colorPhase}
            />
          ))
        ))}
      </motion.div>
      {/* 背景の装飾的な図形 */}
      <motion.div
        className="absolute top-20 left-20 w-8 h-8 border-2 border-gray-300 rounded-full z-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }} // Infinity を使用
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