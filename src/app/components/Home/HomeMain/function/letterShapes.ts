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