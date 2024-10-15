import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const yargBase: number = yarg.b;
const yargLimit: number = yarg.l;
const yargShow: boolean = yarg.s;

const outputsPath = 'outputs';

fs.mkdirSync(outputsPath, { recursive: true });

for (let base = 1; base <= yargBase; base++) {
    let outputMessage = '';
    const headerMessage = `
=====================
    Tabla del ${base}
=====================
`;

    outputMessage += headerMessage + '\n';

    for (let limit = 1; limit <= yargLimit; limit++) {
        const result = base * limit;
        outputMessage += `${base} x ${limit} = ${result}\n`;
    }

    fs.writeFileSync(`${outputsPath}/tabla-${base}.txt`, outputMessage);

    if (yargShow) console.log(outputMessage);
}
