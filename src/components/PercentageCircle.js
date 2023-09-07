import React from 'react';

const PercentageCircle = ({percent,text}) => {
  const radius = 30; // 원의 반지름
  const circumference = 2 * Math.PI * radius; // 원의 둘레

  // 퍼센티지에 따른 dash-array 계산
  const dashArray = `${(percent / 100) * circumference} ${circumference}`;

  return (
<div>

    {text}
    <svg width={2 * radius} height={2 * radius}>
      <circle
        cx={radius}
        cy={radius}
        r={radius - 5} // 내부 원의 반지름
        fill="none"
        stroke="#ccc" // 원의 색상
        strokeWidth="5" // 원의 두께
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - 5}
        fill="none"
        stroke="#007BFF" // 퍼센티지 표시 원의 색상
        strokeWidth="5"
        strokeDasharray={dashArray}
        strokeLinecap="round"
      />
    
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.3em"
        fontSize="16"
        fill="#333" // 텍스트 색상
      >
        {`${percent}%`}
      </text>
    </svg>
</div>
  );
};

export default PercentageCircle;