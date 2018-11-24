// main function
function gameSystem() {

	this.board = new Array();

	for (var i = 0; i < 3; i++) {
		this.board[i] = new Array();
		for (var j = 0; j < 3; j++) {
			this.board[i][j] = '-';
		}
	}

};

//Get Canvas Board
gameSystem.prototype.get_board = function() {
	return this.board;
};

// Get Player Move
gameSystem.prototype.make_player_move = function(i,j) {
	if (!(0 <= i && i <= 2 && 0 <= j && j <= 2) ||
		this.board[i][j] != '-') {
		return false;
	}

	this.board[i][j] = 'x';
	return true;
};

//Ai Mover
gameSystem.prototype.make_ai_move = function() {
	var best_move = alpha_beta(this);
	this.board[best_move[0]][best_move[1]] = 'o';
};

//Ai Mover
gameSystem.prototype.make_ai_first_move = function() {
	var x = getRandomInt(0,3);
	var y = getRandomInt(0,3);
	this.board[x][y] = 'o';
};

//get move
gameSystem.prototype.get_moves = function(player) {

	var moves = new Array();

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if(this.board[i][j] == '-') {
				moves.push([i,j]);
			}
		}
	}

	return moves;

};

//check is terminal
gameSystem.prototype.is_terminal = function() {
	var no_spaces = true;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if(this.board[i][j] == '-') {
				no_spaces = false;
			}
		}
	}

	return no_spaces || this.get_score() != 0;
};

// get score
gameSystem.prototype.get_score = function() {
	var lines = new Array(), board = this.board;
	lines.push(board[0]);
	lines.push(board[1]);
	lines.push(board[2]);
	lines.push([board[0][0],board[1][0],board[2][0]]);
	lines.push([board[0][1],board[1][1],board[2][1]]);
	lines.push([board[0][2],board[1][2],board[2][2]]);
	lines.push([board[0][0],board[1][1],board[2][2]]);
	lines.push([board[2][0],board[1][1],board[0][2]]);

	for (var i = 0; i < lines.length; i++) {
		if (lines[i][0] == lines[i][1] &&
			lines[i][1] == lines[i][2] &&
			lines[i][0] == 'x') {
			return 1;
		}
		if (lines[i][0] == lines[i][1] &&
			lines[i][1] == lines[i][2] &&
			lines[i][0] == 'o') {
			return -1;
		}
	}

	return 0;
};

// get next turn
gameSystem.prototype.get_next = function(move,player) {
	if (player == "max") {
		player = 'x';
	} else {
		player = 'o';
	}

	var next_state = new gameSystem();
	next_state.board = copy_board(this.board);
	next_state.board[move[0]][move[1]] = player;

	return next_state;
};

function alpha_beta(state) {

	return min_value(state,-100000,100000,true);

};

//Get Random integer for random board for AI
function getRandomInt(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Max Value Checker
function max_value(state,alpha,beta,is_first) {

	var is_first = is_first || false;

	if (state.is_terminal()) {
		return state.get_score();
	}

	//for implementation minmax method
	var v = -100000, moves = state.get_moves("max"), min, best_move = moves[0];

	for (var i = 0; i < moves.length; i++) {
		min = min_value(state.get_next(moves[i],"max"),alpha,beta,false);
		if (min > v) v = min, best_move = moves[i];
		if (v >= beta) {
			if (is_first) return moves[i];
			return v;
		}
		if (v > alpha) alpha = v;
	}

	if (is_first) {
		return best_move;
	} else {
		return v;
	}

};

// Min Value Checker
function min_value(state,alpha,beta,is_first) {

	var is_first = is_first || false;

	if (state.is_terminal()) {
		return state.get_score();
	}

	//for implementation minmax method
	var v = 100000, moves = state.get_moves("min"), max, best_move = moves[0];

	for (var i = 0; i < moves.length; i++) {
		max = max_value(state.get_next(moves[i],"min"),alpha,beta,false);
		if (max < v) v = max, best_move = moves[i];
		if (v <= alpha) {
			if (is_first) return moves[i];
			return v;
		}
		if (v < beta) beta = v;
	}

	if (is_first) {
		return best_move;
	} else {
		return v;
	}

};

//Copy Board
function copy_board(board) {
	var new_board = Array();
	for (var i = 0; i < board.length; i++) {
		new_board[i] = board[i].slice(0);
	}
	return new_board;
};