import { map } from './mainmap.js';
let a = 1;
let time;
async function putrainmap() {
    time = await fetch(`https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N2.json?${Date.now()}`);
    time = await time.json();
    map.addSource('rainmap', {
        type: 'raster',
        tiles: [
            `https://www.jma.go.jp/bosai/jmatile/data/nowc/${time[11]["basetime"]}/none/${time[11]["validtime"]}/surf/hrpns/{z}/{x}/{y}.png`,
        ],
        minzoom: 1,
        maxzoom: 10,
        tileSize: 256,
        attribution: "<a href='https://www.jma.go.jp/bosai/nowc/' target='_blank'>雨雲の動き</a>"
    });
    const fulldate = time[11]["validtime"];
    const hour = (Number(fulldate.substr(8, 2)) + 9) % 24;
    const min = fulldate.substr(10, 2);
    document.getElementById('date_rain').innerHTML = "<span style='font-size: 1.5vw;'>雨雲の動き</span><br>" + hour + ":" + min;
}
map.on('load', putrainmap);
document.getElementById('rainmap').addEventListener('click', function () {
    if (a == 1) {
        map.addLayer({
            id: 'rainmap',
            source: 'rainmap',
            type: 'raster',
            paint: {
                'raster-opacity': 0.7
            },
        });
        document.getElementById('rainrader').style.display = "block";
    } else {
        map.removeLayer('rainmap');
        document.getElementById('rainrader').style.display = "none";
    }
    a *= -1;
});
document.getElementById('validtime_rain').addEventListener('change', (e) => {
    map.getSource('rainmap').setTiles([
        `https://www.jma.go.jp/bosai/jmatile/data/nowc/${time[11 - e.target.value]["basetime"]}/none/${time[11 - e.target.value]["validtime"]}/surf/hrpns/{z}/{x}/{y}.png`
    ]);
    const fulldate = time[11 - e.target.value]["validtime"];
    const hour = (Number(fulldate.substr(8, 2)) + 9) % 24;
    const min = fulldate.substr(10, 2);
    document.getElementById('date_rain').innerHTML = "<span style='font-size: 1.5vw;'>雨雲の動き</span><br>" + hour + ":" + min;
});