addLayer("p", {
    name: "Particles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }}, // Sets prestige points at the start
    color: "#33944d",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Particles", // Name of prestige currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	doReset(resettingLayer) {
    if (hasUpgrade('ma', 12)) {
        layerDataReset(this.layer, ["upgrades"])
    }
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
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
            title: "Oh look! A doubler! Hopefully this doesn't get overused...",
            description: "Doubles atom gain",
            cost: new Decimal(1),
            unlocked() {
                return hasUpgrade('p', 11)
            }
        },
        13: {
            title: "Yay! Triple!",
            description: "Triples atom gain",
            cost: new Decimal(3),
            unlocked() {
                return hasUpgrade('p', 12)
            }
        },
        14: {
            title: "You'll need it.",
            description: "Particles boost Atom gain",
            cost: new Decimal(10),
            unlocked() {
                return hasUpgrade('p', 13)
            },
            effect() {
                let boost = 0
                if (hasUpgrade('p', 23)) boost = boost + 0.25
				if (hasMilestone('m', 3)) boost = boost + 0.15
        return player[this.layer].points.add(1).pow(0.5 + boost)
             },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        21: {
            title: "Close, but better than a 2x!",
            description: "2.5x atom gain",
            cost: new Decimal(30),
            unlocked() {
                return hasUpgrade('p', 14)
            }
        },
        22: {
    title: "You'll also need this.",
    description: "Atoms boost Particle gain",
    cost: new Decimal(65),
    unlocked() {
        return hasUpgrade('p', 21)
    },
    effect() {
        if (hasUpgrade('p', 43)) return player.points.add(1).pow(0.25)
        else return player.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
        23: {
            title: "Cool upgrade just got cooler.",
            description: "Increases the effect of PU3",
            cost: new Decimal(250),
            unlocked() {
                return hasUpgrade('p', 22)
            }
        },
        24: {
            title: "That's new.",
            description: "5x Particle gain",
            cost: new Decimal(1000),
            unlocked() {
                return hasUpgrade('p', 23)
            }
        },
        31: {
            title: ":>",
            description: "Here. Have a 1x multiplier. :Troll:",
            cost: new Decimal(12500),
            unlocked() {
                return hasUpgrade('p', 24)
            }
        },
        32: {
            title: "Idk what to call this one.",
            description: "Atoms boost itself",
            cost: new Decimal("1e6"),
            unlocked() {
                return hasUpgrade('p', 31)
            },
             effect() {
        return player.points.add(1).pow(0.1)
    },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            
            
        },
        33: {
            title: "Or this one...",
            description: "Particles points boost itself",
            cost: new Decimal("1.5e7"),
            unlocked() {
                return hasUpgrade('p', 32)
            },
             effect() {
        return player.points.add(1).pow(0.1)
    },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            
            
        },

		41: {
            title: "Not old yet I hope? This is only the second one.",
            description: "Doubles atom gain... again.",
            cost: new Decimal(1e9),
            unlocked() {
                return hasUpgrade('p', 33)
            }
        },

		42: {
            title: "We love particles!",
            description: "Double Particle gain.",
            cost: new Decimal(1.5e11),
            unlocked() {
                return hasUpgrade('p', 41)
            }
        },

		43: {
            title: "PU5 upgrade bc yes",
            description: "Increase the effects of PU5.",
            cost: new Decimal(1.5e11),
            unlocked() {
                return hasUpgrade('p', 42)
            }
        },

		44: {
            title: "Finally... a new layer.",
            description: "Unlocks the next layer: Matter.",
            cost: new Decimal(5e15),
            unlocked() {
                return hasUpgrade('p', 43)
            }
        },
    },

    challenges: {
    11: {
        name: "Particle Challenge 1",
        challengeDescription: "Atoms are square-rooted",
        canComplete: function() {return player.points.gte(3000)},
        goalDescription: "3,000 Points",
        rewardDescription: "10x particle points gain",
        unlocked() {
            return true
        }
    },
    12: {
        name: "Particle Challenge 2",
        challengeDescription: "Atom gain is cube-rooted",
        canComplete: function() {return player.points.gte(50000)},
        goalDescription: "50,000 Points",
        rewardDescription: "5x particle points gain",
        unlocked() {
            return true
        }
    },
	21: {
        name: "Particle Challenge 3",
        challengeDescription: "Atom gain is rooted to the 4th.",
        canComplete: function() {return player.points.gte(250000)},
        goalDescription: "250,000 Points",
        rewardDescription: "2.5x particle points gain",
        unlocked() {
            return true
        }
    },
},
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 22)) mult = mult.times(upgradeEffect('p', 22))
        if (hasUpgrade('p', 24)) mult = mult.times(5)
        if (hasChallenge('p', 11)) mult = mult.times(10)
		if (hasChallenge('p', 12)) mult = mult.times(5)
		if (hasChallenge('p', 21)) mult = mult.times(2.5)
		if (hasUpgrade('p', 33)) mult = mult.times(upgradeEffect('p', 33))
		if (hasUpgrade('p', 42)) mult = mult.times(2)
		if (hasMilestone('m', 1)) mult = mult.times(2)
		if (hasUpgrade('ma', 11)) mult = mult.times(upgradeEffect('ma', 11))
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

    color: "#33944d",
    requires: new Decimal(1e10),

    resource: "Milestones",
    baseResource: "Atoms",
    baseAmount() {return player.points},

    type: "normal",
    exponent: 0.1,

    gainMult() {
        mult = new Decimal(1)

        return mult
    },

    gainExp() {
        return new Decimal(1)
    },

    row: 0,

	doReset(resettingLayer) {
    layerDataReset(this.layer, ["points"])
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
        requirementDescription: "500 Milestones",
        effectDescription: "PU3 is upgraded again.",
        done() {return player.m.points.gte(500)}
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

    color: "#ffffff",

    requires: new Decimal(1e15),
    resource: "Matter",
    baseResource: "Particles",
    baseAmount() {return player.p.points},

    type: "normal",
    exponent: 0.1,

    row: 1,

	upgrades: {
    11: {
        title: "Matter matters!",
        description: "Matter multiplies Particle gain.",
        cost: new Decimal(2),
        effect() {
            return player.ma.points.add(1).pow(0.1)
        },
        effectDisplay() {
            return format(upgradeEffect(this.layer, this.id))+"x"
	},
	12: {
		title: "Particle Preservation",
		description: "Particle upgrades are no longer lost when Matter is gained.",
		cost: new Decimal(1),
	},
	13: {
		title: "You want some Atoms with that?",
		description: "Yet another 2x to Atoms..",
		cost: new Decimal(1),
		},
	},

    branches: ["p"],

    layerShown(){return hasUpgrade('p', 44)},
})
