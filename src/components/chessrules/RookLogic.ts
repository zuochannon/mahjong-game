import { ColorTeam } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";
import { isSquareOccupied, isSquareOccupiedByOppositeColor } from "./GeneralLogic";

// Moves the rook piece
export const rookMove = (initialPosition: Position, newPosition: Position, color: ColorTeam, boardState: ChessPiece[]) : boolean => {
    
    // Case: Moves along a column (top and bottom)
    if (newPosition.y === initialPosition.y) {
        for (let i = 1; i < 8; i++) {
            const direction = (newPosition.x > initialPosition.x) ? 1 : -1; 
            let passedPosition = new Position(initialPosition.x + (i * direction), initialPosition.y);

            // Checks if a piece is in its path
            // Case 1: Checks if destination is empty or occupied by opponent
            // Case 2: Checks if a piece is blocking its path
            if (passedPosition.equalsTo(newPosition)) {
                if (!isSquareOccupied(passedPosition, boardState) || isSquareOccupiedByOppositeColor(passedPosition, boardState, color)) {
                    return true;
                }
            } else {
                if (isSquareOccupied(passedPosition, boardState)) {
                    break;
                }
            } 
        }
    }

    // Case: Moves along a row (left and right)
    if (newPosition.x === initialPosition.x) {
        for (let i = 1; i < 8; i++) {
            const direction = (newPosition.y > initialPosition.y) ? 1 : -1; 
            let passedPosition = new Position(initialPosition.x, initialPosition.y + (i * direction));

            // Checks if a piece is in its path
            // Case 1: Checks if destination is empty or occupied by opponent
            // Case 2: Checks if a piece is blocking its path
            if (passedPosition.equalsTo(newPosition)) {
                if (!isSquareOccupied(passedPosition, boardState) || isSquareOccupiedByOppositeColor(passedPosition, boardState, color)) {
                    return true;
                }
            } else {
                if (isSquareOccupied(passedPosition, boardState)) {
                    break;
                }
            } 
        }
    }

    return false;
}

// Export all possible rook moves
export const getPossibleRookMoves = (rook: ChessPiece, board: ChessPiece[], includeIllegal: boolean): Position[] => {
    // Stores all possible pawn moves
    const possibleMoves: Position[] = [];

    const directions = [
        { dx: 0, dy: 1 },  // Top
        { dx: 0, dy: -1 }, // Bottom
        { dx: -1, dy: 0 }, // Left
        { dx: 1, dy: 0 },  // Right
    ];
      
    for (const { dx, dy } of directions) {
        for (let i = 1; i < 8; i++) {
            const newX = rook.position.x + dx * i;
            const newY = rook.position.y + dy * i;
          
            // Prevent off-the-board moves from being stored
            if (newX < 0 || newX > 7 || newY < 0 || newY > 7) break;
      
            const destination = new Position(newX, newY);

            if (includeIllegal) {
                possibleMoves.push(destination);
            }

            // Check if square is unoccupied for move to be possible
            if (!isSquareOccupied(destination, board)) {
                possibleMoves.push(destination);
            } 
            // Check if opponent occupies square to put as possible move
            else if (isSquareOccupiedByOppositeColor(destination, board, rook.color)) {
                possibleMoves.push(destination);
                break;
            } else {
                break;
            }
        }
    }
      

    return possibleMoves;
}