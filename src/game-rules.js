const gameOfLife = {
  width: 12,
  height: 12, // width and height dimensions of the board
  stepInterval: null, // should be used to hold reference to an interval that is "playing" the game

  createAndShowBoard: function () {
    // create <table> element
    let goltable = document.createElement("tbody");

    // build Table HTML
    let tablehtml = '';
    for (let h = 0; h < this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (let w = 0; w < this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // add table to the #board element
    let board = document.getElementById('board');
    board.appendChild(goltable);

    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {

    /* 
      forEachCell here to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. 
    */
    let self = this;
    Array.from(document.getElementsByTagName('td')).forEach(function (cell) {
      let coords = self.getCoordsOfCell(cell);
      iteratorFunc(cell, coords[0], coords[1]);
    })

  },

  // Utility functions
  getCoordsOfCell: function (cell) {
    let cellId = cell.id;  // '0-0'
    let idSplit = cellId.split('-'); // ['0', '0']

    return idSplit.map(function (str) {
      return parseInt(str, 10);
    })

  },
  getCellStatus: function (cell) {
    return cell.getAttribute('data-status');
  },
  setCellStatus: function (cell, status) {
    cell.className = status;
    cell.setAttribute('data-status', status)
  },
  toggleCellStatus: function (cell) {
    if (this.getCellStatus(cell) == 'dead') {
      this.setCellStatus(cell, "alive");
    } else {
      this.setCellStatus(cell, "dead");
    }
  },
  getNeighbors: function (cell) {
    let neighbors = [];
    let thisCellCoords = this.getCoordsOfCell(cell);
    let cellX = thisCellCoords[0];
    let cellY = thisCellCoords[1];

    // Directly to left and right
    neighbors.push(this.selectCell(cellX - 1, cellY));
    neighbors.push(this.selectCell(cellX + 1, cellY));

    // Row Above
    neighbors.push(this.selectCell(cellX, cellY - 1));
    neighbors.push(this.selectCell(cellX + 1, cellY - 1));
    neighbors.push(this.selectCell(cellX - 1, cellY - 1));

    // Row Below
    neighbors.push(this.selectCell(cellX, cellY + 1));
    neighbors.push(this.selectCell(cellX + 1, cellY + 1));
    neighbors.push(this.selectCell(cellX - 1, cellY + 1));

    return neighbors.filter(function (neighbor) {
      return neighbor !== null;
    })

  },
  getAliveNeighbors: function (cell) {
    let allNeighbors = this.getNeighbors(cell);
    let gameOfLifeObj = this;
    return allNeighbors.filter(function (neighbor) {
      return gameOfLifeObj.getCellStatus(neighbor) === "alive";
    })
  },
  selectCell: function (x, y) {
    return document.getElementById(`${x}-${y}`);
  },

  // Game   
  setupBoardEvents: function () {
    // each board cell has an CSS id in the format of: "x-y" 
    // a user can to click on 
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"
    // clicking on a cell toggles the cell between "alive" & "dead"

    let gameOfLifeObj = this;

    let onCellClick = function (e) {
      gameOfLifeObj.toggleCellStatus(this);
    };

    this.forEachCell(function (cell) {
      cell.onclick = onCellClick;
    });

    // Buttons

    document.getElementById("step_btn").addEventListener('click', function (e) {
      gameOfLifeObj.step();
    });
    document.getElementById("clear_btn").addEventListener('click', function (e) {
      gameOfLifeObj.clearBoard();
    });
    document.getElementById("reset_btn").addEventListener('click', function (e) {
      gameOfLifeObj.resetRandom();
    });
    document.getElementById("play_btn").addEventListener('click', function (e) {
      gameOfLifeObj.enableAutoPlay();
    });

  },

  step: function () {
    // Here is the loop through all the cells
    // on the board to determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game. 

    let gameOfLifeObj = this;
    let cellsToToggle = [];
    this.forEachCell(function (cell, x, y) {
      let countLiveNeighbors = gameOfLifeObj.getAliveNeighbors(cell).length;

      if (gameOfLifeObj.getCellStatus(cell) === "alive") {
        if (countLiveNeighbors !== 2 && countLiveNeighbors !== 3) {
          cellsToToggle.push(cell);
        }
      } else {
        if (countLiveNeighbors === 3) {
          cellsToToggle.push(cell);
        }
      }
    })

    cellsToToggle.forEach(function (cellToToggle) {
      gameOfLifeObj.toggleCellStatus(cellToToggle);
    })

  },
  clearBoard: function () {
    this.stopAutoPlay();
    this.forEachCell(function (cell) {
      this.setCellStatus(cell, "dead");
    }.bind(this));
  },
  resetRandom: function () {
    this.forEachCell(function (cell) {
      if (Math.random() > .5) {
        this.setCellStatus(cell, 'alive');
      } else {
        this.setCellStatus(cell, 'dead');
      }
    }.bind(this))
  },
  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
    if (this.stepInterval) {
      return this.stopAutoPlay();
    }
    this.stepInterval = setInterval(this.step.bind(this), 500);
  },
  stopAutoPlay: function () {
    clearInterval(this.stepInterval);
    this.stepInterval = null;
  }

};

export default gameOfLife;