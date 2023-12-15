//@ts-check
import Phaser from "phaser";

export const TILE_SIZE = 18;
export const WIDTH = 88 * TILE_SIZE;
export const HEIGHT = 40 * TILE_SIZE;

export const events = new Phaser.Events.EventEmitter();

export const COIN_COLLECTED_EVENT = "coin-collected";

/** @type {HTMLDialogElement} */ //@ts-ignore
export const restartDialog = document.getElementById("restart-dialog");
/** @type {HTMLElement} */ //@ts-ignore
export const scoreSpan = document.getElementById("score-span");
/** @type {HTMLButtonElement} */ //@ts-ignore
export const restartButton = document.getElementById("restart-button");
