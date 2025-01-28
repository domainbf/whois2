import React from 'react';

interface ResultCompProps {
  result: string; // 结果现在是一个字符串
}

const ResultComp: React.FC<ResultCompProps> = ({ result }) => {
  return (
    <div className="result-comp">
      <h2>Search Result</h2>
      <p>{result}</p>
    </div>
  );
};

export default ResultComp;
