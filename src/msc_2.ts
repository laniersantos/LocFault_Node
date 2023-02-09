class MinimalCorrectionSubset_2 {
    private constraints: boolean[][];
    private variables: boolean[];
  
    constructor(constraints: boolean[][], variables: boolean[]) {
      this.constraints = constraints;
      this.variables = variables;
    }
  
    public solve(): boolean {
      while (true) {
        if (this.checkConstraints()) {
          return true;
        }
  
        const unsatisfied = this.findUnsatisfied();
        if (unsatisfied.length === 0) {
          return false;
        }
  
        const minimal = this.findMinimal(unsatisfied);
        this.flipVariables(minimal);
      }
    }
  
    private checkConstraints = (): boolean => {
      for (let i = 0; i < this.constraints.length; i++) {
        let constraint = this.constraints[i];
        let satisfied = false;
  
        for (let j = 0; j < constraint.length; j++) {
          let variable = this.variables[j];
          if (constraint[j] === variable) {
            satisfied = true;
            break;
          }
        }
  
        if (!satisfied) {
          return false;
        }
      }
  
      return true;
    }
  
    private findUnsatisfied = (): number[] => {
      let unsatisfied = [];
  
      for (let i = 0; i < this.constraints.length; i++) {
        let constraint = this.constraints[i];
        let satisfied = false;
  
        for (let j = 0; j < constraint.length; j++) {
          let variable = this.variables[j];
          if (constraint[j] === variable) {
            satisfied = true;
            break;
          }
        }
  
        if (!satisfied) {
          unsatisfied.push(i);
        }
      }
  
      return unsatisfied;
    }
  
    private findMinimal = (unsatisfied: number[]): number[] => {
      let minimal = [] as any[];
      let minCount = Number.MAX_SAFE_INTEGER;
  
      for (let i = 0; i < unsatisfied.length; i++) {
        let count = 0;
        let constraint = this.constraints[unsatisfied[i]];
  
        for (let j = 0; j < constraint.length; j++) {
          if (constraint[j] !== this.variables[j]) {
            count++;
          }
        }
  
        if (count < minCount) {
          minimal = [unsatisfied[i]];
          minCount = count;
        } else if (count === minCount) {
          minimal.push(unsatisfied[i]);
        }
      }
  
      return minimal;
    }
  
    private flipVariables = (minimal: number[]) => {
        throw new Error(`Not Implemented`);
    }
}
