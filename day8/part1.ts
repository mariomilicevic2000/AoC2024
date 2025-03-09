import * as fs from 'fs'

interface Location {
    x : number;
    y : number;
}

function main(){
    console.time();
    const input : string = fs.readFileSync('src/day8/input.txt', 'utf8');
    const rows : string[] = input.split('\n').map(row => row.trim());
    let antennas = new Map<string, Location[]>();

    for(let i = 0; i < rows.length; i++){
        for(let j = 0; j < rows[0].length; j++){
            if(rows[i][j] !== '.'){
                const newLocation : Location = {
                    x : i,
                    y : j
                };

                if(antennas.has(rows[i][j])){
                    antennas.get(rows[i][j])!.push(newLocation);
                } else {
                    antennas.set(rows[i][j], [newLocation]);
                }
            }
        }
    }

    let antinodes = new Set<string>();

    for(const antenna of antennas){
        for(const instanceAntenna of antenna[1]){
            const copy = antenna[1];
            const toCorrelate = copy.slice(copy.indexOf(instanceAntenna) + 1);

            for(const correlatedInstance of toCorrelate){
                const stepsX1 = correlatedInstance.x - instanceAntenna.x;
                const stepsY1 = correlatedInstance.y - instanceAntenna.y;
                const stepsX2 = instanceAntenna.x - correlatedInstance.x;
                const stepsY2 = instanceAntenna.y - correlatedInstance.y;

                const newAntinode1 : Location = {
                    x : (correlatedInstance.x + stepsX1),
                    y : (correlatedInstance.y + stepsY1)
                }

                const newAntinode2 : Location = {
                    x : (instanceAntenna.x + stepsX2),
                    y : (instanceAntenna.y + stepsY2)
                }

                if(newAntinode1.x >= 0 && newAntinode1.x < rows.length && newAntinode1.y >= 0 && newAntinode1.y < rows[0].length){
                    antinodes.add(`${newAntinode1.x},${newAntinode1.y}`);
                }
                if(newAntinode2.x >= 0 && newAntinode2.x < rows.length && newAntinode2.y >= 0 && newAntinode2.y < rows[0].length){
                    antinodes.add(`${newAntinode2.x},${newAntinode2.y}`);
                }
            }
        }
    }

    console.log(antinodes.size);
    console.timeEnd();

}

main();