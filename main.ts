namespace SpriteKind {
    export const ui = SpriteKind.create()
    export const arm = SpriteKind.create()
    export const rifle = SpriteKind.create()
    export const nothin = SpriteKind.create()
}
browserEvents.R.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(mag_ammo == 30)) {
        subtraction = 6 - mag_ammo
        if (total_ammo >= subtraction) {
            speed = 15
            reloading = true
            timer.after(2000, function () {
                reloading = false
                mag_ammo = 30
                total_ammo += 0 - subtraction
            })
        }
    } else {
    	
    }
})
browserEvents.onMouseMove(function (x, y) {
    mouse.setPosition(scene.cameraProperty(CameraProperty.Left) + x, scene.cameraProperty(CameraProperty.Top) + y)
})
let explosiongsprite: Sprite = null
let rifleprojectile: Sprite = null
let reloading = false
let subtraction = 0
let speed = 0
let mag_ammo = 0
let total_ammo = 0
let mouse: Sprite = null
let dg = 0
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
let arm = sprites.create(img`
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
    `, SpriteKind.arm)
total_ammo = 150
mag_ammo = 30
speed = 40
let issprinting = false
let totalammotext = textsprite.create("Ammo:" + convertToText(total_ammo))
let magammotext = textsprite.create("Mag:" + convertToText(mag_ammo))
magammotext.setPosition(250, 25)
totalammotext.setPosition(250, 15)
totalammotext.setFlag(SpriteFlag.RelativeToCamera, true)
magammotext.setFlag(SpriteFlag.RelativeToCamera, true)
let canshoot = true
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
        if (canshoot) {
            if (mag_ammo > 0) {
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
                    spriteutils.angleFrom(arm, mouse),
                    14,
                    arm
                    )
                    transformSprites.rotateSprite(rifleprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(arm, mouse)) + randint(-3.5, 3.5))
                    spriteutils.setVelocityAtAngle(rifleprojectile, spriteutils.angleFrom(arm, mouse) + spriteutils.degreesToRadians(randint(-3.5, 3.5)), 300)
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
                    spriteutils.angleFrom(arm, mouse),
                    14,
                    arm
                    )
                    transformSprites.rotateSprite(rifleprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(arm, mouse)) + randint(-1, 1))
                    spriteutils.setVelocityAtAngle(rifleprojectile, spriteutils.angleFrom(arm, mouse) + spriteutils.degreesToRadians(randint(-1, 1)), 300)
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
                spriteutils.angleFrom(arm, mouse),
                14,
                arm
                )
                extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 100, 20, 5)
                mag_ammo += -1
                canshoot = false
                timer.after(100, function () {
                    canshoot = true
                })
            }
        }
    }
})
forever(function () {
    dg = spriteutils.radiansToDegrees(spriteutils.angleFrom(person, mouse))
    arm.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
    transformSprites.rotateSprite(person, dg)
    transformSprites.rotateSprite(arm, dg)
    controller.moveSprite(person, speed, speed)
    totalammotext.setText("Ammo:" + convertToText(total_ammo))
    magammotext.setText("Mag:" + convertToText(mag_ammo))
})
