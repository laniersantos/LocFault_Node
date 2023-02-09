// import { solve } from 'sat-solver';
import { init } from 'z3-solver';
import tritypeCfg from "./Tritype.json";

const { solve } = require('sat-solver')

export class Worker {

    private cfg: any;

    loadCfg = () => {
        this.cfg = tritypeCfg;

        console.log(`Tritype Nodes:
            ${JSON.stringify(this.cfg.functions[0].nodes, null, 2)}`);

        console.log(`Tritype Nodes:
            ${JSON.stringify(this.cfg.functions[0].edges, null, 2)}`);
    }

    generateMCS = (constraints: { tab: number[], min: number[], i: number }, bmcMaxNum: number = 2) => {
        const constraintsIndex = this.addYVars(constraints);
        const msc = [];
        let k = 1;

        solve(constraintsIndex);
    } 

    private z3Solver = async (constraints: number[]) => {
        const z3 = await init();
        const { Solver, Int, And } = z3.Context('main');
        const solver = new Solver();
        const expression = Int.consts(constraints.map(c => c.toString()));

        // TODO - Add High Level expression validation

        return await solver.check();
    }

    private addYVars = (constraints: { tab: number[], min: number[], i: number }) => {
        const y: {[constraint: string]: boolean} = {};
        
        if (constraints.tab.length) {
            constraints.tab.forEach((e, index) => {
                y[`tab[${index}]} = ${e}`] = true;
            });
        }
        if (constraints.min.length) {
            constraints.min.forEach((e, index) => {
                y[`min[${index}]} = ${e}`] = true;
            });
        }
        if (constraints.i !== undefined) {
            y[`i = ${constraints.i}`] = true;
        }
        return y;
    }

    run() {
        this.loadCfg();

        const constraints: { tab: number[], min: number[], i: number } = {} as any;
        constraints.tab[0] = 3;
        constraints.tab[1] = 2;
        constraints.tab[2] = 1;
        constraints.tab[3] = 0;
        constraints.min[0] = constraints.tab[0];
        constraints.i = 1;
        constraints.min[1] = constraints.tab[constraints.i];

        this.generateMCS(constraints, 1);
    }
}
