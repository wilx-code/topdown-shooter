namespace SpriteKind {
    export const ui = SpriteKind.create()
    export const armkind = SpriteKind.create()
    export const rifle = SpriteKind.create()
    export const nothin = SpriteKind.create()
    export const tempimage = SpriteKind.create()
    export const pistol = SpriteKind.create()
}
browserEvents.onWheel(function (dx, dy, dz) {
    if (dy < 0) {
        toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, 1)
        if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) > 2) {
            toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 0)
        }
    } else if (dy > 0) {
        toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, -1)
        if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) < 0) {
            toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 2)
        }
    }
    if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 0) {
        emptypic.setFlag(SpriteFlag.Invisible, true)
        akpic.setFlag(SpriteFlag.Invisible, false)
        f1pic.setFlag(SpriteFlag.Invisible, true)
        gsh18pic.setFlag(SpriteFlag.Invisible, true)
    } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 1) {
        emptypic.setFlag(SpriteFlag.Invisible, true)
        akpic.setFlag(SpriteFlag.Invisible, true)
        f1pic.setFlag(SpriteFlag.Invisible, true)
        gsh18pic.setFlag(SpriteFlag.Invisible, false)
    } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 2) {
        emptypic.setFlag(SpriteFlag.Invisible, true)
        akpic.setFlag(SpriteFlag.Invisible, true)
        f1pic.setFlag(SpriteFlag.Invisible, false)
        gsh18pic.setFlag(SpriteFlag.Invisible, true)
    } else {
        emptypic.setFlag(SpriteFlag.Invisible, false)
        akpic.setFlag(SpriteFlag.Invisible, true)
        f1pic.setFlag(SpriteFlag.Invisible, true)
        gsh18pic.setFlag(SpriteFlag.Invisible, true)
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
            } else {
                if (!(pistolmag_ammo == 18)) {
                    pistolsubtraction = 18 - pistolmag_ammo
                    if (pistoltotal_ammo >= pistolsubtraction) {
                        speed = 15
                        reloading = true
                        timer.after(2000, function () {
                            reloading = false
                            pistolmag_ammo = 30
                            pistoltotal_ammo += 0 - pistolsubtraction
                        })
                    }
                }
            }
        }
    } else {
    	
    }
})
browserEvents.onMouseMove(function (x, y) {
    mouse.setPosition(scene.cameraProperty(CameraProperty.Left) + x, scene.cameraProperty(CameraProperty.Top) + y)
})
let dg = 0
let explosiongsprite: Sprite = null
let rifleprojectile: Sprite = null
let issprinting = false
let pistolsubtraction = 0
let riflesubtraction = 0
let reloading = false
let toolbar: Inventory.Toolbar = null
let pistolmag_ammo = 0
let pistoltotal_ammo = 0
let speed = 0
let riflemag_ammo = 0
let rifletotal_ammo = 0
let emptypic: Sprite = null
let f1pic: Sprite = null
let gsh18pic: Sprite = null
let akpic: Sprite = null
let mouse: Sprite = null
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}
let person = sprites.create(img`
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
mouse = sprites.create(img`
    . . 1 . . 
    . . 1 . . 
    1 1 . 1 1 
    . . 1 . . 
    . . 1 . . 
    `, SpriteKind.ui)
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
let canshoot = true
let item = Inventory.create_item("AK-47", img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . b . . . . . . . . . . 
    . . . c c c c c c c . . . . . b 
    e e e e c f f f b c c c c c c c 
    e e e . . c c c e e . . . . . . 
    e . . . . b b . e e e . . . . . 
    . . . . . b b . . e e . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
let item2 = Inventory.create_item("Gsh-18", img`
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
let item3 = Inventory.create_item("F-1", img`
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
let toolbarlist = [item, item2, item3]
toolbar = Inventory.create_toolbar(toolbarlist, 3)
emptypic.setFlag(SpriteFlag.Invisible, true)
akpic.setFlag(SpriteFlag.Invisible, false)
f1pic.setFlag(SpriteFlag.Invisible, true)
gsh18pic.setFlag(SpriteFlag.Invisible, true)
forever(function () {
    if (browserEvents.LeftShift.isPressed()) {
        if (!(reloading)) {
            if (!(person.vx == 0 && person.vy == 0)) {
                issprinting = true
                speed = 75
            }
        }
    } else if (reloading) {
        speed = 15
    } else {
        issprinting = false
        speed = 40
    }
    if (browserEvents.MouseLeft.isPressed()) {
        if (!(reloading)) {
            if (canshoot) {
                if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 0) {
                    if (riflemag_ammo > 0) {
                        if (issprinting) {
                            rifleprojectile = sprites.create(img`
                                . . . . . 
                                . . . . . 
                                c c c c c 
                                . . . . . 
                                . . . . . 
                                `, SpriteKind.rifle)
                            spriteutils.placeAngleFrom(
                            rifleprojectile,
                            spriteutils.angleFrom(akpic, mouse),
                            14,
                            akpic
                            )
                            transformSprites.rotateSprite(rifleprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(akpic, mouse)) + randint(-3.5, 3.5))
                            spriteutils.setVelocityAtAngle(rifleprojectile, spriteutils.angleFrom(akpic, mouse) + spriteutils.degreesToRadians(randint(-3.5, 3.5)), 300)
                        } else {
                            rifleprojectile = sprites.create(img`
                                . . . . . 
                                . . . . . 
                                c c c c c 
                                . . . . . 
                                . . . . . 
                                `, SpriteKind.rifle)
                            spriteutils.placeAngleFrom(
                            rifleprojectile,
                            spriteutils.angleFrom(akpic, mouse),
                            14,
                            akpic
                            )
                            transformSprites.rotateSprite(rifleprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(akpic, mouse)) + randint(-1, 1))
                            spriteutils.setVelocityAtAngle(rifleprojectile, spriteutils.angleFrom(akpic, mouse) + spriteutils.degreesToRadians(randint(-1, 1)), 300)
                        }
                        rifleprojectile.setFlag(SpriteFlag.AutoDestroy, false)
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
                        canshoot = false
                        timer.after(100, function () {
                            canshoot = true
                        })
                    }
                } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 1) {
                    if (pistolmag_ammo > 0) {
                        if (issprinting) {
                            rifleprojectile = sprites.create(img`
                                . . . . . 
                                . . . . . 
                                c c c c c 
                                . . . . . 
                                . . . . . 
                                `, SpriteKind.pistol)
                            spriteutils.placeAngleFrom(
                            rifleprojectile,
                            spriteutils.angleFrom(akpic, mouse),
                            14,
                            akpic
                            )
                            transformSprites.rotateSprite(rifleprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(akpic, mouse)) + randint(-3.5, 3.5))
                            spriteutils.setVelocityAtAngle(rifleprojectile, spriteutils.angleFrom(akpic, mouse) + spriteutils.degreesToRadians(randint(-3.5, 3.5)), 300)
                        } else {
                            rifleprojectile = sprites.create(img`
                                . . . . . 
                                . . . . . 
                                c c c c c 
                                . . . . . 
                                . . . . . 
                                `, SpriteKind.rifle)
                            spriteutils.placeAngleFrom(
                            rifleprojectile,
                            spriteutils.angleFrom(akpic, mouse),
                            14,
                            akpic
                            )
                            transformSprites.rotateSprite(rifleprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(akpic, mouse)) + randint(-1, 1))
                            spriteutils.setVelocityAtAngle(rifleprojectile, spriteutils.angleFrom(akpic, mouse) + spriteutils.degreesToRadians(randint(-1, 1)), 300)
                        }
                        rifleprojectile.setFlag(SpriteFlag.AutoDestroy, false)
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
                        canshoot = false
                        timer.after(100, function () {
                            canshoot = true
                        })
                    }
                } else if (false) {
                	
                } else {
                	
                }
            }
        }
    }
    akpic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
    emptypic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
    f1pic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
    gsh18pic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
    dg = spriteutils.radiansToDegrees(spriteutils.angleFrom(person, mouse))
    transformSprites.rotateSprite(person, dg)
    transformSprites.rotateSprite(akpic, dg)
    transformSprites.rotateSprite(emptypic, dg)
    transformSprites.rotateSprite(f1pic, dg)
    transformSprites.rotateSprite(gsh18pic, dg)
    controller.moveSprite(person, speed, speed)
})
forever(function () {
	
})
forever(function () {
	
})
