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
getJmaEqinfo();
