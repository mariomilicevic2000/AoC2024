import * as fs from 'fs';

interface Robot {
    position : {x : number, y : number};
    velocity : {x : number, y : number};
}

function parseInput(input : string) : Robot[] {
    let robots : Robot[] = [];
    const lines = input.split("\n");

    for(const line of lines){
        const match = line.match(/-?\d+/g);
        if (match) {
            const [px, py, vx, vy] = match.map(Number);
            robots.push({ position: { x: px, y: py }, velocity: { x: vx, y: vy } });
        }
    }

    return robots;
}

function main(){
    console.time();
    const input = fs.readFileSync('src/day14/input.txt', 'utf-8');
    const robots = parseInput(input);

    const width = 101;
    const height = 103;

    for(let i = 0; i < 100; i++){
        for(let robot of robots){
            robot.position.x = (robot.position.x + robot.velocity.x) % width;
            robot.position.y = (robot.position.y + robot.velocity.y) % height;

            if(robot.position.x < 0) robot.position.x += width;
            if(robot.position.y < 0) robot.position.y += height;
        }
    }

    let [ul, ur, dl, dr] = [0,0,0,0];
    const halfHeight = height/2;
    const halfWidth = width/2;

    for(let robot of robots){
        if(robot.position.x === Math.trunc(halfWidth) || robot.position.y === Math.trunc(halfHeight)) {
            continue;
        }

        if(robot.position.x < halfWidth){
            if(robot.position.y < halfHeight){
                ul++;
            } else if(robot.position.y > halfHeight){
                ur++;
            }
        } else if(robot.position.x > halfWidth){
            if(robot.position.y < halfHeight){
                dl++;
            } else if(robot.position.y > halfHeight){
                dr++;
            }
        }
    }

    let safetyScore = ul * ur * dl * dr;
    console.log(safetyScore);
    console.timeEnd();
    
}

main();