export class CoinsGroup {
	constructor(group) {
		this.group = group;

		this.group.children.iterate((coin) => {
			coin
				.setCircle(40)
				.setCollideWorldBounds(true)
				.setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
				.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
		});
	}
}
