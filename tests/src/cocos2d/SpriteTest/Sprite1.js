'use strict'

//{{{ Imports
var util      = require('util')
  , path      = require('path')
  , cocos     = require('cocos2d')
  , geo       = require('geometry')
  , nodes     = cocos.nodes
  , actions   = cocos.actions
  , ccp       = geo.ccp

var SpriteDemo    = require('./SpriteDemo')
  , Director      = cocos.Director
  , Rect          = geo.Rect
  , Sprite        = nodes.Sprite
  , Sequence      = actions.Sequence
  , RepeatForever = actions.RepeatForever
  , ScaleBy       = actions.ScaleBy
  , RotateBy      = actions.RotateBy
  , Blink         = actions.Blink
  , FadeOut       = actions.FadeOut
//}}} Imports

/**
 * @class
 *
 * Example Sprite 1
 */
function Sprite1 () {
    Sprite1.superclass.constructor.call(this)

    this.isMouseEnabled = true

    var s = Director.sharedDirector.winSize
    this.addNewSprite(ccp(s.width / 2, s.height / 2))
}

Sprite1.inherit(SpriteDemo, /** @lends Sprite1# */ {
    title: 'Sprite'
  , subtitle: 'Click screen'

  , addNewSprite: function (point) {
        var idx = Math.floor(Math.random() * 1400 / 100)
          , x = (idx % 5) * 85
          , y = (idx % 3) * 121

        var sprite = new Sprite({ file: path.join(__dirname, '../resources/grossini_dance_atlas.png')
                                , rect: new Rect(x, y, 85, 121)
                                })

        sprite.position = ccp(point.x, point.y)

        this.addChild({child: sprite
                      , z: 0
                      })

        var action
          , actionBack
          , seq
          , rand = Math.random()

        if (rand < 0.2) {
            action = new ScaleBy({ duration: 3
                                 , scale: 2
                                 })

        } else if (rand < 0.4) {
            action = new RotateBy({ duration: 3
                                  , angle: 360
                                  })

        } else if (rand < 0.6) {
            action = new Blink({ duration: 1
                               , blinks: 3
                               })

        } else if (rand < 0.8) {
            action = new RotateBy({ duration: 3
                                  , angle: 360
                                  })

            //action = cocos.TintBy.create({duration:3, scale:2})
        } else {
            action = new FadeOut({ duration: 2
                                 })
        }

        actionBack = action.reverse()
        seq = new Sequence({ actions: [action, actionBack] })
        sprite.runAction(new RepeatForever(seq))
    }

  , mouseUp: function (event) {
        var location = Director.sharedDirector.convertEventToCanvas(event)
        this.addNewSprite(location)

        return true
    }
})

module.exports = Sprite1

// vim:et:st=4:fdm=marker:fdl=0:fdc=1
