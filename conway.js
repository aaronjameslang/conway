var whichGrid = true;
var gridA = new Array(100);
var gridB = new Array(100);
for (i = 0; i < 100; i++) {
	gridA[i] = new Array(100);
	gridB[i] = new Array(100);
	for (j = 0; j < 100; j++) {
		gridA[i][j] = Math.random()<0.5;
		gridB[i][j] = Math.random()<0.5;
	}
}

var canvas = document.getElementById("myCanvas");
canvas.onclick = toggleCell;
var g = canvas.getContext("2d");

//<main>
setInterval(run, 250);
//</main>

function run() {
	updateGrid();
	drawGrid();
}

function getCurrentGrid() {
	return (whichGrid)?gridA:gridB;
}
function getOldGrid() {
	return (!whichGrid)?gridA:gridB;
}
			
function updateGrid() {
	whichGrid=!whichGrid;
	var oldGrid = getOldGrid();
	var currentGrid = getCurrentGrid();
				
	for (x = 0; x < 100; x++) {
		for (y = 0; y < 100; y++) {
			var liveNeighbours = 0;
			if (oldGrid[(x+99)%100][(y+99)%100]) liveNeighbours++;if (oldGrid[ x        ][(y+99)%100]) liveNeighbours++;if (oldGrid[(x+1)%100][(y+99)%100]) liveNeighbours++;
			if (oldGrid[(x+99)%100][ y        ]) liveNeighbours++;if (oldGrid[(x+1)%100][ y        ]) liveNeighbours++;
			if (oldGrid[(x+99)%100][(y+1 )%100]) liveNeighbours++;if (oldGrid[ x        ][(y+1 )%100]) liveNeighbours++;if (oldGrid[(x+1)%100][(y+1 )%100]) liveNeighbours++;
				
			switch (liveNeighbours) {
				case 0:
				case 1:
					currentGrid[x][y]=false;
					break;
				case 2:
					currentGrid[x][y] = oldGrid[x][y];
					break;
				case 3:
					currentGrid[x][y]=true;
					break;
				default:
					currentGrid[x][y]=false;
			}
		}
	}
}


function drawGrid() {
	var grid = getCurrentGrid();
	for (i = 0; i < 100; i++) {
		for (j = 0; j < 100; j++) {
			if (gridA[i][j]==gridB[i][j]) continue;
			if (grid[i][j]) g.fillRect(i*5, j*5, 5, 5);
			else g.clearRect(i*5, j*5, 5, 5);
		}
	}
}

function toggleCell(e) {
	var x;
	var y;
	if (e.pageX || e.pageY) {
//		alert("page");
		x = e.pageX;
		y = e.pageY;
	}
	else {
//		alert("client+")
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
//	alert(x+", "+y);
	
	x = Math.floor(x/5);
	y = Math.floor(y/5);
	var grid = getCurrentGrid();
	grid[x][y]=!grid[x][y];
	drawGrid();
}

