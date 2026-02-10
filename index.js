function getJmaEqinfo() {
    fetch('https://www.jma.go.jp/bosai/quake/data/list.json').then(r=>r.json()).then(r=>{
        document.getElementById('eqinfotable').innerHTML = "";
        let num = -1;
        for (let i=0; i<50; i++) {
            num++;
            const content = r[num];
            if (content.ttl !== "震源・震度情報") {
                i--;
                continue;
            }
            const maxint = content.maxi.replace('-', '弱').replace('+', '強');
            const hypo = content.anm;
            const time = content.at.substr(8, 8).replace('T', '日').replace(':', '時') + "分　";
            document.getElementById('eqinfotable').innerHTML += `${time}最大震度${maxint} ${hypo}<br>`;
        }
    })
}
function getWeatherdata() {
    fetch('https://weather.tsukumijima.net/api/forecast/city/340010').then(r=>r.json()).then(r=>{
        const forecasts = r.forecasts;
        document.getElementById('weather').innerHTML = "";
        const datetr = document.createElement('tr');
        const teloptr = document.createElement('tr');
        const temptr = document.createElement('tr');
        for (let i=0; i<3; i++) {
            const date = forecasts[i].date.substr(5, 5).replace('-', '/');
            const telop = forecasts[i].telop;
            let temp_min = forecasts[i].temperature.min.celsius;
            let temp_max = forecasts[i].temperature.max.celsius;
            temp_min = (temp_min == null) ? "-" : temp_min;
            temp_max = (temp_max == null) ? "-" : temp_max;
            const dateth = document.createElement('th');
            const datetxt = document.createElement('span');
            const teloptd = document.createElement('td');
            const teloptxt = document.createElement('span');
            const temptd = document.createElement('td');
            const temptxt = document.createElement('span');
            datetxt.innerHTML = date;
            teloptxt.innerHTML = telop;
            temptxt.innerHTML = "<span style='color: blue;'>" + temp_min + "</span>/<span style='color: red;'>" + temp_max + "</span>"; 
            dateth.appendChild(datetxt);
            teloptd.appendChild(teloptxt);
            temptd.appendChild(temptxt);
            datetr.appendChild(dateth);
            teloptr.appendChild(teloptd);
            temptr.appendChild(temptd);
        }
        document.getElementById('weather').appendChild(datetr);
        document.getElementById('weather').appendChild(teloptr);
        document.getElementById('weather').appendChild(temptr);
    })
}
getJmaEqinfo();
getWeatherdata();
