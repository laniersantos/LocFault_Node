class MinimalCorrectionSubset {
    private variables: boolean[];
    private constraints: Array<(v: boolean[]) => boolean>;
    private numVariables: number;
  
    constructor(numVariables: number, constraints: Array<(v: boolean[]) => boolean>) {
      this.numVariables = numVariables;
      this.variables = new Array(numVariables).fill(false);
      this.constraints = constraints;
    }
  
    private isSatisfied(): boolean {
      for (let i = 0; i < this.constraints.length; i++) {
        if (!this.constraints[i](this.variables)) {
          return false;
        }
      }
      return true;
    }
  
    private findMinimalCorrectionSubset(): number[] {
      let unsatisfiedConstraints = this.constraints.map((c, i) => ({c, i}))
        .filter(({c}) => !c(this.variables));
      let correctionSubset = new Array<number>();
  
      for (let i = 0; i < unsatisfiedConstraints.length; i++) {
        let tmpVariables = this.variables.slice();
        let constraint = unsatisfiedConstraints[i];
  
        for (let j = 0; j < this.numVariables; j++) {
          tmpVariables[j] = !tmpVariables[j];
          if (constraint.c(tmpVariables)) {
            correctionSubset.push(j);
            break;
          }
          tmpVariables[j] = !tmpVariables[j];
        }
      }
  
      return correctionSubset;
    }
  
    public solve(): boolean {
      while (!this.isSatisfied()) {
        let correctionSubset = this.findMinimalCorrectionSubset();
  
        if (correctionSubset.length === 0) {
          return false;
        }
  
        let randomIndex = Math.floor(Math.random() * correctionSubset.length);
        let randomVariable = correctionSubset[randomIndex];
        this.variables[randomVariable] = !this.variables[randomVariable];
      }
      return true;
    }
  }
  