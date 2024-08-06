import React, { useState, useEffect } from "react";

const APIInfo = ({ domain, order }) => {
  const [domainInfo, setDomainInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // 这里替换成你的 API 请求 URL
      const response = await fetch(`/api/domainInfo?domain=${domain}&order=${order}`);
      const data = await response.json();
      setDomainInfo(data);
    };
    fetchData();
  }, [domain, order]);

  if (!domainInfo) {
    return <div>Loading...</div>;
  }

  const { code, data } = domainInfo;
  const rows = data.price.slice(0, 2).map((price, index) => (
    <tr key={index}>
      <td><a href={price.registrarweb}>{price.registrarname}</a></td>
      <td>{price.new} {price.currencytype}</td>
      <td>{price.renew} {price.currencytype}</td>
      <td>{price.transfer} {price.currencytype}</td>
    </tr>
  ));

  const remainingRows = data.price.slice(2).map((price, index) => (
    <tr key={index}>
      <td><a href={price.registrarweb}>{price.registrarname}</a></td>
      <td>{price.new} {price.currencytype}</td>
      <td>{price.renew} {price.currencytype}</td>
      <td>{price.transfer} {price.currencytype}</td>
    </tr>
  ));

  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <style>
        {`
          .domain-table th, .domain-table td { width: calc(100% / 4); }
        `}
      </style>
      <table className='domain-table'>
        <thead>
          <tr>
            <td>Registrar</td>
            <td>注册</td>
            <td>续费</td>
            <td>转入</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      {remainingRows.length > 0 && (
        <>
          <table id='remainingRows' className='domain-table' style={{ display: showMore ? 'table' : 'none' }}>
            <tbody>
              {remainingRows}
            </tbody>
          </table>
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </>
      )}
    </div>
  );
};

export default APIInfo;
