function getDomainInfo($domain, $order) {
    $url = "https://www.nazhumi.com/api/v1?domain=$domain&order=$order";
    // Make a GET request to the API
    $response = file_get_contents($url);
    // Parse the JSON response
    $data = json_decode($response, true);
    return $data;
}

function getHtmlInfo($domain, $order) {
    $domainInfo = getDomainInfo($domain, $order);
    $code = $domainInfo['code'];
    $data = $domainInfo['data'];

    // Generate HTML output
    $html = "<style>.domain-table { width: 100%; } .domain-table th, .domain-table td { padding: 8px; text-align: left; }</style>";
    $html .= "<table class='domain-table'>";
    $html .= "<thead><tr><td>Registrar</td><td>注册</td><td>续费</td><td>转入</td></tr></thead>";
    $html .= "<tbody>";

    $rowCount = 0;
    foreach ($data['price'] as $price) {
        if ($rowCount == 2) break; // Limit to first 2 rows initially
        $html .= "<tr><td><a href='{$price['registrarweb']}'>{$price['registrarname']}</a></td><td>{$price['new']} {$price['currencytype']}</td><td>{$price['renew']} {$price['currencytype']}</td><td>{$price['transfer']} {$price['currencytype']}</td></tr>";
        $rowCount++;
    }

    $html .= "</tbody></table>";

    // Add "Show More" option for remaining rows if there are more than 2
    if (count($data['price']) > 2) {
        $html .= "<div id='remainingRows' style='display: none;'><table class='domain-table'><tbody>";
        for ($i = 2; $i < count($data['price']); $i++) {
            $price = $data['price'][$i];
            $html .= "<tr><td><a href='{$price['registrarweb']}'>{$price['registrarname']}</a></td><td>{$price['new']} {$price['currencytype']}</td><td>{$price['renew']} {$price['currencytype']}</td><td>{$price['transfer']} {$price['currencytype']}</td></tr>";
        }
        $html .= "</tbody></table></div>";
        $html .= "<button onclick='toggleRows()'>展开</button>";
        $html .= "<script>function toggleRows() { var remainingRows = document.getElementById('remainingRows'); if (remainingRows.style.display === 'none') { remainingRows.style.display = 'block'; this.innerHTML = '收起'; } else { remainingRows.style.display = 'none'; this.innerHTML = '展开'; } }</script>";
    }

    return $html;
}
