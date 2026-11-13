namespace SpriteKind {
    export const ui = SpriteKind.create()
    export const armkind = SpriteKind.create()
    export const rifleprojectile = SpriteKind.create()
    export const nothin = SpriteKind.create()
    export const tempimage = SpriteKind.create()
    export const pistolprojectile = SpriteKind.create()
    export const grenade = SpriteKind.create()
    export const enemyrifleperson = SpriteKind.create()
    export const enemyriflebullet = SpriteKind.create()
    export const shrap = SpriteKind.create()
    export const enemyhitbox = SpriteKind.create()
    export const rocketprojectile = SpriteKind.create()
    export const hole = SpriteKind.create()
    export const medpack = SpriteKind.create()
    export const rocketitem = SpriteKind.create()
    export const ammopickup = SpriteKind.create()
    export const machine_gun = SpriteKind.create()
    export const machinegun_bullet = SpriteKind.create()
}
scene.onHitWall(SpriteKind.machinegun_bullet, function (sprite, location) {
    sprites.destroy(sprite)
})
sprites.onCreated(SpriteKind.shrap, function (sprite) {
    timer.after(randint(0, 750), function () {
        sprites.destroy(sprite)
    })
})
sprites.onOverlap(SpriteKind.shrap, SpriteKind.enemyrifleperson, function (sprite, otherSprite) {
    if (Math.percentChance(30)) {
        sprites.destroy(sprite)
    }
    sprites.changeDataNumberBy(otherSprite, "Hp", randint(-30, -50))
})
browserEvents.Four.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(inselection)) {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 3)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.rocketitem, function (sprite, otherSprite) {
    if (rocketcanshoot) {
        rockets += 3
        sprites.destroy(otherSprite)
    } else {
        sprites.destroy(otherSprite)
        toolbarlist.push(item4)
        rocketcanshoot = true
        toolbar.set_items(toolbarlist)
    }
})
scene.onHitWall(SpriteKind.pistolprojectile, function (sprite, location) {
    sprites.destroy(sprite)
})
scene.onHitWall(SpriteKind.rocketprojectile, function (sprite, location) {
    scene.cameraShake(10, 500)
    explosiongsprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.nothin)
    tiles.placeOnTile(explosiongsprite, location)
    extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 500, 90, 50)
    for (let value2 of spriteutils.getSpritesWithin(SpriteKind.Player, 60, sprite)) {
        healthbar.value += 0 - 120 * (1 - spriteutils.distanceBetween(person, value2) / 60)
    }
    for (let value22 of spriteutils.getSpritesWithin(SpriteKind.enemyrifleperson, 60, sprite)) {
        sprites.destroy(value22)
    }
    for (let index = 0; index < 25; index++) {
        shrapnel = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . b . . . . . . . . . . . . . 
            . . . . . . . . . . c . . . f . 
            . . . . c . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . b . . . . c . . . 
            . c . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f . . . . . . . . . . . . 
            . . . . c . . . . . . . . b . . 
            . . . . . . . . . . . c . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.shrap)
        spriteutils.placeAngleFrom(
        shrapnel,
        0,
        0,
        sprite
        )
        spriteutils.setVelocityAtAngle(shrapnel, randint(0, 360), 100)
        shrapnel.fx = 40
        shrapnel.fy = 40
    }
    sprites.destroy(sprite)
})
browserEvents.onWheel(function (dx, dy, dz) {
    if (!(inselection)) {
        if (dy < 0) {
            if (zoom < 1.5) {
                zoom += 0.5
            } else {
            	
            }
        } else if (dy > 0) {
            if (zoom > 0.5) {
                zoom += -0.5
            } else {
            	
            }
        }
    }
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.enemyrifleperson, 500, function (sprite) {
    if (inselection == false) {
        transformSprites.rotateSprite(sprite, spriteutils.radiansToDegrees(spriteutils.angleFrom(sprite, person)))
        if (spriteutils.distanceBetween(sprite, person) > 175) {
        	
        } else {
            sprite.setVelocity(0, 0)
            sprite.unfollow()
        }
        if (sprite.vx == 0 && sprite.vy == 0) {
            if (sight.isInSight(
            sprite,
            person,
            220,
            false
            )) {
                if (sprites.readDataNumber(sprite, "bulletsLeft") > 0 && sprites.readDataBoolean(sprite, "reloading") == false) {
                    enemyrifleprojectile = sprites.create(img`
                        . . . . . 
                        . . . . . 
                        c c c c c 
                        . . . . . 
                        . . . . . 
                        `, SpriteKind.enemyriflebullet)
                    scene.cameraShake(2, 200)
                    spriteutils.placeAngleFrom(
                    enemyrifleprojectile,
                    spriteutils.angleFrom(sprite, person),
                    25,
                    sprite
                    )
                    spriteutils.setVelocityAtAngle(enemyrifleprojectile, spriteutils.angleFrom(sprite, person), 500)
                    transformSprites.rotateSprite(enemyrifleprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(sprite, person)))
                    sprites.changeDataNumberBy(sprite, "bulletsLeft", -1)
                    explosiongsprite = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.nothin)
                    spriteutils.placeAngleFrom(
                    explosiongsprite,
                    spriteutils.angleFrom(sprite, person),
                    14,
                    sprite
                    )
                    extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 100, 20, 5)
                    if (Math.percentChance(10)) {
                        sprite.setVelocity(randint(-20, 20), randint(-20, 20))
                        timer.after(500, function () {
                            sprite.setVelocity(0, 0)
                        })
                    }
                }
            }
        } else {
        	
        }
        if (sprites.readDataNumber(sprite, "bulletsLeft") == 0 && sprites.readDataBoolean(sprite, "reloading") == false) {
            sprites.setDataBoolean(sprite, "reloading", true)
            timer.after(2000, function () {
                sprites.setDataNumber(sprite, "bulletsLeft", 30)
                sprites.setDataBoolean(sprite, "reloading", false)
            })
        }
    }
})
sprites.onOverlap(SpriteKind.rifleprojectile, SpriteKind.enemyrifleperson, function (sprite, otherSprite) {
    if (Math.percentChance(35)) {
        sprites.destroy(sprite)
    }
    sprites.changeDataNumberBy(otherSprite, "Hp", randint(-30, -50))
})
browserEvents.Three.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(inselection)) {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 2)
    }
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ammopickup, function (sprite, otherSprite) {
    if (otherSprite == rifleammo) {
        rifletotal_ammo += randint(30, 60)
        sprites.destroy(otherSprite)
    } else if (otherSprite == pistolammo) {
        pistoltotal_ammo += randint(30, 60)
        sprites.destroy(otherSprite)
    } else if (otherSprite == grenadeammo) {
        grenades += randint(1, 3)
        sprites.destroy(otherSprite)
    } else {
    	
    }
})
browserEvents.R.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(browserEvents.MouseLeft.isPressed())) {
        if (!(reloading)) {
            if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 0) {
                if (!(riflemag_ammo == 30)) {
                    riflesubtraction = 30 - riflemag_ammo
                    if (rifletotal_ammo >= riflesubtraction) {
                        speed = 15
                        reloading = true
                        timer.after(2000, function () {
                            reloading = false
                            riflemag_ammo = 30
                            rifletotal_ammo += 0 - riflesubtraction
                        })
                    }
                } else {
                	
                }
            } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 1) {
                if (!(pistolmag_ammo == 18)) {
                    pistolsubtraction = 18 - pistolmag_ammo
                    if (pistoltotal_ammo >= pistolsubtraction) {
                        speed = 15
                        reloading = true
                        timer.after(2000, function () {
                            reloading = false
                            pistolmag_ammo = 18
                            pistoltotal_ammo += 0 - pistolsubtraction
                        })
                    }
                }
            } else {
            	
            }
        }
    } else {
    	
    }
})
browserEvents.onMouseMove(function (x, y) {
    if (!(inselection)) {
        mouseX = x
        mouseY = y
        mouse.setPosition(scene.cameraProperty(CameraProperty.Left) + mouseX, scene.cameraProperty(CameraProperty.Top) + mouseY)
    }
})
sprites.onOverlap(SpriteKind.pistolprojectile, SpriteKind.enemyrifleperson, function (sprite, otherSprite) {
    if (Math.percentChance(20)) {
        sprites.destroy(sprite)
    }
    sprites.changeDataNumberBy(otherSprite, "Hp", randint(-30, -50))
})
scene.onHitWall(SpriteKind.enemyriflebullet, function (sprite, location) {
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.machinegun_bullet, SpriteKind.enemyrifleperson, function (sprite, otherSprite) {
    if (Math.percentChance(40)) {
        sprites.destroy(sprite)
    }
    sprites.changeDataNumberBy(otherSprite, "Hp", randint(-30, -50))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.medpack, function (sprite, otherSprite) {
    subtraction = 200 - healthbar.value
    if (subtraction > 60) {
        healthbar.value += randint(60, 80)
    } else {
        healthbar.value += subtraction
    }
    sprites.destroy(otherSprite)
})
browserEvents.F.onEvent(browserEvents.KeyEvent.Pressed, function () {
    for (let value22222 of sprites.allOfKind(SpriteKind.machine_gun)) {
        if (spriteutils.distanceBetween(person, value22222) <= 10) {
            if (sprites.readDataBoolean(person, "usingMg") == true) {
                sprites.setDataBoolean(person, "usingMg", false)
            } else {
                sprites.setDataBoolean(person, "usingMg", true)
            }
        }
    }
})
sprites.onOverlap(SpriteKind.enemyriflebullet, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    healthbar.value += randint(-20, -30)
})
browserEvents.Two.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(inselection)) {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 1)
    }
})
browserEvents.One.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(inselection)) {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 0)
    }
})
sprites.onCreated(SpriteKind.nothin, function (sprite) {
    timer.after(1000, function () {
        sprites.destroy(sprite)
    })
})
browserEvents.Five.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(inselection)) {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 4)
    }
})
scene.onHitWall(SpriteKind.rifleprojectile, function (sprite, location) {
    sprites.destroy(sprite)
})
let rocketlauncheritem: Sprite = null
let healthpack: Sprite = null
let machinegunbullet: Sprite = null
let dg = 0
let rocket: Sprite = null
let grenad: Sprite = null
let pistolprojectile2: Sprite = null
let rifleprojectile2: Sprite = null
let dy = 0
let dx = 0
let subtraction = 0
let mouseY = 0
let mouseX = 0
let pistolsubtraction = 0
let riflesubtraction = 0
let reloading = false
let grenadeammo: Sprite = null
let pistolammo: Sprite = null
let rifleammo: Sprite = null
let enemyrifleprojectile: Sprite = null
let zoom = 0
let shrapnel: Sprite = null
let explosiongsprite: Sprite = null
let machinegun: Sprite = null
let enemyrifleguy: Sprite = null
let total_ammo_text: TextSprite = null
let mag_ammo_text: TextSprite = null
let healthbar: StatusBarSprite = null
let grenades = 0
let rocketcanshoot = false
let grenadecanthrow = false
let pistolcanshoot = false
let riflecanshoot = false
let rockets = 0
let pistolmag_ammo = 0
let pistoltotal_ammo = 0
let speed = 0
let riflemag_ammo = 0
let rifletotal_ammo = 0
let emptypic: Sprite = null
let rocketlauncherpic: Sprite = null
let f1pic: Sprite = null
let gsh18pic: Sprite = null
let akpic: Sprite = null
let mouse: Sprite = null
let person: Sprite = null
let toolbar: Inventory.Toolbar = null
let toolbarlist: Inventory.Item[] = []
let item4: Inventory.Item = null
let item3: Inventory.Item = null
let item2: Inventory.Item = null
let item: Inventory.Item = null
let inselection = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}
inselection = true
let Menu = miniMenu.createMenu(
miniMenu.createMenuItem("Yes"),
miniMenu.createMenuItem("No")
)
miniMenu.setDimensions(Menu, 100, 100)
miniMenu.setTitle(Menu, "Skip Tutorial?")
miniMenu.onButtonPressed(Menu, miniMenu.Button.A, function (selection, selectedIndex) {
    if (selectedIndex == 1) {
        miniMenu.close(Menu)
        tiles.setCurrentTilemap(tilemap`level3`)
        scene.runTileAnimation(
        assets.tile`myTile5`,
        [img`
            . . . . . . . . . . . . . . . . 
            . 2 . . . 2 . . . 2 . . . . . . 
            . . 2 . . . 2 . . . 2 . . . . . 
            . . . 2 . . . 2 . . . 2 . . . . 
            2 . . . 2 . . . 2 . . . 2 . . . 
            . 2 . . . 2 . . . 2 . . . 2 . . 
            . . 2 . . . 2 . . . 2 . . . 2 . 
            . . . 2 . . . 2 . . . 2 . . . 2 
            . . . 2 . . . 2 . . . 2 . . . 2 
            . . 2 . . . 2 . . . 2 . . . 2 . 
            . 2 . . . 2 . . . 2 . . . 2 . . 
            2 . . . 2 . . . 2 . . . 2 . . . 
            . . . 2 . . . 2 . . . 2 . . . . 
            . . 2 . . . 2 . . . 2 . . . . . 
            . 2 . . . 2 . . . 2 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . 2 . . . 2 . . . 2 . . . . . 
            . . . 2 . . . 2 . . . 2 . . . . 
            2 . . . 2 . . . 2 . . . 2 . . . 
            . 2 . . . 2 . . . 2 . . . 2 . . 
            . . 2 . . . 2 . . . 2 . . . 2 . 
            . . . 2 . . . 2 . . . 2 . . . 2 
            . . . . 2 . . . 2 . . . 2 . . . 
            . . . . 2 . . . 2 . . . 2 . . . 
            . . . 2 . . . 2 . . . 2 . . . 2 
            . . 2 . . . 2 . . . 2 . . . 2 . 
            . 2 . . . 2 . . . 2 . . . 2 . . 
            2 . . . 2 . . . 2 . . . 2 . . . 
            . . . 2 . . . 2 . . . 2 . . . . 
            . . 2 . . . 2 . . . 2 . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . 2 . . . 2 . . . 2 . . . . 
            2 . . . 2 . . . 2 . . . 2 . . . 
            . 2 . . . 2 . . . 2 . . . 2 . . 
            . . 2 . . . 2 . . . 2 . . . 2 . 
            . . . 2 . . . 2 . . . 2 . . . 2 
            . . . . 2 . . . 2 . . . 2 . . . 
            . . . . . 2 . . . 2 . . . 2 . . 
            . . . . . 2 . . . 2 . . . 2 . . 
            . . . . 2 . . . 2 . . . 2 . . . 
            . . . 2 . . . 2 . . . 2 . . . 2 
            . . 2 . . . 2 . . . 2 . . . 2 . 
            . 2 . . . 2 . . . 2 . . . 2 . . 
            2 . . . 2 . . . 2 . . . 2 . . . 
            . . . 2 . . . 2 . . . 2 . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            2 . . . 2 . . . 2 . . . 2 . . . 
            . 2 . . . 2 . . . 2 . . . 2 . . 
            . . 2 . . . 2 . . . 2 . . . 2 . 
            . . . 2 . . . 2 . . . 2 . . . 2 
            . . . . 2 . . . 2 . . . 2 . . . 
            . . . . . 2 . . . 2 . . . 2 . . 
            . . . . . . 2 . . . 2 . . . 2 . 
            . . . . . . 2 . . . 2 . . . 2 . 
            . . . . . 2 . . . 2 . . . 2 . . 
            . . . . 2 . . . 2 . . . 2 . . . 
            . . . 2 . . . 2 . . . 2 . . . 2 
            . . 2 . . . 2 . . . 2 . . . 2 . 
            . 2 . . . 2 . . . 2 . . . 2 . . 
            2 . . . 2 . . . 2 . . . 2 . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        TileAnimationOrder.LoopSync
        )
        item = Inventory.create_item("AK-47", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b . . . . . . . . . . 
            . . . c c c c c c c . . . . . b 
            e e e e c f f f b c c c c c c c 
            e e e . b c c c e e . . . . . . 
            e . . . b b . . e e e . . . . . 
            . . . . b . . . . e e . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        item2 = Inventory.create_item("Gsh-18", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . b b b b b b b b b b b b b . 
            . . b b b b b b b b b b b b b . 
            . . c c c c c c c c c c c c c . 
            . . . c c c . b f . . . . . . . 
            . . . c c c b . f . . . . . . . 
            . . c c c c f f . . . . . . . . 
            . . c c c c . . . . . . . . . . 
            . . c c c . . . . . . . . . . . 
            . . c c c . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        item3 = Inventory.create_item("F-1", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . b b . . . . . 
            . . . . . f f f b . . b . . . . 
            . . . . . f c c b c . b . . . . 
            . . . . . f f f f b b . . . . . 
            . . . . f c c c c f . c . . . . 
            . . . f c c c c c c f c . . . . 
            . . . f c c c c c c f . c . . . 
            . . . f f f f f f f f . . . . . 
            . . . f c c c c c c f . . . . . 
            . . . f c c c c c c f . . . . . 
            . . . . f c c c c f . . . . . . 
            . . . . . f f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        item4 = Inventory.create_item("M1 Bazooka", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            f f . . . . . . . . . . . f f f 
            f b f c c c c c c c c c c f b f 
            f b f c c c c c c c c c c f b f 
            f b f c c c c c c c c c c f b f 
            f f . . . . . f b f . f . f f f 
            . . . . . . . f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        toolbarlist = [item, item2, item3]
        toolbar = Inventory.create_toolbar(toolbarlist, 5)
        scene.setBackgroundColor(7)
        person = sprites.create(img`
            .........................
            ........fffffffff........
            ......ffbbbbbbbbbff......
            .....fbbbbbbbbbbbbbf.....
            ....fbbbbbbbbbbbbbbbf....
            ...fbbbbbbbbbbbbbbbbbf...
            ..fbbbbbbbbbbbbbbbbbbbf..
            ..fbbbbbbbbbbbbbbbbbbbf..
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            ..fbbbbbbbbbbbbbbbbbbbf..
            ..fbbbbbbbbbbbbbbbbbbbf..
            ...fbbbbbbbbbbbbbbbbbf...
            ....fbbbbbbbbbbbbbbbf....
            .....fbbbbbbbbbbbbbf.....
            ......ffbbbbbbbbbff......
            ........fffffffff........
            .........................
            `, SpriteKind.Player)
        person.z = 100
        toolbar.z = 200
        tiles.placeOnTile(person, tiles.getTileLocation(1, 1))
        scene.cameraFollowSprite(person)
        mouse = sprites.create(img`
            . . . 1 . . . 
            . . . 1 . . . 
            . . 1 1 1 . . 
            1 1 1 . 1 1 1 
            . . 1 1 1 . . 
            . . . 1 . . . 
            . . . 1 . . . 
            `, SpriteKind.ui)
        mouse.z = 200
        akpic = sprites.create(img`
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            eeee..cccccccccc..............
            eeeeeecffffffccfcccccccccccccf
            eeeeeecffffffccfcccccccccccccf
            eeee..cccccccccc..............
            .......bbbfbb.................
            .......bbbfbb.................
            ........bbbb..................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            `, SpriteKind.tempimage)
        gsh18pic = sprites.create(img`
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ........bbccccccccccccccc.....
            .......bbbccccccccccccccc.....
            .......bbbbbbc................
            .......bbbbbb.................
            .......bbbbbb.................
            ........bbbb..................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            `, SpriteKind.tempimage)
        f1pic = sprites.create(img`
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            .............bb...............
            .............bb...............
            ............fbbf..............
            ...........fcbbcf.............
            ........bbbfcffcf.............
            .......bbbbfcffbb.............
            .......bbbbfccbcb.............
            .......bbbbbffbbb.............
            .......bbbbbb.................
            ........bbbb..................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            `, SpriteKind.tempimage)
        rocketlauncherpic = sprites.create(img`
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ffff.......................................bbbb..........fff
            fbbbfffccccccccfccccccccfccccccccfcccccccfccccccfccccccccfbf
            fbbbfbfccccccccfccccccccfccccccccfcccccccfccccccfccccccccfbf
            fbbbfbfccccccccfccccccccfccccccccfccccbbbbbbccccfccccccccfbf
            fbbbfbfccccccccfccccccccfccccccccfccccbbbbbbccccfccccccccfbf
            fbbbfbfccccccccfccccccccfcccbbbbcfcccccccfccccccfccccccccfbf
            fbbbfffccccccccfccccccccfccbbbbbbfcccccccfccccccfccccccccfbf
            ffff.......................bbbbbb........................fff
            ...........................bbbbbb...........................
            ...........................bbbbbb...........................
            ............................bbbb............................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            `, SpriteKind.tempimage)
        emptypic = sprites.create(img`
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ........bbbb..................
            .......bbbbbb.................
            .......bbbbbb.................
            .......bbbbbb.................
            .......bbbbbb.................
            ........bbbb..................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            `, SpriteKind.tempimage)
        rifletotal_ammo = 150
        riflemag_ammo = 30
        speed = 40
        pistoltotal_ammo = 54
        pistolmag_ammo = 18
        rockets = 3
        riflecanshoot = true
        pistolcanshoot = true
        grenadecanthrow = true
        rocketcanshoot = false
        toolbar.setScale(1.5, ScaleAnchor.Middle)
        toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
        toolbar.setPosition(180, 220)
        emptypic.setFlag(SpriteFlag.Invisible, true)
        akpic.setFlag(SpriteFlag.Invisible, false)
        f1pic.setFlag(SpriteFlag.Invisible, true)
        rocketlauncherpic.setFlag(SpriteFlag.Invisible, true)
        gsh18pic.setFlag(SpriteFlag.Invisible, true)
        emptypic.z = 98
        akpic.z = 98
        f1pic.z = 98
        gsh18pic.z = 98
        rocketlauncherpic.z = 98
        sprites.setDataBoolean(person, "usingMg", false)
        grenades = 3
        healthbar = statusbars.create(60, 8, StatusBarKind.Health)
        healthbar.max = 200
        healthbar.value = 200
        healthbar.setLabel("HP")
        healthbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        healthbar.setBarBorder(1, 15)
        healthbar.setPosition(40, 230)
        healthbar.setFlag(SpriteFlag.RelativeToCamera, true)
        mag_ammo_text = textsprite.create("")
        total_ammo_text = textsprite.create("")
        mag_ammo_text.setFlag(SpriteFlag.RelativeToCamera, true)
        total_ammo_text.setFlag(SpriteFlag.RelativeToCamera, true)
        mag_ammo_text.setPosition(3, 210)
        total_ammo_text.setPosition(3, 220)
        inselection = false
        for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
            tiles.setTileAt(value, assets.tile`myTile0`)
            enemyrifleguy = sprites.create(img`
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                ......................fffffffff........................
                ....................ffcccccccccff......................
                ...................fcccccccccccccf.....................
                ..................fcccccccccccccccf....................
                .................fcccccccccccccccccf...................
                ................fcccccccccccccccccccf..................
                ................fcccccccccccccccccccf..................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccfccc..............
                ...............fcccccccccccccccccccccfcfcccccccccccccf.
                ................fcccccccccccccccccccfccfcccccccccccccf.
                ................fcccccccccccccccccccfcccc..............
                .................fcccccccccccccccccfbc.................
                ..................fcccccccccccccccfbbc.................
                ...................fcccccccccccccfbbc..................
                ....................ffcccccccccff......................
                ......................fffffffff........................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                `, SpriteKind.enemyrifleperson)
            tiles.placeOnTile(enemyrifleguy, value)
            sprites.setDataNumber(enemyrifleguy, "Hp", 100)
            sprites.setDataNumber(enemyrifleguy, "bulletsLeft", 30)
            sprites.setDataBoolean(enemyrifleguy, "reloading", false)
        }
        story.printText("Use WASD to move to the purple square", mouse.x, mouse.y)
    } else {
        miniMenu.close(Menu)
        tiles.setCurrentTilemap(tilemap`level1`)
        for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
            tiles.setTileAt(value, assets.tile`myTile0`)
            enemyrifleguy = sprites.create(img`
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                ......................fffffffff........................
                ....................ffcccccccccff......................
                ...................fcccccccccccccf.....................
                ..................fcccccccccccccccf....................
                .................fcccccccccccccccccf...................
                ................fcccccccccccccccccccf..................
                ................fcccccccccccccccccccf..................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccf.................
                ...............fcccccccccccccccccccccfccc..............
                ...............fcccccccccccccccccccccfcfcccccccccccccf.
                ................fcccccccccccccccccccfccfcccccccccccccf.
                ................fcccccccccccccccccccfcccc..............
                .................fcccccccccccccccccfbc.................
                ..................fcccccccccccccccfbbc.................
                ...................fcccccccccccccfbbc..................
                ....................ffcccccccccff......................
                ......................fffffffff........................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                .......................................................
                `, SpriteKind.enemyrifleperson)
            tiles.placeOnTile(enemyrifleguy, value)
            sprites.setDataNumber(enemyrifleguy, "Hp", 100)
            sprites.setDataNumber(enemyrifleguy, "bulletsLeft", 30)
            sprites.setDataBoolean(enemyrifleguy, "reloading", false)
        }
        for (let value2222 of tiles.getTilesByType(assets.tile`myTile3`)) {
            tiles.setTileAt(value2222, assets.tile`myTile0`)
            machinegun = sprites.create(img`
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ...................................................ccccc..................................
                ...................................................ff..bbbbbbbbfffb.......................
                .......................................................bbcfffbbbbbbfcfcfcfcfcfcfcfcfcfcfc.
                .......................................................bbcfffbbbbbbcfcfcfcfcfcfcfcfcfcfcc.
                ...................................................ff..bbbbbbbbfffb.......................
                ...................................................ccccc....c.............................
                ............................................................c.............................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                ..........................................................................................
                `, SpriteKind.machine_gun)
            tiles.placeOnTile(machinegun, value2222)
            sprites.setDataNumber(machinegun, "bullets", 200)
        }
        item = Inventory.create_item("AK-47", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b . . . . . . . . . . 
            . . . c c c c c c c . . . . . b 
            e e e e c f f f b c c c c c c c 
            e e e . b c c c e e . . . . . . 
            e . . . b b . . e e e . . . . . 
            . . . . b . . . . e e . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        item2 = Inventory.create_item("Gsh-18", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . b b b b b b b b b b b b b . 
            . . b b b b b b b b b b b b b . 
            . . c c c c c c c c c c c c c . 
            . . . c c c . b f . . . . . . . 
            . . . c c c b . f . . . . . . . 
            . . c c c c f f . . . . . . . . 
            . . c c c c . . . . . . . . . . 
            . . c c c . . . . . . . . . . . 
            . . c c c . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        item3 = Inventory.create_item("F-1", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . b b . . . . . 
            . . . . . f f f b . . b . . . . 
            . . . . . f c c b c . b . . . . 
            . . . . . f f f f b b . . . . . 
            . . . . f c c c c f . c . . . . 
            . . . f c c c c c c f c . . . . 
            . . . f c c c c c c f . c . . . 
            . . . f f f f f f f f . . . . . 
            . . . f c c c c c c f . . . . . 
            . . . f c c c c c c f . . . . . 
            . . . . f c c c c f . . . . . . 
            . . . . . f f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        item4 = Inventory.create_item("M1 Bazooka", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            f f . . . . . . . . . . . f f f 
            f b f c c c c c c c c c c f b f 
            f b f c c c c c c c c c c f b f 
            f b f c c c c c c c c c c f b f 
            f f . . . . . f b f . f . f f f 
            . . . . . . . f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        toolbarlist = [item, item2, item3]
        toolbar = Inventory.create_toolbar(toolbarlist, 5)
        scene.setBackgroundColor(7)
        person = sprites.create(img`
            .........................
            ........fffffffff........
            ......ffbbbbbbbbbff......
            .....fbbbbbbbbbbbbbf.....
            ....fbbbbbbbbbbbbbbbf....
            ...fbbbbbbbbbbbbbbbbbf...
            ..fbbbbbbbbbbbbbbbbbbbf..
            ..fbbbbbbbbbbbbbbbbbbbf..
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            .fbbbbbbbbbbbbbbbbbbbbbf.
            ..fbbbbbbbbbbbbbbbbbbbf..
            ..fbbbbbbbbbbbbbbbbbbbf..
            ...fbbbbbbbbbbbbbbbbbf...
            ....fbbbbbbbbbbbbbbbf....
            .....fbbbbbbbbbbbbbf.....
            ......ffbbbbbbbbbff......
            ........fffffffff........
            .........................
            `, SpriteKind.Player)
        person.z = 100
        toolbar.z = 200
        tiles.placeOnTile(person, tiles.getTileLocation(4, 6))
        scene.cameraFollowSprite(person)
        mouse = sprites.create(img`
            . . . 1 . . . 
            . . . 1 . . . 
            . . 1 1 1 . . 
            1 1 1 . 1 1 1 
            . . 1 1 1 . . 
            . . . 1 . . . 
            . . . 1 . . . 
            `, SpriteKind.ui)
        mouse.z = 200
        akpic = sprites.create(img`
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            eeee..cccccccccc..............
            eeeeeecffffffccfcccccccccccccf
            eeeeeecffffffccfcccccccccccccf
            eeee..cccccccccc..............
            .......bbbfbb.................
            .......bbbfbb.................
            ........bbbb..................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            `, SpriteKind.tempimage)
        gsh18pic = sprites.create(img`
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ........bbccccccccccccccc.....
            .......bbbccccccccccccccc.....
            .......bbbbbbc................
            .......bbbbbb.................
            .......bbbbbb.................
            ........bbbb..................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            `, SpriteKind.tempimage)
        f1pic = sprites.create(img`
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            .............bb...............
            .............bb...............
            ............fbbf..............
            ...........fcbbcf.............
            ........bbbfcffcf.............
            .......bbbbfcffbb.............
            .......bbbbfccbcb.............
            .......bbbbbffbbb.............
            .......bbbbbb.................
            ........bbbb..................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            `, SpriteKind.tempimage)
        rocketlauncherpic = sprites.create(img`
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ffff.......................................bbbb..........fff
            fbbbfffccccccccfccccccccfccccccccfcccccccfccccccfccccccccfbf
            fbbbfbfccccccccfccccccccfccccccccfcccccccfccccccfccccccccfbf
            fbbbfbfccccccccfccccccccfccccccccfccccbbbbbbccccfccccccccfbf
            fbbbfbfccccccccfccccccccfccccccccfccccbbbbbbccccfccccccccfbf
            fbbbfbfccccccccfccccccccfcccbbbbcfcccccccfccccccfccccccccfbf
            fbbbfffccccccccfccccccccfccbbbbbbfcccccccfccccccfccccccccfbf
            ffff.......................bbbbbb........................fff
            ...........................bbbbbb...........................
            ...........................bbbbbb...........................
            ............................bbbb............................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            ............................................................
            `, SpriteKind.tempimage)
        emptypic = sprites.create(img`
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ........bbbb..................
            .......bbbbbb.................
            .......bbbbbb.................
            .......bbbbbb.................
            .......bbbbbb.................
            ........bbbb..................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            `, SpriteKind.tempimage)
        rifletotal_ammo = 150
        riflemag_ammo = 30
        speed = 40
        pistoltotal_ammo = 54
        pistolmag_ammo = 18
        rockets = 3
        riflecanshoot = true
        pistolcanshoot = true
        grenadecanthrow = true
        rocketcanshoot = false
        toolbar.setScale(1.5, ScaleAnchor.Middle)
        toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
        toolbar.setPosition(180, 220)
        emptypic.setFlag(SpriteFlag.Invisible, true)
        akpic.setFlag(SpriteFlag.Invisible, false)
        f1pic.setFlag(SpriteFlag.Invisible, true)
        rocketlauncherpic.setFlag(SpriteFlag.Invisible, true)
        gsh18pic.setFlag(SpriteFlag.Invisible, true)
        emptypic.z = 98
        akpic.z = 98
        f1pic.z = 98
        gsh18pic.z = 98
        rocketlauncherpic.z = 98
        sprites.setDataBoolean(person, "usingMg", false)
        grenades = 3
        healthbar = statusbars.create(60, 8, StatusBarKind.Health)
        healthbar.max = 200
        healthbar.value = 200
        healthbar.setLabel("HP")
        healthbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        healthbar.setBarBorder(1, 15)
        healthbar.setPosition(40, 230)
        healthbar.setFlag(SpriteFlag.RelativeToCamera, true)
        mag_ammo_text = textsprite.create("")
        total_ammo_text = textsprite.create("")
        mag_ammo_text.setFlag(SpriteFlag.RelativeToCamera, true)
        total_ammo_text.setFlag(SpriteFlag.RelativeToCamera, true)
        mag_ammo_text.setPosition(3, 210)
        total_ammo_text.setPosition(3, 220)
        inselection = false
    }
})
game.onUpdate(function () {
    if (!(inselection)) {
        if (browserEvents.LeftShift.isPressed()) {
            mouse.setImage(img`
                . . . . 2 . . . . 
                . . . . 2 . . . . 
                . . . 2 2 2 . . . 
                . . 2 . . . 2 . . 
                2 2 2 . 2 . 2 2 2 
                . . 2 . . . 2 . . 
                . . . 2 2 2 . . . 
                . . . . 2 . . . . 
                . . . . 2 . . . . 
                `)
            dx = mouseX - 160
            dy = mouseY - 120
            scene.centerCameraAt(person.x + dx * zoom, person.y + dy * zoom)
        } else {
            scene.centerCameraAt(person.x, person.y)
            mouse.setImage(img`
                . . 1 . . 
                . . 1 . . 
                1 1 . 1 1 
                . . 1 . . 
                . . 1 . . 
                `)
        }
    }
})
forever(function () {
    if (!(inselection)) {
        if (sprites.readDataBoolean(person, "usingMg") == false) {
            if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 0) {
                emptypic.setFlag(SpriteFlag.Invisible, true)
                akpic.setFlag(SpriteFlag.Invisible, false)
                f1pic.setFlag(SpriteFlag.Invisible, true)
                gsh18pic.setFlag(SpriteFlag.Invisible, true)
                rocketlauncherpic.setFlag(SpriteFlag.Invisible, true)
                mag_ammo_text.setText("Ammo:" + convertToText(riflemag_ammo))
                total_ammo_text.setText("Total Ammo:" + convertToText(rifletotal_ammo))
            } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 1) {
                emptypic.setFlag(SpriteFlag.Invisible, true)
                akpic.setFlag(SpriteFlag.Invisible, true)
                f1pic.setFlag(SpriteFlag.Invisible, true)
                gsh18pic.setFlag(SpriteFlag.Invisible, false)
                rocketlauncherpic.setFlag(SpriteFlag.Invisible, true)
                mag_ammo_text.setText("Ammo:" + pistolmag_ammo)
                total_ammo_text.setText("Total Ammo:" + convertToText(pistoltotal_ammo))
            } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 2) {
                emptypic.setFlag(SpriteFlag.Invisible, true)
                akpic.setFlag(SpriteFlag.Invisible, true)
                f1pic.setFlag(SpriteFlag.Invisible, false)
                rocketlauncherpic.setFlag(SpriteFlag.Invisible, true)
                gsh18pic.setFlag(SpriteFlag.Invisible, true)
                mag_ammo_text.setText("Ammo:" + grenades)
                total_ammo_text.setText("Total Ammo:" + convertToText(grenades))
            } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 3) {
                if (rocketcanshoot) {
                    rocketlauncherpic.setFlag(SpriteFlag.Invisible, false)
                    f1pic.setFlag(SpriteFlag.Invisible, true)
                    mag_ammo_text.setText("Ammo:" + rockets)
                    total_ammo_text.setText("Total Ammo:" + convertToText(rockets))
                }
            } else {
                rocketlauncherpic.setFlag(SpriteFlag.Invisible, true)
                emptypic.setFlag(SpriteFlag.Invisible, false)
                akpic.setFlag(SpriteFlag.Invisible, true)
                f1pic.setFlag(SpriteFlag.Invisible, true)
                gsh18pic.setFlag(SpriteFlag.Invisible, true)
                mag_ammo_text.setText("Ammo:" + "")
                total_ammo_text.setText("Total Ammo:" + "")
            }
        } else {
            rocketlauncherpic.setFlag(SpriteFlag.Invisible, true)
            emptypic.setFlag(SpriteFlag.Invisible, true)
            akpic.setFlag(SpriteFlag.Invisible, true)
            f1pic.setFlag(SpriteFlag.Invisible, true)
            gsh18pic.setFlag(SpriteFlag.Invisible, true)
            mag_ammo_text.setText("Ammo:" + sprites.readDataNumber(machinegun, "bullets"))
            total_ammo_text.setText("Total Ammo:" + sprites.readDataNumber(machinegun, "bullets"))
        }
        if (reloading) {
            speed = 15
        } else if (sprites.readDataBoolean(person, "usingMg") == true) {
            speed = 0
        } else {
            speed = 40
        }
        if (browserEvents.MouseLeft.isPressed()) {
            if (!(reloading)) {
                if (!(sprites.readDataBoolean(person, "usingMg") == true)) {
                    if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 0) {
                        if (riflecanshoot) {
                            if (riflemag_ammo > 0) {
                                rifleprojectile2 = sprites.create(img`
                                    . . . . . 
                                    . . . . . 
                                    c c c c c 
                                    . . . . . 
                                    . . . . . 
                                    `, SpriteKind.rifleprojectile)
                                spriteutils.placeAngleFrom(
                                rifleprojectile2,
                                spriteutils.angleFrom(akpic, mouse),
                                14,
                                akpic
                                )
                                transformSprites.rotateSprite(rifleprojectile2, spriteutils.radiansToDegrees(spriteutils.angleFrom(akpic, mouse)) + randint(-1, 1))
                                spriteutils.setVelocityAtAngle(rifleprojectile2, spriteutils.angleFrom(akpic, mouse) + spriteutils.degreesToRadians(randint(-1, 1)), 300)
                                rifleprojectile2.setFlag(SpriteFlag.AutoDestroy, false)
                                scene.cameraShake(2, 200)
                                explosiongsprite = sprites.create(img`
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    `, SpriteKind.nothin)
                                spriteutils.placeAngleFrom(
                                explosiongsprite,
                                spriteutils.angleFrom(akpic, mouse),
                                14,
                                akpic
                                )
                                extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 100, 20, 5)
                                riflemag_ammo += -1
                                riflecanshoot = false
                                timer.after(100, function () {
                                    riflecanshoot = true
                                })
                            }
                        } else {
                        	
                        }
                    } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 1) {
                        if (pistolcanshoot) {
                            if (pistolmag_ammo > 0) {
                                pistolprojectile2 = sprites.create(img`
                                    . . . . . 
                                    . . . . . 
                                    c c c c c 
                                    . . . . . 
                                    . . . . . 
                                    `, SpriteKind.pistolprojectile)
                                spriteutils.placeAngleFrom(
                                pistolprojectile2,
                                spriteutils.angleFrom(gsh18pic, mouse),
                                14,
                                gsh18pic
                                )
                                transformSprites.rotateSprite(pistolprojectile2, spriteutils.radiansToDegrees(spriteutils.angleFrom(gsh18pic, mouse)) + randint(-3.5, 3.5))
                                spriteutils.setVelocityAtAngle(pistolprojectile2, spriteutils.angleFrom(gsh18pic, mouse) + spriteutils.degreesToRadians(randint(-3.5, 3.5)), 300)
                                pistolprojectile2.setFlag(SpriteFlag.AutoDestroy, false)
                                scene.cameraShake(2, 200)
                                explosiongsprite = sprites.create(img`
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    `, SpriteKind.nothin)
                                spriteutils.placeAngleFrom(
                                explosiongsprite,
                                spriteutils.angleFrom(gsh18pic, mouse),
                                14,
                                gsh18pic
                                )
                                extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 100, 20, 5)
                                pistolmag_ammo += -1
                                pistolcanshoot = false
                                timer.after(500, function () {
                                    pistolcanshoot = true
                                })
                            }
                        }
                    } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 2) {
                        if (grenadecanthrow) {
                            if (grenades > 0) {
                                grenad = sprites.create(img`
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . b b . . . . . 
                                    . . . . . f f f b . . b . . . . 
                                    . . . . . f c c b c . b . . . . 
                                    . . . . . f f f f b b . . . . . 
                                    . . . . f c c c c f . c . . . . 
                                    . . . f c c c c c c f c . . . . 
                                    . . . f c c c c c c f . c . . . 
                                    . . . f f f f f f f f . . . . . 
                                    . . . f c c c c c c f . . . . . 
                                    . . . f c c c c c c f . . . . . 
                                    . . . . f c c c c f . . . . . . 
                                    . . . . . f f f f . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    `, SpriteKind.grenade)
                                grenad.setBounceOnWall(true)
                                spriteutils.placeAngleFrom(
                                grenad,
                                spriteutils.angleFrom(f1pic, mouse),
                                14,
                                f1pic
                                )
                                spriteutils.setVelocityAtAngle(grenad, spriteutils.angleFrom(f1pic, mouse), 120)
                                grenad.fx = 50
                                grenad.fy = 50
                                grenades += -1
                                grenadecanthrow = false
                                timer.after(3000, function () {
                                    timer.after(1500, function () {
                                        grenadecanthrow = true
                                        explosiongsprite = sprites.create(img`
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            `, SpriteKind.nothin)
                                        spriteutils.placeAngleFrom(
                                        explosiongsprite,
                                        0,
                                        0,
                                        grenad
                                        )
                                        extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 200, 40, 50)
                                        for (let index = 0; index < 50; index++) {
                                            shrapnel = sprites.create(img`
                                                . . . . . . . . . . . . . . . . 
                                                . . . . . . . . . . . . . . . . 
                                                . . b . . . . . . . . . . . . . 
                                                . . . . . . . . . . c . . . f . 
                                                . . . . c . . . . . . . . . . . 
                                                . . . . . . . . . . . . . . . . 
                                                . . . . . . . . . . f . . . . . 
                                                . . . . . . . . . . . . . . . . 
                                                . . . . . . . b . . . . c . . . 
                                                . c . . . . . . . . . . . . . . 
                                                . . . . . . . . . . . . . . . . 
                                                . . . . . . . . . . . . . . . . 
                                                . . . f . . . . . . . . . . . . 
                                                . . . . c . . . . . . . . b . . 
                                                . . . . . . . . . . . c . . . . 
                                                . . . . . . . . . . . . . . . . 
                                                `, SpriteKind.shrap)
                                            spriteutils.placeAngleFrom(
                                            shrapnel,
                                            0,
                                            0,
                                            grenad
                                            )
                                            spriteutils.setVelocityAtAngle(shrapnel, randint(0, 360), 100)
                                            shrapnel.fx = 40
                                            shrapnel.fy = 40
                                        }
                                        timer.background(function () {
                                            for (let value2 of spriteutils.getSpritesWithin(SpriteKind.Player, 60, grenad)) {
                                                if (sight.isInSight(
                                                value2,
                                                grenad,
                                                60,
                                                false
                                                )) {
                                                    healthbar.value += 0 - 120 * (1 - spriteutils.distanceBetween(person, value2) / 60)
                                                }
                                            }
                                            for (let value22 of spriteutils.getSpritesWithin(SpriteKind.enemyrifleperson, 60, grenad)) {
                                                if (sight.isInSight(
                                                value22,
                                                grenad,
                                                60,
                                                false
                                                )) {
                                                    sprites.destroy(value22)
                                                }
                                            }
                                            sprites.destroy(grenad)
                                        })
                                    })
                                })
                            } else {
                            	
                            }
                        }
                    } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 3) {
                        if (rocketcanshoot) {
                            if (rockets > 0) {
                                explosiongsprite = sprites.create(img`
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    `, SpriteKind.nothin)
                                spriteutils.placeAngleFrom(
                                explosiongsprite,
                                spriteutils.angleFrom(rocketlauncherpic, mouse),
                                20,
                                rocketlauncherpic
                                )
                                extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 500, 50, 50)
                                scene.cameraShake(10, 500)
                                rocketcanshoot = false
                                rocket = sprites.create(img`
                                    . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . 
                                    . f f f . . . . . . . . . 
                                    . f b b f f f f f f . . . 
                                    . f f f c c c f c c f f . 
                                    . f b b f f f f f f . . . 
                                    . f f f . . . . . . . . . 
                                    . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . 
                                    `, SpriteKind.rocketprojectile)
                                transformSprites.rotateSprite(rocket, spriteutils.radiansToDegrees(spriteutils.angleFrom(gsh18pic, mouse)))
                                spriteutils.placeAngleFrom(
                                rocket,
                                spriteutils.angleFrom(rocketlauncherpic, mouse),
                                14,
                                rocketlauncherpic
                                )
                                spriteutils.setVelocityAtAngle(rocket, spriteutils.angleFrom(rocketlauncherpic, mouse) + spriteutils.degreesToRadians(randint(-1, 1)), 200)
                                rockets += -1
                                timer.after(7500, function () {
                                    rocketcanshoot = true
                                })
                            }
                        }
                    } else {
                    	
                    }
                } else {
                    if (dg >= 315 || dg <= 45) {
                        if (sprites.readDataNumber(machinegun, "bullets") > 0) {
                            explosiongsprite = sprites.create(img`
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                `, SpriteKind.nothin)
                            spriteutils.placeAngleFrom(
                            explosiongsprite,
                            spriteutils.angleFrom(machinegun, mouse),
                            35,
                            rocketlauncherpic
                            )
                            extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 200, 20, 10)
                            scene.cameraShake(5, 200)
                            machinegunbullet = sprites.create(img`
                                . . . . . 
                                . . . . . 
                                . f f f . 
                                . . . . . 
                                . . . . . 
                                `, SpriteKind.machinegun_bullet)
                            spriteutils.placeAngleFrom(
                            machinegunbullet,
                            spriteutils.angleFrom(machinegun, mouse),
                            35,
                            machinegun
                            )
                            spriteutils.setVelocityAtAngle(machinegunbullet, spriteutils.degreesToRadians(dg), 300)
                            transformSprites.rotateSprite(machinegunbullet, dg)
                            sprites.changeDataNumberBy(machinegun, "bullets", -1)
                        }
                    }
                }
            }
        }
        dg = spriteutils.radiansToDegrees(spriteutils.angleFrom(person, mouse))
        if (dg < 0) {
            dg += 360
        }
        if (sprites.readDataBoolean(person, "usingMg") == true) {
            if (dg >= 315 || dg <= 45) {
                transformSprites.rotateSprite(machinegun, dg)
            }
        }
        akpic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
        emptypic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
        f1pic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
        gsh18pic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
        rocketlauncherpic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
        transformSprites.rotateSprite(person, dg)
        transformSprites.rotateSprite(rocketlauncherpic, dg)
        transformSprites.rotateSprite(akpic, dg)
        transformSprites.rotateSprite(emptypic, dg)
        transformSprites.rotateSprite(f1pic, dg)
        transformSprites.rotateSprite(gsh18pic, dg)
        controller.moveSprite(person, speed, speed)
        for (let value3 of sprites.allOfKind(SpriteKind.enemyrifleperson)) {
            if (sprites.readDataNumber(value3, "Hp") <= 0) {
                sprites.destroy(value3)
                if (Math.percentChance(10)) {
                    healthpack = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . 1 1 1 1 1 1 1 1 . . . . 
                        . . . . 1 1 1 1 1 1 1 1 . . . . 
                        . . . . 1 1 . . . . 1 1 . . . . 
                        . . . . 1 1 . . . . 1 1 . . . . 
                        . . . . 1 1 . . . . 1 1 . . . . 
                        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                        1 1 1 1 1 1 1 2 2 1 1 1 1 1 1 1 
                        1 1 1 1 1 1 1 2 2 1 1 1 1 1 1 1 
                        1 1 1 1 1 1 1 2 2 1 1 1 1 1 1 1 
                        1 1 1 1 2 2 2 2 2 2 2 2 1 1 1 1 
                        1 1 1 1 2 2 2 2 2 2 2 2 1 1 1 1 
                        1 1 1 1 1 1 1 2 2 1 1 1 1 1 1 1 
                        1 1 1 1 1 1 1 2 2 1 1 1 1 1 1 1 
                        1 1 1 1 1 1 1 2 2 1 1 1 1 1 1 1 
                        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                        `, SpriteKind.medpack)
                    tiles.placeOnTile(healthpack, value3.tilemapLocation())
                    healthpack.z = 99
                } else if (Math.percentChance(10)) {
                    rocketlauncheritem = sprites.create(img`
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        fff...................bbbb.........fff
                        fbbfcccccccccfccccccfcccccfccccccccfbf
                        fbbfcccccccccfcccbbbbbbcccfccccccccfbf
                        fbbfcccccccccfccccccfcccccfccccccccfbf
                        fbbfcccccccccfccccccfcccccfccccccccfbf
                        fff...............cbc.f............fff
                        ..................cbcff...............
                        ..................cbc.................
                        ..................ccc.................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        ......................................
                        `, SpriteKind.rocketitem)
                    tiles.placeOnTile(rocketlauncheritem, value3.tilemapLocation())
                    rocketlauncheritem.z = 99
                } else if (Math.percentChance(15)) {
                    rifleammo = sprites.create(img`
                        . . . . . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . . . . . 
                        . . . . . . . b . . . . . . . . . . . . 
                        . . . . . c c c c c c c . . . . . b . . 
                        . . e e e e c c c c b c c c c c c c . . 
                        . . e e e . b . . . e e . . . . . . . . 
                        . . e . . . b b . . e e e . . . . . . . 
                        . . . . . . b . . . . e e . . . . . . . 
                        . . . . . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . . . . . 
                        `, SpriteKind.ammopickup)
                    tiles.placeOnTile(rifleammo, value3.tilemapLocation())
                    rifleammo.z = 99
                } else if (Math.percentChance(15)) {
                    grenadeammo = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . b b . . . . . 
                        . . . . . f f f b . . b . . . . 
                        . . . . . f c c b c . b . . . . 
                        . . . . . f f f f b b . . . . . 
                        . . . . f c c c c f . c . . . . 
                        . . . f c c c c c c f c . . . . 
                        . . . f c c c c c c f . c . . . 
                        . . . f f f f f f f f . . . . . 
                        . . . f c c c c c c f . . . . . 
                        . . . f c c c c c c f . . . . . 
                        . . . . f c c c c f . . . . . . 
                        . . . . . f f f f . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.ammopickup)
                    tiles.placeOnTile(grenadeammo, value3.tilemapLocation())
                    grenadeammo.z = 99
                } else if (Math.percentChance(15)) {
                    pistolammo = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . b b b b b b b b b b b b b . 
                        . . b b b b b b b b b b b b b . 
                        . . c c c c c c c c c c c c c . 
                        . . . c c c . b f . . . . . . . 
                        . . . c c c b . f . . . . . . . 
                        . . c c c c f f . . . . . . . . 
                        . . c c c c . . . . . . . . . . 
                        . . c c c . . . . . . . . . . . 
                        . . c c c . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.ammopickup)
                    tiles.placeOnTile(pistolammo, value3.tilemapLocation())
                    pistolammo.z = 99
                } else {
                	
                }
            }
        }
    }
})
forever(function () {
    if (!(inselection)) {
        if (person.tileKindAt(TileDirection.Center, assets.tile`myTile6`)) {
            tiles.setTileAt(tiles.getTileLocation(10, 2), assets.tile`myTile0`)
            story.printText("Hold down shift and scroll the mouse wheel forward", scene.cameraProperty(CameraProperty.Left) + 160, scene.cameraProperty(CameraProperty.Top) + 110, 15, 1, story.TextSpeed.VeryFast)
            story.printText("Move your mouse onto the enemy that is directly to your right or in line with the enemy", scene.cameraProperty(CameraProperty.Left) + 160, scene.cameraProperty(CameraProperty.Top) + 110, 15, 1, story.TextSpeed.VeryFast)
            story.printText("Hold down the left mouse button to fire", scene.cameraProperty(CameraProperty.Left) + 160, scene.cameraProperty(CameraProperty.Top) + 110, 15, 1, story.TextSpeed.VeryFast)
            story.printText("When the \"mag ammo\" count becomes 0, hit R to reload", scene.cameraProperty(CameraProperty.Left) + 160, scene.cameraProperty(CameraProperty.Top) + 110, 15, 1, story.TextSpeed.VeryFast)
            story.printText("You can scroll the mouse wheel backwards to decrease the range", scene.cameraProperty(CameraProperty.Left) + 160, scene.cameraProperty(CameraProperty.Top) + 110, 15, 1, story.TextSpeed.VeryFast)
            story.printText("Releasing shift will close the scope", scene.cameraProperty(CameraProperty.Left) + 160, scene.cameraProperty(CameraProperty.Top) + 110, 15, 1, story.TextSpeed.VeryFast)
            story.printText("Now hit the 2 button on your keyboard, which will switch to your secondary weapon", scene.cameraProperty(CameraProperty.Left) + 160, scene.cameraProperty(CameraProperty.Top) + 110, 15, 1, story.TextSpeed.VeryFast)
            story.printText("The pistol's mechanics work the same as the primary weapon", scene.cameraProperty(CameraProperty.Left) + 160, scene.cameraProperty(CameraProperty.Top) + 110, 15, 1, story.TextSpeed.VeryFast)
            story.printText("Now hit the 3 button, which will switch to your grenades. Aim with the scope and line it up before left clicking", scene.cameraProperty(CameraProperty.Left) + 160, scene.cameraProperty(CameraProperty.Top) + 110, 15, 1, story.TextSpeed.VeryFast)
            story.printText("It will have a 5 second fuse before exploding", scene.cameraProperty(CameraProperty.Left) + 160, scene.cameraProperty(CameraProperty.Top) + 110, 15, 1, story.TextSpeed.VeryFast)
        }
    }
})
