import { Worker } from "./worker";

(function main() {
    const worker = new Worker();
    try {
        console.info('App started');
        worker.run();
    } catch (e) {
        console.error(`Execution Error: ${e.message}`);
    }
})()