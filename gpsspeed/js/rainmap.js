import { map } from './mainmap.js';
let a = 1;
async function putrainmap() {
    let time = await fetch(`https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N1.json?${Date.now()}`);
    time = await time.json();
    map.addSource('rainmap', {
        type: 'raster',
        tiles: [
            `https://www.jma.go.jp/bosai/jmatile/data/nowc/${time[0]["basetime"]}/none/${time[0]["validtime"]}/surf/hrpns/{z}/{x}/{y}.png`,
        ],
        minzoom: 1,
        maxzoom: 10,
        tileSize: 256,
        attribution: "<a href='https://www.jma.go.jp/bosai/nowc/' target='_blank'>雨雲の動き</a>"
    });
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
    } else {
        map.removeLayer('rainmap');
    }
    a *= -1;
})