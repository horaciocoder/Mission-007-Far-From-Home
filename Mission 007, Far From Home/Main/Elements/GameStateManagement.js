class GameStateManagementTool {
    setState(state) {
        switch(state) {
            case SET:
                console.log("GameState: Set");
            break;
            case INTRO:
                console.log("GameState: Intro");
            break;
            case MENU:
                console.log("GameState: Menu");
            break;
            case PLAY:
                console.log("GameState: Play");
            break;
            case PAUSE:
                console.log("GameState: Pause");
            break;
            case OVER:
                console.log("GameState: Over");
            break;
            default:
                break;
        }
        return state;
    }
    compareState(gamestate, state) {
        if (gamestate === state) {
            return true;
        }
        else {
            return false;
        }
    }
}
const GameStateManager = new GameStateManagementTool();