export default class Keyboard {
  constructor(layout) {
    this.layout = layout;
  }

  getPosition(character) {

    for(let rowIndex=0, rowLen=this.layout.normal.length; rowIndex < rowLen; rowIndex++) {
      let row = this.layout.normal[rowIndex];

      for(let colIndex=0, colLen=row.length; colIndex < colLen; colIndex++) {
        let col = row[colIndex];

        if(col === character) {
          return {top: rowIndex, left: colIndex + this.layout.offsets[rowIndex]};
        }

      }
    }

    return null;
  }
}
