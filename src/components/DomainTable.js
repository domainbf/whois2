import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getDomainInfo(domain, order) {
    const url = `https://www.nazhumi.com/api/v1?domain=${domain}&order=${order}`;
    return axios.get(url).then(response => response.data);
}

function DomainTable({ domain, order }) {
    const [html, setHtml] = useState('');
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        getDomainInfo(domain, order).then(data => {
            const { code, data: domainData } = data;
            let htmlContent = `
                <style>.domain-table { width: 100%; } .domain-table th, .domain-table td { padding: 8px; text-align: left; }</style>
                <table class='domain-table'>
                    <thead><tr><td>Registrar</td><td>注册</td><td>续费</td><td>转入</td></tr></thead>
                    <tbody>
            `;

            const prices = domainData.price.slice(0, 2);
            prices.forEach(price => {
                htmlContent += `<tr><td><a href='${price.registrarweb}'>${price.registrarname}</a></td><td>${price.new} ${price.currencytype}</td><td>${price.renew} ${price.currencytype}</td><td>${price.transfer} ${price.currencytype}</td></tr>`;
            });

            htmlContent += `</tbody></table>`;

            if (domainData.price.length > 2) {
                htmlContent += `<button onClick={() => setShowMore(!showMore)}>${showMore ? '收起' : '展开'}</button>`;
                if (showMore) {
                    htmlContent += `<table class='domain-table'><tbody>`;
                    domainData.price.slice(2).forEach(price => {
                        htmlContent += `<tr><td><a href='${price.registrarweb}'>${price.registrarname}</a></td><td>${price.new} ${price.currencytype}</td><td>${price.renew} ${price.currencytype}</td><td>${price.transfer} ${price.currencytype}</td></tr>`;
                    });
                    htmlContent += `</tbody></table>`;
                }
            }

            setHtml(htmlContent);
        });
    }, [domain, order, showMore]);

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default DomainTable;

