//@ts-check

export class EnemiesGroup {
	constructor(group, spawnLocations) {
		this.group = group;
		this.spawnLocations = spawnLocations;
	}

	spawn() {
		let spawn =
			this.spawnLocations[
				Phaser.Math.Between(0, this.spawnLocations.length - 1)
			];
		let enemy = this.group.create(spawn.x, spawn.y, "enemy");
		enemy
			.setCollideWorldBounds(true)
			.setBounce(1)
			.setVelocity(Phaser.Math.FloatBetween(-200, 200), 20)
			.setCircle(60, 12, 14)
			.setScale(0.25);
	}
}
