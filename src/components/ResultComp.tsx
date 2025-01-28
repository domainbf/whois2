import React from 'react';

interface RowProps {
  name: string;
  value: string | undefined;
  hidden?: boolean;
}

const Row: React.FC<RowProps> = ({ name, value, hidden }) => {
  if (hidden) return null; // 如果 hidden 为 true，则不渲染这一行
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
};

interface ResultCompProps {
  result: {
    deletionDate?: string;
    availableDate?: string;
  };
  target: string; // 假设你还需要传入 target
}

const ResultComp: React.FC<ResultCompProps> = ({ result, target }) => {
  // 日期格式化函数
  const toReadableISODate = (date?: string): string | undefined => {
    if (!date || date === "Unknown") return undefined;
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0]; // 返回 YYYY-MM-DD 格式
  };

  return (
    <div className="result-comp">
      <h2>Search Result for {target}</h2>
      <table className="result-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {/* 添加新的行以显示删除日期和再次可用日期 */}
          <Row
            name="域名删除日期:"
            value={toReadableISODate(result.deletionDate)}
            hidden={!result.deletionDate || result.deletionDate === "Unknown"}
          />
          <Row
            name="域名再次可用日期:"
            value={toReadableISODate(result.availableDate)}
            hidden={!result.availableDate || result.availableDate === "Unknown"}
          />
          {/* 其他结果行可以在这里添加 */}
        </tbody>
      </table>
    </div>
  );
};

export default ResultComp;
