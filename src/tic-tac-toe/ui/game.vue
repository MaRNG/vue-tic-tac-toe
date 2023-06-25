<template>
  <div class="game">
      <GameBoard :game-config="gameConfig" />
  </div>
</template>

<script>
import {GameConfig} from "../model/game/game-config";
import GameBoard from "./game-board.vue";

export default {
    name: "game",
    components: {GameBoard},
    data: () => {
        return {
            gameConfig: new GameConfig(10, 5)
        }
    }
}
</script>

<style scoped lang="scss" src="./../scss/game.scss">

</style>