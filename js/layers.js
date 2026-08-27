addLayer("p", {
    name: "Particles",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(1),
    }},
    color: "#808080",
    requires: new Decimal(10),
    resource: "Particles",
    baseResource: "Atoms",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,

    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },

    doReset(resettingLayer) {
        if (resettingLayer == "ma") {
            let keep = []
            if (hasUpgrade('ma', 12)) keep.push("upgrades")
            if (hasMilestone('m', 5)) keep.push("challenges")
            layerDataReset(this.layer, keep)
        }
    },

    row: 0,

    passiveGeneration() {
        if (hasMilestone('m', 3)) {
            return 0.5
        }
    },

    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "The Beginning",
            description: "Start generating atoms",
            cost: new Decimal(1)
        },
        12: {
            title: "Particle Upgrade 1",
            description: "Doubles atom gain",
            cost: new Decimal(2),
        },
        13: {
            title: "Particle Upgrade 2",
            description: "Triples atom gain",
            cost: new Decimal(3),
        },
        14: {
            title: "Particle Upgrade 3",
            description: "Particles boost Atom gain",
            cost: new Decimal(10),
            effect() {
                let boost = 0
                if (hasUpgrade('p', 23)) boost = boost + 0.25
                if (hasMilestone('m', 3)) boost = boost + 0.07
                if (hasChallenge('p', 21)) boost = boost + 0.05
                return player[this.layer].points.add(1).pow(0.5 + boost)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        21: {
            title: "Particle Upgrade 4",
            description: "2.5x atom gain",
            cost: new Decimal(30),
        },
        22: {
            title: "Particle Upgrade 5",
            description: "Atoms boost Particle gain",
            cost: new Decimal(65),
            effect() {
                if (hasUpgrade('p', 43)) return player.points.add(1).pow(0.25)
                else return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        23: {
            title: "Particle Upgrade 6",
            description: "Increases the effect of PU3",
            cost: new Decimal(250),
        },
        24: {
            title: "Particle Upgrade 7",
            description: "5x Particle gain",
            cost: new Decimal(1000),
        },
        31: {
            title: "Particle Upgrade 8",
            description: "Here. Have a 1x multiplier. :Troll:",
            cost: new Decimal(12500),
        },
        32: {
            title: "Particle Upgrade 9",
            description: "Atoms boost itself",
            cost: new Decimal("1e6"),
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        33: {
            title: "Particle Upgrade 10",
            description: "Particles points boost itself",
            cost: new Decimal("1.5e7"),
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        41: {
            title: "Particle Upgrade 11",
            description: "Doubles atom gain... again.",
            cost: new Decimal(1e9),
        },
        42: {
            title: "Particle Upgrade 12",
            description: "Double Particle gain.",
            cost: new Decimal(1.5e11),
        },
        43: {
            title: "Particle Upgrade 13",
            description: "Increase the effects of PU5.",
            cost: new Decimal(2.5e12),
        },
        44: {
            title: "Finally... a new layer.",
            description: "Unlocks the next 2 layers: Matter and Energy.",
            cost: new Decimal(5e15),
        },
		51: {
            title: "Particle Upgrade 14.",
            description: "1.5x Atom gain.",
            cost: new Decimal(1e23),
            unlocked() {
                return hasMilestone('m', 4)
            }
        },
		52: {
            title: "Particle Upgrade 15.",
            description: "1.5x Particle gain.",
            cost: new Decimal(1e24),
            unlocked() {
                return hasMilestone('m', 4)
            }
        },
		53: {
            title: "Particle Upgrade 16.",
            description: "2x Milestone gain.",
            cost: new Decimal(1e26),
            unlocked() {
                return hasMilestone('m', 4)
            }
        },
    },

    challenges: {
        11: {
            name: "Particle Challenge 1",
            challengeDescription: "Atoms are square-rooted",
            canComplete: function() {return player.points.gte(5000)},
            goalDescription: "5,000 Points",
            rewardDescription: "10x particle points gain",
            unlocked() { return true }
        },
        12: {
            name: "Particle Challenge 2",
            challengeDescription: "Atom gain is cube-rooted",
            canComplete: function() {return player.points.gte(50000)},
            goalDescription: "50,000 Points",
            rewardDescription: "5x particle points gain",
            unlocked() { return true }
        },
        21: {
            name: "Particle Challenge 3",
            challengeDescription: "Atom gain is rooted to the 4th.",
            canComplete: function() {return player.points.gte(250000)},
            goalDescription: "250,000 Points",
            rewardDescription: "Another boost to PU3.",
            unlocked() { return true }
        },
        22: {
            name: "Particle Challenge 4",
            challengeDescription: "Atom gain is rooted to the 6th...",
            canComplete: function() {return player.points.gte(2500000)},
            goalDescription: "2,500,000 Atoms",
            rewardDescription: "2x to Milestones. ",
            unlocked() { return true }
        },
    },

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 22)) mult = mult.times(upgradeEffect('p', 22))
        if (hasUpgrade('p', 24)) mult = mult.times(5)
        if (hasChallenge('p', 11)) mult = mult.times(10)
        if (hasChallenge('p', 12)) mult = mult.times(5)
        if (hasUpgrade('p', 33)) mult = mult.times(upgradeEffect('p', 33))
        if (hasUpgrade('p', 42)) mult = mult.times(2)
        if (hasUpgrade('p', 52)) mult = mult.times(1.5)
        if (hasMilestone('m', 1)) mult = mult.times(2)
        if (hasUpgrade('ma', 11)) mult = mult.times(upgradeEffect('ma', 11))
        if (hasUpgrade('e', 13)) mult = mult.times(upgradeEffect('e', 13))
        if (hasUpgrade('e', 14)) mult = mult.times(1.25)
        return mult
    },
})

addLayer("m", {
    name: "Milestones",
    symbol: "M",
    position: 1,

    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},

    color: "#483D8B",
    requires: new Decimal(1e10),

    resource: "Milestones",
    baseResource: "Atoms",
    baseAmount() {return player.points},

    type: "normal",
    exponent: 0.1,

    gainMult() {
        mult = new Decimal(1)
		if (hasUpgrade('p', 53)) mult = mult.times(2)
		if (hasUpgrade('e', 14)) mult = mult.times(1.25)
		if (hasChallenge('p', 22)) mult = mult.times(2)
		
        return mult
    },

    gainExp() {
        return new Decimal(1)
    },

    row: 0,

	doReset(resettingLayer) {
    layerDataReset(this.layer, ["points"], ["milestones"])

},

milestones: {
    1: {
        requirementDescription: "1 Milestone",
        effectDescription: "Double Particle gain",
        done() {return player.m.points.gte(1)}
    },

    2: {
        requirementDescription: "50 Milestones",
        effectDescription: "Double Atom gain",
        done() {return player.m.points.gte(50)}
    },

    3: {
        requirementDescription: "250 Milestones",
        effectDescription: "Gain 50% of gainable Particle points a second.",
        done() {return player.m.points.gte(250)}
    },

    4: {
        requirementDescription: "500 Milestones",
        effectDescription: "PU3 is upgraded again.",
        done() {return player.m.points.gte(500)}
    },

    5: {
        requirementDescription: "1000 Milestones",
        effectDescription: "1.5x Matter gain (also some new upgrades).",
        done() {return player.m.points.gte(1000)}
    },

    6: {
        requirementDescription: "15,000 Milestones",
        effectDescription: "Particle challenges are now kept on resets!",
        done() {return player.m.points.gte(15000)}
    },

	7: {
        requirementDescription: "30,000 Milestones",
        effectDescription: "More Matter upgrades (WIP RN, no matter upgrades attached to it)!",
        done() {return player.m.points.gte(30000)}
    },
},


    layerShown(){return true},
})

addLayer("ma", {
    name: "Matter",
    symbol: "MA",
    position: 0,

    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},

    color: "#B87333",

    requires: new Decimal(1e15),
    resource: "Matter",
    baseResource: "Particles",
    baseAmount() {return player.p.points},

    type: "normal",
    exponent: 0.1,

    row: 1,

	upgrades: {
    11: {
        title: "Matter Matters!",
        description: "Matter multiplies Particle gain.",
        cost: new Decimal(2),
        effect() {
			if (hasUpgrade('e', 11)) return player.ma.points.add(1).pow(0.15)
			else
				return player.ma.points.add(1).pow(0.1)
        },
        effectDisplay() {
            return format(upgradeEffect(this.layer, this.id))+"x"
        }
    },
	12: {
		title: "Particle Preservation",
		description: "Particle upgrades are no longer lost.",
		cost: new Decimal(6),
	},
	13: {
		title: "Want some more?",
		description: "1.5x to Matter.",
		cost: new Decimal(15),
	},
},

    branches: ["p"],

	gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
		if (hasMilestone('m', 4)) mult = mult.times(1.5)
		if (hasUpgrade('ma', 13)) mult = mult.times(1.5)
			return mult
    },
    layerShown(){return hasUpgrade('p', 44)},
})

addLayer("e", {
    name: "Energy",
    symbol: "E",
    position: 1,

    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},

    color: "#f1c40f",

    requires: new Decimal(50),
    resource: "Energy",
    baseResource: "Matter",
    baseAmount() {return player.ma.points},

    type: "normal",
    exponent: 0.4,

    row: 1,

    onPrestige(gain) {
        layerDataReset('ma')
    },

    upgrades: {
        11: {
            title: "Energy Upgrade 1",
            description: "Small boost to the first matter upgrade.",
            cost: new Decimal(1)
        },

        12: {
    title: "Energy Upgrade 2",
    description: "Matter boosts Energy gain.",
    cost: new Decimal(5),
    effect() {
        return player.ma.points.add(1).pow(0.1)
    },
    effectDisplay() {
        return format(upgradeEffect(this.layer, this.id))+"x"
    }
},
        13: {
    title: "Energy Upgrade 3",
    description: "Energy boosts Particle gain.",
    cost: new Decimal(15),
    effect() {
        return player.e.points.add(1).pow(0.1)
    },
    effectDisplay() {
        return format(upgradeEffect(this.layer, this.id))+"x"
	}
},
		 14: {
    title: "Energy Upgrade 4",
    description: "1.25x multiplier for Atoms, Particles, and Milestones.",
    cost: new Decimal(15),
},
    },

    branches: ["ma"],

    layerShown(){return hasUpgrade('p', 44)},
})
