<template>
  <div class="game-wrapper">
      <div class="game-setup" v-if="game === null">
          <div class="game-setup__error-list" v-if="errors.length > 0">
              <span class="item" v-for="(error, errorKey) in errors" :key="errorKey">
                  {{ error }}
              </span>
          </div>

          <form class="game-setup__form">
              <label class="label">
                  Gameboard size:
                  <input type="number" v-model="gameSetupSize">
              </label>

              <label class="label">
                  Player needs # cells in a row to win:
                  <input type="number" v-model="gameSetupCellsRowCountToWin">
              </label>

              <a role="button" class="button button--game-setup-submit" @click="startGame">
                  Start game
              </a>
          </form>
      </div>

      <div class="game" v-if="game !== null">
          <div class="game__info">
              <table class="table">
                  <tr>
                      <td>Player round:</td>
                      <td>
                          <span class="player-symbol" :class="getPlayerInfoClasses(game.getPlayerRound())"></span>
                      </td>
                  </tr>
                  <tr>
                      <td>Winner:</td>
                      <td v-if="game.getWinner() === null">
                          no one
                      </td>
                      <td v-if="game.getWinner() !== null">
                          <span class="player-symbol" :class="getPlayerInfoClasses(game.getWinner())"></span>
                      </td>
                  </tr>
              </table>

          </div>

          <GameBoard :game="game" />

          <a role="button" @click="startAgain" class="button button--start-again">Start again!</a>
      </div>
  </div>
</template>

<script lang="ts">
import {GameConfig} from "../model/game/game-config";
import GameBoard from "./game-board.vue";
import {Game} from "../model/game/game";
import {PlayerEnum} from "../model/player/player-enum";
import {GameboardValidation} from "../model/util/gameboard-validation";

export default {
    name: "game",
    components: {GameBoard},
    data: () => {
        return {
            gameConfig: null as GameConfig|null,
            game: null as Game|null,
            gameSetupSize: 25 as number,
            gameSetupCellsRowCountToWin: 5 as number,
            errors: [] as Array<string>
        }
    },
    methods: {
        startGame(): void {
            if (this.checkSetup()) {
                this.gameConfig = new GameConfig(this.gameSetupSize, this.gameSetupCellsRowCountToWin);
                this.game = new Game(this.gameConfig);
            }
        },
        startAgain(): void {
            this.game = null;
            this.gameConfig = null;
        },
        getPlayerInfoClasses(player: PlayerEnum): Array<string> {
            const classes: Array<string> = [];

            if (player === PlayerEnum.ONE) {
                classes.push('player-one');
            } else {
                classes.push('player-two');
            }

            return classes;
        },
        checkSetup(): boolean {
            const errors: Array<string> = [];

            if (this.gameSetupSize === null || this.gameSetupSize <= 0 || this.gameSetupSize > 25) {
                errors.push('Gameboard size must be greater than 0 and lower than 25!');
            }

            if (this.gameSetupCellsRowCountToWin === null || this.gameSetupCellsRowCountToWin <= 0 || (this.gameSetupSize > 0 &&this.gameSetupCellsRowCountToWin > GameboardValidation.getMaxPlayerCellsToWin(this.gameSetupSize))) {
                const maxPlayerCellsToWin =  GameboardValidation.getMaxPlayerCellsToWin(this.gameSetupSize);

                errors.push(`Required cells in a row must be greater than 0 and lower than ${maxPlayerCellsToWin}`);
            }

            this.errors = errors;

            return errors.length === 0;
        }
    }
}
</script>

<style scoped lang="scss" src="./../scss/game.scss">

</style>