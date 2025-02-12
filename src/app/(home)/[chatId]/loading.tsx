export default function Loading() {
  return (
    <div className="h-full w-full grid place-items-center animate-grid-fade bg-grid">
      <div className="max-w-60 w-full" content="loading">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a12"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stopColor="#FF156D"></stop>
            <stop offset=".3" stopColor="#FF156D" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="#FF156D" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="#FF156D" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="#FF156D" stopOpacity="0"></stop>
          </radialGradient>
          <circle
            transform-origin="center"
            fill="none"
            stroke="url(#a12)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            transform-origin="center"
            fill="none"
            opacity=".2"
            stroke="#FF156D"
            strokeWidth="15"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      </div>
    </div>
  );
}
